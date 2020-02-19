<template>
  <div class="help">
    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <!-- Basic Home Page Template -->
            <ul class="tabs-nav">
              <li class="active" style>
                <a href="#">First Tab</a>
              </li>
              <li>
                <a href="#">Second Tab</a>
              </li>
              <li>
                <a href="#">Third Tab</a>
              </li>
              <li>
                <a href="#">Third Tab</a>
              </li>
              <li>
                <a href="#">Third Tab</a>
              </li>
            </ul>
            <section class="widget">
              <h3 class="title">问答区</h3>
              <ul class="articles">
                <li class="article-entry standard" v-for="(item,id) in tableData" :key="id">
                  <h4>
                    <router-link :to="'/helpcontent/'+item.help_id">{{item.help_title}}</router-link>
                  </h4>
                  <span class="article-meta">
                    {{item.createtime| dataFormat}}
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
              :total="pagelistquery.total"
            ></el-pagination>
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
      pagelistquery: {
        total: 0,
        pagesize: 10,
        page: 1
      },
      tableData: {}
    };
  },
  methods: {
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
        "/web/webgetwebhelplist",
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