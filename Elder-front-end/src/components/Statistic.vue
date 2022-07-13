<template>
  <div class="analysisTask" style="height: 100%">
    <ChartLine ref="chart_line_one"/>
  </div>
</template>

<script>
import ChartLine from './chartLine.vue'
import axios from "axios";

export default{
  props: ['keyword', 'type'],
  data(){
    return{
      title:{title: '老年人年龄统计'},
      name:{name:['男','女']},
      // xData: {'data':['1', 2, 3, 4] },
      // yData: [{'data':['30', '132', 80, 134]},{'data':[50, 12, 80, 14]}]
      xData: {'data': []},
      yData: [{'data':[]},{'data':[]}]
    }
  },
  mounted () {
    //请求数据
    let url='';
    if(this.type === 1){
      this.title = {title: '老年人年龄分析'};
      url = 'oldperson/statistic';
      // url = 'http://127.0.0.1:8000/hello/';
    }else if(this.type === 2){
      this.title = {title: '工作人员年龄分析'};
      url = 'employee/statistic'
      // url = 'http://127.0.0.1:8000/hello/';
    }else{
      console.log('yigong')
      this.title = {title: '义工年龄分析'};
      url = 'volunteer/statistic'
      // url = 'http://127.0.0.1:8000/hello/';
    }
    axios.get(url).then(response => {
      const {code, xData, yData} = response.data;
      this.xData = xData;
      this.yData = yData;
      this.$refs.chart_line_one.initChart(this.title.title, this.name.name,xData.data,yData)
    }).catch(e => {
      console.log(e);
    });
    // const {title, name,xData,yData} = this
    // console.log(this.$refs)
    // console.log(JSON.stringify(title.title), JSON.stringify(name.name),JSON.stringify(xData.data),JSON.stringify(yData))
    // this.$refs.chart_line_one.initChart(title.title, name.name,xData.data,yData)
  },
  components: {
    ChartLine,
  }
}
</script>
