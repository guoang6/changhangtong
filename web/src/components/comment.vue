<template>
  <div class="comment">
    <section id="comments">
      <h3 id="comments-title">({{commentnum}}) 留言</h3>

      <article id="comment-4">
        <img :src="circleUrl" class="avatar touxiang avatar-60 photo" height="40" width="40" />
        <h4 class="author" style=" display: inline;">guoang</h4>
      </article>
      <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="comment_content"></vue-editor>
      <div class="comment">
        <el-button type="info" @click="setcomment">评论</el-button>
      </div>
      <ol class="commentlist">
        <li
          v-for="(item,id) in commentlist"
          :key="id"
          class="comment even thread-even depth-1"
          id="li-comment-2"
        >
          <article id="comment-2">
            <a href="#">
              <img
                alt
                :src="item.avatar"
                class="avatar touxiang avatar-60 photo"
                height="20"
                width="20"
              />
            </a>
            <div class="comment-meta">
              <h5 class="author">
                <cite class="fn">
                  <a href="#" rel="external nofollow" class="url">{{item.nickname}}</a>
                </cite>
              </h5>
              <p class="date">
                <a href="#">
                  <time datetime="2013-02-26T13:18:47+00:00">{{item.createtime|dataFormat}}</time>
                </a>
              </p>
            </div>
            <!-- end .comment-meta -->

            <div class="comment-body" v-html="item.comment_content"></div>
            <!-- end of comment-body -->
          </article>
          <!-- end of comment -->

          <ul class="children">
            <li
              class="comment byuser comment-author-saqib-sarwar bypostauthor odd alt depth-2"
              id="li-comment-3"
            >
              <article id="comment-3">
                <a href="#">
                  <img
                    alt
                    src="http://0.gravatar.com/avatar/2df5eab0988aa5ff219476b1d27df755?s=60&amp;d=http%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D60&amp;r=G"
                    class="avatar avatar-60 photo"
                    height="60"
                    width="60"
                  />
                </a>

                <div class="comment-meta">
                  <h5 class="author">
                    <cite class="fn">saqib sarwar</cite>
                    -
                    <a class="comment-reply-link" href="#">Reply</a>
                  </h5>

                  <p class="date">
                    <a href="#">
                      <time datetime="2013-02-26T13:20:14+00:00">February 26, 2013 at 1:20 pm</time>
                    </a>
                  </p>
                </div>
                <!-- end .comment-meta -->

                <div class="comment-body">
                  <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>
                </div>
                <!-- end of comment-body -->
              </article>
              <!-- end of comment -->
            </li>
          </ul>
        </li>

        <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
          <article id="comment-4">
            <a href="#">
              <img
                alt
                src="http://1.gravatar.com/avatar/50a7625001317a58444a20ece817aeca?s=60&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D60&amp;r=G"
                class="avatar avatar-60 photo"
                height="60"
                width="60"
              />
            </a>

            <div class="comment-meta">
              <h5 class="author">
                <cite class="fn">
                  <a href="#" rel="external nofollow" class="url">John Doe</a>
                </cite>
                -
                <a class="comment-reply-link" href="#">Reply</a>
              </h5>

              <p class="date">
                <a
                  href="http://knowledgebase.inspirythemes.com/integrating-wordpress-with-your-website/#comment-4"
                >
                  <time datetime="2013-02-26T13:27:04+00:00">February 26, 2013 at 1:27 pm</time>
                </a>
              </p>
            </div>
            <!-- end .comment-meta -->

            <div class="comment-body">
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            </div>
            <!-- end of comment-body -->
          </article>
          <!-- end of comment -->
        </li>
      </ol>

      <div id="respond">
        <h3>Leave a Reply</h3>

        <div class="cancel-comment-reply">
          <a
            rel="nofollow"
            id="cancel-comment-reply-link"
            href="#"
            style="display:none;"
          >Click here to cancel reply.</a>
        </div>

        <form action="#" method="post" id="commentform">
          <p class="comment-notes">
            Your email address will not be published. Required fields are marked
            <span
              class="required"
            >*</span>
          </p>

          <div>
            <label for="author">Name *</label>
            <input class="span4" type="text" name="author" id="author" value size="22" />
          </div>

          <div>
            <label for="email">Email *</label>
            <input class="span4" type="text" name="email" id="email" value size="22" />
          </div>

          <div>
            <label for="url">Website</label>
            <input class="span4" type="text" name="url" id="url" value size="22" />
          </div>

          <div>
            <label for="comment">Comment</label>
            <textarea class="span8" name="comment" id="comment" cols="58" rows="10"></textarea>
          </div>

          <p class="allowed-tags">
            You can use these HTML tags and attributes
            <small>
              <code>&lt;a href="" title=""&gt; &lt;abbr title=""&gt; &lt;acronym title=""&gt; &lt;b&gt; &lt;blockquote cite=""&gt; &lt;cite&gt; &lt;code&gt; &lt;del datetime=""&gt; &lt;em&gt; &lt;i&gt; &lt;q cite=""&gt; &lt;strike&gt; &lt;strong&gt;</code>
            </small>
          </p>

          <div>
            <input class="btn" name="submit" type="submit" id="submit" value="Submit Comment" />
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  computed: {
    ...mapState({
      contentid: state => state.contentid,
      commentnum: state => state.commentnum
    })
  },
  data() {
    return {
      commentlist: {},
      comment_content: "",
      circleUrl: "http://127.0.0.1:3000/uplodes/moren"
    };
  },
  methods: {
    ...mapActions(["setcommentnum"]),
    //富文本编辑器图片上传npm install vue2-editor
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$axios.post("/uplod", formData);
      console.log(res);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    //评论
    async setcomment() {
      let data = {
        comment_content: this.comment_content,
        content_id: this.contentid
      };
      let res = await this.$axios.post(
        "/web/setcomment",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message("评论成功");
        this.comment_content = "";
        this.getcomment();
      }
    },
    //获取评论
    async getcomment() {
      let data = {
        content_id: this.contentid
      };
      let res = await this.$axios.post(
        "/web/getcomment",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.commentlist = res.data.data;
        console.log(this.commentlist);
        this.setcommentnum(res.data.count);
      }
    },
    async helpcontent() {
      let data = {
        comment_content: this.comment_content
      };
      let res = await this.$axios.post(
        "/webadmin/webgetwebhelplist",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data);
        this.pagelistquery.total = res.data.count;
      }
    }
  },
  created() {
    this.getcomment();
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
.comment {
  margin-top: 10px;
  margin-left: 20px;
}
</style>