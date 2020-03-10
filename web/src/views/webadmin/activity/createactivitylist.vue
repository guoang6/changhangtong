<template>
  <div class="createactivitylist">
        <h2>活动管理</h2>

        <el-button
          type="text"
          icon="el-icon-plus"
          @click="$router.push('/admin/createactivity') "
        >发布新的活动</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createtime" label="日期">
        <template slot-scope="scope">{{ scope.row.createtime | dataFormat }}</template>
      </el-table-column>
      <el-table-column prop="activity_title" label="标题"></el-table-column>
      <el-table-column prop="activity_lable" label="类型"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin/updateactivity/${scope.row.activity_id}`) "
            type="text"
            size="small"
          >编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row.activity_id)">删除</el-button>
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
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagelistquery: { 
        total:0,
        page: 1,
        pagesize: 10,
      },
      tableData: []
    };
  },
  methods: {
    async del(activity_id){
      console.log(activity_id)
      let res = await this.$axios.post(
        "/webadmin/deleteactivity",
        this.qs.stringify({activity_id:activity_id})
      );
      if (res.data.state.type === "SUCCESS") {
          this.$message.success("删除成功");
          this.getactivitylist()
      }
    },
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getactivitylist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.gethelplist();
      console.log(`当前页: ${val}`);
    },
    async getactivitylist() {
      let data = {
        page: this.pagelistquery.page,
        pagesize: this.pagelistquery.pagesize
      };
      let res = await this.$axios.post(
        "/webadmin/getwebactivitylist",
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
    this.getactivitylist();
  }
};
</script>