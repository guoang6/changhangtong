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
      <el-form-item label="活动内容">
        <el-input type="textarea" v-model="form.activity_content" rows="8"></el-input>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
          :action="$axios.defaults.baseURL+'/uplod'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uplogsuccess"
          :file-list="this.dialogImageUrl"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
        activity_endtime: ""
      }
    };
  },
  props: {
    id: {}
  },
  methods: {
    //发布与编辑
    async onSubmit() {
      let img = [];
      let res;
      for (let i = 0; i < this.dialogImageUrl.length; i++) {
        img.push(this.dialogImageUrl[i].url);
      }1
      console.log(this.form);
      this.form.activity_img = String(img);
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
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let b = this.dialogImageUrl.indexOf(file);
      this.dialogImageUrl.splice(b, 1);
      console.log(this.dialogImageUrl);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    //文件上传成功时的钩子
    uplogsuccess(res) {
      this.dialogImageUrl.push({ url: res.url });
      console.log(this.dialogImageUrl);
      console.log(res.url);
    },
    async getactivitydetails() {
      const res = await this.$axios.post(
        "/webadmin/getactivitydetails",
        this.qs.stringify({ id: this.id })
      );
      let data = res.data.data;
      console.log(data)
      this.form.activity_title = data.activity_title;
      this.form.activity_lable = data.activity_lable;
      this.form.activity_num = data.activity_num;
      this.form.activity_impose = data.activity_impose==="true";
      this.form.activity_type = data.activity_type;
      this.form.activity_content = data.activity_content;
      this.form.activity_img = data.activity_img;
     this.form.activity_statetime = data.activity_statetime
      this.form.activity_endtime = data.activity_endtime
      console.log(this.form)
      if (data.activity_img != "") {
        let img = data.activity_img.split(",");
        for (let i = 0; i < img.length; i++) {
          this.dialogImageUrl.push({ url: img[i] });
        }
        console.log(this.dialogImageUrl);
      }
    }
  },
  created() {
    this.id && this.getactivitydetails();
  }
};
</script>
