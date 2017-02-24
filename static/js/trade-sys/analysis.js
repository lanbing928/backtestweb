
var myChart = echarts.init(document.getElementById('income-analyze'));
option = {
    title: {
        text: '收益分析'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['上海沪深','当前持仓','组合1','组合2','组合3']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['12-26','12-27','12-28','12-29','12-30','12-31','1-1']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'上海沪深',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'当前持仓',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'组合1',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'组合2',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'组合3',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
myChart.setOption(option);
