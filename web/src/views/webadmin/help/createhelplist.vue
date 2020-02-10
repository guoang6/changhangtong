<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="createtime" label="日期">
      <template slot-scope="scope">{{ scope.row.createtime | dataFormat }}</template>
    </el-table-column>
    <el-table-column prop="help_title" label="标题"></el-table-column>
    <el-table-column prop="help_lable" label="类型"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    async gethelplist() {
      const res = await this.$axios.post("/webadmin/getwebhelplist");
      this.tableData=res.data.data;
    }
  },
  created() {
    this.gethelplist();
  }
};
</script>