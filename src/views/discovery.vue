<template lang="">
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="tolist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">热门推荐</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <!-- 播放音乐按钮 -->
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index" @click="tomv(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <span class="iconfont icon-play"></span>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- Mv名字 -->
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async created() {
    // 轮播图
    const { data: banner } = await this.$http.get('/banner')
    this.banners = banner.banners
    // 推荐歌单、
    const { data: lists } = await this.$http.get('/personalized?limit=12')
    // console.log(lists)
    this.list = lists.result
    // 最新音乐
    const { data: songs } = await this.$http.get('/personalized/newsong')
    // console.log(songs)
    this.songs = songs.result
    const { data: mvs } = await this.$http.get('/personalized/mv')
    console.log(mvs)
    this.mvs = mvs.result
  },
  data() {
    return {
      // 推荐歌单
      list: [],
      songs: [],
      mvs: [],
      // 轮播图
      banners: []
    }
  },
  methods: {
    async playMusic(id) {
      const { data: res } = await this.$http.get('/song/url?id=' + id)
      const url = res.data[0].url
      this.$parent.musicUrl = url
    },
    tolist(id) {
      this.$router.push(`/list?q=${id}`)
    },
    tomv(id) {
      this.$router.push(`/mv?q=${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.el-carousel__container {
  height: 230px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.recommend {
  margin-bottom: 40px;
  .items {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 200px;
      margin: 10px;
      position: relative;
      overflow: hidden;
      img {
        width: 200px;
        height: 200px;
        border-radius: 5px;
      }
    }
  }
}
.title {
  font-weight: normal;
  margin-bottom: 20px;
  padding-left: 8px;
}
.desc-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
  span {
    font-size: 14px;
  }
}
.item:hover .desc-wrap {
  top: 0;
}
.recommend {
  .img-wrap {
    position: relative;
    .icon-play {
      position: absolute;
      font-size: 20px;
      right: 10px;
      bottom: 13px;
      width: 40px;
      height: 40px;
      color: skyblue;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      opacity: 0;
      ::before {
        transform: translateX(3px);
      }
    }
  }
}
.img-wrap:hover .icon-play {
  opacity: 0.8;
}

.recommend {
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
  }
}

.news {
  margin-bottom: 40px;
  .items {
    height: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 15px;
    .item {
      height: 100px;
      width: 50%;
      display: flex;
      align-items: center;
      .img-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
.index {
  margin-right: 15px;
  font-size: 15px;
}
.news {
  .item:hover {
    background-color: #f5f5f5;
  }
}
.news {
  .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    color: skyblue;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
  }
}
.song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 50px;
  font-size: 16px;
  .singer {
    font-size: 14px;
    color: gray;
  }
}
.mvs {
  .items {
    display: flex;
    justify-content: space-around;
    .item {
      width: 250px;
      cursor: pointer;
      .img-wrap {
        width: 100%;
        position: relative;
        img {
          width: 100%;
          height: 200px;
          border-radius: 5px;
        }
      }
    }
  }
}
.mvs {
  .icon-play:nth-child(2) {
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
    background-color: rgba(255, 255, 255, 0.8);
    opacity: 0;
  }
}
.img-wrap:hover .icon-play {
  opacity: 0.8;
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
  .icon-play {
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-right: 5px;
  }
}
.info-wrap {
  margin-bottom: 60px;
  .name {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .singer {
    font-size: 14px;
    color: #c5c5c5;
  }
}
</style>
