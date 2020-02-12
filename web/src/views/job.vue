<template>
  <div class="help">
       <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <!-- Basic Home Page Template -->              

               <section class="widget">
        <h3 class="title">Featured Articles</h3>
        <ul class="articles">
          <li class="article-entry standard">
            <h4>
              <a >Integrating WordPress with Your Website</a>
            </h4>
            <span class="article-meta">
              25 Feb, 2013 in
              <a href="#" title="View all posts in Server &amp; Database">Server &amp; Database</a>
            </span>
            <span class="like-count">66</span>
          </li>
         
        </ul>
      </section>
             
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