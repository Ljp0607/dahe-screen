<template>
  <div>
    <div class="announceList" :plain="true" @click="ceshi">123</div>
    <el-pagination
      class="pagination"
      background
      :pager-count="5"
      layout="prev, pager, next"
      :page-count="20"
      :currentPage="data.current"
      @current-change="changePage"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import request from "../../../../api/modules/list";

const data = reactive({
  current: 2,
});
function ceshi() {
  console.log(123);


}

function changePage(e: Number) {
  console.log(e);
}
function changeSize() {
  console.log(333);
}
</script>

<style lang="less" scoped>
.announceList {
  width: 100px;
  height: 100px;
}
.pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  button {
    background-color: rgb(25 25 112 0.5);
    border: #6495ed solid 1px;
  }
  li {
    background-color: rgb(25 25 112 0.5);
    border: #6495ed solid 1px;
  }
}
</style>
