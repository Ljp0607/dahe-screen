<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img src="../../assets/home/login_left0.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="../../assets/home/icon.png" alt="" />
          <h2 class="logo-text">大河新闻管理平台</h2>
        </div>
        <!-- <el-button type="primary" @click="getclick">主要按钮</el-button> -->
        <div class="from">
          <el-input v-model="data.username" placeholder="yushipin" />
          <el-input v-model="data.password" placeholder="admin123" />
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="success" @click="resetForm">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const data = reactive({
  username: "yushipin",
  password: "admin123",
});
//解构赋值为router
const router = useRouter();
//登录按钮
function onSubmit() {
  if (data.username == "yushipin" && data.password == "admin123") {
    router.push({ name: "home", params: data });
  } else {
    ElMessage.error("账号或密码错误");
  }
}

//重置按钮
function resetForm() {
  data.username = "";
  data.password = "";
}
</script>

<style scoped lang="less">
.login-container {
  position: relative;
  min-width: 550px;
  height: 100vh;
  background-color: #eeeeee;
  background-image: url("../../assets/home/login_bg.svg");
  background-position: 50%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 3%;
  box-sizing: border-box;
  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 94%;
    height: 90%;
    padding: 0 4% 0 50px;
    margin: 0 auto;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    .login-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      padding: 50px 40px 45px;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
        .login-icon {
          width: 52px;
          height: 52px;
        }
        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 42px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }
      .from {
        .el-input {
          // display: block;
          // width: 300px;
          height: 50px;
          margin: 20px 0;
        }
        .el-button {
          margin-left: 5%;
          width: 40%;
          height: 40px;
        }
      }
    }
  }
}
</style>
