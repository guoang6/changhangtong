<template>
  <div class="company">
    <h2>招聘中心</h2>

    <el-tabs type="border-card">
      <el-tab-pane label="公司信息">
        <el-form ref="form" :model="form" label-width="80px" size="medium ">
          <el-form-item label="公司名称">
            <el-input v-model="form.company_name" disabled></el-input>
          </el-form-item>

          <el-form-item label="公司规模">
            <el-input v-model="form.company_scale"></el-input>
          </el-form-item>

          <el-form-item label="公司简介">
            <vue-editor
              useCustomImageHandler
              @image-added="handleImageAdded"
              v-model="form.company_content"
            ></vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changewebcompany">确定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 岗位管理 -->
      <el-tab-pane label="岗位管理">
        <el-button
          type="text"
          icon="el-icon-plus"
          @click="$router.push('/admin/createactivity') "
        >发布新的活动</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      form: {
       company_name: "",
        company_scale: 0,
        company_content: ""
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
   async getwebcompany(){
        let res = await this.$axios.post(
        "/webadmin/getwebcompany",
      );

      if (res.data.state.type === "SUCCESS") {
        this.form = res.data.data;
      }
    },
   async changewebcompany() {
      let res = await this.$axios.post(
        "/webadmin/changewebcompany",
        this.qs.stringify(this.form)
      );

      if (res.data.state.type === "SUCCESS") {
        this.$message.success("公司信息修改成功");
        
      }
    },
  },
  created(){
     this.getwebcompany()
  }
};
</script>
