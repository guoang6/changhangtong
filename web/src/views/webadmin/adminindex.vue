 <template>
  <div class="adminhome">
    <div class="min">
      <el-container style="min-height: 500px;; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router default-active="2" class="el-menu-vertical-demo">

            <el-menu-item index="/admin">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
             <el-menu-item index="/admin/myself">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人信息编辑</span>
            </el-menu-item>
            
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>问答</span>
              </template>
              <el-menu-item index="/admin/createhelp">提问</el-menu-item>
              <el-menu-item index="/admin/createhelplist">提问列表</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>线下线上活动</span>
              </template>
              <el-menu-item index="/admin/createactivity">发布活动</el-menu-item>
              <el-menu-item index="/admin/createactivitylist">活动列表</el-menu-item>
            </el-submenu>            
             <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>招聘</span>
              </template>
              <el-menu-item index="/admin/company">公司信息</el-menu-item>
              <el-menu-item index="/admin/job">发布工作</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>二手交易</span>
              </template>
              <el-menu-item index="/admin/createoldstuff">二手发布</el-menu-item>
              <el-menu-item index="1-4-1">二手列表</el-menu-item>
 </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>文章与新闻</span>
                </template>
                <el-menu-item index="/admin/createarticle">发布文章</el-menu-item>
                <el-menu-item index="1-4-1">文章列表</el-menu-item>
              </el-submenu>

               <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>赏金</span>
                </template>
                <el-menu-item index="/admin/createactivity">发布赏金</el-menu-item>
                <el-menu-item index="1-4-1">赏金列表</el-menu-item>
              </el-submenu>
           

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