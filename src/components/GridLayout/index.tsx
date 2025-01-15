// 封装和写入
import * as React from 'react';
import { deepEqual } from 'fast-equals';
import clsx from 'clsx';
import {
  bottom,
  calcXY,
  childrenEqual,
  cloneLayoutItem,
  compact,
  compactType,
  getAllCollisions,
  getLayoutItem,
  moveElement,
  noop,
  synchronizeLayoutWithChildren,
  withLayoutItem,
} from './utils';
import GridItem from './GridItem';
import type { ReactElement } from 'react';
import {
  PositionParams,
  IndexProps,
  Layout,
  GridDragEvent,
  indexProps,
  IndexState,
  defaultIndexProps,
  GridResizeEvent,
} from './type';

// 结束类型
export default class ReactGridLayout extends React.Component<IndexProps, IndexState> {
  static displayName?: string = 'GridLayout';
  static propTypes = indexProps;
  static defaultProps = defaultIndexProps;

  state: IndexState = {
    activeDrag: null,
    layout: synchronizeLayoutWithChildren(
      this.props.layout,
      this.props.children,
      this.props.cols,
      // 对 verticalCompact: false 的遗留支持
      compactType(this.props),
      this.props.allowOverlap,
    ),
    mounted: false,
    oldDragItem: null,
    oldLayout: null,
    oldResizeItem: null,
    resizing: false,
    droppingDOMNode: null,
    children: [],
  };

  dragEnterCounter: number = 0;

  componentDidMount() {
    this.setState({ mounted: true });
    // 可能在挂载时使用布局进行回调。这应该在修正布局宽度之后进行，
    // 以确保不会使用错误的宽度重新渲染。
    this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
  }

  static getDerivedStateFromProps(nextProps: IndexProps, prevState: IndexState) {
    let newLayoutBase;

    if (prevState.activeDrag) {
      return null;
    }

    // 对 compactType 的遗留支持
    // 允许父组件直接设置布局。
    if (
      !deepEqual(nextProps.layout, prevState.propsLayout) ||
      nextProps.compactType !== prevState.compactType
    ) {
      newLayoutBase = nextProps.layout;
    } else if (!childrenEqual(nextProps.children, prevState.children)) {
      // 如果子元素发生变化，也重新生成布局。使用我们的状态作为基础，
      // 因为它可能比 props 中的更更新。
      newLayoutBase = prevState.layout;
    }

    // 我们需要重新生成布局。
    if (newLayoutBase) {
      const newLayout = synchronizeLayoutWithChildren(
        newLayoutBase,
        nextProps.children,
        nextProps.cols,
        compactType(nextProps),
        nextProps.allowOverlap,
      );

      return {
        layout: newLayout,
        // 我们需要将这些属性保存到状态中，以便使用
        // getDerivedStateFromProps 而不是 componentDidMount（使用 componentDidMount 会导致额外的重新渲染）
        compactType: nextProps.compactType,
        children: nextProps.children,
        propsLayout: nextProps.layout,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps: IndexProps, nextState: IndexState): boolean {
    return (
      // 注意：这几乎总是不相等的。因此，从 shouldComponentUpdate 中获得更好性能的唯一方法是
      // 用户有意对子元素进行记忆化。如果他们这样做，并且可以正确处理更改，性能将会提高。
      this.props.children !== nextProps.children ||
      //!fastRGLPropsEqual(this.props, nextProps, deepEqual) ||
      this.state.activeDrag !== nextState.activeDrag ||
      this.state.mounted !== nextState.mounted ||
      this.state.droppingPosition !== nextState.droppingPosition
    );
  }

  componentDidUpdate(prevProps: IndexProps, prevState: IndexState) {
    if (!this.state.activeDrag) {
      const newLayout = this.state.layout;
      const oldLayout = prevState.layout;

      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
  }

  /**
   * 计算容器的像素值。
   * @return {String} 容器的高度（以像素为单位）。
   */
  containerHeight(): string {
    if (!this.props.autoSize) return;
    const nbRow = bottom(this.state.layout);
    const containerPaddingY = this.props.containerPadding
      ? this.props.containerPadding[1]
      : this.props.margin[1];
    return (
      nbRow * this.props.rowHeight +
      (nbRow - 1) * this.props.margin[1] +
      containerPaddingY * 2 +
      'px'
    );
  }

  /**
   * 当拖动开始时
   * @param {String} i 子元素的 Id
   * @param {Number} x 移动的 X 位置
   * @param {Number} y 移动的 Y 位置
   * @param {Event} e 鼠标按下事件
   * @param {Element} node 当前正在拖动的 DOM 元素
   */
  onDragStart = (i: string, x: number, y: number, { e, node }: GridDragEvent) => {
    const { layout } = this.state;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    // 创建占位符（仅用于显示）
    const placeholder = {
      w: l.w,
      h: l.h,
      x: l.x,
      y: l.y,
      placeholder: true,
      i: i,
    };

    this.setState({
      oldDragItem: cloneLayoutItem(l),
      oldLayout: layout,
      activeDrag: placeholder,
    });

    return this.props.onDragStart(layout, l, l, null, e, node);
  };

  /**
   * 每次拖动操作都会创建一个新的拖动元素并将元素移动到拖动位置
   * @param {String} i 子元素的 Id
   * @param {Number} x 移动的 X 位置
   * @param {Number} y 移动的 Y 位置
   * @param {Event} e 鼠标按下事件
   * @param {Element} node 当前正在拖动的 DOM 元素
   */
  onDrag = (i: string, x: number, y: number, { e, node }: GridDragEvent) => {
    const { oldDragItem } = this.state;
    let { layout } = this.state;
    const { cols, allowOverlap, preventCollision } = this.props;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    // 创建占位符（仅用于显示）
    const placeholder = {
      w: l.w,
      h: l.h,
      x: l.x,
      y: l.y,
      placeholder: true,
      i: i,
    };

    // 将元素移动到拖动位置。
    const isUserAction = true;
    layout = moveElement(
      layout,
      l,
      x,
      y,
      isUserAction,
      preventCollision,
      compactType(this.props),
      cols,
      allowOverlap,
    );

    this.props.onDrag(layout, oldDragItem, l, placeholder, e, node);

    this.setState({
      layout: allowOverlap ? layout : compact(layout, compactType(this.props), cols),
      activeDrag: placeholder,
    });
  };

  /**
   * 当拖动停止时，找出元素最接近的位置并更新其 x 和 y。
   * @param  {String} i 子元素的索引。
   * @param {Number} x 移动的 X 位置
   * @param {Number} y 移动的 Y 位置
   * @param {Event} e 鼠标按下事件
   * @param {Element} node 当前正在拖动的 DOM 元素
   */
  onDragStop = (i: string, x: number, y: number, { e, node }: GridDragEvent) => {
    if (!this.state.activeDrag) return;

    const { oldDragItem } = this.state;
    let { layout } = this.state;
    const { cols, preventCollision, allowOverlap } = this.props;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    // 将元素移动到此处
    const isUserAction = true;
    layout = moveElement(
      layout,
      l,
      x,
      y,
      isUserAction,
      preventCollision,
      compactType(this.props),
      cols,
      allowOverlap,
    );

    // 设置状态
    const newLayout = allowOverlap ? layout : compact(layout, compactType(this.props), cols);

    this.props.onDragStop(newLayout, oldDragItem, l, null, e, node);

    const { oldLayout } = this.state;
    this.setState({
      activeDrag: null,
      layout: newLayout,
      oldDragItem: null,
      oldLayout: null,
    });

    this.onLayoutMaybeChanged(newLayout, oldLayout);
  };

  onLayoutMaybeChanged(newLayout: Layout, oldLayout?: Layout) {
    if (!oldLayout) oldLayout = this.state.layout;

    if (!deepEqual(oldLayout, newLayout)) {
      this.props.onLayoutChange(newLayout);
    }
  }

  onResizeStart = (i: string, w: number, h: number, { e, node }: GridResizeEvent) => {
    const { layout } = this.state;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    this.setState({
      oldResizeItem: cloneLayoutItem(l),
      oldLayout: this.state.layout,
      resizing: true,
    });

    this.props.onResizeStart(layout, l, l, null, e, node);
  };

  onResize = (i: string, w: number, h: number, { e, handle, node }: GridResizeEvent) => {
    const { oldResizeItem } = this.state;
    const { layout } = this.state;
    const { cols, preventCollision, allowOverlap } = this.props;

    let shouldMoveItem = false;
    let finalLayout;
    let x;
    let y;

    const [newLayout, l] = withLayoutItem(layout, i, (l) => {
      let hasCollisions;
      x = l.x;
      y = l.y;
      if (['sw', 'w', 'nw', 'n', 'ne'].indexOf(handle) !== -1) {
        if (['sw', 'nw', 'w'].indexOf(handle) !== -1) {
          x = l.x + (l.w - w);
          w = l.x !== x && x < 0 ? l.w : w;
          x = x < 0 ? 0 : x;
        }

        if (['ne', 'n', 'nw'].indexOf(handle) !== -1) {
          y = l.y + (l.h - h);
          h = l.y !== y && y < 0 ? l.h : h;
          y = y < 0 ? 0 : y;
        }

        shouldMoveItem = true;
      }

      // 应该使用类似四叉树的方法
      // 来更快地查找碰撞
      if (preventCollision && !allowOverlap) {
        const collisions = getAllCollisions(layout, {
          ...l,
          w,
          h,
          x,
          y,
        }).filter((layoutItem) => layoutItem.i !== l.i);
        hasCollisions = collisions.length > 0;

        // 如果发生碰撞，我们需要调整占位符。
        if (hasCollisions) {
          // 如果发生碰撞，重置布局项的尺寸
          y = l.y;
          h = l.h;
          x = l.x;
          w = l.w;
          shouldMoveItem = false;
        }
      }

      l.w = w;
      l.h = h;

      return l;
    });

    // 正常情况下不应该发生，但类型检查需要此检查
    if (!l) return;

    finalLayout = newLayout;
    if (shouldMoveItem) {
      // 将元素移动到新位置。
      const isUserAction = true;
      finalLayout = moveElement(
        newLayout,
        l,
        x,
        y,
        isUserAction,
        this.props.preventCollision,
        compactType(this.props),
        cols,
        allowOverlap,
      );
    }
    // 创建占位符元素（仅用于显示）
    const placeholder = {
      w: l.w,
      h: l.h,
      x: l.x,
      y: l.y,
      static: true,
      i: i,
    };

    this.props.onResize(finalLayout, oldResizeItem, l, placeholder, e, node);

    // 重新压缩新布局并设置拖动占位符。
    this.setState({
      layout: allowOverlap ? finalLayout : compact(finalLayout, compactType(this.props), cols),
      activeDrag: placeholder,
    });
  };

  // 当调整大小操作停止时的处理函数，接收相关参数，无返回值
  onResizeStop = (i: string, w: number, h: number, { e, node }: GridResizeEvent) => {
    const { layout, oldResizeItem } = this.state;
    const { cols, allowOverlap } = this.props;
    const l = getLayoutItem(layout, i);

    // 设置状态
    const newLayout = allowOverlap ? layout : compact(layout, compactType(this.props), cols);

    this.props.onResizeStop(newLayout, oldResizeItem, l, null, e, node);

    const { oldLayout } = this.state;
    this.setState({
      activeDrag: null,
      layout: newLayout,
      oldResizeItem: null,
      oldLayout: null,
      resizing: false,
    });

    this.onLayoutMaybeChanged(newLayout, oldLayout);
  };

  /**
   * 创建一个占位符对象。
   * @return {Element} 占位符 div 元素。
   */
  placeholder(): ReactElement<any> {
    const { activeDrag } = this.state;
    if (!activeDrag) return null;
    const {
      width,
      cols,
      margin,
      containerPadding,
      rowHeight,
      maxRows,
      useCSSTransforms,
      transformScale,
    } = this.props;
    return (
      <GridItem
        w={activeDrag.w}
        h={activeDrag.h}
        x={activeDrag.x}
        y={activeDrag.y}
        i={activeDrag.i}
        className={`react-grid-placeholder ${this.state.resizing ? 'placeholder-resizing' : ''}`}
        containerWidth={width}
        cols={cols}
        margin={margin}
        containerPadding={containerPadding || margin}
        maxRows={maxRows}
        rowHeight={rowHeight}
        isDraggable={false}
        isResiz={false}
        isBounded={false}
        useCSSTransforms={useCSSTransforms}
        transformScale={transformScale}
      >
        <div />
      </GridItem>
    );
  }

  /**
   * 给定一个网格项，设置其样式属性并将其包裹在 <Drag> 中。
   * @param  {Element} child React 元素。
   * @return {Element}       包裹在可拖动元素中并正确放置的元素。
   */
  processGridItem(child: ReactElement<any>, isDroppingItem?: boolean): ReactElement<any> {
    if (!child || !child.key) return;
    const l = getLayoutItem(this.state.layout, String(child.key));
    if (!l) return null;
    const {
      width,
      cols,
      margin,
      containerPadding,
      rowHeight,
      maxRows,
      isDraggable,
      isResiz,
      isBounded,
      useCSSTransforms,
      transformScale,
      draggableCancel,
      draggableHandle,
      resizeHandles,
      resizeHandle,
    } = this.props;
    const { mounted, droppingPosition } = this.state;

    // 确定用户可能进行的操作。
    // 如果一个元素是静态的，它默认不能被操作。
    // 直接在网格项上定义的任何属性将具有优先权。
    const draggable = typeof l.isDraggable === 'boolean' ? l.isDraggable : !l.static && isDraggable;
    const resizable = typeof l.isResiz === 'boolean' ? l.isResiz : !l.static && isResiz;
    const resizeHandlesOptions = l.resizeHandles || resizeHandles;

    // 如果父元素设置了 isBounded，并且子元素未明确设置为 false，则在子元素上设置 isBounded。
    const bounded = draggable && isBounded && l.isBounded !== false;

    return (
      <GridItem
        containerWidth={width}
        cols={cols}
        margin={margin}
        containerPadding={containerPadding || margin}
        maxRows={maxRows}
        rowHeight={rowHeight}
        cancel={draggableCancel}
        handle={draggableHandle}
        onDragStop={this.onDragStop}
        onDragStart={this.onDragStart}
        onDrag={this.onDrag}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        isDraggable={draggable}
        isResiz={resizable}
        isBounded={bounded}
        useCSSTransforms={useCSSTransforms && mounted}
        usePercentages={!mounted}
        transformScale={transformScale}
        w={l.w}
        h={l.h}
        x={l.x}
        y={l.y}
        i={l.i}
        minH={l.minH}
        minW={l.minW}
        maxH={l.maxH}
        maxW={l.maxW}
        static={l.static}
        droppingPosition={isDroppingItem ? droppingPosition : undefined}
        resizeHandles={resizeHandlesOptions}
        resizeHandle={resizeHandle}
      >
        {child}
      </GridItem>
    );
  }

  // 在拖动元素时调用。是浏览器原生拖放 API 的一部分。
  // 原生事件目标可能是布局本身，也可能是布局内的元素。
  onDragOver = (e) => {
    e.preventDefault(); // 防止任何浏览器原生操作
    e.stopPropagation();
    const {
      droppingItem,
      onDropDragOver,
      margin,
      cols,
      rowHeight,
      maxRows,
      width,
      containerPadding,
      transformScale,
    } = this.props;
    // 允许用户自定义放置的元素或根据 `onDragOver(e: Event)` 回调的结果终止放置操作。
    const onDragOverResult = onDropDragOver?.(e);
    if (onDragOverResult === false) {
      if (this.state.droppingDOMNode) {
        this.removeDroppingPlaceholder();
      }
      return false;
    }
    const finalDroppingItem = { ...droppingItem, ...onDragOverResult };

    const { layout } = this.state;

    // $FlowIgnore 缺少定义
    const gridRect = e.currentTarget.getBoundingClientRect(); // 网格在视口中的位置

    // 计算鼠标相对于网格的位置
    const layerX = e.clientX - gridRect.left;
    const layerY = e.clientY - gridRect.top;
    const droppingPosition = {
      left: layerX / transformScale,
      top: layerY / transformScale,
      e,
    };

    if (!this.state.droppingDOMNode) {
      const positionParams: PositionParams = {
        cols,
        margin,
        maxRows,
        rowHeight,
        containerWidth: width,
        containerPadding: containerPadding || margin,
      };

      const calculatedPosition = calcXY(
        positionParams,
        layerY,
        layerX,
        finalDroppingItem.w,
        finalDroppingItem.h,
      );

      this.setState({
        droppingDOMNode: <div key={finalDroppingItem.i} />,
        droppingPosition,
        layout: [
          ...layout,
          {
            ...finalDroppingItem,
            x: calculatedPosition.x,
            y: calculatedPosition.y,
            static: false,
            isDraggable: true,
          },
        ],
      });
    } else if (this.state.droppingPosition) {
      const { left, top } = this.state.droppingPosition;
      const shouldUpdatePosition = left != layerX || top != layerY;
      if (shouldUpdatePosition) {
        this.setState({ droppingPosition });
      }
    }
  };

  // 移除放置占位符的函数
  removeDroppingPlaceholder: () => void = () => {
    const { droppingItem, cols } = this.props;
    const { layout } = this.state;

    const newLayout = compact(
      layout.filter((l) => l.i !== droppingItem.i),
      compactType(this.props),
      cols,
      this.props.allowOverlap,
    );

    this.setState({
      layout: newLayout,
      droppingDOMNode: null,
      activeDrag: null,
      droppingPosition: undefined,
    });
  };

  onDragLeave: any = (e) => {
    e.preventDefault(); // 防止任何浏览器原生操作
    e.stopPropagation();
    this.dragEnterCounter--;

    // onDragLeave 可以在每个布局的子元素上触发。
    // 但是我们知道在离开布局容器后，dragEnter 和 dragLeave 事件的数量将达到平衡
    // 所以我们可以增加和减少 dragEnter 的计数，当它等于 0 时，我们将移除占位符
    if (this.dragEnterCounter === 0) {
      this.removeDroppingPlaceholder();
    }
  };

  onDragEnter: any = (e: Event) => {
    e.preventDefault(); // 防止任何浏览器原生操作
    e.stopPropagation();
    this.dragEnterCounter++;
  };

  onDrop: any = (e: Event) => {
    e.preventDefault(); // 防止任何浏览器原生操作
    e.stopPropagation();
    const { droppingItem } = this.props;
    const { layout } = this.state;
    const item = layout.find((l) => l.i === droppingItem.i);

    // 在放置操作时重置 dragEnter 计数器
    this.dragEnterCounter = 0;

    this.removeDroppingPlaceholder();

    this.props.onDrop(layout, item, e);
  };

  render() {
    const { className, style, isDroppable, innerRef } = this.props;

    const mergedClassName = clsx('react-grid-layout', className);
    const mergedStyle = {
      height: this.containerHeight(),
      ...style,
    };

    return (
      <div
        ref={innerRef}
        className={mergedClassName}
        style={mergedStyle}
        onDrop={isDroppable ? this.onDrop : noop}
        onDragLeave={isDroppable ? this.onDragLeave : noop}
        onDragEnter={isDroppable ? this.onDragEnter : noop}
        onDragOver={isDroppable ? this.onDragOver : noop}
      >
        {React.Children.map(this.props.children, (child) => this.processGridItem(child))}
        {isDroppable &&
          this.state.droppingDOMNode &&
          this.processGridItem(this.state.droppingDOMNode, true)}
        {this.placeholder()}
      </div>
    );
  }
}
