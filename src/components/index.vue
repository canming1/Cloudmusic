<template lang="">
  <div class="index-container">
    <!-- 左侧导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/playlist">推荐歌单</router-link>
        </li>
        <li>
          <router-link to="/songs">最新音乐</router-link>
        </li>
        <li>
          <router-link to="/mvs">最新MV</router-link>
        </li>
      </ul>
    </div>
    <!-- 右侧路由 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      musicUrl: ''
    }
  }
}
</script>
<style lang="less">
* {
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    font-weight: 400;
  }
}
.index-container {
  display: flex;
  .nav {
    width: 200px;
    background-color: #ededed;
    li {
      height: 60px;
      cursor: pointer;
      display: flex;
      align-items: center;
      a {
        text-decoration: none;
        color: black;
        padding-left: 30px;
        font-size: 18px;
        line-height: 60px;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  audio {
    width: 100%;
    border-radius: none;
    outline: none;
  }
}
.main {
  flex: 1;
  padding: 10px 20px;
}
</style>
