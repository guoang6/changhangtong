<template>
  <div class="index">
    <!-- Start of Header -->
    <div class="header-wrapper">
      <header>
        <div class="container">
          <div class="logo-container">
            <!-- Website Logo -->
            <span style="font-size: 35px;color: white;">昌航通</span>
            <span class="tag-line">南昌航空大学信息交流平台</span>
          </div>
          <!-- Start of Main Navigation -->
          <nav class="main-nav">
            <div class="menu-top-menu-container">
              <ul id="menu-top-menu" class="clearfix">
                <li class="current-menu-item">
                  <a href="index-2.html">首页</a>
                </li>
                <li>
                  <a href="home-categories-description.html">问答</a>
                </li>
                <li>
                  <a href="home-categories-articles.html">活动</a>
                </li>
                <li>
                  <a href="articles-list.html">失物品</a>
                </li>
                <li>
                  <a href="faq.html">招聘信息</a>
                </li>
                <li>
                  <a href="#">二手信息</a>
                </li>
                <li>
                  <a href="#">文章</a>
                </li>
                <li>
                  <a href="#">个人中心</a>
                </li>
              </ul>
            </div>
            <select class="responsive-nav">
              <option value selected>菜单</option>
              <option value="index-2.html">首页</option>
              <option value="home-categories-description.html">问答</option>
              <option value="home-categories-articles.html">活动</option>
              <option value="articles-list.html">失物</option>
              <option value="faq.html">招聘信息</option>
              <option value="#">二手信息</option>
              <option value="blue-skin.html">个人中心</option>
            </select>
          </nav>
          <!-- End of Main Navigation -->
        </div>
      </header>
    </div>
    <!-- End of Header -->

    <home />
  </div>
</template>

<script>
// @ is an alias to /src
import home from "@/views/home.vue";

export default {
  name: "index",
  components: {
    home
  }
};
</script>
