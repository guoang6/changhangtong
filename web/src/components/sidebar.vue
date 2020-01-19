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
            <span class="like-count">15</span>
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
        <h3 class="title">Categories</h3>
        <ul>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">Advanced Techniques</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">Designing in WordPress</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">Server &amp; Database</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet, ">Theme Development</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">Website Dev</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet,">WordPress for Beginners</a>
          </li>
          <li>
            <a href="#" title="Lorem ipsum dolor sit amet, ">WordPress Plugins</a>
          </li>
        </ul>
      </section>

      <section class="widget">
        <h3 class="title">Recent Comments</h3>
        <ul id="recentcomments">
          <li class="recentcomments">
            <a href="#" rel="external nofollow" class="url">John Doe</a> on
            <a href="#">Integrating WordPress with Your Website</a>
          </li>
          <li class="recentcomments">
            saqib sarwar on
            <a href="#">Integrating WordPress with Your Website</a>
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
