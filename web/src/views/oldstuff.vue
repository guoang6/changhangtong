<template>
  <div class="help">
    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
              <div> <h3 class="title">二手交易中心</h3></div>
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
             
     <div class="row">
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img data-src="holder.js/100%x200" alt="100%x200" src="http://127.0.0.1:3000/uplodes/a12a383ee8fa82454bd5a194477f154b" data-holder-rendered="true" style="height: 200px; object-fit: cover;width: 100%; display: block;">
          <div class="caption">
            <h3 style="color:red">￥ 50</h3>
            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          </div>
        </div>
      </div>
    </div>
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
    // this.gethelplist();
  }
};
</script>
<style>
.col-sm-6{
    float: left;
}
.help {
  min-height: 200px;
}
.row{
    margin-top: 20px;
}
@media (min-width: 768px){
.col-sm-6 {
    width: 33.33333%;
}
}
@media (max-width: 768px){
.col-sm-6 {
    width: 50%;
}
}
</style>