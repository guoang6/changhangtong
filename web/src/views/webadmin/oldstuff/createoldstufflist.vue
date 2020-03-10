<template>
  <div class="createoldstufflist">
    <h2>二手信息</h2>

    <el-tabs type="border-card">
      <!--发布二手信息-->
      <el-tab-pane label="发布二手">
        <el-button
          type="text"
          icon="el-icon-plus"
          @click="$router.push('/admin/createoldstuff') "
        >发布二手信息</el-button>

        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="createtime" label="日期">
            <template slot-scope="scope">{{ scope.row.createtime | dataFormat }}</template>
          </el-table-column>
          <el-table-column prop="oldstuff_name" label="名称"></el-table-column>
          <el-table-column prop="oldstuff_lable" label="分类"></el-table-column>
          <el-table-column prop="oldstuff_price" label="价格"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="$router.push(`/admin/updateoldstuff/${scope.row.oldstuff_id}`) "
                type="text"
                size="small"
              >编辑</el-button>
              <el-button type="text" size="small" @click="del(scope.row.oldstuff_id)">删除</el-button>
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
      </el-tab-pane>

      <!--寻找二手信息-->
      <el-tab-pane label="寻找二手">
        <el-button
          type="text"
          icon="el-icon-plus"
          @click="$router.push('/admin/createactivity') "
        >发布新的活动</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagelistquery: {
        total: 0,
        page: 1,
        pagesize: 10
      },
      tableData: []
    };
  },
  methods: {
    async del(oldstuff_id) {
      console.log(oldstuff_id);
      let res = await this.$axios.post(
        "/webadmin/deleteoldstuff",
        this.qs.stringify({ oldstuff_id: oldstuff_id })
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message("删除成功");
        this.getoldstufflist();
      }
    },
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getoldstufflist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getoldstufflist();
      console.log(`当前页: ${val}`);
    },
    async getoldstufflist() {
      let data = {
        page: this.pagelistquery.page,
        pagesize: this.pagelistquery.pagesize
      };
      let res = await this.$axios.post(
        "/webadmin/getweboldstufflist",
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
    this.getoldstufflist();
  }
};
</script>