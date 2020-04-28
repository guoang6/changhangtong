<template>
  <div class="kefu">
    <div v-title data-title="昌航通  |  账号申诉"></div>
    <div class="main">
      <el-page-header @back="$router.back(-1)" content="账号申诉"></el-page-header>
        <div v-if="type===0">

        </div>
        <div v-if="type===1">

        </div>
      <el-form
        v-if="type===3"
        ref="form"
        :model="form"
        label-width="80px"
        size="medium "
        style="margin-top:40px"
      >
        <el-form-item label="邮箱">
          <el-input v-model="form.kefu_user" useCustomImageHandler ></el-input>
        </el-form-item>
        <el-form-item label="反馈">
          <el-input type="textarea" :rows="10" placeholder="请输入反馈的内容" v-model="form.kefu_content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div v-if="type===4" style="margin-top:50px">
        <div class="top">
          <el-button type="success" icon="el-icon-check" style="margin-right:50px" circle></el-button>反馈成功
        </div>
        <div class="bottom">
           <P style="text-indent:2em;">感谢您的反馈，我们会尽快做出处理，对于好的建议我们会进行采纳，并对平台做出相应的调整</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      type: 0,
      form: {
        kefu_content: "",
        kefu_user: "", //  用户di
        kefu_img: "",
        kefu_url: "",
        kefu_type: "fankui"
      }
    };
  },
  methods: {
    async onSubmit() {
      let res = await this.$axios.post(
        "/webadmin/createkefu",
        this.qs.stringify(this.form)
      );
      let data = res.data.data;
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("反馈成功");
        this.type = 1;
      }
    }
  }
};
</script>
<style  scoped>
.kefu {
  width: 50%;
  min-height: 500px;
  margin: 0 auto;
  border-style: solid;
  border-width: 5px;
  border-radius: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 30px;
}
.kefu .main {
  margin: 0 auto;
  width: 80%;
}
.top{
  width: 200px;
  font-size: 20px;
  margin: 0 auto;
    padding: 60px;
}
.bottom{
  font-size: 15px;

}
</style>