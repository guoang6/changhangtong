<template>
  <div class="hello">
    <!-- start of sidebar -->
    <section class="widget">
      <!-- <div class="support-widget">
      </div>-->
      <el-carousel height="250px">
        <el-carousel-item v-for="(carousel,id) in carousel" :key="id">
          <div style="height:250px;position:relative">
            <a  :href="carousel.carousel_url" target="_blank">
            <h3 style="z-index=33; position: absolute;left: 6px;bottom: 0px;">厚度卡湖卡号对啊后的</h3>
            <img :src="carousel.carousel_img" alt class="carouselimg" />
          </a>
          </div>
          
        </el-carousel-item>
      </el-carousel>
    </section>
    <!-- end of sidebar -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      carousel: []
    };
  },
  methods: {
    async carousellist() {
      console.log("轮播图");

      let res = await this.$axios.post(
        "/admin/carousellist",
        this.qs.stringify({ lable_name: "" })
      );
      if (res.data.state.type === "SUCCESS") {
        this.carousel = res.data.data;
        console.log("轮播数据");
        console.log(this.carousel);
      }
    }
  },
  created() {
    this.carousellist();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carouselimg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
