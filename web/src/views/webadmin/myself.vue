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
          <img v-if="form.avatar" :src="form.avatar" class="avata" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail"></el-input>
      </el-form-item>
      <el-form-item label="qq">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
            <el-form-item label="邮箱">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="form.synopsis" rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        avatar: "",
        nickname: "",
        qq: "",
        mail: "",
        phone:'',
        synopsis: ""
      }
    };
  },
  methods: {
    ...mapActions("user", ["setUserInfo"]),
    //文件上传成功时的钩子
    uplogsuccess(res) {
      this.form.avatar = res.url;
    },
    //用户信息修改
    async onSubmit() {
      const res = await this.$axios.post(
        "/webadmin/updatauser",
        this.qs.stringify(this.form)
      );
      let data = res.data.data;
      if (res.data.state.type === "SUCCESS") {
        this.$message("成功");
        this.setUserInfo(data.userinfo);
      }
    },
    //获取用户信息
    async getuser() {
      let res = await this.$axios.post("/webadmin/getuser");
      this.form = res.data.data;
      console.log(this.form);
      console.log(res);
    }
  },
  created() {
    this.getuser();
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

