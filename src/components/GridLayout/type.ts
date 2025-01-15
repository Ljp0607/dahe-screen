import type { ReactElement, Ref, SyntheticEvent } from 'react';
import { dontSetMe, noop } from './utils';
import PropTypes from 'prop-types';
import React from 'react';

export type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';
export type PartialPosition = { left: number; top: number };
export type Position = {
  left: number;
  top: number;
  width: number;
  height: number;
};
export type ReactDraggableCallbackData = {
  node: HTMLElement;
  x?: number;
  y?: number;
  deltaX: number;
  deltaY: number;
  lastX?: number;
  lastY?: number;
};
export type DragOverEvent = MouseEvent & {
  nativeEvent: {
    layerX: number;
    layerY: number;
    [key: string]: any;
  };
};

export type Pick = any;
export type ReactChildren = any;
export type ReactRef<HTMLElement, T> = {
  // 当前元素的引用，可以是任何类型
  current: any;
};
export type CompactType = 'horizontal' | 'vertical';
type GridItemCallback<GridResizeEvent> = (i: string, w: number, h: number, Data) => void;
export type DroppingPosition = { left: number; top: number; e: Event };
export type Size = { width: number; height: number };

export type ResizeHandle =
  | ReactElement<any>
  | ((resizeHandleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement, any>) => ReactElement<any>);
export type LayoutItem = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResiz?: boolean;
  resizeHandles?: Array<ResizeHandleAxis>;
  isBounded?: boolean;
};
export type Layout = ReadonlyArray<LayoutItem>;
export type EventCallback = (
  Layout,
  oldItem: LayoutItem,
  newItem: LayoutItem,
  placeholder: LayoutItem,
  Event,
  HTMLElement,
) => void;
export type Axis = 'both' | 'x' | 'y' | 'none';
export type ResizState = void;
export type ResizBoxState = {
  width: number;
  height: number;
  propsWidth: number;
  propsHeight: number;
};
export type DragCallbackData = {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};
export type ResizeCallbackData = {
  node: HTMLElement;
  size: Size;
  handle: ResizeHandleAxis;
};
export type Bounds = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
};

// 在 Flow 中缺失
export class SVGElement extends HTMLElement {}
export type PositionParams = {
  margin: [number, number];
  containerPadding: [number, number];
  containerWidth: number;
  cols: number;
  rowHeight: number;
  maxRows: number;
};

export type EventHandler<T> = (e: T) => void | false;

export class TouchEvent2 extends MouseEvent {
  changedTouches: TouchList;
  targetTouches: TouchList;
}

export type MouseTouchEvent = MouseEvent & TouchEvent2;
export type GridDragEvent = {
  e: Event;
  node: HTMLElement;
  newPosition: PartialPosition;
};
export type GridResizeEvent = {
  e: Event;
  node: HTMLElement;
  size: Size;
  handle: string;
};
export type DraggableData = {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};

export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

export type ControlPosition = { x: number; y: number };
export type PositionOffsetControlPosition = {
  x: number | string;
  y: number | string;
};
export type GridItemResizeCallback = (
  e: Event,
  data: ResizeCallbackData,
  position: Position,
) => void;

// 布局props
export type IndexProps = {
  // 类名，用于添加样式
  className: string;
  // 内联样式对象，可用于自定义元素的样式
  style: Object;
  // 容器的宽度，以像素为单位
  width: number;
  // 如果为 true，容器的高度会根据内容自动伸缩
  autoSize: boolean;
  // 网格的列数
  cols: number;
  // 一个选择器，具有此选择器的元素将不可拖动
  draggableCancel: string;
  // 用于拖动操作的句柄的选择器
  draggableHandle: string;
  // 垂直紧凑排列，如果为 false 且在非生产环境下，将发出警告
  verticalCompact: boolean;
  // 紧凑类型，可以是垂直或水平
  compactType: CompactType;
  // 布局数组，元素具有以下格式：{x: Number, y: Number, w: Number, h: Number, i: String}
  layout: Layout;
  // 元素之间的边距，以像素为单位，是一个包含两个元素的数组 [x, y]
  margin: [number, number];
  // 容器内的内边距，以像素为单位，是一个包含两个元素的数组 [x, y]，可选项
  containerPadding?: [number, number];
  // 行的固定高度，可以根据断点进行更改
  rowHeight: number;
  // 最大行数，默认为 Infinity，可指定最大值，超出该值时将限制拖动和调整大小操作，但不会报错
  maxRows: number;
  // 是否限制在容器内
  isBounded: boolean;
  // 是否可拖动
  isDraggable: boolean;
  // 是否可调整大小
  isResiz: boolean;
  // 是否可放置，即是否允许外部元素触发 onDrop 回调
  isDroppable: boolean;
  // 是否允许元素之间重叠
  allowOverlap: boolean;
  // 是否防止元素碰撞，即拖动元素时不改变其他元素位置
  preventCollision: boolean;
  // 是否使用 CSS 变换而不是 top/left 属性进行定位
  useCSSTransforms: boolean;
  // 父布局的变换比例
  transformScale: number;
  // 正在放置的元素
  droppingItem: any;
  // 调整大小手柄的数组
  resizeHandles: ResizeHandleAxis[];
  // 自定义的调整大小手柄，可以是一个元素或根据调整手柄轴和引用生成元素的函数，可选项
  resizeHandle?: ResizeHandle;

  // 回调函数
  onLayoutChange: any;
  onDrag: EventCallback;
  onDragStart: EventCallback;
  onDragStop: EventCallback;
  onResize: EventCallback;
  onResizeStart: EventCallback;
  onResizeStop: EventCallback;
  onDropDragOver: any;
  // 当元素被放置时调用，接收布局、放置的元素和事件作为参数
  onDrop: (layout: Layout, item?: LayoutItem, e?: Event) => void;
  // 子元素，可以是任何类型
  children: any;
  // 对包裹的 div 的可选引用
  innerRef?: React.LegacyRef<HTMLDivElement>;
};
// 布局默认
export type DefaultIndexProps = Omit<IndexProps, 'children' | 'width'>;
// 布局State
export type IndexState = {
  activeDrag?: LayoutItem;
  layout: Layout;
  mounted: boolean;
  oldDragItem?: LayoutItem;
  oldLayout?: Layout;
  oldResizeItem?: LayoutItem;
  resizing: boolean;
  droppingDOMNode?: ReactElement<any>;
  droppingPosition?: DroppingPosition;
  // 镜像属性
  children: any;
  compactType?: CompactType;
  propsLayout?: Layout;
};
// 布局默认
export const defaultIndexProps: DefaultIndexProps = {
  autoSize: true,
  cols: 12,
  className: '',
  style: {},
  draggableHandle: '',
  draggableCancel: '',
  containerPadding: null,
  rowHeight: 150,
  maxRows: Infinity, // 垂直无限增长
  layout: [],
  margin: [10, 10],
  isBounded: false,
  isDraggable: true,
  isResiz: true,
  allowOverlap: false,
  isDroppable: false,
  useCSSTransforms: true,
  transformScale: 1,
  verticalCompact: true,
  compactType: 'vertical',
  preventCollision: false,
  droppingItem: {
    i: '__dropping-elem__',
    h: 1,
    w: 1,
  },
  resizeHandles: ['se'],
  onLayoutChange: noop,
  onDragStart: noop,
  onDrag: noop,
  onDragStop: noop,
  onResizeStart: noop,
  onResize: noop,
  onResizeStop: noop,
  onDrop: noop,
  onDropDragOver: noop,
};
// 布局实例
export const indexProps = {
  className: PropTypes.string,
  style: PropTypes.object,

  // 此属性可以显式设置。如果未设置，它将自动设置为容器的宽度。请注意，调整大小不会导致此属性调整。
  // 如果需要该行为，请使用 WidthProvider。
  width: PropTypes.number,

  // 如果为 true，容器的高度会根据内容自动伸缩
  autoSize: PropTypes.bool,
  // 列数
  cols: PropTypes.number,

  // 一个不会被拖动的选择器
  draggableCancel: PropTypes.string,
  // 用于拖动操作的句柄的选择器
  draggableHandle: PropTypes.string,

  // 已弃用
  verticalCompact: function (props: IndexProps) {
    if (props.verticalCompact === false && process.env.NODE_ENV !== 'production') {
      console.warn(
        // eslint-disable-line no-console
        '`<ReactGridLayout>` 上的 `verticalCompact` 已弃用，即将移除。请使用 `compactType`: "horizontal" | "vertical" | null。',
      );
    }
  },
  // 选择垂直或水平紧凑排列
  compactType: PropTypes.oneOf(['vertical', 'horizontal']),

  // layout 是一个对象数组，格式为：
  // {x: Number, y: Number, w: Number, h: Number, i: String}
  layout: function (props: IndexProps) {
    var layout = props.layout;
    // 希望你在网格项上设置了 data-grid 属性
    if (layout === undefined) return;
    require('./utils').validateLayout(layout, 'layout');
  },

  //
  // 网格尺寸
  //

  // 元素之间的边距 [x, y]，以像素为单位
  margin: PropTypes.arrayOf(PropTypes.number),
  // 容器内的内边距 [x, y]，以像素为单位
  containerPadding: PropTypes.arrayOf(PropTypes.number),
  // 行具有固定的高度，但可以根据断点进行更改
  rowHeight: PropTypes.number,
  // 默认是 Infinity，但你可以在此指定最大值。
  // 请注意，此功能尚未完全完善，如果指定的布局超出了行的容量，不会报错。
  // 然而，它将不允许用户将元素拖动/调整大小超出此边界。但用户可以将元素推过此边界。
  // 出于此原因，未在此文档中详细说明。
  maxRows: PropTypes.number,
  // 是否限制在容器内
  isBounded: PropTypes.bool,
  // 是否可拖动
  isDraggable: PropTypes.bool,
  // 是否可调整大小
  isResiz: PropTypes.bool,
  // 如果为 true，网格可以相互重叠
  allowOverlap: PropTypes.bool,
  // 如果为 true，当元素被拖动时，网格项不会改变位置
  preventCollision: PropTypes.bool,
  // 使用 CSS 变换而不是 top/left 属性进行定位
  useCSSTransforms: PropTypes.bool,
  // 父布局的变换比例
  transformScale: PropTypes.number,
  // 如果为 true，外部元素可以触发 onDrop 回调，并传递特定的网格位置作为参数
  isDroppable: PropTypes.bool,

  // 调整大小
  resizeHandles: PropTypes.arrayOf(PropTypes.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'])),
  resizeHandle: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  //
  // 回调函数
  //

  // 用于保存布局的回调函数。在每次拖动和调整大小操作结束后调用。
  onLayoutChange: PropTypes.func,

  // 拖动开始时调用。回调函数的签名为 (layout, oldItem, newItem, placeholder, e,?node)。
  // 以下所有回调函数具有相同的签名。'start' 和'stop' 回调函数省略了 'placeholder'。
  onDragStart: PropTypes.func,
  // 每次拖动操作时调用
  onDrag: PropTypes.func,
  // 拖动完成时调用
  onDragStop: PropTypes.func,
  // 调整大小开始时调用
  onResizeStart: PropTypes.func,
  // 调整大小操作发生时调用
  onResize: PropTypes.func,
  // 调整大小完成时调用
  onResizeStop: PropTypes.func,
  // 当元素被放置时调用
  onDrop: PropTypes.func,

  //
  // 其他验证
  //

  droppingItem: PropTypes.shape({
    // 元素的唯一标识符，必需
    i: PropTypes.string.isRequired,
    // 元素的宽度，必需
    w: PropTypes.number.isRequired,
    // 元素的高度，必需
    h: PropTypes.number.isRequired,
  }),

  // 子元素的键不能重复
  children: function (props: IndexProps, propName: string) {
    const children = props[propName];

    // 检查子元素的键是否重复。如果发现重复，将抛出错误。
    const keys = {};
    React.Children.forEach(children, function (child) {
      if (child?.key == null) return;
      if (keys[child.key]) {
        throw new Error(
          '发现重复的子元素键 "' + child.key + '"！这将在 ReactGridLayout 中导致问题。',
        );
      }
      keys[child.key] = true;
    });
  },

  // 对包裹的 div 的可选引用
  innerRef: PropTypes.any,
};

// 子组件props
export type ItemProps = {
  children: ReactElement<any>;
  cols: number;
  containerWidth: number;
  margin: [number, number];
  containerPadding: [number, number];
  rowHeight: number;
  maxRows: number;
  isDraggable: boolean;
  isResiz: boolean;
  isBounded: boolean;
  static?: boolean;
  useCSSTransforms?: boolean;
  usePercentages?: boolean;
  transformScale: number;
  droppingPosition?: DroppingPosition;

  className: string;
  style?: Object;
  // 可拖动性
  cancel: string;
  handle: string;

  x: number;
  y: number;
  w: number;
  h: number;

  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
  i: string;

  resizeHandles?: ResizeHandleAxis[];
  resizeHandle?: ResizeHandle;

  onDrag?: GridItemCallback<GridDragEvent>;
  onDragStart?: GridItemCallback<GridDragEvent>;
  onDragStop?: GridItemCallback<GridDragEvent>;
  onResize?: GridItemCallback<GridResizeEvent>;
  onResizeStart?: GridItemCallback<GridResizeEvent>;
  onResizeStop?: GridItemCallback<GridResizeEvent>;
};
// 子组件默认
export type DefaultItemProps = {
  className: string;
  cancel: string;
  handle: string;
  minH: number;
  minW: number;
  maxH: number;
  maxW: number;
  transformScale: number;
};
// 子组件State
export type ItemState = {
  resizing?: Position;
  dragging?: PartialPosition;
  className?: string;
};
// 子组件实例
export const ItemDefaultProps = {
  // 子元素必须仅为单个元素
  children: PropTypes.element,
  // 一般网格属性
  cols: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  margin: PropTypes.array.isRequired,
  maxRows: PropTypes.number.isRequired,
  containerPadding: PropTypes.array.isRequired,

  // 这些都以网格单位表示
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,

  // 全部可选
  minW: function (props: ItemProps, propName: string) {
    const value = props[propName];
    if (typeof value !== 'number') return new Error('最小宽度不是数字');
    if (value > props.w || value > props.maxW) return new Error('最小宽度大于项目宽度/最大宽度');
  },

  maxW: function (props: ItemProps, propName: string) {
    const value = props[propName];
    if (typeof value !== 'number') return new Error('最大宽度不是数字');
    if (value < props.w || value < props.minW) return new Error('最大宽度小于项目宽度/最小宽度');
  },

  minH: function (props: ItemProps, propName: string) {
    const value = props[propName];
    if (typeof value !== 'number') return new Error('最小高度不是数字');
    if (value > props.h || value > props.maxH) return new Error('最小高度大于项目高度/最大高度');
  },

  maxH: function (props: ItemProps, propName: string) {
    const value = props[propName];
    if (typeof value !== 'number') return new Error('最大高度不是数字');
    if (value < props.h || value < props.minH) return new Error('最大高度小于项目高度/最小高度');
  },

  // 对于回调函数，有 ID 会比较好
  i: PropTypes.string.isRequired,

  // 调整大小
  resizeHandles: PropTypes.arrayOf(PropTypes.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'])),
  resizeHandle: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  // 函数
  onDragStop: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onResizeStop: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,

  // 标志
  isDraggable: PropTypes.bool.isRequired,
  isResiz: PropTypes.bool.isRequired,
  isBounded: PropTypes.bool.isRequired,
  static: PropTypes.bool,

  // 使用 CSS 变换而不是 top/left
  useCSSTransforms: PropTypes.bool.isRequired,
  transformScale: PropTypes.number,

  // 其他
  className: PropTypes.string,
  // 可拖动句柄的选择器
  handle: PropTypes.string,
  // 可拖动取消的选择器（见 react-draggable）
  cancel: PropTypes.string,
  // 正在放下元素的当前位置
  droppingPosition: PropTypes.shape({
    e: PropTypes.object.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
};

// 缩放props
export type ResizProps = {
  DefaultProps?: any;
  children?: ReactElement<any>;
  className?: string;
  draggableOpts?: any;
  height?: number;
  handle?:
    | ReactElement<any>
    | ((resizeHandleAxis: ResizeHandleAxis, ref: Ref<any>) => ReactElement<any>);
  onResizeStop?: (e: SyntheticEvent<any>, data: ResizeCallbackData) => any;
  onResizeStart?: (e: SyntheticEvent<any>, data: ResizeCallbackData) => any;
  onResize?: (e: SyntheticEvent<any>, data: ResizeCallbackData) => any;
  width?: number;
  [key: string]: any;
};
// 缩放默认
export type DefaultResizProps = {
  axis: Axis;
  handleSize: [number, number];
  lockAspectRatio: boolean;
  minConstraints: [number, number];
  maxConstraints: [number, number];
  resizeHandles: ResizeHandleAxis[];
  transformScale: number;
};
// 缩放实例
export const resizProps = {
  /*
   * 将调整大小限制在特定轴上（默认：'both'）
   * 'both' - 允许调整宽度或高度
   * 'x' - 仅允许改变宽度
   * 'y' - 仅允许改变高度
   * 'none' - 完全禁用调整大小功能
   * */
  axis: PropTypes.oneOf(['both', 'x', 'y', 'none']),
  className: PropTypes.string,
  /*
   * 要求存在且仅存在一个子元素。
   * */
  children: PropTypes.element.isRequired,
  /*
   * 这些将完整地传递给 react-draggable 的 DraggableCore
   * */
  draggableOpts: PropTypes.shape({
    allowAnyClick: PropTypes.bool,
    cancel: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    enableUserSelectHack: PropTypes.bool,
    offsetParent: PropTypes.node,
    grid: PropTypes.arrayOf(PropTypes.number),
    handle: PropTypes.string,
    nodeRef: PropTypes.object,
    onStart: PropTypes.func,
    onDrag: PropTypes.func,
    onStop: PropTypes.func,
    onMouseDown: PropTypes.func,
    scale: PropTypes.number,
  }),
  /*
   * 初始高度
   * */
  height: (...args: [any, any, any, any, any]) => {
    const [props] = args;
    // 如果调整高度或两者都调整，则为必需项
    if (props.axis === 'both' || props.axis === 'y') {
      return PropTypes.number.isRequired(...args);
    }
    return PropTypes.number(...args);
  },
  /*
   * 自定义光标调整大小句柄
   * */
  handle: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /*
   * 如果你更改此值，请确保更新你的 CSS
   * */
  handleSize: PropTypes.arrayOf(PropTypes.number),
  lockAspectRatio: PropTypes.bool,
  /*
   * 最大的 X 和 Y 尺寸
   * */
  maxConstraints: PropTypes.arrayOf(PropTypes.number),
  /*
   * 最小的 X 和 Y 尺寸
   * */
  minConstraints: PropTypes.arrayOf(PropTypes.number),
  /*
   * 在停止调整大小事件时调用
   * */
  onResizeStop: PropTypes.func,
  /*
   * 在开始调整大小事件时调用
   * */
  onResizeStart: PropTypes.func,
  /*
   * 在调整大小事件时调用
   * */
  onResize: PropTypes.func,
  /*
   * 定义应渲染哪些调整大小句柄（默认：'se'）
   * 's' - 南句柄（底部中心）
   * 'w' - 西句柄（左中心）
   * 'e' - 东句柄（右中心）
   * 'n' - 北句柄（顶部中心）
   * 'sw' - 西南句柄（底部左）
   * 'nw' - 西北句柄（顶部左）
   * 'se' - 东南句柄（底部右）
   * 'ne' - 东北句柄（顶部中心）
   * */
  resizeHandles: PropTypes.arrayOf(PropTypes.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'])),

  /*
   * 如果在父元素上设置了 `transform: scale(n)`，则应将此值设置为 `n`。
   * */
  transformScale: PropTypes.number,
  /*
   * 初始宽度
   */
  width: (...args: [any, any, any, any, any]) => {
    const [props] = args;
    // 如果调整宽度或两者都调整，则为必需项
    if (props.axis === 'both' || props.axis === 'x') {
      return PropTypes.number.isRequired(...args);
    }
    return PropTypes.number(...args);
  },
};

// 拖拽props
export type DragProps = {
  DraggableCoreDefaultProps?: any;
  cancel?: string;
  children?: ReactElement<any>;
  offsetParent?: HTMLElement;
  enableUserSelectHack?: boolean;
  grid?: [number, number];
  handle?: string;
  nodeRef?: React.ElementRef<any> | any;
  onMouseDown?: any;
  allowAnyClick?: any;
  disp?: any;
  onStop?: any;
  disabled?: any;
  allowMobileScroll?: any;
  onStart?: any;
  onDrag?: any;
};
// 拖拽默认
export type DragDefaultProps = {
  allowAnyClick: boolean;
  allowMobileScroll: boolean;
  disabled: boolean;
  enableUserSelectHack: boolean;
  onStart: DraggableEventHandler;
  onDrag: DraggableEventHandler;
  onStop: DraggableEventHandler;
  onMouseDown: (e: MouseEvent) => void;
  scale: number;
};
// 拖拽实例
export const dragProps = {
  /**
   * `allowAnyClick` 允许使用任何鼠标按钮进行拖动。
   * 默认情况下，我们只接受左键。
   *
   * 默认值为 `false`。
   */
  allowAnyClick: PropTypes.bool,

  /**
   * `allowMobileScroll` 在移动设备上关闭对 'touchstart' 事件的取消。仅当点击
   * 事件出现问题时启用此选项。最好使用 'handle' 或 'cancel' 代替。
   *
   * 默认值为 `false`。
   */
  allowMobileScroll: PropTypes.bool,

  children: PropTypes.node.isRequired,

  /**
   * 如果 `disabled` 为 `true`，则阻止 <Draggable> 进行拖动。除 `onMouseDown` 外，所有的处理程序
   * 都不会触发。
   */
  disabled: PropTypes.bool,

  /**
   * 默认情况下，我们会向文档主体添加 'user-select:none' 属性，以防止拖动时出现难看的文本选中效果。
   * 如果这给你的应用程序带来问题，请将此值设置为 `false`。
   */
  enableUserSelectHack: PropTypes.bool,

  /**
   * 如果设置了 `offsetParent`，则使用传递的 DOM 节点来计算拖动偏移量，
   * 而不是使用父节点。
   */
  offsetParent: function (props: DragProps, propName: any) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable 的 offsetParent 必须是一个 DOM 节点。');
    }
  },

  /**
   * `grid` 指定拖动应对齐的 x 和 y 坐标。
   */
  grid: PropTypes.arrayOf(PropTypes.number),

  /**
   * `handle` 指定一个选择器，用作启动拖动的句柄。
   *
   * 示例：
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">点击我来拖动</div>
   *                  <div>这是一些其他内容</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: PropTypes.string,

  /**
   * `cancel` 指定一个选择器，用于防止拖动初始化。
   *
   * 示例：
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">你不能从这里拖动</div>
   *                     <div>在这里拖动正常工作</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: PropTypes.string,

  /* 在 React 严格模式下，ReactDOM.findDOMNode() 已被弃用。
   * 不幸的是，为了让 <Draggable> 正常工作，我们需要直接访问
   * 底层的 DOM 节点。如果你想避免警告，请传递一个 `nodeRef`，
   * 如下例所示：
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>示例目标</div>
   *     </Draggable>
   *   );
   * }
   *
   * 这可用于任意嵌套的组件，只要引用最终指向实际的子 DOM 节点而不是自定义组件。
   */
  nodeRef: PropTypes.object,

  /**
   * 拖动开始时调用。
   * 如果此函数返回布尔值 false，则取消拖动。
   */
  onStart: PropTypes.func,

  /**
   * 拖动时调用。
   * 如果此函数返回布尔值 false，则取消拖动。
   */
  onDrag: PropTypes.func,

  /**
   * 拖动停止时调用。
   * 如果此函数返回布尔值 false，则拖动将保持激活状态。
   */
  onStop: PropTypes.func,

  /**
   * 一个变通选项，如果需要访问 onMouseDown，可以传递它，
   * 因为它总是被阻塞（因为内部使用了 onMouseDown）
   */
  onMouseDown: PropTypes.func,

  /**
   * 如果设置了 `scale`，则在拖动元素时应用缩放。
   */
  scale: PropTypes.number,

  /**
   * 这些属性应该在子组件上定义，而不是在这里。
   */
  className: dontSetMe,
  style: dontSetMe,
  transform: dontSetMe,
};
