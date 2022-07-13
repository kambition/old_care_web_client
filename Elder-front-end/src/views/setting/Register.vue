<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="用户名" prop="UserName">
      <Input v-model="formValidate.UserName" placeholder="请输入用户名" style="width: 200px"></Input>
    </FormItem>
    <FormItem label="电子邮箱" prop="EMAIL">
      <Input v-model="formValidate.EMAIL" placeholder="请输入邮箱" style="width: 200px"></Input>
    </FormItem>
    <FormItem label="真实姓名" prop="REAL_NAME">
      <Input v-model="formValidate.REAL_NAME" placeholder="请输入姓名" style="width: 200px"></Input>
    </FormItem>
    <FormItem label="性别" prop="SEX">
      <RadioGroup v-model="formValidate.SEX">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="手机号码" prop="PHONE">
      <Input v-model="formValidate.PHONE" placeholder="请输入手机号码" style="width: 200px"></Input>
    </FormItem>
    <FormItem label="密码" prop="Password">
      <Input type="password" v-model="formValidate.Password" placeholder="请输入密码" style="width: 200px"></Input>
    </FormItem>
    <FormItem type="password" label="确认密码" prop="passwordAgain">
      <Input type="password" v-model="formValidate.passwordAgain" placeholder="请再次输入密码" style="width: 200px"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import axios from "axios";

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的密码"));
      } else {
        if (this.formValidate.PasswordAgain !== "") {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField("PasswordAgain");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入您的密码"));
      } else if (value !== this.formValidate.Password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        UserName: '',
        REAL_NAME: '',
        EMAIL: '',
        SEX: '',
        PHONE: '',
        Password: '',
        PasswordAgain: ''
      },
      ruleValidate: {
        UserName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        REAL_NAME: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        EMAIL: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        PHONE: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          // { type: 'number', message: '手机号码格式错误', trigger: 'blur' }
        ],
        SEX: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        Password: [
          { required:true, validator: validatePass, trigger: "blur" }
        ],
        PasswordAgain: [{ required: true, validator: validatePassCheck, trigger: "blur" }]
      }
    }

  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post('user/updateinfo', this.formValidate).then((res)=>{
            console.log(res)
            const{code, data}=res.data
            if(data.result === true){
              this.$Message.success('Success!');
              this.handleReset('formValidate');
            }else{
              this.$Message.error(data.detail);
            }
          })
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
