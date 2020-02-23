<template>
  <div class="help">
       <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
             <div>
              <h3 class="title">活动区</h3>
            </div>
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
        <ul class="articles">
          <li class="article-entry standard">
            <h4>
              <a >打球</a>
            </h4>
            <span class="article-meta">
             <a class="iconfont">&#xe619;</a> 2020-2-5 20：20
              <a class="iconfont" style="margin-left:50px">&#xe609;</a>体育馆
            </span>
            <span class="like-count"><a class="iconfont">&#xe61c;</a>55</span>
          </li>
         
        </ul>
      </section>
             
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
    async getactivitylist() {
      let data = {
        page: this.pagelistquery.page,
        pagesize: this.pagelistquery.pagesize
      };
      let res = await this.$axios.post(
        "/web/webgetwebactivitylist",
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
    this.getactivitylist();
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>