<template>
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">阅书</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: loginway }"
              @click="loginway = true"
              >注册</a
            >
            <a
              href="javascript:;"
              :class="{ on: !loginway }"
              @click="loginway = false"
              >登录</a
            >
          </div>
        </div>
        <div class="login_content">
          <!-- 注册开始 -->
          <!-- prevent 阻止事件的默认提交行为 -->
          <form @submit.prevent="register">
            <div :class="{ on: loginway }">
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="请输入注册用户名"
                  v-model="registername"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  maxlength="20"
                  placeholder="请输入注册密码"
                  v-model="registerpass"
                />
              </section>
              <button class="login_submit">注册</button>
            </div>
          </form>
          <!-- 注册结束 -->
          <!-- 登录开始 -->
          <form @submit.prevent="login">
            <div :class="{ on: !loginway }">
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="请输入登录用户名"
                    v-model="loginname"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="text"
                    maxlength="20"
                    placeholder="请输入密码"
                    v-model="loginpass"
                    v-if="showpwd"
                  />
                  <input
                    type="password"
                    maxlength="20"
                    placeholder="请输入密码"
                    v-model="loginpass"
                    v-else
                  />
                  <div
                    class="switch_button"
                    :class="showpwd ? 'on' : 'off'"
                    @click="showpwd = !showpwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showpwd }"
                    ></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
                <!-- <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" />
                  <img
                    class="get_verification"
                    src="./images/captcha.svg"
                    alt="captcha"
                  />
                </section> -->
              </section>
              <button class="login_submit">登录</button>
            </div>
            <!-- 登录结束 -->
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back">
          <i class="iconfont icon-jiantou2" @click="goBack"></i>
        </a>
      </div>
      <AlertTip v-show="showalert" :alertText="showText" @closeTip="closeTip"></AlertTip>
    </section>
  </div>
</template>

<script>
//导入注册的方法
import {doregister,dologin} from '../../api/index'
//导入提示框内容
import AlertTip from '../../components/AlertTip/AlertTip'
export default {
  //映射为标签
  components:{
    AlertTip
  },
  data() {
    return {
      loginway: true,
      showpwd: false,
      registername:'',//注册的名字
      registerpass:'',//注册的密码
      showalert:false,
      showText:'',
      loginname:'',//登录用户的名字
      loginpass:'',//登录用户的密码
    };
  },

  methods: {
    //执行注册的方法
    register:async function(){
      // console.log('这是注册操作');
      //获取用户注册和密码
      let name=this.registername
      let pass=this.registerpass
      // console.log(name,pass);
      //校验注册用户和密码
      if(!/^\w{6,8}$/.test(name)){
        // console.log('用户名必须是6-8位数字字母或下划线');
        // 显示提示框
        this.showalert=true
        this.showText='用户名必须是6-8位数字字母或下划线'
        return;
      }
      if(!/^\w{8,18}$/.test(pass)){
        // console.log('密码必须是8-18位数字字母或下划线');
        // 显示提示框
        this.showalert=true
        this.showText='密码必须是8-18位数字字母或下划线'
        return;
      }
      // 调用后端注册接口
       let res = await doregister(name,pass)
      //  console.log(res);
      // 判断跳转
      if(res.msg==='ok'){
        //分发动作 把用户登录的名字更新到vuex中
        this.$store.dispatch('getusername',name)
       this.$router.push('/profile')
      }

    },
    goBack() {
      this.$router.push("/");
    },
    //执行登录
    login:async function(){
      //获取登录用户名和密码
      let name = this.loginname
      let pass = this.loginpass
      // console.log(name,pass);
      let res = await dologin(name,pass)
      // console.log(res);
      if(res.msg==='usernameiserror'){
        this.showalert=true
        this.showText='用户名不正确'
        return;
      }
      if(res.msg==='userpassiserror'){
        this.showalert=true
        this.showText='密码不正确'
        return;
      }
      if(res.msg==='ok'){
        //分发动作 把用户登录的名字更新到vuex中
        this.$store.dispatch('getusername',name)
       this.$router.push('/profile')
        return;
      }

    },
    closeTip:function(){
      //关闭提示框
      this.showalert=false
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }
            }
          }

          .right {
            transform: translateX(30px);
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>