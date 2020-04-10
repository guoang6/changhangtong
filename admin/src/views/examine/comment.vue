<template>
  <div class="comment">
    <el-main>
      <div class="top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>审核中心</el-breadcrumb-item>
          <el-breadcrumb-item>评论审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="main">
        <el-table :data="tableData" border style="width: 100%" @expand-change="getreply">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.child" style="width: 100%">
                <el-table-column prop="createtime" label="创建日期">
                  <template slot-scope="scope">{{ scope.row.comment_createtime | dataFormat }}</template>
                </el-table-column>
                <el-table-column label="回复者" prop="nickname"></el-table-column>
                <el-table-column label="被回复者" prop="tousernickname"></el-table-column>
                <el-table-column label="内容" prop="desc"></el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column prop="createtime" label="创建日期">
            <template slot-scope="scope">{{ scope.row.comment_createtime | dataFormat }}</template>
          </el-table-column>
          <!-- <el-table-column label="内容id" prop="content_id">
              <template slot-scope="scope">评论内容</template>
              </el-table-column> 
          -->
          <el-table-column label="评论者" prop="nickname"></el-table-column>

          <el-table-column label="评论内容" prop="desc"></el-table-column>
        </el-table>

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
  name: "comment",
  data() {
    return {
      loading: false,

      pagelistquery: {
        total: 0,
        page: 1,
        pagesize: 10
      },
      tableData: []
    };
  },
  methods: {
    async getreply(row) {
      let res = await this.$axios.post(
        "/admin/getreply",
        this.qs.stringify(row)
      );
      if (res.data.state.type === "SUCCESS") {
        console.log(res.data.data);
        for (let index = 0; index < this.tableData.length; index++) {
          if (this.tableData[index].comment_id === row.comment_id) {
          this.tableData[index].child = res.data.data;
              console.log(this.tableData[index])
          }
        }
      
      }
       
    },
    registered() {
      const userReg = /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{5,9}$/; //6-10位字母数字
      const pwdReg = /^[a-zA-Z]\w{5,17}$/; //6-18位字母数字下划线 字母开头
      if (!userReg.test(this.user.username)) {
        this.$message.error("账号为6-10位字母数字字母");
        return;
      }
      if (!pwdReg.test(this.user.password)) {
        this.$message.error("密码为6-18位字母数字或下划线 字母开头");
        return;
      }
      if (this.user.password !== this.user.password1) {
        this.$message.error("两次密码不相等");
        return;
      }
      this.$axios({
        url: "/admin/registered",
        method: "POST",
        data: this.qs.stringify(this.user)
      })
        .then(res => {
          let data = res.data;
          if (data.state.type !== "SUCCESS") {
            if (data.state.type == "ERROR_PARAMS_EXIST") {
              this.$message.error("账户名重复");
            } else {
              this.$message.error("账号添加失败失败");
            }
            return;
          }
          this.$message.success("账号添加成功");
          this.dialogFormVisibleadd = false;
          this.getadminlist();
        })
        .catch(e => {
          this.$message.error(e);
        });
    },
    async changestate(row) {
      console.log(row);
      let res = await this.$axios.post(
        "/admin/changeadminstate",
        this.qs.stringify(row)
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("更改授权成功");
      }
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
    changepw(row) {
      this.dialogpw = true;
      this.changepassword = row;
    },

    //删除用户
    async deleteuser(row) {
      let data = {
        user_id: row.user_id,
        usertype: "admin"
      };
      let res = await this.$axios.post(
        "/admin/deleteuser",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("删除成功");
        this.getadminlist();
      }
    },
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getcommentlist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getcommentlist();
      console.log(`当前页: ${val}`);
    },
    async getcommentlist() {
      this.loading = true;
      let res = await this.$axios.post(
        "/admin/getcomment",
        this.qs.stringify(this.pagelistquery)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data.data);
        this.pagelistquery.total = res.data.count;
      }
      this.loading = false;
    }
  },
  created() {
    this.getcommentlist();
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
.comment {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
}
</style>