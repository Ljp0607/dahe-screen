import React from 'react';
import Drag from './Drag';
import Resiz from './Resiz';
import {
  calcGridColWidth,
  calcGridItemPosition,
  calcGridItemWHPx,
  calcWH,
  calcXY,
  clamp,
  fastPositionEqual,
  perc,
  resizeItemInDirection,
  setTopLeft,
  setTransform,
} from './utils';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import {
  DefaultItemProps,
  GridItemResizeCallback,
  ItemDefaultProps,
  ItemProps,
  ItemState,
  PartialPosition,
  Position,
  PositionParams,
  ReactRef,
  ResizeCallbackData,
} from './type';

export default class GridItem extends React.Component<ItemProps, ItemState> {
  static propTypes = ItemDefaultProps;

  static defaultProps: DefaultItemProps = {
    className: '',
    cancel: '',
    handle: '',
    minH: 1,
    minW: 1,
    maxH: Infinity,
    maxW: Infinity,
    transformScale: 1,
  };

  state: ItemState = {
    resizing: null,
    dragging: null,
    className: '',
  };

  elementRef: ReactRef<HTMLDivElement, any> = React.createRef();

  shouldComponentUpdate(nextProps: ItemProps, nextState: ItemState): boolean {
    // 我们无法深度比较子元素。如果开发者对它们进行了记忆化，我们可以
    // 使用此优化。
    if (this.props.children !== nextProps.children) return true;
    if (this.props.droppingPosition !== nextProps.droppingPosition) return true;
    // 待办事项：对这些计算进行记忆化，以免花费太长时间？
    const oldPosition = calcGridItemPosition(
      this.getPositionParams(this.props),
      this.props.x,
      this.props.y,
      this.props.w,
      this.props.h,
      this.state,
    );
    const newPosition = calcGridItemPosition(
      this.getPositionParams(nextProps),
      nextProps.x,
      nextProps.y,
      nextProps.w,
      nextProps.h,
      nextState,
    );
    return (
      !fastPositionEqual(oldPosition, newPosition) ||
      this.props.useCSSTransforms !== nextProps.useCSSTransforms
    );
  }

  componentDidMount() {
    this.moveDroppingItem(undefined);
  }

  componentDidUpdate(prevProps: ItemProps) {
    this.moveDroppingItem(prevProps);
  }

  // 当存在 droppingPosition 时，这意味着我们应该触发一个移动事件
  // 此元素移动了 `x, y` 像素。
  moveDroppingItem(prevProps?: ItemProps) {
    const { droppingPosition } = this.props;
    if (!droppingPosition) return;
    const node = this.elementRef.current;
    // 找不到 DOM 节点（我们是否已卸载？）
    if (!node) return;

    const prevDroppingPosition = prevProps?.droppingPosition || {
      left: 0,
      top: 0,
    };
    const { dragging } = this.state;

    const shouldDrag =
      (dragging && droppingPosition.left !== prevDroppingPosition.left) ||
      droppingPosition.top !== prevDroppingPosition.top;

    if (!dragging) {
      this.onDragStart(droppingPosition.e, {
        node,
        deltaX: droppingPosition.left,
        deltaY: droppingPosition.top,
      });
    } else if (shouldDrag) {
      const deltaX = droppingPosition.left - dragging.left;
      const deltaY = droppingPosition.top - dragging.top;

      this.onDrag(droppingPosition.e, {
        node,
        deltaX,
        deltaY,
      });
    }
  }

  getPositionParams(props: ItemProps = this.props): PositionParams {
    return {
      cols: props.cols,
      containerPadding: props.containerPadding,
      containerWidth: props.containerWidth,
      margin: props.margin,
      maxRows: props.maxRows,
      rowHeight: props.rowHeight,
    };
  }

  /**
   * 这里是我们设置网格项绝对位置的地方。这有点棘手，因为我们希望在服务器渲染时也能很好地完成，而正确实现这一点的唯一方法是使用百分比宽度/左侧，因为
   * 我们并不确切知道浏览器视口的大小。
   * 不幸的是，在这种情况下，对于性能很好的 CSS 变换会失效，因为百分比左侧是相对于项目本身的，而不是其容器！所以我们不能在服务器渲染时使用它们。
   *
   * @param  {Object} pos 具有宽度、高度、左侧、顶部的位置对象。
   * @return {Object}     样式对象。
   */
  createStyle(pos: Position): { [key: string]: string } {
    const { usePercentages, containerWidth, useCSSTransforms } = this.props;

    let style;
    // CSS 变换支持（默认）
    if (useCSSTransforms) {
      style = setTransform(pos);
    } else {
      // top,left（较慢）
      style = setTopLeft(pos);

      // 这用于服务器渲染。
      if (usePercentages) {
        style.left = perc(pos.left / containerWidth);
        style.width = perc(pos.width / containerWidth);
      }
    }

    return style;
  }

  /**
   * 将一个 Draggable 实例混入子元素。
   * @param  {Element} child    子元素。
   * @return {Element}          包装在 Draggable 中的子元素。
   */
  mixinDraggable(child: ReactElement<any>, isDraggable: boolean): ReactElement<any> {
    return (
      <Drag
        disabled={!isDraggable}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.handle}
        cancel={'.react-resizable-handle' + (this.props.cancel ? ',' + this.props.cancel : '')}
        scale={this.props.transformScale}
        nodeRef={this.elementRef}
      >
        {child}
      </Drag>
    );
  }

  /**
   * 为结构相似的调整大小事件设置回调处理程序定义的实用函数。
   */
  curryResizeHandler(position: Position, handler: Function): Function {
    return (e: Event, data: ResizeCallbackData): Function => handler(e, data, position);
  }

  /**
   * 将一个 Resiz 实例混入子元素。
   * @param  {Element} child    子元素。
   * @param  {Object} position  位置对象（像素值）
   * @return {Element}          包装在 Resiz 中的子元素。
   */
  mixinResiz(child: ReactElement<any>, position: Position, isResiz: boolean): ReactElement<any> {
    const { cols, minW, minH, maxW, maxH, transformScale, resizeHandles, resizeHandle } =
      this.props;
    const positionParams = this.getPositionParams();

    // 这是最大可能的宽度 - 不会达到无穷大，因为受窗口宽度限制
    const maxWidth = calcGridItemPosition(positionParams, 0, 0, cols, 0).width;

    // 使用我们的最小和最大值计算最小/最大约束
    const mins = calcGridItemPosition(positionParams, 0, 0, minW, minH);
    const maxes = calcGridItemPosition(positionParams, 0, 0, maxW, maxH);
    const minConstraints = [mins.width, mins.height];
    const maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
    return (
      <Resiz
        draggableOpts={{
          disabled: !isResiz,
        }}
        className={isResiz ? undefined : 'react-resizable-hide'}
        width={position.width}
        height={position.height}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        onResizeStop={this.curryResizeHandler(position, this.onResizeStop)}
        onResizeStart={this.curryResizeHandler(position, this.onResizeStart)}
        onResize={this.curryResizeHandler(position, this.onResize)}
        transformScale={transformScale}
        resizeHandles={resizeHandles}
        handle={resizeHandle}
      >
        {child}
      </Resiz>
    );
  }

  /**
   * onDragStart 事件处理程序
   * @param  {Event}  e             事件数据
   * @param  {Object} callbackData  包含节点、增量和位置信息的对象
   */
  onDragStart: (Event, ReactDraggableCallbackData) => void = (e, { node }) => {
    const { onDragStart, transformScale } = this.props;
    if (!onDragStart) return;

    const newPosition: PartialPosition = { top: 0, left: 0 };

    const { offsetParent } = node;
    if (!offsetParent) return;
    const parentRect = offsetParent.getBoundingClientRect();
    const clientRect = node.getBoundingClientRect();
    const cLeft = clientRect.left / transformScale;
    const pLeft = parentRect.left / transformScale;
    const cTop = clientRect.top / transformScale;
    const pTop = parentRect.top / transformScale;
    newPosition.left = cLeft - pLeft + offsetParent.scrollLeft;
    newPosition.top = cTop - pTop + offsetParent.scrollTop;
    this.setState({ dragging: newPosition });

    // 用此数据调用回调函数
    const { x, y } = calcXY(
      this.getPositionParams(),
      newPosition.top,
      newPosition.left,
      this.props.w,
      this.props.h,
    );

    return onDragStart.call(this, this.props.i, x, y, {
      e,
      node,
      newPosition,
    });
  };

  /**
   * onDrag 事件处理程序
   * @param  {Event}  e             事件数据
   * @param  {Object} callbackData  包含节点、增量和位置信息的对象
   */
  onDrag: (Event, ReactDraggableCallbackData) => void = (e, { node, deltaX, deltaY }) => {
    const { onDrag } = this.props;
    if (!onDrag) return;

    if (!this.state.dragging) {
      throw new Error('onDrag 在 onDragStart 之前被调用。');
    }
    let top = this.state.dragging.top + deltaY;
    let left = this.state.dragging.left + deltaX;

    const { isBounded, i, w, h, containerWidth } = this.props;
    const positionParams = this.getPositionParams();

    // 边界计算；将项目保持在网格内
    if (isBounded) {
      const { offsetParent } = node;

      if (offsetParent) {
        const { margin, rowHeight, containerPadding } = this.props;
        const bottomBoundary =
          offsetParent.clientHeight - calcGridItemWHPx(h, rowHeight, margin[1]);
        top = clamp(top - containerPadding[1], 0, bottomBoundary);

        const colWidth = calcGridColWidth(positionParams);
        const rightBoundary = containerWidth - calcGridItemWHPx(w, colWidth, margin[0]);
        left = clamp(left - containerPadding[0], 0, rightBoundary);
      }
    }

    const newPosition: PartialPosition = { top, left };
    this.setState({ dragging: newPosition });

    // 用此数据调用回调函数
    const { x, y } = calcXY(positionParams, top, left, w, h);
    return onDrag.call(this, i, x, y, {
      e,
      node,
      newPosition,
    });
  };

  /**
   * onDragStop 事件处理程序
   * @param  {Event}  e             事件数据
   * @param  {Object} callbackData  包含节点、增量和位置信息的对象
   */
  onDragStop: (Event, ReactDraggableCallbackData) => void = (e, { node }) => {
    const { onDragStop } = this.props;
    if (!onDragStop) return;

    if (!this.state.dragging) {
      throw new Error('onDragEnd 在 onDragStart 之前被调用。');
    }
    const { w, h, i } = this.props;
    const { left, top } = this.state.dragging;
    const newPosition: PartialPosition = { top, left };
    this.setState({ dragging: null });

    const { x, y } = calcXY(this.getPositionParams(), top, left, w, h);

    return onDragStop.call(this, i, x, y, {
      e,
      node,
      newPosition,
    });
  };

  /**
   * onResizeStop 事件处理程序
   * @param  {Event}  e             事件数据
   * @param  {Object} callbackData  包含节点和大小信息的对象
   */
  onResizeStop: GridItemResizeCallback = (e, callbackData, position) =>
    this.onResizeHandler(e, callbackData, position, 'onResizeStop');

  // onResizeStart 事件处理程序
  onResizeStart: GridItemResizeCallback = (e, callbackData, position) =>
    this.onResizeHandler(e, callbackData, position, 'onResizeStart');

  // onResize 事件处理程序
  onResize: GridItemResizeCallback = (e, callbackData, position) =>
    this.onResizeHandler(e, callbackData, position, 'onResize');

  /**
   * 围绕调整大小事件的包装器，以提供更有用的数据。
   */
  onResizeHandler(
    e: Event,
    { node, size, handle }: ResizeCallbackData, // 'size' 是更新后的位置
    position: Position, // 现有位置
    handlerName: string,
  ): void {
    const handler = this.props[handlerName];
    if (!handler) return;
    const { x, y, i, maxH, minH, containerWidth } = this.props;
    const { minW, maxW } = this.props;

    // 基于调整大小方向的尺寸限制
    let updatedSize: any = size;
    if (node) {
      updatedSize = resizeItemInDirection(handle, position, size as any, containerWidth);
      this.setState({
        resizing: handlerName === 'onResizeStop' ? null : updatedSize,
      });
    }

    // 根据像素尺寸获取新的 XY
    let { w, h } = calcWH(
      this.getPositionParams(),
      updatedSize.width,
      updatedSize.height,
      x,
      y,
      handle,
    );

    // 最小/最大限制。
    // minW 至少应为 1（待办事项：属性类型验证？）
    w = clamp(w, Math.max(minW, 1), maxW);
    h = clamp(h, minH, maxH);

    handler.call(this, i, w, h, { e, node, size: updatedSize, handle });
  }

  render(): JSX.Element {
    const { x, y, w, h, isDraggable, isResiz, droppingPosition, useCSSTransforms } = this.props;

    const pos = calcGridItemPosition(this.getPositionParams(), x, y, w, h, this.state);
    const child = React.Children.only(this.props.children);

    // 创建子元素。我们克隆现有的元素，但修改其 className 和样式。
    let newChild = React.cloneElement(child, {
      ref: this.elementRef,
      className: clsx('react-grid-item', child.props.className, this.props.className, {
        static: this.props.static,
        resizing: Boolean(this.state.resizing),
        'react-draggable': isDraggable,
        'react-draggable-dragging': Boolean(this.state.dragging),
        dropping: Boolean(droppingPosition),
        cssTransforms: useCSSTransforms,
      }),
      // 我们可以在子元素上设置宽度和高度，但遗憾的是无法设置位置。
      style: {
        ...this.props.style,
        ...child.props.style,
        ...this.createStyle(pos),
      },
    });

    // 可调整大小的支持。通常情况下是开启的，但用户可以将其关闭。
    newChild = this.mixinResiz(newChild, pos, isResiz);

    // 可拖动的支持。除了占位符外，它始终是开启的。
    newChild = this.mixinDraggable(newChild, isDraggable);

    return newChild;
  }
}
