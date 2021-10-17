<template lang="">
  <div class="list-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="list.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ list.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="list.creator.avatarUrl" alt="" />
          <span class="name">{{ list.creator.nickname }}</span>
          <span class="time">{{ list.createTime }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in list.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ list.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs>
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in list.tracks" :key="index" @click="playMusic(item.id)">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span v-if="item.mv" class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="2">
        <!-- 热门评论 -->
        <div class="comment-wrap">
          <p class="title">
            热门评论<span class="number">({{ totalComment }})</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in hotComment" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}：</span>
                  <!-- 内容 -->
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 回复
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{ item.beReplied.user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied.content }}</span>
                </div> -->
                <div class="date">{{ item.time | Time }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">全部评论 ({{ total }})</p>
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
                  <span class="name"></span>
                  <span class="comment"></span>
                </div> -->
                <div class="date">{{ item.time | Time }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="page" @current-change="handleCurrentPage"> </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: {},
      hotComment: [],
      totalComment: 0,
      comments: [],
      total: 0,
      page: 1
    }
  },
  async created() {
    // 获取歌单详情
    const { data: res } = await this.$http.get(`/playlist/detail?id=${this.$route.query.q}`)
    // console.log(res)
    this.list = res.playlist
    // 获取评论
    const { data: hotcomments } = await this.$http.get(`/comment/hot?type=2&id=${this.$route.query.q}`)
    // console.log(hotcomments)
    this.hotComment = hotcomments.hotComments
    this.totalComment = hotcomments.total
    // 全部评论
    const { data: comments } = await this.$http.get(`/comment/playlist?id=${this.$route.query.q}`)
    console.log(comments)
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
  },
  methods: {
    async handleCurrentPage(val) {
      this.page = val
      const { data: comments } = await this.$http.get(`/comment/playlist?id=${this.$route.query.q}&offset=${(this.page - 1) * 20}`)
      // console.log(comments)
      this.comments = comments.comments
      this.total = comments.total
    },
    async playMusic(id) {
      const { data: res } = await this.$http.get('/song/url?id=' + id)
      const url = res.data[0].url
      this.$parent.musicUrl = url
    }
  }
}
</script>
<style lang="less" scoped>
.list-container {
  margin: auto;
  padding-top: 40px;
  .top-wrap {
    display: flex;
    .img-wrap {
      margin-right: 30px;
      img {
        width: 230px;
        height: 230px;
      }
    }
  }
}
.name {
  margin-right: 10px;
}
.time {
  font-size: 14px;
}
.title {
  margin-bottom: 20px;
}
.play-wrap {
  width: 120px;
  height: 35px;
  border-radius: 4px;
  background: linear-gradient(to right, #e85e4d, #c6483c);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  span {
    color: white;
  }
}
.tag-wrap {
  display: flex;
  margin-bottom: 15px;
  span {
    margin: 0;
  }
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    li {
      font-size: 15px;
    }
    li:not(:last-child)::after {
      content: '/';
      margin: 0 4px;
    }
  }
}
.author-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
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
.el-table {
  border-bottom: none;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 60px;
}
th {
  border-bottom: none;
}
th:first-child {
  padding-left: 10px;
}
th:first-child {
  width: 50px;
}
th:nth-child(2) {
  width: 200px;
}
th:nth-child(3) {
  width: 200px;
}
th:nth-child(4) {
  width: 200px;
}
th:nth-child(5) {
  width: 200px;
}
.song-wrap {
  span {
    margin-top: 20px;
    display: inline-block;
    color: #bebebe;
  }
  .icon-mv {
    padding-left: 5px;
    color: #dd6d60;
  }
}
.el-table {
  .img-wrap {
    position: relative;
    width: 70px;
    height: 70px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
    }
  }
}
.icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: skyblue;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  ::before {
    transform: translateX(1px);
  }
}
tr:nth-child(2n) {
  background-color: #fafafa;
}
tr:hover {
  background-color: #f5f7fa;
}
.comment-wrap {
  margin-bottom: 70px;
  .number {
    color: black;
    font-size: 18px;
  }
}
.date {
  color: #bebebe;
  font-size: 14px;
}
.re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}
.el-pagination {
  margin-bottom: 60px;
  text-align: center;
}
</style>
