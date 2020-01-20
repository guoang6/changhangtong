<template>
  <div class="home">
   
    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <!-- Basic Home Page Template -->
            <job />
            <activity />
              <news />
          </div>
          <!-- end of page content -->

          <!-- start of sidebar -->
         <sidebar />
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <!-- End of Page Container -->
    <foot />
  </div>
</template>
<script>
// @ is an alias to /src
import foot from "@/components/foot.vue";
import job from "@/components/job.vue";
import activity from "@/components/activity.vue";
import news from "@/components/news.vue";
import sidebar from "@/components/sidebar.vue";

export default {
  name: "home",
  components: {
    foot,
    job,
    activity,
    news,
    sidebar,
  }
};
</script>
<style>
.guomore {
  float: right;
}
</style>