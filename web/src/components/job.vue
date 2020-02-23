<template>
  <div class="job">
  <section class="widget">
        <h3 class="title">公司</h3>
        <ul>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">腾讯科技有限公司</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">18栋小卖部有限公司</a>
          </li>
        </ul>
      </section>
      <section class="widget">
        <h3 class="title">岗位</h3>
        <ul id="recentcomments">
          <li class="recentcomments">
            <a href="#">前端开发工程师</a>
          </li>
          <li class="recentcomments">
            <a href="#">Java开发工程师</a>
          </li>
          <li class="recentcomments">
            <a href="#" rel="external nofollow" class="url">John Doe</a> on
            <a href="#">Integrating WordPress with Your Website</a>
          </li>
          <li class="recentcomments">
            <a href="#" rel="external nofollow" class="url">Mr WordPress</a> on
            <a href="#">Installing WordPress</a>
          </li>
        </ul>
      </section>
  </div>
</template>

<script>
export default {
  name: "job",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
