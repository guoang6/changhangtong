<template>
  <div class="crestehelp">
    <h2>{{id?'编辑':'创建' }}信息</h2>
    <el-form ref="form" :model="form" label-width="80px" size="medium ">
      <el-form-item label="标题">
        <el-input v-model="form.help_title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-radio
          v-for="(item,id) in lable"
          :key="id"
          :class="'page_span_'+id "
          v-model="form.help_lable"
          :label="item"
        >{{item}}</el-radio>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.help_content" rows="8"></el-input>
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
      lable: ["学习", "生活", "娱乐", "其他"],
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        nahelp_titleme: "",
        help_lable: "",
        help_content: "",
        help_img: []
      }
    };
  },
  props: {
    id: {}
  },
  //    computed: {
  //   ...mapState({
  //     uplod: state => state.uplod,
  //   })
  // },
  methods: {
    //发布
    async onSubmit() {
      const res = await this.$axios.post(
        "/webadmin/createhelp",
        this.qs.stringify(this.form)
      );
      let data = res.data.data;
      if (res.data.state.type === "SUCCESS") {
        this.$message("成功");
        this.$router.push("/admin/createhelplist");
      }
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
      this.form.help_img = `${this.form.help_img}|${res.url}`;
      // console.log(this.form.help_img);
      console.log(res.url);
    },
    async gethelpdetails() {
      const res = await this.$axios.post(
        "/webadmin/gethelpdetails",
        this.qs.stringify({ id: this.id })
      );
      let data = res.data.data;
      console.log(data)
      this.form.help_title = data.help_title;
      this.form.help_lable = data.help_lable;
      this.form.help_content = data.help_content;
      this.form.help_img = data.help_img;
    }
  },
  created() {
    this.id && this.gethelpdetails();
  }
};
</script>
<style  scoped>
</style>