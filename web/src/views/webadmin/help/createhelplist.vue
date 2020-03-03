<template>
  <div class="createhelplist">
    <div class="title">
      <div style="float:left">
        <h2>问答</h2>
      </div>
      <div style="float:left; margin-left:50px; padding :11px">
        <el-button
          plain
          round
          icon="el-icon-circle-plus-outline"
         @click="dialogVisible = true"
        >发布</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createtime" label="日期">
        <template slot-scope="scope">{{ scope.row.createtime | dataFormat }}</template>
      </el-table-column>
      <el-table-column prop="help_title" label="标题"></el-table-column>
      <el-table-column prop="help_lable" label="分类"></el-table-column>
      <el-table-column prop="help_state" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin/updatehelp/${scope.row.help_id}`) "
            type="text"
            size="small"
          >编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row.help_id)">删除</el-button>
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



    <el-dialog
  :visible.sync="dialogVisible"
  width="60%"
  >
  <div style="overflow:auto;height:80vh">
  <createhelp/>

  </div>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
  </div>
</template>

<script>
import createhelp from "@/views/webadmin/help/createhelp.vue";
export default {
  components: {
    createhelp
  },
  data() {
    return {
      pagelistquery: {
        total: 0,
        page: 1,
        pagesize: 10
      },
              dialogVisible: false,
 
      tableData: []
    };
  },
  methods: {
    async del(help_id) {
      console.log(help_id);
      let res = await this.$axios.post(
        "/webadmin/deletehelp",
        this.qs.stringify({ help_id: help_id })
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message("删除成功");
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
    async gethelplist() {
      let data = {
        page: this.pagelistquery.page,
        pagesize: this.pagelistquery.pagesize
      };
      let res = await this.$axios.post(
        "/webadmin/getwebhelplist",
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
    this.gethelplist();
  }
};
</script>
<style >
.el-dialog{
       display: flex;
       flex-direction: column;
       margin:0 !important;
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
   }
 
   .el-dialog .el-dialog__body{
       flex:1;
       overflow: auto;
   }
</style>