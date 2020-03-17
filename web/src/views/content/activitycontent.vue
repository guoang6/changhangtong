<template>
  <div class="activitycontent">
    <div v-title data-title="活动详情"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <el-page-header @back="$router.back(-1)" content="活动详情"></el-page-header>
            <article class="type-post format-standard hentry clearfix">
              <h3>活动详情</h3>
              <div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe622;</a>
                  <a class="tagname">活动名称:</a>
                  {{content.activity_title}}
                </div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe66a;</a>
                  <a class="tagname">发起者:</a>
                  {{content.nickname}}
                </div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe62a;</a>
                  <a class="tagname">活动时间:</a>
                  {{content.activity_statetime| dataFormat}}——{{content.activity_endtime| dataFormat}}
                </div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe62a;</a>
                  <a class="tagname">活动人数:</a>
                  {{content.activity_num}}
                </div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe62a;</a>
                  <a class="tagname">活动地点:</a>
                  {{content.activity_locale}}
                </div>
                <div style="clear:both"></div>
                <!--占位-->
              </div>

              <h3>活动描述</h3>
              <blockquote v-html="content.activity_content"></blockquote>
            </article>
                  <el-button type="primary"  style="width:80px;margin:0 auto;display:block;">参加</el-button>

            <div class="like-btn">
              <form id="like-it-form" action="#" method="post">
                <span class="like-it">66</span>
                <input type="hidden" name="post_id" value="99" />
                <input type="hidden" name="action" value="like_it" />
              </form>
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
      dialogFormVisible: false, //弹框相关
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

    async getactivitycontent() {
      let data = {
        id: this.id
      };
      let res = await this.$axios.post(
        "/web/getactivitycontent",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.content = res.data.data;
        console.log("活动详情数据");
        console.log(this.content);
        this.setcontentinfo({
          contentname: res.data.data.activity_title,
          contentuserid: res.data.data.user_id
        });
      }
    }
  },
  created() {
    this.getactivitycontent();
    this.setcontentid(this.id);
  }
};
</script>
<style >
.activitycontent {
  min-height: 200px;
}
.tagname {
  margin-right: 20px;
  font-size: 18px;
}
</style>