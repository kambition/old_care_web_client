<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="WEBNAME" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">can can need</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginForm from '_c/login-form';
import util from '@/util' //测试环境

export default {
  name: "Login",
  components: {
    LoginForm
  },
  data() {
    return {
       WEBNAME: this.$config.CONSTANTS.WEBNAME,
      UserName: ''
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit ({ userName, password }) {
      const self = this;
      //正式环境
      this.Login({
        userName,
        password
      }).then((data) => {
        if(data.data.result === true){
          this.$Message.success('登录成功');
          this.UserName = userName;
          this.$emit("titleChanged",this.UserName);
          self.$router.push('/');
        }else{
          this.$Message.error(data.data.detail);
        }
      });
      // util.storage.set('loginuser', true);//测试环境
      // this.$Message.success('登录成功');
      // this.$router.push('/');
    }
  }
}
</script>

<style lang="less">
  @import './login.less';
</style>
