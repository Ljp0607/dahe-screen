<template>
  <img class="item img1" :src="data.item[0].image" />
  <img class="item img2" :src="data.item[1].image" />
  <img class="item img3" :src="data.item[2].image" />
  <img class="item img4" :src="data.item[3].image" />
  <img class="item img5" :src="data.item[4].image" />
  <img class="item img6" :src="data.item[5].image" />
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import request from "../../../../api/modules/list";
const data: any = reactive({
  item: [
    {
      image:
        "https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg",
    },
    {
      image:
        "https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg",
    },
    {
      image:
        "https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg",
    },
    {
      image:
        "https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg",
    },
    {
      image:
        "https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg",
    },
    {
      image:
        "https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg",
    },
  ],
});
function changePage() {
  request.getApiData().then((res: any) => {
    for (let i in res.data.data.data[0].revisionList) {
      if (data.item.length < 6) {
        console.log(res.data.data.data[0].revisionList[i]);
        data.item[i] = res.data.data.data[0].revisionList[i];
      }
    }
  });
}
onBeforeMount(() => {
  changePage();
});
// onMounted(() => {
//   console.log(data);

//   console.log(123);
// });
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
  // background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
  background-size: cover;
  transform: rotateY(120deg) translateZ(180px);
}
.img3 {
  // background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
  background-size: cover;
  transform: rotateY(180deg) translateZ(180px);
}
.img4 {
  // background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
  background-size: cover;
  transform: rotateY(240deg) translateZ(180px);
}
.img5 {
  // background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
  background-size: cover;
  transform: rotateY(300deg) translateZ(180px);
}
.img6 {
  // background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
  background-size: cover;
  transform: rotateY(360deg);
  transform: translateZ(180px);
}
</style>
