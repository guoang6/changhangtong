<template>
  <div class="main">
    <el-container style="height: 100vh;">
        <el-menu
          :default-openeds="[]"
          router
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
         
        >
          <el-menu-item style="  color: white; font-size:20px">
            <a class="iconfont" v-if="isCollapse"  @click="changeCollapse" >&#xe64b;</a>

            <span slot="title" >“昌航通”信息平台</span>
          </el-menu-item>
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
              <i class="el-icon-folder-checked"></i>
              <span slot="title">审核中心</span>
            </template>
            <el-menu-item index="/contentexamine">内容审核</el-menu-item>
            <el-menu-item index="1-2">留言审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">认证中心</span>
            </template>
            <el-menu-item index="2-1">学生认证</el-menu-item>
            <el-menu-item index="2-2">公司认证</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">网站管理中心</span>
            </template>

            <el-menu-item index="3-1">标签管理</el-menu-item>
            <el-menu-item index="3-2">预留</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span slot="title">反馈中心</span>
            </template>

            <el-menu-item index="3-1">意见反馈</el-menu-item>
            <el-menu-item index="3-2">违规举报</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">账号管理</span>
            </template>
            <el-menu-item index="4-1">标签管理</el-menu-item>
            <el-menu-item index="4-2">预留</el-menu-item>
          </el-submenu>
        </el-menu>

      <el-container style=" position:relative ;">
        <el-header>
          <li style="position: absolute;top: 0;left: 60px; font-size:20px">
            <span style="font-size:20px" v-if="isCollapse">“昌航通”信息平台</span>
                <a class="iconfont" @click="changeCollapse" v-if="!isCollapse">&#xe61f; </a>
          </li>
      

          <span style="margin-right: 30px">王小虎</span>
          <span>退出</span>
        </el-header>

        <el-main style=" padding: 0px; background-color: #f7f7f7;">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      isCollapse: true
    };
  },
  methods:{
changeCollapse(){
  this.isCollapse=!this.isCollapse
}
  }
};
</script>
<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
.el-header {
  text-align: right;
  font-size: 12px;
  background-color: #545c64;
  color: white;
  line-height: 60px;
  text-align: right;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  color: white;
}
</style>