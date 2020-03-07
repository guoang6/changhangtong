<template>
  <div class="notice">
    <h3>未读消息：{{unread}}</h3>
    <el-divider></el-divider>
    <div style="position:relative" v-for="(notice,id) in tableData" :key="id">
      <div
        style="width:10px;height:10px;border-radius:50%;display:inline-block"
        :class="`state${notice.state}`"
      ></div>
      <span style="margin-left:20px">{{notice.createtime| dataFormat}}</span>
      <span style="margin-left:20px">{{notice.action}}了你</span>
      <span style="margin-left:20px">
        来自
        <a :href="`http://localhost:8080/#/${notice.router}/${notice.content_id}`"  target="_blank">{{notice.content_name}}</a>
      </span>
      <i class="el-icon-delete del"></i>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "notice",
  data() {
    return {
      tableData: ""
    };
  },
  computed: {
    ...mapState({
      unread: state => state.user.unread
    })
  },
  methods: {
    ...mapActions("user", ["setunread"]),
    async getnoticelist() {
      let res = await this.$axios.post(
        "/web/getnotice",
        this.qs.stringify({ num: "" })
      );
      if (res.data.state.type === "SUCCESS") {
        this.setunread(res.data.data.count);
        this.tableData = res.data.data.list;
        console.log(res.data);
        // this.pagelistquery.total = res.data.count;
      }
    }
  },
  created() {
    this.getnoticelist();
  }
};
</script>
<style  scoped>
.del {
  position: absolute;
  right: 40px;
  top: 4px;
}
.state0 {
  background-color: red;
}
</style>