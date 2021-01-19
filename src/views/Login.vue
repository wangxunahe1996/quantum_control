<template>
  <div id="login">
    <div id="loginFormDiv">
      <div class="logo">
        <!-- <img
          src="../assets/images/u26.png"
          alt=""
          width="449px"
          height="361px"
        /> -->
      </div>
      <div class="formDiv">
        <p class="formTilte">离朱平台</p>
        <p class="formP">汇聚海量空天多源数据，AI处理精准助力遥感应用服务</p>
        <a-form-model
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          class="loginForm"
        >
          <a-form-model-item prop="username">
            <a-input
              v-model="loginForm.username"
              type="text"
              autocomplete="off"
              placeholder="请输入用户名称"
            />
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              @click="login('loginForm')"
              class="submitBtn"
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="toOtherPage">
          <span class="left" @click="goto('/forgetPwd')">忘记密码?</span>
          <span class="right" @click="goto('/register')">注册账号</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let validatorUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    let validatorPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: { validator: validatorUsername, trigger: "blur" },
        password: { validator: validatorPassword, trigger: "blur" }
      }
    };
  },
  methods: {
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
        }
      });
    },
    goto(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less" scoped>
// @import "../assets/css/color.less";
#login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background: url("../assets/images/u6.jpg") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  #loginFormDiv {
    width: 890px;
    height: 450px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    .logo {
      flex: 0 0 50%;
      height: 100%;
      padding-top: 80px;
      margin-right: 20px;
    }
    .formDiv {
      padding: 50px 30px 0 0px;

      flex: 1;
      .formTilte {
        font-size: 24px;
        font-weight: bold;
      }
      .formP {
        font-size: 16px;
        margin-top: 18px;
      }
      .ant-input {
        outline: 0;
        border-top: 0;
        border-left: 0;
        border-radius: 0;
        border-right: 0;
        padding-left: 0;
        &:focus {
          box-shadow: none;
        }
      }
      .loginForm {
        margin-top: 50px;
        .ant-form-item {
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
        }
        .submitBtn {
          width: 100%;
        }
      }
      .toOtherPage {
        overflow: hidden;

        // color: @LOGIN_COLOR;
        span {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
