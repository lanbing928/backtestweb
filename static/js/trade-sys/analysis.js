"use strict";
$(function () {
    function getYieldsEacharts() {
        trade.getHistoryYields({opcode:130}, function () {
            $("#income-analyze").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
        }, function (resultData) {
            var analyze_html=[];
            var dateArr = [];//日期
            var yieldsData = [];//收益率
            var groupName = [];//组合名
            //第一步先遍历一次取到某个键的名称的数组
            //检测判断一个值是否属于某个数组的值   这个函数在Utitly里面有叫inArray
            function in_array(search, array) {
                for (var i in array) {
                    if (array[i] == search) {
                        return true;
                    }
                }
                return false;
            }
            if (resultData.status == 0) {
                var data = resultData.stock_hist_yields;  //需要处理的数组
                var key_arr = [];  //得到以group_id的分类数组
                var sum_arr = [];
                for(var i=0;i<data.length;i++){
                    var group_name = data[i]['group_name'];
                    var yields = data[i]['yield'];
                    dateArr.push(data[i].date);
                    groupName.push(data[i].group_name);
                    var key_arr_length = key_arr.length;
                    if(!in_array(group_name,key_arr)){
                        key_arr[key_arr_length]=group_name;
                        sum_arr[group_name]=''+yields;  //收益率为字符串
                    }else{
                        sum_arr[group_name]+=','+yields; //收益率为字符串
                    }
                }
                dateArr=Utility.arrRemoveSame(dateArr);//时间去重

                //统一收益率个数为日期天数，无收益率赋值--
                for(var i in sum_arr){  //将收益率字符串转换为数组
                    var arr_val = sum_arr[i].split(",");//收益率数组
                    var count=dateArr.length-arr_val.length;//
                    if(count>0){ //收益率个数与天数不等
                        for(var j=0;j<count;j++){
                            sum_arr[i]='--,'+ sum_arr[i]
                        };
                    }
                    sum_arr[i]=sum_arr[i].split(",");
                }
                var myChart = echarts.init(document.getElementById('income-analyze'));
                var yAxis = [
                    {
                        type: 'value',
                        position: 'left',
                        axisLabel: {
                            formatter: function (value) {
                                if (value !== 0) {
                                    return (value*100).toFixed(0) + "%";
                                } else {
                                    return 0;
                                }
                            }
                        }
                    }
                ];
                var series=[];
                for( var key in sum_arr){
                    series.push({
                        name:key,
                        smooth: true,
                        type:'line',
                        stack:'总量',
                        data:sum_arr[key]
                    })
                }
                var option = {
                    title: {
                        text: '收益分析',
                        textStyle: {
                            color: '#000',
                            fontStyle: 'normal',
                            fontFamily: 'Microsoft YaHei',
                            fontSize: 16
                        },
                        subtext:'当天添加的账户，收益率收盘后计算',
                        subtextStyle:{
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            var showLabel = "";
                            showLabel += params[0].name + "<br>";
                            for (var p in params) {
                                if (params[p].value || params[p].value == 0) {
                                    if (params[0].name == params[p].name) {
                                        if (params[p].seriesName == '' || params[p].value=='--') {
                                            showLabel += "<label style='color: " + params[p].color + ";font-size: 14px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + params[p].value + "<br>";
                                        } else {
                                            showLabel += "<label style='color: " + params[p].color + ";font-size: 14px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + (params[p].value * 100).toFixed(2) + "%" + "<br>";
                                        }
                                    }
                                }
                            }
                            return showLabel;
                        }
                    },
                    legend: {
                        top:'40px',
                        data: groupName
                    },
                    grid: {
                        top: '90px',
                        left: '15px',
                        right: '50px',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateArr,
                        show:true,
                        axisLabel: {
                            interval: 0
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: true,
                            interval: 'auto',
                            inside: false,
                            length: 1
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine:{
                            show: false,
                            onZero: false
                        }
                    },
                    yAxis: yAxis,
                    series:series
                };

                myChart.setOption(option);
                window.onresize = myChart.resize
            }
            // else {
            //     analyze_html.push("<div class=\"back-user-no\"><i class='fa fa-exclamation-circle'></i>&nbsp;当天收盘后开始计算收益率...</div>");
            //     $('#income-analyze').html(analyze_html.join(""));
            // }
        });

    }
    getYieldsEacharts();
});
