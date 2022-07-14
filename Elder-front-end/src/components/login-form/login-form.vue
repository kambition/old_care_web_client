<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <div class="demo-auto-login">
      <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
      <a>忘记密码</a>
    </div>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
<!--  <body>-->
<!--  <form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" action="" class="login">-->
<!--    <p>Login</p>-->
<!--    <input v-model="form.userName" type="text" placeholder="用户名">-->
<!--    <input  v-model="form.password" type="password" placeholder="密码">-->
<!--    <input @click="handleSubmit" type="submit" class="btn" value="登  录">-->
<!--  </form>-->
<!--  </body>-->
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      autoLogin: true,
      form: {
        userName: 'LongWz',
        password: 'dashuaige'
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
<style>

.demo-auto-login{
  margin-bottom: 24px;
  text-align: left;
}
.demo-auto-login a{
  float: right;
}
/**{*/
/*  user-select: none;*/
/*  !* 无法选中，整体感更强 *!*/
/*}*/
/*body{*/
/*  background-size: cover;*/
/*  background: url('../../assets/images/1.png') no-repeat fixed;*/
/*}*/
/*.login{*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  margin-top: -200px;*/
/*  left: 50%;*/
/*  margin-left: -200px;*/
/*  !* absolute居中的一种方法 *!*/
/*  background-color: whitesmoke;*/
/*  width: 400px;*/
/*  height: 400px;*/
/*  border-radius: 25px;*/
/*  text-align: center;*/
/*  padding: 5px 40px;*/
/*  box-sizing: border-box;*/
/*  !* 这样padding就不会影响大小 *!*/
/*}*/

/*p{*/
/*  font-size: 42px;*/
/*  font-weight: 600;*/
/*}*/

/*input{*/
/*  background-color: whitesmoke;*/
/*  width: 100%;*/
/*  height: 48px;*/
/*  margin-bottom: 10px;*/
/*  border: none;*/
/*  border-bottom: 2px solid silver;*/
/*  !* 下面的会覆盖上面的步伐 *!*/
/*  outline: none;*/
/*  font-size: 22px;*/
/*}*/

/*.btn{*/
/*  background-color: #59c2c5;*/
/*  width: 38%;*/
/*  height: 48px;*/
/*  border-radius: 8px;*/
/*  margin-top: 40px;*/
/*  font-size: 28px;*/
/*  font-weight: 600;*/
/*  color: white;*/
/*}*/
/*.btn:hover{*/
/*  background-color: #59c2a0;*/
/*}*/
</style>