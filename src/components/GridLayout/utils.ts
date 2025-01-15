// @flow
import { deepEqual } from 'fast-equals';
import React from 'react';
import type { ReactElement } from 'react';
import type {
  MouseTouchEvent,
  PositionParams,
  ControlPosition,
  PositionOffsetControlPosition,
  Layout,
  LayoutItem,
  ReactChildren,
  Position,
  CompactType,
  ResizeHandleAxis,
  Size,
} from './type';
const isProduction = process.env.NODE_ENV === 'production';
const DEBUG = false;
const prefixes = ['Moz', 'Webkit', 'O', 'ms'];

function kebabToTitleCase(str: string): string {
  let out = '';
  let shouldCapitalize = true;
  for (let i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}
function browserPrefix(prop: string = 'transform'): string {
  // Ensure we're running in an environment where there is actually a global
  // `window` obj
  if (typeof window === 'undefined') return '';

  // If we're in a pseudo-browser server-side environment, this access
  // path may not exist, so bail out if it doesn't.
  const style = window.document?.documentElement?.style;
  if (!style) return '';

  if (prop in style) return '';

  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}
function browserPrefixToKey(prop: string, prefix: string): string {
  return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
}

let matchesSelectorFunc = '';
// @flow
// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
// 在数组或 TouchList 中查找满足回调函数条件的元素并返回该元素
function findInArray(array: Array<any> | TouchList, callback: Function): any {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

// 判断输入是否为函数
function isFunction(func) {
  // $FlowIgnore[method-unbinding]
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

// 判断输入是否为数字
function isNum(num) {
  return typeof num === 'number' && !isNaN(num);
}

// 将字符串转换为整数
function int(a: string): number {
  return parseInt(a, 10);
}

// 检查传入的属性是否被设置，如果设置则抛出错误，提示不应该设置该属性，应该在子元素上设置
export function dontSetMe(props: Object, propName: string, componentName: string): Error {
  if (props[propName]) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`,
    );
  }
}

// 检查元素是否匹配选择器
function matchesSelector(el: Node, selector: string): boolean {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = findInArray(
      [
        'matches',
        'webkitMatchesSelector',
        'mozMatchesSelector',
        'msMatchesSelector',
        'oMatchesSelector',
      ],
      function (method) {
        // $FlowIgnore: 不认为元素可索引
        return isFunction(el[method]);
      },
    );
  }

  // 可能未完全找到（不是元素？），在这种情况下，退出
  // $FlowIgnore: 不认为元素可索引
  if (!isFunction(el[matchesSelectorFunc])) return false;

  // $FlowIgnore: 不认为元素可索引
  return el[matchesSelectorFunc](selector);
}

// 从元素向上遍历树结构，尝试匹配选择器
export function matchesSelectorAndParentsTo(el: Node, selector: string, baseNode: Node): boolean {
  let node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    // $FlowIgnore[incompatible-type]
    node = node.parentNode;
  } while (node);

  return false;
}

// 为元素添加事件监听器
export function addEvent(el: any, event: string, handler: Function, inputOptions?: Object): void {
  if (!el) return;
  const options = { capture: true, ...inputOptions };
  // $FlowIgnore[method-unbinding]
  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: 不认为元素可索引
    el['on' + event] = handler;
  }
}

// 移除元素的事件监听器
export function removeEvent(
  el: any,
  event: string,
  handler: Function,
  inputOptions?: Object,
): void {
  if (!el) return;
  const options = { capture: true, ...inputOptions };
  // $FlowIgnore[method-unbinding]
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: 不认为元素可索引
    el['on' + event] = null;
  }
}

// 计算元素的外部高度（包含边框）
function outerHeight(node: HTMLElement): number {
  // 这里故意排除了计算中的边距，因为我们使用的 offsetTop 包含了边距。请参考 getBoundPosition 函数
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
}

// 计算元素的外部宽度（包含边框）
function outerWidth(node: HTMLElement): number {
  // 这里故意排除了计算中的边距，因为我们使用的 offsetLeft 包含了边距。请参考 getBoundPosition 函数
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}

// 计算元素的内部高度（不包含内边距）
function innerHeight(node: HTMLElement): number {
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

// 计算元素的内部宽度（不包含内边距）
function innerWidth(node: HTMLElement): number {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

interface EventWithOffset {
  clientX: number;
  clientY: number;
}

// 从偏移父元素获取偏移的 x 和 y 坐标
function offsetXYFromParent(
  evt: EventWithOffset,
  offsetParent: HTMLElement,
  scale: number,
): ControlPosition {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();

  const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;

  return { x, y };
}

// 从触摸事件中获取指定标识符的触摸点
function getTouch(e: MouseTouchEvent, identifier: number): { clientX: number; clientY: number } {
  return (
    (e.targetTouches && findInArray(e.targetTouches, (t) => identifier === t.identifier)) ||
    (e.changedTouches && findInArray(e.changedTouches, (t) => identifier === t.identifier))
  );
}

// 获取触摸事件的标识符
export function getTouchIdentifier(e: MouseTouchEvent): number {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

// 用户选择样式的处理：
// 防止拖动时出现蓝色高亮的有用操作

// 注意我们传递的是 `document`，因为可能在 iframe 中
export function addUserSelectStyles(doc?: Document) {
  if (!doc) return;
  let styleEl: any = doc.getElementById('react-draggable-style-el');
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML =
      '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}

// 移除用户选择样式
export function removeUserSelectStyles(doc: any) {
  if (!doc) return;
  try {
    if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
    // $FlowIgnore: IE
    if (doc.selection) {
      // $FlowIgnore: IE
      doc.selection.empty();
    } else {
      // 移除滚动导致的选择，除非是聚焦的输入框
      // （我们使用 doc.defaultView 以防在 iframe 中）
      const selection = (doc.defaultView || window).getSelection();
      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (e) {
    // 可能是 IE 浏览器
  }
}

// 为元素添加类名
function addClassName(el: HTMLElement, className: string) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
      el.className += ` ${className}`;
    }
  }
}

// 从元素移除类名
function removeClassName(el: HTMLElement, className: string) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'), '');
  }
}

// 将坐标对齐到网格上
export function snapToGrid(
  grid: [number, number],
  pendingX: number,
  pendingY: number,
): [number, number] {
  const x = Math.round(pendingX / grid[0]) * grid[0];
  const y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}
// 从事件中获取控制位置
export function getControlPosition(
  e: MouseTouchEvent,
  touchIdentifier?: number,
  draggableCore?: any,
): ControlPosition {
  const touchObj = typeof touchIdentifier === 'number' ? getTouch(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // 不是正确的触摸点
  const node = findDOMNode(draggableCore);
  // 用户可以根据需要提供一个偏移父元素
  const offsetParent =
    draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return offsetXYFromParent(touchObj || e, offsetParent, draggableCore.props.scale);
}

// 创建由 <DraggableCore> 事件暴露的数据对象
export function createCoreData(draggable: any, x: number, y: number): any {
  const isStart = !isNum(draggable.lastX);
  const node = findDOMNode(draggable);

  if (isStart) {
    // 如果是首次移动，将 x 和 y 作为最后的坐标
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y,
    };
  } else {
    // 否则计算正确的值
    return {
      node,
      deltaX: x - draggable.lastX,
      deltaY: y - draggable.lastY,
      lastX: draggable.lastX,
      lastY: draggable.lastY,
      x,
      y,
    };
  }
}

// 查找元素的 DOM 节点
function findDOMNode(draggable: any | any): HTMLElement {
  const node = draggable.findDOMNode();
  if (!node) {
    throw new Error('<DraggableCore>: 事件期间已卸载！');
  }
  // $FlowIgnore 由于测试原因无法断言为 HTMLElement，待修复
  return node;
}

// 类似于 React.addons.cloneWithProps，合并样式和类名
export function cloneElement(element, props) {
  if (props.style && element.props.style) {
    props.style = { ...element.props.style, ...props.style };
  }
  if (props.className && element.props.className) {
    props.className = `${element.props.className} ${props.className}`;
  }
  return React.cloneElement(element, props);
}

/**
 * 返回布局的底部坐标
 *
 * @param {Array} layout 布局数组
 * @return {Number} 底部坐标
 */
export function bottom(layout: Layout): number {
  let max = 0,
    bottomY;
  for (let i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) max = bottomY;
  }
  return max;
}

// 复制布局数组
export function cloneLayout(layout: Layout): Layout {
  const newLayout = Array(layout.length);
  for (let i = 0, len = layout.length; i < len; i++) {
    newLayout[i] = cloneLayoutItem(layout[i]);
  }
  return newLayout;
}
// 修改布局中的一个布局项。返回一个新的布局，不修改原布局。保留所有其他未修改的布局项。
function modifyLayout(layout: Layout, layoutItem: LayoutItem): Layout {
  const newLayout = Array(layout.length);
  for (let i = 0, len = layout.length; i < len; i++) {
    if (layoutItem.i === layout[i].i) {
      newLayout[i] = layoutItem;
    } else {
      newLayout[i] = layout[i];
    }
  }
  return newLayout;
}

// 用于修改布局项的函数。
// 进行防御性克隆以确保布局不会被修改。
export function withLayoutItem(layout: Layout, itemKey: string, cb: any): [Layout, LayoutItem] {
  let item = getLayoutItem(layout, itemKey);
  if (!item) return [layout, null];
  item = cb(cloneLayoutItem(item)); // 先进行防御性克隆然后修改
  // 如果我们已经知道索引可以更快地完成此操作，待修复
  layout = modifyLayout(layout, item);
  return [layout, item];
}

// 快速克隆的路径，因为这是单态的
export function cloneLayoutItem(layoutItem: LayoutItem): LayoutItem {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // 这些可以为 null/undefined
    isDraggable: layoutItem.isDraggable,
    isResiz: layoutItem.isResiz,
    resizeHandles: layoutItem.resizeHandles,
    isBounded: layoutItem.isBounded,
  };
}

/**
 * 比较 React 的 `children` 有点困难。这是一种比较它们的好方法。
 * 这将捕获键、顺序和长度的差异。
 */
export function childrenEqual(a: ReactChildren, b: ReactChildren): boolean {
  return (
    deepEqual(
      React.Children.map(a, (c) => c?.key),
      React.Children.map(b, (c) => c?.key),
    ) &&
    deepEqual(
      React.Children.map(a, (c) => c?.props['data-grid']),
      React.Children.map(b, (c) => c?.props['data-grid']),
    )
  );
}

/**
 * 请参考 `fastRGLPropsEqual.js`。
 * 我们希望这个函数尽可能快地运行（因为它经常被调用），并且对我们添加的新属性具有适应性。因此，我们不使用不太适合比较属性的 lodash.isEqual，而是使用这个专门的函数，并结合预编译（preval）生成针对我们的属性的最快的比较函数。
 */
// 与上述类似，但更简单。
export function fastPositionEqual(a: Position, b: Position): boolean {
  return a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height;
}

/**
 * 给定两个布局项，检查它们是否碰撞。
 */
function collides(l1: LayoutItem, l2: LayoutItem): boolean {
  if (l1.i === l2.i) return false; // 是同一个元素
  if (l1.x + l1.w <= l2.x) return false; // l1 在 l2 的左边
  if (l1.x >= l2.x + l2.w) return false; // l1 在 l2 的右边
  if (l1.y + l1.h <= l2.y) return false; // l1 在 l2 的上方
  if (l1.y >= l2.y + l2.h) return false; // l1 在 l2 的下方
  return true; // 盒子重叠
}

/**
 * 给定一个布局，对其进行压缩。这涉及到沿着每个 y 坐标向下移动，移除项之间的间隙。
 *
 * 不修改布局项（进行克隆）。创建一个新的布局数组。
 *
 * @param  {Array} layout 布局。
 * @param  {Boolean} verticalCompact 是否垂直压缩布局。
 * @param  {Boolean} allowOverlap 当为 `true` 时，允许网格项重叠。
 * @return {Array} 压缩后的布局。
 */
export function compact(
  layout: Layout,
  compactType: CompactType,
  cols: number,
  allowOverlap?: boolean,
): Layout {
  // 静态元素立即放入比较数组中，以便其他元素可以围绕它们流动。
  const compareWith = getStatics(layout);
  // 我们按行和列遍历项。
  const sorted = sortLayoutItems(layout, compactType);
  // 用于存储新的项。
  const out = Array(layout.length);

  for (let i = 0, len = sorted.length; i < len; i++) {
    let l = cloneLayoutItem(sorted[i]);

    // 不移动静态元素
    if (!l.static) {
      l = compactItem(compareWith, l, compactType, cols, sorted, allowOverlap);

      // 添加到比较数组中。我们只与在此元素之前的元素碰撞。
      // 静态元素已经在这个数组中。
      compareWith.push(l);
    }

    // 添加到输出数组中，以确保它们仍按正确的顺序输出。
    out[layout.indexOf(sorted[i])] = l;

    // 清除移动标志（如果存在）。
    l.moved = false;
  }

  return out;
}

const heightWidth = { x: 'w', y: 'h' };
/**
 * 在将项向下移动之前，它将检查移动是否会导致碰撞，并先将那些项向下移动。
 */
function resolveCompactionCollision(
  layout: Layout,
  item: LayoutItem,
  moveToCoord: number,
  axis: 'x' | 'y',
) {
  const sizeProp = heightWidth[axis];
  item[axis] += 1;
  const itemIndex = layout
    .map((layoutItem) => {
      return layoutItem.i;
    })
    .indexOf(item.i);

  // 遍历与之碰撞的每个项。
  for (let i = itemIndex + 1; i < layout.length; i++) {
    const otherItem = layout[i];
    // 忽略静态项
    if (otherItem.static) continue;

    // 优化：如果我们知道已经超过了这个元素，可以提前中断
    // 我们可以这样做，因为布局是已排序的
    if (otherItem.y > item.y + item.h) break;

    if (collides(item, otherItem)) {
      resolveCompactionCollision(layout, otherItem, moveToCoord + item[sizeProp], axis);
    }
  }

  item[axis] = moveToCoord;
}

/**
 * 压缩布局中的一个项。
 *
 * 修改项。
 *
 */
function compactItem(
  compareWith: Layout,
  l: LayoutItem,
  compactType: CompactType,
  cols: number,
  fullLayout: Layout,
  allowOverlap?: boolean,
): LayoutItem {
  const compactV = compactType === 'vertical';
  const compactH = compactType === 'horizontal';
  if (compactV) {
    // 底部 'y' 的可能位置是布局的底部。
    // 这允许你进行一些不错的操作，如指定 {y: Infinity}
    // 这里需要排序布局，以便获得正确的底部 `y` 值。
    l.y = Math.min(bottom(compareWith), l.y);
    // 将元素向上移动，直到不发生碰撞。
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  } else if (compactH) {
    // 将元素向左移动，直到不发生碰撞。
    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x--;
    }
  }

  // 将其向下移动，如果发生碰撞则继续向下移动。
  let collides;
  // 检查 compactType 是否为 null 以避免在允许重叠时破坏布局。
  while (
    (collides = getFirstCollision(compareWith, l)) &&
    !(compactType === null && allowOverlap)
  ) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.x + collides.w, 'x');
    } else {
      resolveCompactionCollision(fullLayout, l, collides.y + collides.h, 'y');
    }
    // 由于水平方向不能无限制扩展，如果我们溢出了，将其向下移动并再次尝试。
    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w;
      l.y++;
      // 也将元素尽可能向左移动
      while (l.x > 0 && !getFirstCollision(compareWith, l)) {
        l.x--;
      }
    }
  }

  // 确保没有负的位置
  l.y = Math.max(l.y, 0);
  l.x = Math.max(l.x, 0);

  return l;
}

/**
 * 给定一个布局，确保所有元素都在其边界内。
 *
 * 修改布局项。
 *
 * @param  {Array} layout 布局数组。
 * @param  {Number} bounds 列数。
 */
function correctBounds(layout: Layout, bounds: { cols: number }): Layout {
  const collidesWith = getStatics(layout);
  for (let i = 0, len = layout.length; i < len; i++) {
    const l = layout[i];
    // 向右溢出
    if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w;
    // 向左溢出
    if (l.x < 0) {
      l.x = 0;
      l.w = bounds.cols;
    }
    if (!l.static) collidesWith.push(l);
    else {
      // 如果这是静态的并且与其他静态元素碰撞，我们必须将其向下移动。
      // 我们必须做一些比仅仅让它们重叠更好的事情。
      while (getFirstCollision(collidesWith, l)) {
        l.y++;
      }
    }
  }
  return layout;
}

/**
 * 通过 ID 获取一个布局项。以便我们在必要时可以覆盖。
 *
 * @param  {Array}  layout 布局数组。
 * @param  {String} id     ID
 * @return {LayoutItem}    对应 ID 的项。
 */
export function getLayoutItem(layout: Layout, id: string): LayoutItem | undefined {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === id) return layout[i];
  }
}

/**
 * 返回此布局与之碰撞的第一个项。
 * 看起来我们从哪个方向处理这个问题似乎并不重要，尽管也许这样做是不对的。
 *
 * @param  {Object} layoutItem 布局项。
 * @return {Object|undefined}  一个碰撞的布局项，或未定义。
 */
function getFirstCollision(layout: Layout, layoutItem: LayoutItem): LayoutItem | undefined {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) return layout[i];
  }
}

export function getAllCollisions(layout: Layout, layoutItem: LayoutItem): Array<LayoutItem> {
  return layout.filter((l) => collides(l, layoutItem));
}

/**
 * 获取所有静态元素。
 * @param  {Array} layout 布局对象数组。
 * @return {Array}  静态布局项的数组。
 */
function getStatics(layout: Layout): Array<LayoutItem> {
  return layout.filter((l) => l.static);
}

/**
 * 移动一个元素。负责对其他元素进行级联移动。
 *
 * 修改布局项。
 *
 * @param  {Array}      layout 要修改的完整布局。
 * @param  {LayoutItem} l 要移动的元素。
 * @param  {Number}     [x]  网格单元中的 X 位置。
 * @param  {Number}     [y]  网格单元中的 Y 位置。
 */
export function moveElement(
  layout: Layout,
  l?: LayoutItem,
  x?: number,
  y?: number,
  isUserAction?: boolean,
  preventCollision?: boolean,
  compactType?: CompactType,
  cols?: number,
  allowOverlap?: boolean,
): Layout {
  // 如果这是静态的且未明确启用可拖动性，则无法移动，因此可以立即短路。
  if (l.static && l.isDraggable !== true) return layout;

  // 若没有移动
  if (l.y === y && l.x === x) return layout;

  log(`将元素 ${l.i} 从 [${l.x},${l.y}] 移动到 [${String(x)},${String(y)}]`);
  const oldX = l.x;
  const oldY = l.y;

  // 这比扩展对象要快得多
  if (typeof x === 'number') l.x = x;
  if (typeof y === 'number') l.y = y;
  l.moved = true;

  // 如果它与任何元素碰撞，移动它。
  // 进行此比较时，我们必须对要比较的项进行排序，以确保在发生多次碰撞时，我们能找到最近的碰撞。
  let sorted: any = sortLayoutItems(layout, compactType);
  const movingUp =
    compactType === 'vertical' && typeof y === 'number'
      ? oldY >= y
      : compactType === 'horizontal' && typeof x === 'number'
      ? oldX >= x
      : false;
  // $FlowIgnore 允许修改只读数组，因为它最近已被克隆
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, l);
  const hasCollisions = collisions.length > 0;

  // 可能存在碰撞。如果关闭碰撞或允许重叠，我们可以短路。
  if (hasCollisions && allowOverlap) {
    // 很简单，我们不需要解决碰撞。但我们确实修改了布局，所以在返回时克隆它。
    return cloneLayout(layout);
  } else if (hasCollisions && preventCollision) {
    // 如果我们防止碰撞但不允许重叠，我们需要将此元素的位置恢复到原来的位置，而不是用户期望的位置。
    log(`防止元素 ${l.i} 的碰撞，恢复。`);
    l.x = oldX;
    l.y = oldY;
    l.moved = false;
    return layout; // 未改变，所以不克隆
  }

  // 移动与该元素碰撞的每个元素。
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i];
    log(
      `解决元素 ${l.i} 在 [${l.x},${l.y}] 和元素 ${collision.i} 在 [${collision.x},${collision.y}] 之间的碰撞`,
    );

    // 短路以避免无限循环
    if (collision.moved) continue;

    // 不移动静态项 - 我们必须将此元素移开
    if (collision.static) {
      layout = moveElementAwayFromCollision(layout, collision, l, isUserAction, compactType, cols);
    } else {
      layout = moveElementAwayFromCollision(layout, l, collision, isUserAction, compactType, cols);
    }
  }

  return layout;
}

/**
 * 这里是需要发挥神奇作用的地方 - 给定一个碰撞，将一个元素从碰撞处移开。
 * 如果上方有空间，我们尝试将其向上移动，否则将其向下移动。
 *
 * @param  {Array} layout 要修改的完整布局。
 * @param  {LayoutItem} collidesWith 与之碰撞的布局项。
 * @param  {LayoutItem} itemToMove 要移动的布局项。
 */
function moveElementAwayFromCollision(
  layout: Layout,
  collidesWith: LayoutItem,
  itemToMove: LayoutItem,
  isUserAction?: boolean,
  compactType?: CompactType,
  cols?: number,
): Layout {
  const compactH = compactType === 'horizontal';
  // 如果不是水平设置，则垂直压缩
  const compactV = compactType === 'vertical';
  const preventCollision = collidesWith.static; // 我们已经发生碰撞（对于静态项不适用）

  // 如果在碰撞上方有足够的空间放置此元素，将其移到那里。
  // 我们只在主要碰撞上这样做，因为这可能会在级联中变得奇怪并导致不想要的交换行为。
  if (isUserAction) {
    // 重置 isUserAction 标志，因为我们不再处于主要碰撞中。
    isUserAction = false;

    // 创建一个模拟项，以便我们不在此处修改项，仅在 moveElement 中修改。
    const fakeItem: LayoutItem = {
      x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
      y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: '-1',
    };

    const firstCollision = getFirstCollision(layout, fakeItem);
    const collisionNorth = firstCollision && firstCollision.y + firstCollision.h > collidesWith.y;
    const collisionWest = firstCollision && collidesWith.x + collidesWith.w > firstCollision.x;

    // 没有碰撞？如果是这样，我们可以移到那里；否则，我们将像正常情况一样向下移动。
    if (!firstCollision) {
      log(`对元素 ${itemToMove.i} 进行反向碰撞，向上移动到 [${fakeItem.x},${fakeItem.y}]。`);
      return moveElement(
        layout,
        itemToMove,
        compactH ? fakeItem.x : undefined,
        compactV ? fakeItem.y : undefined,
        isUserAction,
        preventCollision,
        compactType,
        cols,
        false,
      );
    } else if (collisionNorth && compactV) {
      return moveElement(
        layout,
        itemToMove,
        undefined,
        collidesWith.y + 1,
        isUserAction,
        preventCollision,
        compactType,
        cols,
        false,
      );
    } else if (collisionNorth && compactType == null) {
      collidesWith.y = itemToMove.y;
      itemToMove.y = itemToMove.y + itemToMove.h;

      return layout;
    } else if (collisionWest && compactH) {
      return moveElement(
        layout,
        collidesWith,
        itemToMove.x,
        undefined,
        isUserAction,
        preventCollision,
        compactType,
        cols,
        false,
      );
    }
  }
  const newX = compactH ? itemToMove.x + 1 : undefined;
  const newY = compactV ? itemToMove.y + 1 : undefined;

  if (newX == null && newY == null) {
    return layout;
  }
  return moveElement(
    layout,
    itemToMove,
    compactH ? itemToMove.x + 1 : undefined,
    compactV ? itemToMove.y + 1 : undefined,
    isUserAction,
    preventCollision,
    compactType,
    cols,
    false,
  );
}
/**
 * 辅助函数，将一个数字转换为百分比字符串。
 *
 * @param  {Number} num 任意数字
 * @return {String} 该数字的百分比表示。
 */
export function perc(num: number): string {
  return num * 100 + '%';
}

/**
 * 用于约束 GridItem 尺寸的辅助函数
 */
const constrainWidth = (
  left: number,
  currentWidth: number,
  newWidth: number,
  containerWidth: number,
) => {
  // 如果新的左偏移加上新宽度超过容器宽度，则返回当前宽度，否则返回新宽度
  return left + newWidth > containerWidth ? currentWidth : newWidth;
};

const constrainHeight = (top: number, currentHeight: number, newHeight: number) => {
  // 如果顶部位置小于 0，则返回当前高度，否则返回新高度
  return top < 0 ? currentHeight : newHeight;
};

const constrainLeft = (left: number) => Math.max(0, left);

const constrainTop = (top: number) => Math.max(0, top);

const resizeNorth = (currentSize, { left, height, width }, _containerWidth) => {
  // 计算新的顶部位置，通过当前顶部位置减去高度的变化量
  const top = currentSize.top - (height - currentSize.height);

  return {
    left,
    width,
    height: constrainHeight(top, currentSize.height, height),
    top: constrainTop(top),
  };
};

const resizeEast = (currentSize, { top, left, height, width }, containerWidth) => ({
  top,
  height,
  width: constrainWidth(currentSize.left, currentSize.width, width, containerWidth),
  left: constrainLeft(left),
});

const resizeWest = (currentSize, { top, height, width }, containerWidth) => {
  // 计算新的左偏移，通过当前左偏移减去宽度的变化量
  const left = currentSize.left - (width - currentSize.width);

  return {
    height,
    width:
      left < 0
        ? currentSize.width
        : constrainWidth(currentSize.left, currentSize.width, width, containerWidth),
    top: constrainTop(top),
    left: constrainLeft(left),
  };
};

const resizeSouth = (currentSize, { top, left, height, width }, containerWidth) => ({
  width,
  left,
  height: constrainHeight(top, currentSize.height, height),
  top: constrainTop(top),
});
const resizeNorthEast = (...args: [any, any, any]) =>
  resizeNorth(args[0], resizeEast(...args), args[2]);
const resizeNorthWest = (...args: [any, any, any]) =>
  resizeNorth(args[0], resizeWest(...args), args[2]);
const resizeSouthEast = (...args: [any, any, any]) =>
  resizeSouth(args[0], resizeEast(...args), args[2]);
const resizeSouthWest = (...args: [any, any, any]) =>
  resizeSouth(args[0], resizeWest(...args), args[2]);

const ordinalResizeHandlerMap = {
  n: resizeNorth,
  ne: resizeNorthEast,
  e: resizeEast,
  se: resizeSouthEast,
  s: resizeSouth,
  sw: resizeSouthWest,
  w: resizeWest,
  nw: resizeNorthWest,
};

/**
 * 当调整项目大小时，用于限制宽度和位置的辅助函数。
 */
export function resizeItemInDirection(
  direction: ResizeHandleAxis,
  currentSize: Position,
  newSize: Position,
  containerWidth: number,
): Position {
  const ordinalHandler = ordinalResizeHandlerMap[direction];
  // 鉴于类型，不应该出现这种情况；即便如此，也不要导致严重错误
  if (!ordinalHandler) return newSize;
  return ordinalHandler(currentSize, { ...currentSize, ...newSize }, containerWidth);
}

export function setTransform({ top, left, width, height }: Position): Object {
  // 将无单位的项替换为 px 单位
  const translate = `translate(${left}px,${top}px)`;
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: `${width}px`,
    height: `${height}px`,
    position: 'absolute',
  };
}

export function setTopLeft({ top, left, width, height }: Position): Object {
  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    position: 'absolute',
  };
}

/**
 * 获取从左上角开始向右向下排序的布局项。
 *
 * @return {Array} 布局对象数组。
 * @return {Array}  首先排序的静态项布局。
 */
function sortLayoutItems(layout: Layout, compactType: CompactType): Layout {
  if (compactType === 'horizontal') return sortLayoutItemsByColRow(layout);
  if (compactType === 'vertical') return sortLayoutItemsByRowCol(layout);
  else return layout;
}

/**
 * 按行升序和列升序对布局项进行排序。
 *
 * 不修改布局。
 */
function sortLayoutItemsByRowCol(layout: Layout): Layout {
  // 切片克隆数组，因为排序会修改原数组
  return layout.slice(0).sort(function (a, b) {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      // 没有这行，IE 与 Chrome/FF 的排序结果会不同
      return 0;
    }
    return -1;
  });
}

/**
 * 按列升序然后行升序对布局项进行排序。
 *
 * 不修改布局。
 */
function sortLayoutItemsByColRow(layout: Layout): Layout {
  return layout.slice(0).sort(function (a, b) {
    if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
      return 1;
    }
    return -1;
  });
}

/**
 * 使用 initialLayout 和 children 作为模板生成布局。
 * 缺少的条目将被添加，多余的将被截断。
 *
 * 不修改 initialLayout。
 *
 * @param  {Array}  initialLayout 通过 props 传入的布局。
 * @param  {String} breakpoint 当前响应式断点。
 * @param  {?String} compact 压缩选项。
 * @return {Array}  工作布局。
 */
export function synchronizeLayoutWithChildren(
  initialLayout: Layout,
  children: ReactChildren,
  cols: number,
  compactType: CompactType,
  allowOverlap?: boolean,
): Layout {
  initialLayout = initialLayout || [];

  // 为每个子元素生成一个布局项。
  const layout: LayoutItem[] = [];
  React.Children.forEach(children, (child: ReactElement<any>) => {
    // 子元素可能不存在
    if (child?.key == null) return;

    const exists = getLayoutItem(initialLayout, String(child.key));
    const g = child.props['data-grid'];
    // 如果初始布局中已经存在布局项，不要覆盖它。
    // 如果它有 `data-grid` 属性，优先使用该属性而不是布局中的内容。
    if (exists && g == null) {
      layout.push(cloneLayoutItem(exists));
    } else {
      // 嘿，这个项有 `data-grid` 属性，使用它。
      if (g) {
        if (!isProduction) {
          validateLayout([g], 'ReactGridLayout.children');
        }
        // 这里的克隆并非真正必要，待修复
        layout.push(cloneLayoutItem({ ...g, i: child.key }));
      } else {
        // 没有提供任何信息：确保将其添加到底部
        // 这里的克隆并非真正必要，待修复
        layout.push(
          cloneLayoutItem({
            w: 1,
            h: 1,
            x: 0,
            y: bottom(layout),
            i: String(child.key),
          }),
        );
      }
    }
  });

  // 修正布局。
  const correctedLayout = correctBounds(layout, { cols: cols });
  return allowOverlap ? correctedLayout : compact(correctedLayout, compactType, cols, false);
}

/**
 * 验证布局。抛出错误。
 *
 * @param  {Array}  layout 布局项数组。
 * @param  {String} [contextName] 错误的上下文名称。
 * @throw  {Error}  验证错误。
 */
export function validateLayout(layout: Layout, contextName: string = 'Layout'): void {
  const subProps = ['x', 'y', 'w', 'h'];
  if (!Array.isArray(layout)) throw new Error(contextName + ' 必须是一个数组！');
  for (let i = 0, len = layout.length; i < len; i++) {
    const item = layout[i];
    for (let j = 0; j < subProps.length; j++) {
      const key = subProps[j];
      const value = item[key];
      if (typeof value !== 'number' || Number.isNaN(value)) {
        throw new Error(
          `ReactGridLayout: ${contextName}[${i}].${key} 必须是一个数字！接收到：${value} (${typeof value})`,
        );
      }
    }
    if (typeof item.i !== 'undefined' && typeof item.i !== 'string') {
      throw new Error(
        `ReactGridLayout: ${contextName}[${i}].i 必须是一个字符串！接收到：${
          item.i
        } (${typeof item.i})`,
      );
    }
  }
}

// 对 verticalCompact: false 的旧支持
export function compactType(props?: {
  verticalCompact: boolean;
  compactType: CompactType;
}): CompactType {
  const { verticalCompact, compactType } = props || {};
  return verticalCompact === false ? null : compactType;
}

function log(...args) {
  if (!DEBUG) return;
  // eslint-disable-next-line no-console
  console.log(...args);
}

export const noop = () => {};

// 用于计算列宽的辅助函数
export function calcGridColWidth(positionParams: PositionParams): number {
  const { margin, containerPadding, containerWidth, cols } = positionParams;
  // 计算网格列宽，根据容器宽度、边距和列数
  return (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;
}

// 该函数可以这样调用：
// calcGridItemWHPx(w, colWidth, margin[0])
// 或者
// calcGridItemWHPx(h, rowHeight, margin[1])
export function calcGridItemWHPx(
  gridUnits: number,
  colOrRowSize: number,
  marginPx: number,
): number {
  // 0 * Infinity === NaN，这会导致调整约束出现问题
  if (!Number.isFinite(gridUnits)) return gridUnits;
  // 计算网格项的宽度或高度（以像素为单位），考虑网格单元数、列或行的大小和边距
  return Math.round(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx);
}

/**
 * 根据 x、y、w、h 计算页面上的位置。
 * left、top、width、height 均以像素为单位。
 * @param  {PositionParams} positionParams  用于坐标计算的网格参数。
 * @param  {Number}  x 网格单位的 X 坐标。
 * @param  {Number}  y 网格单位的 Y 坐标。
 * @param  {Number}  w 网格单位的 W 坐标。
 * @param  {Number}  h 网格单位的 H 坐标。
 * @return {Position} 包含坐标的对象。
 */
export function calcGridItemPosition(
  positionParams: PositionParams,
  x: number,
  y: number,
  w: number,
  h: number,
  state?: any,
): Position {
  const { margin, containerPadding, rowHeight } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  const out: any = {};

  // 如果正在调整大小，使用调整大小回调函数返回的确切宽度和高度。
  if (state && state.resizing) {
    out.width = Math.round(state.resizing.width);
    out.height = Math.round(state.resizing.height);
  }
  // 否则，从网格单位计算。
  else {
    out.width = calcGridItemWHPx(w, colWidth, margin[0]);
    out.height = calcGridItemWHPx(h, rowHeight, margin[1]);
  }

  // 如果正在拖动，使用拖动回调函数返回的确切宽度和高度。
  if (state && state.dragging) {
    out.top = Math.round(state.dragging.top);
    out.left = Math.round(state.dragging.left);
  } else if (
    state &&
    state.resizing &&
    typeof state.resizing.top === 'number' &&
    typeof state.resizing.left === 'number'
  ) {
    out.top = Math.round(state.resizing.top);
    out.left = Math.round(state.resizing.left);
  }
  // 否则，从网格单位计算。
  else {
    out.top = Math.round((rowHeight + margin[1]) * y + containerPadding[1]);
    out.left = Math.round((colWidth + margin[0]) * x + containerPadding[0]);
  }

  return out;
}

/**
 * 将 x 和 y 坐标从像素转换为网格单位。
 * @param  {PositionParams} positionParams  用于坐标计算的网格参数。
 * @param  {Number} top 相对于父元素的顶部位置（以像素为单位）。
 * @param  {Number} left 相对于父元素的左侧位置（以像素为单位）。
 * @param  {Number} w 网格单位的 W 坐标。
 * @param  {Number} h 网格单位的 H 坐标。
 * @return {Object} 网格单位的 x 和 y。
 */
export function calcXY(
  positionParams: PositionParams,
  top: number,
  left: number,
  w: number,
  h: number,
): { x: number; y: number } {
  const { margin, containerPadding, cols, rowHeight, maxRows } = positionParams;
  const colWidth = calcGridColWidth(positionParams);

  // 计算 x 坐标，根据左侧位置、容器内边距和列宽、边距
  let x = Math.round((left - containerPadding[0]) / (colWidth + margin[0]));
  let y = Math.round((top - containerPadding[1]) / (rowHeight + margin[1]));

  // 限制 x 和 y 的范围
  x = clamp(x, 0, cols - w);
  y = clamp(y, 0, maxRows - h);
  return { x, y };
}

/**
 * 给定以像素值表示的高度和宽度，计算网格单位。
 * @param  {PositionParams} positionParams  用于坐标计算的网格参数。
 * @param  {Number} height 以像素为单位的高度。
 * @param  {Number} width 以像素为单位的宽度。
 * @param  {Number} x 网格单位的 X 坐标。
 * @param  {Number} y 网格单位的 Y 坐标。
 * @param {String} handle 调整大小的句柄。
 * @return {Object} 网格单位的 w 和 h。
 */
export function calcWH(
  positionParams: PositionParams,
  width: number,
  height: number,
  x: number,
  y: number,
  handle: string,
): { w: number; h: number } {
  const { margin, maxRows, cols, rowHeight } = positionParams;
  const colWidth = calcGridColWidth(positionParams);

  // 根据像素宽度和列宽、边距计算网格单位的宽度
  let w = Math.round((width + margin[0]) / (colWidth + margin[0]));
  let h = Math.round((height + margin[1]) / (rowHeight + margin[1]));

  // 限制 w 和 h 的范围
  let _w = clamp(w, 0, cols - x);
  let _h = clamp(h, 0, maxRows - y);
  if (['sw', 'w', 'nw'].indexOf(handle) !== -1) {
    _w = clamp(w, 0, cols);
  }
  if (['nw', 'n', 'ne'].indexOf(handle) !== -1) {
    _h = clamp(h, 0, maxRows);
  }
  return { w: _w, h: _h };
}

// 类似于 _.clamp
export function clamp(num: number, lowerBound: number, upperBound: number): number {
  // 将 num 限制在 lowerBound 和 upperBound 之间
  return Math.max(Math.min(num, upperBound), lowerBound);
}
// 判断layout是否全部存在
export const checkLayout = (
  panelList: {
    location?: { w?: number | null; h?: number | null; x?: number | null; y?: number | null };
  }[],
): boolean => {
  return panelList.every(
    (item) =>
      item.location &&
      ['w', 'h', 'x', 'y'].every(
        (key) => item.location[key] !== undefined && item.location[key] !== null,
      ),
  );
};
