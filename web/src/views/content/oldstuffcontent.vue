<template>
  <div class="help">
    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <el-page-header @back="$router.back(-1)" content="详情页面"></el-page-header>
            <article class="type-post format-standard hentry clearfix">
              <div>
                <div class="oldstuffcontent">
                  <img :src="content.oldstuff_img" alt="物品照片" />
                </div>
                <div class="oldstuffcontent">
                  <h3>{{content.oldstuff_name}}</h3>
                  <div class="prize_bar">
                    <div class="show_prize fl">
                      ￥
                      <em>{{content.oldstuff_price}}</em>
                    </div>
                    <div style="margin-top:10px">原价：{{content.oldstuff_price}}</div>
                    <div style="margin-top:10px;font-size:10px">卖家信息———————————————</div>
                    <div class="show_unit fl">
                      <a class="iconfont" style=" font-size: 30px">&#xe622;</a>{{content.nickname}}
                    </div>
                    <div class="show_unit fl">
                      <a class="iconfont" style=" font-size: 30px">&#xe66a;</a>{{content.qq}}
                    </div>
                    <div class="show_unit fl">
                      <a class="iconfont" style=" font-size: 30px">&#xe62a;</a>{{content.phone}}
                    </div>
                  </div>
                  <el-button type="primary">有意向购买</el-button>
                </div>
                <div style="clear:both"></div>
              </div>
              <h3>商品描述</h3>
              <blockquote v-html="content.oldstuff_content"></blockquote>
            </article>
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
    ...mapActions(["setcontentid"]),
    async getoldstuffcontent() {
      let data = {
        id: this.id
      };
      let res = await this.$axios.post(
        "/web/getoldstuffcontent",
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.content = res.data.data;
        // this.content.help_tag = res.data.data.help_tag.split(",");
      }
    }
  },
  created() {
    this.getoldstuffcontent();
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
.oldstuffcontent {
  width: 90%;
  min-height: 200px;
  padding: 5%;
}
.show_prize {
  font-size: 20px;
  color: #ff3e3e;
  padding-left: 20px;
}
.iconfont {
  color: #409eff;
  margin-right: 30px;
}
.show_unit {
  margin-bottom: 10px;
  height: 50px;
  line-height: 50px;
}
@media (min-width: 700px) {
  .oldstuffcontent {
    width: 40%;
    float: left;
  }
}
</style>