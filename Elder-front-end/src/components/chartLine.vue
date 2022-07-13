<template>
  <Card style="width:100%; height: 100%">
  <div id="echart-line" :style="{width: '100%', height: '500px'}"></div>
  </Card>
</template>

<script>

import * as echarts from 'echarts';

export default {

  methods:{

    initChart(title, name,xData,yData) {

      let getchart = echarts.init(document.getElementById('echart-line'));
      var  option = {
        title: {
          text: [title]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['男','女'],
          bottom:'0%'
        },
        grid: { //调整图表上下左右位置
          top:'10%',
          left: '10%',
          right: '20%',
          bottom: '10%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: xData,
          axisLabel: {
            formatter: '{value} 岁'
          },
          axisPointer: {
            type: 'shadow'
          },

        },


        yAxis: {
          type: 'value',
          gridIndex: 0,
          interval: 20,
          axisLabel: {
            formatter: '{value} 人'
          }
        },

        series:[
          {
            name: name[0],
            type: 'bar',

            data: yData[0].data,

          },
          {
            name: name[1],
            type: 'bar',

            data: yData[1].data,

          },
        ]


      };

      getchart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },

  }

}
</script>
