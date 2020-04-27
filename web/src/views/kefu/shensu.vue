<template>
    <div  class="kefu">
       <div class="main">
           <el-form ref="form" :model="form" label-width="80px" size="medium ">
      <el-form-item label="邮箱">
        <el-input v-model="form.article_title" useCustomImageHandler @image-added="handleImageAdded"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :rows="2" placeholder="请输入文章简介" v-model="form.article_introduction"></el-input>
      </el-form-item>
    </el-form>
       </div>
    </div>
</template>
<script>
export default {
    name:'',
    data(){
        return{

        }
    }
}
</script>
<style  scoped>
.kefu{
    width:50%;
    min-height: 500px;
    margin: 0 auto;
     border-style:solid;
    border-width:5px;
     border-radius: 25px;
     margin-top: 20px;
     margin-bottom: 20px;
     padding: 30px;
}
.kefu .main{
    margin: 0 auto;
    width:50%;    
}
</style>