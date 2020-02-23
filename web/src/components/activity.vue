<template>
  <div class="activity">
            <div class="row-fluid top-cats">
        <section class="widget">
          <h3 class="title">活动</h3>
        <ul class="articles">
          <li class="article-entry standard">
            <h4>
              <a >打球</a>
            </h4>
            <span class="article-meta">
             <a class="iconfont">&#xe619;</a> 2020-2-5 20：20
              <a class="iconfont" style="margin-left:50px">&#xe609;</a>体育馆
            </span>
         <span class="like-count">  <a class="iconfont" style="color:red">&#xe647;</a>15</span>
          </li>
         
        </ul>
      </section>
            </div>
  </div>
</template>

<script>
export default {
  name: "activity",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
