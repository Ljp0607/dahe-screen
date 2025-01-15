// 缩放
import * as React from 'react';
import type { ReactNode } from 'react';
import Drag from './Drag';
import {
  type ResizeHandleAxis,
  type DefaultResizProps,
  type DragCallbackData,
  type ResizProps,
  resizProps,
} from './type';
import { cloneElement } from './utils';

// 该组件没有状态，依赖父组件根据回调数据设置其属性。
export default class Resiz extends React.Component<ResizProps, any> {
  static propTypes = resizProps;
  static defaultProps: DefaultResizProps = {
    axis: 'both',
    handleSize: [20, 20],
    lockAspectRatio: false,
    minConstraints: [20, 20],
    maxConstraints: [Infinity, Infinity],
    resizeHandles: ['se'],
    transformScale: 1,
  };

  handleRefs: any = {};
  lastHandleRect: ClientRect = null;
  slack: [number, number] = null;

  componentWillUnmount() {
    this.resetData();
  }

  resetData() {
    // 重置数据，将 lastHandleRect 和 slack 置为 null
    this.lastHandleRect = this.slack = null;
  }

  // 在提供的约束范围内限制宽度和高度
  runConstraints(width: number, height: number): [number, number] {
    const { minConstraints, maxConstraints, lockAspectRatio } = this.props;
    // 短路逻辑，如果没有最小约束、最大约束和锁定宽高比的要求，直接返回原宽度和高度
    if (!minConstraints && !maxConstraints && !lockAspectRatio) return [width, height];

    // 如果有最小和最大约束，我们还需要根据宽高比调整宽度和高度。
    if (lockAspectRatio) {
      const ratio = this.props.width / this.props.height;
      const deltaW = width - this.props.width;
      const deltaH = height - this.props.height;

      // 找出哪个坐标的变化量更大，并将另一个坐标向其靠拢。
      // 例如：
      // ratio = 1, deltaW = 10, deltaH = 5, 则 deltaH 应变为 10。
      // ratio = 2, deltaW = 10, deltaH = 6, 则 deltaW 应变为 12。
      if (Math.abs(deltaW) > Math.abs(deltaH * ratio)) {
        height = width / ratio;
      } else {
        width = height * ratio;
      }
    }

    const [oldW, oldH] = [width, height];

    // 将松弛量添加到用于计算边界位置的值中。这样可以确保如果我们开始移除松弛量，元素不会立即做出反应，直到松弛量完全移除。
    const [slackW, slackH] = this.slack || [0, 0];
    width += slackW;
    height += slackH;

    if (minConstraints) {
      // 确保宽度不小于最小约束的宽度
      width = Math.max(minConstraints[0], width);
      // 确保高度不小于最小约束的高度
      height = Math.max(minConstraints[1], height);
    }
    if (maxConstraints) {
      // 确保宽度不大于最大约束的宽度
      width = Math.min(maxConstraints[0], width);
      // 确保高度不大于最大约束的高度
      height = Math.min(maxConstraints[1], height);
    }

    // 如果宽度或高度发生了变化，我们一定引入了一些松弛量。记录下来以便下一次迭代使用。
    this.slack = [slackW + (oldW - width), slackH + (oldH - height)];

    return [width, height];
  }

  /**
   * 拖动事件的包装器，提供更有用的数据。
   *
   * @param  {String} handlerName 要包装的处理函数名称。
   * @return {Function}          处理函数。
   */
  resizeHandler(
    handlerName: 'onResize' | 'onResizeStart' | 'onResizeStop',
    axis: ResizeHandleAxis,
  ): Function {
    return (e: any, { node, deltaX, deltaY }: DragCallbackData) => {
      // 以防万一遗留数据，重置数据（正常情况下不应该发生）
      if (handlerName === 'onResizeStart') this.resetData();

      // 轴的限制
      const canDragX =
        (this.props.axis === 'both' || this.props.axis === 'x') && axis !== 'n' && axis !== 's';
      const canDragY =
        (this.props.axis === 'both' || this.props.axis === 'y') && axis !== 'e' && axis !== 'w';
      // 无法拖动。
      if (!canDragX && !canDragY) return;

      // 分解轴以便后续使用
      const axisV = axis[0];
      const axisH = axis[axis.length - 1]; // 故意不使用 axis[1]，以便能处理 axis === 'w' 的情况

      // 跟踪正在拖动的元素以考虑位置的变化。
      // 如果在回调之间手柄的位置发生了变化，我们需要将此考虑进下一个回调中。
      // 否则，当向上或向左调整大小时，元素会出现“跳跃”现象。
      const handleRect = node.getBoundingClientRect();
      if (this.lastHandleRect != null) {
        // 如果自上次渲染后手柄在任何轴上重新定位，
        // 我们需要将此差值添加到回调值中。
        // 只检查 'n' 和 'w'，因为使用's' 和 'w' 调整大小时不会影响页面上的整体位置
        if (axisH === 'w') {
          const deltaLeftSinceLast = handleRect.left - this.lastHandleRect.left;
          deltaX += deltaLeftSinceLast;
        }
        if (axisV === 'n') {
          const deltaTopSinceLast = handleRect.top - this.lastHandleRect.top;
          deltaY += deltaTopSinceLast;
        }
      }
      // 存储最后一个矩形，以便知道它实际移动了多少。
      this.lastHandleRect = handleRect;

      // 如果使用顶部或左侧拖动手柄，反转增量。
      if (axisH === 'w') deltaX = -deltaX;
      if (axisV === 'n') deltaY = -deltaY;

      // 通过增量更新宽度/高度。还要考虑 transformScale 因素。
      let width = this.props.width + (canDragX ? deltaX / this.props.transformScale : 0);
      let height = this.props.height + (canDragY ? deltaY / this.props.transformScale : 0);

      // 应用用户提供的约束。
      [width, height] = this.runConstraints(width, height);

      const dimensionsChanged = width !== this.props.width || height !== this.props.height;

      // 如果存在用户提供的回调函数，调用它。
      const cb = typeof this.props[handlerName] === 'function' ? this.props[handlerName] : null;
      // 如果是 onResize 且尺寸未改变，则不调用回调。
      const shouldSkipCb = handlerName === 'onResize' && !dimensionsChanged;
      if (cb && !shouldSkipCb) {
        e.persist?.();
        cb(e, {
          node,
          size: {
            width,
            height,
          },
          handle: axis,
        });
      }

      // 如果是 onResizeStop，重置内部数据。
      if (handlerName === 'onResizeStop') this.resetData();
    };
  }

  // 渲染给定轴和 DOM 引用的调整大小手柄。为了使底层的可拖动库正常工作，必须附加引用。
  renderResizeHandle(handleAxis: ResizeHandleAxis, ref: any): ReactNode {
    const { handle } = this.props;
    // 未提供手柄，创建默认手柄
    if (!handle) {
      return (
        <span className={`react-resizable-handle react-resizable-handle-${handleAxis}`} ref={ref} />
      );
    }
    // 手柄是一个函数，例如：
    // `handle={(handleAxis) => <span className={...} />}`
    if (typeof handle === 'function') {
      return handle(handleAxis, ref);
    }
    // 手柄是一个 React 组件（复合组件或 DOM 组件）。
    const isDOMElement = typeof handle.type === 'string';
    const props = {
      ref,
      // 如果不是 DOM 元素，添加 `handleAxis` 属性，
      // 否则会收到未知属性警告
      ...(isDOMElement ? {} : { handleAxis }),
    };
    return React.cloneElement(handle, props);
  }

  render() {
    const {
      children,
      className,
      draggableOpts,
      width,
      height,
      handle,
      handleSize,
      lockAspectRatio,
      axis,
      minConstraints,
      maxConstraints,
      onResize,
      onResizeStop,
      onResizeStart,
      resizeHandles,
      transformScale,
      ...p
    } = this.props;
    // 这里我们要做的是获取此元素的子元素，并使用此元素的属性克隆它。
    // 然后我们将其子元素定义为：
    // 1. 它原有的子元素（可调整大小元素的子元素），和
    // 2. 一个或多个可拖动手柄。
    return cloneElement(children, {
      ...p,
      className: `${className ? `${className} ` : ''}react-resizable`,
      children: [
        children.props.children,
        ...resizeHandles.map((handleAxis) => {
          // 为手柄创建一个引用，以便 <DraggableCore> 不必使用 ReactDOM.findDOMNode()。
          const ref =
            this.handleRefs[handleAxis] ?? (this.handleRefs[handleAxis] = React.createRef());
          return (
            <Drag
              {...draggableOpts}
              nodeRef={ref}
              key={`resizableHandle-${handleAxis}`}
              onStop={this.resizeHandler('onResizeStop', handleAxis)}
              onStart={this.resizeHandler('onResizeStart', handleAxis)}
              onDrag={this.resizeHandler('onResize', handleAxis)}
            >
              {this.renderResizeHandle(handleAxis, ref)}
            </Drag>
          );
        }),
      ],
    });
  }
}
