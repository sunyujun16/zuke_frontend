<template>
  <div class="login-reg" v-show="loginRegOpen" @click.self="toggleCallBack()">
    <!--    <div style="height: 300px; width: 0"></div>-->
    <div class="login-reg-container">
      <span :class="{'log-reg-default':!isLogging, 'log-reg-active':isLogging}" @click="isLogging=true">登录</span>
      <span :class="{'log-reg-default':isLogging, 'log-reg-active':!isLogging}" @click="isLogging=false">注册</span>
      <div class="zk-logreg-horizen-line"></div>
      <div style="height: 10px"></div>
      <div class="zk-login-box" v-show="isLogging">
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="zk-reg-box" v-show="!isLogging">
        <el-form :model="regForm" status-icon :rules="regRules" ref="regForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="regForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="regForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="regForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
            <el-button @click="resetForm('regForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>


  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import md5 from 'js-md5';

export default {
  name: "LoginRegister",
  props: ['toggleCallBack'],
  data() {
    let checkUsernameForLog = (rule, username, callback) => {
      console.log(" -- 登录用户名校验开始 -- ")
      if (!username) {
        callback(new Error('用户名不能为空撒'));
        return
      }
      setTimeout(() => {
        if (username.length > 16) {
          callback(new Error('用户名过长'));
          console.log("~用户名过长触发~")
          return
        }
        // 正则表达式判断字符合法性
        if (!username.match(/^[\u4E00-\u9FA5\uF900-\uFA2D|\w@.#]{1,20}$/)) {
          callback(new Error('用户名格式错误, 请勿使用[中文、字母、数字和下划线]以外的字符'))
          console.log("~非法字符触发~");
        }
        callback();
      }, 200);
      console.log(' -- 登录用户名校验结束 -- ')
      // 此处如果调用callback(), 会阻止延时器里面的callback()调用, 也就是说, 它只能调用一次? 不知道为什么...
      // 但是如果不调用, Submit成功时就无法触发任何callback()导致失败 ...
      // callback(); // 所以 ... 叮~! 把它放进延时器内部! 啊, 我好机智.
    };
    let checkUsernameForReg = (rule, username, callback) => {
      console.log(" -- 注册用户名校验开始 -- ")
      if (!username) {
        callback(new Error('用户名不能为空噻'));
        return
      }
      setTimeout(() => {
        if (username.length > 16) {
          callback(new Error('用户名过长'));
          console.log("~用户名过长触发~")
          return
        }
        // 正则表达式判断字符合法性
        if (!username.match(/^[\u4E00-\u9FA5\uF900-\uFA2D|\w@.#]{1,20}$/)) {
          callback(new Error('用户名格式错误, 请勿使用[中文、字母、数字和下划线]以外的字符'))
          console.log("~非法字符触发~");
        }
        // 查重功能已经整合到登录里面, 通过状态码来控制.
        // console.log('正在查重 ......')
        callback(); // 必须, 否则[submitRegister中的validate方法的参数中的表达式]不会执行.
      }, 200);

      console.log(' -- 注册用户名校验结束 -- ')
    };
    let validatePassForLog = (rule, password, callback) => {
      if (password === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validatePassForReg = (rule, password, callback) => {
      if (password === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, password, callback) => {
      if (password === '') {
        callback(new Error('请再次输入密码'));
      } else if (password !== this.regForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // loginRegOpen: true,
      isLogging: true,
      regForm: {
        pass: '0',
        checkPass: '0',
        username: 'sun'
      },
      regRules: {
        pass: [
          {validator: validatePassForReg, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        username: [
          {validator: checkUsernameForReg, trigger: 'blur'}
        ]
      },
      loginForm: {
        pass: '0',
        username: 'sun'
      },
      loginRules: {
        pass: [
          {validator: validatePassForLog, trigger: 'blur'}
        ],
        username: [
          {validator: checkUsernameForLog, trigger: 'blur'}
        ]
      },
    }
  },
  computed: {
    ...mapState('headerStore', ['loginRegOpen']),
    ...mapState('userStore', ['onLine', 'defaultUser', 'currentUser'])

  },
  methods: {
    ...mapMutations("headerStore", ['CLOSE_LOG_REG']),
    ...mapMutations("userStore", ['SET_ONLINE', 'SET_USER']),
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log("\n++ 提交登录信息开始")
      // debugger
      this.$refs[formName].validate(
          (valid) => {
            if (valid) {
              console.log('验证通过', valid)
              // alert('submit!');
              // 进行实际的提交动作, axios.
              if (formName === 'loginForm') {
                this.submitLogin()
              } else if (formName === 'regForm') {
                this.submitRegister()
              } else {
                alert('未知表名:' + formName)
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      console.log("++ 提交登录信息结束")
    },
    submitLogin() {
      let url = this.$store.state.constsStore.backEndHost + '/login'
      console.log('** axios启动, 登录信息提交')
      // 抽取字段, 登录不需要太多字段, 用户名密码就可以了, 至于类型, 还用POST吧.
      this.$axios.post(url,
          {
            username: this.loginForm.username,
            password: md5(this.loginForm.pass),
          },
          {
            // 登录要开启这个选项, 因为从服务器返回的JSessionId需要浏览器识别并自动保存.
            withCredentials: true
          }
      ).then(response => {
        let user = response.data;
        // console.log("\n登录成功，状态码：" + response.status + '\n')
        this.onLogin(user);
        this.$message({message: "登录成功, 用户: " + user.username, type: "success", duration: 1000})
      }).catch(error => {
        this.$message({
          message: "登录失败，错误码: " + error.response.status,
          type: 'error'
        })
      })

    },
    submitRegister() {
      let url = this.$store.state.constsStore.backEndHost + '/register';
      let _this = this;
      // 发送axios请求/POST, 返回字符串, 如果成功, 则跳转到登录页并自动填写好表单?
      console.log("发送注册请求：")
      this.$axios.post(url,
          {
            username: this.regForm.username,
            password: md5(this.regForm.pass),
          },
          {
            withCredentials: false, // 注册的时候，肯定没登录，并且不会被拦截。那么何必带cookies呢。
          }
      ).then(response => {
        console.log("收到响应，状态码：" + response.status)
        // 这是登录用的，注册成功应该给个提示，然后弹出登录页
        this.$message({
          message: '注册成功，请登录',
          type: 'success',
        })
        // 弹出登录页
        this.isLogging = true
        // 修改表单
        this.loginForm.username = this.regForm.username
        this.loginForm.pass = this.regForm.pass
      }).catch(error => {
        // 提示一下注册失败
        let status = error.response.status;
        this.$message({
          message: '注册失败，错误信息：' + (status === 409 ? '用户已存在' : status),
          type: 'error',
        })
      })
    },
    onLogin(user) {
      // 修改对应login状态的state
      this.SET_ONLINE(true);
      // 设置全局用户信息。
      this.SET_USER({
        id: user.id,
        username: user.username,
        password: user.password,
        gender: user.gender,
        userType: user.userType,
        registerTime: user.registerTime,
        lastLoginTime: user.lastLoginTime,
        userStatus: user.userStatus,
        phoneNum: user.phoneNum,
        email: user.email,
        blank: user.blank,
      });
      // 存储用户信息到sessionStorage
      localStorage.setItem("userObj", JSON.stringify(user));
      // // 退出登录窗口
      this.CLOSE_LOG_REG()
      console.log("登录成功: 用户", user.username)
    }

  },
  beforeMount() {
    let _this = this;
    let userObj = JSON.parse(localStorage.getItem('userObj'));
    if (userObj) {
      let url = this.$store.state.constsStore.backEndHost + "/sniff"
      // 发送嗅探 携带 cookies
      this.$axios.get(url,{
        withCredentials: true
      })
          .then(res => {
            console.log("\n通信已存在, 自动登录 ...")
            _this.onLogin(userObj)
          })
          .catch(e => {
            // 规定动作: 清理sessionStorage, 修改state登录状态, currentUser信息等修改
            localStorage.removeItem("userInfo")
            this.SET_ONLINE(false)
            this.SET_USER(this.defaultUser)
          })
    } else {
      console.log("未发现本地userObj, 无操作, 正常加载页面 ...")
    }
  }
}
</script>

<style scoped>
.login-reg {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 5000;
}

.login-reg-container {
  background-color: white;
  border-radius: 4px;
  width: 30%;
  margin-top: 300px;
  margin-left: 35%;
  border: solid 1px var(--tea);
  box-shadow: 2px 2px 10px var(--grey3);
  overflow: hidden;
  /*text-align: center;*/
  /*padding-top: 10px;*/

}

.zk-login-box, .zk-reg-box {
  width: 92%;
}

.zk-reg-box {
  /*width: 90%;*/
}

.log-reg-default, .log-reg-active {
  display: inline-block;
  /*margin: 10px 5px;*/
  text-align: center;
  width: calc(50% - 2px);
  line-height: 38px;
  border-left: solid 1px var(--tea);
  border-right: solid 1px var(--tea);
}

.log-reg-default:hover {
  background-color: var(--tea-op7);
  color: white;
}

.log-reg-default:active {
  background-color: var(--tea);
  color: white;
}

.log-reg-active {
  background-color: var(--tea);
  color: white;
}

.zk-logreg-horizen-line {
  height: 1px;
  width: 100%;
  background-color: var(--tea);
  margin-bottom: 20px
}

</style>