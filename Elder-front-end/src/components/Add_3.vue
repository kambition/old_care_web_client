<template>
  <div>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="400" v-if="can">
    <FormItem label="义工姓名" prop="name">
      <Input v-model="formValidate.name" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="身份证号" prop="id_card">
      <Input v-model="formValidate.id_card" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="出生日期" prop="birthday">
      <DatePicker type="date" v-model="formValidate.birthday"></DatePicker>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="手机号话" prop="phone">
      <Input v-model="formValidate.phone" style="width: 400px"></Input>
    </FormItem>
    <FormItem label="访问日期" prop="i_date">
      <DatePicker type="date" v-model="formValidate.i_date"></DatePicker>
    </FormItem>
    <FormItem label="义工照片" prop="avatar">
      <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </FormItem>
    <FormItem label="描述" prop="desc">
      <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 400px"></Input>
    </FormItem>
    <FormItem >
      <Row>
        <Col span="5">
        <Button type="primary" @click="handleSubmit('formValidate')" size="large">提交</Button>
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
        name: '',
        id_card: '',
        birthday: '',
        gender: '',
        i_date: '',
        phone: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' },
        ],
        i_date: [
          { required: true, message: '请选择入院日期', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post('volunteer/updateinfo', this.formValidate).then((res)=>{
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
