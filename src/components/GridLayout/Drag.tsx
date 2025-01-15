// 拖拽
import PropTypes from 'prop-types';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { DragDefaultProps, DragProps, EventHandler, MouseTouchEvent } from './type';
import {
  addEvent,
  addUserSelectStyles,
  createCoreData,
  dontSetMe,
  getControlPosition,
  getTouchIdentifier,
  matchesSelectorAndParentsTo,
  removeEvent,
  removeUserSelectStyles,
  snapToGrid,
} from './utils';

// 简单的拖动事件名称抽象。
// const eventsFor = {
//   touch: {
//     start: 'touchstart',
//     move: 'touchmove',
//     stop: 'touchend',
//   },
//   mouse: {
//     start: 'mousedown',
//     move: 'mousemove',
//     stop: 'mouseup',
//   },
// };

// 默认使用鼠标事件。
let dragEventFor = {
  start: 'mousedown',
  move: 'mousemove',
  stop: 'mouseup',
};

// 定义DraggableCore组件
export default class Drag extends React.Component<DragProps> {
  static displayName?: string = 'DraggableCore';

  static propTypes = {
    allowAnyClick: PropTypes.bool,
    allowMobileScroll: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    enableUserSelectHack: PropTypes.bool,
    offsetParent: function (props: DragProps, propName: any) {
      if (props[propName] && props[propName].nodeType !== 1) {
        throw new Error('Draggable 的 offsetParent 必须是一个 DOM 节点。');
      }
    },
    grid: PropTypes.arrayOf(PropTypes.number),
    handle: PropTypes.string,
    cancel: PropTypes.string,
    nodeRef: PropTypes.object,
    onStart: PropTypes.func,
    onDrag: PropTypes.func,
    onStop: PropTypes.func,
    onMouseDown: PropTypes.func,
    scale: PropTypes.number,
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe,
  };
  static defaultProps: DragDefaultProps = {
    allowAnyClick: false, // 默认仅接受左键点击
    allowMobileScroll: false,
    disabled: false,
    enableUserSelectHack: true,
    onStart: function () {},
    onDrag: function () {},
    onStop: function () {},
    onMouseDown: function () {},
    scale: 1,
  };

  dragging: boolean = false;

  // 拖动时用于确定增量。
  lastX: number = NaN;
  lastY: number = NaN;

  touchIdentifier?: number = null;

  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    // 移除任何剩余的事件处理程序。同时移除触摸和鼠标处理程序，以防
    // 某些浏览器的奇怪行为导致在鼠标移动时触发触摸事件，反之亦然。
    const thisNode = this.findDOMNode();
    if (thisNode) {
      const { ownerDocument } = thisNode;
      removeEvent(ownerDocument, dragEventFor.move, this.handleDrag);
      removeEvent(ownerDocument, dragEventFor.stop, this.handleDragStop);
      if (this.props.enableUserSelectHack) {
        // 防止可能的“强制重排”
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(() => {
            removeUserSelectStyles(ownerDocument);
          });
        } else {
          removeUserSelectStyles(ownerDocument);
        }
      }
    }
  }

  // React 严格模式兼容性：如果传递了 `nodeRef`，我们将使用它，而不是自己尝试查找
  findDOMNode(): Element | Text {
    return this.props?.nodeRef ? this.props?.nodeRef?.current : ReactDOM.findDOMNode(this);
  }

  handleDragStart: EventHandler<MouseTouchEvent> = (e) => {
    // 使其可以在此处理程序之上附加事件处理程序。
    this.props.onMouseDown(e);

    // 仅接受左键点击。
    if (!this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

    // 获取节点。确保获取相对文档（可能在 iframe 中）
    const thisNode = this.findDOMNode();
    if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
      throw new Error('<DraggableCore> 在 DragStart 时未挂载！');
    }
    const { ownerDocument } = thisNode;

    // 如果提供了 handle 或 cancel 属性且选择器不匹配，则短路。
    if (
      this.props.disabled ||
      !(e.target instanceof ownerDocument.defaultView.Node) ||
      (this.props.handle && !matchesSelectorAndParentsTo(e.target, this.props.handle, thisNode)) ||
      (this.props.cancel && matchesSelectorAndParentsTo(e.target, this.props.cancel, thisNode))
    ) {
      return;
    }

    // 防止在移动设备（如 iPad/iPhone）上滚动。
    // 重要的是，这要在 handle/cancel 之后。
    if (e.type === 'touchstart' && !this.props.allowMobileScroll) e.preventDefault();

    // 如果这是一个触摸事件，在组件状态中设置触摸标识符。这允许我们
    // 通过识别哪个触摸点设置在此元素上，来区分多点触摸屏幕上的各个触摸点。
    const touchIdentifier = getTouchIdentifier(e);
    this.touchIdentifier = touchIdentifier;

    // 从事件中获取当前拖动点。这用作偏移量。
    const position = getControlPosition(e, touchIdentifier, this);
    if (position == null) return; // 不可能，但满足类型检查
    const { x, y } = position;

    // 创建一个事件对象，其中包含父级在此做出决策所需的所有数据。
    const coreEvent = createCoreData(this, x, y);

    // 调用事件处理程序。如果返回明确的 false，则取消。
    const shouldUpdate = this.props.onStart(e, coreEvent);
    if (shouldUpdate === false || this.mounted === false) return;

    // 向主体添加样式以禁用用户选择。这可以防止页面上的文本被选中。
    if (this.props.enableUserSelectHack) addUserSelectStyles(ownerDocument);

    // 开始拖动。将当前的 x 和 y 设置为偏移量
    // 这样我们就知道在拖动过程中移动了多少。这使我们
    // 即使元素已被移动，也能正常拖动它们。
    this.dragging = true;
    this.lastX = x;
    this.lastY = y;

    // 直接向文档添加事件，以便在用户的鼠标/触摸移到
    // 此元素外部时捕获。我们根据是否检测到该设备支持触摸，使用不同的事件。
    addEvent(ownerDocument, dragEventFor.move, this.handleDrag);
    addEvent(ownerDocument, dragEventFor.stop, this.handleDragStop);
  };

  handleDrag: EventHandler<MouseTouchEvent> = (e) => {
    // 从事件中获取当前拖动点。这用作偏移量。
    const position = getControlPosition(e, this.touchIdentifier, this);
    if (position == null) return;
    let { x, y } = position;

    // 如果提供了 prop，则对齐到网格
    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.lastX,
        deltaY = y - this.lastY;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      if (!deltaX && !deltaY) return; // 跳过无用的拖动
      (x = this.lastX + deltaX), (y = this.lastY + deltaY);
    }

    const coreEvent = createCoreData(this, x, y);

    // 调用事件处理程序。如果返回明确的 false，则触发结束。
    const shouldUpdate = this.props.onDrag(e, coreEvent);
    if (shouldUpdate === false || this.mounted === false) {
      try {
        // $FlowIgnore
        this.handleDragStop(new MouseEvent('mouseup') as MouseTouchEvent);
      } catch (err) {
        // 旧浏览器
        const event = document.createEvent('MouseEvents');
        // $FlowIgnore
        event.initMouseEvent(
          'mouseup',
          true,
          true,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null,
        );
        this.handleDragStop(event as MouseTouchEvent);
      }
      return;
    }

    this.lastX = x;
    this.lastY = y;
  };

  handleDragStop: EventHandler<MouseTouchEvent> = (e) => {
    if (!this.dragging) return;

    const position = getControlPosition(e, this.touchIdentifier, this);
    if (position == null) return;
    let { x, y } = position;

    // 如果提供了 prop，则对齐到网格
    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.lastX || 0;
      let deltaY = y - this.lastY || 0;
      [deltaX, deltaY] = snapToGrid(this.props.grid, deltaX, deltaY);
      (x = this.lastX + deltaX), (y = this.lastY + deltaY);
    }

    const coreEvent = createCoreData(this, x, y);

    // 调用事件处理程序
    const shouldContinue = this.props.onStop(e, coreEvent);
    if (shouldContinue === false || this.mounted === false) return false;

    const thisNode = this.findDOMNode();
    if (thisNode) {
      // 移除用户选择的样式
      if (this.props.enableUserSelectHack) removeUserSelectStyles(thisNode.ownerDocument);
    }

    // 重置元素。
    this.dragging = false;
    this.lastX = NaN;
    this.lastY = NaN;

    if (thisNode) {
      // 移除事件处理程序
      removeEvent(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
      removeEvent(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
    }
  };

  onMouseDown: EventHandler<MouseTouchEvent> = (e) => {
    return this.handleDragStart(e);
  };

  onMouseUp: EventHandler<MouseTouchEvent> = (e) => {
    return this.handleDragStop(e);
  };

  render(): JSX.Element {
    // 这使其可以灵活使用所需的任何元素（div、ul 等）
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
    });
  }
}
