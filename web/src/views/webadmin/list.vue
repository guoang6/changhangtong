<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">问答</el-menu-item>
  <el-menu-item index="1">活动</el-menu-item>
  <el-menu-item index="1">二手</el-menu-item>
  <el-menu-item index="1">新闻</el-menu-item>
  <el-menu-item index="1">招聘</el-menu-item>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
</el-menu>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>