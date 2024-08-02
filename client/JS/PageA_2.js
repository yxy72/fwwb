    //柱状图测试
//立即执行函数
(function(){
    //1实例化对象
    var myChart = echarts.init(document.querySelector(".list1"));
    //2指定配置项和数据
    var option = {
       
        // title:{
        //     top:'0%',
        //     left:'center',
        //     text:"系统套数省份分布",
        //     textStyle:{
        //         color :'rgba(220,220,220,1)',
        //         fontSize:'17px',
        //         fontWeight:'normal',
        //     }
        // },
        color:['#2f89cf'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['北京', '重庆',  '广东',  '四川', '湖南','甘肃','贵州','江苏','河北','山东','江西','云南','河南'],
                axisTick: {
                    alignWithLabel: true
                },
                //修改刻度标签
                axisLabel:{
                    color:'rgb(220, 220, 220)',
                    fontSize:'12'
                },
                //x轴样式不显示
                axisLine:{
                    show:false
                }
                
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel:{
                    color:'rgba(255, 255, 255,.6)',
                    fontSize:12
                },
                axisLine:{
                    lineStyle:{
                        color:"rgba(255,255,255,.1)",
                        width:2,
                    }
                },
                //分割线
                splitLine:{
                    lineStyle:{
                        color:"rgba(255,255,255,.02)",
                        width:1,
                    }
                }
                
            }
        ],
        series: [
            {
                name: '系统套数',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 220,110,36,25,59,31,56,86,123,254,68]
                //item样式 圆角样式
                ,itemStyle:{
                    barBorderRadius:3,
                },
            
            }
        ]
    };
    //3配置赋值于实例对象
    myChart.setOption(option);
    //4图表跟随屏幕自适应
    window.addEventListener('resize',function(){
        myChart.resize();
    })
})();





// (function(){
//     //1实例化对象
//     var myChart = echarts.init(document.querySelector(".chart1"));
//     //2指定配置项和数据
//     var option = {
//         //color:["#065aab","#066eab","#0682ab","#0696ab","#06a0ab"],
//         title:{
//             left:'center',
//             top:'10px',
//             text:"单套系统设备平均分布",
//             textStyle:{
//                 color :'rgba(220,220,220,1)',
//                 fontSize:'17px',
//                 fontWeight:'normal',
//             }
//         },
//         tooltip: {
//             trigger: 'item'
//         },
//         legend: {
//             bottom: '3%',
//             itemWidth:10,
//             itemHeight:10,
//             textStyle:{
//                 color:'rgb(220, 220, 220)',
//             }
//         },
//         series: [
//             {
//                 name: '设备数量',
//                 type: 'pie',
//                 radius: ['40%', '60%'],
//                 avoidLabelOverlap: false,
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: '20',
//                         color :'white',
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: [
//                     {value: 3, name: '温度计'},
//                     {value: 6, name: '传感器'},
//                     {value: 1, name: '陀螺仪'},
//                     {value: 3, name: '湿度计'},
//                     {value: 1, name: '互联模块'}
//                 ]
//             }
//         ]
//     };
//     //3配置赋值于实例对象
//     myChart.setOption(option);
//     //4图表跟随屏幕自适应
//     window.addEventListener('resize',function(){
//         myChart.resize();
//     })
// })();




var temperatureOption = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#363c43'
    }, {
        offset: 1,
        color: '#29323a'
    }]),
    series: [{
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 45,
            splitNumber: 9,
            itemStyle: {
                color: '#FFAB91'
            },
            progress: {
                show: true,
                width: 25
            },

            pointer: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    width: 25
                }
            },
            axisTick: {
                distance: -35,
                splitNumber: 5,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            splitLine: {
                distance: -42,
                length: 14,
                lineStyle: {
                    width: 3,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: -15,
                color: '#999',
                fontSize: 16
            },
            anchor: {
                show: false
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: false,
                width: '60%',
                lineHeight: 40,
                height: '15%',
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 27,
                fontWeight: 'bolder',
                formatter: '-/-',
                color: 'auto',
            },
            data: [{
                value: 20
            }]
        },

        {
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 45,
            itemStyle: {
                color: '#FD7347',
            },
            progress: {
                show: true,
                width: 8
            },

            pointer: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            detail: {
                show: false
            },
            data: [{
                value: 20,
            }]

        }
    ],
};
//RChatt1
(function(){
    //1实例化对象
    var myChart = echarts.init(document.querySelector(".RChart1"));
    //2指定配置项和数据
    
    //3配置赋值于实例对象
    myChart.setOption(temperatureOption);
    //4图表跟随屏幕自适应
    window.addEventListener('resize',function(){
        myChart.resize();
    });
    setInterval(function() {
        if(SSMsg.onRun==0){
            return;
        }else{
            if(SSMsg.temperature<10){
                if(Math.random()>.7)
                    SSMsg.temperature -= Math.random();
                else
                    SSMsg.temperature += Math.random();
            }else if(SSMsg.temperature>12){
                if(Math.random()>.7)
                    SMsg.temperature += Math.random();
                else
                    SSMsg.temperature -= Math.random();
            }else{
                if(Math.random()>.5)
                    SSMsg.temperature += Math.random();
                else
                    SSMsg.temperature -= Math.random();
            }
            temperatureOption.series[0].data[0].value = SSMsg.temperature.toFixed(1);
            temperatureOption.series[1].data[0].value = SSMsg.temperature.toFixed(1);
        }
       

        myChart.setOption(temperatureOption, true);

    }, 1000);
    
})();







var HumidityOption = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#363c43'
    }, {
        offset: 1,
        color: '#29323a'
    }]),
    series: [{
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
                color: '#FFAB91'
            },
            progress: {
                show: true,
                width: 25
            },

            pointer: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    width: 25
                }
            },
            axisTick: {
                distance: -35,
                splitNumber: 5,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            splitLine: {
                distance: -42,
                length: 14,
                lineStyle: {
                    width: 3,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: -15,
                color: '#999',
                fontSize: 16
            },
            anchor: {
                show: false
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                height: '15%',
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 27,
                fontWeight: 'bolder',
                formatter: '-/-',
                color: 'auto'
            },
            data: [{
                value: 40
            }]
        },

        {
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
                color: '#FD7347',
            },
            progress: {
                show: true,
                width: 8
            },

            pointer: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            detail: {
                show: false
            },
            data: [{
                value: 40,
            }]

        }
    ],
};
//RChatt2
(function(){
    //1实例化对象
    var myChart = echarts.init(document.querySelector(".RChart2"));
    //2指定配置项和数据
    
    //3配置赋值于实例对象
    myChart.setOption(HumidityOption);
    //4图表跟随屏幕自适应
    window.addEventListener('resize',function(){
        myChart.resize();
    });
    setInterval(function() {
        if(SSMsg.onRun ==0)
            return;
        let random = 80+10*Math.random().toFixed(2);
        HumidityOption.series[0].data[0].value = random;
        HumidityOption.series[1].data[0].value = random;
        myChart.setOption(HumidityOption, true);
    }, 2000);
    
})();













function secFormat(value) {
    var theTime = parseInt(value); // 需要转换的时间秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    var theTime3 = 0; // 天
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
            if (theTime2 > 24) {
                // 大于24小时
                theTime3 = parseInt(theTime2 / 24);
                theTime2 = parseInt(theTime2 % 24);
            }
        }
    }
    var result = '';
    if (theTime > 9) {
        result = "" + parseInt(theTime) + "";
    }else if(theTime > 0){
        result = "0" + parseInt(theTime) + "";
    }else
        result = "00";
    if (theTime1 > 9) {
        result = "" + parseInt(theTime1) + ":" + result;
    }else if(theTime1 > 0){
        result = "0" + parseInt(theTime1) + ":" + result;
    }else
        result = "00" + ":" + result;
    if (theTime2 > 9) {
        result = "" + parseInt(theTime2) + ":" + result;
    }else if(theTime2 > 0){
        result = "0" + parseInt(theTime2) + ":" + result;
    }else
        result = "00" + ":" + result;
    if (theTime3 > 0) {
        result = "" + parseInt(theTime3) + ":" + result;
    }
    return result;
}
function timeRefresh(){
    SSMsg.runtime+=1;
    document.getElementById("runTimeHint").innerHTML=secFormat(SSMsg.runtime);
}
setInterval(timeRefresh,1000);







function toPageA_2(){
    if(document.querySelector(".noNumber").innerHTML!="--")
        window.parent.selectBridgeID = document.querySelector(".noNumber").innerHTML;

    parent.topSelected(2);
}
function toPageB_1(){
    if(document.querySelector(".noNumber").innerHTML!="--")
        window.parent.selectBridgeID_PB = document.querySelector(".noNumber").innerHTML;
    else
        window.parent.selectBridgeID_PB = "全部";

    parent.navSelected(2);
}
//存值
var SSMsg = new Object;//SelectSystemMessage
SSMsg.sort = 171002593;
SSMsg.location = "四川省成都市西南交通大学";
SSMsg.latitude = "103.993314°";
SSMsg.longitude = "30.770389°";
SSMsg.runtime = 1312619;
SSMsg.temperature = 11.0;
SSMsg.humidity = 65.5;
SSMsg.onRun = 0;//没有选中系统


//存控件
var SSMsgControl = new Object;//SelectSystemMessage
SSMsgControl.sort = document.querySelector('.noNumber');
SSMsgControl.location = document.querySelector('.location');
SSMsgControl.lltude = document.querySelector('.lltude');
SSMsgControl.runtime = document.getElementById('runTimeHint');
SSMsgControl.title = document.querySelector('.Rtitle1');
SSMsgControl.row2 = document.querySelector('.runHint');
SSMsgControl.runhint = document.querySelector('.rth');
SSMsgControl.status1 = document.querySelector('.RChart1LabelContainer');
SSMsgControl.status2 = document.querySelector('.RChart2LabelContainer');





//页面更新
function SSMsgStaticReload(){
    SSMsgControl.sort.innerHTML  = SSMsg.sort;
    SSMsgControl.location.innerHTML = SSMsg.location;
    SSMsgControl.lltude.innerHTML = SSMsg.latitude +"，"+SSMsg.longitude;
    SSMsgControl.runtime.innerHTML = secFormat(SSMsg.runtime);
    SSMsgControl.row2.innerHTML = "正常运行中";
    SSMsgControl.row2.style.color = "rgba(30, 255, 0, 0.685)";



    SSMsgControl.title.innerHTML = "系统概览 -&nbsp";
    SSMsgControl.title.style.minWidth = "50px ";

    SSMsgControl.runhint.style.visibility = "visible";
    SSMsgControl.status1.style.visibility = "visible";
    SSMsgControl.status2.style.visibility = "visible";


    temperatureOption.series[0].detail.formatter = "{value}°C";
    HumidityOption.series[0].detail.formatter="{value} %";
}

//测试方法
function setSSMsg(sort,location,latitude,longitude,runtime,temperature,humidity){
    SSMsg.onRun = 1;
    SSMsg.sort = sort;
    SSMsg.location = location;
    SSMsg.latitude = latitude;
    SSMsg.longitude = longitude;
    SSMsg.runtime = runtime;
    SSMsg.temperature = temperature;
    SSMsg.humidity = humidity;
    SSMsgStaticReload();
}

//解析方法
function setSSMsgFormServer(jasonStr){
    ;
}


let CBridge = document.getElementById("G3C1");
let DBridge = document.getElementById("G3D1");
let Clongitude = document.getElementById("G3C2");
let Clatitude = document.getElementById("G3C3");

let cando = false;
function createBridge(){
    if(!cando)
        return;
    let cb = CBridge.value;
    let clon = Clongitude.value;
    let clat = Clatitude.value;
    if(document.getElementById("map1").contentWindow.setBridge(clon,clat,cb)){
        document.getElementById('createTip').style.visibility="visible";
        setTimeout(() => {
            document.getElementById('createTip').style.visibility="hidden";
    
        }, 2000);
    }

    // document.getElementById("map1").contentWindow.createMarkerInMapAt("103.993363","30.775839","cnm");

    // alert(clon);
    // alert(clat);
    // alert(cb);
}
function toCreatePage(){
    parent.navSelected(4);
    parent.topSelected(2);

}
function deleteBridge(){
    if(!cando)
        return;
    let db = DBridge.value;
    if(document.getElementById("map1").contentWindow.deleteMarkerByID(db)){
        document.getElementById('deleteTip').style.visibility="visible";
        setTimeout(() => {
            document.getElementById('deleteTip').style.visibility="hidden";
    
        }, 2000);
    }
    // document.getElementById("map1").contentWindow.setBridge("cnm",103.993363,30.774839)

}
function copyLabel(control){
    var Url2=control.innerText;
    var oInput = document.createElement('input');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); 
    document.execCommand("Copy");
    oInput.className = 'oInput';
    oInput.style.display='none';
}
(function init(){
    setTimeout(() => {
        document.getElementById("createBtn").style.cursor="pointer";
        document.getElementById("deleteBtn").style.cursor="pointer";
        cando = true;
    }, 2000);



})();