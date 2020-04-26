<template>
  <div class="adminhome">
    <div class="left">
      <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
        <article id="comment-4">
          <img :src="form.avatar" class="avatar touxiang avatar-60 photo" height="60" width="60" />

          <div class="comment-meta">
            <h5 class="author">{{form.nickname}}</h5>

            <p class="date" v-if="form.realstate==3">
              认证用户
            </p>
             <p class="date" v-else>
              未认证用户
            </p>
          </div>
          <div  @click="$router.push('/admin/myself') ">编辑信息</div>
        </article>
      </li>
      <div class="xinxi">
        <p style="  color: #000;">邮箱：</p>
        <p>{{form.mail}}</p>
      </div>
      <div class="xinxi">
        <p style="  color: #000;">QQ：</p>
        <p>{{form.qq}}</p>
      </div>
      <div class="xinxi">
        <p style="  color: #000;">个人简介：</p>
        <p>{{form.synopsis}}</p>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    //获取用户信息
    async getuser() {
      let res = await this.$axios.post("/webadmin/getuser");
      this.form = res.data.data;
      console.log(this.form);
      console.log(res);
    }
  },
  created() {
    this.getuser();
  }
};
</script>
<style scoped>
.xinxi p {
  display: inline;
}
.xinxi {
  margin-top: 30px;
  margin-left: 30px;
}
.left {
  width: 30%;
}
.right {
  width: 70%;
  background-color: rgb(231, 206, 206);
}
</style>