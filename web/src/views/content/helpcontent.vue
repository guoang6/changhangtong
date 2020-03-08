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
                <a>{{content.help_title}}</a>
              </h1>

              <div class="post-meta clearfix">
                <span class="date">{{content.createtime| dataFormat}}</span>
                <span class="category">
                  <a href="#" title="View all posts in Server &amp; Database">{{content.user_id}}</a>
                </span>
                <span class="comments">
                  <a
                    href="#"
                    title="Comment on Integrating WordPress with Your Website"
                  >{{commentnum}} Comments</a>
                </span>
                <span class="like-count">66</span>
              </div>
              <!-- end of post meta -->
              <blockquote v-html="content.help_content"></blockquote>
            </article>

            <div class="like-btn">
              <form id="like-it-form" action="#" method="post">
                <span class="like-it">66</span>
                <input type="hidden" name="post_id" value="99" />
                <input type="hidden" name="action" value="like_it" />
              </form>

              <span class="tags">
                <strong>标签</strong>
                <span
                  v-for="(tag,id) in content.help_tag"
                  @click="$router.push(`/help/${tag}`) "
                  :key="id"
                  class="label"
                >{{tag}}</span>
              </span>
            </div>

            <comment />
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
import { mapState, mapActions } from "vuex";

export default {
  components: {
    sidebar,
    comment
  },
  data() {
    return {
      content: {}
    };
  },
  props: {
    id: {}
  },
  computed: {
    ...mapState({
      commentnum: state => state.commentnum
    })
  },
  methods: {
    ...mapActions(["setcontentid", "setcontentinfo"]),
    async gethelpcontent() {
      let data = {
        id: this.id
      };
      let res = await this.$axios.post(
        "/web/gethelpcontent",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.content = res.data.data;
        console.log(res.data.data.help_title)
        this.setcontentinfo({contentname:res.data.data.help_title,contentuserid:res.data.data.user_id})
        this.content.help_tag = res.data.data.help_tag.split(",");
      }
    }
  },
  created() {
    this.gethelpcontent();
    this.setcontentid(this.id);
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
.label {
  margin-left: 15px;
}
</style>