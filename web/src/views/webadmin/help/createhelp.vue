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
        <el-input type="textarea" v-model="form.desc" rows="8"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          :action="$axios.defaults.baseURL+'/uplod'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uplogsuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
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
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        name: "",
        type: [],
        resource: "",
        img: []
      }
    };
  },
  //    computed: {
  //   ...mapState({
  //     uplod: state => state.uplod,
  //   })
  // },
  methods: {
    //发布
    onSubmit() {
      this.$axios({
        url: "/webadmin/createhelp",
        method: "POST",
        data: this.qs.stringify(this.form)
      })
        .then(res => {
          let data = res.data.data;
          if (res.data.state.type === "SUCCESS") {
            this.$message("成功");
          } else this.$message("失败");
        })
        .catch(e => {
          this.$message(e);
        });
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件上传成功时的钩子
    uplogsuccess(res) {
      this.form.img = `${this.form.img}|${res.url}`;
      console.log(this.form.img);
    }
  }
};
</script>
<style  scoped>
</style>