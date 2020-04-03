<template>
  <div class="myself">
    <el-main>
      <div class="top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="main">
        <div class="user-info clearfix">
          <h4>账号信息</h4>
          <el-divider></el-divider>
          <ul class="first-userInfo">
            <li class="user-li">
              账号 :
              <span class="user-name" title="726647774@qq.com">726647774@qq.com</span>
            </li>
            <li>
              昵称 :
              <span>无</span>
                <el-button type="text" size="small">修改昵称</el-button>

            </li>
            <li>
              账号创建时间 :
              <span>2020-03-14 11:29:41</span>
            </li>
          </ul>
          <ul>
            <li>
              账号状态 :
              <span>启用</span>
            </li>
            <li>
              身份 :
              <span>超级管理员</span>
            </li>
            <li>
              权限 :
              <span>超级管理员拥有所有权限</span>
            </li>
          </ul>
          <ul>
            <li>
              密码 :
                <el-button type="text" size="small">修改密码</el-button>
            </li>
          </ul>
          <div style="clear:both"></div>
          <!--占位-->
        </div>
        <div class="renwu">
          <h4>任务</h4>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "myself",
  data() {
    return {
      changerealstateuser: {}, //正在审核的用户信息
      changecompanystateuser: {}, //公司认证信息
      dialogstudent: false,
      dialogcompany: false,
      formInline: {
        user: "",
        region: ""
      },
      pagelistquery: {
        total: 0,
        page: 1,
        pagesize: 10
      },
      tableData: [] //列表信息
    };
  },
  filters: {
    userstatefilter(state) {
      if (state == 3) {
        return "认证成功";
      }
      if (state == 2) {
        return "待审核";
      }
      if (state == 1) {
        return "未认证";
      }
      if (state == 0) {
        return "认证失败";
      }
    },
    buttonfilter(state) {
      if (state == 1) {
        return "封禁";
      }
      if (state == 0) {
        return "启用";
      }
    },
    statefilter(state) {
      if (state == 1) {
        return "启用状态";
      }
      if (state == 0) {
        return "停用状态";
      }
    }
  },
  methods: {
    async changestate(type, state, userid, companyname) {
      let data = {
        type: type,
        state: state,
        user_id: userid,
        company_name: companyname
      };
      let res = await this.$axios.post(
        "/admin/changeuserstate",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("操作成功成功");
        this.getuserlist();
        this.dialogstudent = false;
        this.dialogcompany = false;
      }
    },
    //公司认证信息
    changecompanystatedialog(user) {
      this.changecompanystateuser = JSON.stringify(user);
      this.changecompanystateuser = JSON.parse(this.changecompanystateuser);
      this.changecompanystateuser.companyimg = JSON.parse(
        this.changecompanystateuser.companyimg
      );
      this.dialogcompany = true;
    },
    //学生认证信息
    changerealstatedialog(user) {
      this.changerealstateuser = JSON.stringify(user);
      this.changerealstateuser = JSON.parse(this.changerealstateuser);
      this.changerealstateuser.studentcard = JSON.parse(
        this.changerealstateuser.studentcard
      );
      this.dialogstudent = true;
    },
    async del(help_id) {
      console.log(help_id);
      let res = await this.$axios.post(
        "/webadmin/deletehelp",
        this.qs.stringify({ help_id: help_id })
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("删除成功");
        this.gethelplist();
      }
    },
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getuserlist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getuserlist();
      console.log(`当前页: ${val}`);
    },
    async getuserlist() {
      let data = {
        page: this.pagelistquery.page,
        pagesize: this.pagelistquery.pagesize
      };
      let res = await this.$axios.post(
        "/admin/getuserlist",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data);
        this.pagelistquery.total = res.data.count;
      }
    }
  },
  created() {
    this.getuserlist();
  }
};
</script>
<style  scoped>
.top {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 35px);
  padding: 12px 16px;
  background-color: #fff;
}
.myself {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 2px 20px 20px 20px;
  background-color: #fff;
}
.first-userInfo {
  padding-left: 20px;
}
.user-info ul {
  float: left;
  width: 30%;
  margin-top: -10px;
}
.user-info li {
  margin-top: 10px;
}
</style>