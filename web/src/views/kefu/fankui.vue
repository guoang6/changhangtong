<template>
    <div  class="kefu">
<div v-title data-title="昌航通  |  意见反馈"></div>
       <div class="main">
            <el-page-header @back="$router.back(-1)" content="意见反馈"></el-page-header>

           <el-form ref="form" :model="form" label-width="80px" size="medium " style="margin-top:40px">
      <el-form-item label="邮箱">
        <el-input v-model="form.article_title" useCustomImageHandler @image-added="handleImageAdded"></el-input>
      </el-form-item>
      <el-form-item label="反馈">
        <el-input type="textarea"   :rows="10" placeholder="请输入反馈的内容" v-model="form.article_introduction"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" >确定</el-button>
        <el-button  >取消</el-button>
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
          form:{
          }
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
    width:80%;    
}
</style>