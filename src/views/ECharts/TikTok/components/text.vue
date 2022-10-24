<template>
  <div class="contanier">
    <header>
      <div class="title">
        <span> 实时视频</span>
      </div>
      <div class="empty"></div>

      <div class="text" v-for="item in 3" :key="item">
        <div
          v-if="data.videos[(data.nums - 1) * 3 + item - 1].short_video_title"
          @click="clickVideo((data.nums - 1) * 3 + item - 1)"
        >
          <div class="introduce">
            {{ data.videos[(data.nums - 1) * 3 + item - 1].short_video_title }}
          </div>
          <div class="time">
            {{
              data.videos[(data.nums - 1) * 3 + item - 1]
                .short_video_publish_time
            }}
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="30"
        v-model:currentPage="data.nums"
      />
    </header>
    <footer>
      <div class="title">
        <span>实时新闻</span>
      </div>
      <div class="empty"></div>
      <div class="text" v-for="item in 3" :key="item">
        <div
          v-if="data.news[(data.num - 1) * 3 + item - 1].news_title"
          @click="clickNew((data.num - 1) * 3 + item - 1)"
        >
          <div class="introduce">
            {{ data.news[(data.num - 1) * 3 + item - 1].news_title }}
          </div>
          <div class="time">
            {{ data.news[(data.num - 1) * 3 + item - 1].news_publish_date }}
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="30"
        v-model:currentPage="data.num"
      />
    </footer>
    <el-dialog
      v-model="broadVideo"
      :title="data.videos[data.video].short_video_title"
    >
      <div>
        <video
          class="video"
          :src="data.videos[data.video].short_video_url"
          autoplay
          controls
          muted
          ref="videoRef"
        ></video>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import request from "@/api/modules/list";
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
const broadVideo = ref(false);
const data: any = reactive({
  news: [
    { short_video_title: "", news_publish_date: "" },
    { short_video_title: "", news_publish_date: "" },
    { short_video_title: "", news_publish_date: "" },
  ],
  videos: [
    { news_title: "", short_video_publish_time: "" },
    { news_title: "", short_video_publish_time: "" },
    { news_title: "", short_video_publish_time: "" },
  ],
  num: 1,
  nums: 1,
  video: 0,
});

//获取新闻
function getNewsreport() {
  // request.newsreport().then((res: any) => {
  //   data.news = res.data;
  // });
  axios
    .get("https://news.dahebao.cn/dahe/fanwenapi/newsreportercountList.do")
    .then((res: any) => {
      data.news = res.data;
    })
    .then(() => {
      //倒叙排列
      for (let i = 0; i < data.news.length; i++) {
        for (let j = 0; j < data.news.length - 1; j++) {
          if (
            data.news[j + 1].news_publish_date > data.news[j].news_publish_date
          ) {
            [data.news[j], data.news[j + 1]] = [data.news[j + 1], data.news[j]];
          }
        }
      }
    });
}
//获取视频链接
function getVideo() {
  // request.vedioCount().then((res) => {
  //   data.videos = res.data;
  //   // console.log(data);
  // });
  axios
    .get("https://news.dahebao.cn/dahe/fanwenapi/vedioCountList.do")
    .then((res: any) => {
      data.videos = res.data;
    })
    .then(() => {
      // console.log(data.videos);
      for (let i = 0; i < data.videos.length; i++) {
        for (let j = 0; j < data.videos.length - 1; j++) {
          if (
            data.videos[j + 1].short_video_publish_time >
            data.videos[j].short_video_publish_time
          ) {
            [data.videos[j], data.videos[j + 1]] = [
              data.videos[j + 1],
              data.videos[j],
            ];
          }
        }
      }
    });
}
//点击播放新闻
function clickVideo(e: any) {
  data.video = e;
  broadVideo.value = true;
}
//点击跳转新闻
function clickNew(e: any) {
  window.open(
    `https://news.dahebao.cn/dahe/appcommunity/${data.news[e].news_id}?newsId=${data.news[e].news_id}`
  );
}
//定时器，每五分钟刷新一次
setInterval(() => {
  getNewsreport();
  getVideo();
}, 300000);

onMounted(() => {
  getNewsreport();
  getVideo();
});
</script>

<style lang="less" scoped>
.contanier {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: 50%;
    background-image: url("@/assets/3-bg/10.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    position: relative;
  }
  footer {
    width: 100%;
    height: 50%;
    background-image: url("@/assets/3-bg/10.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  .el-dialog {
    .video {
      width: 100%;
      height: 100%;
    }
  }
  .empty {
    width: 100%;
    height: 80px;
  }
  .text {
    background-image: url("@/assets/3-bg/23.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    width: 82%;
    height: 90px;
    line-height: 28px;
    margin-bottom: 15px;
    font-size: 20px;
    box-sizing: border-box;
    padding: 6px 15px;
    cursor: pointer;
    .introduce {
      height: 56px;
      overflow: hidden;
      color: #82aefb;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .time {
      text-align: right;
      color: #82aefb;
      //  color:   rgb(25 25 112 0.5);
    }
  }
  .title {
    width: 60%;
    height: 50px;
    background-image: url("@/assets/4-bg/14-title.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    text-align: center;
    font-size: 25px;
    line-height: 55px;
    // background-image: -webkit-linear-gradient(bottom, #fff, #006eff);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    span {
      background-image: -webkit-linear-gradient(bottom, #fff, #006eff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .pagination {
    background-color: #00122f;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
::v-deep .el-pagination.is-background .el-pager li {
  background-color: rgb(25 25 112 0.5);
  border: #6495ed solid 1px;
}
::v-deep .el-pagination.is-background .btn-prev {
  background-color: rgb(25 25 112 0.5);
  border: #6495ed solid 1px;
}
::v-deep .el-pagination.is-background .btn-next {
  background-color: rgb(25 25 112 0.5);
  border: #6495ed solid 1px;
}
::v-deep .el-dialog {
  width: 60%;
  padding: 0;
  background-color: var(--el-overlay-color-lighter);
}
::v-deep .el-dialog__title {
  color: #fff;
  font-size: 35px;
  text-align: center;
}
</style>
