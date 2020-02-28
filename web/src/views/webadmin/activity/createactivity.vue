<template>
  <div class="createactivity">
    <el-form ref="form" :model="form" label-width="80px" size="medium ">
      <el-form-item label="活动名称">
        <el-input v-model="form.activity_title"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
         <el-date-picker
      v-model="form.activity_statetime"
      type="datetime"
      value-format="timestamp"
      placeholder="选择日期时间">
    </el-date-picker>
         
      </el-form-item>

      <el-form-item label="结束时间">
         <el-date-picker
          value-format="timestamp"
      v-model="form.activity_endtime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      </el-form-item>

      <el-form-item label="地点">
    <el-input v-model="form.activity_locale"></el-input>
      </el-form-item>

      <el-form-item label="人数限制">
        <el-switch v-model="form.activity_impose"></el-switch>
      </el-form-item>

      <el-form-item label="活动人数">
        <el-input v-model="form.activity_num"></el-input>
      </el-form-item>

      <el-form-item label="活动类型">
        <el-radio-group v-model="form.activity_lable">
          <el-radio label="娱乐"></el-radio>
          <el-radio label="运动"></el-radio>
          <el-radio label="志愿者"></el-radio>
          <el-radio label="官方"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="活动形式">
        <el-radio-group v-model="form.activity_type">
          <el-radio label="线上"></el-radio>
          <el-radio label="线下"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容介绍">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="form.activity_content"
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
      dialogImageUrl: [],
      dialogVisible: false,
      form: {
        activity_title: "",
        activity_impose: false,
        activity_num: 0,
        activity_type: "",
        activity_lable: "",
        activity_content: "",
        activity_img: "",
        activity_statetime: "",
        activity_endtime: "",
        activity_locale:''
      }
    };
  },
    components: {
    VueEditor
  },
  props: {
    id: {}
  },
  methods: {
     /**
     * npm install vue2-editor
     * 
     * 富文本编辑器图片上传
     */
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
          "/webadmin/updateactivity",
          this.qs.stringify(this.form)
        );
      } else {
        res = await this.$axios.post(
          "/webadmin/createactivity",
          this.qs.stringify(this.form)
        );
      }
      let data = res.data.data;
      if (res.data.state.type === "SUCCESS") {
        this.$message("成功");
        this.$router.push("/admin/createactivitylist");
      }
    },

    async getactivitydetails() {
      const res = await this.$axios.post(
        "/webadmin/getactivitydetails",
        this.qs.stringify({ id: this.id })
      );
      this.form= res.data.data;
      this.form.activity_impose =res.data. data.activity_impose==="true";
    }
  },
  created() {
    this.id && this.getactivitydetails();
  }
};
</script>
