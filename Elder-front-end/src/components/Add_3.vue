<template>
  <div>
  <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="400px">
    <el-form-item label="义工姓名" prop="name">
      <el-input v-model="formValidate.name" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="id_card">
      <el-input v-model="formValidate.id_card" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-date-picker
          v-model="formValidate.birthday"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="formValidate.gender">
        <el-radio label="male">男</el-radio>
        <el-radio label="female">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="formValidate.phone" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="访问日期" prop="i_date">
      <el-date-picker
          v-model="formValidate.i_date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="义工照片" prop="avatar">
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
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="collect('formValidate')">人脸采集</el-button>
      <el-button @click="handleReset('formValidate')">重 置</el-button>
    </el-form-item>
  </el-form>
    <el-dialog :visible.sync="can" center>
      <img style="-webkit-user-select: none;background-color: hsl(0, 0%, 25%);" src="" alt="" width="720" height="480">
      <el-button type="primary" @click="handleSubmit">提 交</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data () {
    return {
      can: false,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      formValidate: {
        id:0,//新增
        name: '',
        id_card: '',
        birthday: '',
        gender: '',
        i_date: '',
        o_date:'',//新增
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
          { required: true, message: '请选择出生日期', trigger: 'change' },
        ],
        i_date: [
          { required: true, message: '请选择入院日期', trigger: 'change' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { type: 'string', min: 10, message: '描述不少于十个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    collect(name) {
      console.log(JSON.stringify(this.fileList[0].url))
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('valid');
          this.can = true;
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    cancel() {
      this.can = false;
      console.log(this.formValidate.name)
    },
    handleSubmit (name) {
      this.can = false
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
