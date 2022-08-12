
function scaling(dataScreenRef: any) {

    /* 根据浏览器大小推断缩放比例 */
    const getScale = (width = 1920, height = 1080) => {
        let ww = window.innerWidth / width;
        let wh = window.innerHeight / height;
        return ww < wh ? ww : wh;
    };

    // if (dataScreenRef.value) {
    //     dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    //     dataScreenRef.value.style.width = `1920px`;
    //     dataScreenRef.value.style.height = `1080px`;
    // }

    /* 浏览器监听 resize 事件 */
    const resize = () => {
        if (dataScreenRef.value) {
            dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
        }
        // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
    };

    window.addEventListener("resize", resize);

}
function onMountData(dataScreenRef: any) {

}



export default scaling