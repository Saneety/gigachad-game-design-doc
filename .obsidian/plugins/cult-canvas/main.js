'use strict';
/*
 * Cult Canvas - whiteboard tools on top of Obsidian Canvas and Advanced Canvas.
 * Copyright (c) 2026 Saneety. MIT License (LICENSE in https://github.com/Saneety/cult-canvas).
 * Plain CommonJS, no build step. Pure logic is exported as `logic` for `node main.test.js`.
 * The board stays a normal .canvas file (JSON Canvas); README.md describes what this plugin adds to it.
 * The `gb` prefix of CSS classes and of the gbKind / gbSize / gbStroke fields comes from the plugin's working
 * name; boards already store those fields, so it stays.
 *
 * Third-party parts:
 * - perfect-freehand 1.2.3 (vendored below, unchanged), https://github.com/steveruizok/perfect-freehand
 *   MIT License, Copyright (c) 2021 Stephen Ruiz Ltd.
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 *   documentation files (the "Software"), to deal in the Software without restriction, including without
 *   limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 *   Software, and to permit persons to whom the Software is furnished to do so, subject to the following
 *   conditions: The above copyright notice and this permission notice shall be included in all copies or
 *   substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 *   OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 *   SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * - Shantell Sans (embedded at the end of this file as latin, latin-ext and cyrillic woff2 subsets from Google
 *   Fonts), Copyright 2022 The Shantell Sans Project Authors (https://github.com/arrowtype/shantell-sans).
 *   Licensed under the SIL Open Font License, Version 1.1 (OFL.txt in the repository, https://openfontlicense.org).
 */
const obsidian = require('obsidian');

/* eslint-disable @typescript-eslint/no-unused-expressions -- vendored minified library, kept byte for byte */
const PF = (function () {
  const exports = {};
  // perfect-freehand 1.2.3 dist/cjs/index.js, unchanged
  Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:`Module`}});const{PI:e}=Math,t=e+1e-4,n=.5,r=[1,1];function i(e,t,n,r=e=>e){return e*r(.5-t*(.5-n))}const{min:a}=Math;function o(e,t,n){let r=a(1,t/n);return a(1,e+(a(1,1-r)-e)*(r*.275))}function s(e){return[-e[0],-e[1]]}function c(e,t){return[e[0]+t[0],e[1]+t[1]]}function l(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e}function u(e,t){return[e[0]-t[0],e[1]-t[1]]}function d(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e}function f(e,t){return[e[0]*t,e[1]*t]}function p(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e}function m(e,t){return[e[0]/t,e[1]/t]}function h(e){return[e[1],-e[0]]}function g(e,t){let n=t[0];return e[0]=t[1],e[1]=-n,e}function ee(e,t){return e[0]*t[0]+e[1]*t[1]}function _(e,t){return e[0]===t[0]&&e[1]===t[1]}function v(e){return Math.hypot(e[0],e[1])}function y(e,t){let n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r}function b(e){return m(e,v(e))}function x(e,t){return Math.hypot(e[1]-t[1],e[0]-t[0])}function S(e,t,n){let r=Math.sin(n),i=Math.cos(n),a=e[0]-t[0],o=e[1]-t[1],s=a*i-o*r,c=a*r+o*i;return[s+t[0],c+t[1]]}function C(e,t,n,r){let i=Math.sin(r),a=Math.cos(r),o=t[0]-n[0],s=t[1]-n[1],c=o*a-s*i,l=o*i+s*a;return e[0]=c+n[0],e[1]=l+n[1],e}function w(e,t,n){return c(e,f(u(t,e),n))}function te(e,t,n,r){let i=n[0]-t[0],a=n[1]-t[1];return e[0]=t[0]+i*r,e[1]=t[1]+a*r,e}function T(e,t,n){return c(e,f(t,n))}const E=[0,0],D=[0,0],O=[0,0];function k(e,n){let r=T(e,b(h(u(e,c(e,[1,1])))),-n),i=[],a=1/13;for(let n=a;n<=1;n+=a)i.push(S(r,e,t*2*n));return i}function A(e,n,r){let i=[],a=1/r;for(let r=a;r<=1;r+=a)i.push(S(n,e,t*r));return i}function j(e,t,n){let r=u(t,n),i=f(r,.5),a=f(r,.51);return[u(e,i),u(e,a),c(e,a),c(e,i)]}function M(e,n,r,i){let a=[],o=T(e,n,r),s=1/i;for(let n=s;n<1;n+=s)a.push(S(o,e,t*3*n));return a}function ne(e,t,n){return[c(e,f(t,n)),c(e,f(t,n*.99)),u(e,f(t,n*.99)),u(e,f(t,n))]}function N(e,t,n){return e===!1||e===void 0?0:e===!0?Math.max(t,n):e}function re(e,t,n){return e.slice(0,10).reduce((e,r)=>{let i=r.pressure;return t&&(i=o(e,r.distance,n)),(e+i)/2},e[0].pressure)}function P(e,n={}){let{size:r=16,smoothing:a=.5,thinning:f=.5,simulatePressure:m=!0,easing:_=e=>e,start:v={},end:b={},last:x=!1}=n,{cap:S=!0,easing:w=e=>e*(2-e)}=v,{cap:T=!0,easing:P=e=>--e*e*e+1}=b;if(e.length===0||r<=0)return[];let F=e[e.length-1].runningLength,I=N(v.taper,r,F),L=N(b.taper,r,F),R=(r*a)**2,z=[],B=[],V=re(e,m,r),H=i(r,f,e[e.length-1].pressure,_),U,W=e[0].vector,G=e[0].point,K=G,q=G,J=K,Y=!1;for(let n=0;n<e.length;n++){let{pressure:a}=e[n],{point:s,vector:h,distance:v,runningLength:b}=e[n],x=n===e.length-1;if(!x&&F-b<3)continue;f?(m&&(a=o(V,v,r)),H=i(r,f,a,_)):H=r/2,U===void 0&&(U=H);let S=b<I?w(b/I):1,T=F-b<L?P((F-b)/L):1;H=Math.max(.01,H*Math.min(S,T));let k=(x?e[n]:e[n+1]).vector,A=x?1:ee(h,k),j=ee(h,W)<0&&!Y,M=A!==null&&A<0;if(j||M){g(E,W),p(E,E,H);for(let e=0;e<=1;e+=.07692307692307693)d(D,s,E),C(D,D,s,t*e),q=[D[0],D[1]],z.push(q),l(O,s,E),C(O,O,s,t*-e),J=[O[0],O[1]],B.push(J);G=q,K=J,M&&(Y=!0);continue}if(Y=!1,x){g(E,h),p(E,E,H),z.push(u(s,E)),B.push(c(s,E));continue}te(E,k,h,A),g(E,E),p(E,E,H),d(D,s,E),q=[D[0],D[1]],(n<=1||y(G,q)>R)&&(z.push(q),G=q),l(O,s,E),J=[O[0],O[1]],(n<=1||y(K,J)>R)&&(B.push(J),K=J),V=a,W=h}let X=[e[0].point[0],e[0].point[1]],Z=e.length>1?[e[e.length-1].point[0],e[e.length-1].point[1]]:c(e[0].point,[1,1]),Q=[],$=[];if(e.length===1){if(!(I||L)||x)return k(X,U||H)}else{I||L&&e.length===1||(S?Q.push(...A(X,B[0],13)):Q.push(...j(X,z[0],B[0])));let t=h(s(e[e.length-1].vector));L||I&&e.length===1?$.push(Z):T?$.push(...M(Z,t,H,29)):$.push(...ne(Z,t,H))}return z.concat($,B.reverse(),Q)}const F=[0,0];function I(e){return e!=null&&e>=0}function L(e,t={}){let{streamline:i=.5,size:a=16,last:o=!1}=t;if(e.length===0)return[];let s=.15+(1-i)*.85,l=Array.isArray(e[0])?e:e.map(({x:e,y:t,pressure:r=n})=>[e,t,r]);if(l.length===2){let e=l[1];l=l.slice(0,-1);for(let t=1;t<5;t++)l.push(w(l[0],e,t/4))}l.length===1&&(l=[...l,[...c(l[0],r),...l[0].slice(2)]]);let u=[{point:[l[0][0],l[0][1]],pressure:I(l[0][2])?l[0][2]:.25,vector:[...r],distance:0,runningLength:0}],f=!1,p=0,m=u[0],h=l.length-1;for(let e=1;e<l.length;e++){let t=o&&e===h?[l[e][0],l[e][1]]:w(m.point,l[e],s);if(_(m.point,t))continue;let r=x(t,m.point);if(p+=r,e<h&&!f){if(p<a)continue;f=!0}d(F,m.point,t),m={point:t,pressure:I(l[e][2])?l[e][2]:n,vector:b(F),distance:r,runningLength:p},u.push(m)}return u[0].vector=u[1]?.vector||[0,0],u}function R(e,t={}){return P(L(e,t),t)}var z=R;exports.default=z,exports.getStroke=R,exports.getStrokeOutlinePoints=P,exports.getStrokePoints=L;
  return exports;
})();
/* eslint-enable @typescript-eslint/no-unused-expressions -- end of the vendored library */

// ---------------------------------------------------------------- constants

// Labels of colours, tools and shapes are in STRINGS (color.<id>, tool.<id>, shape.<id>).
const MARKER_COLORS = [
  { id: 'red', hex: '#FF5A3D' },
  { id: 'white', hex: '#EDEDED' },
  { id: 'yellow', hex: '#FFD54A' },
  { id: 'blue', hex: '#5DB2FF' },
  { id: 'green', hex: '#7CE8A6' },
];
// Marker line width in canvas pixels, set with the slider.
const MARKER_WIDTH = { min: 1, max: 30, def: 4 };
// thinning 0 and no simulated pressure: the line has the same width whatever the speed and direction.
const STROKE_OPTIONS = { thinning: 0, smoothing: 0.5, streamline: 0.35, simulatePressure: false, last: true };

const TOOLS = [
  { id: 'select', code: 'KeyV', hotkey: 'V', icon: 'mouse-pointer-2' },
  { id: 'hand', code: 'KeyH', hotkey: 'H', icon: 'hand' },
  { id: 'sticky', code: 'KeyS', hotkey: 'S', icon: 'sticky-note' },
  { id: 'text', code: 'KeyT', hotkey: 'T', icon: 'type' },
  { id: 'shape', code: 'KeyR', hotkey: 'R', icon: 'shapes' },
  { id: 'marker', code: 'KeyP', hotkey: 'P', icon: 'pencil' },
  { id: 'eraser', code: 'KeyE', hotkey: 'E', icon: 'eraser' },
  { id: 'frame', code: 'KeyF', hotkey: 'F', icon: 'frame' },
  { id: 'insert', code: 'KeyI', hotkey: 'I', icon: 'image-plus' },
];
// Tools that capture the pointer over the board (select works through Canvas itself, insert opens a menu).
const OVERLAY_TOOLS = new Set(['hand', 'sticky', 'text', 'shape', 'marker', 'eraser', 'frame']);
// Tools that return to select after one object is placed.
const ONE_SHOT_TOOLS = new Set(['sticky', 'text', 'shape', 'frame']);

// `value` is the Advanced Canvas `shape` style attribute (null = its default rounded rectangle).
const SHAPES = [
  { id: 'rect', value: null, icon: 'rectangle-horizontal', w: 260, h: 120 },
  { id: 'pill', value: 'pill', icon: 'pill', w: 260, h: 100 },
  { id: 'diamond', value: 'diamond', icon: 'diamond', w: 220, h: 220 },
  { id: 'circle', value: 'circle', icon: 'circle', w: 200, h: 200 },
  { id: 'parallelogram', value: 'parallelogram', icon: 'square-slash', w: 260, h: 120 },
  { id: 'document', value: 'document', icon: 'file-text', w: 240, h: 150 },
  { id: 'database', value: 'database', icon: 'database', w: 220, h: 170 },
];

// The popup over the selection. Text sizes are board pixels; 18 is the size of a card nobody changed.
const FONT_SIZE = { min: 8, max: 200, def: 18, steps: [10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 48, 64, 80, 96, 128] };
const LEGACY_FONT_SIZES = { s: 14, l: 26, xl: 38 }; // the older gbSize field of existing boards
const LINE_HEIGHTS = [null, 1, 1.25, 1.5, 2];
const POPUP_MARGIN = 8; // the popup and its lists keep this far from the board sides and toolbars
const EDGE_WIDTH = { min: 1, max: 12, def: 3 };
const POPUP_COLORS = ['#FFFFFF', '#EDEDED', '#A3A6AD', '#1F2126', '#FF5A3D', '#FFB03A', '#FFD54A', '#7CE8A6', '#5DB2FF', '#B48CFF'];
const TEXT_CONTROLS = ['size', '|', 'bold', 'align', 'list', 'lineHeight', '|', 'textColor', 'highlight'];
// The buttons of the popup per kind of selection, '|' is a divider.
const POPUP_CONTROLS = {
  shape: ['type', 'fill', 'border', '|', ...TEXT_CONTROLS],
  sticky: ['type', 'fill', '|', ...TEXT_CONTROLS],
  text: ['type', '|', ...TEXT_CONTROLS, 'fill'],
  stroke: ['inkColor', 'inkWidth'],
  edge: ['edgeColor', 'edgeLine', 'edgeEnds'],
  frame: ['fill', 'border'],
  image: ['border'],
  note: ['border', '|', 'size'],
  link: ['border'],
  mixed: ['filter'],
};
// Buttons of Canvas whose job the popup does itself: not repeated in the "..." menu (colour, arrow direction).
const POPUP_REPLACED_ICONS = new Set(['lucide-palette', 'lucide-arrow-right']);
const KIND_ICONS = { shape: 'shapes', sticky: 'sticky-note', text: 'type', stroke: 'pencil', edge: 'arrow-up-right', frame: 'frame', image: 'image', note: 'file-text', link: 'link' };
const ALIGN_OPTIONS = [{ id: 'left', value: null }, { id: 'center', value: 'center' }, { id: 'right', value: 'right' }];
// The values and icons are those of Advanced Canvas (its style attributes border, pathfindingMethod, path, arrow).
const BORDER_OPTIONS = [
  { id: 'solid', value: null, icon: 'border-solid' }, { id: 'dashed', value: 'dashed', icon: 'border-dashed' },
  { id: 'dotted', value: 'dotted', icon: 'border-dotted' }, { id: 'none', value: 'invisible', icon: 'eye-off' },
];
const EDGE_ROUTES = [
  { id: 'curve', value: null, icon: 'pathfinding-method-bezier' }, { id: 'direct', value: 'direct', icon: 'slash' },
  { id: 'square', value: 'square', icon: 'pathfinding-method-square' }, { id: 'smart', value: 'a-star', icon: 'map' },
];
const EDGE_PATHS = [
  { id: 'solid', value: null, icon: 'path-solid' }, { id: 'dotted', value: 'dotted', icon: 'path-dotted' },
  { id: 'short', value: 'short-dashed', icon: 'path-short-dashed' }, { id: 'long', value: 'long-dashed', icon: 'path-long-dashed' },
];
const EDGE_DIRECTIONS = [
  { id: 'none', fromEnd: 'none', toEnd: 'none', icon: 'minus' }, { id: 'forward', fromEnd: 'none', toEnd: 'arrow', icon: 'arrow-right' },
  { id: 'back', fromEnd: 'arrow', toEnd: 'none', icon: 'arrow-left' }, { id: 'both', fromEnd: 'arrow', toEnd: 'arrow', icon: 'arrow-left-right' },
];
const EDGE_HEADS = [
  { id: 'triangle', value: null, icon: 'arrow-triangle' }, { id: 'triangleOutline', value: 'triangle-outline', icon: 'arrow-triangle-outline' },
  { id: 'thin', value: 'thin-triangle', icon: 'arrow-thin-triangle' }, { id: 'halved', value: 'halved-triangle', icon: 'arrow-halved-triangle' },
  { id: 'diamond', value: 'diamond', icon: 'arrow-diamond' }, { id: 'diamondOutline', value: 'diamond-outline', icon: 'arrow-diamond-outline' },
  { id: 'circle', value: 'circle', icon: 'arrow-circle' }, { id: 'circleOutline', value: 'circle-outline', icon: 'arrow-circle-outline' },
  { id: 'blunt', value: 'blunt', icon: 'tally-1' },
];

const CARD_SIZES = {
  sticky: { w: 220, h: 220, minW: 120, minH: 80 },
  text: { w: 320, h: 70, minW: 80, minH: 40 },
  shape: { minW: 80, minH: 50 },
  frame: { w: 640, h: 420, minW: 120, minH: 80 },
};
const DRAG_THRESHOLD_PX = 6;
const ERASER_RADIUS_PX = 12;
const IMAGE_MAX = { w: 520, h: 400 };
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'avif']);
const FONT_FAMILY = 'Cult Canvas Shantell';
// gridDefaultApplied: grid snapping (a core Canvas option) was switched off once, as the default.
const DUPLICATE_SHIFT = 20; // Ctrl+D puts the copy this far right and down
const STYLE_CHECK_MS = 250; // a style change is read when the card menu settles (its colour hover previews)
const IS_MAC = !!(obsidian.Platform && obsidian.Platform.isMacOS);
const MOD_LABEL = IS_MAC ? '⌘' : 'Ctrl';

// styleDefaults: element kind -> its last applied style (see styleKindOf and styleSnapshot)
// language: interface language, a key of STRINGS
// markerColor: a MARKER_COLORS id or a colour of one's own '#RRGGBB'; markerRecentColors: the own colours, newest first
const DEFAULT_SETTINGS = { language: 'en', markerColor: 'red', markerRecentColors: [], markerWidth: MARKER_WIDTH.def, shape: 'rect', minimap: true, gridDefaultApplied: false, styleDefaults: {} };

// ---------------------------------------------------------------- interface text

// Every text the plugin shows, per language. {name} is filled in by t(key, { name }).
const STRINGS = {
  en: {
    'color.red': 'Red', 'color.white': 'White', 'color.yellow': 'Yellow', 'color.blue': 'Blue', 'color.green': 'Green',
    'tool.select': 'Select', 'tool.hand': 'Hand', 'tool.sticky': 'Sticky note', 'tool.text': 'Text', 'tool.shape': 'Shape',
    'tool.marker': 'Marker', 'tool.eraser': 'Eraser', 'tool.frame': 'Frame', 'tool.insert': 'Image or note',
    'shape.rect': 'Rectangle', 'shape.pill': 'Oval', 'shape.diamond': 'Diamond', 'shape.circle': 'Circle',
    'shape.parallelogram': 'Parallelogram', 'shape.document': 'Document', 'shape.database': 'Database',
    'marker.width': 'Width', 'marker.widthAria': 'Line width',
    'nav.zoomOut': 'Zoom out', 'nav.zoomIn': 'Zoom in', 'nav.zoomLabel': 'Zoom {pct}, click to reset to 100%',
    'nav.fit': 'Zoom to fit', 'nav.grid': 'Snap to grid', 'nav.gridOn': 'Snap to grid: on', 'nav.gridOff': 'Snap to grid: off',
    'nav.minimap': 'Minimap',
    'frame.label': 'Section',
    'insert.imageDisk': 'Image from computer…', 'insert.imageVault': 'Image from vault…', 'insert.imageVaultPick': 'Image from vault',
    'insert.note': 'Note from vault…', 'insert.notePick': 'Note from vault',
    'menu.copy': 'Copy', 'menu.front': 'Bring to front', 'menu.forward': 'Bring forward', 'menu.backward': 'Send backward',
    'menu.back': 'Send to back', 'menu.duplicate': 'Duplicate', 'menu.more': 'More', 'menu.removeBends': 'Remove bend points',
    'marker.addColor': 'Add a color', 'marker.ownColor': 'Color {hex}',
    'popup.type': 'Type', 'popup.fill': 'Fill', 'popup.border': 'Border', 'popup.size': 'Text size', 'popup.sizeUp': 'Larger', 'popup.sizeDown': 'Smaller',
    'popup.bold': 'Bold', 'popup.align': 'Alignment', 'popup.list': 'List', 'popup.lineHeight': 'Line spacing', 'popup.lineHeightDefault': 'Normal',
    'popup.textColor': 'Text color', 'popup.highlight': 'Highlight', 'popup.color': 'Color', 'popup.width': 'Thickness',
    'popup.default': 'Default', 'popup.none': 'None', 'popup.filter': 'Filter', 'popup.line': 'Line', 'popup.ends': 'Arrow ends',
    'popup.objects.one': '{n} object', 'popup.objects.few': '{n} objects', 'popup.objects.many': '{n} objects',
    'kind.shape': 'Shape', 'kind.sticky': 'Sticky note', 'kind.text': 'Text', 'kind.stroke': 'Marker line', 'kind.edge': 'Arrow',
    'kind.frame': 'Frame', 'kind.image': 'Image', 'kind.note': 'Note', 'kind.link': 'Web page',
    'align.left': 'Left', 'align.center': 'Center', 'align.right': 'Right',
    'border.solid': 'Solid', 'border.dashed': 'Dashed', 'border.dotted': 'Dotted', 'border.none': 'No border',
    'route.curve': 'Curved', 'route.direct': 'Straight', 'route.square': 'Right angles', 'route.smart': 'Around cards',
    'path.solid': 'Solid', 'path.dotted': 'Dotted', 'path.short': 'Short dashes', 'path.long': 'Long dashes',
    'dir.none': 'No arrows', 'dir.forward': 'Arrow at the end', 'dir.back': 'Arrow at the start', 'dir.both': 'Arrows at both ends',
    'head.triangle': 'Triangle', 'head.triangleOutline': 'Triangle outline', 'head.thin': 'Thin triangle', 'head.halved': 'Half triangle',
    'head.diamond': 'Diamond', 'head.diamondOutline': 'Diamond outline', 'head.circle': 'Circle', 'head.circleOutline': 'Circle outline', 'head.blunt': 'Blunt',
    'command.tool': 'Tool: {tool}', 'command.grid': 'Toggle snap to grid',
    'notice.failed': 'Cult Canvas: that did not work, details are in the developer console.',
    'notice.imageFailed': 'Cult Canvas: could not add {name}.',
    'ac.title': 'Cult Canvas needs the Advanced Canvas plugin', 'ac.install': 'Install Advanced Canvas', 'ac.enable': 'Enable Advanced Canvas',
    'ac.text': 'Advanced Canvas is not installed. Without it bend points on arrows, shapes, sticky notes, marker lines and text sizes do not work.',
    'ac.textOff': 'Advanced Canvas is turned off. Without it bend points on arrows, shapes, sticky notes, marker lines and text sizes do not work.',
    'ac.close': 'Hide until Obsidian restarts',
    'settings.language': 'Language', 'settings.languageDesc': 'Language of the board tools, menus and commands.',
  },
  ru: {
    'color.red': 'Красный', 'color.white': 'Белый', 'color.yellow': 'Жёлтый', 'color.blue': 'Синий', 'color.green': 'Зелёный',
    'tool.select': 'Выделение', 'tool.hand': 'Рука', 'tool.sticky': 'Стикер', 'tool.text': 'Текст', 'tool.shape': 'Фигура',
    'tool.marker': 'Маркер', 'tool.eraser': 'Ластик', 'tool.frame': 'Рамка', 'tool.insert': 'Картинка или заметка',
    'shape.rect': 'Прямоугольник', 'shape.pill': 'Овал', 'shape.diamond': 'Ромб', 'shape.circle': 'Круг',
    'shape.parallelogram': 'Параллелограмм', 'shape.document': 'Документ', 'shape.database': 'База данных',
    'marker.width': 'Толщина', 'marker.widthAria': 'Толщина линии',
    'nav.zoomOut': 'Отдалить', 'nav.zoomIn': 'Приблизить', 'nav.zoomLabel': 'Масштаб {pct}, нажми - 100%',
    'nav.fit': 'Показать всё', 'nav.grid': 'Привязка к сетке', 'nav.gridOn': 'Привязка к сетке: вкл', 'nav.gridOff': 'Привязка к сетке: выкл',
    'nav.minimap': 'Мини-карта',
    'frame.label': 'Раздел',
    'insert.imageDisk': 'Картинка с компьютера…', 'insert.imageVault': 'Картинка из хранилища…', 'insert.imageVaultPick': 'Картинка из хранилища',
    'insert.note': 'Заметка из хранилища…', 'insert.notePick': 'Заметка из хранилища',
    'menu.copy': 'Копировать', 'menu.front': 'На передний план', 'menu.forward': 'Перенести вперёд', 'menu.backward': 'Перенести назад',
    'menu.back': 'На задний план', 'menu.duplicate': 'Дублировать', 'menu.more': 'Ещё', 'menu.removeBends': 'Убрать узлы',
    'marker.addColor': 'Добавить цвет', 'marker.ownColor': 'Цвет {hex}',
    'popup.type': 'Тип', 'popup.fill': 'Заливка', 'popup.border': 'Обводка', 'popup.size': 'Размер текста', 'popup.sizeUp': 'Крупнее', 'popup.sizeDown': 'Мельче',
    'popup.bold': 'Жирный', 'popup.align': 'Выравнивание', 'popup.list': 'Список', 'popup.lineHeight': 'Межстрочный интервал', 'popup.lineHeightDefault': 'Обычный',
    'popup.textColor': 'Цвет текста', 'popup.highlight': 'Выделение текста', 'popup.color': 'Цвет', 'popup.width': 'Толщина',
    'popup.default': 'По умолчанию', 'popup.none': 'Нет', 'popup.filter': 'Фильтр', 'popup.line': 'Линия', 'popup.ends': 'Концы стрелки',
    'popup.objects.one': '{n} объект', 'popup.objects.few': '{n} объекта', 'popup.objects.many': '{n} объектов',
    'kind.shape': 'Фигуры', 'kind.sticky': 'Стикеры', 'kind.text': 'Текст', 'kind.stroke': 'Линии маркера', 'kind.edge': 'Стрелки',
    'kind.frame': 'Разделы', 'kind.image': 'Картинки', 'kind.note': 'Заметки', 'kind.link': 'Веб-страницы',
    'align.left': 'По левому краю', 'align.center': 'По центру', 'align.right': 'По правому краю',
    'border.solid': 'Сплошная', 'border.dashed': 'Штрихи', 'border.dotted': 'Точки', 'border.none': 'Без обводки',
    'route.curve': 'Кривая', 'route.direct': 'Прямая', 'route.square': 'Под прямым углом', 'route.smart': 'В обход карточек',
    'path.solid': 'Сплошная', 'path.dotted': 'Точки', 'path.short': 'Короткие штрихи', 'path.long': 'Длинные штрихи',
    'dir.none': 'Без стрелок', 'dir.forward': 'Стрелка в конце', 'dir.back': 'Стрелка в начале', 'dir.both': 'Стрелки с двух сторон',
    'head.triangle': 'Треугольник', 'head.triangleOutline': 'Контур треугольника', 'head.thin': 'Тонкий треугольник', 'head.halved': 'Половина треугольника',
    'head.diamond': 'Ромб', 'head.diamondOutline': 'Контур ромба', 'head.circle': 'Круг', 'head.circleOutline': 'Контур круга', 'head.blunt': 'Черта',
    'command.tool': 'Инструмент: {tool}', 'command.grid': 'Привязка к сетке: вкл/выкл',
    'notice.failed': 'Cult Canvas: не получилось, подробности в консоли разработчика.',
    'notice.imageFailed': 'Cult Canvas: не удалось добавить {name}.',
    'ac.title': 'Cult Canvas нужен плагин Advanced Canvas', 'ac.install': 'Установить Advanced Canvas', 'ac.enable': 'Включить Advanced Canvas',
    'ac.text': 'Advanced Canvas не установлен. Без него не работают узлы на стрелках, фигуры, стикеры, линии маркера и размеры текста.',
    'ac.textOff': 'Advanced Canvas выключен. Без него не работают узлы на стрелках, фигуры, стикеры, линии маркера и размеры текста.',
    'ac.close': 'Скрыть до перезапуска Obsidian',
    'settings.language': 'Язык', 'settings.languageDesc': 'Язык панелей доски, меню и команд.',
  },
};
// The names the language list shows, each in its own language.
const LANGUAGE_NAMES = { en: 'English', ru: 'Русский' };

let currentLanguage = 'en';
function setLanguage(lang) { currentLanguage = STRINGS[lang] ? lang : 'en'; }

function t(key, vars) {
  const text = STRINGS[currentLanguage][key] ?? STRINGS.en[key] ?? key;
  return vars ? text.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? String(vars[name]) : m)) : text;
}


// ---------------------------------------------------------------- pure logic

function round1(v) { return Math.round(v * 10) / 10; }

function clampMarkerWidth(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(MARKER_WIDTH.max, Math.max(MARKER_WIDTH.min, n)) : MARKER_WIDTH.def;
}

function dedupePoints(points, minDist = 0.75) {
  const out = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= minDist) out.push([p[0], p[1]]);
  }
  return out;
}

// Points [[x, y], ...] in canvas coordinates -> the fields of a stroke node:
// the node box (integers, padded by the marker size) and gbStroke with points relative to the box.
function buildStrokeNode(points, size) {
  let pts = dedupePoints(points);
  if (pts.length === 0) throw new Error('Cult Canvas: empty stroke');
  if (pts.length === 1) pts = [pts[0], [pts[0][0] + 0.5, pts[0][1] + 0.5]];
  const pad = Math.ceil(size);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pts) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  const x = Math.floor(minX - pad);
  const y = Math.floor(minY - pad);
  const width = Math.ceil(maxX + pad) - x;
  const height = Math.ceil(maxY + pad) - y;
  return {
    x, y, width, height,
    gbStroke: { v: 1, size, w: width, h: height, points: pts.map(([px, py]) => [round1(px - x), round1(py - y)]) },
  };
}

function isValidStroke(s) {
  return !!s && typeof s === 'object' && Array.isArray(s.points) && s.points.length > 0
    && s.points.every((p) => Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1]))
    && Number.isFinite(s.size) && s.size > 0 && Number.isFinite(s.w) && s.w > 0 && Number.isFinite(s.h) && s.h > 0;
}

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

// Distance from a canvas point to the stroke centre line, with the node possibly resized since drawing.
function strokeDistance(box, s, pos) {
  const sx = box.width / s.w, sy = box.height / s.h;
  const pts = s.points;
  const px = (i) => box.x + pts[i][0] * sx;
  const py = (i) => box.y + pts[i][1] * sy;
  if (pts.length === 1) return Math.hypot(pos.x - px(0), pos.y - py(0));
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const d = distToSegment(pos.x, pos.y, px(i - 1), py(i - 1), px(i), py(i));
    if (d < best) best = d;
  }
  return best;
}

function strokeHit(box, s, pos, tolerance) {
  if (pos.x < box.x - tolerance || pos.y < box.y - tolerance
    || pos.x > box.x + box.width + tolerance || pos.y > box.y + box.height + tolerance) return false;
  const half = (s.size / 2) * ((box.width / s.w + box.height / s.h) / 2);
  return strokeDistance(box, s, pos) <= half + tolerance;
}

// Points between a and b no farther apart than step, both ends included (eraser sweeps).
function samplePath(a, b, step) {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const n = Math.max(1, Math.ceil(d / Math.max(step, 0.001)));
  const out = [];
  for (let i = 0; i <= n; i++) out.push({ x: a.x + ((b.x - a.x) * i) / n, y: a.y + ((b.y - a.y) * i) / n });
  return out;
}

const average = (a, b) => (a + b) / 2;
// From the perfect-freehand README: outline points -> a smooth closed SVG path.
function getSvgPathFromStroke(points, closed = true) {
  const len = points.length;
  if (len < 4) return '';
  let a = points[0], b = points[1];
  const c = points[2];
  let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(2)},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(b[1], c[1]).toFixed(2)} T`;
  for (let i = 2, max = len - 1; i < max; i++) {
    a = points[i];
    b = points[i + 1];
    result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(2)} `;
  }
  if (closed) result += 'Z';
  return result;
}

function strokeOutlinePoints(points, size) { return PF.getStroke(points, { size, ...STROKE_OPTIONS }); }

function strokeOutlinePath(points, size) {
  return getSvgPathFromStroke(strokeOutlinePoints(points, size));
}

function centerlinePath(points) {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  const tail = rest.length ? rest : [[first[0] + 0.01, first[1] + 0.01]];
  return `M${first[0]},${first[1]} ` + tail.map((p) => `L${p[0]},${p[1]}`).join(' ');
}

// Rectangle from two drag corners, normalised, with optional minimum size.
function dragRect(a, b, minW = 0, minH = 0) {
  const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y);
  return { x: Math.round(x), y: Math.round(y), width: Math.round(Math.max(minW, Math.abs(b.x - a.x))), height: Math.round(Math.max(minH, Math.abs(b.y - a.y))) };
}

function centeredRect(pos, w, h) {
  return { x: Math.round(pos.x - w / 2), y: Math.round(pos.y - h / 2), width: w, height: h };
}

function unionBounds(boxes) {
  let out = null;
  for (const b of boxes) {
    if (!b) continue;
    if (!out) out = { minX: b.minX, minY: b.minY, maxX: b.maxX, maxY: b.maxY };
    else {
      out.minX = Math.min(out.minX, b.minX);
      out.minY = Math.min(out.minY, b.minY);
      out.maxX = Math.max(out.maxX, b.maxX);
      out.maxY = Math.max(out.maxY, b.maxY);
    }
  }
  return out;
}

// Canvas bounds -> minimap of width x height with padding: x_map = ox + (x - minX) * scale.
function minimapFit(bounds, width, height, pad) {
  const bw = Math.max(1, bounds.maxX - bounds.minX), bh = Math.max(1, bounds.maxY - bounds.minY);
  const scale = Math.min((width - 2 * pad) / bw, (height - 2 * pad) / bh);
  const ox = pad + ((width - 2 * pad) - bw * scale) / 2;
  const oy = pad + ((height - 2 * pad) - bh * scale) / 2;
  return {
    scale, ox, oy, minX: bounds.minX, minY: bounds.minY,
    toMap: (x, y) => ({ x: ox + (x - bounds.minX) * scale, y: oy + (y - bounds.minY) * scale }),
    toCanvas: (mx, my) => ({ x: bounds.minX + (mx - ox) / scale, y: bounds.minY + (my - oy) / scale }),
  };
}

function zoomPercent(scale) { return `${Math.round(scale * 100)}%`; }

function toolByCode(code) {
  const t = TOOLS.find((x) => x.code === code);
  return t ? t.id : null;
}

function imageFitSize(w, h, max = IMAGE_MAX) {
  if (!(w > 0 && h > 0)) return { width: max.w, height: max.h };
  const k = Math.min(1, max.w / w, max.h / h);
  return { width: Math.round(w * k), height: Math.round(h * k) };
}

// ---------- layers

function boxesOverlap(a, b) {
  return !!a && !!b && a.minX < b.maxX && b.minX < a.maxX && a.minY < b.maxY && b.minY < a.maxY;
}

// New bottom-to-top order after a layer action on the selected ids: 'front' and 'back' move them past
// everything, 'forward' and 'backward' one step past the nearest element they overlap (like Holst).
function layerOrder(order, selected, action, overlaps = () => true) {
  const sel = (id) => selected.has(id);
  const arr = order.slice();
  if (action === 'front') return arr.filter((id) => !sel(id)).concat(arr.filter(sel));
  if (action === 'back') return arr.filter(sel).concat(arr.filter((id) => !sel(id)));
  if (action === 'forward') {
    for (let i = arr.length - 1; i >= 0; i--) {
      const id = arr[i];
      if (!sel(id)) continue;
      let j = i + 1;
      while (j < arr.length && (sel(arr[j]) || !overlaps(id, arr[j]))) j++;
      if (j >= arr.length) continue;
      arr.splice(i, 1);
      arr.splice(j, 0, id); // right above the element it overlapped
    }
  } else if (action === 'backward') {
    for (let i = 0; i < arr.length; i++) {
      const id = arr[i];
      if (!sel(id)) continue;
      let j = i - 1;
      while (j >= 0 && (sel(arr[j]) || !overlaps(id, arr[j]))) j--;
      if (j < 0) continue;
      arr.splice(i, 1);
      arr.splice(j, 0, id); // right under the element it overlapped
    }
  }
  return arr;
}

// ---------- last style memory: every kind of element and every shape remembers its own last style

const STYLE_IDENTITY = ['gbKind', 'shape']; // these say what an element is, not how it looks

function styleKindOf(data, isEdge) {
  if (isEdge) return 'edge';
  if (!data || data.gbStroke) return null; // a marker line takes colour and width from the marker panel
  const sa = data.styleAttributes || {};
  if (data.type === 'text') {
    if (sa.gbKind === 'sticky' || sa.gbKind === 'text') return sa.gbKind;
    return sa.shape ? `shape:${sa.shape}` : 'card';
  }
  return data.type === 'group' || data.type === 'file' || data.type === 'link' ? data.type : null;
}

// What is remembered: the colour and the Advanced Canvas style attributes (text size, alignment, border,
// line shape, dashes...), for arrows also their ends. Not the size, position or text.
function styleSnapshot(data, isEdge) {
  const styleAttributes = {};
  for (const [k, v] of Object.entries((data && data.styleAttributes) || {})) {
    if (!STYLE_IDENTITY.includes(k) && v !== undefined && v !== null) styleAttributes[k] = v;
  }
  const s = { styleAttributes };
  if (data && data.color) s.color = data.color;
  if (isEdge && data) {
    if (data.fromEnd) s.fromEnd = data.fromEnd;
    if (data.toEnd) s.toEnd = data.toEnd;
  }
  return s;
}

function styleKey(style) {
  return JSON.stringify(style, (k, v) => (v && typeof v === 'object' && !Array.isArray(v)
    ? Object.fromEntries(Object.keys(v).sort().map((x) => [x, v[x]])) : v));
}

function applyStyle(data, style, isEdge) {
  const next = { ...data };
  if (style.color) next.color = style.color; else delete next.color;
  const sa = { ...(style.styleAttributes || {}) };
  const old = data.styleAttributes || {};
  for (const k of STYLE_IDENTITY) if (old[k] !== undefined) sa[k] = old[k];
  if (data.styleAttributes || Object.keys(sa).length) next.styleAttributes = sa;
  if (isEdge) for (const k of ['fromEnd', 'toEnd']) { if (style[k]) next[k] = style[k]; else delete next[k]; }
  return next;
}

// ---------- box selection of arrows: the line, not its bounding box, has to touch the selection box

function segmentHitsRect(ax, ay, bx, by, r) {
  let t0 = 0;
  let t1 = 1;
  const dx = bx - ax;
  const dy = by - ay;
  const p = [-dx, dx, -dy, dy];
  const q = [ax - r.minX, r.maxX - ax, ay - r.minY, r.maxY - ay];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) { if (q[i] < 0) return false; continue; }
    const t = q[i] / p[i];
    if (p[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return true;
}

function polylineHitsRect(points, r) {
  if (!points || points.length === 0) return false;
  if (points.length === 1) return segmentHitsRect(points[0][0], points[0][1], points[0][0], points[0][1], r);
  for (let i = 1; i < points.length; i++) {
    if (segmentHitsRect(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1], r)) return true;
  }
  return false;
}

// ---------- bend points of arrows (gbWaypoints: [[x, y], ...] in canvas coordinates, see README.md)

const EDGE_STUB = 7; // Canvas starts and ends the line this far out from the card side, under the arrowhead
const EDGE_CURVE_MAX = 150; // the longest control arm of an end of a curve, as in Canvas
const BEND_SNAP_PX = 8; // a dragged bend point lines up with its neighbours this close on screen
const SIDE_NORMALS = { top: [0, -1], right: [1, 0], bottom: [0, 1], left: [-1, 0] };
const SIDE_DEGREES = { top: 180, bottom: 0, left: 90, right: 270 }; // Canvas turns an arrowhead on a side this much

function isValidWaypoints(w) {
  return Array.isArray(w) && w.length > 0 && w.every((p) => Array.isArray(p) && p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]));
}

// The middle of a side of a box { minX, minY, maxX, maxY }, where Canvas attaches an arrow.
function sideCenter(box, side) {
  const cx = (box.minX + box.maxX) / 2, cy = (box.minY + box.maxY) / 2;
  if (side === 'top') return { x: cx, y: box.minY };
  if (side === 'bottom') return { x: cx, y: box.maxY };
  if (side === 'left') return { x: box.minX, y: cy };
  return { x: box.maxX, y: cy };
}

// The rotation of an arrowhead (its tip at 0,0 pointing up) that travels from a to b: the CSS rotate() of Canvas.
function arrowDegrees(a, b) {
  const deg = (Math.atan2(b.x - a.x, -(b.y - a.y)) * 180) / Math.PI;
  return Math.round(((deg % 360) + 360) % 360 * 100) / 100;
}

const fmt = (v) => Math.round(v * 100) / 100;
const pt = (x, y) => ({ x, y });
const unit = (dx, dy) => { const l = Math.hypot(dx, dy); return l > 1e-9 ? [dx / l, dy / l] : [0, 0]; };
const bezierAt = (p0, c1, c2, p1, t) => {
  const u = 1 - t;
  const a = u * u * u, b = 3 * t * u * u, c = 3 * t * t * u, d = t * t * t;
  return pt(a * p0.x + b * c1.x + c * c2.x + d * p1.x, a * p0.y + b * c1.y + c * c2.y + d * p1.y);
};

function polylineLength(points) {
  let len = 0;
  for (let i = 1; i < points.length; i++) len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  return len;
}

// The point halfway along a polyline of {x, y}.
function polylineMiddle(points) {
  if (points.length === 1) return pt(points[0].x, points[0].y);
  let left = polylineLength(points) / 2;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    if (l >= left && l > 0) return pt(a.x + ((b.x - a.x) * left) / l, a.y + ((b.y - a.y) * left) / l);
    left -= l;
  }
  const last = points[points.length - 1];
  return pt(last.x, last.y);
}

// The route of an arrow from the side centre `start` to the side centre `end` through bend points, in the shape of
// the Advanced Canvas pathfinding method: 'direct' - straight segments, 'square' - right angles (the line leaves and
// enters the cards square to their sides), anything else - a smooth curve through the points (its ends leave the
// sides square, as a plain Canvas arrow does). `ends` says which ends have an arrowhead: there the line stops under
// it, elsewhere it reaches the card. Returns the SVG path `d`, the sampled `line` [[x, y], ...] from start to end,
// `mids` - the middle of each segment between the points, `center` - halfway along, and the arrowhead rotations.
function edgeRoute(start, fromSide, end, toSide, waypoints, method, ends = { from: false, to: true }) {
  const w = waypoints.map((p) => pt(p[0], p[1]));
  const nf = SIDE_NORMALS[fromSide] || [1, 0], nt = SIDE_NORMALS[toSide] || [-1, 0];
  let s, c, fromDeg, toDeg;
  if (method === 'direct') {
    const d0 = unit(w[0].x - start.x, w[0].y - start.y);
    const d1 = unit(end.x - w[w.length - 1].x, end.y - w[w.length - 1].y);
    s = pt(start.x + d0[0] * EDGE_STUB, start.y + d0[1] * EDGE_STUB);
    c = pt(end.x - d1[0] * EDGE_STUB, end.y - d1[1] * EDGE_STUB);
    fromDeg = arrowDegrees(w[0], start);
    toDeg = arrowDegrees(w[w.length - 1], end);
  } else {
    s = pt(start.x + nf[0] * EDGE_STUB, start.y + nf[1] * EDGE_STUB);
    c = pt(end.x + nt[0] * EDGE_STUB, end.y + nt[1] * EDGE_STUB);
    fromDeg = SIDE_DEGREES[fromSide] ?? 0;
    toDeg = SIDE_DEGREES[toSide] ?? 0;
  }
  const P = [s, ...w, c];
  const segs = []; // per segment: { d: path commands after its first point, pts: its sampled points }
  if (method === 'direct') {
    for (let i = 0; i + 1 < P.length; i++) segs.push({ d: `L${fmt(P[i + 1].x)},${fmt(P[i + 1].y)}`, pts: [P[i], P[i + 1]] });
  } else if (method === 'square') {
    let horizontal = fromSide === 'left' || fromSide === 'right';
    const endHorizontal = toSide === 'left' || toSide === 'right';
    for (let i = 0; i + 1 < P.length; i++) {
      const a = P[i], b = P[i + 1];
      const last = i + 2 === P.length;
      // Each leg goes on along the way it came, then turns; the last leg turns so that it enters square to the side.
      const firstH = last ? !endHorizontal : horizontal;
      const corner = firstH ? pt(b.x, a.y) : pt(a.x, b.y);
      const pts = [a, corner, b].filter((p, k, arr) => k === 0 || Math.hypot(p.x - arr[k - 1].x, p.y - arr[k - 1].y) > 1e-6);
      if (pts.length === 1) pts.push(b);
      segs.push({ d: pts.slice(1).map((p) => `L${fmt(p.x)},${fmt(p.y)}`).join(' '), pts });
      const p1 = pts[pts.length - 2], p2 = pts[pts.length - 1];
      horizontal = Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y); // the way the leg came into the point
    }
  } else {
    // A curve through the points: inside, the tangent follows the neighbours; the ends leave the sides square.
    const n = P.length - 1;
    const dir = P.map((p, i) => {
      if (i === 0) return nf;
      if (i === n) return [-nt[0], -nt[1]];
      return unit(P[i + 1].x - P[i - 1].x, P[i + 1].y - P[i - 1].y);
    });
    for (let i = 0; i < n; i++) {
      const a = P[i], b = P[i + 1];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      const k1 = i === 0 ? Math.min(EDGE_CURVE_MAX, len / 2) : len / 3;
      const k2 = i === n - 1 ? Math.min(EDGE_CURVE_MAX, len / 2) : len / 3;
      const c1 = pt(a.x + dir[i][0] * k1, a.y + dir[i][1] * k1);
      const c2 = pt(b.x - dir[i + 1][0] * k2, b.y - dir[i + 1][1] * k2);
      const pts = [];
      for (let k = 0; k <= 16; k++) pts.push(bezierAt(a, c1, c2, b, k / 16));
      segs.push({ d: `C${fmt(c1.x)},${fmt(c1.y)} ${fmt(c2.x)},${fmt(c2.y)} ${fmt(b.x)},${fmt(b.y)}`, pts, mid: bezierAt(a, c1, c2, b, 0.5) });
    }
  }
  let d = `M${fmt(s.x)},${fmt(s.y)} ${segs.map((g) => g.d).join(' ')}`;
  if (!ends.from) d = `M${fmt(start.x)},${fmt(start.y)} L${fmt(s.x)},${fmt(s.y)} ${d}`;
  if (!ends.to) d = `${d} M${fmt(c.x)},${fmt(c.y)} L${fmt(end.x)},${fmt(end.y)}`;
  const flat = [start];
  for (const g of segs) for (const p of g.pts) {
    const prev = flat[flat.length - 1];
    if (Math.hypot(p.x - prev.x, p.y - prev.y) > 1e-6) flat.push(p);
  }
  flat.push(end);
  return {
    d,
    line: flat.map((p) => [fmt(p.x), fmt(p.y)]),
    mids: segs.map((g) => { const m = g.mid || polylineMiddle(g.pts); return pt(fmt(m.x), fmt(m.y)); }),
    center: (() => { const m = polylineMiddle(flat); return pt(fmt(m.x), fmt(m.y)); })(),
    fromDeg, toDeg, start, end,
  };
}

// A dragged bend point takes the x or the y of a neighbour ({x, y}) that is within `tolerance`.
function snapWaypoint(p, neighbors, tolerance) {
  let x = p.x, y = p.y, bx = tolerance, by = tolerance;
  for (const n of neighbors) {
    if (!n) continue;
    const dx = Math.abs(n.x - p.x), dy = Math.abs(n.y - p.y);
    if (dx <= bx) { bx = dx; x = n.x; }
    if (dy <= by) { by = dy; y = n.y; }
  }
  return pt(x, y);
}

function shiftWaypoints(w, dx, dy) { return w.map((p) => [round1(p[0] + dx), round1(p[1] + dy)]); }

// A box { minX, minY, maxX, maxY } grown to take in the bend points.
function boxWithWaypoints(box, w) {
  if (!isValidWaypoints(w)) return box;
  const out = { ...box };
  for (const [x, y] of w) {
    if (x < out.minX) out.minX = x;
    if (y < out.minY) out.minY = y;
    if (x > out.maxX) out.maxX = x;
    if (y > out.maxY) out.maxY = y;
  }
  return out;
}

// ---------- marker colours: a palette id or a colour of one's own '#RRGGBB'

const RECENT_COLORS_MAX = 4;

function normalizeHex(v) {
  if (typeof v !== 'string') return null;
  const m = v.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].split('').map((ch) => ch + ch).join('') : m[1];
  return `#${h.toUpperCase()}`;
}

function markerColorHex(setting) {
  const c = MARKER_COLORS.find((x) => x.id === setting);
  return c ? c.hex : normalizeHex(setting) || MARKER_COLORS[0].hex;
}

// What the markerColor setting stores for a colour: the palette id when it is a palette colour, else '#RRGGBB'.
function markerColorSetting(v) {
  if (MARKER_COLORS.some((x) => x.id === v)) return v;
  const hex = normalizeHex(v);
  if (!hex) return null;
  const c = MARKER_COLORS.find((x) => x.hex.toUpperCase() === hex);
  return c ? c.id : hex;
}

// The colours of one's own, newest first, without repeats and without the palette ones.
function addRecentColor(list, color, max = RECENT_COLORS_MAX) {
  const isPalette = (h) => MARKER_COLORS.some((x) => x.hex.toUpperCase() === h);
  const clean = [];
  for (const v of Array.isArray(list) ? list : []) {
    const h = normalizeHex(v);
    if (h && !isPalette(h) && !clean.includes(h)) clean.push(h);
  }
  const hex = normalizeHex(color);
  if (!hex || isPalette(hex)) return clean.slice(0, max);
  return [hex, ...clean.filter((h) => h !== hex)].slice(0, max);
}

// ---------- context menu: copy on top, then layers, duplicate, the rest, delete at the bottom (like Holst)

const MENU_ORDER = ['title', 'clipboard', 'gb-clipboard', 'gb-layer', 'gb-edit', 'selection', 'canvas', 'open', 'action-primary', 'action', 'info', 'view', 'system'];

function orderMenuSections(existing) {
  const head = MENU_ORDER.filter((s) => existing.includes(s));
  const rest = existing.filter((s) => !MENU_ORDER.includes(s) && s !== '' && s !== 'danger');
  return [...head, ...rest, '', 'danger'];
}

function menuHotkeys(mod) {
  return {
    'lucide-trash-2': 'Delete', 'lucide-scissors': `${mod}+X`, 'lucide-copy': `${mod}+C`,
    'lucide-clipboard-check': `${mod}+V`, 'zoom-to-selection': 'Shift+2',
  };
}

// On Windows and Linux Canvas copies a dragged selection with Ctrl and turns snapping off with Alt;
// Holst copies with Alt. Swapping the two keys in the drag events gives Alt = copy, Ctrl = no snapping.
function swapAltCtrl(ev) {
  if (!ev || typeof ev !== 'object') return ev;
  return new Proxy(ev, {
    get(t, k) {
      if (k === 'ctrlKey') return t.altKey;
      if (k === 'altKey') return t.ctrlKey;
      const v = Reflect.get(t, k, t);
      return typeof v === 'function' ? v.bind(t) : v;
    },
  });
}

function swapAltCtrlHandlers(handlers) {
  const out = { ...handlers };
  for (const k of ['move', 'end', 'cancel', 'keydown', 'keyup']) {
    const fn = handlers[k];
    if (typeof fn === 'function') out[k] = (ev, ...rest) => fn(swapAltCtrl(ev), ...rest);
  }
  return out;
}

// The plugin everything here stands on: 'ok' (enabled), 'off' (installed, turned off) or 'missing'.
const ADVANCED_CANVAS_ID = 'advanced-canvas';
function advancedCanvasState(plugins) {
  if (plugins && plugins.enabledPlugins && plugins.enabledPlugins.has(ADVANCED_CANVAS_ID)) return 'ok';
  return plugins && plugins.manifests && plugins.manifests[ADVANCED_CANVAS_ID] ? 'off' : 'missing';
}

const advancedCanvasPageUrl = (vault) => `obsidian://show-plugin?vault=${encodeURIComponent(vault)}&id=${ADVANCED_CANVAS_ID}`;

// The next point of a marker line. With Shift the line runs straight from the point where Shift took effect
// (`from`, an index in points) to the pointer; without it the line goes on freehand. Returns the new `from`.
function addStrokePoint(points, p, straight, from = null) {
  if (!straight) { points.push(p); return null; }
  const anchor = from === null ? points.length - 1 : from;
  points.length = anchor + 1;
  points.push(p);
  return anchor;
}

// ---------- the popup over the selection

// What the popup treats as one kind of object; a selection of several kinds gets the filter instead.
function popupKindOf(data, isEdge) {
  if (isEdge) return 'edge';
  if (!data) return null;
  if (data.gbStroke) return 'stroke';
  if (data.type === 'group') return 'frame';
  if (data.type === 'link') return 'link';
  if (data.type === 'file') {
    const ext = String(data.file || '').split('.').pop().toLowerCase();
    return IMAGE_EXTENSIONS.has(ext) ? 'image' : 'note';
  }
  if (data.type !== 'text') return null;
  const kind = (data.styleAttributes || {}).gbKind;
  return kind === 'sticky' || kind === 'text' ? kind : 'shape';
}

// [{ kind, count }], the most numerous first.
function selectionKinds(kinds) {
  const counts = new Map();
  for (const k of kinds) if (k) counts.set(k, (counts.get(k) || 0) + 1);
  return Array.from(counts, ([kind, count]) => ({ kind, count })).sort((a, b) => b.count - a.count);
}

function objectsLabel(n) {
  const d10 = n % 10, d100 = n % 100;
  const form = currentLanguage === 'ru'
    ? (d10 === 1 && d100 !== 11 ? 'one' : d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14) ? 'few' : 'many')
    : (n === 1 ? 'one' : 'many');
  return t(`popup.objects.${form}`, { n });
}

function clampFontSize(v, fallback = FONT_SIZE.def) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(FONT_SIZE.max, Math.max(FONT_SIZE.min, n)) : fallback;
}

function fontSizeOf(sa) {
  const s = sa || {};
  return Number.isFinite(s.gbFontSize) ? clampFontSize(s.gbFontSize) : LEGACY_FONT_SIZES[s.gbSize] || FONT_SIZE.def;
}

function stepFontSize(size, dir) {
  const next = dir > 0 ? FONT_SIZE.steps.find((s) => s > size) : [...FONT_SIZE.steps].reverse().find((s) => s < size);
  return next === undefined ? size : next;
}

// A copy of the element data with these style attributes set; null removes one.
function withStyle(data, patch) {
  const sa = { ...(data.styleAttributes || {}) };
  for (const [k, v] of Object.entries(patch)) { if (v === null || v === undefined) delete sa[k]; else sa[k] = v; }
  const next = { ...data };
  if (Object.keys(sa).length) next.styleAttributes = sa; else delete next.styleAttributes;
  return next;
}

// value: a SHAPES value id ('rect', 'diamond'...), 'sticky' or 'text'.
function withCardType(data, value) {
  const shape = SHAPES.find((s) => s.id === value);
  if (shape) return withStyle(data, { gbKind: null, shape: shape.value, textAlign: (data.styleAttributes || {}).textAlign || 'center' });
  return withStyle(data, { gbKind: value, shape: null });
}

function cardTypeOf(data) {
  const sa = (data && data.styleAttributes) || {};
  if (sa.gbKind === 'sticky' || sa.gbKind === 'text') return sa.gbKind;
  const shape = SHAPES.find((s) => s.value === (sa.shape || null));
  return shape ? shape.id : null;
}

// Bold and highlight are Markdown around each line, so the board stays readable as a plain file.
const LINE_PARTS = /^(\s*(?:(?:[-*+]|\d+[.)])\s+|#{1,6}\s+|>\s*|\[[ xX]\]\s+)*)(.*?)(\s*)$/;
const LINE_MARKS = ['==', '**'];

function parseLine(line) {
  const [, prefix, body, tail] = line.match(LINE_PARTS);
  const marks = new Set();
  let core = body;
  for (let found = true; found;) {
    found = false;
    for (const m of LINE_MARKS) {
      if (core.length > m.length * 2 && core.startsWith(m) && core.endsWith(m)) {
        core = core.slice(m.length, -m.length);
        marks.add(m);
        found = true;
      }
    }
  }
  return { prefix, core, tail, marks };
}

const filledLines = (text) => String(text || '').split('\n').filter((l) => l.trim());

function hasLineMark(text, mark) {
  const lines = filledLines(text);
  return lines.length > 0 && lines.every((l) => parseLine(l).marks.has(mark));
}

function setLineMark(text, mark, on) {
  return String(text || '').split('\n').map((line) => {
    if (!line.trim()) return line;
    const p = parseLine(line);
    if (!p.core) return line;
    if (on) p.marks.add(mark); else p.marks.delete(mark);
    const open = LINE_MARKS.filter((m) => p.marks.has(m)).join('');
    const close = [...LINE_MARKS].reverse().filter((m) => p.marks.has(m)).join('');
    return `${p.prefix}${open}${p.core}${close}${p.tail}`;
  }).join('\n');
}

const LIST_LINE = /^(\s*)[-*+]\s+/;

function hasList(text) {
  const lines = filledLines(text);
  return lines.length > 0 && lines.every((l) => LIST_LINE.test(l));
}

function toggleList(text) {
  const off = hasList(text);
  return String(text || '').split('\n').map((l) => {
    if (!l.trim()) return l;
    return off ? l.replace(LIST_LINE, '$1') : LIST_LINE.test(l) ? l : l.replace(/^(\s*)/, '$1- ');
  }).join('\n');
}

// A marker line with another width: its box is padded by the width, the line stays where it is on the board.
function withStrokeWidth(data, size) {
  const s = data.gbStroke;
  const sx = data.width / s.w, sy = data.height / s.h;
  const built = buildStrokeNode(s.points.map(([x, y]) => [data.x + x * sx, data.y + y * sy]), clampMarkerWidth(size));
  return { ...data, ...built };
}

const isCssColor = (v) => v === 'transparent' || /^#[0-9a-f]{3,8}$/i.test(String(v));

// The backgrounds of styles.css (--gb-bg, --gb-card, --gb-sticky).
const BOARD_BACKGROUND = '#26282C';
const CARD_BACKGROUND = '#30333A';
const STICKY_BACKGROUND = '#FFF59A';
// Below this contrast a text colour of one's own gives way to the automatic one when the fill changes.
const MIN_TEXT_CONTRAST = 3;
// The text colours that read on a fill: dark on a light fill (the darkest popup colour), light on a dark one (the
// board's own colours). Links and the muted text follow, so a [[link]] reads too.
const INK_VARS = {
  dark: { '--text-normal': '#1F2126', '--text-muted': '#3B3E45', '--text-faint': '#55585F', '--link-color': '#0B2C5C', '--link-color-hover': '#05162E', '--link-unresolved-color': '#0B2C5C' },
  light: { '--text-normal': '#EDEDED', '--text-muted': '#A3A6AD', '--text-faint': '#7D818A', '--link-color': '#5DB2FF', '--link-color-hover': '#8CC9FF', '--link-unresolved-color': '#5DB2FF' },
};

// '#RGB', '#RGBA', '#RRGGBB' or '#RRGGBBAA' as [r, g, b] (0-255), a see-through colour laid over the board
// background; null for anything else ('transparent', a palette number).
function solidRgb(v) {
  const m = typeof v === 'string' && v.trim().match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (!m) return null;
  const h = m[1].length <= 4 ? m[1].split('').map((ch) => ch + ch).join('') : m[1];
  const [r, g, b, a = 255] = h.match(/../g).map((x) => parseInt(x, 16));
  const under = solidRgb.board || (solidRgb.board = BOARD_BACKGROUND.match(/[0-9a-f]{2}/gi).map((x) => parseInt(x, 16)));
  return [r, g, b].map((c, i) => c * (a / 255) + under[i] * (1 - a / 255));
}

// WCAG 2 contrast ratio of two colours (1-21); null when one of them is not a hex colour.
function contrastRatio(a, b) {
  const lum = (rgb) => {
    const [r, g, bl] = rgb.map((c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const x = solidRgb(a), y = solidRgb(b);
  if (!x || !y) return null;
  const l1 = lum(x), l2 = lum(y);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// 'dark' or 'light': the text that reads best on a fill; null when the fill is not a colour of its own.
function inkFor(fill) {
  if (!solidRgb(fill)) return null;
  return contrastRatio(INK_VARS.dark['--text-normal'], fill) >= contrastRatio(INK_VARS.light['--text-normal'], fill) ? 'dark' : 'light';
}

// The text colours for a fill; on a middle tone, where the link colour would not read, links take the text colour
// (they stay underlined).
function inkVars(fill) {
  const ink = inkFor(fill);
  if (!ink) return null;
  const vars = { ...INK_VARS[ink] };
  if (contrastRatio(vars['--link-color'], fill) < MIN_TEXT_CONTRAST) {
    for (const name of ['--link-color', '--link-color-hover', '--link-unresolved-color']) vars[name] = vars['--text-normal'];
  }
  return vars;
}

// What is under the text of a card with this fill (null: the fill itself, or unknown - a card menu colour tints it).
function backgroundOf(data, fill) {
  const kind = (data.styleAttributes || {}).gbKind;
  if (fill === 'transparent') return BOARD_BACKGROUND;
  if (fill) return solidRgb(fill) ? fill : null;
  if (data.color && kind !== 'text') return null;
  return kind === 'sticky' ? STICKY_BACKGROUND : kind === 'text' ? BOARD_BACKGROUND : CARD_BACKGROUND;
}

// A new fill keeps a text colour of one's own while the text still reads on it; otherwise the text colour goes back
// to the automatic one, which reads on the fill by itself (nodeStyleVars).
function withFill(data, fill) {
  const patch = { gbFill: fill };
  const own = (data.styleAttributes || {}).gbTextColor;
  const under = own ? backgroundOf(data, fill) : null;
  const ratio = under ? contrastRatio(own, under) : null;
  if (ratio !== null && ratio < MIN_TEXT_CONTRAST) patch.gbTextColor = null;
  return withStyle(data, patch);
}

// What the style attributes of the popup set on a card: CSS variables, read by styles.css. node: the card's type and
// colour; on a text card with a fill of its own the text takes the colours that read on it, except a text colour
// picked by hand (for free text the card menu colour is its text colour).
function nodeStyleVars(sa, node = { type: 'text' }) {
  const s = sa || {};
  const vars = {};
  if (isCssColor(s.gbFill)) vars['--gb-node-fill'] = s.gbFill;
  if (isCssColor(s.gbBorder)) vars['--gb-node-border'] = s.gbBorder;
  const ink = node && node.type === 'text' && !node.gbStroke ? inkVars(s.gbFill) : null;
  if (ink) {
    const ownText = s.gbKind === 'text' && !!node.color;
    for (const [name, value] of Object.entries(ink)) if (!(ownText && name === '--text-normal')) vars[name] = value;
  }
  if (isCssColor(s.gbTextColor)) vars['--text-normal'] = s.gbTextColor;
  if (isCssColor(s.gbHighlight)) vars['--text-highlight-bg'] = s.gbHighlight;
  if (Number.isFinite(s.gbFontSize)) vars['--gb-font-size'] = `${clampFontSize(s.gbFontSize)}px`;
  if (Number.isFinite(s.gbLineHeight) && s.gbLineHeight >= 0.8 && s.gbLineHeight <= 3) vars['--line-height-normal'] = String(s.gbLineHeight);
  return vars;
}
const NODE_STYLE_VARS = ['--gb-node-fill', '--gb-node-border', '--text-normal', '--text-muted', '--text-faint', '--link-color', '--link-color-hover',
  '--link-unresolved-color', '--text-highlight-bg', '--gb-font-size', '--line-height-normal'];

// A borderless text card with nothing in it: it is removed once it is deselected (Board.checkBlankText).
function isBlankText(data) {
  if (!data || data.type !== 'text' || data.gbStroke) return false;
  return (data.styleAttributes || {}).gbKind === 'text' && !String(data.text || '').trim();
}

// The undo history after the blank text card `id` is removed: the states where it was blank (and had no arrows)
// lose it, and a state equal to the one before it goes, so undo never brings the empty card back.
// current: the index of the present state; returns the new list and that index in it.
function historyWithoutBlank(entries, current, id) {
  const out = [];
  let at = 0;
  let prev = null;
  entries.forEach((entry, i) => {
    const nodes = entry && Array.isArray(entry.nodes) ? entry.nodes : null;
    const node = nodes && nodes.find((n) => n && n.id === id);
    const linked = !!node && (entry.edges || []).some((e) => e && (e.fromNode === id || e.toNode === id));
    const next = node && isBlankText(node) && !linked ? { ...entry, nodes: nodes.filter((n) => n !== node) } : entry;
    const key = JSON.stringify(next);
    if (key !== prev) { out.push(next); prev = key; }
    if (i === current) at = out.length - 1;
  });
  return { entries: out, current: at };
}

function clampEdgeWidth(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(EDGE_WIDTH.max, Math.max(EDGE_WIDTH.min, n)) : EDGE_WIDTH.def;
}

const logic = {
  addStrokePoint, popupKindOf, selectionKinds, objectsLabel, POPUP_CONTROLS, clampFontSize, fontSizeOf, stepFontSize, withStyle, withCardType, cardTypeOf,
  hasLineMark, setLineMark, hasList, toggleList, withStrokeWidth, nodeStyleVars, NODE_STYLE_VARS, clampEdgeWidth,
  contrastRatio, inkFor, inkVars, withFill, INK_VARS, MIN_TEXT_CONTRAST, isBlankText, historyWithoutBlank,
  advancedCanvasState, advancedCanvasPageUrl, MARKER_COLORS, MARKER_WIDTH, TOOLS, SHAPES, OVERLAY_TOOLS, ONE_SHOT_TOOLS, clampMarkerWidth,
  dedupePoints, buildStrokeNode, isValidStroke, distToSegment, strokeDistance, strokeHit, samplePath,
  getSvgPathFromStroke, strokeOutlinePoints, strokeOutlinePath, centerlinePath, dragRect, centeredRect, unionBounds,
  minimapFit, zoomPercent, toolByCode, imageFitSize,
  boxesOverlap, layerOrder, styleKindOf, styleSnapshot, styleKey, applyStyle, segmentHitsRect, polylineHitsRect,
  orderMenuSections, menuHotkeys, swapAltCtrl, swapAltCtrlHandlers,
  isValidWaypoints, sideCenter, edgeRoute, snapWaypoint, shiftWaypoints, boxWithWaypoints, arrowDegrees, BEND_SNAP_PX,
  normalizeHex, markerColorHex, markerColorSetting, addRecentColor, RECENT_COLORS_MAX,
  STRINGS, setLanguage, t,
};

// ---------------------------------------------------------------- canvas helpers

function strokeOf(node) {
  const s = node && node.unknownData && node.unknownData.gbStroke;
  return isValidStroke(s) ? s : null;
}

function styleOf(node) {
  const d = node && node.unknownData;
  return (d && d.styleAttributes) || {};
}

function waypointsOf(edge) {
  const w = edge && edge.unknownData && edge.unknownData.gbWaypoints;
  return isValidWaypoints(w) ? w : null;
}

// The route of an arrow through its bend points as it should be drawn now, or null when it has none.
function edgeBendRoute(edge) {
  const w = waypointsOf(edge);
  const from = edge && edge.from, to = edge && edge.to;
  if (!w || !from || !to || !from.node || !to.node) return null;
  const method = (edge.unknownData.styleAttributes || {}).pathfindingMethod;
  return edgeRoute(sideCenter(from.node.getBBox(), from.side), from.side, sideCenter(to.node.getBBox(), to.side), to.side,
    w, method, { from: from.end === 'arrow', to: to.end === 'arrow' });
}

// Puts the route through the bend points over the path Canvas (or Advanced Canvas) has just drawn.
// What the drawn route depends on besides the cards: the points and the line shape.
const bendKey = (edge) => JSON.stringify([waypointsOf(edge), ((edge.unknownData || {}).styleAttributes || {}).pathfindingMethod || null]);

function drawBends(edge) {
  const route = edgeBendRoute(edge);
  const had = !!edge.gbRoute;
  edge.gbRoute = route;
  edge.gbDrawn = bendKey(edge);
  if (!route) {
    if (had) edge.center = undefined;
    return;
  }
  if (edge.path && edge.path.display && edge.path.interaction) {
    edge.path.interaction.setAttr('d', route.d);
    edge.path.display.setAttr('d', route.d);
  }
  const turn = (end, p, deg) => { if (end && end.el) end.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${deg}deg)`; };
  turn(edge.fromLineEnd, route.start, route.fromDeg);
  turn(edge.toLineEnd, route.end, route.toDeg);
  edge.center = route.center; // Advanced Canvas puts the label here (advanced-canvas:edge-center-requested)
}

// Puts the popup's style of a card on its element (or on the body of its text editor). data: the card's data.
function applyNodeVars(el, styleAttributes, data) {
  const vars = styleAttributes ? nodeStyleVars(styleAttributes, data) : {};
  for (const name of NODE_STYLE_VARS) {
    if (name in vars) el.style.setProperty(name, vars[name]); else el.style.removeProperty(name);
  }
  // On the card the size is the variable its text reads; the editor reads --gb-font-size (styles.css).
  if (el.hasClass('canvas-node')) {
    if (vars['--gb-font-size']) el.style.setProperty('--font-text-size', vars['--gb-font-size']); else el.style.removeProperty('--font-text-size');
  }
  el.toggleClass('gb-has-fill', '--gb-node-fill' in vars);
  el.toggleClass('gb-has-border', '--gb-node-border' in vars);
}

const isEdgeItem = (item) => !!(item && item.from && item.to && !item.nodeEl);
const isGroupNode = (node) => !!(node && node.nodeEl && node.getData().type === 'group');

// The first icon id this Obsidian knows (Lucide names change between versions).
function pickIcon(ids) {
  const known = typeof obsidian.getIconIds === 'function' ? new Set(obsidian.getIconIds()) : null;
  if (!known) return ids[0];
  return ids.find((id) => known.has(id) || known.has(`lucide-${id}`)) || ids[ids.length - 1];
}

const sleep = (ms) => new Promise((r) => window.setTimeout(r, ms));

function isEditableTarget(el) {
  if (!el || !(el instanceof HTMLElement)) return false;
  return el.isContentEditable || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || !!el.closest('.cm-editor');
}

function loadImageSize(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 0, h: 0 });
    img.src = src;
  });
}

class FilePickModal extends obsidian.FuzzySuggestModal {
  constructor(app, files, placeholder, onPick) {
    super(app);
    this.files = files;
    this.onPick = onPick;
    this.setPlaceholder(placeholder);
  }
  getItems() { return this.files; }
  getItemText(file) { return file.path; }
  onChooseItem(file) { this.onPick(file); }
}

// ---------------------------------------------------------------- one board per open canvas view

class Board {
  constructor(plugin, view) {
    this.plugin = plugin;
    this.app = plugin.app;
    this.view = view;
    this.canvas = view.canvas;
    this.tool = 'select';
    this.gesture = null;
    this.dirty = true;
    this.frame = 0;
    this.toolButtons = {};
    this.restorers = [];
    this.importing = 0;
    this.styleSnaps = new Map();
    this.lastSelection = new Set(this.canvas.selection); // to see which cards a selection change left
    this.bend = null; // a bend point being dragged
    this.build();
    this.patchHitTest();
    this.patchCanvas();
    this.plugin.patchEdgeProto(this.canvas.edges && this.canvas.edges.values().next().value);
    this.decorateAll();
    this.snapshotSelection();
    this.renderPopup();
    this.syncAdvancedCanvasHint();
    this.requestRender();
  }

  syncAdvancedCanvasHint() {
    const state = this.plugin.acHintClosed ? 'ok' : advancedCanvasState(this.app.plugins);
    if (state === this.acHintState) return;
    this.acHintState = state;
    this.acHintEl.toggleClass('is-open', state !== 'ok');
    if (state === 'ok') return;
    this.acHintText.setText(t(state === 'off' ? 'ac.textOff' : 'ac.text'));
    this.acHintButton.setText(t(state === 'off' ? 'ac.enable' : 'ac.install'));
  }

  get settings() { return this.plugin.settings; }

  // ---------- DOM

  build() {
    const w = this.canvas.wrapperEl;
    w.addClass('gb-board');
    w.dataset.gbTool = this.tool;

    this.overlayEl = w.createDiv({ cls: 'gb-overlay' });
    this.overlayEl.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.overlayEl.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.overlayEl.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.overlayEl.addEventListener('pointercancel', () => this.cancelGesture());
    this.overlayEl.addEventListener('dblclick', (e) => { e.preventDefault(); e.stopPropagation(); });

    this.toolbarEl = w.createDiv({ cls: 'gb-ui gb-toolbar' });
    for (const tool of TOOLS) {
      if (tool.id === 'marker' || tool.id === 'insert') this.toolbarEl.createDiv({ cls: 'gb-sep' });
      const b = this.toolbarEl.createDiv({ cls: 'gb-tool', attr: { 'data-tool': tool.id } });
      obsidian.setIcon(b, tool.icon);
      this.setTooltip(b, `${t(`tool.${tool.id}`)} (${tool.hotkey})`);
      b.addEventListener('click', (e) => this.onToolButton(tool.id, b, e));
      this.toolButtons[tool.id] = b;
    }

    // Marker panel: line width slider on top, colours below (like the Holst marker panel).
    this.markerPanel = w.createDiv({ cls: 'gb-ui gb-panel gb-marker-panel' });
    const head = this.markerPanel.createDiv({ cls: 'gb-panel-head' });
    head.createSpan({ text: t('marker.width') });
    this.widthLabel = head.createSpan({ cls: 'gb-width-value' });
    const widthRow = this.markerPanel.createDiv({ cls: 'gb-width-row' });
    this.widthInput = widthRow.createEl('input', {
      cls: 'gb-width-slider',
      attr: { type: 'range', min: MARKER_WIDTH.min, max: MARKER_WIDTH.max, step: 1, 'aria-label': t('marker.widthAria') },
    });
    this.widthDot = widthRow.createDiv({ cls: 'gb-width-dot' }).createDiv();
    // While dragging only the panel follows; the width is saved when the slider is released.
    this.widthInput.addEventListener('input', () => this.syncWidth(clampMarkerWidth(this.widthInput.value)));
    this.widthInput.addEventListener('change', () => this.setSetting('markerWidth', clampMarkerWidth(this.widthInput.value)));
    // A focused slider would eat the tool hotkeys (V, H, ...): let it go after a mouse drag.
    this.widthInput.addEventListener('pointerup', () => this.widthInput.blur());
    const swatches = this.markerPanel.createDiv({ cls: 'gb-swatches' });
    for (const c of MARKER_COLORS) {
      const s = swatches.createDiv({ cls: 'gb-swatch', attr: { 'data-color': c.id } });
      s.style.setProperty('--gb-swatch', c.hex);
      this.setTooltip(s, t(`color.${c.id}`));
      s.addEventListener('click', () => this.setSetting('markerColor', c.id));
    }
    // Second row: colours of one's own (newest first) and "+" with the system colour picker.
    this.recentSwatches = this.markerPanel.createDiv({ cls: 'gb-swatches gb-recent' });
    this.addColorButton = createDiv({ cls: 'gb-swatch gb-add-color' });
    obsidian.setIcon(this.addColorButton, 'plus');
    this.setTooltip(this.addColorButton, t('marker.addColor'));
    this.colorInput = this.addColorButton.createEl('input', { cls: 'gb-color-input', attr: { type: 'color', 'aria-label': t('marker.addColor') } });
    this.colorInput.addEventListener('click', () => { this.colorInput.value = this.markerHex.toLowerCase(); });
    // The picker is fixed when it is closed (change), not on every hover inside it (input).
    this.colorInput.addEventListener('change', () => this.pickOwnColor(this.colorInput.value));

    this.shapePanel = w.createDiv({ cls: 'gb-ui gb-panel gb-shape-panel' });
    for (const sh of SHAPES) {
      const s = this.shapePanel.createDiv({ cls: 'gb-tool gb-shape', attr: { 'data-shape': sh.id } });
      obsidian.setIcon(s, sh.icon);
      this.setTooltip(s, t(`shape.${sh.id}`));
      s.addEventListener('click', () => this.setSetting('shape', sh.id));
    }

    this.navEl = w.createDiv({ cls: 'gb-ui gb-nav' });
    const zoom = this.navEl.createDiv({ cls: 'gb-zoom' });
    this.navButton(zoom, 'minus', t('nav.zoomOut'), () => this.canvas.zoomBy(-0.5));
    this.zoomLabel = zoom.createDiv({ cls: 'gb-zoom-label', text: '100%' });
    this.setTooltip(this.zoomLabel, t('nav.zoomLabel', { pct: '100%' }));
    this.zoomLabel.addEventListener('click', () => this.canvas.zoomBy(-this.canvas.tZoom));
    this.navButton(zoom, 'plus', t('nav.zoomIn'), () => this.canvas.zoomBy(0.5));
    this.navButton(zoom, 'maximize', t('nav.fit'), () => this.canvas.zoomToFit());
    this.gridButton = this.navButton(zoom, pickIcon(['grid-3x3', 'grid-3-x-3', 'layout-grid', 'hash']), t('nav.grid'), () => this.plugin.setGridSnap(!this.gridSnap));
    this.minimapButton = this.navButton(zoom, 'map', t('nav.minimap'), () => this.setSetting('minimap', !this.settings.minimap));
    this.minimapEl = this.navEl.createEl('canvas', { cls: 'gb-minimap' });
    this.minimapEl.addEventListener('pointerdown', (e) => this.onMinimapDown(e));
    this.minimapEl.addEventListener('pointermove', (e) => this.onMinimapMove(e));
    this.minimapEl.addEventListener('pointerup', () => { this.minimapDrag = false; });

    // Handles of the bend points of the selected arrow, in board coordinates (they move and zoom with the board).
    // The layer keeps the pointer while a handle is dragged, since handles are rebuilt as points are added.
    this.bendLayer = this.canvas.canvasEl.createDiv({ cls: 'gb-bends' });
    this.bendLayer.addEventListener('pointerdown', (e) => this.onBendDown(e));
    this.bendLayer.addEventListener('pointermove', (e) => this.onBendMove(e));
    this.bendLayer.addEventListener('pointerup', (e) => this.onBendUp(e));
    this.bendLayer.addEventListener('pointercancel', () => this.cancelBend());
    this.bendLayer.addEventListener('click', (e) => e.stopPropagation());
    this.bendLayer.addEventListener('dblclick', (e) => this.onBendDoubleClick(e));
    this.bendLayer.addEventListener('contextmenu', (e) => { e.preventDefault(); e.stopPropagation(); });

    // Shown only while Advanced Canvas is missing or turned off (syncAdvancedCanvasHint).
    this.acHintEl = w.createDiv({ cls: 'gb-ui gb-ac-hint' });
    const acBody = this.acHintEl.createDiv({ cls: 'gb-ac-body' });
    acBody.createDiv({ cls: 'gb-ac-title', text: t('ac.title') });
    this.acHintText = acBody.createDiv({ cls: 'gb-ac-text' });
    this.acHintButton = this.acHintEl.createEl('button', { cls: 'mod-cta gb-ac-action' });
    this.acHintButton.addEventListener('click', () => void this.plugin.fixAdvancedCanvas());
    const acClose = this.acHintEl.createDiv({ cls: 'gb-ac-close' });
    obsidian.setIcon(acClose, 'x');
    this.setTooltip(acClose, t('ac.close'));
    acClose.addEventListener('click', () => this.plugin.closeAdvancedCanvasHint());

    // A press anywhere outside the popup closes its open list.
    const closeList = (e) => { if (this.popOpen && !(e.target instanceof Element && e.target.closest('.canvas-menu'))) this.closeDropdown(); };
    w.addEventListener('pointerdown', closeList, true);
    this.restorers.push(() => w.removeEventListener('pointerdown', closeList, true));

    // Clicks on our panels must not reach Canvas (it would start a selection box or deselect),
    // nor arrow keys on the slider (Canvas would move the selected cards).
    for (const el of [this.toolbarEl, this.markerPanel, this.shapePanel, this.navEl, this.acHintEl]) {
      el.addEventListener('pointerdown', (e) => e.stopPropagation());
      el.addEventListener('dblclick', (e) => e.stopPropagation());
      el.addEventListener('keydown', (e) => e.stopPropagation());
    }
    this.syncUi();
  }

  navButton(parent, icon, label, onClick) {
    const b = parent.createDiv({ cls: 'gb-zoom-btn' });
    obsidian.setIcon(b, icon);
    this.setTooltip(b, label);
    b.addEventListener('click', onClick);
    return b;
  }

  setTooltip(el, text, placement = 'right') {
    el.setAttr('aria-label', text);
    if (typeof obsidian.setTooltip === 'function') obsidian.setTooltip(el, text, { placement });
  }

  destroy() {
    this.cancelBend();
    this.destroyed = true;
    this.cancelGesture();
    if (this.bendLayer) this.bendLayer.remove();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    window.clearTimeout(this.styleTimer);
    for (const restore of this.restorers.splice(0)) restore();
    if (this.canvas.menu && this.canvas.menu.menuEl) this.clearPopup(this.canvas.menu.menuEl);
    for (const el of [this.overlayEl, this.toolbarEl, this.markerPanel, this.shapePanel, this.navEl, this.acHintEl]) el && el.remove();
    const w = this.canvas.wrapperEl;
    w.removeClass('gb-board', 'gb-space');
    delete w.dataset.gbTool;
    const layerEl = this.canvas.nodeInteractionLayer && this.canvas.nodeInteractionLayer.interactionEl;
    if (layerEl) layerEl.removeClass('gb-target-stroke', 'gb-target-unselected');
    this.unpatchHitTest();
    for (const node of this.canvas.nodes.values()) this.undecorate(node);
  }

  // ---------- tools and settings

  onToolButton(id, button) {
    if (id === 'insert') { this.openInsertMenu(button); return; }
    this.setTool(this.tool === id && id !== 'select' && !this.isPanelTool(id) ? 'select' : id);
  }

  isPanelTool(id) { return id === 'marker' || id === 'shape'; }

  setTool(id) {
    if (!TOOLS.some((t) => t.id === id)) return;
    if (id === 'insert') { this.openInsertMenu(this.toolButtons.insert); return; }
    if (this.canvas.readonly && id !== 'select' && id !== 'hand') id = 'select';
    this.cancelGesture();
    this.tool = id;
    this.syncUi();
  }

  async setSetting(key, value) {
    this.settings[key] = value;
    await this.plugin.saveSettings();
    if (key === 'markerColor' || key === 'markerWidth') this.tool = 'marker';
    if (key === 'shape') this.tool = 'shape';
    this.plugin.forEachBoard((b) => b.syncUi());
  }

  syncUi() {
    const w = this.canvas.wrapperEl;
    w.dataset.gbTool = this.tool;
    for (const [id, b] of Object.entries(this.toolButtons)) b.toggleClass('is-active', id === this.tool);
    this.toolButtons.marker.style.setProperty('--gb-marker', this.markerHex);
    this.syncRecentColors();
    for (const s of this.markerPanel.querySelectorAll('.gb-swatch[data-color]')) s.toggleClass('is-active', s.dataset.color === this.settings.markerColor);
    this.syncWidth(this.markerSize);
    for (const s of this.shapePanel.querySelectorAll('.gb-shape')) s.toggleClass('is-active', s.dataset.shape === this.settings.shape);
    const shape = SHAPES.find((s) => s.id === this.settings.shape) || SHAPES[0];
    obsidian.setIcon(this.toolButtons.shape, shape.icon);
    this.placePanel(this.markerPanel, this.toolButtons.marker, this.tool === 'marker');
    this.placePanel(this.shapePanel, this.toolButtons.shape, this.tool === 'shape');
    this.minimapEl.toggleClass('is-hidden', !this.settings.minimap);
    this.minimapButton.toggleClass('is-active', !!this.settings.minimap);
    this.syncGridButton();
    this.requestRender();
  }

  syncWidth(width) {
    if (this.widthInput.value !== String(width)) this.widthInput.value = String(width);
    this.widthLabel.setText(`${width}px`);
    this.widthDot.setCssStyles({ width: `${width}px`, height: `${width}px`, background: this.markerHex });
    const pct = ((width - MARKER_WIDTH.min) / (MARKER_WIDTH.max - MARKER_WIDTH.min)) * 100;
    this.widthInput.style.setProperty('--gb-fill', `${pct}%`);
  }

  // Grid snapping is the core Canvas option (shared by all canvases, saved in .obsidian/canvas.json),
  // so the core canvas settings menu and this button always agree.
  get gridSnap() { return !!(this.canvas.options && this.canvas.options.snapToGrid); }

  syncGridButton() {
    const on = this.gridSnap;
    if (this.gridButton.hasClass('is-active') === on && this.gridButton.dataset.state) return;
    this.gridButton.dataset.state = on ? 'on' : 'off';
    this.gridButton.toggleClass('is-active', on);
    this.setTooltip(this.gridButton, on ? t('nav.gridOn') : t('nav.gridOff'));
  }

  placePanel(panel, button, open) {
    panel.toggleClass('is-open', open);
    if (!open) return;
    const wr = this.canvas.wrapperEl.getBoundingClientRect();
    const br = button.getBoundingClientRect();
    panel.style.top = `${Math.round(br.top - wr.top + br.height / 2)}px`;
  }

  syncRecentColors() {
    const list = this.settings.markerRecentColors || [];
    const row = this.recentSwatches;
    const shown = Array.from(row.querySelectorAll('.gb-swatch[data-color]')).map((s) => s.dataset.color);
    if (shown.join() === list.join() && this.addColorButton.parentElement === row) return;
    row.empty();
    for (const hex of list) {
      const s = row.createDiv({ cls: 'gb-swatch', attr: { 'data-color': hex } });
      s.style.setProperty('--gb-swatch', hex);
      this.setTooltip(s, t('marker.ownColor', { hex }));
      s.addEventListener('click', () => this.setSetting('markerColor', hex));
    }
    row.appendChild(this.addColorButton);
  }

  async pickOwnColor(value) {
    const color = markerColorSetting(value);
    if (!color) return;
    this.settings.markerRecentColors = addRecentColor(this.settings.markerRecentColors, value);
    await this.setSetting('markerColor', color);
  }

  get markerHex() { return markerColorHex(this.settings.markerColor); }
  get markerSize() { return clampMarkerWidth(this.settings.markerWidth); }
  get shape() { return SHAPES.find((s) => s.id === this.settings.shape) || SHAPES[0]; }

  // ---------- pointer gestures on the overlay

  onPointerDown(e) {
    if (e.button !== 0 || this.canvas.isHoldingSpace) return; // let Canvas pan
    if (!OVERLAY_TOOLS.has(this.tool)) return;
    e.preventDefault(); // keeps focus where it was, so drop it from our panels (the slider) by hand
    e.stopPropagation();
    const focused = this.overlayEl.doc.activeElement;
    if (focused instanceof HTMLElement && focused.closest('.gb-ui')) focused.blur();
    this.overlayEl.setPointerCapture(e.pointerId);
    const pos = this.canvas.posFromEvt(e);
    const g = { tool: this.tool, pointerId: e.pointerId, startClient: { x: e.clientX, y: e.clientY }, start: pos, last: pos, moved: false };
    this.gesture = g;
    if (g.tool === 'marker') this.startStroke(g, pos);
    else if (g.tool === 'eraser') { g.erased = new Set(); this.eraseAt(g, pos); }
    else if (g.tool === 'hand') this.canvas.wrapperEl.addClass('gb-grabbing');
  }

  onPointerMove(e) {
    const g = this.gesture;
    if (!g || e.pointerId !== g.pointerId) return;
    e.preventDefault();
    e.stopPropagation();
    if (Math.hypot(e.clientX - g.startClient.x, e.clientY - g.startClient.y) > DRAG_THRESHOLD_PX) g.moved = true;
    if (g.tool === 'hand') {
      const scale = this.canvas.scale || 1;
      const prev = g.lastClient || g.startClient;
      this.canvas.panBy(-(e.clientX - prev.x) / scale, -(e.clientY - prev.y) / scale);
      g.lastClient = { x: e.clientX, y: e.clientY };
      return;
    }
    const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
    const list = events.length ? events : [e];
    for (const ev of list) {
      const pos = this.canvas.posFromEvt(ev);
      if (g.tool === 'marker') g.straightFrom = addStrokePoint(g.points, [pos.x, pos.y], e.shiftKey, g.straightFrom);
      else if (g.tool === 'eraser') {
        for (const p of samplePath(g.last, pos, ERASER_RADIUS_PX / (this.canvas.scale || 1) / 2)) this.eraseAt(g, p);
      }
      g.last = pos;
    }
    if (g.tool === 'marker') this.renderPreview(g);
    else if (g.tool !== 'eraser' && g.moved) this.renderRubber(g);
  }

  onPointerUp(e) {
    const g = this.gesture;
    if (!g || e.pointerId !== g.pointerId) return;
    e.preventDefault();
    e.stopPropagation();
    this.gesture = null;
    this.clearTransient(g);
    const pos = this.canvas.posFromEvt(e);
    try {
      if (g.tool === 'marker') {
        if (e.shiftKey) addStrokePoint(g.points, [pos.x, pos.y], true, g.straightFrom);
        this.finishStroke(g);
      } else if (g.tool === 'eraser') this.finishErase(g);
      else if (g.tool === 'sticky' || g.tool === 'text' || g.tool === 'shape') this.placeCard(g, pos);
      else if (g.tool === 'frame') this.placeFrame(g, pos);
    } catch (err) {
      console.error('Cult Canvas:', err);
      new obsidian.Notice(t('notice.failed'));
    }
    this.canvas.wrapperEl.removeClass('gb-grabbing');
    if (ONE_SHOT_TOOLS.has(g.tool)) this.setTool('select');
  }

  cancelGesture() {
    const g = this.gesture;
    if (!g) return;
    this.gesture = null;
    this.clearTransient(g);
    if (g.erased) for (const n of g.erased) n.nodeEl && n.nodeEl.removeClass('gb-erasing');
    this.canvas.wrapperEl.removeClass('gb-grabbing');
  }

  clearTransient(g) {
    if (g.previewEl) g.previewEl.remove();
    if (g.rubberEl) g.rubberEl.remove();
    g.previewEl = g.rubberEl = null;
  }

  // ---------- marker

  startStroke(g, pos) {
    g.points = [[pos.x, pos.y]];
    g.color = this.markerHex;
    g.size = this.markerSize;
    g.previewEl = this.canvas.canvasEl.createDiv({ cls: 'gb-preview' });
    const svg = g.previewEl.createSvg('svg', { attr: { width: 1, height: 1 } });
    g.previewPath = svg.createSvg('path', { attr: { fill: g.color } });
    this.renderPreview(g);
  }

  renderPreview(g) {
    if (g.previewFrame) return;
    g.previewFrame = window.requestAnimationFrame(() => {
      g.previewFrame = 0;
      if (g.previewPath) g.previewPath.setAttr('d', strokeOutlinePath(g.points, g.size));
    });
  }

  finishStroke(g) {
    if (g.previewFrame) window.cancelAnimationFrame(g.previewFrame);
    if (!g.points || g.points.length === 0) return;
    const data = buildStrokeNode(g.points, g.size);
    const canvas = this.canvas;
    const node = canvas.createTextNode({ pos: { x: data.x, y: data.y }, size: { width: data.width, height: data.height }, text: '', save: false, focus: false });
    // createTextNode snaps the position to the 20 px grid: put the line back exactly where it was drawn.
    node.setData({ ...node.getData(), x: data.x, y: data.y, color: g.color, gbStroke: data.gbStroke });
    this.plugin.decorate(node);
    canvas.requestSave();
  }

  // ---------- eraser (removes whole strokes, nothing else)

  eraseAt(g, pos) {
    const r = ERASER_RADIUS_PX / (this.canvas.scale || 1);
    const near = this.canvas.getIntersectingNodes({ minX: pos.x - r, minY: pos.y - r, maxX: pos.x + r, maxY: pos.y + r });
    for (const node of near) {
      if (g.erased.has(node)) continue;
      const s = strokeOf(node);
      if (s && strokeHit(node, s, pos, r)) {
        g.erased.add(node);
        node.nodeEl.addClass('gb-erasing');
      }
    }
  }

  finishErase(g) {
    if (!g.erased || g.erased.size === 0) return;
    for (const node of g.erased) this.canvas.removeNode(node);
    this.canvas.requestSave();
    this.requestRender();
  }

  // ---------- cards and frames

  renderRubber(g) {
    if (!g.rubberEl) g.rubberEl = this.canvas.canvasEl.createDiv({ cls: 'gb-rubber' });
    const r = dragRect(g.start, g.last);
    g.rubberEl.setCssStyles({ transform: `translate(${r.x}px, ${r.y}px)`, width: `${r.width}px`, height: `${r.height}px` });
  }

  placeCard(g, pos) {
    const kind = g.tool;
    const sizes = CARD_SIZES[kind];
    const def = kind === 'shape' ? { w: this.shape.w, h: this.shape.h } : sizes;
    const rect = g.moved ? dragRect(g.start, pos, sizes.minW, sizes.minH) : centeredRect(g.start, def.w, def.h);
    const styleAttributes = {};
    if (kind === 'sticky') styleAttributes.gbKind = 'sticky';
    if (kind === 'text') styleAttributes.gbKind = 'text';
    if (kind === 'shape') {
      if (this.shape.value) styleAttributes.shape = this.shape.value;
      styleAttributes.textAlign = 'center'; // Advanced Canvas centres the text both ways; the popup can change it.
    }
    this.createCard(rect, styleAttributes, true);
  }

  createCard(rect, styleAttributes, edit) {
    const canvas = this.canvas;
    const node = canvas.createTextNode({ pos: { x: rect.x, y: rect.y }, size: { width: rect.width, height: rect.height }, text: '', save: false, focus: false });
    let data = { ...node.getData() };
    if (Object.keys(styleAttributes).length) data.styleAttributes = styleAttributes;
    // The last style of this kind goes in now, before editing starts (see applyDefaultStyle).
    const remembered = this.plugin.styleFor(styleKindOf(data, false));
    if (remembered) data = applyStyle(data, remembered, false);
    node.gbStyled = true;
    // createTextNode always snaps to the grid; without grid snapping the card stays where it was placed.
    if (!this.gridSnap) { data.x = rect.x; data.y = rect.y; }
    node.setData(data);
    canvas.requestSave();
    if (edit) {
      if (typeof node.attach === 'function') node.attach();
      if (typeof node.render === 'function') node.render();
      canvas.selectOnly(node);
      if (typeof node.startEditing === 'function') node.startEditing();
    }
    return node;
  }

  placeFrame(g, pos) {
    const s = CARD_SIZES.frame;
    const rect = g.moved ? dragRect(g.start, pos, s.minW, s.minH) : centeredRect(g.start, s.w, s.h);
    const node = this.canvas.createGroupNode({ pos: { x: rect.x, y: rect.y }, size: { width: rect.width, height: rect.height }, label: t('frame.label'), save: true, focus: true });
    if (node && typeof node.setData === 'function' && !this.gridSnap) {
      node.setData({ ...node.getData(), x: rect.x, y: rect.y });
      this.canvas.requestSave();
    }
  }

  // ---------- images and notes

  openInsertMenu(button) {
    const menu = new obsidian.Menu();
    menu.addItem((i) => i.setTitle(t('insert.imageDisk')).setIcon('upload').onClick(() => this.pickImageFromDisk()));
    menu.addItem((i) => i.setTitle(t('insert.imageVault')).setIcon('image').onClick(() => {
      const files = this.app.vault.getFiles().filter((f) => IMAGE_EXTENSIONS.has(f.extension.toLowerCase()));
      new FilePickModal(this.app, files, t('insert.imageVaultPick'), (f) => this.insertFile(f, 0)).open();
    }));
    menu.addItem((i) => i.setTitle(t('insert.note')).setIcon('file-text').onClick(() => {
      new FilePickModal(this.app, this.app.vault.getMarkdownFiles(), t('insert.notePick'), (f) => this.insertFile(f, 0)).open();
    }));
    const r = (button || this.toolbarEl).getBoundingClientRect();
    menu.showAtPosition({ x: r.right + 8, y: r.top });
  }

  pickImageFromDisk() {
    const input = createEl('input', { attr: { type: 'file', accept: 'image/*', multiple: '' } });
    input.addEventListener('change', async () => {
      const files = Array.from(input.files || []);
      for (let i = 0; i < files.length; i++) {
        try {
          const buf = await files[i].arrayBuffer();
          const path = await this.app.fileManager.getAvailablePathForAttachment(files[i].name, this.view.file ? this.view.file.path : '');
          const file = await this.app.vault.createBinary(path, buf);
          await this.insertFile(file, i);
        } catch (err) {
          console.error('Cult Canvas: image import', err);
          new obsidian.Notice(t('notice.imageFailed', { name: files[i].name }));
        }
      }
    });
    input.click();
  }

  async insertFile(file, index) {
    const canvas = this.canvas;
    const center = canvas.posCenter();
    let size;
    if (IMAGE_EXTENSIONS.has(file.extension.toLowerCase())) {
      const dims = await loadImageSize(this.app.vault.getResourcePath(file));
      size = imageFitSize(dims.w, dims.h);
    } else size = { width: 400, height: 400 };
    const shift = index * 40;
    canvas.createFileNode({ pos: { x: Math.round(center.x - size.width / 2 + shift), y: Math.round(center.y - size.height / 2 + shift) }, size, file, save: true, focus: true });
  }

  // ---------- stroke rendering and hit testing

  decorateAll() {
    for (const node of this.canvas.nodes.values()) this.plugin.decorate(node);
  }

  undecorate(node) {
    if (node.gbStrokeSvg) node.gbStrokeSvg.remove();
    node.gbStrokeSvg = null;
    node.gbStrokeRef = null;
    if (node.nodeEl) {
      node.nodeEl.removeClass('gb-stroke', 'gb-erasing');
      applyNodeVars(node.nodeEl, null);
    }
  }

  // Strokes are cards with an empty box around the line: only the line itself may catch the pointer,
  // otherwise a circle drawn around a card would cover it.
  patchHitTest() {
    const canvas = this.canvas;
    const original = canvas.hitTestNode;
    if (typeof original !== 'function') return;
    this.hitTestOwn = Object.prototype.hasOwnProperty.call(canvas, 'hitTestNode');
    this.hitTestOriginal = original;
    canvas.hitTestNode = function (pos, pad = 0) {
      const found = original.call(this, pos, pad);
      const s = strokeOf(found);
      if (!found || !s || this.selection.has(found) || strokeHit(found, s, pos, pad)) return found;
      const near = this.getIntersectingNodes({ minX: pos.x - pad, minY: pos.y - pad, maxX: pos.x + pad, maxY: pos.y + pad })
        .filter((n) => { const ns = strokeOf(n); return !ns || this.selection.has(n) || strokeHit(n, ns, pos, pad); });
      if (near.length === 0) return null;
      near.sort((a, b) => b.zIndex - a.zIndex);
      return near[0];
    };
  }

  unpatchHitTest() {
    if (!this.hitTestOriginal) return;
    if (this.hitTestOwn) this.canvas.hitTestNode = this.hitTestOriginal;
    else delete this.canvas.hitTestNode;
    this.hitTestOriginal = null;
  }

  // Wraps a method of this canvas until the board is destroyed. If someone wrapped it again on top of
  // ours, ours stays in their chain and just calls the original. `make(original, board)` returns the new method.
  patch(obj, name, make) {
    const original = obj && obj[name];
    if (typeof original !== 'function') return;
    const own = Object.prototype.hasOwnProperty.call(obj, name);
    const destroyed = () => this.destroyed;
    const patched = make(original, this);
    const wrapper = function (...args) { return destroyed() ? original.apply(this, args) : patched.apply(this, args); };
    obj[name] = wrapper;
    this.restorers.push(() => {
      if (obj[name] !== wrapper) return;
      if (own) obj[name] = original; else delete obj[name];
    });
  }

  patchCanvas() {
    // Canvas lifts dragged cards to the top for good, so a big background moved once covers the small
    // cards on it: keep every element on its layer. On Windows and Linux Alt+drag leaves the original in
    // place and drags a copy, as in Holst (swapAltCtrl).
    this.patch(this.canvas, 'handleSelectionDrag', (original, board) => function (...args) {
      const z = new Map();
      for (const n of this.nodes.values()) z.set(n, n.zIndex);
      let handlers = original.apply(this, args);
      for (const [n, v] of z) if (n.zIndex !== v) { n.zIndex = v; n.renderZIndex(); }
      if (handlers) handlers = board.bendsFollow(handlers);
      return IS_MAC || !handlers ? handlers : swapAltCtrlHandlers(handlers);
    });
    // Ctrl+D, paste and Alt+drag copies all go through cloneData(data, offset): their bend points move by the offset.
    this.patch(this.canvas, 'cloneData', (original) => function (data, offset, ...rest) {
      const r = original.call(this, data, offset, ...rest);
      const out = r || data;
      if (offset && (offset.x || offset.y) && out && Array.isArray(out.edges)) {
        for (const e of out.edges) if (isValidWaypoints(e.gbWaypoints)) e.gbWaypoints = shiftWaypoints(e.gbWaypoints, offset.x || 0, offset.y || 0);
      }
      return r;
    });
    // Arrow keys move the selected cards: the bend points between them go along.
    this.patch(this.canvas, 'nudgeSelection', (original) => function (...args) {
      const nodes = Array.from(this.selection).filter((n) => n.nodeEl);
      const ref = nodes[0];
      const start = ref ? { x: ref.x, y: ref.y } : null;
      const r = original.apply(this, args);
      if (!ref || (ref.x === start.x && ref.y === start.y)) return r;
      const set = new Set(nodes);
      let changed = false;
      for (const edge of this.edges.values()) {
        const w = waypointsOf(edge);
        if (!w || !set.has(edge.from.node) || !set.has(edge.to.node)) continue;
        edge.unknownData = { ...edge.unknownData, gbWaypoints: shiftWaypoints(w, ref.x - start.x, ref.y - start.y) };
        this.markMoved(edge);
        changed = true;
      }
      if (changed) this.requestSave();
      return r;
    });
    // A selection box also selects the arrows whose line it touches (Canvas selects only cards).
    this.patch(this.canvas, 'handleDragToSelect', (original, board) => function (e, toggle, initial, ...rest) {
      const handlers = original.call(this, e, toggle, initial, ...rest);
      if (!handlers || typeof handlers.move !== 'function') return handlers;
      const box = { start: this.posFromEvt(e), last: e, toggle: !!toggle, initial: new Set(initial || []), cache: new Map() };
      const stop = () => { if (board.boxSelect === box) board.boxSelect = null; };
      const call = (fn, args) => (typeof fn === 'function' ? fn(...args) : undefined);
      return {
        ...handlers,
        move: (ev, ...a) => { box.last = ev; board.boxSelect = box; return call(handlers.move, [ev, ...a]); },
        end: (...a) => { stop(); return call(handlers.end, a); },
        cancel: (...a) => { stop(); return call(handlers.cancel, a); },
        cleanup: (...a) => { stop(); return call(handlers.cleanup, a); },
      };
    });
    this.patch(this.canvas, 'selectAll', (original, board) => function (items) {
      return original.call(this, board.boxSelect && items ? board.withBoxEdges(items) : items);
    });
    // Undo, redo, paste and copies arrive through importData: their styles are not "applied by hand".
    this.patch(this.canvas, 'importData', (original, board) => function (...args) {
      board.importing++;
      try { return original.apply(this, args); } finally { board.importing--; board.afterImport(); }
    });
    // The card menu colours cards with setColor and then saves: that is where a colour change shows up.
    this.patch(this.canvas, 'requestSave', (original, board) => function (...args) {
      const r = original.apply(this, args);
      board.scheduleStyleCheck();
      return r;
    });
  }

  // ---------- box selection of arrows

  withBoxEdges(items) {
    const box = this.boxSelect;
    const canvas = this.canvas;
    const out = new Set(items);
    if (typeof canvas.getIntersectingEdges !== 'function') return out;
    const a = box.start;
    const b = canvas.posFromEvt(box.last); // after an auto-pan the same pointer is somewhere else on the board
    const rect = { minX: Math.min(a.x, b.x), minY: Math.min(a.y, b.y), maxX: Math.max(a.x, b.x), maxY: Math.max(a.y, b.y) };
    for (const edge of canvas.getIntersectingEdges(rect)) {
      if (!polylineHitsRect(this.edgePoints(edge, box.cache), rect)) continue;
      if (box.toggle && box.initial.has(edge)) out.delete(edge); else out.add(edge);
    }
    return out;
  }

  edgePoints(edge, cache) {
    if (cache.has(edge)) return cache.get(edge);
    const path = edge.path && edge.path.display;
    const points = [];
    if (path && typeof path.getTotalLength === 'function') {
      const len = path.getTotalLength();
      const n = Math.max(2, Math.min(400, Math.ceil(len / 6)));
      for (let i = 0; i <= n; i++) {
        const p = path.getPointAtLength((len * i) / n);
        points.push([p.x, p.y]);
      }
    }
    cache.set(edge, points);
    return points;
  }

  // ---------- bend points of the selected arrow (like Miro): drag a middle handle to add one, drag one to move it,
  // double-click one to remove it

  bendEdge() {
    if (this.bend) return this.bend.edge;
    const canvas = this.canvas;
    if (this.tool !== 'select' || canvas.readonly || canvas.selection.size !== 1) return null;
    const item = canvas.selection.values().next().value;
    return isEdgeItem(item) && canvas.edges.get(item.id) === item && item.isAttached !== false ? item : null;
  }

  syncBends() {
    const layer = this.bendLayer;
    if (!layer || this.destroyed) return;
    const edge = this.bendEdge();
    layer.gbEdge = edge;
    if (!edge) { if (layer.childElementCount) layer.empty(); return; }
    const w = waypointsOf(edge) || [];
    const route = w.length ? edgeBendRoute(edge) : null;
    const spots = [edge.from, edge.to].map((end, i) => ({ kind: 'end', index: i, ...sideCenter(end.node.getBBox(), end.side) }));
    w.forEach((p, i) => spots.push({ kind: 'point', index: i, x: p[0], y: p[1] }));
    const mids = route ? route.mids : [edge.getCenter()];
    mids.forEach((m, i) => { if (m && Number.isFinite(m.x)) spots.push({ kind: 'mid', index: i, x: m.x, y: m.y }); });
    const els = Array.from(layer.children);
    const same = els.length === spots.length && els.every((el, i) => el.dataset.kind === spots[i].kind);
    if (!same) {
      layer.empty();
      for (const s of spots) layer.createDiv({ cls: `gb-bend gb-bend-${s.kind}`, attr: { 'data-kind': s.kind } });
    }
    const k = 1 / (this.canvas.scale || 1);
    Array.from(layer.children).forEach((el, i) => {
      const s = spots[i];
      el.dataset.index = String(s.index);
      el.toggleClass('is-dragging', !!this.bend && this.bend.moved && s.kind === 'point' && s.index === this.bend.index);
      el.style.transform = `translate(${s.x}px, ${s.y}px) scale(${k})`;
    });
  }

  bendHandle(e, kind) {
    const el = e.target instanceof Element ? e.target.closest('.gb-bend') : null;
    return el && (!kind || el.dataset.kind === kind) ? el : null;
  }

  onBendDown(e) {
    const handle = this.bendHandle(e);
    if (!handle) return;
    e.stopPropagation(); // Canvas would start a selection box or deselect the arrow
    const edge = this.bendLayer.gbEdge;
    if (e.button !== 0 || !edge || this.bend) return;
    if (handle.dataset.kind === 'end') { this.dragEdgeEnd(edge, e); return; }
    e.preventDefault();
    // A second press on the same point soon after the first is a double click: remove the point. (With the pointer
    // captured by the layer, the dblclick event itself goes to the layer, not to the handle.)
    const now = Date.now();
    const last = this.lastBendPress;
    this.lastBendPress = { edge, kind: handle.dataset.kind, index: handle.dataset.index, time: now };
    if (last && handle.dataset.kind === 'point' && last.edge === edge && last.kind === 'point' && last.index === handle.dataset.index && now - last.time < 450) {
      this.lastBendPress = null;
      this.removeBend(edge, Number(handle.dataset.index));
      return;
    }
    this.bendLayer.setPointerCapture(e.pointerId);
    this.bend = {
      edge, pointerId: e.pointerId, kind: handle.dataset.kind, index: Number(handle.dataset.index),
      startClient: { x: e.clientX, y: e.clientY }, before: waypointsOf(edge), moved: false,
    };
  }

  // The end of the selected arrow moves to another card with the drag of Canvas itself (it takes the end nearest to
  // the pointer). Canvas deletes an arrow dropped on the empty board; from a handle that only cancels the move.
  dragEdgeEnd(edge, e) {
    const canvas = this.canvas;
    const { from, to } = edge;
    const own = Object.prototype.hasOwnProperty.call(canvas, 'removeEdge');
    const removeEdge = canvas.removeEdge;
    canvas.removeEdge = function (item, ...rest) {
      if (item === edge) { edge.update(from, to); return undefined; }
      return removeEdge.call(this, item, ...rest);
    };
    const win = canvas.wrapperEl.win || window;
    const finish = () => {
      win.removeEventListener('pointerup', finish, true);
      win.removeEventListener('pointercancel', finish, true);
      // After the handlers of Canvas: its drop is what still needs the guard.
      window.setTimeout(() => {
        if (own) canvas.removeEdge = removeEdge; else delete canvas.removeEdge;
        if (!this.destroyed && canvas.edges.get(edge.id) === edge && !canvas.selection.has(edge)) canvas.selectOnly(edge);
      }, 0);
    };
    win.addEventListener('pointerup', finish, true);
    win.addEventListener('pointercancel', finish, true);
    edge.onConnectionPointerdown(e);
  }

  onBendMove(e) {
    const g = this.bend;
    if (!g || e.pointerId !== g.pointerId) return;
    e.preventDefault();
    e.stopPropagation();
    if (!g.moved && Math.hypot(e.clientX - g.startClient.x, e.clientY - g.startClient.y) <= 3) return;
    const w = (waypointsOf(g.edge) || []).map((p) => p.slice());
    if (!g.moved) {
      g.moved = true;
      if (g.kind === 'mid') { w.splice(g.index, 0, [0, 0]); g.kind = 'point'; } // a new point on that segment
    }
    const edge = g.edge;
    const start = sideCenter(edge.from.node.getBBox(), edge.from.side);
    const end = sideCenter(edge.to.node.getBBox(), edge.to.side);
    const at = (i) => (i < 0 ? start : i >= w.length ? end : pt(w[i][0], w[i][1]));
    const p = snapWaypoint(this.canvas.posFromEvt(e), [at(g.index - 1), at(g.index + 1)], BEND_SNAP_PX / (this.canvas.scale || 1));
    w[g.index] = [round1(p.x), round1(p.y)];
    this.setWaypoints(edge, w);
  }

  onBendUp(e) {
    const g = this.bend;
    if (!g || e.pointerId !== g.pointerId) return;
    e.preventDefault();
    e.stopPropagation();
    this.bend = null;
    if (g.moved) this.canvas.requestSave(); // one undo step for the whole drag
    this.requestRender();
  }

  cancelBend() {
    const g = this.bend;
    if (!g) return;
    this.bend = null;
    if (g.moved) this.setWaypoints(g.edge, g.before);
  }

  onBendDoubleClick(e) {
    e.preventDefault();
    e.stopPropagation(); // a double click on the board makes a card; the point is removed in onBendDown
  }

  removeBend(edge, index) {
    const w = waypointsOf(edge);
    if (!w) return;
    this.setWaypoints(edge, w.filter((_, i) => i !== index));
    this.canvas.requestSave();
  }

  removeBends(edges) {
    for (const edge of edges) this.setWaypoints(edge, null);
    this.canvas.requestSave();
  }

  // Sets the bend points without the history and saving (a drag would make one undo step per pointer move);
  // the arrow is redrawn and re-indexed on the next frame.
  setWaypoints(edge, w) {
    const data = { ...edge.unknownData };
    if (w && w.length) data.gbWaypoints = w; else delete data.gbWaypoints;
    edge.unknownData = data;
    this.canvas.markMoved(edge);
    this.canvas.markDirty(edge);
    this.requestRender();
  }

  // Cards dragged together carry the bend points of the arrows between them (Canvas moves only the cards).
  // The first moved card is the reference: copies (Alt) and snapping move it like the rest.
  bendsFollow(handlers) {
    const canvas = this.canvas;
    const moved = new Set();
    for (const n of canvas.selection) {
      if (!n.nodeEl) continue;
      moved.add(n);
      if (isGroupNode(n)) for (const c of canvas.getContainingNodes(n.getBBox())) moved.add(c);
    }
    const edges = [];
    for (const edge of canvas.edges.values()) {
      const w = waypointsOf(edge);
      if (w && moved.has(edge.from.node) && moved.has(edge.to.node)) edges.push({ edge, w });
    }
    const ref = moved.values().next().value;
    if (!edges.length || !ref) return handlers;
    const start = { x: ref.x, y: ref.y };
    const put = (dx, dy) => {
      for (const { edge, w } of edges) {
        edge.unknownData = { ...edge.unknownData, gbWaypoints: dx || dy ? shiftWaypoints(w, dx, dy) : w };
        canvas.markMoved(edge);
      }
    };
    const call = (fn, args) => (typeof fn === 'function' ? fn(...args) : undefined);
    return {
      ...handlers,
      move: (...a) => { const r = call(handlers.move, a); put(ref.x - start.x, ref.y - start.y); return r; },
      cancel: (...a) => { const r = call(handlers.cancel, a); put(0, 0); return r; },
    };
  }

  // ---------- layers and duplicates

  // Canvas draws cards in zIndex order and saves them in that order, so the file keeps the layers.
  // Frames (groups) always lie under the cards, smaller ones above bigger ones, and are left out.
  moveLayer(action) {
    const canvas = this.canvas;
    const nodes = Array.from(canvas.nodes.values()).filter((n) => !isGroupNode(n)).sort((a, b) => a.zIndex - b.zIndex);
    const selected = new Set(nodes.filter((n) => canvas.selection.has(n)).map((n) => n.id));
    if (canvas.readonly || selected.size === 0) return false;
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const boxes = new Map(nodes.map((n) => [n.id, n.getBBox()]));
    const order = layerOrder(nodes.map((n) => n.id), selected, action, (a, b) => boxesOverlap(boxes.get(a), boxes.get(b)));
    if (order.every((id, i) => id === nodes[i].id)) return true;
    order.forEach((id, i) => {
      const n = byId.get(id);
      n.zIndex = i + 1;
      n.renderZIndex();
    });
    canvas.zIndexCounter = Math.max(canvas.zIndexCounter || 0, order.length);
    canvas.requestSave();
    return true;
  }

  // Ctrl+D: a copy of the selected cards (with what lies in selected frames and the arrows between them).
  duplicateSelection() {
    const canvas = this.canvas;
    if (canvas.readonly) return false;
    const set = new Set();
    for (const n of canvas.selection) {
      if (!n.nodeEl) continue;
      set.add(n);
      if (isGroupNode(n)) for (const c of canvas.getContainingNodes(n.getBBox())) set.add(c);
    }
    if (set.size === 0) return false;
    const copy = canvas.cloneData(canvas.getSelectionData(set), { x: DUPLICATE_SHIFT, y: DUPLICATE_SHIFT });
    const added = canvas.importData(copy, false);
    if (added) canvas.selectAll(added);
    canvas.requestSave();
    return true;
  }

  copySelection() {
    // Core Canvas copies only while its wrapper has focus, and a menu click or the "..." button takes it away.
    this.canvas.wrapperEl.focus();
    const win = this.canvas.wrapperEl.win || (typeof activeWindow !== 'undefined' ? activeWindow : window);
    const remote = win.electron && win.electron.remote;
    if (remote) remote.getCurrentWebContents().copy(); // what the core Copy item does
  }

  // ---------- last style memory

  snapshotSelection() {
    this.styleSnaps = new Map();
    for (const item of this.canvas.selection) {
      const isEdge = isEdgeItem(item);
      const data = item.getData();
      this.styleSnaps.set(item, { kind: styleKindOf(data, isEdge), key: styleKey(styleSnapshot(data, isEdge)) });
    }
  }

  scheduleStyleCheck() {
    if (this.importing || this.destroyed) return;
    window.clearTimeout(this.styleTimer);
    this.styleTimer = window.setTimeout(() => this.checkStyles(), STYLE_CHECK_MS);
  }

  // A style changed on a selected element becomes the default for new elements of its kind.
  checkStyles() {
    window.clearTimeout(this.styleTimer);
    this.styleTimer = 0;
    for (const [item, snap] of this.styleSnaps) {
      const isEdge = isEdgeItem(item);
      const data = item.getData();
      const kind = styleKindOf(data, isEdge);
      const style = styleSnapshot(data, isEdge);
      const key = styleKey(style);
      if (kind && kind === snap.kind && key !== snap.key) this.plugin.rememberStyle(kind, style);
      snap.kind = kind;
      snap.key = key;
    }
  }

  onSelectionChanged() {
    if (this.destroyed) return;
    this.checkStyles();
    queueMicrotask(() => {
      if (this.destroyed) return;
      this.snapshotSelection();
      const now = this.canvas.selection;
      for (const item of this.lastSelection) if (!now.has(item) && !isEdgeItem(item)) this.checkBlankText(item);
      this.lastSelection = new Set(now);
    });
  }

  // ---------- empty text cards

  // A text card left empty is removed once it is deselected: nothing shows on the board, it would only clutter it.
  // Its editor hands the text to the card when editing ends, a frame or so after the deselection: wait for that.
  checkBlankText(node, tries = 0) {
    window.setTimeout(() => {
      const canvas = this.canvas;
      if (this.destroyed || canvas.readonly || canvas.nodes.get(node.id) !== node || canvas.selection.has(node)) return;
      if (node.isEditing) { if (tries < 40) this.checkBlankText(node, tries + 1); return; }
      if (!isBlankText(node.getData())) return;
      const cm = node.child && node.child.editMode && node.child.editMode.cm; // an editor still open: its text counts
      if (cm && cm.state && cm.state.doc.toString().trim()) return;
      if (typeof canvas.getEdgesForNode === 'function' && canvas.getEdgesForNode(node).length) return; // an arrow end
      this.removeBlankText(node);
    }, tries ? 50 : 0);
  }

  // Removes the card from the board and from the undo history, so Ctrl+Z does not bring back an invisible card.
  removeBlankText(node) {
    const canvas = this.canvas;
    const push = canvas.requestPushHistory;
    if (push && typeof push.run === 'function') push.run(); // a pending undo step goes in first, with the card
    canvas.removeNode(node);
    const h = canvas.history;
    if (!h || !Array.isArray(h.data) || !Number.isInteger(h.current) || !h.data.length) { canvas.requestSave(); return; }
    const next = historyWithoutBlank(h.data, h.current, node.id);
    h.data.splice(0, h.data.length, ...next.entries);
    h.current = next.current;
    canvas.requestSave(false); // saves the file; the present state is the current undo step already
    if (typeof canvas.updateHistoryUI === 'function') canvas.updateHistoryUI();
  }

  afterImport() {
    if (this.importing || this.destroyed) return;
    window.clearTimeout(this.styleTimer);
    this.styleTimer = 0;
    queueMicrotask(() => { if (!this.destroyed) this.snapshotSelection(); });
  }

  // preview: the arrow is still being dragged out, it only has to look right; the final pass comes on release.
  applyDefaultStyle(item, preview = false) {
    if (this.destroyed || !item || item.gbStyled) return;
    const isEdge = isEdgeItem(item);
    const live = isEdge ? this.canvas.edges : this.canvas.nodes;
    if (!live || live.get(item.id) !== item) return;
    const data = item.getData();
    const style = this.plugin.styleFor(styleKindOf(data, isEdge));
    if (!preview) item.gbStyled = true;
    if (!style) return;
    const next = applyStyle(data, style, isEdge);
    if (JSON.stringify(next) === JSON.stringify(data)) return;
    item.setData(next);
    // Advanced Canvas redraws an arrow's path only while it is dirty or selected, and a new arrow is neither.
    if (isEdge && this.canvas.markDirty) this.canvas.markDirty(item);
    if (!preview) this.canvas.requestSave();
  }

  // Advanced Canvas sets the ends of a new arrow when the pointer is released: go after it. The line shape, colour
  // and dashes are put on at once, so the arrow already looks like itself while it is dragged out.
  applyDefaultEdgeStyle(edge) {
    const el = this.canvas.canvasEl;
    const run = () => window.setTimeout(() => this.applyDefaultStyle(edge), 0);
    if (!el || !el.hasClass('is-connecting')) { run(); return; }
    queueMicrotask(() => this.applyDefaultStyle(edge, true));
    const observer = new MutationObserver(() => {
      if (el.hasClass('is-connecting')) return;
      observer.disconnect();
      run();
    });
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
  }

  // ---------- context menu (right click or the "..." button in the card popup)

  decorateMenu(menu, kind) {
    if (!menu || menu.gbDecorated) return;
    menu.gbDecorated = true;
    const labelMenu = (m) => this.labelMenu(m);
    const canvas = this.canvas;
    if (menu.dom) menu.dom.addClass('gb-menu');
    const nodes = Array.from(canvas.selection).filter((n) => n.nodeEl);
    const add = (section, title, icon, hotkey, fn) => menu.addItem((i) => {
      i.setSection(section).setTitle(title).setIcon(icon).onClick(fn);
      i.gbHotkey = hotkey;
    });
    menu.addSections(['gb-clipboard', 'gb-layer', 'gb-edit']);
    if (kind === 'node' && obsidian.Platform && obsidian.Platform.isDesktopApp) {
      add('gb-clipboard', t('menu.copy'), 'lucide-copy', `${MOD_LABEL}+C`, () => this.copySelection());
    }
    if (!canvas.readonly && nodes.some((n) => !isGroupNode(n))) {
      add('gb-layer', t('menu.front'), 'bring-to-front', ']', () => this.moveLayer('front'));
      add('gb-layer', t('menu.forward'), 'arrow-up', `${MOD_LABEL}+]`, () => this.moveLayer('forward'));
      add('gb-layer', t('menu.backward'), 'arrow-down', `${MOD_LABEL}+[`, () => this.moveLayer('backward'));
      add('gb-layer', t('menu.back'), 'send-to-back', '[', () => this.moveLayer('back'));
    }
    if (!canvas.readonly && nodes.length) add('gb-edit', t('menu.duplicate'), 'lucide-files', `${MOD_LABEL}+D`, () => this.duplicateSelection());
    const bent = Array.from(canvas.selection).filter((x) => isEdgeItem(x) && waypointsOf(x));
    if (!canvas.readonly && bent.length) add('gb-edit', t('menu.removeBends'), pickIcon(['spline', 'route', 'waypoints']), '', () => this.removeBends(bent));
    this.addHiddenPopupActions(menu, add);
    // Other plugins may still add items: order the sections and label the hotkeys when the menu opens.
    const sort = menu.sort;
    if (typeof sort !== 'function') return;
    menu.sort = function (...args) {
      for (const it of this.items) if (it.section && !this.sections.includes(it.section)) this.sections.push(it.section);
      this.sections = orderMenuSections(this.sections);
      const r = sort.apply(this, args);
      labelMenu(this);
      return r;
    };
  }

  labelMenu(menu) {
    const byIcon = menuHotkeys(MOD_LABEL);
    for (const item of menu.items) {
      if (!item.dom || !item.titleEl || item.dom.querySelector(':scope > .gb-menu-hotkey')) continue;
      const svg = item.iconEl && item.iconEl.querySelector('svg');
      const icon = svg ? Array.from(svg.classList).find((c) => c !== 'svg-icon') : '';
      const hotkey = item.gbHotkey || byIcon[icon];
      if (!hotkey) continue;
      const label = createDiv({ cls: 'gb-menu-hotkey', text: hotkey });
      item.titleEl.insertAdjacentElement('afterend', label);
    }
  }

  // The popup replaces the buttons of Canvas and Advanced Canvas (styles.css hides them). What it does not cover,
  // such as the buttons of other plugins, moves to the "..." menu unless that menu already has the same item.
  addHiddenPopupActions(menu, add) {
    const el = this.canvas.menu && this.canvas.menu.menuEl;
    if (!el || !el.hasClass('gb-popup')) return;
    const titles = new Set(menu.items.map((i) => i.titleEl && i.titleEl.textContent));
    for (const btn of Array.from(el.children)) {
      if (btn.hasClass('gb-p') || btn.id.startsWith('menu-option-')) continue;
      const svg = btn.querySelector('svg');
      const icon = svg ? Array.from(svg.classList).find((c) => c !== 'svg-icon') : '';
      if (POPUP_REPLACED_ICONS.has(icon)) continue;
      const title = (btn.getAttribute('aria-label') || '').split('\n')[0];
      if (title && !titles.has(title)) add('gb-edit', title, icon || 'circle', '', () => btn.click());
    }
  }

  // ---------- the popup over the selection

  popupState() {
    const items = Array.from(this.canvas.selection);
    const kinds = items.map((x) => popupKindOf(x.getData(), isEdgeItem(x)));
    const groups = selectionKinds(kinds);
    const kind = groups.length > 1 ? 'mixed' : groups.length ? groups[0].kind : null;
    const data = items.length ? items[0].getData() : {};
    return { items, kinds, groups, kind, data, sa: data.styleAttributes || {} };
  }

  // Called on every render of the Canvas popup, also while the board moves: rebuilt only when something changed.
  renderPopup(force) {
    const el = this.canvas.menu && this.canvas.menu.menuEl;
    if (!el || this.destroyed) return;
    const st = this.popupState();
    const key = JSON.stringify([this.canvas.readonly, st.items.map((x) => {
      const d = x.getData();
      return [d.id, d.color, d.styleAttributes, d.text, d.fromEnd, d.toEnd, d.gbStroke && d.gbStroke.size];
    })]);
    if (!force && key === this.popupKey && el.querySelector(':scope > .gb-p-more')) { this.scheduleFitPopup(el); return; }
    this.popupKey = key;
    const open = this.popOpen;
    this.clearPopup(el);
    this.popOpen = open;
    if (!st.kind) { this.popOpen = null; return; }
    el.addClass('gb-popup');
    this.popBar = { el, st, dropdowns: {} };
    const controls = POPUP_CONTROLS[st.kind] || [];
    const usable = this.canvas.readonly ? controls.filter((c) => c === 'filter') : controls;
    usable.forEach((c) => { if (c === '|') el.createDiv({ cls: 'gb-p gb-p-sep' }); else this[`pop_${c}`](st); });
    if (usable.length) el.createDiv({ cls: 'gb-p gb-p-sep' });
    const more = this.popButton('more', { icon: 'more-horizontal', label: t('menu.more') });
    more.addClass('gb-p-more', 'gb-more');
    more.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.closeDropdown(); this.openContextMenu(more); });
    this.scheduleFitPopup(el);
    if (this.popOpen && this.popBar.dropdowns[this.popOpen]) this.openDropdown(this.popOpen);
    else this.popOpen = null;
  }

  // Canvas places the bar after this event, so it is measured on the next frame.
  scheduleFitPopup(el) {
    if (this.popFitFrame) return;
    this.popFitFrame = window.requestAnimationFrame(() => {
      this.popFitFrame = 0;
      if (this.destroyed || !el.hasClass('gb-popup')) return;
      this.fitPopup(el);
      this.placeDropdown();
    });
  }

  // The free width of the board at the height top..bottom: between the left toolbar and the right buttons.
  popupRoom(top, bottom) {
    const wr = this.canvas.wrapperEl.getBoundingClientRect();
    const room = { min: wr.left + POPUP_MARGIN, max: wr.right - POPUP_MARGIN };
    const beside = (r) => r.width > 0 && r.top < bottom && r.bottom > top;
    const tools = this.toolbarEl && this.toolbarEl.getBoundingClientRect();
    if (tools && beside(tools)) room.min = Math.max(room.min, tools.right + POPUP_MARGIN);
    const controls = this.canvas.wrapperEl.querySelector('.canvas-controls');
    const right = controls && controls.getBoundingClientRect();
    if (right && beside(right)) room.max = Math.min(room.max, right.left - POPUP_MARGIN);
    return room;
  }

  // Keeps the bar off the toolbars (Canvas puts it over the selection, wherever that is).
  fitPopup(el) {
    const now = parseFloat(el.style.left) || 0;
    const r = el.getBoundingClientRect();
    const room = this.popupRoom(r.top, r.bottom);
    const base = r.left - now;
    const left = Math.max(room.min, Math.min(room.max - r.width, base));
    const shift = Math.round(left - base);
    if (shift !== now) el.style.left = shift ? `${shift}px` : '';
  }

  clearPopup(el) {
    this.popOpen = null;
    el.style.left = '';
    el.removeClass('gb-popup');
    for (const c of Array.from(el.querySelectorAll(':scope > .gb-p'))) c.remove();
  }

  popButton(name, { icon, label, active, chevron, dropdown, onClick }) {
    const { el, dropdowns } = this.popBar;
    const b = el.createEl('button', { cls: 'clickable-icon gb-p gb-p-btn', attr: { 'data-control': name } });
    if (icon) obsidian.setIcon(b.createSpan({ cls: 'gb-p-icon' }), icon);
    if (active) b.addClass('is-selected');
    this.setTooltip(b, label, 'top');
    if (dropdown) {
      dropdowns[name] = { anchor: b, build: dropdown };
      b.setAttr('aria-haspopup', 'true');
      b.addEventListener('click', () => { if (this.popOpen === name) this.closeDropdown(); else this.openDropdown(name); });
    } else if (onClick) b.addEventListener('click', onClick);
    if (chevron) obsidian.setIcon(b.createSpan({ cls: 'gb-p-chevron' }), 'chevron-down');
    return b;
  }

  openDropdown(name) {
    this.closeDropdown();
    const entry = this.popBar && this.popBar.dropdowns[name];
    if (!entry) return;
    this.popOpen = name;
    entry.anchor.addClass('is-open');
    const panel = this.popBar.el.createDiv({ cls: 'gb-p gb-p-drop' });
    panel.addEventListener('pointerdown', (e) => e.stopPropagation());
    panel.addEventListener('keydown', (e) => e.stopPropagation());
    entry.build(panel);
    this.popPanel = panel;
    this.placeDropdown();
  }

  // Under the button, or above it when the board has no room below; never under the toolbars.
  placeDropdown() {
    const panel = this.popPanel;
    const entry = this.popBar && this.popBar.dropdowns[this.popOpen];
    if (!panel || !entry) return;
    const wr = this.canvas.wrapperEl.getBoundingClientRect();
    const mr = this.popBar.el.getBoundingClientRect();
    const ar = entry.anchor.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const below = mr.bottom + 6 + pr.height <= wr.bottom - POPUP_MARGIN || mr.top - 6 - pr.height < wr.top + POPUP_MARGIN;
    const top = below ? mr.bottom + 6 : mr.top - 6 - pr.height;
    const room = this.popupRoom(top, top + pr.height);
    const left = Math.max(room.min, Math.min(room.max - pr.width, ar.left));
    panel.style.left = `${Math.round(left - mr.left)}px`;
    panel.style.top = `${Math.round(top - mr.top)}px`;
  }

  closeDropdown() {
    this.popOpen = null;
    if (this.popPanel) this.popPanel.remove();
    this.popPanel = null;
    if (this.popBar) for (const d of Object.values(this.popBar.dropdowns)) d.anchor.removeClass('is-open');
  }

  // Changes every selected element, as one undo step, and shows the new state in the popup.
  applyPopup(fn, { history = true, close = false } = {}) {
    const canvas = this.canvas;
    for (const item of canvas.selection) {
      const data = item.getData();
      const next = fn(data, item);
      if (!next || JSON.stringify(next) === JSON.stringify(data)) continue;
      item.setData(next);
      if (isEdgeItem(item)) { this.plugin.decorateEdge(item); if (canvas.markDirty) canvas.markDirty(item); } else this.plugin.decorate(item);
    }
    if (history) {
      canvas.requestSave(); // also the undo step
      if (close) this.popOpen = null;
      this.renderPopup(true);
    }
  }

  applyStylePatch(patch, opts) { this.applyPopup((d) => withStyle(d, patch), opts); }

  // Text changes go to the open editor of a card being edited, otherwise its text would come back.
  applyText(fn) {
    this.applyPopup((d, item) => {
      if (d.type !== 'text' || d.gbStroke) return null;
      const editor = item.isEditing && item.child && item.child.editor;
      if (!editor) return { ...d, text: fn(d.text || '') };
      editor.setValue(fn(editor.getValue()));
      return null;
    });
  }

  popOption(parent, { icon, text, label, active, onClick, count }) {
    const o = parent.createDiv({ cls: text ? 'gb-p-opt gb-p-row' : 'gb-p-opt' });
    if (active) o.addClass('is-selected');
    if (icon) obsidian.setIcon(o.createSpan({ cls: 'gb-p-icon' }), icon);
    if (text) o.createSpan({ cls: 'gb-p-opt-text', text });
    if (count !== undefined) o.createSpan({ cls: 'gb-p-count', text: String(count) });
    if (!text && label) this.setTooltip(o, label, 'top');
    o.addEventListener('click', onClick);
    return o;
  }

  popGroup(panel, title, cls = '') {
    if (title) panel.createDiv({ cls: 'gb-p-title', text: title });
    return panel.createDiv({ cls: `gb-p-grid ${cls}` });
  }

  // value: the current colour or null. def / none add the "default" and "no colour" choices.
  popColors(panel, { value, def, none, onPick }) {
    const same = (c) => !!value && value.toLowerCase() === c.toLowerCase();
    const row = panel.createDiv({ cls: 'gb-p-colors' });
    const swatch = (hex) => {
      const s = row.createDiv({ cls: 'gb-swatch' });
      s.style.setProperty('--gb-swatch', hex);
      s.toggleClass('is-selected', same(hex));
      this.setTooltip(s, hex, 'top');
      s.addEventListener('click', () => onPick(hex));
    };
    const special = (icon, label, active, v) => {
      const s = row.createDiv({ cls: 'gb-swatch gb-swatch-special' });
      obsidian.setIcon(s, icon);
      s.toggleClass('is-selected', active);
      this.setTooltip(s, label, 'top');
      s.addEventListener('click', () => onPick(v));
    };
    if (def) special('rotate-ccw', t('popup.default'), !value, null);
    if (none) special('ban', t('popup.none'), value === 'transparent', 'transparent');
    POPUP_COLORS.forEach(swatch);
    (this.settings.markerRecentColors || []).filter((c) => !POPUP_COLORS.some((p) => p.toLowerCase() === c.toLowerCase())).forEach(swatch);
    const add = row.createDiv({ cls: 'gb-swatch gb-add-color' });
    obsidian.setIcon(add, 'plus');
    this.setTooltip(add, t('marker.addColor'), 'top');
    const input = add.createEl('input', { cls: 'gb-color-input', attr: { type: 'color', 'aria-label': t('marker.addColor') } });
    input.value = value && /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : '#ffffff';
    input.addEventListener('change', () => {
      const hex = normalizeHex(input.value);
      if (!hex) return;
      this.settings.markerRecentColors = addRecentColor(this.settings.markerRecentColors, hex);
      void this.plugin.saveSettings();
      onPick(hex);
    });
  }

  popSlider(panel, { title, min, max, value, onInput, onChange }) {
    const head = panel.createDiv({ cls: 'gb-panel-head' });
    head.createSpan({ text: title });
    const label = head.createSpan({ cls: 'gb-width-value', text: `${value} px` });
    const input = panel.createEl('input', { cls: 'gb-width-slider', attr: { type: 'range', min, max, step: 1, 'aria-label': title } });
    const paint = (v) => {
      label.setText(`${v} px`);
      input.style.setProperty('--gb-fill', `${((v - min) / (max - min)) * 100}%`);
    };
    input.value = String(value);
    paint(value);
    input.addEventListener('input', () => { const v = Number(input.value); paint(v); onInput(v); });
    input.addEventListener('change', () => onChange(Number(input.value)));
  }

  popSwatchButton(name, label, style, dropdown) {
    const b = this.popButton(name, { label, dropdown });
    const dot = b.createSpan({ cls: `gb-p-dot ${style.ring ? 'is-ring' : ''}` });
    dot.prepend(createSpan());
    dot.style.setProperty('--gb-dot', style.color);
    dot.toggleClass('is-none', style.color === 'transparent');
    return b;
  }

  popLetterButton(name, label, { letter, icon, bar, active, dropdown }) {
    const b = this.popButton(name, { icon, label, active, dropdown });
    if (letter) b.prepend(createSpan({ cls: 'gb-p-letter', text: letter }));
    if (bar) { b.addClass('has-bar'); b.style.setProperty('--gb-bar', bar === 'transparent' ? 'var(--gb-line)' : bar); }
    return b;
  }

  pop_type(st) {
    const current = cardTypeOf(st.data);
    const shape = SHAPES.find((s) => s.id === current);
    const icon = shape ? shape.icon : KIND_ICONS[current] || 'shapes';
    this.popButton('type', { icon, label: t('popup.type'), chevron: true, dropdown: (panel) => {
      const pick = (id) => () => this.applyPopup((d) => (d.type === 'text' && !d.gbStroke ? withCardType(d, id) : null), { close: true });
      const shapes = this.popGroup(panel, t('tool.shape'), 'gb-p-grid-4');
      for (const s of SHAPES) this.popOption(shapes, { icon: s.icon, label: t(`shape.${s.id}`), active: current === s.id, onClick: pick(s.id) });
      const other = this.popGroup(panel, '', 'gb-p-list');
      this.popOption(other, { icon: KIND_ICONS.sticky, text: t('tool.sticky'), active: current === 'sticky', onClick: pick('sticky') });
      this.popOption(other, { icon: KIND_ICONS.text, text: t('tool.text'), active: current === 'text', onClick: pick('text') });
    } });
  }

  pop_fill(st) {
    const base = { sticky: 'var(--gb-sticky)', shape: 'var(--gb-card)' }[st.kind] || 'transparent';
    this.popSwatchButton('fill', t('popup.fill'), { color: st.sa.gbFill || base }, (panel) => {
      panel.createDiv({ cls: 'gb-p-title', text: t('popup.fill') });
      this.popColors(panel, { value: st.sa.gbFill || null, def: true, none: true, onPick: (c) => this.applyPopup((d) => withFill(d, c)) });
    });
  }

  pop_border(st) {
    const hidden = st.sa.border === 'invisible';
    this.popSwatchButton('border', t('popup.border'), { ring: true, color: hidden ? 'transparent' : st.sa.gbBorder || st.data.color || 'var(--gb-soft)' }, (panel) => {
      const styles = this.popGroup(panel, t('popup.border'), 'gb-p-grid-4');
      for (const o of BORDER_OPTIONS) {
        this.popOption(styles, { icon: o.icon, label: t(`border.${o.id}`), active: (st.sa.border || null) === o.value, onClick: () => this.applyStylePatch({ border: o.value }) });
      }
      panel.createDiv({ cls: 'gb-p-title', text: t('popup.color') });
      this.popColors(panel, { value: st.sa.gbBorder || null, def: true, onPick: (c) => this.applyStylePatch({ gbBorder: c }) });
    });
  }

  pop_size(st) {
    const size = fontSizeOf(st.sa);
    const set = (v) => this.applyStylePatch({ gbFontSize: v, gbSize: null });
    const { el } = this.popBar;
    const box = el.createDiv({ cls: 'gb-p gb-p-size' });
    const input = box.createEl('input', { attr: { type: 'text', inputmode: 'numeric', 'aria-label': t('popup.size') } });
    input.value = String(size);
    this.setTooltip(input, t('popup.size'), 'top');
    input.addEventListener('pointerdown', (e) => e.stopPropagation());
    input.addEventListener('focus', () => input.select());
    input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') input.blur();
      if (e.key === 'Escape') { input.value = String(size); input.blur(); }
    });
    input.addEventListener('change', () => set(clampFontSize(input.value, size)));
    const arrows = box.createDiv({ cls: 'gb-p-steps' });
    const step = (icon, label, dir) => {
      const b = arrows.createEl('button', { cls: 'clickable-icon' });
      obsidian.setIcon(b, icon);
      this.setTooltip(b, label, 'top');
      b.addEventListener('click', () => set(stepFontSize(size, dir)));
    };
    step('chevron-up', t('popup.sizeUp'), 1);
    step('chevron-down', t('popup.sizeDown'), -1);
  }

  pop_bold(st) {
    const on = hasLineMark(st.data.text, '**');
    this.popButton('bold', { icon: 'bold', label: t('popup.bold'), active: on, onClick: () => this.applyText((x) => setLineMark(x, '**', !on)) });
  }

  pop_align(st) {
    const value = st.sa.textAlign || null;
    const current = ALIGN_OPTIONS.find((o) => o.value === value) || ALIGN_OPTIONS[0];
    this.popButton('align', { icon: `align-${current.id}`, label: t('popup.align'), dropdown: (panel) => {
      const grid = this.popGroup(panel, '', 'gb-p-grid-3');
      for (const o of ALIGN_OPTIONS) {
        this.popOption(grid, { icon: `align-${o.id}`, label: t(`align.${o.id}`), active: o === current, onClick: () => this.applyStylePatch({ textAlign: o.value }) });
      }
    } });
  }

  pop_list(st) {
    this.popButton('list', { icon: 'list', label: t('popup.list'), active: hasList(st.data.text), onClick: () => this.applyText(toggleList) });
  }

  pop_lineHeight(st) {
    const value = Number.isFinite(st.sa.gbLineHeight) ? st.sa.gbLineHeight : null;
    this.popLetterButton('lineHeight', t('popup.lineHeight'), { letter: 'A', icon: 'move-vertical', dropdown: (panel) => {
      const list = this.popGroup(panel, t('popup.lineHeight'), 'gb-p-list');
      for (const h of LINE_HEIGHTS) {
        this.popOption(list, { text: h === null ? t('popup.lineHeightDefault') : String(h), active: h === value, onClick: () => this.applyStylePatch({ gbLineHeight: h }) });
      }
    } }).addClass('gb-p-lh');
  }

  pop_textColor(st) {
    const value = st.sa.gbTextColor || null;
    const ink = inkFor(st.sa.gbFill); // the automatic text colour on a fill of its own
    const shown = value || (st.kind === 'text' && st.data.color) || (ink && INK_VARS[ink]['--text-normal'])
      || (st.kind === 'sticky' ? 'var(--gb-sticky-ink)' : 'var(--gb-ink)');
    this.popLetterButton('textColor', t('popup.textColor'), { letter: 'A', bar: st.kind === 'sticky' && !value && !ink ? '#FFF59A' : shown, dropdown: (panel) => {
      panel.createDiv({ cls: 'gb-p-title', text: t('popup.textColor') });
      this.popColors(panel, { value, def: true, onPick: (c) => this.applyStylePatch({ gbTextColor: c }) });
    } });
  }

  pop_highlight(st) {
    const on = hasLineMark(st.data.text, '==');
    const value = on ? st.sa.gbHighlight || '#FFD54A' : null;
    this.popLetterButton('highlight', t('popup.highlight'), { icon: 'highlighter', bar: value || 'transparent', dropdown: (panel) => {
      panel.createDiv({ cls: 'gb-p-title', text: t('popup.highlight') });
      this.popColors(panel, { value: value || 'transparent', none: true, onPick: (c) => this.applyPopup((d) => {
        if (d.type !== 'text' || d.gbStroke) return null;
        const off = c === 'transparent';
        const next = withStyle(d, { gbHighlight: off ? null : c });
        next.text = setLineMark(d.text, '==', !off);
        return next;
      }) });
    } });
  }

  popDataColor(name, label, st, opts) {
    this.popSwatchButton(name, label, { color: st.data.color || opts.base }, (panel) => {
      if (opts.before) opts.before(panel);
      panel.createDiv({ cls: 'gb-p-title', text: t('popup.color') });
      this.popColors(panel, { value: st.data.color || null, def: opts.def, onPick: (c) => this.applyPopup((d) => {
        const next = { ...d };
        if (c) next.color = c; else delete next.color;
        return next;
      }) });
    });
  }

  pop_inkColor(st) { this.popDataColor('inkColor', t('popup.color'), st, { base: 'var(--gb-red)' }); }

  pop_edgeColor(st) { this.popDataColor('edgeColor', t('popup.color'), st, { base: 'var(--gb-red)', def: true }); }

  pop_inkWidth(st) {
    const size = st.data.gbStroke.size;
    this.popButton('inkWidth', { label: t('popup.width'), dropdown: (panel) => {
      const each = (v) => (d) => (d.gbStroke && isValidStroke(d.gbStroke) ? withStrokeWidth(d, v) : null);
      this.popSlider(panel, { title: t('popup.width'), min: MARKER_WIDTH.min, max: MARKER_WIDTH.max, value: clampMarkerWidth(size),
        onInput: (v) => this.applyPopup(each(v), { history: false }), onChange: (v) => this.applyPopup(each(v)) });
    } }).createSpan({ cls: 'gb-p-thick' }).append(createSpan(), createSpan(), createSpan());
  }

  pop_edgeLine(st) {
    const route = EDGE_ROUTES.find((o) => o.value === (st.sa.pathfindingMethod || null)) || EDGE_ROUTES[0];
    const width = Number.isFinite(st.sa.gbWidth) ? clampEdgeWidth(st.sa.gbWidth) : EDGE_WIDTH.def;
    this.popButton('edgeLine', { icon: route.icon, label: t('popup.line'), chevron: true, dropdown: (panel) => {
      const routes = this.popGroup(panel, t('popup.line'), 'gb-p-grid-4');
      for (const o of EDGE_ROUTES) this.popOption(routes, { icon: o.icon, label: t(`route.${o.id}`), active: o === route, onClick: () => this.applyStylePatch({ pathfindingMethod: o.value }) });
      const paths = this.popGroup(panel, '', 'gb-p-grid-4');
      for (const o of EDGE_PATHS) this.popOption(paths, { icon: o.icon, label: t(`path.${o.id}`), active: (st.sa.path || null) === o.value, onClick: () => this.applyStylePatch({ path: o.value }) });
      const patch = (v) => ({ gbWidth: v === EDGE_WIDTH.def ? null : v });
      this.popSlider(panel, { title: t('popup.width'), min: EDGE_WIDTH.min, max: EDGE_WIDTH.max, value: width,
        onInput: (v) => this.applyStylePatch(patch(v), { history: false }), onChange: (v) => this.applyStylePatch(patch(v)) });
    } });
  }

  pop_edgeEnds(st) {
    const from = st.data.fromEnd || 'none', to = st.data.toEnd || 'arrow';
    const dir = EDGE_DIRECTIONS.find((o) => o.fromEnd === from && o.toEnd === to) || EDGE_DIRECTIONS[1];
    this.popButton('edgeEnds', { icon: dir.icon, label: t('popup.ends'), chevron: true, dropdown: (panel) => {
      const dirs = this.popGroup(panel, t('popup.ends'), 'gb-p-grid-4');
      for (const o of EDGE_DIRECTIONS) {
        this.popOption(dirs, { icon: o.icon, label: t(`dir.${o.id}`), active: o === dir, onClick: () => this.applyPopup((d) => ({ ...d, fromEnd: o.fromEnd, toEnd: o.toEnd })) });
      }
      const heads = this.popGroup(panel, '', 'gb-p-grid-4');
      for (const o of EDGE_HEADS) this.popOption(heads, { icon: o.icon, label: t(`head.${o.id}`), active: (st.sa.arrow || null) === o.value, onClick: () => this.applyStylePatch({ arrow: o.value }) });
    } });
  }

  pop_filter(st) {
    const b = this.popButton('filter', { label: t('popup.filter'), chevron: true, dropdown: (panel) => {
      const list = this.popGroup(panel, '', 'gb-p-list');
      for (const g of st.groups) {
        this.popOption(list, { icon: KIND_ICONS[g.kind], text: t(`kind.${g.kind}`), count: g.count, onClick: () => this.filterSelection(g.kind, st) });
      }
    } });
    const text = createDiv({ cls: 'gb-p-filter' });
    text.createDiv({ cls: 'gb-p-filter-title', text: t('popup.filter') });
    text.createDiv({ text: objectsLabel(st.items.length) });
    b.prepend(text);
  }

  filterSelection(kind, st) {
    const keep = new Set(st.items.filter((_, i) => st.kinds[i] === kind));
    this.popOpen = null;
    this.canvas.updateSelection(() => { this.canvas.selection = keep; });
    this.renderPopup(true);
  }

  openContextMenu(anchor) {
    const item = Array.from(this.canvas.selection)[0];
    const target = item && (item.nodeEl || item.lineGroupEl);
    if (!target) return;
    const r = anchor.getBoundingClientRect();
    target.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2, clientX: r.left, clientY: r.bottom + 6 }));
  }

  // ---------- minimap and zoom label

  requestRender() {
    this.dirty = true;
    if (this.frame) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = 0;
      if (this.dirty) this.renderNav();
      this.syncBends();
      // Canvas animates zoom and pan towards tZoom/tx/ty without new events: follow until it settles.
      const c = this.canvas;
      if (Math.abs(c.zoom - c.tZoom) > 1e-4 || Math.abs(c.x - c.tx) > 0.01 || Math.abs(c.y - c.ty) > 0.01) this.requestRender();
    });
  }

  renderNav() {
    this.dirty = false;
    this.syncGridButton(); // the core canvas menu can switch grid snapping too
    const canvas = this.canvas;
    const pct = zoomPercent(canvas.scale || 1);
    if (this.zoomLabel.textContent !== pct) {
      this.zoomLabel.textContent = pct;
      this.zoomLabel.setAttr('aria-label', t('nav.zoomLabel', { pct }));
    }
    if (!this.settings.minimap || !this.minimapEl.isShown()) return;
    const cssW = 200, cssH = 130, dpr = window.devicePixelRatio || 1;
    const el = this.minimapEl;
    if (el.width !== cssW * dpr) { el.width = cssW * dpr; el.height = cssH * dpr; }
    const ctx = el.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const nodes = Array.from(canvas.nodes.values());
    const vp = canvas.getViewportBBox();
    const content = unionBounds(nodes.map((n) => ({ minX: n.x, minY: n.y, maxX: n.x + n.width, maxY: n.y + n.height })));
    const fit = minimapFit(unionBounds([content, vp]), cssW, cssH, 8);
    this.minimapFitState = fit;
    const rect = (n) => { const a = fit.toMap(n.x, n.y); return [a.x, a.y, Math.max(1, n.width * fit.scale), Math.max(1, n.height * fit.scale)]; };
    const groups = nodes.filter((n) => n.getData().type === 'group');
    ctx.lineWidth = 1;
    for (const n of groups) { ctx.strokeStyle = 'rgba(93,178,255,0.75)'; ctx.strokeRect(...rect(n)); }
    for (const n of nodes) {
      const type = n.getData().type;
      if (type === 'group') continue;
      const s = strokeOf(n);
      if (s) {
        ctx.strokeStyle = n.color && n.color.startsWith('#') ? n.color : '#FF5A3D';
        ctx.lineWidth = Math.max(1, s.size * fit.scale);
        ctx.beginPath();
        const sx = n.width / s.w, sy = n.height / s.h;
        s.points.forEach((p, i) => { const m = fit.toMap(n.x + p[0] * sx, n.y + p[1] * sy); if (i === 0) ctx.moveTo(m.x, m.y); else ctx.lineTo(m.x, m.y); });
        ctx.stroke();
        ctx.lineWidth = 1;
        continue;
      }
      const kind = styleOf(n).gbKind;
      ctx.fillStyle = kind === 'sticky' ? '#FFF59A' : kind === 'text' ? 'rgba(237,237,237,0.35)' : type === 'file' ? '#565b66' : '#4a4f59';
      ctx.fillRect(...rect(n));
    }
    const a = fit.toMap(vp.minX, vp.minY), b = fit.toMap(vp.maxX, vp.maxY);
    ctx.strokeStyle = 'rgba(237,237,237,0.85)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
  }

  onMinimapDown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    this.minimapEl.setPointerCapture(e.pointerId);
    this.minimapDrag = true;
    this.panToMinimap(e);
  }

  onMinimapMove(e) { if (this.minimapDrag) this.panToMinimap(e); }

  panToMinimap(e) {
    const fit = this.minimapFitState;
    if (!fit) return;
    const r = this.minimapEl.getBoundingClientRect();
    const p = fit.toCanvas(e.clientX - r.left, e.clientY - r.top);
    this.canvas.panTo(p.x, p.y);
  }
}

// ---------------------------------------------------------------- plugin

class SettingsTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    this.containerEl.empty();
    new obsidian.Setting(this.containerEl)
      .setName(t('settings.language'))
      .setDesc(t('settings.languageDesc'))
      .addDropdown((d) => d
        .addOptions(LANGUAGE_NAMES)
        .setValue(this.plugin.settings.language)
        .onChange(async (value) => {
          await this.plugin.changeLanguage(value);
          this.display();
        }));
  }
}

class CultCanvasPlugin extends obsidian.Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    delete this.settings.markerSize; // the thin / thick buttons before the width slider
    this.settings.markerWidth = clampMarkerWidth(this.settings.markerWidth);
    this.settings.markerColor = markerColorSetting(this.settings.markerColor) || DEFAULT_SETTINGS.markerColor;
    this.settings.markerRecentColors = addRecentColor(this.settings.markerRecentColors, null);
    this.settings.styleDefaults = { ...(this.settings.styleDefaults || {}) };
    if (!STRINGS[this.settings.language]) this.settings.language = DEFAULT_SETTINGS.language;
    setLanguage(this.settings.language);
    this.boards = new Map(); // canvas -> Board
    this.fontDocs = new Map(); // document -> the font faces added to it (the main window and each popout window)
    this.loadFont();
    this.addSettingTab(new SettingsTab(this.app, this));
    this.registerEvent(this.app.workspace.on('window-open', (win) => this.addFontTo(win.win)));
    this.registerEvent(this.app.workspace.on('window-close', (win) => this.fontDocs.delete(win.doc)));

    const on = (name, fn) => this.registerEvent(this.app.workspace.on(name, fn));
    const board = (canvas) => this.boards.get(canvas);
    on('advanced-canvas:node-changed', (canvas, node) => {
      this.decorate(node);
      this.dirtyBoard(canvas);
      if (node && node.isEditing) void this.styleEditor(node);
      if (board(canvas)) board(canvas).scheduleStyleCheck();
    });
    on('advanced-canvas:edge-changed', (canvas, edge) => this.onEdgeChanged(canvas, edge));
    on('advanced-canvas:edge-added', (canvas, edge) => { this.patchEdgeProto(edge); this.decorateEdge(edge); });
    on('advanced-canvas:node-added', (canvas, node) => { if (board(canvas)) this.decorate(node); });
    // New elements get the last style of their kind once their creator has finished filling them in.
    on('advanced-canvas:node-created', (canvas, node) => {
      const b = board(canvas);
      if (b && !b.importing) queueMicrotask(() => b.applyDefaultStyle(node));
    });
    on('advanced-canvas:edge-created', (canvas, edge) => {
      const b = board(canvas);
      if (b && !b.importing) b.applyDefaultEdgeStyle(edge);
    });
    on('canvas:node-menu', (menu, node) => { const b = node && board(node.canvas); if (b) b.decorateMenu(menu, 'node'); });
    on('canvas:edge-menu', (menu, edge) => { const b = edge && board(edge.canvas); if (b) b.decorateMenu(menu, 'edge'); });
    on('canvas:selection-menu', (menu, canvas) => { if (board(canvas)) board(canvas).decorateMenu(menu, 'selection'); });
    on('advanced-canvas:popup-menu-created', (canvas) => { if (board(canvas)) board(canvas).renderPopup(); });
    // The text editor of a card is an iframe: give it the board font and the card colour,
    // so the text looks the same while editing as after it (the rest is in styles.css).
    on('advanced-canvas:node-editing-state-changed', (canvas, node, editing) => { if (editing && this.boards.has(canvas)) void this.styleEditor(node); });
    on('advanced-canvas:node-removed', (canvas) => this.dirtyBoard(canvas));
    on('advanced-canvas:node-moved', (canvas) => this.dirtyBoard(canvas));
    on('advanced-canvas:node-resized', (canvas) => this.dirtyBoard(canvas));
    on('advanced-canvas:viewport-changed:after', (canvas) => this.dirtyBoard(canvas));
    on('advanced-canvas:data-loaded:after', (canvas) => { const b = this.boards.get(canvas); if (b) { b.decorateAll(); b.requestRender(); } });
    on('advanced-canvas:canvas-changed', () => this.attachAll());
    // A marker line touches the edges of its box, where Canvas puts arrow dots and resize handles:
    // hide the dots always and the handles until the line is selected, so a drag on the line moves it.
    on('advanced-canvas:node-interaction', (canvas) => this.syncInteractionLayer(canvas));
    on('advanced-canvas:selection-changed', (canvas) => {
      this.syncInteractionLayer(canvas);
      if (board(canvas)) { board(canvas).onSelectionChanged(); board(canvas).requestRender(); }
    });
    on('advanced-canvas:double-click', (canvas, _e, preventDefault) => {
      const b = this.boards.get(canvas);
      if (b && b.tool !== 'select' && preventDefault) preventDefault.value = true;
    });
    on('layout-change', () => this.attachAll());
    on('active-leaf-change', () => this.attachAll());

    this.registerDomEvent(window, 'keydown', (e) => this.onKeyDown(e), true);
    this.registerDomEvent(window, 'keyup', (e) => { if (e.code === 'Space') this.setSpace(false); }, true);
    this.registerDomEvent(window, 'blur', () => this.setSpace(false));

    this.registerCommands();

    this.app.workspace.onLayoutReady(() => this.attachAll());
    // Obsidian has no event for a plugin being installed or enabled: the hint on the boards looks by itself.
    this.registerInterval(window.setInterval(() => this.syncAdvancedCanvasHints(), 2000));
  }

  syncAdvancedCanvasHints() { for (const b of this.boards.values()) b.syncAdvancedCanvasHint(); }

  closeAdvancedCanvasHint() {
    this.acHintClosed = true; // for this run of Obsidian: the next start reminds again
    this.syncAdvancedCanvasHints();
  }

  // The button of the hint: turn the plugin on, or open its page in the community plugins.
  async fixAdvancedCanvas() {
    if (advancedCanvasState(this.app.plugins) === 'off') {
      try { await this.app.plugins.enablePluginAndSave(ADVANCED_CANVAS_ID); } catch (e) { console.error('Cult Canvas', e); new obsidian.Notice(t('notice.failed')); }
      this.syncAdvancedCanvasHints();
    } else {
      // Without the vault name the link goes to whichever vault Obsidian picks, not necessarily this one.
      window.open(advancedCanvasPageUrl(this.app.vault.getName()));
    }
  }

  // Called again after a language change: a command added with the same id replaces the old one.
  registerCommands() {
    for (const tool of TOOLS) {
      this.addCommand({
        id: `tool-${tool.id}`,
        name: t('command.tool', { tool: t(`tool.${tool.id}`) }),
        checkCallback: (checking) => {
          const b = this.activeBoard();
          if (!b) return false;
          if (!checking) b.setTool(tool.id);
          return true;
        },
      });
    }
    this.addCommand({
      id: 'grid-snap',
      name: t('command.grid'),
      checkCallback: (checking) => {
        const b = this.activeBoard();
        if (!b) return false;
        if (!checking) this.setGridSnap(!b.gridSnap);
        return true;
      },
    });
  }

  async changeLanguage(lang) {
    if (!STRINGS[lang] || lang === this.settings.language) return;
    this.settings.language = lang;
    setLanguage(lang);
    await this.saveSettings();
    this.registerCommands();
    // Boards build their panels with the texts of the moment: build them again.
    for (const b of this.boards.values()) b.destroy();
    this.boards.clear();
    this.attachAll();
  }

  onunload() {
    this.unloaded = true;
    for (const b of this.boards.values()) b.destroy();
    this.boards.clear();
    this.unpatchNodeZ();
    this.unpatchEdgeProto();
    for (const [doc, faces] of this.fontDocs) for (const face of faces) doc.fonts.delete(face);
    this.fontDocs.clear();
    if (this.saveTimer) { window.clearTimeout(this.saveTimer); void this.saveSettings(); }
  }

  async saveSettings() {
    try { await this.saveData(this.settings); } catch (err) { console.error('Cult Canvas: settings not saved', err); }
  }

  styleFor(kind) {
    const all = this.settings.styleDefaults;
    return kind && all && all[kind] ? all[kind] : null;
  }

  rememberStyle(kind, style) {
    const all = this.settings.styleDefaults;
    if (all[kind] && styleKey(all[kind]) === styleKey(style)) return;
    all[kind] = style;
    window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => { this.saveTimer = 0; void this.saveSettings(); }, 500);
  }

  // Canvas draws the selected card above everything until it is deselected. Holst keeps every element on
  // its layer, so a big background picked to be moved stays under the small cards on it. Advanced Canvas
  // wraps renderZIndex on every card when it is added (keeping a reference to the core method), so the
  // wrapper goes on each card on top of it; off the boards and after unload it hands over to the old one.
  patchNodeZ(node) {
    if (!node || !node.nodeEl || node.gbZ || isGroupNode(node) || typeof node.renderZIndex !== 'function') return;
    const prev = node.renderZIndex;
    const own = Object.prototype.hasOwnProperty.call(node, 'renderZIndex');
    const offBoard = (canvas) => this.unloaded || !this.boards.has(canvas);
    const mine = function (...args) {
      if (offBoard(this.canvas) || this.getData().zIndex !== undefined) return prev.apply(this, args);
      const z = String(this.zIndex);
      if (this.nodeEl.style.zIndex !== z) this.nodeEl.style.zIndex = z;
      this.renderedZIndex = this.zIndex;
    };
    node.renderZIndex = mine;
    node.gbZ = { prev, own, mine };
    mine.call(node);
  }

  // Bend points (gbWaypoints) are drawn by the arrow class itself, so every way Canvas and Advanced Canvas redraw an
  // arrow (moves, styles, undo, the label) goes through the route: updatePath draws it, getCenter and getBBox follow
  // it. A setData that changes the points or the line shape is caught in onEdgeChanged: Advanced Canvas wraps setData
  // on each arrow with the function it had when created, so a prototype wrap of setData would be skipped.
  // All arrows share one prototype; it is wrapped once, by the first arrow seen, and given back on unload.
  patchEdgeProto(edge) {
    if (this.edgeProto || this.unloaded || !edge) return;
    const proto = Object.getPrototypeOf(edge);
    if (!proto || typeof proto.updatePath !== 'function' || typeof proto.getBBox !== 'function') return;
    this.edgeProto = proto;
    this.edgeRestorers = [];
    const off = () => this.unloaded;
    const wrap = (name, make) => {
      const original = proto[name];
      if (typeof original !== 'function') return;
      const own = Object.prototype.hasOwnProperty.call(proto, name);
      const patched = make(original);
      const wrapper = function (...args) { return off() ? original.apply(this, args) : patched.apply(this, args); };
      proto[name] = wrapper;
      this.edgeRestorers.push(() => {
        if (proto[name] !== wrapper) return; // wrapped again by someone else: ours stays and calls the original
        if (own) proto[name] = original; else delete proto[name];
      });
    };
    wrap('updatePath', (original) => function (...args) {
      const r = original.apply(this, args);
      drawBends(this);
      return r;
    });
    wrap('getCenter', (original) => function (...args) {
      return this.gbRoute && waypointsOf(this) ? { x: this.gbRoute.center.x, y: this.gbRoute.center.y } : original.apply(this, args);
    });
    wrap('getBBox', (original) => function (...args) { return boxWithWaypoints(original.apply(this, args), waypointsOf(this)); });
    this.refreshBentEdges();
  }

  unpatchEdgeProto() {
    for (const restore of (this.edgeRestorers || []).splice(0)) restore();
    this.edgeProto = null;
    this.refreshBentEdges();
  }

  // Redraws (and re-indexes) every arrow with bend points: after the prototype is wrapped or given back.
  refreshBentEdges() {
    for (const leaf of this.app.workspace.getLeavesOfType('canvas')) {
      const canvas = leaf.view && leaf.view.canvas;
      if (!canvas || !canvas.edges) continue;
      for (const edge of canvas.edges.values()) {
        if (!waypointsOf(edge) && !edge.gbRoute) continue;
        if (this.unloaded) { edge.gbRoute = null; edge.center = undefined; }
        canvas.markMoved(edge);
        canvas.markDirty(edge);
      }
    }
  }

  // The line thickness chosen in the popup (styles.css reads the variable).
  decorateEdge(edge) {
    const el = edge && edge.lineGroupEl;
    if (!el) return;
    const w = ((edge.unknownData || {}).styleAttributes || {}).gbWidth;
    if (Number.isFinite(w)) el.style.setProperty('--gb-edge-width', `${clampEdgeWidth(w)}px`);
    else el.style.removeProperty('--gb-edge-width');
  }

  // Advanced Canvas redraws an arrow with a pathfinding method after updatePath, over the route: draw it again.
  onEdgeChanged(canvas, edge) {
    this.patchEdgeProto(edge);
    this.decorateEdge(edge);
    const b = this.boards.get(canvas);
    if (b) { b.scheduleStyleCheck(); b.requestRender(); }
    // Canvas and Advanced Canvas redraw only a dirty or selected arrow; undo or a script changing the points or the
    // line shape of another one would leave the old route on screen.
    if ((waypointsOf(edge) || edge.gbRoute) && edge.gbDrawn !== bendKey(edge) && canvas && !canvas.dirty.has(edge)) {
      canvas.markMoved(edge); // its box (the edge index) changed with the points
      canvas.markDirty(edge);
      return;
    }
    if (!waypointsOf(edge) || !(edge.unknownData.styleAttributes || {}).pathfindingMethod) return;
    queueMicrotask(() => {
      if (this.unloaded || !waypointsOf(edge)) return;
      drawBends(edge);
      if (edge.labelElement) edge.labelElement.render();
    });
  }

  unpatchNodeZ() {
    for (const leaf of this.app.workspace.getLeavesOfType('canvas')) {
      const canvas = leaf.view && leaf.view.canvas;
      if (!canvas) continue;
      for (const node of canvas.nodes.values()) {
        const z = node.gbZ;
        if (!z) continue;
        delete node.gbZ;
        if (node.renderZIndex !== z.mine) continue;
        if (z.own) node.renderZIndex = z.prev; else delete node.renderZIndex;
        node.renderZIndex();
      }
    }
  }

  // The font is embedded (FONT_SUBSETS at the end of this file): plugins are installed as main.js, manifest.json
  // and styles.css only. Each window (the main one, popouts) and each card editor iframe has its own document
  // and gets its own faces (fontFacesFor).
  loadFont() {
    try {
      this.fontBuffers = FONT_SUBSETS.map((s) => ({ range: s.range, buffer: base64ToArrayBuffer(s.data) }));
    } catch (err) {
      console.error('Cult Canvas: font not loaded', err);
      return;
    }
    this.addFontTo(window);
    this.app.workspace.iterateAllLeaves((leaf) => {
      const win = leaf.view && leaf.view.containerEl && leaf.view.containerEl.win;
      if (win && win !== window) this.addFontTo(win);
    });
  }

  addFontTo(win) {
    const doc = win && win.document;
    if (this.unloaded || !this.fontBuffers || !doc || !win.FontFace || this.fontDocs.has(doc)) return;
    const faces = this.fontFacesFor(win);
    this.fontDocs.set(doc, faces);
    for (const face of faces) {
      doc.fonts.add(face);
      face.load().catch((err) => console.error('Cult Canvas: font not loaded', err));
    }
  }

  fontFacesFor(win) {
    return (this.fontBuffers || []).map((s) => new win.FontFace(FONT_FAMILY, s.buffer.slice(0), { weight: '300 800', style: 'normal', unicodeRange: s.range }));
  }

  // The editor iframe appears a moment after editing starts; wait for it, then style it.
  async styleEditor(node) {
    for (let i = 0; i < 40; i++) {
      const iframe = node.nodeEl && node.nodeEl.querySelector('iframe');
      if (iframe) this.holdPreview(iframe);
      const doc = iframe && iframe.contentDocument;
      if (doc && doc.body && doc.body.classList.contains('canvas-node-iframe-body')) {
        try { this.applyEditorStyle(node, iframe); } catch (err) { console.error('Cult Canvas: editor style', err); }
        this.revealEditor(iframe);
        return;
      }
      if (!node.isEditing && i > 4) return;
      await sleep(25);
    }
  }

  applyEditorStyle(node, iframe) {
    const doc = iframe.contentDocument;
    const win = iframe.contentWindow;
    const body = doc.body;
    if (this.fontBuffers && win && win.FontFace) {
      const has = Array.from(doc.fonts).some((f) => f.family.replace(/["']/g, '') === FONT_FAMILY);
      if (!has) {
        for (const face of this.fontFacesFor(win)) {
          doc.fonts.add(face);
          face.load().catch((err) => console.error('Cult Canvas: editor font', err));
        }
      }
    }
    // A colour from the card menu lives on the card element as --canvas-color.
    const themed = node.nodeEl.hasClass('is-themed');
    body.toggleClass('gb-themed', themed);
    const color = themed ? getComputedStyle(node.nodeEl).getPropertyValue('--canvas-color').trim() : '';
    if (color) body.style.setProperty('--canvas-color', color);
    else body.style.removeProperty('--canvas-color');
    const data = node.getData();
    applyNodeVars(body, data.styleAttributes || {}, data);
    doc.documentElement.addClass('gb-editor-root');
    body.addClass('gb-editor');
  }

  // Entering editing, Canvas hides the rendered text at once, but the new editor draws its text a frame or
  // two later, so the card blinked empty. The editing event comes before that frame is drawn: keep the text
  // shown on top of the editor (styles.css .gb-preview-hold) until revealEditor marks the editor ready, or
  // for 0.8 s at most.
  holdPreview(iframe) {
    if (iframe.gbHeld || iframe.hasClass('gb-ready')) return;
    iframe.gbHeld = true;
    const content = iframe.closest('.canvas-node-content');
    const preview = content && Array.from(content.children).find((el) =>
      el.hasClass('markdown-embed-content') && el.style.display === 'none' && !el.contains(iframe));
    if (!preview) return;
    preview.gbHeldFor = iframe;
    preview.addClass('gb-preview-hold');
    preview.show();
    iframe.gbRelease = () => {
      if (preview.gbHeldFor !== iframe) return;
      preview.gbHeldFor = null;
      preview.removeClass('gb-preview-hold');
      // When editing has ended meanwhile, Canvas has removed the editor and shows the text itself.
      if (iframe.isConnected) preview.hide();
    };
    window.setTimeout(iframe.gbRelease, 800);
  }

  // A new editor stays invisible under the rendered text (holdPreview) until it has drawn its text in the
  // board font and the caret has settled: Canvas focuses the editor (caret at the start) and moves the caret
  // to the clicked spot a moment later. Then .gb-ready swaps them in one frame, so the card never blinks.
  revealEditor(iframe) {
    if (iframe.hasClass('gb-ready') || iframe.gbRevealing) return;
    iframe.gbRevealing = true;
    let frames = 0;
    let caret = null;
    const step = () => {
      if (!iframe.isConnected) return;
      const doc = iframe.contentDocument;
      const sel = doc && doc.getSelection();
      const now = sel && sel.anchorNode && doc.body.contains(sel.anchorNode) ? [sel.anchorNode, sel.anchorOffset] : null;
      const settled = !!now && !!caret && now[0] === caret[0] && now[1] === caret[1];
      caret = now;
      const ready = settled && doc.body.hasClass('gb-editor') && !!doc.querySelector('.cm-content .cm-line')
        && (!this.fontBuffers || Array.from(doc.fonts).some((f) => f.family.replace(/["']/g, '') === FONT_FAMILY && f.status === 'loaded'));
      if (ready || ++frames > 40) {
        iframe.addClass('gb-ready');
        if (iframe.gbRelease) iframe.gbRelease();
        return;
      }
      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  // One-time default: grid snapping off, so cards move freely. After that the button decides.
  applyGridDefault(canvas) {
    if (this.settings.gridDefaultApplied || typeof canvas.toggleGridSnapping !== 'function') return;
    this.settings.gridDefaultApplied = true;
    canvas.toggleGridSnapping(false);
    void this.saveSettings();
  }

  setGridSnap(on) {
    const b = this.boards.values().next().value;
    if (!b || typeof b.canvas.toggleGridSnapping !== 'function') return;
    b.canvas.toggleGridSnapping(!!on);
    // Canvases share the option object; set it on every open one in case a view keeps its own copy.
    this.forEachBoard((x) => { if (x.canvas.options) x.canvas.options.snapToGrid = !!on; x.syncUi(); });
  }

  attachAll() {
    const live = new Set();
    for (const leaf of this.app.workspace.getLeavesOfType('canvas')) {
      const view = leaf.view;
      const canvas = view && view.canvas;
      if (!canvas || !canvas.wrapperEl) continue;
      live.add(canvas);
      this.applyGridDefault(canvas);
      if (!this.boards.has(canvas)) {
        this.boards.set(canvas, new Board(this, view));
        for (const n of canvas.nodes.values()) n.renderZIndex(); // the selected card goes back to its layer
      }
    }
    for (const [canvas, board] of this.boards) {
      if (!live.has(canvas)) { board.destroy(); this.boards.delete(canvas); }
    }
  }

  forEachBoard(fn) { for (const b of this.boards.values()) fn(b); }

  syncInteractionLayer(canvas) {
    const layer = canvas && canvas.nodeInteractionLayer;
    const el = layer && layer.interactionEl;
    if (!el) return;
    const stroke = !!strokeOf(layer.target);
    el.toggleClass('gb-target-stroke', stroke);
    el.toggleClass('gb-target-unselected', stroke && !canvas.selection.has(layer.target));
  }

  dirtyBoard(canvas) { const b = this.boards.get(canvas); if (b) b.requestRender(); }

  activeBoard() {
    const view = this.app.workspace.getActiveViewOfType(obsidian.View);
    return view && view.canvas ? this.boards.get(view.canvas) || null : null;
  }

  setSpace(down) { for (const b of this.boards.values()) b.canvas.wrapperEl.toggleClass('gb-space', down); }

  onKeyDown(e) {
    if (e.code === 'Space' && !isEditableTarget(e.target)) this.setSpace(true);
    const b = this.activeBoard();
    if (!b || isEditableTarget(e.target) || isEditableTarget(activeDocument.activeElement)) return;
    if (this.onSelectionHotkey(b, e)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Escape') {
      if (b.popOpen) { b.closeDropdown(); e.preventDefault(); e.stopPropagation(); return; }
      if (b.bend) { b.cancelBend(); e.preventDefault(); e.stopPropagation(); return; }
      if (b.gesture || b.tool !== 'select') { b.setTool('select'); e.preventDefault(); e.stopPropagation(); }
      return;
    }
    if (e.shiftKey || e.repeat) return;
    const id = toolByCode(e.code);
    if (!id) return;
    e.preventDefault();
    e.stopPropagation();
    b.setTool(id);
  }

  // Holst hotkeys on the selection: ] and [ to the front and back, Ctrl+] and Ctrl+[ one step, Ctrl+D a copy.
  // Codes, not letters, so they work in any keyboard layout. False when there is nothing to do.
  onSelectionHotkey(b, e) {
    const mod = IS_MAC ? e.metaKey : e.ctrlKey;
    const other = IS_MAC ? e.ctrlKey : e.metaKey;
    if (e.altKey || e.shiftKey || other) return false;
    if (e.code === 'BracketRight') return b.moveLayer(mod ? 'forward' : 'front');
    if (e.code === 'BracketLeft') return b.moveLayer(mod ? 'backward' : 'back');
    if (e.code === 'KeyD' && mod) return e.repeat ? b.canvas.selection.size > 0 : b.duplicateSelection();
    return false;
  }

  // Draws or removes the marker line of a stroke node (a text card with gbStroke, see README.md).
  decorate(node) {
    const el = node && node.nodeEl;
    if (!el) return;
    this.patchNodeZ(node);
    applyNodeVars(el, styleOf(node), node.getData());
    const s = strokeOf(node);
    const container = el.querySelector(':scope > .canvas-node-container');
    if (!s || !container) {
      if (node.gbStrokeSvg) { node.gbStrokeSvg.remove(); node.gbStrokeSvg = null; node.gbStrokeRef = null; }
      if (!s) el.removeClass('gb-stroke');
      return;
    }
    if (node.gbStrokeRef === s && node.gbStrokeSvg && node.gbStrokeSvg.parentElement === container) return;
    el.addClass('gb-stroke');
    if (node.gbStrokeSvg) node.gbStrokeSvg.remove();
    const svg = container.createSvg('svg', { cls: 'gb-stroke-svg', attr: { viewBox: `0 0 ${s.w} ${s.h}`, preserveAspectRatio: 'none' } });
    svg.createSvg('path', { cls: 'gb-hit', attr: { d: centerlinePath(s.points), 'stroke-width': Math.max(s.size + 10, 14) } });
    svg.createSvg('path', { cls: 'gb-ink', attr: { d: strokeOutlinePath(s.points, s.size) } });
    node.gbStrokeSvg = svg;
    node.gbStrokeRef = s;
  }
}

module.exports = CultCanvasPlugin;
module.exports.logic = logic;

function base64ToArrayBuffer(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// Shantell Sans, wght 300-800, woff2 subsets from Google Fonts. SIL Open Font License 1.1, see the header.
// Written by scripts/embed-font.mjs.
// FONT_SUBSETS_START
const FONT_SUBSETS = [
  { name: 'cyrillic', range: 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116', data: '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' },
  { name: 'latin-ext', range: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF', data: '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' },
  { name: 'latin', range: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD', data: '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' },
];
// FONT_SUBSETS_END
