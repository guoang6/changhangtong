<template>
  <div class="crestehelp">
    <h2>{{id?'编辑':'创建' }}信息</h2>
    <el-form ref="form" :model="form" label-width="80px" size="medium ">
      <el-form-item label="标题">
        <el-input v-model="form.help_title" useCustomImageHandler @image-added="handleImageAdded"></el-input>
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
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="form.help_content"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      lable: ["学习", "生活", "娱乐", "其他"],
      dialogVisible: false,
      form: {
        help_title: "",
        help_lable: "",
        help_content: "",
      }
    };
  },
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  methods: {
    //富文本编辑器图片上传npm install vue2-editor
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$axios.post("/uplod", formData);
      console.log(res);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    //发布与编辑
    async onSubmit() {
      let res;
      if (this.id) {
        this.form.id = this.id;
        res = await this.$axios.post(
          "/webadmin/updateehelp",
          this.qs.stringify(this.form)
        );
      } else {
        res = await this.$axios.post(
          "/webadmin/createhelp",
          this.qs.stringify(this.form)
        );
      }
      let data = res.data.data;
      if (res.data.state.type === "SUCCESS") {
        this.$message("成功");
        this.$router.push("/admin/createhelplist");
      }
    },
    async gethelpdetails() {
      const res = await this.$axios.post(
        "/webadmin/gethelpdetails",
        this.qs.stringify({ id: this.id })
      );
      let data = res.data.data;
      // console.log(data)
      this.form.help_title = data.help_title;
      this.form.help_lable = data.help_lable;
      this.form.help_content = data.help_content;
    }
  },
  created() {
    this.id && this.gethelpdetails();
  }
};
</script>
<style  scoped>
</style>