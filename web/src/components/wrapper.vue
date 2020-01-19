<template>
  <div class="hello">
    <!-- Start of Search Wrapper -->
    <div class="search-area-wrapper">
      <div class="search-area container">
        <h3 class="search-header">昌航通</h3>
        <p class="search-tag-line">
          Information sharing and communication platform of Nanchang Hangkong University
         , Makes information transfer easier
        </p>

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
