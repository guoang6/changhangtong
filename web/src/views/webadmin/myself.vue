<template>
  <div class="myself">
    <h2>信息编辑</h2>
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息编辑">
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
      </el-tab-pane>
      <el-tab-pane label="实名认证">
        <el-steps :active="2" align-center>
          <el-step title="填写个人信息" description></el-step>
          <el-step title="审核中" description></el-step>
          <el-step title="认证通过" description></el-step>
        </el-steps>
        <el-form ref="form" :model="form" label-width="150px" size="medium ">
          <el-form-item label="姓名">
            <el-input v-model="student.realname"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="student.studentid"></el-input>
          </el-form-item>
          <el-form-item label="学生证">
            <el-upload
              :action="$axios.defaults.baseURL+'/uplod'"
              list-type="picture-card"
              :on-success="studentuploadsuccess"
              :on-remove="studenthandleRemove"
               :file-list="this.student.studentcard"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog>
              <img width="100%" :src="student.studentcard" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitstudent">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="公司认证">
        <el-steps :active="2" align-center>
          <el-step title="填写公司信息信息" description></el-step>
          <el-step title="等待审核" description></el-step>
          <el-step title="认证通过" description></el-step>
        </el-steps>
        <el-form ref="form" :model="form" label-width="150px" size="medium ">
          <el-form-item label="公司名称">
            <el-input v-model="company.companyname"></el-input>
          </el-form-item>
          <el-form-item label="公司信息">
            <el-upload
              :action="$axios.defaults.baseURL+'/uplod'"
              list-type="picture-card"
              :on-success="companyuploadsuccess"
              :on-remove="companyhandleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog>
              <img width="100%" :src="company.companyimg" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitcompany">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      student: {
        m: "student",
        realname: "",
        studentid: "",
        studentcard: []
      },
      company: {
        m: "company",
        companyname: "",
        companyimg: []
      },
      form: {
        m: "user",
        avatar: "",
        nickname: "",
        qq: "",
        mail: "",
        phone: "",
        synopsis: ""
      },
      dataform: {}
    };
  },
  methods: {
    ...mapActions("user", ["setUserInfo"]),
    //文件上传成功时的钩子
    uplogsuccess(res) {
      this.form.avatar = res.url;
    },
    //
    studentuploadsuccess(res) {
      this.student.studentcard.push({ url: res.url });
      console.log(this.student.studentcard);
      console.log(res.url);
    },
    //文件列表移除文件时的钩子
    studenthandleRemove(file, fileList) {
      console.log(file, fileList);
      let b = this.student.studentcard.indexOf(file);
      this.student.studentcard.splice(b, 1);
      console.log(this.student.studentcard);
    },
    //
    companyuploadsuccess(res) {
      this.company.companyimg.push({ url: res.url });
      console.log(this.company.companyimg);
      console.log(res.url);
    },
    //文件列表移除文件时的钩子
    companyhandleRemove(file, fileList) {
      console.log(file, fileList);
      let b = this.company.companyimg.indexOf(file);
      this.company.companyimg.splice(b, 1);
      console.log(this.company.companyimg);
    },
    //学生认证
    onSubmitstudent() {
      this.dataform = this.student;
      console.log(this.dataform.studentcard.length);
      let img = [];
      for (let i = 0; i < this.dataform.studentcard.length; i++) {
        img.push(this.dataform.studentcard[i].url);
      }
      this.dataform.studentcard = String(img);
      console.log(String(img));
      this.studentandcompany();
    },
    //公司认证
    onSubmitcompany() {
      this.dataform = this.company;
      this.studentandcompany();
    },
    //信息认证
    async studentandcompany() {
      const res = await this.$axios.post(
        "/webadmin/updatauser",
        this.qs.stringify(this.dataform)
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("信息提交成功等待审核");
      }
    },
    //用户信息修改
    async onSubmit() {
      const res = await this.$axios.post(
        "/webadmin/updatauser",
        this.qs.stringify(this.form)
      );
      let data = res.data.data;
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("成功");
        this.setUserInfo(data.userinfo);
      }
    },
    //获取用户信息
    async getuser() {
      let res = await this.$axios.post("/webadmin/getuser");
      this.form = res.data.data;
      let ImageUrl = [];
      if (this.form.studentcard != null) {
        let img = this.form.studentcard.split(",");

        for (let i = 0; i < img.length; i++) {
          ImageUrl.push({ url: img[i] });
        }
      }
      this.student = {
        m: "student",
        realname: this.form.realname,
        studentid: this.form.studentid,
        studentcard: ImageUrl
      };
      // console.log(this.form);
      console.log(this.student);
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

