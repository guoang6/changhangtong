<template>
  <div class="home">
    <div v-title data-title="昌航通 | 首页"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <!-- Basic Home Page Template -->
            <help />
            <oldstuff />
            <news />
          </div>
          <!-- end of page content -->
          <!-- start of sidebar -->
          <aside class="span4 page-sidebar">
            <section class="widget">
              <div class="support-widget">
                <el-carousel height="150px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="title">Support</h3>
                    <p
                      class="intro"
                    >Need more support? If you did not found an answer, contact us for further help.</p>
                  </el-carousel-item>
                </el-carousel>
              </div>
                   <help />
              <activity />
              <job />
            </section>
          </aside>
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <!-- End of Page Container -->
  </div>
</template>
<script>
// @ is an alias to /src
// import job from "@/components/job.vue";
import activity from "@/components/activity.vue";
import news from "@/components/news.vue";
import oldstuff from "@/components/oldstuff.vue";
import job from "@/components/job.vue";
import help from "@/components/help.vue";

export default {
  name: "home",
  components: {
    news,
    oldstuff,
    job,
    activity,
    help
  }
};
</script>
<style>
.guomore {
  float: right;
}
</style>