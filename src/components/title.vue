<template lang="">
  <div class="title-container">
    <div class="left-box">
      <div class="name-wrapper">
        <h4>明易云音乐</h4>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift" @click="back"></span>
        <span class="iconfont icon-arrow-right" @click="forward"></span>
      </div>
    </div>
    <div class="right-box">
      <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="inputValue" @change="toResult" @focus="getSearchHot"> </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    toResult() {
      if (this.inputValue === '') {
        this.$message.warning('请输入内容')
      } else {
        this.$router.push('/result?q=' + this.inputValue)
      }
    },
    back() {
      this.$router.go(-1)
    },
    forward() {
      this.$router.go(1)
    },
    async getSearchHot() {
      const { data: res } = await this.$http.get('/search/hot')
      console.log(res)
    }
  }
}
</script>
<style lang="less">
.title-container {
  display: flex;
  justify-content: space-between;
  padding: 0 0;
  height: 60px;
  background-color: rgba(236, 65, 65);
  width: 100%;
  .left-box {
    display: flex;
    .icon-wrapper {
      margin-right: 80px;
      .iconfont {
        margin-right: 10px;
        font-size: 18px;
        width: 18px;
        height: 18px;
        display: inline-block;
        text-align: center;
        line-height: 18px;
        margin: 10px;
        font-size: 30px;
      }
    }
  }
}

.name-wrapper {
  display: flex;
  align-items: center;
  h4 {
    font-size: 25px;
    color: white;
    margin-right: 60px;
    margin-left: 50px;
    letter-spacing: 10px;
  }
}
.history-wrapper {
  display: flex;
  align-items: center;
  .iconfont {
    margin: 10px;
    font-size: 30px;
    color: black;
    opacity: 0.6;
  }
}
.right-box {
  width: 200px;
  margin-right: 10px;
  margin-top: 10px;
  input {
    background-color: rgb(225, 62, 62);
    border: none;
    outline: none;
    font-size: 12px;
    color: #fff;
  }
}
</style>
