<template>
  <div class="index">
    <!-- Start of Header -->
    <div class="header-wrapper">
      <header>
        <div class="container">
          <div class="logo-container">
            <!-- Website Logo -->
            <span style="font-size: 35px;color: white;">昌航通</span>
            <span class="tag-line">南昌航空大学信息交流平台</span>
          </div>
          <!-- Start of Main Navigation -->
          <nav class="main-nav">
            <div class="menu-top-menu-container">
              <ul id="menu-top-menu" class="clearfix">
                <router-link to="home" tag="li" exact-active-class="current-menu-item">
                  <a>首页</a>
                </router-link>
              <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a>问答</a>
                </router-link>
                <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a>活动</a>
              </router-link>
                <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a >失物品</a>
                </router-link>
                <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a>招聘信息</a>
              </router-link>
              <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a >二手信息</a>
              </router-link>
                <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a >文章</a>
              </router-link>
              <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a @click="close">登录</a>
                </router-link>
                <router-link to="adminhome" tag="li" exact-active-class="current-menu-item">
                  <a>个人中心</a>
                </router-link>
              </ul>
            </div>
            <select class="responsive-nav">
              <option value selected>菜单</option>
              <option value="index-2.html">首页</option>
              <option value="home-categories-description.html">问答</option>
              <option value="home-categories-articles.html">活动</option>
              <option value="articles-list.html">失物</option>
              <option value="faq.html">招聘信息</option>
              <option value="#">二手信息</option>
              <option value="blue-skin.html" @click="close">个人中心</option>
            </select>
          </nav>
          <!-- End of Main Navigation -->
        </div>
      </header>
    </div>
    <!-- End of Header -->
    <!-- Start of Search Wrapper -->
    <div class="search-area-wrapper">
      <div class="search-area container">
        <form
          id="search-form"
          class="search-form clearfix"
          method="get"
          action="#"
          autocomplete="off"
        >
          <input class="search-btn" type="submit" value="发布信息" @click="close" />
          <div id="search-error-container"></div>
        </form>
        <p class="search-tag-line" style="margin-top:50px">
          Information sharing and communication platform of Nanchang Hangkong University
          , Makes information transfer easier
        </p>
      </div>
    </div>
    <!-- End of Search Wrapper -->
    <router-view/>
    <!-- 弹窗组件 -->
    <div class="login" v-if="isclose">
      <div id="mask"></div>
      <div id="loginBox">
        <h2>{{islogin?"网站登录":"新用户注册"}}</h2>
        <div class="user">
          账 号：
          <input type="text" v-model="username" name="username" class="text" />
        </div>
        <div class="pass">
          密 码：
          <input type="password" v-model="password" name="password" class="text" />
        </div>
        <div class="pass" v-if="!islogin">
          确 认：
          <input type="password" v-model="password1" name="password" class="text" />
        </div>
        <div class="button" v-if="islogin">
          <input type="button" @click="login"   value="登录" class="submit" />
        </div>
        <div class="button" v-else>
          <input type="button" value="注册" @click="   registered " class="submit" />
        </div>
        <div class="other" @click="join">{{islogin?"注册新用户":"快去登录"}}</div>
        <a class="iconfont" @click="close">&#xe608;</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import home from "@/views/home.vue";
export default {
  name: "index",
  data() {
    return {
      islogin: true,
      isclose: false,
      password: "",
      password1: "",
      username: "",
    };
  },
  components: {
   
  },
  methods: {
    join() {
      this.islogin = !this.islogin;
    },
    close() {
      this.isclose = !this.isclose;
    },

    registered() {
      const userReg = /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{5,9}$/; //6-10位字母数字
      const pwdReg = /^[a-zA-Z]\w{5,17}$/; //6-18位字母数字下划线 字母开头
      if (
        !userReg.test(this.username)
      ) {
        this.$message("账号为6-10位字母数字");
        return;
      }
       if (
        !pwdReg.test(this.password)
      ) {
        this.$message("密码为6-18位字母数字下划线 字母开头")
        return
      }
       if (
        this.password!==this.password1
      ) {
        this.$message("两次密码不相等")
        return
      }
      let obj = {
        password: this.password,
        username: this.username
      };
      this.$axios({
        url: '/webadmin/registered',
        method: "POST",
        data: this.qs.stringify(obj)
      })
        .then(res => {
          let data = res.data
          if (data.state.type !== "SUCCESS") {
            if (data.state.type == "ERROR_PARAMS_EXIST") {
               this.$message('用户名重复')
            } else {
               this.$message('注册失败');
            }
            return
          }
         this.$message('注册成功请登录');
         this.join()
        })
        .catch(e => {
          alert(e);
        });
    },
    //登录
    login() {
      if (
        !this.password||!this.password1
      ) {
        this.$message("账号或者密码为空")
        return
      }
      // this.pwdhash = crypto
      //   .createHash("sha1")
      //   .update(this.password)
      //   .digest("hex");
      // let this_ = this;
       let obj = {
        password: this.password,
        username: this.username
      };
      this.$axios({
        url: '/webadmin/login',
        method: "POST",
        data: this.qs.stringify(obj)
      })
        .then(res => {
          let data = res.data;
          console.log(data)
          if (data.state.type === "SUCCESS") {
            this.$message("登录成功")
          }else this.$message("用户名或密码错误")
        })
        .catch(e => {
          alert(e);
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  filter: alpha(Opacity=30);
  opacity: 0.2;
  margin: 0;
  /* display: none;  */
}
#loginBox {
  position: fixed;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
  z-index: 1000;
  width: 380px;
  height: 330px;
  border: 1px solid #ccc;
  background-color: #fff;
  /* display: none;  */
}
#loginBox h2 {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #666;
  /* background: url(../images/login_header.png) repeat-x; */
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
  margin: 0 0 20px 0;
}
#loginBox h2 img {
  display: block;
  float: right;
  position: relative;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
#loginBox .user,
#loginBox .pass {
  font-size: 14px;
  color: #666;
  padding: 5px 0;
  text-align: center;
}
#loginBox input.text {
  width: 200px;
  height: 25px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #fff;
}
#loginBox .button {
  text-align: center;
  padding: 10px 0;
}
#loginBox input.submit {
  width: 107px;
  height: 30px;
  background-color: rgb(179, 146, 233);
  border: none;
  cursor: pointer;
}
#loginBox .other {
  text-align: right;
  padding: 15px 10px;
  font-size: 14px;
  color: #666;

  cursor: pointer;
}
.iconfont {
  font-size: 20px;
  color: #000;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>

