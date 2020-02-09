<template>
<div class="crestehelp">

    <el-form ref="form" :model="form" label-width="80px" size="medium ">
  <el-form-item label="标题">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="标签">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="学习" name="type"></el-checkbox>
      <el-checkbox label="生活" name="type"></el-checkbox>
      <el-checkbox label="娱乐" name="type"></el-checkbox>
      <el-checkbox label="其他" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="内容">
    <el-input type="textarea"  v-model="form.desc" rows="8"></el-input>
  </el-form-item>
   <el-form-item label="图片">
  <el-upload
  :action="$axios.defaults.baseURL+'/uplod'"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
 </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">发布</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>

</template>

<script>
// import { mapState } from "vuex";
  export default {
    data() {
      return {
           dialogImageUrl: '',
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
  //    computed: {
  //   ...mapState({
  //     uplod: state => state.uplod,
  //   })
  // },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    
    }
  }
</script>
<style  scoped>
</style>