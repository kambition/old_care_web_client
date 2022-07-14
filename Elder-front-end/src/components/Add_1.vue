<template>
  <div>
  <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="400px" >
    <el-form-item label="老人姓名" prop="username">
      <el-input v-model="formValidate.username" style="width: 400px"></el-input>
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
    <el-form-item label="入院日期" prop="checkin_date">
      <el-date-picker
          v-model="formValidate.checkin_date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="第一监护人姓名" prop="firstguardian_name">
      <el-input v-model="formValidate.firstguardian_name" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="第一监护人手机号码" prop="firstguardian_phone">
      <el-input v-model="formValidate.firstguardian_phone" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="老人照片" prop="avatar">
        <el-upload
            class="avatar-uploader"
            :limit="1"
            :action="uploadURL"
            :on-remove="removeChange"
            :on-error="uploadError"
            :on-change="fileChange"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false">
          <img v-if="licenseImageUrl" :src="licenseImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
<!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>-->
    </el-form-item>
    <el-form-item label="描述" prop="health_state">
      <el-input v-model="formValidate.health_state" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="collect('formValidate')">人脸采集</el-button>
      <el-button @click="handleReset('formValidate')">重 置</el-button>
    </el-form-item>
  </el-form>
    <el-dialog :visible.sync="can" center>
      <img style="-webkit-user-select: none;background-color: hsl(0, 0%, 25%);" src="" alt="">
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
      hasFace: false,
      uploadURL: 'admin/uploadface',
      imgSrc: require('@/assets/images/back.jpeg'),
      licenseImageUrl: '',
      can: false,
      temp: {},
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
          { required: true, message: '请选择出生日期', trigger: 'change'},

        ],
        checkin_date: [
          { required: true, message: '请选择入院日期', trigger: 'change' },
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
          { required: true, message: '请输入描述', trigger: 'blur' },
          { type: 'string', min: 10, message: '描述不少于10个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fileChange (file) {
      this.formValidate.file = file
    },
    beforeAvatarUpload (file) {
      // eslint-disable-next-line no-redeclare
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (this.formValidate.name === '') {
        this.$message.error('请先输入姓名')
        return false
      }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
    },
    // eslint-disable-next-line handle-callback-err
    uploadError (err, file, filelist) {
      this.$message.error('上传失败')
    },
    removeChange (file, fileList) {
      console.log('你要移除的文件为', file.name)
    },
    // eslint-disable-next-line handle-callback-err
    submitUpload () {
      let formData = new FormData()
      formData.append('name', this.formValidate.username)
      formData.append('avatar', this.formValidate.file.raw)
      console.log(formData.get('name'))
      console.log(formData.get('avatar'))
      axios.post('', formData).then(res => {
        this.$message.success('上传成功')
        this.licenseImageUrl = res.data
        this.hasFace = true
        console.log(this.licenseImageUrl)
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('上传失败')
      })
    },
    collect(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('valid');
          this.can = true;
          console.log(this.formValidate.birthday)
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    cancel() {
      this.can = false;
    },

    handleSubmit () {

      this.can = false;
      axios.post('oldperson/updateinfo', this.formValidate).then((res)=>{
        console.log(res)
        const{code, data}=res.data
        if(data.result === true){
          this.$Message.success('Success!');
          this.handleReset('formValidate');
          // this.can = false;
        }else{
          this.$Message.error(data.detail);
        }
      })
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      //     console.log('valid');
      //
      //     axios.post('oldperson/updateinfo', this.formValidate).then((res)=>{
      //       console.log(res)
      //       const{code, data}=res.data
      //       if(data.result === true){
      //         this.$Message.success('Success!');
      //         this.handleReset('formValidate');
      //         this.can = ;
      //       }else{
      //         this.$Message.error(data.detail);
      //       }
      //     })
      //   } else {
      //     this.$Message.error('Fail!');
      //   }
      // })

      console.log(this.formValidate.birthday);
    },
    handleReset (name) {
      this.$refs[name].resetFields();
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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>