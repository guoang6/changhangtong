<template>
  <div class="contentexamine"> 
       <el-main>
         <div class="top">
          <el-breadcrumb  separator="/">

  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>审核中心</el-breadcrumb-item>
  <el-breadcrumb-item>内容审核</el-breadcrumb-item>
</el-breadcrumb>

         </div>
    

     <div class="main">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
  <el-form-item >
    <el-select v-model="formInline.region" placeholder="状态">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
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
       <el-table-column prop="nickname" label="作者" ></el-table-column>
      <el-table-column prop="help_title" label="标题" ></el-table-column>
      <el-table-column prop="help_lable" label="分类" ></el-table-column>
       <el-table-column prop="help_state" label="状态" ></el-table-column>
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
    name:'contentexamine',
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
    async gethelplist() {
      let data = {
        page: this.pagelistquery.page,
        pagesize: this.pagelistquery.pagesize
      };
      let res = await this.$axios.post(
        "/admin/contentexamine",
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
    this.gethelplist();
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
.contentexamine{
  position:relative ;
  width: 100%;
}
.main{
  margin-top: 40px;
  padding: 20px;
    background-color: #fff;
  
}

</style>