<template>
  <div class="main">
    <el-container style="height: 100vh;">
  <el-aside width="200px"  style="background-color: #545c64"
     >
          <el-menu :default-openeds="[]"
          router
        default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="/admin">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">仪表盘</span>
            </el-menu-item>
        <el-menu-item index="/admin">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
           
            <i class="el-icon-folder-checked"></i>审核中心
          </template>
            <el-menu-item index="1-1">内容审核</el-menu-item>
            <el-menu-item index="1-2">留言审核</el-menu-item>

        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>认证中心
          </template>
         <el-menu-item index="2-1">学生认证</el-menu-item>
            <el-menu-item index="2-2">公司认证</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>网站管理中心
          </template>
        >
            <el-menu-item index="3-1">标签管理</el-menu-item>
            <el-menu-item index="3-2">预留</el-menu-item>
         
        </el-submenu>
         <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>反馈中心
          </template>
        >
            <el-menu-item index="3-1">意见反馈</el-menu-item>
            <el-menu-item index="3-2">违规举报</el-menu-item>
         
        </el-submenu>
         <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>账号管理
          </template>
        >
            <el-menu-item index="4-1">标签管理</el-menu-item>
            <el-menu-item index="4-2">预留</el-menu-item>
         
        </el-submenu>
      </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

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
