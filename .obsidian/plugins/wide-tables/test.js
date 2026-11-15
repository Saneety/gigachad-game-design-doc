// Logic tests for Wide Tables: node test.js (Obsidian does not load this file).
const assert = require('assert');
const Module = require('module');

const load = Module._load;
Module._load = function (request, ...rest) {
  if (request === 'obsidian') return { Plugin: class {}, Menu: class {} };
  return load.call(this, request, ...rest);
};
const { logic } = require('./main.js');
Module._load = load;
const { splitRow, parseTables, formatComment, adjustWidths, fitWidths, COMMENT_RE } = logic;

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; } catch (e) { console.error(`FAIL ${name}\n`, e.message); process.exitCode = 1; }
}

test('splitRow keeps escaped pipes', () => {
  assert.deepStrictEqual(splitRow('| a | b \\| c | d |'), ['a', 'b \\| c', 'd']);
  assert.deepStrictEqual(splitRow('a | b'), ['a', 'b']);
});

test('table without widths', () => {
  const t = parseTables(['text', '', '| A | B |', '| --- | :-: |', '| 1 | 2 |', '', 'after']);
  assert.strictEqual(t.length, 1);
  assert.deepStrictEqual([t[0].header, t[0].delim, t[0].end, t[0].cols], [2, 3, 4, 2]);
  assert.strictEqual(t[0].comment, null);
  assert.strictEqual(t[0].widths, null);
});

test('widths line above a blank line', () => {
  const t = parseTables(['<!-- col-widths: 200 150.4 -->', '', '| A | B |', '|---|---|', '| 1 | 2 |']);
  assert.deepStrictEqual([t[0].comment, t[0].blank], [0, 1]);
  assert.deepStrictEqual(t[0].widths, [200, 150]);
});

test('widths line right above the table', () => {
  const t = parseTables(['<!-- col-widths: 100 90 -->', '| A | B |', '|---|---|']);
  assert.deepStrictEqual([t[0].comment, t[0].blank], [0, null]);
});

test('a broken widths line is ignored', () => {
  const t = parseTables(['<!-- col-widths: -->', '', '| A | B |', '|---|---|']);
  assert.strictEqual(t[0].comment, null);
});

test('tables inside code fences are skipped', () => {
  const t = parseTables(['```', '| A | B |', '|---|---|', '```', '| C |', '| - |']);
  assert.strictEqual(t.length, 1);
  assert.strictEqual(t[0].header, 4);
});

test('two tables', () => {
  const t = parseTables(['| A |', '| - |', '| 1 |', '', '<!-- col-widths: 50 -->', '', '| B |', '|---|', '| 2 |']);
  assert.strictEqual(t.length, 2);
  assert.strictEqual(t[0].comment, null);
  assert.deepStrictEqual(t[1].widths, [50]);
});

test('formatComment round-trips', () => {
  const c = formatComment([200.4, 150, 300]);
  assert.strictEqual(c, '<!-- col-widths: 200 150 300 -->');
  assert.ok(COMMENT_RE.test(c));
});

test('fitWidths pads with the average and cuts', () => {
  assert.deepStrictEqual(fitWidths([100, 200], 3), [100, 200, 150]);
  assert.deepStrictEqual(fitWidths([100, 200, 300], 2), [100, 200]);
});

test('adjustWidths: same headers, edited header, moved column', () => {
  assert.deepStrictEqual(adjustWidths([1, 2, 3], ['a', 'b', 'c'], ['a', 'b', 'c']), [1, 2, 3]);
  assert.deepStrictEqual(adjustWidths([1, 2, 3], ['a', 'b', 'c'], ['a', 'bx', 'c']), [1, 2, 3]);
  assert.deepStrictEqual(adjustWidths([10, 20, 30], ['a', 'b', 'c'], ['b', 'a', 'c']), [20, 10, 30]);
});

test('adjustWidths: deleted column', () => {
  assert.deepStrictEqual(adjustWidths([10, 20, 30], ['a', 'b', 'c'], ['a', 'c']), [10, 30]);
  assert.deepStrictEqual(adjustWidths([10, 20, 30], ['a', 'b', 'c'], ['b', 'c']), [20, 30]);
  assert.deepStrictEqual(adjustWidths([10, 20, 30], ['', '', 'c'], ['', 'c']), [10, 30]);
});

test('adjustWidths: added column gets the average width', () => {
  assert.deepStrictEqual(adjustWidths([100, 200], ['a', 'b'], ['a', '', 'b']), [100, 150, 200]);
  assert.deepStrictEqual(adjustWidths([100, 200], ['a', 'b'], ['', 'a', 'b']), [150, 100, 200]);
  assert.deepStrictEqual(adjustWidths([100, 200], ['a', 'b'], ['a', 'b', '']), [100, 200, 150]);
});

test('adjustWidths: stored list shorter than the table', () => {
  assert.deepStrictEqual(adjustWidths([100], ['a', 'b'], ['a', 'b']), [100, 100]);
});

console.log(`${passed} passed${process.exitCode ? ', some FAILED' : ''}`);
