<template lang="">
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到结果有{{ count }}条</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="歌曲">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in songList" :key="index" @dblclick="playMusic(item.id)">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span v-if="item.mv != 0" class="iconfont icon-mv"></span>
                  </div>
                  <span></span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="歌单">
        <div class="items">
          <div class="item" v-for="(item, index) in lists" :key="index" @click="tolist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量：<span>{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="MV">
        <div class="items mv">
          <div class="item" v-for="(item, index) in mvs" :key="index" @click="tomv(item.id)">
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
              <div class="singer">{{ item.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: '歌曲',
      songList: [],
      count: 0,
      lists: [],
      mvs: []
    }
  },
  filters: {
    formatTime(value) {
      let mins = Math.floor(value / (60 * 1000))
      let seconds = Math.floor(value % 60)
      mins = mins > 9 ? mins : '0' + mins
      seconds = seconds > 9 ? seconds : '0' + seconds
      return mins + ':' + seconds
    }
  },
  async created() {
    const { data: res } = await this.$http.get(`/cloudsearch?type=1&keywords=${this.$route.query.q}`)
    console.log(res)
    this.songList = res.result.songs
    this.count = res.result.songCount
  },
  methods: {
    async playMusic(id) {
      const { data: res } = await this.$http.get('/song/url?id=' + id)
      const url = res.data[0].url
      this.$parent.musicUrl = url
    },
    // 去歌单详情页
    tolist(id) {
      this.$router.push(`/list?q=${id}`)
    },
    tomv(id) {
      this.$router.push(`/mv?q=${id}`)
    }
  },
  watch: {
    async activeName() {
      let type = 1
      switch (this.activeName) {
        case '歌曲':
          type = 1
          break
        case '歌单':
          type = 1000
          break
        case 'MV':
          type = 1004
      }
      if (type === 1) {
        const { data: res } = await this.$http.get(`/cloudsearch?type=${type}&keywords=${this.$route.query.q}`)
        // console.log(res)
        this.songList = res.result.songs
        this.count = res.result.songCount
      } else if (type === 1000) {
        const { data: res } = await this.$http.get(`/cloudsearch?type=${type}&keywords=${this.$route.query.q}`)
        // console.log(res)
        this.lists = res.result.playlists
        this.count = res.result.playlistCount
      } else {
        const { data: res } = await this.$http.get(`/cloudsearch?type=${type}&keywords=${this.$route.query.q}`)
        console.log(res)
        this.mvs = res.result.mvs
        this.count = res.result.mvCount
      }
    }
  }
}
</script>
<style lang="less" scoped>
.title-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  .title {
    margin-right: 10px;
  }
  .sub-title {
    font-size: 15px;
    color: #bebebe;
  }
}
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    width: 200px;
    margin: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }
  }
}
.icon-play:nth-child(2),
.icon-play:last-child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: skyblue;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}
.num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}
.time {
  position: absolute;
  bottom: 65px;
  right: 5px;
  color: white;
  font-size: 15px;
}
.name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.singer {
  font-size: 14px;
  color: #c5c5c5;
}
.el-table {
  border-bottom: none;
  border-collapse: collapse;
  text-align: left;
}
td {
  height: 60px;
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
.icon-mv {
  color: #dd6d60;
}
tr:nth-child(2n) {
  background-color: #fafafa;
}
tr:hover {
  background-color: #f5f7fa;
}
</style>
