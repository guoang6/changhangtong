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
      </section>

      <section class="widget">
        <h3 class="title">Featured Articles</h3>
        <ul class="articles">
          <li class="article-entry standard">
            <h4>
              <a href="single.html">Integrating WordPress with Your Website</a>
            </h4>
            <span class="article-meta">
              25 Feb, 2013 in
              <a href="#" title="View all posts in Server &amp; Database">Server &amp; Database</a>
            </span>
            <span class="like-count">66</span>
          </li>
          <li class="article-entry standard">
            <h4>
              <a href="single.html">WordPress Site Maintenance</a>
            </h4>
            <span class="article-meta">
              24 Feb, 2013 in
              <a href="#" title="View all posts in Website Dev">Website Dev</a>
            </span>
            <span class="like-count">  <a class="iconfont" style="color:red">&#xe647;</a>15</span>
          </li>
          <li class="article-entry video">
            <h4>
              <a href="single.html">Meta Tags in WordPress</a>
            </h4>
            <span class="article-meta">
              23 Feb, 2013 in
              <a href="#" title="View all posts in Website Dev">Website Dev</a>
            </span>
            <span class="like-count">8</span>
          </li>
          <li class="article-entry image">
            <h4>
              <a href="single.html">WordPress in Your Language</a>
            </h4>
            <span class="article-meta">
              22 Feb, 2013 in
              <a href="#" title="View all posts in Advanced Techniques">Advanced Techniques</a>
            </span>
            <span class="like-count">6</span>
          </li>
        </ul>
      </section>

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
    </aside>
    <!-- end of sidebar -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
