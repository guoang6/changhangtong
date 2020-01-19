<template>
  <div class="hello">
    <!-- Start of Search Wrapper -->
    <div class="search-area-wrapper">
      <div class="search-area container">
       
       
        <form
          id="search-form"
          class="search-form clearfix"
          method="get"
          action="#"
          autocomplete="off"
        >
          <input class="search-btn" type="submit" value="发布信息" />
          <div id="search-error-container"></div>
        </form>
        <p class="search-tag-line" style="margin-top:50px">
          Information sharing and communication platform of Nanchang Hangkong University
         , Makes information transfer easier
        </p>
      </div>
    </div>
    <!-- End of Search Wrapper -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
