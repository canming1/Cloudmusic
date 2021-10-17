<template lang="">
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="headinfo" alt="" />
          </div>
          <span class="name">{{ info.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ info.name }}</h2>
          <span class="date">发布：{{ info.publishTime }}</span>
          <span class="number">播放：{{ info.playCount }}次</span>
          <p class="desc">简介：{{ info.desc }}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">热门评论<span class="number"></span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in hotcomments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div> -->
              <div class="date">{{ item.time | Time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number"></span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div> -->
              <div class="date">{{ item.time | Time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page"> </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in mv" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration | formatTime }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      url: '',
      mv: [],
      info: {},
      headinfo: '',
      hotcomments: [],
      comments: []
    }
  },
  methods: {
    async handleCurrentChange(val) {
      this.page = val
      const { data: comments } = await this.$http.get(`/comment/mv?id=${this.$route.query.q}&offset=${(this.page - 1) * 20}`)
      // console.log(comments)
      this.hotcomments = comments.hotComments
      this.comments = comments.comments
      this.total = comments.total
    }
  },
  async created() {
    // 获取歌单详情
    const { data: url } = await this.$http.get(`/mv/url?id=${this.$route.query.q}`)
    // console.log(url)
    this.url = url.data.url
    // 获取相似MV
    const { data: recommendmv } = await this.$http.get(`/simi/mv?mvid=${this.$route.query.q}`)
    // console.log(recommendmv)
    this.mv = recommendmv.mvs
    // 获取MV信息
    const { data: message } = await this.$http.get(`/mv/detail?mvid=${this.$route.query.q}`)
    // console.log(message)
    this.info = message.data
    // 获取头像信息
    const { data: headinfo } = await this.$http.get(`/artist/detail?id=${this.info.artists[0].id}`)
    // console.log(headinfo)
    this.headinfo = headinfo.data.artist.cover
    // 获取评论
    const { data: comments } = await this.$http.get(`/comment/mv?id=${this.$route.query.q}&offset=${(this.page - 1) * 20}`)
    console.log(comments)
    this.hotcomments = comments.hotComments
    this.comments = comments.comments
    this.total = comments.total
  },
  filters: {
    formatTime(value) {
      let mins = Math.floor(value / (60 * 1000))
      let seconds = Math.floor(value % 60)
      mins = mins > 9 ? mins : '0' + mins
      seconds = seconds > 9 ? seconds : '0' + seconds
      return mins + ':' + seconds
    },
    Time(originVal) {
      // 先把传参毫秒转化为new Date()
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      // 月份是从0开始,需要+1。  +''是把数字转化为字符串,padStart(2,'0')是把字符串设置为2位数,不足2位则在开头加'0'
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d}-${hh}:${mm}:${ss}`
    }
  }
}
</script>
<style lang="less" scoped>
.mv-container {
  display: flex;
  .mv-wrap {
    width: 700px;
    margin-right: 35px;
    .date {
      margin-right: 25px;
    }
    .number {
      color: #bebebe;
      font-size: 14px;
    }
  }
}
.video-wrap {
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
  video {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    outline: none;
  }
}
.info-wrap {
  margin-bottom: 50px;
  .singer-info {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    .avatar-wrap {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
  }
}
.title {
  font-size: 30px;
}
.desc {
  font-size: 15px;
  margin-top: 20px;
}
.comment-wrap {
  margin-bottom: 70px;
  .item {
    display: flex;
    padding-top: 20px;
    .icon-wrap {
      margin-right: 15px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .title {
    font-size: 25px;
    .number {
      color: black;
      font-size: 20px;
    }
  }
}
.mv-recommend {
  flex: 1;
  .items {
    display: flex;
    flex-wrap: wrap;
    .item {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      .img-wrap {
        width: 180px;
        position: relative;
        margin-right: 10px;
        img {
          width: 180px;
          border-radius: 5px;
        }
      }
    }
  }
}
.icon-play:nth-child(2) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}
.img-wrap:hover > .icon-play {
  opacity: 1;
}
.num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}
.el-pagination {
  margin-bottom: 60px;
  text-align: center;
}
</style>
