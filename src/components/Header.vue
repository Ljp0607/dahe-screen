<template>
  <div class="title">
    <el-switch
      v-model="expend"
      class="ml-2"
      @change="changeExpand"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #00bfff"
    />
    <div class="span">大河报管理平台*智慧大屏</div>
  </div>
  <div class=""></div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
const expend = ref(false);

function changeExpand() {
  store.expand = expend.value;
  // console.log(store.expand);
}
onMounted(() => {});
</script>

<style lang="less" scoped>
.title {
  // width: 500px;
  // white-space: nowrap;
  font-size: 30px;
  display: flex;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;

  .span {
    width: 400px;
    white-space: nowrap;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
