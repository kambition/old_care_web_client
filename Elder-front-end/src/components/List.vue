<template>
  <div>
  <div style="margin-top: 15px; text-align: right">
    <el-button type="primary" icon="el-icon-refresh" circle style="margin-bottom: 10px" @click="refresh"></el-button>
    <el-input size="small" placeholder="请输入内容" v-model="input" class="input-with-select" style="margin-bottom: 10px" v-if="can">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="姓名" value="1"></el-option>
        <el-option label="身份证号" value="2"></el-option>
        <el-option label="年龄" value="3"></el-option>
      </el-select>
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
  </div>
  <Table border :columns="columns" :data="data" :key="tableKey">
    <template #id="{ row, index }">
      <Input type="text" v-model="editId" v-if="editIndex === index" />
      <strong v-else>{{ row.id }}</strong>
    </template>
    <template #username="{ row, index }">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.username }}</span>
    </template>
    <template #age="{ row, index }">
      <Input type="text" v-model="editAge" v-if="editIndex === index" />
      <span v-else>{{ row.age }}</span>
    </template>
    <template #address="{ row, index }">
      <Input type="text" v-model="editAddress" v-if="editIndex === index" />
      <span v-else>{{ row.address }}</span>
    </template>
    <template #gender="{ row, index }">
      <Input type="text" v-model="editGender" v-if="editIndex === index" />
      <span v-else>{{ row.gender }}</span>
    </template>
    <template #phone="{ row, index }">
      <Input type="text" v-model="editPhone" v-if="editIndex === index" />
      <span v-else>{{ row.phone }}</span>
    </template>
    <template #id_card="{ row, index }">
      <Input type="text" v-model="editI_id" v-if="editIndex === index" />
      <span v-else>{{ row.id_card }}</span>
    </template>
    <template #avatar="{ row, index }">
<!--      <el-link>查看<i class="el-icon-view el-icon&#45;&#45;right"></i> </el-link>-->
      <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="srcList">
      </el-image>
    </template>
    <template #action="{ row, index }" >
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
      <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row, index)">修改</Button>
      <Button type="error" size="small" @click="remove(row, index)">删除</Button>
      </div>
    </template>
  </Table>
  </div>
</template>
<script>

import axios from "axios";
export default {
  props: ['keyword', 'type'],
  mounted() {
    // const config = {'headers':{'authorization':''}};
    console.log(this.type);
    if(this.type === 1 || this.type === 2 || this.type ===3 )
    {this.can = true}
    let url='';
    if(this.type === 1){
      // url = 'http://127.0.0.1:8000/hello/';
      url = '/oldperson/infolist';
    }else if(this.type === 2){
      // url = 'http://127.0.0.1:8000/hello/';
      url = '/employee/infolist';
    }else if(this.type === 3){
      // url = 'http://127.0.0.1:8000/hello/';
      url = 'volunteer/infolist';
    }else if(this.type === 4){
      // url = 'http://127.0.0.1:8000/hello/';
      url = 'volunteer/infolist';
    }else if(this.type === 5){
      url = 'http://127.0.0.1:8000/hello/';
    }else if(this.type === 6){
      url = 'http://127.0.0.1:8000/hello/';
    }else if(this.type === 7){
      url = 'http://127.0.0.1:8000/hello/';
    }else{
      url = 'http://127.0.0.1:8000/hello/';
    }
    axios.get(url).then(response => {
      const {code, columns, items} = response.data;
      console
      this.data = items;
      this.columns = columns;

    }).catch(e => {
      console.log(e);
    });
    // axios.get('http://82.157.232.24:8081/oldperson/infolist').then(response => {
    //   const {code, columns, items} = response.data;
    //   console.log(JSON.stringify(response.data));
    //   console.log(JSON.stringify(columns));
    //   // console.log(columns);
    //   console.log(JSON.stringify(items));
    //   // console.log(items[0]);
    //   // console.log(code);
    //   this.data = items;
    //   this.columns = columns;
    //
    // }).catch(e => {
    //   console.log('fail');
    // });
  },
  data () {
    return {
      can: false,
      input:'',
      select:'',
      editIndex: -1,  // 当前聚焦的输入框的行数
      editGender:'',
      editPhone:'',
      editId: '',
      editI_id:'',
      editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: '',  // 第二列输入框
      editBirthday: '',  // 第三列输入框
      editAddress: '',  // 第四列输入框
      tableKey: 0,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      query: {name:'',age:'',i_id:''},
      columns: [],
      data: []
    }
  },
  methods: {
    refresh() {
      console.log(this.type)
      let url='';
      if(this.type === 1){
        // url = 'http://127.0.0.1:8000/hello/';
        url = 'oldperson/infolist';
      }else if(this.type === 2){
        // url = 'http://127.0.0.1:8000/hello/';
        url = 'employee/infolist';
      }else if(this.type === 3){
        // url = 'http://127.0.0.1:8000/hello/';
        url = 'volunteer/infolist';
      }else if(this.type === 4){
        url = 'http://127.0.0.1:8000/hello/';
      }else if(this.type === 5){
        url = 'http://127.0.0.1:8000/hello/';
      }else if(this.type === 6){
        url = 'http://127.0.0.1:8000/hello/';
      }else if(this.type === 7){
        url = 'http://127.0.0.1:8000/hello/';
      }else{
        url = 'http://127.0.0.1:8000/hello/';
      }
      axios.get(url).then(response => {
        const {code, columns, items} = response.data;
        this.data = items;
        this.columns = columns;

      }).catch(e => {
        console.log(e);
      });
      // this.tableKey ++ ;

    },
    handleShowPreview () {
      this.preview = true;
      this.$ImagePreview.show({
        previewList: this.urlList
      });
    },
    remove (row, index) {
      let url = '';
      if(this.type === 1){
        url = 'oldperson/deleteinfo'
      }else if(this.type === 2){
        url = 'employee/deleteinfo'
      }else if(this.type === 3){
        url = 'volunteer/deleteinfo'
      }
      axios.post(url, {id: row.id}).then((res)=>{
        console.log(res)
        const{code, data}=res.data
        if(data.result === true){
          this.$Message.success('Success!');

        }else{
          this.$Message.error(data.detail);
        }
      })
      this.data.splice(index, 1);
    },
    handleEdit (row, index) {
      this.editId = row.id;
      this.editGender = row.gender;
      this.editPhone = row.phone;
      this.editName = row.username;
      this.editAge = row.age;
      this.editAddress = row.address;
      this.editBirthday = row.birthday;
      this.editI_id = row.id_card;
      this.editIndex = index;

    },
    handleSave (index) {
      this.data[index].id = this.editId;
      this.data[index].username = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].gender = this.editGender;
      this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
      this.data[index].phone = this.editPhone;
      this.data[index].id_card = this.editI_id;
      this.editIndex = -1;
      let url = '';
      if(this.type === 1){
        url = 'oldperson/updateinfo'
      }else if(this.type === 2){
        url = 'employee/updateinfo'
      }else if(this.type === 3){
        url = 'volunteer/updateinfo'
      }
      axios.post(url, this.data[index]).then((res)=>{
        console.log(res)
        const{code, data}=res.data
        if(data.result === true){
          this.$Message.success('Success!');

        }else{
          this.$Message.error(data.detail);
        }
      })

    },
    search(){
      this.query = {name:'', age:'', i_id:''}
      if(this.select === '1') {
        this.query.name = this.input;

      } else if(this.select === '2') {
        this.query.age = this.input;

      } else if(this.select === '3') {
        this.query.i_id = this.input;
      }
      console.log(JSON.stringify(this.query));
      console.log(this.select);
      console.log(this.input);
      let url = '';
      if(this.type === 1){
        url = 'oldperson/searchByName'
      }else if(this.type === 2){
        url = 'employee/searchByName'
      }else if(this.type === 3){
        url = 'volunteer/searchByName'
      }
      if(this.input != ''){
      axios.post(url, this.query).then((res)=>{
        console.log(res)
        const{code, data}=res.data
        if(data.result === true){
          this.data = data.items;
          this.$Message.success('Success!');

        }else{
          this.$Message.error(data.detail);
        }
      })}else {
        if(this.type === 1){
          // url = 'http://127.0.0.1:8000/hello/';
          url = 'oldperson/infolist';
        }else if(this.type === 2){
          // url = 'http://127.0.0.1:8000/hello/';
          url = 'employee/infolist';
        }else if(this.type === 3){
          // url = 'http://127.0.0.1:8000/hello/';
          url = 'volunteer/infolist';
        }
        axios.get(url).then(response => {
          const {code, columns, items} = response.data;
          this.data = items;

        }).catch(e => {
          console.log(e);
        });

      }

    }
  },

}
</script>
