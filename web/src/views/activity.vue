<template>
  <div class="help"> 
<div v-title data-title="昌航通 | 活动"></div>

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
              <li :class="pagelistquery.lable===''?'active':''" @click="changelable('')">
                <a>全部</a>
              </li>
              <li
                v-for="(lable,id) in lables"
                :key="id"
                :class="pagelistquery.lable===lable?'active':''"
                @click="changelable(lable)"
              >
                <a>{{lable}}</a>
              </li>
            </ul>
               <section class="widget">
        <ul class="articles">
          <li class="article-entry standard" v-for="(activity,id) in tableData" :key="id">
            <h4>
              <a >{{activity.activity_title}}</a>
            </h4>
            <span class="article-meta">
             <a class="iconfont">&#xe619;</a> {{activity.createtime|dataFormat}}
              <a class="iconfont" style="margin-left:50px">&#xe609;</a>{{activity.activity_locale}}
            </span>
            <span class="like-count"><a class="iconfont">&#xe61c;</a>{{activity.activity_num}}</span>
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
      smallttle:'',
      lables: ["学习", "生活", "娱乐", "其他"],
      pagelistquery: {
        lable: "",
        total: 0,
        pagesize: 10,
        page: 1
      },
      tableData: {}
    };
  },
  methods: {
        changelable(lable) {
      this.pagelistquery.lable = lable;
      this.smallttle=this.pagelistquery.lable
      this.getactivitylist();
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.gethelplist();
      console.log(`当前页: ${val}`);
    },
    async getactivitylist() {
      let res = await this.$axios.post(
        "/web/webgetwebactivitylist",
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
    this.getactivitylist();
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>