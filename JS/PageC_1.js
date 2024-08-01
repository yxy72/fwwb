let serverIPPort = window.parent.serverIPPort;
let A2R2TableColumnWith = new Array("16.67%","16.67%","16.67%","16.67%","16.67%","16.67%");
var dataMap = new Array(); //specific dataMap
var ptNameMap = new Array();
var ptSeekMap = new Array();
let chose1 = document.getElementById("chose1");
let chose2 = document.getElementById("chose2");
var date;
var myChart;

var data = [];
for(let i=0;i<720;i++){
     data.push(0)
}

let bridge;//当前选中桥梁
let currentPTSort;
let currentPT;//当前选中桥梁
var bridgeNameMap = new Array();
let onShowBridge = window.parent.showBridge;
let onShowPTS = "应力预测传感器";

function HttpGetList(){
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
     getListByID(bridgeName);
     bridge = bridgeName;
     // alert(bridge)
}


var ydhServer = "http://47.108.197.27:8081";
var predictObj = new Object();
function HttpGetPredict(suburl,len=720){
     const xhr = new XMLHttpRequest();
     xhr.open('get',ydhServer+suburl+'/A')
     xhr.send();
     xhr.onreadystatechange = function(){
          
          if(xhr.readyState === 4){
               //判断响应状态 200 4004 403 401 500
               if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                    let JsonStr = xhr.response;
                    predictObj = JSON.parse(JsonStr);
                    // alert(predictObj[1])


                    data = new Array();
                    for(let i = 0;i<len;i++){
                         data.push(predictObj[i]);
                    }
                    PredictOption.series[0].data = data;
                    myChart.setOption(PredictOption);



                    return true;
               }
           }
     };

}
function iframeLoad(){
     document.querySelector('.webglContainer').src = "../res/webgl/webgl.html";
}

function ChartQuery(){
     let kind = document.getElementById('chose2').querySelector('.chosed').innerHTML;
     if(bridge!=onShowBridge){

          PredictOption.title.text = "没有该传感器的预测数据";
          data = 0;
          PredictOption.series[0].data = data;
          myChart.setOption(PredictOption);
          return;
     }else if(kind == "长期预测"){
          //从简制作，查询唯一的对照表：
          //温度 14400 伸缩缝14402 应力14403 沉降14405
          ChartDateReset(720);
          PredictOption.xAxis.data = date;
          myChart.setOption(PredictOption);
          switch(currentPTSort){
               case "14403":
                    HttpGetPredict("/longpred/press");
                    PredictOption.title.text = "长期预测 - 应力";
                    PredictOption.series[0].name = "应力"
                    break;
               case "14400":
                    HttpGetPredict("/longpred/temp");
                    PredictOption.title.text = "长期预测 - 温度";
                    PredictOption.series[0].name = "温度"
                    break;
               case "14402":
                    HttpGetPredict("/longpred/ssf");
                    PredictOption.title.text = "长期预测 - 伸缩缝";
                    PredictOption.series[0].name = "伸缩缝"
                    break;
               case "14405":
                    HttpGetPredict("/longpred/cj");
                    PredictOption.title.text = "长期预测 - 沉降";
                    PredictOption.series[0].name = "沉降"
                    break;
               default:
                    PredictOption.title.text = "没有该传感器的预测数据";
                    data = 0;
                    PredictOption.series[0].data = data;
                    myChart.setOption(PredictOption);
                    return;
          }
     }else if(kind == "短期预测"){
          //从简制作，查询唯一的对照表：
          //温度 14400 应力14403 索力14404
          ChartDateReset(228);
          PredictOption.xAxis.data = date;
          myChart.setOption(PredictOption);
          switch(currentPTSort){
               case "14403":
                    HttpGetPredict("/shortpred/press",228);
                    PredictOption.title.text = "短期预测 - 应力";
                    PredictOption.series[0].name = "应力"
                    break;
               case "14400":
                    HttpGetPredict("/shortpred/temp",228);
                    PredictOption.title.text = "短期预测 - 温度";
                    PredictOption.series[0].name = "温度"
                    break;
               case "14404":
                    HttpGetPredict("/shortpred/sl",228);
                    PredictOption.title.text = "短期预测 - 索力";
                    PredictOption.series[0].name = "索力"
                    break;
               default:
                    PredictOption.title.text = "没有该传感器的预测数据";
                    data = 0;
                    PredictOption.series[0].data = data;
                    myChart.setOption(PredictOption);
                    return;
          }
     }
     


}

var base = +new Date(2020, 3, 29);//转换为数字哦
var oneDay = 24 * 3600 * 1000;
var oneHour = 3600 * 1000;
function ChartDateReset(len){
     date = new Array();
     for (var i = 1; i < len; i++) {
         var now = new Date(base += oneHour);
         date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
         data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
     }
}
ChartDateReset(720);//Must Init Here!





















//白嫖C2的
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

    // control.querySelector('.chose').onclick = function(){listShow(sort);};
    // control.querySelector('.chose').onblur = function(){listDisapear(sort);};
    
}



let PredictOption = {
     tooltip: {
          trigger: 'axis',
          position: function (pt) {
              return [pt[0], '10%'];
          },

      },
      title: {
          left: 'center',
          text: '长期预测 2020-2024',
          top: '10px',
          textStyle:{
               color:'white'
          }
      },
      toolbox: {
          feature: {
          //     dataZoom: {
          //         yAxisIndex: 'none'
          //     },
              restore: {title:"重置"},
              saveAsImage: {
                   title:"保存"
              }
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
      },
      yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine:{
               lineStyle:{
                   color:"rgba(255,255,255,.1)",
                   width:1,
               }
           },
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 20
      }, {
          start: 0,
          end: 20
      }],
      series: [
          {
              name: '模拟数据',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                  color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgb(255, 158, 68)'
                  }, {
                      offset: 1,
                      color: 'rgb(255, 70, 131)'
                  }])
              },
              data: data,
          }
      ]
};
var myChart;

function chartInit(){
     //1实例化对象
     myChart = echarts.init(document.querySelector(".PredictChart"));
    //2指定配置项和数据
    //3配置赋值于实例对象
    myChart.setOption(PredictOption);
    //4图表跟随屏幕自适应
    window.addEventListener('resize',function(){
        myChart.resize();
    });
}
function listShow(sort){
     switch(sort){
         case 1: chose1.querySelector('.choseList').style.visibility="visible";break;
         case 2: chose2.querySelector('.choseList').style.visibility="visible";break;
         case 3: chose3.querySelector('.choseList').style.visibility="visible";break;
         case 4: chose4.querySelector('.choseList').style.visibility="visible";break;
         case 5: chose5.querySelector('.choseList').style.visibility="visible";break;
 
     }
      
}
function listDisapear(sort){
      setTimeout(function(){
         switch(sort){
             case 1: chose1.querySelector('.choseList').style.visibility="hidden";break;
             case 2: chose2.querySelector('.choseList').style.visibility="hidden";break;
             case 3: chose3.querySelector('.choseList').style.visibility="hidden";break;
             case 4: chose4.querySelector('.choseList').style.visibility="hidden";break;
             case 5: chose5.querySelector('.choseList').style.visibility="hidden";break;
         }
      }, 120);
}
function choseDivInit(control,box,sort,label,listMarginLeft,tail="null"){
     control.querySelector('.label').innerHTML = label;
     control.querySelector('.choseList').style.marginLeft = listMarginLeft;
     
     control.querySelector('.chosed').innerHTML = box[0];
     if(tail!="null")
         control.querySelector('.tail').innerHTML = tail;
     //清空列表
     var list = control.getElementsByTagName("li");
     for(var i = 0; i < list.length; i++) {
         if(list[i].className == "toClearFlag") {
             list[i].parentNode.removeChild(list[i]);
             i--;
         }
     }
     //注入灵魂
     for(let i = 0;i<box.length;i++){
         let item = document.createElement("li");
         item.appendChild(document.createTextNode(box[i]));
         item.value = box[i];
         item.onclick = function(){listChoseSel(sort,i);};
         item.className="toClearFlag";
         control.querySelector('ul').appendChild(item);
     }
 
     control.querySelector('.chose').onclick = function(){listShow(sort);};
     control.querySelector('.chose').onblur = function(){listDisapear(sort);};
     
}
function domWidthSet(control,width){
     control.querySelector('.chose').style.width = width+"px";
     control.querySelector('.choseList').style.width = width+"px";
}
function domListHeightSet(control,height){
     control.querySelector('.choseList').style.height = height+"px";
}
function listChoseSel(sort,item){
     switch(sort){
          case 1:
             chose1.querySelector('.chosed').innerHTML = ptNameMap[item];
             currentPTSort = dataMap[item].sort;
             
             currentPT = item;
             let content1 = ptNameMap[currentPT];
             if(content1.length>4)
                 domWidthSet(chose1,content1.length*16);
          break;
          case 2:
             chose2.querySelector('.chosed').innerHTML = ptSeekMap[item];
          break;
     }

    
}
function listSel(sort){
     listMode = sort;
     switch(sort){
          case 1: dom.innerHTML="人工数据";
               mapRefesh("man");
               break;
          case 2: dom.innerHTML="传感器";
               mapRefesh("pt");
               break;
          case 3: dom.innerHTML="标记项";
               mapRefesh("marked");
               break;
          case 4: dom.innerHTML="级别降序";
               mapRefesh("level");
               break;
          case 5: dom.innerHTML="时间降序";
               mapRefesh("time");
               break; 
     }
}
//我直接嫖了B1的mapRefresh
function mapRefresh(mode = ""){

     var list = document.querySelector('.A2R2ListTableBody').getElementsByTagName("tr");
     for(var i = 0; i < list.length; i++) {
         if(list[i].className == "toClearFlag") {
             list[i].parentNode.removeChild(list[i]);
             i--;
         }
     }
 
     switch(mode){
          case "":
               for(let i = 0;i<dataMap.length;i++){
                    addMap(i);
 
               }
               break;
          case "marked":
               for(let i = 0;i<dataMap.length;i++){
                    if(dataMap[i].marked==1)
                         addMap(i);
               }
               break;
          case "pt":
               for(let i = 0;i<dataMap.length;i++){
                    if(dataMap[i].source=="传感器")
                         addMap(i);
               }
               break;
          case "level"://嗨冒泡排序
               for(let i=0;i<dataMap.length-1;i++){
                    for(let j=0;j<dataMap.length-1-i;j++){
                         if(dataMap[j].level<dataMap[j+1].level){
                              var temp = dataMap[j];
                              dataMap[j] = dataMap[j+1];
                              dataMap[j+1] = temp;
                         }
                    }
               }
               for(let i = 0;i<dataMap.length;i++){
                    addMap(i);
               }
               break;
          case "man":
               for(let i = 0;i<dataMap.length;i++){
                    if(dataMap[i].source!="传感器")
                         addMap(i);
               }
               break;
          case "time":
               for(let i=0;i<dataMap.length-1;i++){
                    for(let j=0;j<dataMap.length-1-i;j++){
                         if(dataMap[j].time<dataMap[j+1].time){
                              var temp = dataMap[j];
                              dataMap[j] = dataMap[j+1];
                              dataMap[j+1] = temp;
                         }
                    }
               }
               for(let i = 0;i<dataMap.length;i++){
                    addMap(i);
               }
 
               break;
     }
 
 
     tipsNumRefresh();
 
     
}
function addMap(dataMapSort){
     
     
     var tr = document.createElement('tr');
     tr.className="toClearFlag";

     var td = new Array();
     for(let tdid = 0;tdid<6;tdid++){
          td[tdid] = document.createElement('td');
          td[tdid].style.width = A2R2TableColumnWith[tdid];
     }


  

    //究极注意：此处如果使用tb1.onclick = function(){dataMap[dataMapSort].id};就意味着结构不能变动，而此处显然处理过!
    

 

     td[0].innerHTML = dataMap[dataMapSort].type;
     td[1].innerHTML = "PT"+dataMap[dataMapSort].sort;
     td[1].style.cursor = "pointer";
     td[1].title = "复制";
     td[1].onclick = function(){copyLabel(this)};
     td[2].innerHTML = dataMap[dataMapSort].crrData;
     td[3].innerHTML = dataMap[dataMapSort].alertVal;

     let status = dataMap[dataMapSort].status;
     td[4].innerHTML = status;
     if(status == "运行中"){
          td[4].style.color = "green";
     }else{
          td[4].style.color ="tomato";
     }
     td[5].innerHTML = dataMap[dataMapSort].runtime;


     for(let tdid = 0;tdid<6;tdid++){
         tr.appendChild(td[tdid]);
     }
     document.querySelector('.A2R2ListTableBody').appendChild(tr);
     formBgdRefresh();
}
function tipsNumRefresh(){
     document.querySelector('.Area2Row1Tips').innerHTML = "(当前总计"+dataMap.length+"个)"
}
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

     if (theTime3 > 9) {
         result = "" + parseInt(theTime3) + ":" + result;
     }else if(theTime3 > 0){
         result = "0" + parseInt(theTime3) + ":" + result;
     }else
         result = "00" + ":" + result;
        
     return result;
 }
function TimeFresh(){
     
     setTimeout(() => {
          var table = document.querySelector(".A2R2ListTableBody");
          var rows = table.rows;
          for(let i = 0;i<dataMap.length;i++){

               dataMap[i].runtime++;
               let row = rows[i];
               if(dataMap[i].status=="运行中")
                    row.cells[5].innerHTML = secFormat(dataMap[i].runtime);
               else
                    row.cells[5].innerHTML = "--";          }
     }, 50);
     setInterval(()=>{
          var table = document.querySelector(".A2R2ListTableBody");
          var rows = table.rows;
          for(let i = 0;i<dataMap.length;i++){

               dataMap[i].runtime++;
               let row = rows[i];
               if(dataMap[i].status=="运行中")
                    row.cells[5].innerHTML = secFormat(dataMap[i].runtime);
               else
                    row.cells[5].innerHTML = "--";

          }
     },1000);
     
}
function formBgdRefresh(){
     let trs = document.querySelector(".A2R2ListTableBody").getElementsByTagName("tr");
     for (var i = 0; i < trs.length; i++) {
          if (i % 2 == 0) { trs[i].style.backgroundColor = "#292e33"; }
          else { trs[i].style.backgroundColor = "#1f2327"; }
     }
}
function getListByID(id){
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+'/seek'+'?'+"PTsID="+id)
    xhr.send();
    xhr.onreadystatechange = function(){
         
         if(xhr.readyState === 4){
              //判断响应状态 200 4004 403 401 500
              if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                let jsonObj = JSON.parse(xhr.response);
                   dataMap = jsonObj;
                   mapRefresh("");

                   //重设展示列表初始时间
                    var table = document.querySelector(".A2R2ListTableBody");
                    var rows = table.rows;
                    for(let i = 0;i<dataMap.length;i++){
          
                         dataMap[i].runtime++;
                         let row = rows[i];
                         if(dataMap[i].status=="运行中")
                              row.cells[5].innerHTML = secFormat(dataMap[i].runtime);
                         else
                              row.cells[5].innerHTML = "--";    
                    }
                    //更新选择列表
                    selectListRefresh();
                    
              }
          }
    }
}

function DomResize(){
     document.querySelector('.a3r3Panel').style.height = String(window.innerHeight - 440)+"px";
     // document.querySelector('.a3r3Panel').style.width = String(document.querySelector('.Area3').offsetWidth - 90)+"px";


     // alert()
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

function selectListRefresh(){
     ptNameMap = new Array()
     for(let i = 0;i<dataMap.length;i++){
          ptNameMap.push(dataMap[i].type+" "+dataMap[i].sort);

     }
     if(dataMap.length==0){
          ptNameMap.push("无")
     }
     choseDivInit(chose1,ptNameMap,1,"选择 &nbsp","45px");

     domListHeightSet(chose1,String(ptNameMap.length>=6?220:ptNameMap.length*36+10));
     
     currentPTSort = dataMap[0].sort;
     // alert(currentPTSort)
     let content1 = ptNameMap[0];
     if(content1.length>4)
          domWidthSet(chose1,content1.length*16);
}


function toEditAlert(){
     
      parent.navSelected(1);
      parent.topSelected(2);


}


//specifies that initialization starts here//
(function init(){

     iframeLoad();
     ChartDateReset(1500);

     if(window.parent.selectBridgeID!="请先在地图中选中桥梁")
     {
         document.getElementById("bridgeId").innerHTML = window.parent.selectBridgeID;
     }
     HttpGetList();

     //reset the mainContainer's height.
     DomResize();
     //reset the mainContainer's height when windowSize changes.
     window.addEventListener('resize',function(){
          DomResize();
     })
     //please select bridge first.
     if(window.parent.selectBridgeID!="请先在地图中选中桥梁")
     {
         document.getElementById("bridgeId").innerHTML = window.parent.selectBridgeID;
     }     
     //set tableColumunWidth
     for(let i = 0;i<5;i++){
          document.getElementById("th"+String(i)).style.width = A2R2TableColumnWith[i];
     }

     TimeFresh();

     ptSeekMap.push("长期预测");ptSeekMap.push("短期预测");
     choseDivInit(chose2,ptSeekMap,2,"类型 &nbsp","45px");
     domListHeightSet(chose2,"80");
     domListHeightSet(chose1,"220");

     // setTimeout(() => {
     //      selectListRefresh();
     // }, 100);
     chartInit();
     setTimeout(()=>{
          ListBodyRefresh();
          getListByID(bridgeNameMap[0]);
          bridge = bridgeNameMap[0]
          
          setTimeout(()=>{
               ChartQuery();
           },50);
      },50);
      
      setTimeout(() => {
          //确实不知道在哪里调用webGL加载完成的回调函数。
          document.querySelector('.onloadTip').style.visibility = "hidden"
      }, 300);
})();