<template>
  <div class="myself">
    <el-form ref="form" :model="form" label-width="150px" size="medium ">
      <el-form-item label="头像">
        <el-upload
          :action="$axios.defaults.baseURL+'/uplod'"
           :show-file-list="false"
          :on-success="uplogsuccess"
          class="avatar-uploader"
        >
          <img v-if="form.imgurl" :src="form.imgurl" class="avata" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="qq">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="onSubmit">确定</el-button> -->
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        imgurl:'',
        user: "",
        region: ""
      }
    };
  },
  methods: {
    //文件上传成功时的钩子
    uplogsuccess(res) {
      this.form.imgurl=res.url 
    },
  }
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avata {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

