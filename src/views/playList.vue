<template lang="">
  <div class="playList-container">
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">{{ topList.copywriter }}</div>
        <!-- 介绍 -->
        <div class="info">{{ topList.description }}</div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="background" />
      <!-- 蒙层 -->
      <div class="mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 -->
      <div class="tab-bar">
        <span class="item" :class="{ active: tag == '全部' }" @click="tag = '全部'">
          全部
        </span>
        <span class="item" :class="{ active: tag == '欧美' }" @click="tag = '欧美'">
          欧美
        </span>
        <span class="item" :class="{ active: tag == '华语' }" @click="tag = '华语'">
          华语
        </span>
        <span class="item" :class="{ active: tag == '流行' }" @click="tag = '流行'">
          流行
        </span>
        <span class="item" :class="{ active: tag == '说唱' }" @click="tag = '说唱'">
          说唱
        </span>
        <span class="item" :class="{ active: tag == '摇滚' }" @click="tag = '摇滚'">
          摇滚
        </span>
        <span class="item" :class="{ active: tag == '民谣' }" @click="tag = '民谣'">
          民谣
        </span>
        <span class="item" :class="{ active: tag == '日语' }" @click="tag = '日语'">
          日语
        </span>
        <span class="item" :class="{ active: tag == '轻音乐' }" @click="tag = '轻音乐'">
          轻音乐
        </span>
        <span class="item" :class="{ active: tag == '影视原声' }" @click="tag = '影视原声'">
          影视原声
        </span>
        <span class="item" :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'">
          ACG
        </span>
        <span class="item" :class="{ active: tag == '怀旧' }" @click="tag = '怀旧'">
          怀旧
        </span>
        <span class="item" :class="{ active: tag == '治愈' }" @click="tag = '治愈'">
          治愈
        </span>
        <span class="item" :class="{ active: tag == '旅行' }" @click="tag = '旅行'">
          旅行
        </span>
      </div>
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index" @click="tolist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量：<span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page"> </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tag: '全部',
      list: [],
      // 顶部的推荐歌单
      topList: {},
      total: 0,
      page: 1
    }
  },
  watch: {
    tag() {
      this.topData()
      this.listData()
      this.page = 1
    }
  },
  created() {
    this.topData()
    this.listData()
  },
  methods: {
    async topData() {
      const { data: topLists } = await this.$http.get(`/top/playlist/highquality?limit=1&cat=${this.tag}`)
      // console.log(topLists)
      this.topList = topLists.playlists[0]
    },
    async listData() {
      const { data: lists } = await this.$http.get(`/top/playlist?limit=12&order=hot&cat=${this.tag}&offset=${(this.page - 1) * 12}`)
      this.total = lists.total
      this.list = lists.playlists
    },
    handleCurrentChange(val) {
      console.log(`${val}`)
      this.page = val
      this.listData()
    },
    tolist(id) {
      this.$router.push(`/list?q=${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.top-card {
  padding: 20px;
  height: 200px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  .background {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    filter: blur(20px);
  }
  .mask {
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rbga(0, 0, 0, 0.5);
  }
  .icon-wrap {
    margin-right: 20px;
    z-index: 1;
    img {
      width: 160px;
      height: 160px;
    }
  }
}
.content-wrap {
  z-index: 1;
  .tag {
    color: pink;
    border: 1px solid pink;
    width: 100px;
    height: 30px;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
  }
  .title {
    color: white;
    padding-top: 10px;
  }
  .info {
    color: #888482;
    font-size: 14px;
    padding-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orent: vertical;
    -webkit-line-clamp: 5;
  }
}
.tab-container {
  padding-top: 30px;
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
}
.tab-content {
  margin-top: 20px;
  .items {
    display: flex;
    flex-wrap: wrap;
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
}
.num-wrap {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  color: white;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.5);
  height: 30px;
  width: 100%;
  padding-left: 5px;
  top: -30px;
  overflow: hidden;
}
.item:hover .num-wrap {
  top: 0;
}
.img-wrap {
  position: relative;
  .icon-play {
    position: absolute;
    right: 10px;
    bottom: 13px;
    width: 40px;
    height: 40px;
    color: skyblue;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
    ::before {
      transform: translateX(3px);
    }
  }
}
.img-wrap:hover .icon-play {
  opacity: 1;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
.el-pagination {
  margin-bottom: 50px;
  text-align: center;
}
</style>
