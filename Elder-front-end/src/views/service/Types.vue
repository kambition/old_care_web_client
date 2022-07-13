<template>
    <Tabs @on-click="change">
       <TabPane label="全部事件" >
           <List :type="4" :key="componentKey"/>
       </TabPane>
        <TabPane label="情感事件">
          <List :type="5" :key="componentKey"/>
        </TabPane>
      <TabPane label="摔倒事件">
        <List :type="6" :key="componentKey"/>
      </TabPane>
      <TabPane label="侵入事件">
        <List :type="7" :key="componentKey"/>
      </TabPane>
      <TabPane label="交互事件">
        <List :type="8" :key="componentKey"/>
      </TabPane>
    </Tabs>
</template>

<script>
import List from '_c/List.vue'
export default {
  data() {
    return{
      componentKey : 0
    }
  },
  components:{
    List
  },
  methods:{
    change(){
      this.componentKey = Math.random() + '' + new Date().getTime();
    }

  }


    
}
</script>

<style>

</style>