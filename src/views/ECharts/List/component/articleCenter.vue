<template>
    <img
      class="item img1"
      src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
    />
    <img
      class="item img2"
      src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
    />
    <img
      class="item img3"
      src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
    />
    <img
      class="item img4"
      src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
    />
    <img
      class="item img5"
      src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
    />
    <img
      class="item img6"
      src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
    />
</template>

<script lang="ts" setup>
function changePage() {}
</script>

<style lang="less" scoped>

 

  .item {
    position: absolute;
    // top: -150px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 140px;
    height: 200px;
    // background-color: aqua;
    /* //倒影 */
    // -webkit-box-reflect: below 10px linear-gradient(transparent, white);
  }
  .img1 {
    background-size: cover;
    transform: rotateY(60deg) translateZ(180px);
  }
  .img2 {
    background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
    background-size: cover;
    transform: rotateY(120deg) translateZ(180px);
  }
  .img3 {
    background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
    background-size: cover;
    transform: rotateY(180deg) translateZ(180px);
  }
  .img4 {
    background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
    background-size: cover;
    transform: rotateY(240deg) translateZ(180px);
  }
  .img5 {
    background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
    background-size: cover;
    transform: rotateY(300deg) translateZ(180px);
  }
  .img6 {
    background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
    background-size: cover;
    transform: rotateY(360deg);
    transform: translateZ(180px);
  }

</style>
