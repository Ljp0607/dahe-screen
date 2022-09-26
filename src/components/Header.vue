<template>
  <div class="title">
    <div class="button" @click="store.changeExpand" @mouseover="changeMouse">
      <el-icon v-if="store.expand" :size="25"><ArrowLeft /></el-icon>
      <el-icon v-else :size="25"><ArrowRight /></el-icon>
    </div>
    <div class="span">大河报管理平台*智慧大屏</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
const isOpon = ref(true);
function changeMouse() {
  // clearTimeout(timer);
  if (isOpon.value) {
    isOpon.value = false;
    store.changeExpand();
  }
  let timer = setTimeout(() => {
    isOpon.value = true;
  }, 3000);
}
onMounted(() => {});
</script>

<style lang="less" scoped>
.title {
  background-color: transparent;
  font-size: 30px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
  position: relative;
  .button {
    position: absolute;
    top: 5px;
    left: -35px;
    // left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    line-height: 46px;
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 2px 8px -2px rgb(0 0 0 / 5%),
      0 1px 4px -1px rgb(25 15 15 / 7%), 0 0 1px 0 rgb(0 0 0 / 8%); // color: rgba(0, 0, 0, 0.25);
  }
  .button:hover {
    color: rgba(0, 0, 0, 1);
  }
  .span {
    display: inline-block;
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
