<template>
  <div class="hello">
    <!-- start of sidebar -->
    <aside class="span4 page-sidebar">
      <section class="widget">
        <!-- <div class="support-widget">

        </div>-->

        <el-carousel height="200px">
          <el-carousel-item v-for="item in 5" :key="item">
            <a href="https;//www.baidu.com">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585201596707&di=a30ea6e2488812664bdeeec847de6378&imgtype=0&src=http%3A%2F%2Fpn.gexing.com%2Fshaitu%2F20130303%2F0938%2F5132a9a5d1457.jpg"
                alt
              />
            </a>
          </el-carousel-item>
        </el-carousel>
      </section>
      <activity />
      <help />
      <job />
    </aside>
    <!-- end of sidebar -->
  </div>
</template>

<script>
import job from "@/components/job.vue";
import activity from "@/components/activity.vue";
import help from "@/components/help.vue";

export default {
  name: "home",
  components: {
    job,
    activity,
    help
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.el-carousel__indicators {
  z-index: -100;
}
</style>
