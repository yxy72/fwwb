let serverIPPort = window.parent.serverIPPort;
var bridge;
var bridgeNameMap = new Array();
var R1Chart = echarts.init(document.querySelector(".R1Chart"));
var R2Chart = echarts.init(document.querySelector(".R2Chart"));
var R3Chart = echarts.init(document.querySelector(".R3Chart"));
var B1Chart = echarts.init(document.querySelector(".B1Chart"));
var DetailChart = echarts.init(document.querySelector(".detailChart"));

var p1Excess = 0;
var p2Excess = 0;
var p3Excess = 0;
var p4Excess = 0;
var crrDetialChartSort = 0;

let onShow = true;
let onShowBridge = window.parent.showBridge;

var onFactDataMode = true;//从海哥的后端拿数据



let temperatureAverage = 0;
var chartRefreshPeriod = 1;

function randomZ(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function randomF(min, max) {
    return Math.random() * (max - min) + min;
}



/////////////////////////////////////////////////////////////////////////////////////////////
//the real hiding place for data
var dataMap = new Object();
dataMap.R1Chart = new Object();


var R1ChartData = new Object();
R1ChartData.line = new Array();
for(let i = 0;i<8;i++){
    R1ChartData.line[i] = new Array();
    for(let j = 0 ;j<7;j++)
        if(j==6)
            R1ChartData.line[i].push(randomZ(1500,2000));
        else
            R1ChartData.line[i].push(0);

}

var R2ChartData = new Object();
R2ChartData.line = new Array();
for(let i = 0;i<8;i++){
    R2ChartData.line[i] = new Array();
    for(let j = 0 ;j<7;j++)
    if(j==6)
        R2ChartData.line[i].push(randomZ(150,200));
    else
        R2ChartData.line[i].push(0);
}


var StressChartData = new Object();
StressChartData.line = new Array();
for(let i = 0;i<16;i++){
    StressChartData.line[i] = new Array();
    for(let j = 0;j<7;j++){
        if(j==15)
            StressChartData.line[i].push(randomZ(1000,5000));
        else
            StressChartData.line[i].push(0);
    }
}

var TChartData = new Object();
TChartData.line = new Array();
for(let i = 0;i<16;i++){
    TChartData.line[i] = new Array();
    for(let j = 0;j<7;j++){
        if(j==15)
            TChartData.line[i].push(randomF(24.95,25.05));
        else
            TChartData.line[i].push(0);
    }
}

var CableChartData = new Object();
CableChartData.line = new Array();
for(let i = 0;i<8;i++){
    CableChartData.line[i] = new Array();
    for(let j = 0;j<7;j++){
        if(j==7)
            CableChartData.line[i].push(randomZ(1000,5000));
        else
            CableChartData.line[i].push(0);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////
//the real hiding place for data















var lineColor = new Array('#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc');
var chart1AlertVal = 0;
var chart2AlertVal = 0;
var chart3AlertVal = 0;
var chart4AlertVal = 0;




function httpGetAlertVal(bridge){
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+'/alertVal?bridge='+bridge)
    xhr.send();
    xhr.onreadystatechange = function(){
           
        if(xhr.readyState === 4){
            if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                if(xhr.response=="none"){
                    alert("该桥梁没有完整的警报阈值！")
                    return;
                }
                let jsonObj = JSON.parse(xhr.response);
                chart1AlertVal = jsonObj.SSAlert;
                chart2AlertVal = jsonObj.CJAlert;
                chart3AlertVal = jsonObj.YLAlert;
                chart4AlertVal = jsonObj.SLAlert;
                bridge = jsonObj.bridge;
                document.getElementById("alertSL").value = chart4AlertVal;
                document.getElementById("alertYL").value = chart3AlertVal;
                document.getElementById("alertCJ").value = chart2AlertVal;
                document.getElementById("alertSS").value = chart1AlertVal;
                // bridge
            }
        }
    }
}

window.onload = function(){
   // var setting = httpSetting("/settings","order=getAlert");
   
    //alert((JSON.parse(setting))[0].YLAlert)
}

//The alarm threshold of the chart has been changed 
function alarmValonChanged(control,chart){

    var inputVal = String(control.value);
    if(!isNaN(inputVal)){
        if(inputVal<0){
            control.style.color = "tomato";
            return;
        }
        switch(chart){
            case 1: chart1AlertVal = inputVal;
            // httpSetting("/settings","setAlertOrder=setSSAlert&val="+inputVal);
            httpPostAlertVal("伸缩缝传感器",inputVal);break;
            case 2: chart2AlertVal = inputVal;
            httpPostAlertVal("沉降传感器",inputVal);break;
            // httpSetting("/settings","setAlertOrder=setCJAlert&val="+inputVal);
            case 3: chart3AlertVal = inputVal;
            // httpSetting("/settings","setAlertOrder=setYLAlert&val="+inputVal);break;
            httpPostAlertVal("应力传感器",inputVal);break;
            case 4: chart4AlertVal = inputVal;
            // httpSetting("/settings","setAlertOrder=setSLAlert&val="+inputVal);break;
            httpPostAlertVal("索力传感器",inputVal);break;

        }
        control.style.color = "white";
    }else{
        control.style.color = "tomato";

    }

}

function httpPostAlertVal(ptType,alertVal){
    const xhr = new XMLHttpRequest();
    xhr.open('post',serverIPPort+"/setAlertVal")
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send("bridge="+bridge+"&ptType="+ptType+"&alertVal="+alertVal);
}








//////////////////////////////////////////////////////////////////////////////////////////
//这是我全部的chartOptiion了。
var data1 = [];
for (let i = 0; i < 16; ++i) {
    data1.push(Math.round(Math.random() * 200));
}
var data2 = [];
for (let i = 0; i < 8; ++i) {
    data2.push(Math.round(Math.random() * 200));
}
var dataT = [];
for (let i = 0; i < 16; ++i) {
    dataT.push(randomF(24.95,25.05));
}
var dataNull16 = [];
for (let i = 0; i < 16; ++i) {
    dataNull16.push(0);
}
var dataNull5 = [];
for (let i = 0; i < 5; ++i) {
    dataNull5.push(0);
}
var dataNull8 = [];
for (let i = 0; i < 8; ++i) {
    dataNull8.push(0);
}
var R1ChartOption = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(100,100,100,.1)",
                width:1,
            }
        },
        scale:true,
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(220, 220, 220)',
        }
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: R1ChartData.line[0],
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: R1ChartData.line[1],
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: R1ChartData.line[2],
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: R1ChartData.line[3],
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: R1ChartData.line[4],
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: R1ChartData.line[5],
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: R1ChartData.line[6],
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: R1ChartData.line[7],
            smooth: false,
        }
    ]
};
var R2ChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(220, 220, 220)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(100,100,100,.1)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: R2ChartData.line[0],
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: R2ChartData.line[1],
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: R2ChartData.line[2],
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: R2ChartData.line[3],
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: R2ChartData.line[4],
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: R2ChartData.line[5],
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: R2ChartData.line[6],
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: R2ChartData.line[7],
            smooth: false,
        }
    ]
};
var R3ChartOption = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#363c43'
    }, {
        offset: 1,
        color: '#29323a'
    }]),
    xAxis: {
       


        type: 'category',
        data: ['点1', '点2', '点3', '点4', '点5', '点6', '点7', '点8', '点9', '点10', '点11', '点12', '点13', '点14', '点15', '点16'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 10, // only the largest 3 bars will be displayed

    },
    grid: {
        left: '5%',
        right: '8%',
        bottom: '5%',
        top:"10%",
        containLabel: true
    },
    label:{
        color:'white',
    },
    yAxis: {
        max: 'dataMax',
        splitLine:{
            lineStyle:{
                color:"rgba(100,100,100,.1)",
                width:1,
            }
        },
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data1,
        // color:'green',
        
        label: {
            show: true,
            position: 'top',
            valueAnimation: true
        },
        itemStyle: {
            normal: { //这里必须加normal,否者不显示夜色变化
                color: function(params) {//超过预警值显示红色
                    if (data1[params.dataIndex] > chart3AlertVal) {
                        return 'tomato';
                    } else {
                        return '#1296db';
                    }
                }
            }
        },

    },
    // {
    //     name: '预警标准',
    //     type: 'line',
    //     data: [chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal],
    //     itemStyle: {
    //         normal: {
    //             color: 'tomato'
    //         }
    //     }
    // }
],
    legend: {
        show: false
    },
    animationDuration: 0,
    // animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};
var B1ChartOption = {
    xAxis: {
        max: 'dataMax',
        splitLine:{
            lineStyle:{
                color:"rgba(255,255,255,.1)",
                width:1,
            }
        },
    },
    grid: {
        left: '5%',
        right: '11%',
        bottom: '0%',
        top:"5%",
        containLabel: true
    },
    label:{
        color:'white',
    },
    yAxis: {
        type: 'category',
        data: ['点位1', '点位2', '点位3', '点位4', '点位5', '点位6', '点位7', '点位8'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 4, // only the largest 3 bars will be displayed
        
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data2,
        // color:'green',
        
        label: {
            show: true,
            position: 'right',
            valueAnimation: true
        },
        itemStyle: {
            normal: { //这里必须加normal,否者不显示夜色变化
                color: function(params) {//超过预警值显示红色
                    if (parseFloat(data2[params.dataIndex]) > parseFloat(chart4AlertVal)) {
                        return 'tomato';
                    } else {
                        return '#1296db';
                    }
                }
            }
        },

    },
    // {
    //     name: '预警标准',
    //     type: 'line',
    //     data: [chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal],
    //     itemStyle: {
    //         normal: {
    //             color: 'tomato'
    //         }
    //     }
    // }
],
    legend: {
        show: false
    },
    animationDuration: 0,
    // animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};
var StressChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(100, 100, 100)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(150,150,150,.25)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: StressChartData.line[0],
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: StressChartData.line[1],
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: StressChartData.line[2],
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: StressChartData.line[3],
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: StressChartData.line[4],
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: StressChartData.line[5],
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: StressChartData.line[6],
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: StressChartData.line[7],
            smooth: false,
        },
        {
            name: '点位9',
            type: 'line',
            data: StressChartData.line[8],
            smooth: false,
        },
        {
            name: '点位10',
            type: 'line',
            data: StressChartData.line[9],
            smooth: false,
        },
        {
            name: '点位11',
            type: 'line',
            data: StressChartData.line[10],
            smooth: false,
        },
        {
            name: '点位12',
            type: 'line',
            data: StressChartData.line[11],
            smooth: false,
        },
        {
            name: '点位13',
            type: 'line',
            data: StressChartData.line[12],
            smooth: false,
        },
        {
            name: '点位14',
            type: 'line',
            data: StressChartData.line[13],
            smooth: false,
        },
        {
            name: '点位15',
            type: 'line',
            data: StressChartData.line[14],
            smooth: false,
        },
        {
            name: '点位16',
            type: 'line',
            data: StressChartData.line[15],
            smooth: false,
        }
    ]
};
var CableChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(100, 100, 100)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(150,150,150,.25)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: CableChartData.line[0],
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: CableChartData.line[1],
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: CableChartData.line[2],
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: CableChartData.line[3],
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: CableChartData.line[4],
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: CableChartData.line[5],
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: CableChartData.line[6],
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: CableChartData.line[7],
            smooth: false,
        }
    ]
};
var TChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(100, 100, 100)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(150,150,150,.25)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: TChartData.line[0],
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: TChartData.line[1],
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: TChartData.line[2],
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: TChartData.line[3],
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: TChartData.line[4],
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: TChartData.line[5],
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: TChartData.line[6],
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: TChartData.line[7],
            smooth: false,
        },
        {
            name: '点位9',
            type: 'line',
            data: TChartData.line[8],
            smooth: false,
        },
        {
            name: '点位10',
            type: 'line',
            data: TChartData.line[9],
            smooth: false,
        },
        {
            name: '点位11',
            type: 'line',
            data: TChartData.line[10],
            smooth: false,
        },
        {
            name: '点位12',
            type: 'line',
            data: TChartData.line[11],
            smooth: false,
        },
        {
            name: '点位13',
            type: 'line',
            data: TChartData.line[12],
            smooth: false,
        },
        {
            name: '点位14',
            type: 'line',
            data: TChartData.line[13],
            smooth: false,
        },
        {
            name: '点位15',
            type: 'line',
            data: TChartData.line[14],
            smooth: false,
        },
        {
            name: '点位16',
            type: 'line',
            data: TChartData.line[15],
            smooth: false,
        }
    ]
};
//未定
var temperatureOption = {
    
    series: [{
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: -10,
            max: 35,
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
                formatter: '{value}°C',
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
            min: -10,
            max: 35,
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
var HumidityOption = {
    
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
                formatter: '{value}%',
                color: 'auto'
            },
            data: [{
                value: 66
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

var R1_2NullChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(220, 220, 220)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(100,100,100,.1)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: 0,
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: 0,
            smooth: false,
        }
    ]
};
var StressNullChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(100, 100, 100)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(150,150,150,.25)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: 0,
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位9',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位10',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位11',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位12',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位13',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位14',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位15',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位16',
            type: 'line',
            data: 0,
            smooth: false,
        }
    ]
};
var TNullChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(100, 100, 100)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(150,150,150,.25)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: 0,
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位9',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位10',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位11',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位12',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位13',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位14',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位15',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位16',
            type: 'line',
            data: 0,
            smooth: false,
        }
    ]
};
var R3NullChartOption = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#363c43'
    }, {
        offset: 1,
        color: '#29323a'
    }]),
    xAxis: {
       


        type: 'category',
        data: ['点1', '点2', '点3', '点4', '点5', '点6', '点7', '点8', '点9', '点10', '点11', '点12', '点13', '点14', '点15', '点16'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 10, // only the largest 3 bars will be displayed

    },
    grid: {
        left: '5%',
        right: '8%',
        bottom: '5%',
        top:"10%",
        containLabel: true
    },
    label:{
        color:'white',
    },
    yAxis: {
        max: 'dataMax',
        splitLine:{
            lineStyle:{
                color:"rgba(100,100,100,.1)",
                width:1,
            }
        },
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: dataNull16,
        // color:'green',
        
        label: {
            show: true,
            position: 'top',
            valueAnimation: true
        },
        itemStyle: {
            normal: { //这里必须加normal,否者不显示夜色变化
                color: function(params) {//超过预警值显示红色
                    if (data1[params.dataIndex] > chart3AlertVal) {
                        return 'tomato';
                    } else {
                        return '#1296db';
                    }
                }
            }
        },

    },
    // {
    //     name: '预警标准',
    //     type: 'line',
    //     data: [chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal],
    //     itemStyle: {
    //         normal: {
    //             color: 'tomato'
    //         }
    //     }
    // }
],
    legend: {
        show: false
    },
    animationDuration: 0,
    // animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};
var B1NullChartOption = {
    xAxis: {
        max: 'dataMax',
        splitLine:{
            lineStyle:{
                color:"rgba(255,255,255,.1)",
                width:1,
            }
        },
    },
    grid: {
        left: '5%',
        right: '8%',
        bottom: '0%',
        top:"5%",
        containLabel: true
    },
    label:{
        color:'white',
    },
    yAxis: {
        type: 'category',
        data: ['点位5', '点位1', '点位4', '点位3', '点位2'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 4, // only the largest 3 bars will be displayed
        
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: dataNull5,
        // color:'green',
        
        label: {
            show: true,
            position: 'right',
            valueAnimation: true
        },
        itemStyle: {
            normal: { //这里必须加normal,否者不显示夜色变化
                color: function(params) {//超过预警值显示红色
                    if (data2[params.dataIndex] > chart4AlertVal) {
                        return 'tomato';
                    } else {
                        return '#1296db';
                    }
                }
            }
        },

    },
    // {
    //     name: '预警标准',
    //     type: 'line',
    //     data: [chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal, chart3AlertVal],
    //     itemStyle: {
    //         normal: {
    //             color: 'tomato'
    //         }
    //     }
    // }
],
    legend: {
        show: false
    },
    animationDuration: 0,
    // animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};
var CableNullChartOption = {
    // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#363c43'
    // }, {
    //     offset: 1,
    //     color: '#29323a'
    // }]),
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top:"3%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '']
    },
    legend: {
        bottom: '3%',
        itemWidth:10,
        itemHeight:10,
        textStyle:{
            color:'rgb(100, 100, 100)',
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                color:"rgba(150,150,150,.25)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: 0,
            smooth: false,
            
        },
        {
            name: '点位2',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位3',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位4',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位5',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位6',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位7',
            type: 'line',
            data: 0,
            smooth: false,
        },
        {
            name: '点位8',
            type: 'line',
            data: 0,
            smooth: false,
        }
    ]
};
//////////////////////////////////////////////////////////////////////////////////////////
//这是我全部的chartOptiion了。













var time1 = new Date("2021/4/4 16:31:40").getTime();
setInterval(() => {
    time1+=1000;
}, 1000);
function DateDeviationSec(second){
    return new Date(  time1 + second*1000 );
}
function done(item){
    return item<10?"0"+item:item;
}
//与你来生共济山高水长~
function chartXAxisRefresh(chart){
    var xAxisData = R1ChartOption.xAxis.data;
    var x2AxisData = R2ChartOption.xAxis.data;
    var x3AxisData = StressChartOption.xAxis.data;
    var TAxisData = TChartOption.xAxis.data;
    var cableXData = CableChartOption.xAxis.data;

    var x1_2NullAxisData = R1_2NullChartOption.xAxis.data;

    
    var timeVal = new Array();
    var timeLabel = new Array();
    for(var i=0;i<xAxisData.length;i++){


        switch(chart){
            case 1:timeVal[i] = DateDeviationSec(-1*+i);break;
            // case 2:timeVal[i] = DateDeviationSec(-2*+i);break;
            case 2:timeVal[i] = DateDeviationSec(-1*+i);break;

            case 3:timeVal[i] = DateDeviationSec(-1*+i);break;

        }
        timeLabel[i] = done(timeVal[i].getHours())+":"+done(timeVal[i].getMinutes())+":"+done(timeVal[i].getSeconds());
    }
    for(var i=0;i<xAxisData.length;i++){
        switch(chart){
            case 1:xAxisData[i] =  timeLabel[xAxisData.length-1-i];break;
            case 2:x2AxisData[i] =  timeLabel[xAxisData.length-1-i];break;
            case 3:x3AxisData[i] = timeLabel[xAxisData.length-1-i];
                    TAxisData[i] = timeLabel[xAxisData.length-1-i];
                    cableXData[i]= timeLabel[xAxisData.length-1-i];
                    break;

        }
        
    }
    
    
}

//Foreground y-axis data update 
function chartYAxisRefresh(Chart){

    switch(Chart){
        case 1:
            R1ChartOption.yAxis.splitLine.lineStyle.color = "rgba(100,100,100,.1)"
            R1ChartOption.legend.textStyle.color = "rgb(220, 220, 220)"
            if(bridge==onShowBridge)
                R1Chart.setOption(R1ChartOption);
            else
                R1Chart.setOption(R1_2NullChartOption);

        break;
        case 2:
            R2ChartOption.yAxis.splitLine.lineStyle.color = "rgba(100,100,100,.1)"
            R2ChartOption.legend.textStyle.color = "rgb(220, 220, 220)"

            if(bridge==onShowBridge)
                R2Chart.setOption(R2ChartOption);
            else
                R2Chart.setOption(R1_2NullChartOption);
        break;
        case 3:
            switch(crrDetialChartSort){
                case 1:
                    R1ChartOption.yAxis.splitLine.lineStyle.color = "rgba(0,0,0,.15)"
                    R1ChartOption.legend.textStyle.color = "rgb(100, 100, 100)"
                    if(bridge==onShowBridge)
                        DetailChart.setOption(R1ChartOption);
                    else
                        DetailChart.setOption(R1_2NullChartOption);
                break;
                case 2:
                    R2ChartOption.yAxis.splitLine.lineStyle.color = "rgba(0,0,0,.15)"
                    R2ChartOption.legend.textStyle.color = "rgb(100, 100, 100)"
                    if(bridge==onShowBridge)
                        DetailChart.setOption(R2ChartOption);
                    else
                        DetailChart.setOption(R1_2NullChartOption);
                break;
                case 3:
                    if(bridge==onShowBridge)
                        DetailChart.setOption(StressChartOption);
                    else
                        DetailChart.setOption(StressNullChartOption);
                break;
                case 4:
                    if(bridge==onShowBridge)
                        DetailChart.setOption(TChartOption);
                    else
                        DetailChart.setOption(TNullChartOption);
                break;
                case 5:
                    if(bridge==onShowBridge)
                        DetailChart.setOption(CableChartOption);
                    else
                        DetailChart.setOption(CableNullChartOption);
                break;
            }
            break;

    }
   

}






var fact16 = new Array();
let R3ChartRefreshSec = 3;
let R3ChartCrrSec = R3ChartRefreshSec;
let B1ChartRefreshSec = 1;
let B1ChartCrrSec = B1ChartRefreshSec;
// let permitNewHttp = true;
function httpGetFactData(url){
    // if(!permitNewHttp)
    //     return;
    const xhr = new XMLHttpRequest();
    xhr.open('get',"http://192.168.188.64:8081"+url)
    xhr.send();
    permitNewHttp = false;
    xhr.onreadystatechange = function(){
           
        if(xhr.readyState === 4){
            if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                permitNewHttp = true;
                let jsonObj = JSON.parse(xhr.response);
                fact16 = jsonObj;

                switch(url){
                    case "/data":


                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.pressData.data1;
                        ydhDataGroup[1] = fact16.pressData.data2;
                        ydhDataGroup[2] = fact16.pressData.data3;
                        ydhDataGroup[3] = fact16.pressData.data4;
                        ydhDataGroup[4] = fact16.pressData.data5;
                        ydhDataGroup[5] = fact16.pressData.data6;
                        ydhDataGroup[6] = fact16.pressData.data7;

                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<16;i++)
                            for(let j = 0;j<7;j++)
                                StressChartData.line[i][j] = ydhDataGroup[j][i]

                        if(R3ChartCrrSec == R3ChartRefreshSec){
                            R3ChartCrrSec = 0;
                            data1 = new Array();
                            for(let i =0;i<16;i++){
                                data1.push(StressChartData.line[i][0])
                            }
                            // alert(data1)
                            for (var i = 0; i < data1.length; ++i) {
                                if(data1[i]>chart3AlertVal)
                                    p3Excess++;
                            }
                            R3ChartOption.series[0].data = data1;
                            R3Chart.setOption(bridge==onShowBridge?R3ChartOption:R3NullChartOption);
                        }else{
                            R3ChartCrrSec++;
                        }



                        ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.tempData.data1;
                        ydhDataGroup[1] = fact16.tempData.data2;
                        ydhDataGroup[2] = fact16.tempData.data3;
                        ydhDataGroup[3] = fact16.tempData.data4;
                        ydhDataGroup[4] = fact16.tempData.data5;
                        ydhDataGroup[5] = fact16.tempData.data6;
                        ydhDataGroup[6] = fact16.tempData.data7;
    
                            // alert(ydhDataGroup[0]);
                        for(let i = 0;i<16;i++)
                            for(let j = 0;j<7;j++)
                                TChartData.line[i][j] = ydhDataGroup[j][i]


                        ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.ssfData.data1;
                        ydhDataGroup[1] = fact16.ssfData.data2;
                        ydhDataGroup[2] = fact16.ssfData.data3;
                        ydhDataGroup[3] = fact16.ssfData.data4;
                        ydhDataGroup[4] = fact16.ssfData.data5;
                        ydhDataGroup[5] = fact16.ssfData.data6;
                        ydhDataGroup[6] = fact16.ssfData.data7;

                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<8;i++)
                            for(let j = 0;j<7;j++)
                                R1ChartData.line[i][j] = ydhDataGroup[j][i]


                        ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.cjData.data1;
                        ydhDataGroup[1] = fact16.cjData.data2;
                        ydhDataGroup[2] = fact16.cjData.data3;
                        ydhDataGroup[3] = fact16.cjData.data4;
                        ydhDataGroup[4] = fact16.cjData.data5;
                        ydhDataGroup[5] = fact16.cjData.data6;
                        ydhDataGroup[6] = fact16.cjData.data7;

                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<8;i++)
                            for(let j = 0;j<7;j++)
                                R2ChartData.line[i][j] = ydhDataGroup[j][i]
                            


                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.pressData.data1;
                        ydhDataGroup[1] = fact16.pressData.data2;
                        ydhDataGroup[2] = fact16.pressData.data3;
                        ydhDataGroup[3] = fact16.pressData.data4;
                        ydhDataGroup[4] = fact16.pressData.data5;
                        ydhDataGroup[5] = fact16.pressData.data6;
                        ydhDataGroup[6] = fact16.pressData.data7;

                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<16;i++)
                            for(let j = 0;j<7;j++)
                                StressChartData.line[i][j] = ydhDataGroup[j][i]

                        if(R3ChartCrrSec == R3ChartRefreshSec){
                            R3ChartCrrSec = 0;
                            data1 = new Array();
                            for(let i =0;i<16;i++){
                                data1.push(StressChartData.line[i][0])
                            }
                            // alert(data1)
                            
                            p3Excess = 0;
                            for (var i = 0; i < data1.length; ++i) {
                                if(data1[i]>chart3AlertVal)
                                    p3Excess++;
                            }
                            document.querySelector('.chart3num').innerHTML = bridge==onShowBridge?p3Excess:0;
                            R3ChartOption.series[0].data = data1;
                            R3Chart.setOption(bridge==onShowBridge?R3ChartOption:R3NullChartOption);
                        }else{
                            R3ChartCrrSec++;
                        }

                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.slData.data1;
                        ydhDataGroup[1] = fact16.slData.data2;
                        ydhDataGroup[2] = fact16.slData.data3;
                        ydhDataGroup[3] = fact16.slData.data4;
                        ydhDataGroup[4] = fact16.slData.data5;
                        ydhDataGroup[5] = fact16.slData.data6;
                        ydhDataGroup[6] = fact16.slData.data7;
                        // alert(ydhDataGroup[0]);
                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<8;i++)
                            for(let j = 0;j<7;j++)
                                CableChartData.line[i][j] = ydhDataGroup[j][i]

                        if(B1ChartCrrSec == B1ChartRefreshSec){
                            B1ChartCrrSec = 0;
                            data2 = new Array();
                            for(let i =0;i<8;i++){
                                data2.push(CableChartData.line[i][0].toFixed(2))
                            }
                            // alert(data1)
                            p4Excess = 0;
                            for (var i = 0; i < data2.length; ++i) {
                                if(parseFloat(data2[i])>chart4AlertVal)
                                    p4Excess++;
                            }
                            document.querySelector('.chart4num').innerHTML = bridge==onShowBridge?p4Excess:0;

                            B1ChartOption.series[0].data = data2;
                            B1Chart.setOption(bridge==onShowBridge?B1ChartOption:B1NullChartOption);
                        }else{
                            B1ChartCrrSec++;
                        }

                        

                        break;
                    case "/press":
                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.data1;
                        ydhDataGroup[1] = fact16.data2;
                        ydhDataGroup[2] = fact16.data3;
                        ydhDataGroup[3] = fact16.data4;
                        ydhDataGroup[4] = fact16.data5;
                        ydhDataGroup[5] = fact16.data6;
                        ydhDataGroup[6] = fact16.data7;

                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<16;i++)
                            for(let j = 0;j<7;j++)
                                StressChartData.line[i][j] = ydhDataGroup[j][i]

                        if(R3ChartCrrSec == R3ChartRefreshSec){
                            R3ChartCrrSec = 0;
                            data1 = new Array();
                            for(let i =0;i<16;i++){
                                data1.push(StressChartData.line[i][0])
                            }
                            // alert(data1)
                            for (var i = 0; i < data1.length; ++i) {
                                if(data1[i]>chart3AlertVal)
                                    p3Excess++;
                            }
                            R3ChartOption.series[0].data = data1;
                            R3Chart.setOption(bridge==onShowBridge?R3ChartOption:R3NullChartOption);
                        }else{
                            R3ChartCrrSec++;
                        }
                        break;
                    case "/temp":
                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.data1;
                        ydhDataGroup[1] = fact16.data2;
                        ydhDataGroup[2] = fact16.data3;
                        ydhDataGroup[3] = fact16.data4;
                        ydhDataGroup[4] = fact16.data5;
                        ydhDataGroup[5] = fact16.data6;
                        ydhDataGroup[6] = fact16.data7;
    
                            // alert(ydhDataGroup[0]);
                        for(let i = 0;i<16;i++)
                            for(let j = 0;j<7;j++)
                                TChartData.line[i][j] = ydhDataGroup[j][i]
    
                        // if(R3ChartCrrSec == R3ChartRefreshSec){
                        //     R3ChartCrrSec = 0;
                        //     data1 = new Array();
                        //     for(let i =0;i<16;i++){
                        //         data1.push(TChartData.line[i][0])
                        //     }
                        //     TChartOption.series[0].data = data1;
                        //     TChart.setOption(bridge==onShowBridge?TChartOption:TNullChartOption);
                        // }else{
                        //     R3ChartCrrSec++;
                        // }
                        break;
                    case "/ssf":
                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.data1;
                        ydhDataGroup[1] = fact16.data2;
                        ydhDataGroup[2] = fact16.data3;
                        ydhDataGroup[3] = fact16.data4;
                        ydhDataGroup[4] = fact16.data5;
                        ydhDataGroup[5] = fact16.data6;
                        ydhDataGroup[6] = fact16.data7;

                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<8;i++)
                            for(let j = 0;j<7;j++)
                                R1ChartData.line[i][j] = ydhDataGroup[j][i]

                        break;
                    case "/cj":
                        var ydhDataGroup = new Array();
                        ydhDataGroup[0] = fact16.data1;
                        ydhDataGroup[1] = fact16.data2;
                        ydhDataGroup[2] = fact16.data3;
                        ydhDataGroup[3] = fact16.data4;
                        ydhDataGroup[4] = fact16.data5;
                        ydhDataGroup[5] = fact16.data6;
                        ydhDataGroup[6] = fact16.data7;
    
                        // alert(ydhDataGroup[0]);
                        for(let i = 0;i<8;i++)
                            for(let j = 0;j<7;j++)
                                R2ChartData.line[i][j] = ydhDataGroup[j][i]
    
                        break;
                }
                


            }
        }
    }
}


//Background data update
function BackgroundDataRefresh(chart){


    switch(chart){
        case 1:
            if(onFactDataMode){
                httpGetFactData("/data");
            }else{
                var len = R1ChartData.line[0].length;
                for(let i =0;i<8;i++){
                    R1ChartData.line[i] = SeriesRefresh(R1ChartData.line[i],RegularRadomData(randomZ(0,2),R1ChartData.line[i][len-1]),len)
                }
            }
            break;
        case 2:
            if(onFactDataMode){
                // httpGetFactData("/cj");
            }else{
                var len = R2ChartData.line[0].length;
                for(let i =0;i<8;i++){
                    R2ChartData.line[i] = SeriesRefresh(R2ChartData.line[i],RegularRadomData(randomZ(0,2),R2ChartData.line[i][len-1]),len)
                }
            }
            break;
        case 3:
            if(onFactDataMode){
                // httpGetFactData("/press");
            }else{
                var len = StressChartData.line[0].length;
                for(let i =0;i<16;i++){
                    StressChartData.line[i] = SeriesRefresh(StressChartData.line[i],data1[i],len)
                }
            }
            break;
        case 4:
            if(onFactDataMode){
                // httpGetFactData("/temp");
            }else{
                var len = TChartData.line[0].length;
                for(let i =0;i<16;i++){
                    TChartData.line[i] = SeriesRefresh(TChartData.line[i],dataT[i],len)
                }
            }
            break;
        case 5:
            if(onFactDataMode){
                // httpGetFactData("/temp");
            }else{
                var len = CableChartData.line[0].length;
                for(let i =0;i<8;i++){
                    CableChartData.line[i] = SeriesRefresh(CableChartData.line[i],data2[i],len)
                }
            }
            break;
    }
    

   







}



//ramdom testdata calculate,without'break'
function RegularRadomData(kind,seed,scale = 1){
    var randomData =  (Math.random()*20);
    if(scale!=1)
        randomData = Math.random()*5;
    switch(kind){
        case 0:
            if(seed<1780/scale){
                if(Math.random()>0.9)
                    return seed - randomData;
                else
                    return seed + randomData;
            }else if(seed >2220/scale){
                if(Math.random()>0.9)
                    return seed + randomData;
                else
                    return seed - randomData;
            }
            else{
                if(Math.random()>0.5)
                    return seed + randomData;
                else
                    return seed - randomData;
            }
        case 1:
            if(seed<1680/scale){
                if(Math.random()>0.9)
                    return seed - randomData;
                else
                    return seed + randomData;
            }else if(seed >1920/scale){
                if(Math.random()>0.9)
                    return seed + randomData;
                else
                    return seed - randomData;
            }
            else{
                if(Math.random()>0.45)
                    return seed + randomData;
                else
                    return seed - randomData;
            }
        case 2:
            if(seed<1680/scale){
                if(Math.random()>0.9)
                    return seed - randomData;
                else
                    return seed + randomData;
            }else if(seed >2320/scale){
                if(Math.random()>0.9)
                    return seed + randomData;
                else
                    return seed - randomData;
            }
            else{
                if(Math.random()>0.47)
                    return seed + randomData;
                else
                    return seed - randomData;
            }
    

    }
}





//Chart data update test
function SeriesRefresh(line,Data,len){
    for(var i = 0;i<len-1;i++){
        line[i] = line[i+1];
    }
    line[len-1] = Data;
    
    return line;
}




function averageTipsRefresh(chart){
    var average;

    switch(chart){
        case 1:
            let sum=0;
            for(let i=0;i<8;i++){
                sum+=R1ChartData.line[i][6];
            }
            average = sum/8;
            if(average>chart1AlertVal && bridge==onShowBridge){
                document.getElementById("p"+chart).querySelector('.row2Average').style.color = "tomato";
                document.getElementById("p"+chart).querySelector('.row2Average').style.textShadow = "1px 1px 5px rgb(255, 0, 0)";
            }else{
                document.getElementById("p"+chart).querySelector('.row2Average').style.color = "white";
                document.getElementById("p"+chart).querySelector('.row2Average').style.textShadow = "1px 1px 5px rgb(0, 0, 0)";
            }
            if(bridge==onShowBridge)
                document.getElementById("p"+chart).querySelector('.row2Average').innerHTML = onFactDataMode?(average).toFixed(2):(average).toFixed(0);
            else
                document.getElementById("p"+chart).querySelector('.row2Average').innerHTML = "--";
        break;
        case 2:
            let sum2=0;
            for(let i=0;i<8;i++){
                sum2+=R2ChartData.line[i][6];
            }
            average = sum2/8;
            if(Math.abs(average)>chart2AlertVal && bridge==onShowBridge){
                document.getElementById("R2ChartAverage").style.color = "tomato";
                document.getElementById("R2ChartAverage").style.textShadow = "1px 1px 5px rgb(255, 0, 0)";
            }else{
                document.getElementById("R2ChartAverage").style.color = "white";
                document.getElementById("R2ChartAverage").style.textShadow = "1px 1px 5px rgb(0, 0, 0)";
            }
            if(bridge==onShowBridge)
                document.getElementById("R2ChartAverage").innerHTML = onFactDataMode?(average).toFixed(2):(average).toFixed(0);
            else
                document.getElementById("R2ChartAverage").innerHTML = "--";

            break;
    }




}
function statusRefresh(sort){

    // setPoint(1,1,R1ChartData.line[0][6]>chart1AlertVal?0:1);
    // setPoint(1,2,R1ChartData.line[1][6]>chart1AlertVal?0:1);
    // setPoint(1,3,R1ChartData.line[2][6]>chart1AlertVal?0:1);
    

    averageTipsRefresh(sort);

}
function detailContentRefresh(){
    var exceed = 0 ;
    var exceedPT = "";

    switch(crrDetialChartSort){
        case 1:
            exceed = p1Excess;


            for(let i =0;i<8;i++){

                if(R1ChartData.line[i][6]>chart1AlertVal){

                    exceedPT+="点位"+(i+1)+"，";
                }
            }    
        break;
        case 2:
            
            exceed = p2Excess;


            for(let i =0;i<8;i++){

                if(Math.abs(R2ChartData.line[i][6])>chart2AlertVal){

                    exceedPT+="点位"+(i+1)+"，";
                }
            }

        break;
        case 3:
            exceed = p3Excess;
            for(let i =0;i<16;i++){
                if(data1[i]>chart3AlertVal){
                    exceedPT+="点位"+(i+1)+"，";
                }
            }
        break;
        case 4:
            exceed = 0;
            exceedPT="--";
            if( bridge==onShowBridge)
                document.getElementById('crrTDataCon').innerHTML = temperatureAverage.toFixed(2)+"°C";
            else
                document.getElementById('crrTDataCon').innerHTML = "--";

    
        break;
        case 5:
            exceed = p4Excess;
            for(let i =0;i<8;i++){
                if(parseFloat(data2[i])>chart4AlertVal){
                    exceedPT+="点位"+(i+1)+"，";
                }
            }
        break;

    }
    tempFresh();


    if(exceedPT!="" && bridge==onShowBridge){
        var temp0 = "("
        var temp = exceedPT.slice(0,exceedPT.length-1);
        var temp1 = ")";

        document.getElementById("crrAlertNumCon").innerHTML = exceed;
        document.getElementById("crrExceed").innerHTML = temp0+temp+temp1;
    }else{
        document.getElementById("crrAlertNumCon").innerHTML = 0;
        document.getElementById("crrExceed").innerHTML = "";
    }

    
    

}
//Two-second periodic function update
function needUpdateIn2s(){


    

    

   

}
//One-second periodic function update
function needUpdateIn1s(){
    chartXAxisRefresh(1);
    chartYAxisRefresh(1);
    statusRefresh(1);
    BackgroundDataRefresh(1);

    chartYAxisRefresh(3);
    chartXAxisRefresh(3);
    BackgroundDataRefresh(3);

    BackgroundDataRefresh(4);
    BackgroundDataRefresh(5);


    chartYAxisRefresh(2);
    chartXAxisRefresh(2);
    BackgroundDataRefresh(2);
    statusRefresh(2);

    detailContentRefresh();


    
    p1Excess = 0;
    p2Excess = 0;

    if(!onFactDataMode){
        
    p3Excess = 0;
    p4Excess = 0;
        var data = R3ChartOption.series[0].data;
        for (var i = 0; i < data.length; ++i) {
            if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000);
            }
            else {
                data[i] += Math.round(Math.random() * 200);
            }
            if(data[i]>chart3AlertVal)
                p3Excess++;
        }
        R3Chart.setOption(bridge==onShowBridge?R3ChartOption:R3NullChartOption);


        var data1 = B1ChartOption.series[0].data;
        var numData = new Array();
        for(let i = 0;i<data1.length;i++){
            numData.push(parseFloat(data1[i]));
        }
        // alert(numData[1])
        for (var i = 0; i < 8; ++i) {
            if (Math.random() > 0.9) {
                data1[i] = (numData[i] + Math.round(Math.random() * 2000)).toFixed(2);
            }
            else {
                data1[i] = (numData[i] + Math.round(Math.random() * 200)).toFixed(2);
            }
            if(numData[i]>chart4AlertVal)
                p4Excess++;
        }
        B1Chart.setOption(bridge==onShowBridge?B1ChartOption:B1NullChartOption);


        document.querySelector('.chart3num').innerHTML = bridge==onShowBridge?p3Excess:0;
        document.querySelector('.chart4num').innerHTML = bridge==onShowBridge?p4Excess:0;
    }

















    // R3ChartOption.series[0].data[0] = 1000
    for (var i = 0; i < 16; ++i) {
        if(dataT[i]>30){
            if(Math.random()>.9){
                dataT[i] += randomF(0,.05);
            }else{
                dataT[i] -= randomF(0,.05);
            }
        }else if(dataT[i]<20){
            if(Math.random()>.9){
                dataT[i] -= randomF(0,.05);
            }else{
                dataT[i] += randomF(0,.05);
            }
        }else{
            if(Math.random()>.5){
                dataT[i] += randomF(0,.05);
            }else{
                dataT[i] -= randomF(0,.05);

            }
        }
    }











   




    // test.innerHTML = R2ChartData.line[0][6]
    for (var i = 0; i < 8; ++i) {
        if(Math.abs(R2ChartData.line[i][6])>chart2AlertVal)
            p2Excess++;
    }
    for (var i = 0; i < 8; ++i) {
        if(R1ChartData.line[i][6]>chart1AlertVal)
            p1Excess++;
    }
    




    //计算温度均值
    if(!onFactDataMode){
        let tempSum = 0;
        for(let i=0;i<16;i++){
            tempSum+=dataT[i];
        }
        temperatureAverage = tempSum/16;
    }else{
        let tempSum = 0 ;
        for(let i=0;i<16;i++){
            tempSum+=TChartData.line[i][6];
        }
        temperatureAverage = tempSum/16;
    }

    // tempFresh();
}


//3-second periodic function update
function needUpdateIn3s(){
   
}









function getCrrFormatTime(){
    var myDate = new Date();
    mon = myDate.getMonth()+1;
    day = myDate.getDate();
    h = myDate.getHours();
    m = myDate.getMinutes();
    s = myDate.getSeconds();
    function done(item){
         return item<10?"0"+item:item;
    }
    mon = done(mon);
    day = done(day);
    h = done(h);
    m = done(m);
    s = done(s);
    return myDate.getFullYear()+"/"+mon+"/"+day+" "+h+":"+m+":"+s;
}

function HttpGetBridgeNameList(){
    httpOK = false;
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+'/bridgeName')
    xhr.send();
    xhr.onreadystatechange = function(){
         
         if(xhr.readyState === 4){
              //判断响应状态 200 4004 403 401 500
              if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                   bridgeNameMap = JSON.parse(xhr.response);
                //    brigeNameMap = jsonObj;
                //    getBridgeNameMap();
                   return true;
              }
          }
    };
}
let switchList = false;
function TrySelectOnclick(){

    if(switchList){
        document.querySelector('.A1R1ListBody').style.visibility = "hidden";
        switchList = false;
        return;
    }else{
        switchList = true;
    }

    document.querySelector('.A1R1ListBody').style.visibility = "visible";

    let maxName = 0;
    let mapLength = bridgeNameMap.length;
    for(let i = 0;i<mapLength;i++){
        if(bridgeNameMap[i].length>maxName){
            maxName = bridgeNameMap[i].length;
        }
    }

    // alert(max)
    document.querySelector('.A1R1ListBody').style.width = maxName*12 + "px"
    document.querySelector('.A1R1ListBody').style.height = mapLength<=6?mapLength*32 + 5+ "px":6*32 + 5+ "px"
    closeWindow();


}
function ListSelected(bridgeName){

    document.querySelector('.A1R1ListBody').style.visibility = "hidden";
    switchList = false;

    document.getElementById("bridgeId").innerHTML = bridgeName;
    bridge = bridgeName;
    httpGetAlertVal(bridgeName);
    needUpdateIn2s();//用于快速展示选中非展示桥梁
    needUpdateIn1s();
    humidityFresh();
    tempFresh();
    // alert(bridge)
}
//白嫖C1的
function ListBodyRefresh(){

   let control = document.querySelector('.ul');

   //清空列表
   var list = control.getElementsByTagName("li");
   for(var i = 0; i < list.length; i++) {
       if(list[i].className == "toClearFlag") {
           list[i].parentNode.removeChild(list[i]);
           i--;
       }
   }
   //注入灵魂
   for(let i = 0;i<bridgeNameMap.length;i++){
       let item = document.createElement("li");
       item.appendChild(document.createTextNode(bridgeNameMap[i]));
       item.value = bridgeNameMap[i];
       item.onclick = function(){ListSelected(bridgeNameMap[i]);};
       item.className="toClearFlag";
       control.appendChild(item);
   }
}
var tChart = echarts.init(document.querySelector(".RChart1"));

//规定以下函数进行本页初始化
(function init(){


    //R1表初始化
    R1Chart.setOption(R1ChartOption);
    window.addEventListener('resize',function(){
        R1Chart.resize();
    });

    //R2表初始化
    R2Chart.setOption(R2ChartOption);
    window.addEventListener('resize',function(){
        R2Chart.resize();
    })

    //R3表初始化
    R3Chart.setOption(R3ChartOption);

    //B1表初始化
    B1Chart.setOption(B1ChartOption);

    //定时
    setInterval(needUpdateIn1s,1000);
    setInterval(needUpdateIn2s,2000);
    setInterval(needUpdateIn3s,3000);
    setTimeout(needUpdateIn3s,0);

    let timeLabel = document.querySelector(".PTTime");
    setTimeout(() => {
        timeLabel.innerHTML = "系统时间："+getCrrFormatTime();
    }, 0);
    setInterval(() => {
        timeLabel.innerHTML = "系统时间："+getCrrFormatTime();
    }, 1000);


    
    HttpGetBridgeNameList();
    setTimeout(()=>{
        ListBodyRefresh();
        httpGetAlertVal(bridgeNameMap[0]);
        if(window.parent.selectBridgeID!="请先在地图中选中桥梁")
        {
            document.getElementById("bridgeId").innerHTML = window.parent.selectBridgeID;
            bridge = window.parent.selectBridgeID;
        }else{
            bridge = bridgeNameMap[0];//?
            document.getElementById("bridgeId").innerHTML = bridge;

        }

    },100);

    setTimeout(() => {
        //确实不知道在哪里调用webGL加载完成的回调函数。
        document.querySelector('.onloadTip').style.visibility = "hidden"
    }, 400);
    setTimeout(()=>{
        DetailChart.resize();
        R1Chart.resize();
        R2Chart.resize();
        R3Chart.resize();
        B1Chart.resize();
        tChart.resize();
    },50);
})();




var SSMsg = new Object;//SelectSystemMessage
SSMsg.temperature = 27.0;
SSMsg.humidity = 85.0;
//RChatt1

(function(){
    //1实例化对象
    //2指定配置项和数据
    
    //3配置赋值于实例对象
    tChart.setOption(temperatureOption);
    
})();
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
//RChatt2



function tempFresh(){
    if(bridge==onShowBridge){
        temperatureOption.series[0].data[0].value = temperatureAverage.toFixed(1);
        temperatureOption.series[1].data[0].value = temperatureAverage.toFixed(1);
    }else{

        temperatureOption.series[0].data[0].value = 0;
        temperatureOption.series[1].data[0].value = 0;
    }

    tChart.setOption(temperatureOption, true);
}
function humidityFresh(){
    let random = (65.5+Math.random()).toFixed(1);
    if(bridge==onShowBridge){
        HumidityOption.series[0].data[0].value = random;
        HumidityOption.series[1].data[0].value = random;
    }else{
        HumidityOption.series[0].data[0].value = 0;
        HumidityOption.series[1].data[0].value = 0;
    }
    hChart.setOption(HumidityOption, true);
}

var hChart = echarts.init(document.querySelector(".RChart2"));

(function(){
    //1实例化对象

    //2指定配置项和数据
    
    //3配置赋值于实例对象
    hChart.setOption(HumidityOption);
    //4图表跟随屏幕自适应
    window.addEventListener('resize',function(){
        setTimeout(()=>{
            DetailChart.resize();
            hChart.resize();
            R1Chart.resize();
            R2Chart.resize();
            R3Chart.resize();
            B1Chart.resize();
            
        tChart.resize();
        },50);

    });
    
    setInterval(function() {
        if(SSMsg.onRun ==0)
            return;
            humidityFresh()
        }, 2000);
    
setTimeout(()=>{
    

    DetailChart.resize();
    hChart.resize();
    R1Chart.resize();
    R2Chart.resize();
    R3Chart.resize();
    B1Chart.resize();
    tChart.resize();
},50);

})();



function closeWindow(){
    // alert("s")
    document.querySelector('.dragArea').style.visibility = "hidden"
    document.querySelector('.byebyeArea').style.visibility = "hidden"
    document.querySelector('.TempContainer').style.visibility = "hidden";
    document.querySelector('.detailContainer').style.visibility = "hidden";

    

}
function openWindow(chart){
    crrDetialChartSort = chart;
    DetailChart.clear();


    document.querySelector('.detailContainer').style.visibility = "hidden";
    document.querySelector('.TempContainer').style.visibility = "hidden";

    //RESET THE WINDOW
    document.querySelector('.dragArea').style.visibility = "visible"
    document.querySelector('.byebyeArea').style.visibility = "visible"
    document.querySelector('.window').style.left = 0;
    document.querySelector('.window').style.top = 0;
    document.querySelector('.area2DragDiv').style.left = 0;
    document.querySelector('.area2DragDiv').style.top = 0;

    //reset the titleList
    document.querySelector('.A1R1ListBody').style.visibility = "hidden";
    switchList = false;

    //setChart

    let alertVal = 0;
    let alertExceed = 0;
    //setData
    switch(chart){
        case 1:
            alertVal = chart1AlertVal;
            alertExceed = p1Excess;
            DetailChart.setOption(bridge==onShowBridge?R1ChartOption:R1_2NullChartOption)
            document.querySelector('.Area2Row1Lebal').innerHTML = "详情 - 伸缩缝折线图";
            document.querySelector('.detailContainer').style.visibility = "visible";

            break;
        case 2:
            alertVal = chart2AlertVal;
            alertExceed = p2Excess;
            DetailChart.setOption(bridge==onShowBridge?R2ChartOption:R1_2NullChartOption)
            document.querySelector('.Area2Row1Lebal').innerHTML = "详情 - 沉降折线图";
            document.querySelector('.detailContainer').style.visibility = "visible";

            break;
        case 3:
            alertVal = chart3AlertVal;
            alertExceed = p3Excess;
            DetailChart.setOption(bridge==onShowBridge?StressChartOption:StressNullChartOption)
            document.querySelector('.Area2Row1Lebal').innerHTML = "详情 - 应力折线图";
            document.querySelector('.detailContainer').style.visibility = "visible";

        break;
        case 4:
            alertVal = 0;
            alertExceed = 0;
            DetailChart.setOption(bridge==onShowBridge?TChartOption:TNullChartOption)
            document.querySelector('.Area2Row1Lebal').innerHTML = "详情 - 温度折线图";
            document.querySelector('.TempContainer').style.visibility = "visible";
        break;
        case 5:
            alertVal = chart4AlertVal;
            alertExceed = p4Excess;
            DetailChart.setOption(bridge==onShowBridge?CableChartOption:CableNullChartOption)
            document.querySelector('.Area2Row1Lebal').innerHTML = "详情 - 索力折线图";
            document.querySelector('.detailContainer').style.visibility = "visible";

        break;

    }
    if(bridge==onShowBridge){
        document.getElementById("crrAlertDataCon").innerHTML = alertVal;
        document.getElementById("crrAlertNumCon").innerHTML = alertExceed;
        document.getElementById('crrTDataCon').innerHTML = temperatureAverage.toFixed(2)+"°C";
    }else{
        document.getElementById("crrAlertDataCon").innerHTML = "--";
        document.getElementById("crrAlertNumCon").innerHTML = "--";
        document.getElementById('crrTDataCon').innerHTML = "--";
    }
    detailContentRefresh();
}

var nowMode = false;//小尺寸 1大尺寸
var webGLChart = document.querySelector('.PA3Container');
var PanelR1 = document.querySelector('.PanelR1');
var PanelR2 = document.querySelector('.PanelR2');
var PanelR3 = document.querySelector('.PanelR3');
var PanelB1 = document.querySelector('.PanelB1');
var PanelB2 = document.querySelector('.PanelB2');
var scale1 = document.querySelector('.scale1');
function SCALE(){
    nowMode = !nowMode;
    webGLChart.style.gridTemplateColumns = nowMode?"50% 50% 0":"33.1% 33.1% 33.1%"
    webGLChart.style.gridTemplateRows = nowMode?"48px 1fr 0 0":".15fr .85fr 1fr 1fr";
    webGLChart.style.rowGap = nowMode?"0":"10px"
    webGLChart.style.columnGap = nowMode?"0":"10px"
    PanelR1.style.visibility = nowMode?"hidden":"visible"
    PanelR2.style.visibility = nowMode?"hidden":"visible"
    PanelR3.style.visibility = nowMode?"hidden":"visible"
    PanelB1.style.visibility = nowMode?"hidden":"visible"
    PanelB2.style.visibility = nowMode?"hidden":"visible"
    scale1.title = nowMode?"缩小":"放大"
    // grid-template-areas:
    //     "pt pt r1"
    //     "pm pm r1"
    //     "pm pm r2"
    //     "b1 b2 r3"
    // ;
}







function testOnclick(){
    alert("cnm");
}
let realTop = -(document.querySelector('.Container').offsetHeight-425);
//有的时候心情确实是很难受，但是又没有办法，也不知道该怎么给别人去说
//O(∩_∩)O哈哈~
var divMove = document.querySelector(".area2DragDiv");
var divMovePassive = document.querySelector(".window");
var test =document.querySelector('.cnm');
divMove.onmousedown  = function(e){
    var ev = e || window.event;  //兼容ie浏览器
    //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
    var distanceX = ev.clientX - divMove.offsetLeft;
    var distanceY = ev.clientY - divMove.offsetTop;
    // test.innerHTML = "left="+divMovePassive.style.left+";top="+divMovePassive.style.top;

    document.onmousemove = function(e){
        var ev = e || window.event;  //兼容ie浏览器  
        divMove.style.left = ev.clientX - distanceX + 'px';
        divMove.style.top = ev.clientY - distanceY + 'px'; 
        divMovePassive.style.left = ev.clientX - distanceX + 'px';
        divMovePassive.style.top = ev.clientY - distanceY + 'px'; 
      

    
    };
    document.onmouseup = function(){
    document.onmousemove = null;
    document.onmouseup = null;
    };
};


function ShowModeOnclick(){
    onFactDataMode = !onFactDataMode;
    if(onFactDataMode){
        document.querySelector('.debugBtn').innerHTML = "显示随机数据";
        document.querySelector('.debugBtn').title = "使得图表模式为展示随机数据";
    }
    else{
        document.querySelector('.debugBtn').innerHTML = "显示真实数据";
        document.querySelector('.debugBtn').title = "使得图表数据从服务器获取";
    }
    needUpdateIn1s();
    tempFresh();
}
onFactDataMode = !onFactDataMode;
ShowModeOnclick();
