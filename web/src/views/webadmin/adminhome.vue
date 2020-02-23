<template>
  <div class="adminhome">
    <div class="left">

    <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
      <article id="comment-4">
        <img :src="circleUrl" class="avatar touxiang avatar-60 photo" height="60" width="60" />

        <div class="comment-meta">
          <h5 class="author">guoang</h5>

          <p class="date">
            未学生认证
            1
          </p>
        </div>
        <div>编辑信息</div>
      </article>
    </li>
    <div class="xinxi">
      <p style="  color: #000;">邮箱：</p>
      <p>354844@qq.com</p>
    </div>
    <div class="xinxi">
      <p style="  color: #000;">QQ：</p>
      <p>354844</p>
    </div>
     <div class="xinxi">

      <p style="  color: #000;">个人简介：</p>
      <p>萨哈洛夫啊烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦方法帆帆帆帆帆帆帆帆帆帆帆帆帆帆帆帆帆帆帆帆反反复复烦烦烦烦烦烦烦烦烦烦烦烦</p>
    </div>
    </div>
<div class="right">

</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl: "http://127.0.0.1:3000/uplodes/moren"
    };
  },
  methods: {}
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
.left{
  width: 30%;
}
.right{
  width: 70%;
  background-color: rgb(231, 206, 206);
}
</style>