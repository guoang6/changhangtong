<template>
    <div class="adminhome">




       <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
                  <article id="comment-4">
                      <img
                       :src="circleUrl"
                        class="avatar touxiang avatar-60 photo"
                        height="60"
                        width="60"
                      />

                    <div class="comment-meta">
                      <h5 class="author">
                        guoang
                      </h5>

                      <p class="date">
                          未学生认证
                          1
                      </p>
                       <p>编辑个人信息</p>
                    </div>
                  </article>
                  <!-- end of comment -->
                </li>
                <el-steps :active="2" align-center>
  <el-step title="账号注册" description="填写个人信息"></el-step>
  <el-step title="完善信息" description="普通用户只能发布普通问答信息"></el-step>
  <el-step title="实名认证" description="实名认证猴就可以获取更多权力和功能"></el-step>
  <el-step title="认证成功" description="快去使用更多功能吧"></el-step>
</el-steps>
                          
</div>
</template>
<script>
  export default {
    data() {
      return {
        circleUrl: 'http://127.0.0.1:3000/uplodes/moren'
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>