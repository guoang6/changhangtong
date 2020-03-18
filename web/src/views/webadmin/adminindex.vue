 <template>
  <div class="adminhome">
<div v-title data-title="昌航通 | 个人中心 "></div>

    <div class="min">
      <el-container style="min-height: 700px; border: 1px solid #eee">
        <el-aside width="200px" style="    background-color: #fff;">
          <el-menu router default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="/admin">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-menu-item index="/admin/myself">
              <i class="el-icon-user-solid"></i>
              <span slot="title">账户管理</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我发布的</span>
              </template>
              <el-menu-item index="/admin/createhelplist">问答</el-menu-item>
              <el-menu-item index="/admin/createactivitylist">活动</el-menu-item>
              <el-menu-item index="/admin/createoldstufflist">二手</el-menu-item>
              <el-menu-item index="/admin/company">招聘</el-menu-item>
            </el-submenu>
 <el-menu-item index="/admin/notice">
              <i class="el-icon-bell"></i>
              <span slot="title">通知中心</span>
            </el-menu-item>

          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view />
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
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.min {
  width: 70%;
  min-height: 500px;
  margin-left: 15%;
}
</style>