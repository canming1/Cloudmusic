<template lang="">
  <div id="app">
    <!-- 头部组件 -->
    <Title></Title>
    <!-- 主体组件 -->
    <Main></Main>
  </div>
</template>
<script>
import Title from '@/components/title'
import Main from '@/components/index'
export default {
  components: {
    Title,
    Main
  }
}
</script>
<style lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: 0.5s;
}
</style>
