<template>
  <div class="index">
        <!-- Start of Header -->
                <div class="header-wrapper">
                        
                        <header>
                                <div class="container">
                                        <!-- Start of Main Navigation -->
                                        <nav class="main-nav">
                                                <div class="menu-top-menu-container">
                                                        <ul id="menu-top-menu" class="clearfix">
                                                                <li class="current-menu-item"><a href="index-2.html">首页</a></li>
                                                                <li><a href="home-categories-description.html">问答</a></li>
                                                                <li><a href="home-categories-articles.html">活动</a></li>
                                                                <li><a href="articles-list.html">失物品</a></li>
                                                                <li><a href="faq.html">招聘信息</a></li>
                                                                 <li><a href="#">二手信息</a></li>
                                                                <li><a href="#">文章</a></li>
                                                                <li><a href="#">个人中心</a></li>
                                                        </ul>
                                                </div>
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
import home from '@/views/home.vue'

export default {
  name: 'index',
  components: {
    home
  }
}
</script>
