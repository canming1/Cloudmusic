<template lang="">
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }">
        韩国
      </span>
    </div>
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
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <el-image :src="item.album.picUrl" alt="" lazy></el-image>
              <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span v-if="item.mv" class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | formatTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [],
      tag: '0'
    }
  },
  created() {
    this.songsData()
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
  watch: {
    tag() {
      this.songsData()
    }
  },
  methods: {
    async songsData() {
      const { data: songs } = await this.$http.get(`/top/song?type=${this.tag}`)
      // console.log(songs)
      this.lists = songs.data
    },
    async playMusic(id) {
      const { data: res } = await this.$http.get(`/song/url?id=${id}`)
      const url = res.data[0].url
      this.$parent.musicUrl = url
    }
  }
}
</script>
<style lang="less" scoped>
.tab-bar {
  display: flex;
  justify-content: flex-end;
  .item {
    font-size: 15px;
    color: gray;
    margin-right: 20px;
    cursor: pointer;
  }
  .active {
    color: #dd6d60;
  }
}
.el-table {
  border-bottom: none;
  border-collapse: collapse;
  text-align: left;
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
</style>
