<template>
  <div class="hello">
    <!-- start of sidebar -->
    <aside class="span4 page-sidebar">
      <section class="widget">
        <div class="support-widget">
          <h3 class="title">Support</h3>
          <p
            class="intro"
          >Need more support? If you did not found an answer, contact us for further help.</p>
        </div>
      </section>   <activity />
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
<style scoped>
</style>
