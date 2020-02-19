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
                height="40"
                width="40"
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
                  <time>{{item.createtime|dataFormat}}</time>
                </a>
              </p>
            </div>
            <!-- end .comment-meta -->

            <div class="comment-body" v-html="item.comment_content"></div>
            <div class="comment-footer">
              <p @click="getreply(item.comment_id,id)">查看所有回复</p>
              <p @click="showinput(id,item.nickname,item.user_id,item.comment_id)">回复</p>
            </div>
            <div class="reply" v-if="id===editorid">
              <vue-editor
                useCustomImageHandler
                @image-added="handleImageAdded"
                v-model="comment_content"
              ></vue-editor>
              <div class="comment">
                <el-button type="info" @click="setcomment">评论</el-button>
              </div>
            </div>
            <!-- end of comment-body -->
          </article>
          <!-- end of comment -->

          <ul class="children" v-if="id===replyid">
            <li
              class="comment byuser comment-author-saqib-sarwar bypostauthor odd alt depth-2"
              id="li-comment-3"
              v-for="(data,index) in replylist"
              :key="index"
            >
              <article id="comment-3">
                <a href="#">
                  <img
                    alt
                    :src="data.avatar"
                    class="avatar avatar-60 photo"
                    style=" width: 40px;height: 40px"
                  />
                </a>

                <div class="comment-meta">
                  <h5 class="author">
                    <cite class="fn">{{data.nickname}}</cite>
                    @
                    <a
                      class="comment-reply-link touser"
                      href="#"
                    >{{data.tousernickname}}</a>
                  </h5>
                </div>
                <!-- end .comment-meta -->

                <div class="comment-body" v-html="data.reply_content"></div>
                <!-- end of comment-body -->
                <div class="comment-footer">
                  <p class="date">
                    <a href="#">
                      <time>{{item.createtime|dataFormat}}</time>
                    </a>
                  </p>
                  <p @click="showreplyinput(index,data.nickname,data.user_id,item.comment_id)">回复</p>
                </div>
                <div class="reply" v-if="index===replyinputid">
                  <vue-editor
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="comment_content"
                  ></vue-editor>
                  <div class="comment">
                    <el-button type="info" @click="setcomment">评论</el-button>
                  </div>
                </div>
              </article>
              <!-- end of comment -->
            </li>
          </ul>
        </li>
      </ol>
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
      replyinputid: -1,
      replyid: -1,
      replylist: "",
      commentid: "",
      comment_id: "",
      touserid: "",
      tousernickname: "",
      editorid: -1,
      commentlist: {},
      comment_content: "",
      circleUrl: "http://127.0.0.1:3000/uplodes/moren"
    };
  },
  methods: {
    ...mapActions(["setcommentnum"]),
    //回复回复按钮
    showreplyinput(index, tousernickname, touserid, comment_id) {
      this.touserid = touserid;
      this.tousernickname = tousernickname;
      this.replyinputid = index;
      this.comment_id = comment_id;
    },
    //回复按钮
    showinput(id, tousernickname, touserid, comment_id) {
      this.touserid = touserid;
      this.tousernickname = tousernickname;
      this.editorid = id;
      this.comment_id = comment_id;
    },
    // reply(){
    //   this.touserid='',
    //   this.tousernickname='',
    //   this.editorid= -1
    // },
    //富文本编辑器图片上传npm install vue2-editor
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$axios.post("/uplod", formData);
      console.log(res);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    //获取回复
    async getreply(comment_id, id) {
      this.replylist=''
      this.replyid = id;
      this.commentid = comment_id;
      let data = {
        comment_id: this.commentid
      };
      let res = await this.$axios.post(
        "/web/getreply",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.replylist = res.data.data;
      }
    },
    //评论
    async setcomment() {
      let res;
      if (this.touserid != "") {
        let data = {
          comment_content: this.comment_content,
          touserid: this.touserid,
          tousernickname: this.tousernickname,
          comment_id: this.comment_id
        };
        res = await this.$axios.post("/web/setreply", this.qs.stringify(data));
      } else {
        let data = {
          comment_content: this.comment_content,
          content_id: this.contentid
        };
        res = await this.$axios.post(
          "/web/setcomment",
          this.qs.stringify(data)
        );
      }
      if (res.data.state.type === "SUCCESS") {
        this.$message("评论成功");
        this.comment_content = "";
        this.touserid != "";
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
.comment-footer {
  height: 30px;
  line-height: 30px;
}
.comment-footer p {
  float: left;
  margin-left: 20%;
  font-size: 15px;
}
/* .reply {
  padding-left: 20px;
} */
.touser {
  color: blue;
}
</style>