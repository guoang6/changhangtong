<template>
  <div class="useruser"> 
       <el-main>
         <div class="top">
          <el-breadcrumb  separator="/">

  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>普通用户管理</el-breadcrumb-item>
</el-breadcrumb>

         </div>
    

     <div class="main">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="formInline.user" placeholder="账号查找"></el-input>
  </el-form-item>
  <el-form-item >
    <el-select v-model="formInline.region" placeholder="实名认证状态">
      <el-option label="全部" value="beijing"></el-option>
      <el-option label="未认证" value="beijing"></el-option>
      <el-option label="待认证" value="beijing"></el-option>
      <el-option label="认证通过" value="shanghai"></el-option>
      <el-option label="认证未通过" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item >
    <el-select v-model="formInline.region" placeholder="公司认证状态">
      <el-option label="全部" value="beijing"></el-option>
      <el-option label="未认证" value="beijing"></el-option>
      <el-option label="待认证" value="beijing"></el-option>
      <el-option label="认证通过" value="shanghai"></el-option>
      <el-option label="认证未通过" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <el-table  :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createtime" label="创建日期" >
        <template slot-scope="scope">{{ scope.row.createtime | dataFormat }}</template>
      </el-table-column>
      <el-table-column fixed prop="createtime" label="修改日期" >
        <template slot-scope="scope">{{ scope.row.updatetime | dataFormat }}</template>
      </el-table-column>
       <el-table-column prop="username" label="账号" ></el-table-column>
      <el-table-column prop="nickname" label="昵称" ></el-table-column>
      <el-table-column prop="realstate" label="实名认证状态" ></el-table-column>
       <el-table-column prop="companystate" label="公司认证状态" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin/updatehelp/${scope.row.help_id}`) "
            type="text"
            size="small"
          >查看</el-button>
          <el-button type="text" size="small" @click="del(scope.row.help_id)">删除</el-button>
          <el-button type="text" size="small" @click="del(scope.row.help_id)">封禁</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    name:'useruser',
  data() {
    return {
      formInline: {
          user: '',
          region: ''
        },
      pagelistquery: {
        total:0,
        page: 1,
        pagesize: 10,
      },
      tableData: []
    };
  },
  methods: {
    async del(help_id){
      console.log(help_id)
      let res = await this.$axios.post(
        "/webadmin/deletehelp",
        this.qs.stringify({help_id:help_id})
      );
      if (res.data.state.type === "SUCCESS") {
          this.$message.success("删除成功");
          this.gethelplist()
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
        console.log(res.data)
        this.pagelistquery.total=res.data.count
      }
    }
  },
  created() {
    this.getuserlist();
  }
  
};
</script>
<style  scoped>
.top{
  position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 35px);
    padding: 12px 16px;
    background-color: #fff;
}
.useruser{
  position:relative ;
  width: 100%;
}
.main{
  margin-top: 40px;
  padding: 20px;
    background-color: #fff;
  
}

</style>