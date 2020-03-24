<template>
  <div class="hoothelp">
    <aside class="span4 page-sidebar">
      <section class="widget">
        <h3 class="title">公司</h3>
        <ul>
          <li v-for="(item,id) in tableData" :key="id">
            <router-link :to="'/companycontent/'+item.company_id">{{item.company_name}}</router-link>
          </li>
        </ul>
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, next"
          :total="pagelistquery.total"
        ></el-pagination>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  name: "company",
  data() {
    return {
      pagelistquery: {
        total: 0,
        pagesize: 10,
        page: 1
      },
      tableData: {}
    };
  },
  props: {
    tag: {}
  },
  methods: {
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getjoblist();
      console.log(`当前页: ${val}`);
    },
    async getjoblist() {
      let res = await this.$axios.post(
        "/web/webgetcompanylist",
        this.qs.stringify(this.pagelistquery)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data);
        this.pagelistquery.total = res.data.count;
      }
    }
  },
  created() {
    this.getjoblist();
  }
};
</script>
<style>
</style>