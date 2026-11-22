'use strict';
/*
 * Wide Tables - an Obsidian plugin.
 *
 * - Tables may be wider than the readable line width (styles.css) and scroll
 *   sideways when they are wider than the pane.
 * - Drag the right edge of any column in Live Preview to set its width.
 * - Widths are stored in the note itself, in a comment line right above the
 *   table:  <!-- col-widths: 200 150 300 -->  followed by an empty line.
 *   Live Preview hides that line, Reading view and GitHub do not show HTML
 *   comments. Because a resize is an ordinary edit of the note, Ctrl+Z undoes it.
 * - Obsidian's own table menu (add / delete / move columns) keeps working; when
 *   it changes the columns of a table with stored widths, the widths line is
 *   fixed in the same transaction, so one Ctrl+Z restores both.
 * - Live Preview also hides the empty line between a heading and the table
 *   under it. Obsidian keeps an empty line above every table and puts it back
 *   when it is deleted, though a table right under a heading needs none. The
 *   line stays in the note and shows while the cursor is on it.
 */

const obsidian = require('obsidian');

/* ------------------------------------------------------------------ */
/* Pure logic (no Obsidian or DOM), covered by test.js                 */
/* ------------------------------------------------------------------ */

const COMMENT_RE = /^\s*<!--\s*col-widths:\s*([0-9.\s]*?)\s*-->\s*$/;
const DELIM_RE = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
const FENCE_RE = /^\s*(`{3,}|~{3,})/;
const HEADING_RE = /^ {0,3}#{1,6}(\s|$)/;
const MIN_WIDTH = 40;
const DEFAULT_WIDTH = 120;

/** Split a Markdown table row into trimmed cell texts (escaped \| stays inside a cell). */
function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  const cells = [];
  let cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\' && s[i + 1] === '|') { cur += '\\|'; i++; continue; }
    if (c === '|') { cells.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  cells.push(cur.trim());
  return cells;
}

function parseWidths(text) {
  const nums = text.trim().split(/\s+/).map(Number).filter((n) => Number.isFinite(n) && n > 0);
  return nums.length ? nums.map((n) => Math.round(n)) : null;
}

function formatComment(widths) {
  return `<!-- col-widths: ${widths.map((w) => Math.round(w)).join(' ')} -->`;
}

/**
 * Find the tables of a note. lines: array of strings (0-based).
 * Returns [{header, delim, end, cols, headers, comment, blank, widths}], all line indexes 0-based;
 * comment/blank are null when the table has no widths line.
 */
function parseTables(lines) {
  const out = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const f = line.match(FENCE_RE);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    if (i + 1 >= lines.length || !line.includes('|')) continue;
    const delim = lines[i + 1];
    if (!DELIM_RE.test(delim) || !(delim.includes('|') || line.includes('|'))) continue;
    const headers = splitRow(line);
    if (splitRow(delim).length !== headers.length) continue;
    let end = i + 1;
    while (end + 1 < lines.length && lines[end + 1].trim() !== '' && lines[end + 1].includes('|')) end++;
    let comment = null;
    let blank = null;
    let widths = null;
    if (i >= 1 && COMMENT_RE.test(lines[i - 1])) comment = i - 1;
    else if (i >= 2 && lines[i - 1].trim() === '' && COMMENT_RE.test(lines[i - 2])) { comment = i - 2; blank = i - 1; }
    if (comment !== null) widths = parseWidths(lines[comment].match(COMMENT_RE)[1]);
    if (comment !== null && !widths) { comment = null; blank = null; }
    out.push({ header: i, delim: i + 1, end, cols: headers.length, headers, comment, blank, widths });
    i = end;
  }
  return out;
}

/**
 * The empty line between a heading and a table (or the table's widths line), one per table
 * at most. lineText(i) returns the text of 0-based line i. Returns 0-based line indexes.
 */
function headingGaps(lineText, tables) {
  const out = [];
  for (const t of tables) {
    const gap = (t.comment !== null ? t.comment : t.header) - 1;
    if (gap >= 1 && lineText(gap).trim() === '' && HEADING_RE.test(lineText(gap - 1))) out.push(gap);
  }
  return out;
}

function average(widths) {
  return widths.length ? Math.round(widths.reduce((a, b) => a + b, 0) / widths.length) : DEFAULT_WIDTH;
}

/** Make a widths list fit a column count: pad with the average width, cut the rest. */
function fitWidths(widths, cols) {
  const out = widths.slice(0, cols);
  const avg = average(widths);
  while (out.length < cols) out.push(avg);
  return out;
}

/**
 * Widths after the columns of a table changed from oldHeaders to newHeaders
 * (Obsidian's add / delete / move column). Columns are matched by header text;
 * a new column gets the average width.
 */
function adjustWidths(widths, oldHeaders, newHeaders) {
  const base = fitWidths(widths, oldHeaders.length);
  const avg = average(base);
  const oldN = oldHeaders.length;
  const newN = newHeaders.length;
  if (newN === oldN) {
    if (newHeaders.every((h, i) => h === oldHeaders[i])) return base;
    const unique = new Set(oldHeaders).size === oldN && new Set(newHeaders).size === newN;
    if (unique && newHeaders.every((h) => oldHeaders.includes(h))) return newHeaders.map((h) => base[oldHeaders.indexOf(h)]);
    return base; // header text edited in place
  }
  if (newN < oldN) {
    const out = [];
    let j = 0;
    for (let i = 0; i < oldN && j < newN; i++) {
      if (oldHeaders[i] === newHeaders[j]) { out.push(base[i]); j++; }
    }
    return j === newN ? out : base.slice(0, newN);
  }
  const out = [];
  let i = 0;
  for (let j = 0; j < newN; j++) {
    if (i < oldN && newHeaders[j] === oldHeaders[i]) { out.push(base[i]); i++; } else out.push(avg);
  }
  return i === oldN ? out : fitWidths(base, newN);
}

function sameWidths(a, b) {
  return a.length === b.length && a.every((w, i) => w === b[i]);
}

/* ------------------------------------------------------------------ */
/* DOM helpers                                                         */
/* ------------------------------------------------------------------ */

function headerCells(table) {
  const row = table.tHead && table.tHead.rows[0] ? table.tHead.rows[0] : table.rows[0];
  return row ? Array.from(row.cells) : [];
}

/** Give a <table> fixed column widths, or bring back its automatic layout (widths = null). */
function applyWidths(table, widths) {
  let cg = table.querySelector(':scope > colgroup.wt-cols');
  if (!widths) {
    if (cg) cg.remove();
    if (table.classList.contains('wt-sized')) {
      table.classList.remove('wt-sized');
      table.style.removeProperty('width');
    }
    return;
  }
  if (!cg) {
    cg = document.createElement('colgroup');
    cg.className = 'wt-cols';
    table.insertBefore(cg, table.firstChild);
  }
  while (cg.children.length < widths.length) cg.appendChild(document.createElement('col'));
  while (cg.children.length > widths.length) cg.lastChild.remove();
  widths.forEach((w, i) => {
    const v = `${w}px`;
    if (cg.children[i].style.width !== v) cg.children[i].style.width = v;
  });
  const total = `${widths.reduce((a, b) => a + b, 0)}px`;
  if (table.style.width !== total) table.style.width = total;
  table.classList.add('wt-sized');
}

/* ------------------------------------------------------------------ */
/* The plugin                                                          */
/* ------------------------------------------------------------------ */

class WideTablesPlugin extends obsidian.Plugin {
  async onload() {
    this.lastContextMenu = null;
    this.registerEditorExtension(this.buildEditorExtension());
    this.registerMarkdownPostProcessor((el, ctx) => this.processReading(el, ctx));
    this.patchTableMenu();
    this.addCommand({
      id: 'reset-column-widths',
      name: 'Сбросить ширину столбцов таблицы под курсором',
      editorCheckCallback: (checking, editor) => {
        const view = editor && editor.cm;
        if (!view) return false;
        const line = view.state.doc.lineAt(view.state.selection.main.head).number - 1;
        const t = this.tablesOf(view.state).find((x) => line >= x.header && line <= x.end && x.comment !== null);
        if (!t) return false;
        if (!checking) this.resetWidths(view, t);
        return true;
      },
    });
  }

  /* ---------- CodeMirror side ---------- */

  buildEditorExtension() {
    const { StateField, Annotation, Transaction, EditorState, RangeSetBuilder } = require('@codemirror/state');
    const { EditorView, Decoration, ViewPlugin } = require('@codemirror/view');
    const lpField = obsidian.editorLivePreviewField;
    const plugin = this;

    const isLivePreview = (state) => !!(lpField && state.field(lpField, false));
    const docLines = (doc) => doc.toString().split('\n');

    this.ownEdit = Annotation.define();
    this.Transaction = Transaction;
    try { this.isolateHistory = require('@codemirror/commands').isolateHistory; } catch (e) { this.isolateHistory = null; }

    const tablesField = StateField.define({
      create: (state) => parseTables(docLines(state.doc)),
      update: (value, tr) => (tr.docChanged ? parseTables(docLines(tr.state.doc)) : value),
    });
    this.tablesField = tablesField;

    // Hide in Live Preview: the empty line between a heading and a table (unless the cursor
    // is on it), and the widths comment with the empty line under it.
    const buildHidden = (state) => {
      if (!isLivePreview(state)) return Decoration.none;
      const b = new RangeSetBuilder();
      const tables = state.field(tablesField);
      const gaps = new Set(headingGaps((i) => state.doc.line(i + 1).text, tables));
      const heads = state.selection.ranges.map((r) => r.head);
      for (const t of tables) {
        const gapIndex = (t.comment !== null ? t.comment : t.header) - 1;
        if (gaps.has(gapIndex)) {
          const gap = state.doc.line(gapIndex + 1);
          if (!heads.some((h) => h >= gap.from && h <= gap.to)) b.add(gap.from, gap.to, Decoration.replace({ block: true }));
        }
        if (t.comment === null) continue;
        const from = state.doc.line(t.comment + 1).from;
        const to = state.doc.line((t.blank === null ? t.comment : t.blank) + 1).to;
        b.add(from, to, Decoration.replace({ block: true }));
      }
      return b.finish();
    };
    const hiddenField = StateField.define({
      create: buildHidden,
      update: (value, tr) => {
        if (tr.docChanged || tr.selection || isLivePreview(tr.startState) !== isLivePreview(tr.state)) return buildHidden(tr.state);
        return value;
      },
      provide: (f) => [EditorView.decorations.from(f), EditorView.atomicRanges.of((view) => view.state.field(f))],
    });

    // Keep the widths in step when Obsidian adds, deletes or moves columns.
    const syncFilter = EditorState.transactionFilter.of((tr) => {
      if (!tr.docChanged || tr.annotation(plugin.ownEdit) || tr.isUserEvent('undo') || tr.isUserEvent('redo')) return tr;
      let touchesTable = false;
      tr.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
        if (!touchesTable && (inserted.toString().includes('|') || tr.startState.doc.sliceString(fromA, toA).includes('|'))) touchesTable = true;
      });
      if (!touchesTable) return tr;
      const newTables = parseTables(docLines(tr.newDoc)).filter((t) => t.comment !== null);
      if (!newTables.length) return tr;
      const oldTables = tr.startState.field(tablesField);
      const inverse = tr.changes.invert(tr.startState.doc);
      const fixes = [];
      for (const t of newTables) {
        const commentLine = tr.newDoc.line(t.comment + 1);
        const oldPos = inverse.mapPos(commentLine.from, 1);
        const oldLine = tr.startState.doc.lineAt(oldPos).number - 1;
        const old = oldTables.find((o) => o.comment === oldLine);
        if (!old) continue;
        const next = adjustWidths(t.widths, old.headers, t.headers);
        if (!sameWidths(next, t.widths)) fixes.push({ from: commentLine.from, to: commentLine.to, insert: formatComment(next) });
      }
      if (!fixes.length) return tr;
      return [tr, { changes: fixes, sequential: true }];
    });

    const viewPlugin = ViewPlugin.fromClass(class {
      constructor(view) {
        this.view = view;
        this.drag = null;
        this.frame = 0;
        this.observer = new MutationObserver(() => this.schedule());
        this.observer.observe(view.contentDOM, { childList: true, subtree: true });
        // Obsidian's table catches pointer events on its way down, so handles are caught
        // one level higher, in the capture phase, before the table sees them.
        this.onPointerDown = (e) => {
          const h = e.target && e.target.closest ? e.target.closest('.wt-handle') : null;
          if (h && this.view.contentDOM.contains(h)) this.startDrag(e, h);
        };
        this.onSwallow = (e) => {
          if (e.target && e.target.closest && e.target.closest('.wt-handle')) { e.preventDefault(); e.stopPropagation(); }
        };
        view.dom.addEventListener('pointerdown', this.onPointerDown, true);
        for (const type of ['mousedown', 'click', 'dblclick', 'contextmenu']) view.dom.addEventListener(type, this.onSwallow, true);
        this.schedule();
      }

      update(u) {
        if (u.docChanged || u.viewportChanged || u.geometryChanged || u.startState.field(tablesField) !== u.state.field(tablesField)) this.schedule();
      }

      destroy() {
        this.observer.disconnect();
        if (this.frame) clearTimeout(this.frame);
        if (this.endDrag) this.endDrag(false);
        this.view.dom.removeEventListener('pointerdown', this.onPointerDown, true);
        for (const type of ['mousedown', 'click', 'dblclick', 'contextmenu']) this.view.dom.removeEventListener(type, this.onSwallow, true);
        for (const box of this.view.contentDOM.querySelectorAll('.wt-handles')) box.remove();
        for (const table of this.view.contentDOM.querySelectorAll('table.wt-sized')) applyWidths(table, null);
      }

      // A timeout, not requestAnimationFrame: frames do not run while the window is minimised.
      schedule() {
        if (this.frame) return;
        this.frame = setTimeout(() => {
          this.frame = 0;
          try { this.apply(); } catch (e) { console.error('wide-tables:', e); }
        }, 0);
      }

      tableAt(widget) {
        let pos;
        try { pos = this.view.posAtDOM(widget); } catch (e) { return null; }
        const line = this.view.state.doc.lineAt(pos).number - 1;
        return this.view.state.field(tablesField).find((t) => t.header === line) || null;
      }

      apply() {
        for (const widget of this.view.contentDOM.querySelectorAll(':scope > .cm-table-widget')) {
          const table = widget.querySelector('table');
          if (!table) continue;
          if (this.drag && this.drag.table === table) continue;
          const t = this.tableAt(widget);
          const cols = headerCells(table).length;
          applyWidths(table, t && t.widths && cols ? fitWidths(t.widths, cols) : null);
          this.placeHandles(table);
        }
      }

      placeHandles(table) {
        const wrap = table.parentElement;
        if (!wrap) return;
        let box = wrap.querySelector(':scope > .wt-handles');
        if (!box) {
          box = document.createElement('div');
          box.className = 'wt-handles';
          wrap.appendChild(box);
        }
        const cells = headerCells(table);
        while (box.children.length < cells.length) {
          const h = document.createElement('div');
          h.className = 'wt-handle';
          h.setAttribute('aria-label', 'Потяни, чтобы изменить ширину столбца');
          h.setAttribute('data-tooltip-delay', '600');
          box.appendChild(h);
        }
        while (box.children.length > cells.length) box.lastChild.remove();
        const wrapLeft = wrap.getBoundingClientRect().left;
        const top = `${table.offsetTop}px`;
        const height = `${table.offsetHeight}px`;
        cells.forEach((cell, i) => {
          const h = box.children[i];
          h.dataset.col = String(i);
          const left = `${Math.round(cell.getBoundingClientRect().right - wrapLeft)}px`;
          if (h.style.left !== left) h.style.left = left;
          if (h.style.top !== top) h.style.top = top;
          if (h.style.height !== height) h.style.height = height;
        });
      }

      startDrag(e, handle) {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        const wrap = handle.parentElement && handle.parentElement.parentElement;
        const table = wrap && wrap.querySelector(':scope > table');
        const widget = wrap && wrap.closest('.cm-table-widget');
        if (!table || !widget) return;
        const col = Number(handle.dataset.col);
        const cells = headerCells(table);
        const t = this.tableAt(widget);
        const start = t && t.widths ? fitWidths(t.widths, cells.length) : cells.map((c) => Math.max(MIN_WIDTH, Math.ceil(c.getBoundingClientRect().width) + 1)); // +1: a word that fitted exactly must not wrap
        const drag = { table, widget, col, x0: e.clientX, start, widths: start.slice(), moved: false };
        this.drag = drag;
        handle.classList.add('is-active');
        document.body.classList.add('wt-resizing');
        const win = handle.ownerDocument.defaultView || window;
        const move = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const dx = ev.clientX - drag.x0;
          if (Math.abs(dx) >= 1) drag.moved = true;
          drag.widths[col] = Math.max(MIN_WIDTH, Math.round(drag.start[col] + dx));
          applyWidths(table, drag.widths);
          this.placeHandles(table);
        };
        const end = (save) => {
          win.removeEventListener('pointermove', move, true);
          win.removeEventListener('pointerup', up, true);
          win.removeEventListener('pointercancel', cancel, true);
          this.endDrag = null;
          handle.classList.remove('is-active');
          document.body.classList.remove('wt-resizing');
          this.drag = null;
          const stored = t && t.widths ? fitWidths(t.widths, cells.length) : [];
          if (save && drag.moved && !sameWidths(drag.widths, stored)) plugin.saveWidths(this.view, widget, drag.widths);
          this.schedule();
        };
        const up = (ev) => { ev.preventDefault(); ev.stopPropagation(); end(true); };
        const cancel = () => end(false);
        this.endDrag = end;
        win.addEventListener('pointermove', move, true);
        win.addEventListener('pointerup', up, true);
        win.addEventListener('pointercancel', cancel, true);
      }
    });
    this.viewPlugin = viewPlugin;

    return [tablesField, hiddenField, syncFilter, viewPlugin];
  }

  tablesOf(state) {
    return state.field(this.tablesField, false) || [];
  }

  tableForWidget(view, widget) {
    let pos;
    try { pos = view.posAtDOM(widget); } catch (e) { return null; }
    const line = view.state.doc.lineAt(pos).number - 1;
    return this.tablesOf(view.state).find((t) => t.header === line) || null;
  }

  saveWidths(view, widget, widths) {
    const t = this.tableForWidget(view, widget);
    if (!t) return;
    const doc = view.state.doc;
    const text = formatComment(widths);
    const changes = t.comment !== null
      ? { from: doc.line(t.comment + 1).from, to: doc.line(t.comment + 1).to, insert: text }
      : { from: doc.line(t.header + 1).from, insert: `${text}\n\n` };
    view.dispatch({ changes, annotations: this.editAnnotations('wide-tables.resize') });
    if (!view.hasFocus) view.focus();
  }

  /** Our own edits: skipped by the sync filter and kept as a separate Ctrl+Z step. */
  editAnnotations(event) {
    const list = [this.ownEdit.of(true), this.Transaction.userEvent.of(event)];
    if (this.isolateHistory) list.push(this.isolateHistory.of('full'));
    return list;
  }

  resetWidths(view, t) {
    if (t.comment === null) return;
    const doc = view.state.doc;
    const from = doc.line(t.comment + 1).from;
    const to = doc.line(t.header + 1).from;
    view.dispatch({ changes: { from, to }, annotations: this.editAnnotations('wide-tables.reset') });
    if (!view.hasFocus) view.focus();
  }

  /* ---------- Obsidian's table menu: one more item ---------- */

  patchTableMenu() {
    const { EditorView } = require('@codemirror/view');
    this.registerDomEvent(document, 'contextmenu', (e) => { this.lastContextMenu = { target: e.target, time: Date.now() }; }, { capture: true });
    const proto = obsidian.Menu.prototype;
    const plugin = this;
    const wrap = (name) => {
      const orig = proto[name];
      if (typeof orig !== 'function') return;
      proto[name] = function (...args) {
        try { plugin.extendTableMenu(this, EditorView); } catch (err) { console.error('wide-tables: menu', err); }
        return orig.apply(this, args);
      };
      this.register(() => { proto[name] = orig; });
    };
    wrap('showAtMouseEvent');
    wrap('showAtPosition');
  }

  extendTableMenu(menu, EditorView) {
    const ctx = this.lastContextMenu;
    // Only the first menu after a right click: its Row / Column submenus open later and stay as they are.
    this.lastContextMenu = null;
    if (!ctx || Date.now() - ctx.time > 1000 || menu.__wtExtended) return;
    const widget = ctx.target && ctx.target.closest && ctx.target.closest('.cm-table-widget');
    if (!widget) return;
    const view = EditorView.findFromDOM(widget.closest('.cm-editor'));
    if (!view) return;
    const t = this.tableForWidget(view, widget);
    if (!t || t.comment === null) return;
    menu.__wtExtended = true;
    menu.addSeparator();
    menu.addItem((item) => item
      .setTitle('Сбросить ширину столбцов')
      .setIcon('move-horizontal')
      .onClick(() => {
        const fresh = this.tableForWidget(view, widget);
        if (fresh) this.resetWidths(view, fresh);
      }));
  }

  /* ---------- Reading view ---------- */

  processReading(el, ctx) {
    const tables = el.querySelectorAll('table');
    if (!tables.length) return;
    const info = ctx.getSectionInfo(el);
    if (!info) return;
    const all = parseTables(info.text.split('\n'));
    const inSection = all.filter((t) => t.header >= info.lineStart && t.header <= info.lineEnd);
    tables.forEach((table, k) => {
      const t = inSection[k];
      const cols = headerCells(table).length;
      if (t && t.widths && cols) applyWidths(table, fitWidths(t.widths, cols));
    });
  }
}

module.exports = WideTablesPlugin;
module.exports.logic = { splitRow, parseWidths, formatComment, parseTables, headingGaps, fitWidths, adjustWidths, sameWidths, COMMENT_RE };
