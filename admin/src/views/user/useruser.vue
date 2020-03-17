<template>
  <div class="useruser">
    <el-main>
      <div class="top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>普通用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="main">
        <div class="search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.user" placeholder="账号查找"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.region" placeholder="实名认证状态">
                <el-option label="全部" value="beijing"></el-option>
                <el-option label="未认证" value="beijing"></el-option>
                <el-option label="待认证" value="beijing"></el-option>
                <el-option label="认证通过" value="shanghai"></el-option>
                <el-option label="认证失败" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.region" placeholder="公司认证状态">
                <el-option label="全部" value="beijing"></el-option>
                <el-option label="未认证" value="beijing"></el-option>
                <el-option label="待认证" value="beijing"></el-option>
                <el-option label="认证通过" value="shanghai"></el-option>
                <el-option label="认证失败" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="realstate" label="实名认证状态">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="changerealstatedialog(scope.row)"
              >{{ scope.row.realstate |userstatefilter}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="companystate" label="公司认证状态">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="changecompanystatedialog(scope.row)"
              >{{ scope.row.companystate |userstatefilter}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="companystate" label="账号状态">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="changecompanystatedialog(scope.row)"
              >{{ scope.row.companystate |userstatefilter}}</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="del(scope.row.help_id)">解封</el-button>
              <el-button type="text" size="small" @click="del(scope.row.help_id)">封禁</el-button>
            </template>
          </el-table-column>
        </el-table>
               <!--公司信息认证-->
        <el-dialog title="公司信息认证" :visible.sync="dialogcompany">
          <div v-if="changecompanystateuser.realstate===1">
             <img src="../../assets/img/noinfo.png" width="100%" alt="">
             <div style="width:100%;text-align:center" >该用户还没有添加认证信息</div>
          </div>
          <el-form v-else>
            <el-form-item label="公司名称"> {{changecompanystateuser.realname}}</el-form-item>
            <el-form-item label="相关信息图片">
              <img
                v-for="(img,id) in changecompanystateuser.companyimg"
                style="width:40% ;margin:20px"
                :key="id"
                :src="img.url"
                alt
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" v-if="changecompanystateuser.companystate===1">
            <el-button @click="dialogcompany = false">取消</el-button>
          </div>
          <div slot="footer" v-else class="dialog-footer">
            <el-button type="primary" v-if="changecompanystateuser.companystate!==3" @click="changestate('companystate',3)">通过认证</el-button>
            <el-button type="danger" @click="changestate('companystate',0)">不通过认证</el-button>
            <el-button @click="dialogcompany = false">取消</el-button>
          </div>
        </el-dialog>
        <!--用户信息认证-->
        <el-dialog title="用户认证信息" :visible.sync="dialogstudent">
          <div v-if="changerealstateuser.realstate===1">
             <img src="../../assets/img/noinfo.png" width="100%" alt="">
             <div style="width:100%;text-align:center" >该用户还没有添加认证信息</div>
          </div>
          <el-form v-else>
            <el-form-item label="学号"> {{changerealstateuser.realname}}</el-form-item>
            <el-form-item label="姓名">{{changerealstateuser.studentid}}</el-form-item>
            <el-form-item label="学生证">
              <img
                v-for="(img,id) in changerealstateuser.studentcard"
                style="width:40% ;margin:20px"
                :key="id"
                :src="img.url"
                alt
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" v-if="changerealstateuser.realstate===1">
            <el-button @click="dialogstudent = false">取消</el-button>
          </div>
          <div slot="footer" v-else class="dialog-footer">
            <el-button type="primary" v-if="changerealstateuser.realstate!==3" @click="changestate('realstate',3)">通过认证</el-button>
            <el-button type="danger" @click="changestate('realstate',0)">不通过认证</el-button>
            <el-button @click="dialogstudent = false">取消</el-button>
          </div>
        </el-dialog>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagelistquery.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagelistquery.total"
          style="margin-top: 20px;"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "useruser",
  data() {
    return {
      changerealstateuser: {}, //正在审核的用户信息
      changecompanystateuser:{},//公司认证信息
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
    }
  },
  methods: {
    async changestate(type,state){
     let data={
         type:type,
         state:state,
         user_id:this.changerealstateuser.user_id
      }
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
      this.gethelplist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.gethelplist();
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
.useruser {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
}
</style>