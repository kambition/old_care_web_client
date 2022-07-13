<template>
  <div>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="400" v-if="can">
    <FormItem label="老人姓名" prop="username">
      <Input v-model="formValidate.username" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="身份证号" prop="id_card">
      <Input v-model="formValidate.id_card" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="出生日期" prop="birthday">
      <el-date-picker
          v-model="formValidate.birthday"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="手机号码" prop="phone">
      <Input v-model="formValidate.phone" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="入院日期" prop="checkin_date">
      <el-date-picker
          v-model="formValidate.checkin_date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </FormItem>
    <FormItem label="第一监护人姓名" prop="firstguardian_name">
      <Input v-model="formValidate.firstguardian_name" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="第一监护人手机号码" prop="f_phone">
      <Input v-model="formValidate.firstguardian_phone" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="老人照片" prop="avatar">
      <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          :file-list="fileList"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
<!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
        <div slot="tip" class="el-upload__tip">只能上传一个jpg/png文件，且不超过500kb</div>
      </el-upload>
    </FormItem>
    <FormItem label="描述" prop="health_state">
      <Input v-model="formValidate.health_state" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 400px"></Input>
    </FormItem>
    <FormItem >
      <Row>
        <Col span="5">
        <Button type="primary" @click="collect" size="large">人脸采集</Button>
        </Col>
        <Col span="5">
        <Button @click="handleReset('formValidate')" style="margin-left: 8px" size="large">重置</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
    <div v-else>
      <img style="-webkit-user-select: none;background-color: hsl(0, 0%, 25%);" src="" alt="" width="720" height="480">
      <Row>
        <Col span="5">
          <Button type="primary" @click="handleSubmit('formValidate')" size="large">提交</Button>
        </Col>
        <Col span="5">
          <Button @click="cancel" style="margin-left: 8px" size="large">取消</Button>
        </Col>
      </Row>
    </div>

  </div>

</template>
<script>
import axios from "axios";

export default {
  data () {
    return {
      can: true,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      formValidate: {
        id: 0,
        username: '',
        id_card: '',
        birthday: '',
        gender: '',
        checkin_date: '',
        checkout_date:'',
        firstguardian_name: '',
        firstguardian_phone:'',
        phone: '',
        health_state: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, type:'date', message: '请选择出生日期', trigger: 'change'},

        ],
        checkin_date: [
          { required: true, type:'date', message: '请选择入院日期', trigger: 'change' },
          // { type: 'date', message: '', trigger: 'blur' }

        ],
        firstguardian_name: [
          { required: true, message: '监护人姓名不能为空', trigger: 'blur' },

        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        firstguardian_phone: [
          { required: true, message: '监护人手机号不能为空', trigger: 'blur' }
        ],
        health_state: [
          { required: true, message: '请输入介绍', trigger: 'blur' },
          { type: 'string', min: 10, message: '请不少于10个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    collect() {
      this.can = false;
    },
    cancel() {
      this.can = true;
    },

    handleSubmit (name) {
      this.can = true;
      // axios.post('oldperson/updateinfo', this.formValidate).then((res)=>{
      //   console.log(res)
      //   const{code, data}=res.data
      //   if(data.result === true){
      //     this.$Message.success('Success!');
      //     this.handleReset('formValidate');
      //     this.can = false;
      //   }else{
      //     this.$Message.error(data.detail);
      //   }
      // })
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('valid');
          axios.post('oldperson/updateinfo', this.formValidate).then((res)=>{
            console.log(res)
            const{code, data}=res.data
            if(data.result === true){
              this.$Message.success('Success!');
              this.handleReset('formValidate');
              this.can = false;
            }else{
              this.$Message.error(data.detail);
            }
          })
        } else {
          this.$Message.error('Fail!');
        }
      })

      console.log(this.formValidate.birthday);
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }

  }
}
</script>
