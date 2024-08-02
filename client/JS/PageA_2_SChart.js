var R1Chart = echarts.init(document.querySelector(".R1Chart"));
let R1ChartData = new Object();
R1ChartData.line = new Array();

var R1ChartOption = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '4%',
        right: '6%',
        bottom: '4%',
        top:"4%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7']
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
            name: '点位',
            type: 'line',
            data: [0,0,0,0,0,0,0],
            smooth: false,
            
        }
        
    ]
};
R1Chart.setOption(R1ChartOption);
//与你来生共济山高水长~
function done(item){
    return item<10?"0"+item:item;
}
var time1 = new Date().getTime();
setInterval(() => {
    time1+=1000;
}, 1000);
function DateDeviationSec(second){
    return new Date(  time1 + second*1000 );
}
//注意，我们强行规定 A伸缩缝 B沉降 C应力 D温度 E索力 a-f对应16个点位
var PTMODE = "E3";
// alert(parseInt("A",16));
// alert("cnm".split("")[0])
function chartRefresh(){
    var xAxisData = R1ChartOption.xAxis.data;


    
    var timeVal = new Array();
    var timeLabel = new Array();
    for(var i=0;i<xAxisData.length;i++){

        timeVal[i] = DateDeviationSec(-1*+i);
        timeLabel[i] = done(timeVal[i].getHours())+":"+done(timeVal[i].getMinutes())+":"+done(timeVal[i].getSeconds());
    }
    for(var i=0;i<xAxisData.length;i++){
       
        xAxisData[i] =  timeLabel[xAxisData.length-1-i];
    }


//注意，我们强行规定 A伸缩缝 B沉降 C应力 D温度 E索力 0-f对应16个点位
    let res;
    switch(PTMODE.split("")[0]){
        case "D":
            res = window.parent.parent.TChartData.line[parseInt(PTMODE.split("")[1],16)]
        break;
        case "A":
            res = window.parent.parent.R1ChartData.line[parseInt(PTMODE.split("")[1],16)]
        break;
        case "B":
            res = window.parent.parent.R2ChartData.line[parseInt(PTMODE.split("")[1],16)]
        break;
        case "C":
            res = window.parent.parent.StressChartData.line[parseInt(PTMODE.split("")[1],16)]
        break;
        case "E":
            res = window.parent.parent.CableChartData.line[parseInt(PTMODE.split("")[1],16)]
        break;
    }










    R1ChartOption.series[0].data=res;
    R1Chart.setOption(R1ChartOption);

}
setInterval(chartRefresh,1000);

setTimeout(()=>{
    R1Chart.resize();
},150);


setInterval(() => {
   // alert(window.parent.parent.bridge)
}, 2000);