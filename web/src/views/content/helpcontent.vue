<template>
  <div class="help">
    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <article class="type-post format-standard hentry clearfix">
              <h1 class="post-title">
                <a >{{content.help_title}}</a>
              </h1>

              <div class="post-meta clearfix">
                <span class="date">{{content.createtime| dataFormat}}</span>
                <span class="category">
                  <a href="#" title="View all posts in Server &amp; Database">{{content.user_id}}</a>
                </span>
                <span class="comments">
                  <a href="#" title="Comment on Integrating WordPress with Your Website">3 Comments</a>
                </span>
                <span class="like-count">66</span>
              </div>
              <!-- end of post meta -->
              <blockquote>
                <p>{{content.help_content}}</p>
              </blockquote>
            </article>

            <div class="like-btn">
              <form id="like-it-form" action="#" method="post">
                <span class="like-it">66</span>
                <input type="hidden" name="post_id" value="99" />
                <input type="hidden" name="action" value="like_it" />
              </form>

              <span class="tags">
                <strong>Tags:&nbsp;&nbsp;</strong>
                <a href="#" rel="tag">basic</a>,
                <a href="#" rel="tag">setting</a>,
                <a href rel="tag">website</a>
              </span>
            </div>

           <comment/>
            <!-- end of comments -->
            <!-- end of page content -->
          </div>
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
import comment from "@/components/comment.vue";

export default {
  components: {
    sidebar,
    comment
  },
  data() {
    return {
     content:{}
    };
  },
  props: {
    id: {}
  },
  methods: {
    async gethelpcontent() {
      let data = {
        id: this.id
      };
      let res = await this.$axios.post(
        "/web/gethelpcontent",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.content= res.data.data;
      }
    }
  },
  created() {
    this.gethelpcontent();
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>