<template>
    <div class="adminhome">
         <div class="min">
              <el-container style="min-height: 500px;; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <el-menu-item index="4">
        <i class="el-icon-s-shop"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-submenu >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>问答</span>
        </template>
          <el-menu-item index="/">提问</el-menu-item>
          <el-menu-item index="1-4-1">评论管理</el-menu-item>
      </el-submenu>
       <el-submenu  disabled>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>线下线上活动</span>
        </template>
          <el-menu-item index="1-4-1">发布活动</el-menu-item>
          <el-menu-item index="1-4-1">评论管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-main>
     1111111111111111111111111111111111111111111111111111111
    </el-main>
  </el-container>
</el-container>


         </div>
    </div>
</template>
<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
.min{
    width: 70%;
    min-height: 500px;
    margin-left: 15%;
}
</style>