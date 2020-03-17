<template>
  <div class="help">
<div v-title data-title="昌航通 |  工作"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <!-- Basic Home Page Template -->
            <section class="widget">
              <h3 class="title">问答区</h3>
              <ul class="articles">
                <li class="article-entry standard" 
                v-for="(item,id) in tableData"
            :key="id">
                  <h4>
                    <a>{{item.help_title}}</a>
                  </h4>
                  <span class="article-meta">
                    {{item.createtime}}
                    <a
                      href="#"
                      title="View all posts in Server &amp; Database"
                    >Server &amp; Database</a>
                  </span>
                  <span class="like-count">66</span>
                </li>
              </ul>
            </section>
            <el-pagination
              @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="pagelistquery.total">
  </el-pagination>
          </div>
          <!-- end of page content -->
          <!-- start of sidebar -->
          <sidebar />
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <!-- End of Page Container -->
  </div>
</template>


<script>
import sidebar from "@/components/sidebar.vue";
export default {
  components: {
    sidebar
  },
  data() {
    return {
      pagelistquery:{
        total:100,
        page:1
    },
      tableData: {}
    };
  },
  methods: {
      handleCurrentChange(val) {
      this.pagelistquery.page = val;
      // this.gethelplist();
      console.log(`当前页: ${val}`);
    },
    async gethelplist() {
      let data = {
        page: this.pagelistquery.page,
      };
      let res = await this.$axios.post(
        "/webadmin/webgetwebhelplist",
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
<style>
.help {
  min-height: 200px;
}
</style>