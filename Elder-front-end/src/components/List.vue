<template>
  <div>
  <div style="margin-top: 15px; text-align: right">
    <el-button type="primary" style="margin-bottom: 10px" @click="start" v-if="cannot">开始检测</el-button>
    <el-button type="primary" icon="el-icon-refresh" circle style="margin-bottom: 10px" @click="refresh"></el-button>
    <Input v-model="input" v-if="can">
      <template #prepend>
        <Select v-model="select" style="width: 80px">
          <Option value="1">姓名</Option>
          <Option value="2">身份证号</Option>
          <Option value="3">年龄</Option>
        </Select>
      </template>
      <template #append>
        <Button icon="ios-search" @click="search"></Button>
      </template>
    </Input>
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
      <!--          ！！下面修改存放监控照片的绝对路径-->
      <el-image
          style="width: 100px; height: 100px"
          :src="require('/Users/longmozhou/oldPeopleFront/Elder-front-end/src/assets/images/' + this.data[index].record)"
          :preview-src-list="[require('/Users/longmozhou/oldPeopleFront/Elder-front-end/src/assets/images/' + this.data[index].record)]">
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
    this.select = '1'
    // const config = {'headers':{'authorization':''}};
    console.log(this.type);
    if(this.type === 1 || this.type === 2 || this.type ===3 )
    {this.can = true
    this.cannot = false}
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
      //全部事件
      url = '';
    }else if(this.type === 5){
      //情绪
      url = '';
    }else if(this.type === 6){
      //摔倒
      url = '';
    }else if(this.type === 7){
      //侵入
      url = '';
    }else{
      //交互
      url = '';
    }
    axios.get(url).then(response => {
      const {code, columns, items} = response.data;
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
      cannot: true,
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
      // urls:[{url: 'back.jpeg'},{url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'},{url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'}],
      // srcLists: [
      //   {srcList:['back.jpeg']}
      // ],
      query: {name:'',age:'',i_id:''},
      columns: [],
      data: []
    }
  },
  methods: {
    start() {
      //开始检测
      let url = '';
      //情感事件
      if(this.type === 5){
        url = '';
      }else if(this.type === 6){
        //摔倒事件
        url = '';
      }else if(this.type === 7){
        //侵入事件
        url = '';
      }else if(this.type === 8){
        //交互事件
        url = '';
      }
      axios.post(url, {start: true}).then((res)=>{
        console.log(res)
        const{code, data}=res.data
        if(data.result === true){
          this.$Message.success('Success!');

        }else{
          this.$Message.error(data.detail);
        }
      })


    },
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
        const {code, columns, items, url} = response.data;
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
