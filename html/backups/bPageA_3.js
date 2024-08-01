let serverIPPort = window.parent.serverIPPort;
let bridge;
var bridgeNameMap = new Array();

//更改版块小点位状态
function setPoint(panelSort,itemSort,Status){
    var control = document.getElementById("ipP"+panelSort+"_"+itemSort);
    if(Status == 1){
        control.querySelector('.itemStatus').style.color = "seagreen";
        control.querySelector('.itemStatus').innerHTML = "正常";
    }
    else{
        control.querySelector('.itemStatus').style.color = "tomato";
        control.querySelector('.itemStatus').innerHTML = "异常";
    }
}
//修改图例颜色
function setLegendColor(panelSort,itemSort,color){
    var control = document.getElementById("ipP"+panelSort+"_"+itemSort);
    control.querySelector('.itemDiv').style.backgroundColor = color;
}


//the real hiding place for data
var dataMap = new Object();
dataMap.R1Chart = new Object();
dataMap.R1Chart.line1 = new Array(0,0,0,0,0,0,1900);
dataMap.R1Chart.line2 = new Array(0,0,0,0,0,0,1700);
dataMap.R1Chart.line3 = new Array(0,0,0,0,0,0,2000);
dataMap.R2Chart = new Object();
dataMap.R2Chart.line1 = new Array(0,0,0,0,0,0,190);
dataMap.R2Chart.line2 = new Array(0,0,0,0,0,0,170);
dataMap.R2Chart.line3 = new Array(0,0,0,0,0,0,200);






var lineColor = new Array('#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc');
var chart1AlertVal = 2000;
var chart2AlertVal = 192;
var chart3AlertVal = 5120;
var chart4AlertVal = 2333;




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
                chart2lertVal = jsonObj.CJAlert;
                chart3AlertVal = jsonObj.YLAlert;
                chart4AlertVal = jsonObj.SLAlert;
                bridge = jsonObj.bridge;
                document.getElementById("alertSL").value = chart4AlertVal;
                document.getElementById("alertYL").value = chart3AlertVal;
                document.getElementById("alertCJ").value = chart2lertVal;
                document.getElementById("alertSS").value = chart1AlertVal;
 
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



var data1 = [];
for (let i = 0; i < 5; ++i) {
    data1.push(Math.round(Math.random() * 200));
}
var data2 = [];
for (let i = 0; i < 5; ++i) {
    data2.push(Math.round(Math.random() * 200));
}
var R1ChartOption = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '0%',
        top:"5%",
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
                color:"rgba(255,255,255,.1)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            color:lineColor[0],
            
        },
        {
            name: '点位2',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            color:lineColor[4],
        },
        {
            name: '点位3',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            color:lineColor[2]
        }
    ]
};
var R2ChartOption = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '5%',
        right: '8%',
        bottom: '0%',
        top:"5%",
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
                color:"rgba(255,255,255,.1)",
                width:1,
            }
        },
        scale:true,
    },
    series: [
        {
            name: '点位1',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            color:lineColor[1],
            // animation:false,

            
        },
        {
            name: '点位2',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            color:lineColor[7],
            // animation:false,

        },
        {
            name: '点位3',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            color:lineColor[2],
            // animation:false,
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
        bottom: '5%',
        top:"5%",
        containLabel: true
    },
    label:{
        color:'white',
    },
    yAxis: {
        type: 'category',
        data: ['点位1', '点位2', '点位3', '点位4', '点位5'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 4, // only the largest 3 bars will be displayed
        
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data1,
        // color:'green',
        
        label: {
            show: true,
            position: 'right',
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
var R1Chart = echarts.init(document.querySelector(".R1Chart"));
var R2Chart = echarts.init(document.querySelector(".R2Chart"));
var R3Chart = echarts.init(document.querySelector(".R3Chart"));
var B1Chart = echarts.init(document.querySelector(".B1Chart"));





function DateDeviationSec(second){
    return new Date( new Date().getTime() + second*1000 );
}
function done(item){
    return item<10?"0"+item:item;
}
//与你来生共济山高水长~
function chartXAxisRefresh(chart){
    var xAxisData = R1ChartOption.xAxis.data;
    var x2AxisData = R2ChartOption.xAxis.data;

    var timeVal = new Array();
    var timeLabel = new Array();
    for(var i=0;i<xAxisData.length;i++){


        switch(chart){
            case 1:timeVal[i] = DateDeviationSec(-1*+i);break;
            case 2:timeVal[i] = DateDeviationSec(-2*+i);break;
        }
        timeLabel[i] = done(timeVal[i].getHours())+":"+done(timeVal[i].getMinutes())+":"+done(timeVal[i].getSeconds());
    }
    for(var i=0;i<xAxisData.length;i++){
        switch(chart){
            case 1:xAxisData[i] = timeLabel[xAxisData.length-1-i];break;
            case 2:x2AxisData[i] = timeLabel[xAxisData.length-1-i];break;

        }
        
    }
    
    
}

//Foreground y-axis data update 
function chartYAxisRefresh(Chart){

    switch(Chart){
        case 1:
            var yAxisData1 = R1ChartOption.series[0].data;
            var yAxisData2 = R1ChartOption.series[1].data;
            var yAxisData3 = R1ChartOption.series[2].data;
            for(var i=0;i<yAxisData1.length;i++){
                yAxisData1[i] = dataMap.R1Chart.line1[i];
                yAxisData2[i] = dataMap.R1Chart.line2[i];
                yAxisData3[i] = dataMap.R1Chart.line3[i];
            }
            R1Chart.setOption(R1ChartOption);
        break;
        case 2:
            var y2AxisData1 = R2ChartOption.series[0].data;
            var y2AxisData2 = R2ChartOption.series[1].data;
            var y2AxisData3 = R2ChartOption.series[2].data;
            for(var i=0;i<y2AxisData1.length;i++){
                y2AxisData1[i] = dataMap.R2Chart.line1[i];
                y2AxisData2[i] = dataMap.R2Chart.line2[i];
                y2AxisData3[i] = dataMap.R2Chart.line3[i];

            }
            R2Chart.setOption(R2ChartOption);
        break;
    }
   

}
//Background data update
function BackgroundDataRefresh(chart){


    switch(chart){
        case 1:
            //chart1
            var len = dataMap.R1Chart.line1.length;
            var l1 = dataMap.R1Chart.line1;
            var l2 = dataMap.R1Chart.line2;
            var l3 = dataMap.R1Chart.line3;
            l1 = SeriesRefresh(l1,RegularRadomData(0,l1[len-1]),len);
            l2 = SeriesRefresh(l2,RegularRadomData(1,l2[len-1]),len); 
            l3 = SeriesRefresh(l3,RegularRadomData(2,l3[len-1]),len);
            break;
        case 2:
            //chart2
            var len = dataMap.R2Chart.line1.length;
            var l1 = dataMap.R2Chart.line1;
            var l2 = dataMap.R2Chart.line2;
            var l3 = dataMap.R2Chart.line3;
            l1 = SeriesRefresh(l1,RegularRadomData(0,l1[len-1],10),len);
            l2 = SeriesRefresh(l2,RegularRadomData(1,l2[len-1],10),len); 
            l3 = SeriesRefresh(l3,RegularRadomData(2,l3[len-1],10),len);
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
            average = (dataMap.R1Chart.line1[6]+dataMap.R1Chart.line2[6]+dataMap.R1Chart.line3[6])/3;
            if(average>chart1AlertVal){
                document.getElementById("p"+chart).querySelector('.row2Average').style.color = "tomato";
                document.getElementById("p"+chart).querySelector('.row2Average').style.textShadow = "1px 1px 5px rgb(255, 0, 0)";
            }else{
                document.getElementById("p"+chart).querySelector('.row2Average').style.color = "white";
                document.getElementById("p"+chart).querySelector('.row2Average').style.textShadow = "1px 1px 5px rgb(0, 0, 0)";
            }
        break;
        case 2:
            average = (dataMap.R2Chart.line1[6]+dataMap.R2Chart.line1[6]+dataMap.R2Chart.line1[6])/3;    
        break;
    }


    document.getElementById("p"+chart).querySelector('.row2Average').innerHTML = (average).toFixed(0);


}
function statusRefresh(){

    setPoint(1,1,dataMap.R1Chart.line1[6]>chart1AlertVal?0:1);
    setPoint(1,2,dataMap.R1Chart.line2[6]>chart1AlertVal?0:1);
    setPoint(1,3,dataMap.R1Chart.line3[6]>chart1AlertVal?0:1);
    
    setPoint(2,1,dataMap.R2Chart.line1[6]>chart2AlertVal?0:1);
    setPoint(2,2,dataMap.R2Chart.line2[6]>chart2AlertVal?0:1);
    setPoint(2,3,dataMap.R2Chart.line3[6]>chart2AlertVal?0:1);

    averageTipsRefresh(1);

}


//One-second periodic function update
function needUpdateIn1s(){
    chartXAxisRefresh(1);
    chartYAxisRefresh(1);
    BackgroundDataRefresh(1);

    statusRefresh();



}
//Two-second periodic function update
function needUpdateIn2s(){

    chartYAxisRefresh(2);
    chartXAxisRefresh(2);
    BackgroundDataRefresh(2);

    var p3Excess = 0;
    var p4Excess = 0;
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
    var data1 = B1ChartOption.series[0].data;
    for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
            data1[i] += Math.round(Math.random() * 2000);
        }
        else {
            data1[i] += Math.round(Math.random() * 200);
        }
        if(data1[i]>chart4AlertVal)
            p4Excess++;
    }
    

    R3Chart.setOption(R3ChartOption);
    B1Chart.setOption(B1ChartOption);

    document.querySelector('.chart3num').innerHTML = p3Excess;
    document.querySelector('.chart4num').innerHTML = p4Excess;

}

//3-second periodic function update
function needUpdateIn3s(){

    // var data = R3ChartOption.series[0].data;
    // for (var i = 0; i < data.length; ++i) {
    //     if (Math.random() > 0.9) {
    //         data[i] += Math.round(Math.random() * 2000);
    //     }
    //     else {
    //         data[i] += Math.round(Math.random() * 200);
    //     }
    // }
    // R3Chart.setOption(R3ChartOption);
   
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
function TrySelectOnclick(){
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



}
function ListSelected(bridgeName){
    document.querySelector('.A1R1ListBody').style.visibility = "hidden";
    document.getElementById("bridgeId").innerHTML = bridgeName;
    bridge = bridgeName;
    httpGetAlertVal(bridgeName);

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

//规定以下函数进行本页初始化
(function init(){


    //R1表初始化
    R1Chart.setOption(R1ChartOption);
    window.addEventListener('resize',function(){
        R1Chart.resize();
    });
    setPoint(1,1,1);
    setPoint(1,2,1);
    setPoint(1,3,0);
    setLegendColor(1,1,lineColor[0]);
    setLegendColor(1,2,lineColor[4]);
    setLegendColor(1,3,lineColor[2]);

    //R2表初始化
    R2Chart.setOption(R2ChartOption);
    window.addEventListener('resize',function(){
        R2Chart.resize();
    })
    setPoint(2,1,1);
    setPoint(2,2,1);
    setPoint(2,3,0);
    setLegendColor(2,1,lineColor[1]);
    setLegendColor(2,2,lineColor[7]);
    setLegendColor(2,3,lineColor[2]);

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


    if(window.parent.selectBridgeID!="请先在地图中选中桥梁")
    {
        document.getElementById("bridgeId").innerHTML = window.parent.selectBridgeID;
        bridge = window.parent.selectBridgeID;
    }else{
        bridge = bridgeNameMap[0];//?

    }
    HttpGetBridgeNameList();
    setTimeout(()=>{
        ListBodyRefresh();
        httpGetAlertVal(bridgeNameMap[0]);

    },100);



})();



//未定
var temperatureOption = {
    
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
var SSMsg = new Object;//SelectSystemMessage
SSMsg.temperature = 27.0;
SSMsg.humidity = 85.0;
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
            let random = (Math.random() * 45).toFixed(1) - 0;
            if(SSMsg.temperature<20){
                if(Math.random()>.7)
                    SSMsg.temperature -= Math.random();
                else
                    SSMsg.temperature += Math.random();
            }else if(SSMsg.temperature>30){
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







(function(){
    //1实例化对象
    var myChart = echarts.init(document.querySelector(".RChart2"));
    var R1Chart = echarts.init(document.querySelector(".R1Chart"));
    var R2Chart = echarts.init(document.querySelector(".R2Chart"));
    var R3Chart = echarts.init(document.querySelector(".R3Chart"));
    var B1Chart = echarts.init(document.querySelector(".B1Chart"));

    //2指定配置项和数据
    
    //3配置赋值于实例对象
    myChart.setOption(HumidityOption);
    //4图表跟随屏幕自适应
    window.addEventListener('resize',function(){
        myChart.resize();
        R1Chart.resize();
        R2Chart.resize();
        R3Chart.resize();
        B1Chart.resize();

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

