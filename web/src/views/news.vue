<template>
  <div class="news">
       <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <!-- Basic Home Page Template -->              
<div class="row home-category-list-area">
              <div class="span8">
                <h2>文章与新闻</h2>
              </div>
            </div>
        <article class="format-standard type-post hentry clearfix">
              <header class="clearfix">
                <h3 class="post-title">
                  <a href="single.html">Integrating WordPress with Your Website</a>
                </h3>

                <div class="post-meta clearfix">
                  <span class="date">25 Feb, 2013</span>
                  <span class="category">
                    <a
                      href="#"
                      title="View all posts in Server &amp; Database"
                    >Server &amp; Database</a>
                  </span>
                  <span class="comments">
                    <a
                      href="#"
                      title="Comment on Integrating WordPress with Your Website"
                    >3 Comments</a>
                  </span>
                  <span class="like-count">66</span>
                </div>
                <!-- end of post meta -->
              </header>

              <p>
                Many of us work in an endless stream of tasks, browser tasks, social media, emails, meetings, rushing from one thing to another, never pausing and never ending.&nbsp;Then the day is over, and we are exhausted, and we often have very little to show for it. And we start the next . . .
                <a
                  class="readmore-link"
                  href="http://knowledgebase.inspirythemes.com/integrating-wordpress-with-your-website/"
                >Read more</a>
              </p>
            </article>
             
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
      imageUrl: ""
    };
  },
  methods: {}
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>