let TableColumnWith = new Array("110px","190px","190px","160px","120px","300px","","200px","225px","100px");

let serverIPPort = window.parent.serverIPPort;

for(i = 0;i<10;i++){
     document.getElementById("th"+String(i)).style.width = TableColumnWith[i];;
}
// alert(document.querySelector('.tableDiv').offsetWidth);

function formBgdRefresh(){
     let trs = document.getElementById("form").getElementsByTagName("tr");
     for (var i = 0; i < trs.length; i++) {
          if (i % 2 == 0) { trs[i].style.backgroundColor = "#292e33"; }
          else { trs[i].style.backgroundColor = "#1f2327"; }
     }
}

let dom = document.querySelector('.chosed');
var listMode = 5;
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


let list = document.querySelector('.choseList');
function listShow(){
     list.style.visibility="visible";
}
function listDisapear(){
     setTimeout(lDisapear, 120);
}
function lDisapear(){
     list.style.visibility="hidden";
};

var dataMap = new Array();
//测试值
function getList(){
     const xhr = new XMLHttpRequest();
     xhr.open('get',serverIPPort+'/list')
     xhr.send();
     xhr.onreadystatechange = function(){
          
          if(xhr.readyState === 4){
               //判断响应状态 200 4004 403 401 500
               if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                    let jsonObj = JSON.parse(xhr.response);
                    dataMap = jsonObj;
                    console.warn(dataMap[0])
                    listSel(listMode);
               }
           }
     }
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
function gerFormatTime(myDate){
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




var BControl = new Array();
BControl[0] = document.getElementById("B1obj");
BControl[1] = document.getElementById("B1pt");
BControl[2] = document.getElementById("B1time");
BControl[3] = document.getElementById("B1type");
BControl[4] = document.getElementById("B1data");
BControl[5] = document.getElementById("B1runtime");
BTip0 = document.getElementById("BTip0");
BTip1 = document.getElementById("BTip1");
B0Content = document.getElementById("B0Content");
B1Content = document.getElementById("B1Content");


//b2
B2obj = document.getElementById("B2obj");
B2jc = document.getElementById("B2jc");
B2lr = document.getElementById("B2lr");
B2sacntime = document.getElementById("B2sacntime");
B2loadtime = document.getElementById("B2loadtime");
B2assess = document.getElementById("B2assess");


var bridge;


function random(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
}

function randomString(len) {
     　　len = len || 32;
     　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
     　　var maxPos = $chars.length;
     　　var pwd = '';
     　　for (i = 0; i < len; i++) {
     　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
     　　}
     　　return pwd;
}

function mapSelDetail(id){
     bridge = id;
     for(let i = 0;i<dataMap.length;i++)
          if(dataMap[i].id == id){
               if(dataMap[i].source=="传感器"){
                    document.querySelector('.a2Btn0').style.visibility="hidden"
                    BTip0.style.visibility = "hidden";
                    B0Content.style.visibility = "visible";
                    BTip1.style.visibility = "visible";
                    B1Content.style.visibility = "hidden";

                    BControl[0].innerHTML = dataMap[i].bridge;
                    BControl[1].innerHTML = random(171000000,171000099);
                    BControl[2].innerHTML = gerFormatTime(new Date(random(1577808000000,new Date().getTime())));
                    BControl[4].innerHTML = "{\""+random(1500,2000)+"\",\""+random(150,250)+"\",\""+random(2000,2500)+"\",\""+random(475,525)+"\"}";



               }
               else{
                    document.querySelector('.a2Btn0').style.visibility="visible"
                    BTip1.style.visibility = "hidden";
                    B1Content.style.visibility = "visible";
                    BTip0.style.visibility = "visible";
                    B0Content.style.visibility = "hidden";

                    B2obj.innerHTML = dataMap[i].bridge;
                    B2jc.innerHTML = dataMap[i].scanner.length==0?random(171000000,171000099):dataMap[i].scanner;
                    B2lr.innerHTML = dataMap[i].doner.length==0?random(171000000,171000099):dataMap[i].doner;
                    B2loadtime.innerHTML = dataMap[i].time.length==0?gerFormatTime(new Date(random(1577808000000,new Date().getTime()))):dataMap[i].time//
                    B2sacntime.innerHTML = dataMap[i].scantime.length==0?gerFormatTime(new Date(random(1577808000000,new Date().getTime()))):dataMap[i].scantime//
                    B2assess.innerHTML = dataMap[i].jy.length==0?randomString(20):dataMap[i].jy;

               }
               break;
          }
     
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
function mapDelete(id){
     for(let i = 0;i<dataMap.length;i++)
          if(dataMap[i].id == id){
               httpGetQuery('/setDelete','id='+dataMap[i].id);
               dataMap.splice(i,1);
               break;
          }
          
          switch(listMode){
               case 1: 
                    mapRefesh("man");
                    break;
               case 2: 
                    mapRefesh("pt");
                    break;
                    case 3: 
                    mapRefesh("marked");
                    break;
               case 4:
                    mapRefesh("level");
                    break;
               case 5:
                    mapRefesh("time");
                    break;
          }
}
function mapMark(id){

     for(let i = 0;i<dataMap.length;i++)
          if(dataMap[i].id == id){
               if(dataMap[i].marked == 1){
                    dataMap[i].marked = 0;
                    httpGetQuery('/setMark','id='+dataMap[i].id+'&marked=0&date='+new Date().getTime());
               }else{
                    dataMap[i].marked = 1;
                    httpGetQuery('/setMark','id='+dataMap[i].id+'&marked=1&date='+new Date().getTime());
               }break;
          }
     switch(listMode){
          case 1: 
               mapRefesh("man");
               break;
          case 2: 
               mapRefesh("pt");
               break;
               case 3: 
               mapRefesh("marked");
               break;
          case 4:
               mapRefesh("level");
               break;
          case 5:
               mapRefesh("time");
               break;
     }
     
}
function addMap(dataMapSort){
     
     
     var tr = document.createElement('tr');
     tr.className="toClearFlag";

     var td = new Array();
     for(let tdid = 0;tdid<9;tdid++){
         td[tdid] = document.createElement('td');

         if(tdid>=6){
               td[tdid].style.width = TableColumnWith[tdid+1];
         }else
          td[tdid].style.width = TableColumnWith[tdid];

     }


     var tdB = document.createElement('td');
     var tb1 = document.createElement('div');
     var tbBlack = document.createElement('div');
     var tb2 = document.createElement('div');

     tb1.innerHTML = "标记";
     tbBlack.innerHTML = "&nbsp&nbsp";

     tb2.innerHTML = "删除";

     tb1.style.cursor = "pointer";
     tb2.style.cursor = "pointer";
     td[8].style.cursor = "pointer";

     //究极注意：此处如果使用tb1.onclick = function(){dataMap[dataMapSort].id};就意味着结构不能变动，而此处显然处理过!
     let id1 = dataMap[dataMapSort].id;
     tb1.onclick = function(){mapMark(id1);};
     tb2.onclick = function(){mapDelete(id1);};
     td[8].onclick = function(){mapSelDetail(id1);};

     tb1.style.height = "22px";
     tb1.style.marginTop = "7px"
     tb2.style.height = "22px";
     tb2.style.marginTop = "7px"

     tdB.style.color = "#1ba3fe";
     tdB.style.display="flex";
     td[8].style.color = "#1ba3fe";

     tdB.appendChild(tb1);
     tdB.appendChild(tbBlack);
     tdB.appendChild(tb2);


     if(dataMap[dataMapSort].marked == 1)
          for(let tdid = 0;tdid<8;tdid++){
               td[tdid].style.color = "rgb(255, 231, 122)";
          }



     td[0].innerHTML = dataMap[dataMapSort].level;
     td[1].innerHTML = dataMap[dataMapSort].bridge;
     td[1].style.cursor = "pointer";
     td[1].title = "复制";
     td[1].onclick = function(){copyLabel(this)};
     td[2].innerHTML = dataMap[dataMapSort].item;
     td[3].innerHTML = dataMap[dataMapSort].value;
     td[4].innerHTML = dataMap[dataMapSort].source;
     td[5].innerHTML = dataMap[dataMapSort].remark;
     td[6].innerHTML = dataMap[dataMapSort].time;
     td[7].innerHTML = dataMap[dataMapSort].place;
     td[8].innerHTML = "详情"

     for(let tdid = 0;tdid<9;tdid++){
          if(tdid==6)
               tr.appendChild(tdB);
          tr.appendChild(td[tdid]);
     }
     document.getElementById('form').appendChild(tr);
     formBgdRefresh();
}

function mapRefesh(mode = ""){

     var list = document.querySelector('.form').getElementsByTagName("tr");
     for(var i = 0; i < list.length; i++) {
         if(list[i].className == "toClearFlag") {
             list[i].parentNode.removeChild(list[i]);
             i--;
         }
     }



     //注意 此时甲方提了更多的要求，此处也没有更好的解决方式，只能复制临时数据数组
     let OnlyBridge = document.getElementById("MainTitle").innerHTML;
     let tempDoMap = new Array();
     let tempSaveMap = new Array();
     let saveFlag = false;
     if(OnlyBridge == "全部"){
          ;//do noting
     }else{
          tempSaveMap = dataMap;//给爷存起来
          for(let i = 0;i<dataMap.length;i++){
               if(dataMap[i].bridge == OnlyBridge)
                    tempDoMap.push(dataMap[i]);
          }
          dataMap = tempDoMap;
          saveFlag = true;
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


     if(saveFlag){
          tipsNumRefresh();
          dataMap = tempSaveMap;
     }else{ 
          tipsNumRefresh();
     }
     
}
//alert(dataMap[0].place);

//更新表格总条数
function tipsNumRefresh(){
     document.querySelector('.formDataNum').innerHTML = "当前对象总计"+dataMap.length+"项数据"
}

var dateControl = new Array();
 dateControl[0] = document.getElementById("fy");
 dateControl[1] = document.getElementById("fm");
 dateControl[2] = document.getElementById("fd");
 dateControl[3] = document.getElementById("ty");
 dateControl[4] = document.getElementById("tm");
 dateControl[5] = document.getElementById("td");

//以下开始整按钮
var btns = new Array();
btns[0] = true;//测试按钮内测值
btns[1] = true;
btns[2] = false;
btns[3] = false;
for(let i = 0 ;i<btns.length;i++){
          document.getElementById("btn"+String(i)).querySelector('.selBtn').onclick = function(){
          btns[i] = changeBtnStatus(document.getElementById("btn"+String(i)).querySelector('.selBtnBgd'),this,btns[i])
          if(btns[2]){
               for(let i =0;i<dateControl.length;i++){
                    dateControl[i].style.color = "gray";
               }
               document.querySelector('.inputBorder').style.borderBottom = "1px solid gray";

          }else{
               for(let i =0;i<dateControl.length;i++){
                    dateControl[i].style.color = "whitesmoke";
               }
               document.querySelector('.inputBorder').style.borderBottom = "1px solid whitesmoke";

          }
     };
          
    
}

function changeBtnStatus(btnBgd,btn,Onclicked){ 
     if(!Onclicked){
          btnBgd.style.backgroundColor = "royalblue";
          btn.style.marginLeft = "144px";
          return true;
     }else{
          btnBgd.style.backgroundColor = "gray";
          btn.style.marginLeft = "120px";
          return false;
     }
}
function changeBtnStyles(control,label,imgSrc,status="true"){
     control.querySelector('.selLabel').innerHTML = label;
     control.querySelector('.selImg').src = imgSrc;
     if(status=="false"){
          control.querySelector('.selBtn').style.marginLeft = "120px";
          control.querySelector('.selBtnBgd').style.backgroundColor = "gray";
     }
}
changeBtnStyles(document.getElementById("btn0"),"传感器","../res/img/PB1_pt.png");
changeBtnStyles(document.getElementById("btn1"),"人工数据","../res/img/PB1_man.png");
changeBtnStyles(document.getElementById("btn2"),"只包含今日","../res/img/PB1_time.png","false");
changeBtnStyles(document.getElementById("btn3"),"只包含标记","../res/img/PB1_m1.png","false");



//seek complex control
// var fy = document.getElementById("fy");
// var fm = document.getElementById("fm");
// var fD = document.getElementById("fd");
// var ty = document.getElementById("ty");
// var tm = document.getElementById("tm");
// var tD = document.getElementById("td");


function tomorrowDate0(){
     year = new Date().getFullYear();
     mon = new Date().getMonth()+1;
     day = new Date().getDate();
     var tomorrow = new Date(year+"/"+mon+"/"+day).getTime() + 86400*1000;
     return new Date(tomorrow);
}
function todayDate0(){
     year = new Date().getFullYear();
     mon = new Date().getMonth()+1;
     day = new Date().getDate();
     var tomorrow = new Date(year+"/"+mon+"/"+day).getTime();
     return new Date(tomorrow);
}
function getThisYMD(year,mon){
     if(mon==1||mon==3||mon==5||mon==7||mon==8||mon==10||mon==12){
          return 31;
      }else if(mon==4||mon==6||mon==9||mon==11){
          return 30;
      }else{
          if( year % 4 == 0 && ( year % 100 != 0 ||year % 400 == 0)){
             return 29;
          }else{
              return 28;
          }
      }
}


//to proofread the date data
function timeValProofread(y,m,d){
     if(isNaN(String(y))||isNaN(String(m))||isNaN(String(d))){
          // alert("1")
          return false;
     }
     if(parseFloat(y)%1 != 0||parseFloat(m)%1 != 0||parseFloat(d)%1 != 0){
          // alert("2")
          return false;
     }
     //为什么要考虑1800年以前的事呢
     return (y>1800?y<=new Date().getFullYear()?true:false:false) && (m>0?m<=12?true:false:false) && (d>0?d<=getThisYMD(y,m)?true:false:false);
}


var brideObject = document.getElementById("obj");
//导出到excel
function Export(){

     document.querySelector('.exportTip').innerHTML = "";
     document.querySelector('.exportTip').style.color = "tomato";

     var toTimeVal;
     var fromTimeVal;

     //如果只包含今日
     if(btns[2]){
          ;
     }else{
          if(!timeValProofread(dateControl[0].value,dateControl[1].value,dateControl[2].value)||!timeValProofread(dateControl[3].value,dateControl[4].value,dateControl[5].value)){
               document.querySelector('.exportTip').innerHTML = "日期格式不正确。";
               return;
          }
     
          var toTimeVal = String(dateControl[3].value)+"/"+ String(dateControl[4].value)+"/"+ String(dateControl[5].value) +" 23:59:59";
          var fromTimeVal = String(dateControl[0].value)+"/"+ String(dateControl[1].value)+"/"+ String(dateControl[2].value) +" 00:00:00";
     
          if(new Date(toTimeVal)<new Date(fromTimeVal)){
               document.querySelector('.exportTip').innerHTML = "日期范围不正确";
               return;
          }
     
          if(new Date(tomorrowDate0())<new Date(toTimeVal)){
               document.querySelector('.exportTip').innerHTML = "日期范围超过了今天。";
               return;
          }
     }

     var toTimeDate = new Date(toTimeVal);
     var fromTimeDate = new Date(fromTimeVal);



     var brideObjectVal = brideObject.value;
     //如果桥梁对象为空
     if(brideObjectVal==""){
          ;
     }else{
          var has = false;
          document.querySelector('.exportTip').innerHTML = brideObject.value;
          for(let i = 0;i<dataMap.length;i++){
               if(dataMap[i].bridge == brideObjectVal){
                    has = true;
                    break;
               }
          }
          if(!has){
               document.querySelector('.exportTip').innerHTML = "数据库不包含该桥梁的数据。";
               return;
          }
     }
     




     //终局之战
     var tabel = document.createElement('table');
     var tr = document.createElement('tr');
     var td = new Array();
     for(let j = 0;j<8;j++){
          td[j] = document.createElement('td');
     }
     td[0].innerHTML = "级别";
     td[1].innerHTML = "桥梁对象";
     td[2].innerHTML = "项目";
     td[3].innerHTML = "更改值";
     td[4].innerHTML = "来源";
     td[5].innerHTML = "备注";
     td[6].innerHTML = "时间";
     td[7].innerHTML = "地点";
     for(let j = 0;j<8;j++){
          tr.appendChild(td[j]);
     }
     tabel.appendChild(tr);     

     var cal = 0;

     if(btns[0])
          for(let i = 0;i<dataMap.length;i++){
               if(dataMap[i].source == "传感器"){
                    if(btns[2]){
                         
                         // var str ="id = "+dataMap[i].id +new Date(dataMap[i].time) +"起点："+todayDate0()+" 终点："+tomorrowDate0();
                         // alert(str);
                         if(new Date(dataMap[i].time)>tomorrowDate0()||new Date(dataMap[i].time)<todayDate0()){
                              // alert("不满足")
                              continue;
                         }

                    }else{
                              if(new Date(dataMap[i].time)>toTimeDate||new Date(dataMap[i].time)<fromTimeDate){
                              continue;

                         }
                    }
                    if(btns[3]){
                         if(dataMap[i].marked == 0)
                              continue;
                    }
                    if(brideObjectVal!=""){
                         if(dataMap[i].bridge != brideObjectVal){
                              continue;
                         }
                    }
                    var tr = document.createElement('tr');
                    var td = new Array();
                    for(let j = 0;j<8;j++){
                         td[j] = document.createElement('td');
                    }
                    td[0].innerHTML = dataMap[i].level;
                    td[1].innerHTML = dataMap[i].bridge;
                    td[2].innerHTML = dataMap[i].item;
                    td[3].innerHTML = dataMap[i].value;
                    td[4].innerHTML = dataMap[i].source;
                    td[5].innerHTML = dataMap[i].remark;
                    td[6].innerHTML = dataMap[i].time;
                    td[7].innerHTML = dataMap[i].place;
                    for(let j = 0;j<8;j++){
                         tr.appendChild(td[j]);
                    }
                    tabel.appendChild(tr);
                    cal++;
                    
               }
          }

          // return;

     if(btns[1])
          for(let i = 0;i<dataMap.length;i++){
               if(dataMap[i].source != "传感器"){
                    if(btns[2]){
                         // var str ="id = "+dataMap[i].id +new Date(dataMap[i].time) +"起点："+todayDate0()+" 终点："+tomorrowDate0();
                         // alert(str);
                         if(new Date(dataMap[i].time)>tomorrowDate0()||new Date(dataMap[i].time)<todayDate0()){
                              continue;
                         }
                    }else{
                         if(new Date(dataMap[i].time)>toTimeDate||new Date(dataMap[i].time)<fromTimeDate){
                              continue;
                         }
                    }
                    if(btns[3]){
                         if(dataMap[i].marked == 0)
                              continue;
                    }
                    if(brideObjectVal!=""){
                         if(dataMap[i].bridge != brideObjectVal){
                              continue;
                         }
                    }
                    var tr = document.createElement('tr');
                    var td = new Array();
                    for(let j = 0;j<8;j++){
                         td[j] = document.createElement('td');
                    }
                    td[0].innerHTML = dataMap[i].level;
                    td[1].innerHTML = dataMap[i].bridge;
                    td[2].innerHTML = dataMap[i].item;
                    td[3].innerHTML = dataMap[i].value;
                    td[4].innerHTML = dataMap[i].source;
                    td[5].innerHTML = dataMap[i].remark;
                    td[6].innerHTML = dataMap[i].time;
                    td[7].innerHTML = dataMap[i].place;
                    for(let j = 0;j<8;j++){
                         tr.appendChild(td[j]);
                    }
                    tabel.appendChild(tr);
                    cal++;

               }
          }




          if(cal==0){
               document.querySelector('.exportTip').innerHTML = "当前没有符合条件的数据项。";
               return;
          }


     /* html表格转excel */
     var wb = XLSX.utils.table_to_book(tabel);
     /* 生成文件，导出D盘 */
     var exportFileName = getCrrFormatTime()+".xlsx";
     XLSX.writeFile(wb, exportFileName);
     document.querySelector('.exportTip').innerHTML = "已成功下载";
     document.querySelector('.exportTip').style.color = "white";


}


document.onkeydown = function(e){
     if((e||event).keyCode==13)
     document.querySelector(".wDownload").click(); 
};




//network interface
function httpGetResponse(subUrl,queryStr) {
     const xhr = new XMLHttpRequest();
     xhr.open('get',serverIPPort+subUrl+"?"+queryStr)
     xhr.send();
     xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
               //判断响应状态 200 4004 403 401 500
               if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                    return xhr.response;
               }
           }
     }
};
function httpGetQuery(subUrl,queryStr) {
     const xhr = new XMLHttpRequest();
     xhr.open('get',serverIPPort+subUrl+"?"+queryStr)
     xhr.send();
};
function httpSetting(subUrl,queryStr) {
     const xhr = new XMLHttpRequest();
     xhr.open('get',serverIPPort+subUrl+"?"+queryStr)
     xhr.send();
};

function rebort(){
     httpSetting("/settings","setting=list");
     getList();
}
function Switch(){
     if(!parent.PBhasSelect){
          return;
     }
     let con = document.getElementById("MainTitle");

     if(con.innerHTML=="全部"){
          con.innerHTML=parent.selectBridgeID_PB;
          listSel(listMode);
     }else{
          con.innerHTML="全部";
          listSel(listMode);
     }
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
 function tabelHeightResize(){
     document.querySelector('.tableDiv').style.height = String(window.innerHeight - 472)+"px";

}

//规定此处开始加载初始化函数
(function init(){
     tabelHeightResize();

     window.addEventListener('resize',function(){
          tabelHeightResize();
     })
     
     
     
     document.getElementById("tm").value = new Date().getMonth()+1;
     document.getElementById("td").value = new Date().getDate();


     getList();
     tabelHeightResize();
     
     document.getElementById("MainTitle").innerHTML = window.parent.selectBridgeID_PB;

     if(!parent.PBhasSelect){
          document.querySelector(".MainBtn").style.cursor = "not-allowed"
          document.querySelector(".MainBtn").title="在地图中选择桥梁点位后可查看指定对象的数据。"
     }else{
          document.getElementById("obj").value = window.parent.selectBridgeID_PB;
     }

})();

var divMove = document.querySelector(".area2DragDiv");
var divMovePassive = document.querySelector(".window");
// var test =document.querySelector('.cnm');
divMove.onmousedown  = function(e){
    var ev = e || window.event;  //兼容ie浏览器
    //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
    var distanceX = ev.clientX - divMove.offsetLeft;
    var distanceY = ev.clientY - divMove.offsetTop;
//     test.innerHTML = "left="+divMovePassive.style.left+";top="+divMovePassive.style.top;

     document.onmousemove = function(e){
          var ev = e || window.event;  //兼容ie浏览器  
          divMove.style.left = ev.clientX - distanceX + 'px';
          divMove.style.top = ev.clientY - distanceY + 'px'; 
          divMovePassive.style.left = ev.clientX - distanceX + 'px';
          divMovePassive.style.top = ev.clientY - distanceY + 'px'; 
          document.onmouseup = function(){
               document.onmousemove = null;
               document.onmouseup = null;
          };
     }
}
function closeWindow(){
     // alert("s")
     document.querySelector('.dragArea').style.visibility = "hidden"
     document.querySelector('.byebyeArea').style.visibility = "hidden"
     // document.querySelector('.detailContainer').style.visibility = "hidden";
}
function openAuto(){
         //RESET THE WINDOW
     document.querySelector('.dragArea').style.visibility = "visible"
     document.querySelector('.byebyeArea').style.visibility = "visible"
     document.querySelector('.window').style.left = 0;
     document.querySelector('.window').style.top = 0;
     document.querySelector('.area2DragDiv').style.left = 0;
     document.querySelector('.area2DragDiv').style.top = 0;

     let index = dataMap.findIndex(item=>item.id == bridge);

     // document.getElementById("aBridge").innerHTML = dataMap[index].bridge;
     // document.getElementById("aDamageInfo").innerHTML = "裂缝长度："+dataMap[index].harmInfo[0]+"；裂缝位置："+dataMap[index].harmInfo[1]+"；其他："+dataMap[index].harmInfo[2];
     // document.getElementById("aDamageEva").innerHTML = dataMap[index].assess;
     // document.getElementById("aRemark").innerHTML = dataMap[index].remark;

     document.getElementById("Nbridge").innerHTML = dataMap[index].bridge;
     document.getElementById("Ndj").innerHTML = dataMap[index].dj;
     document.getElementById("Njy").innerHTML = dataMap[index].jy;
     document.getElementById("Nplace").innerHTML = dataMap[index].place;
     document.getElementById("Nzkjg").innerHTML = dataMap[index].zkjg;
     document.getElementById("Nqc").innerHTML = dataMap[index].qc;
     document.getElementById("Nzdkj").innerHTML = dataMap[index].zdkj;
     document.getElementById("Ngydw").innerHTML = dataMap[index].gydw;
     document.getElementById("Nqh").innerHTML = dataMap[index].qh;
     document.getElementById("Njl").innerHTML = dataMap[index].scanner;
     document.getElementById("Nfz").innerHTML = dataMap[index].doner;
     document.getElementById("Nbcrq").innerHTML = dataMap[index].scantime;
     document.getElementById("Nxcrq").innerHTML = dataMap[index].xcrq;
     document.getElementById("Nbz").innerHTML = dataMap[index].remark;







     var list = document.querySelector('.formNew').getElementsByTagName("tr");
     for(var i = 0; i < list.length; i++) {
         if(list[i].className == "toClearFlag") {
             list[i].parentNode.removeChild(list[i]);
             i--;
         }
     }

     addMapRecord(1,"翼墙、耳墙",index,0);
     addMapRecord(2,"锥坡、护坡",index,1);
     addMapRecord(3,"桥台及基础",index,2);
     addMapRecord(4,"桥墩及基础",index,3);
     addMapRecord(5,"地基冲刷",index,4);
     addMapRecord(6,"支座",index,5);
     addMapRecord(7,"上部主要承重构件",index,6);
     addMapRecord(8,"上部一般承重构件",index,7);
     addMapRecord(9,"桥面铺装",index,8);
     addMapRecord(10,"桥头跳车",index,9);
     addMapRecord(11,"伸缩缝",index,10);
     addMapRecord(12,"人行道",index,11);
     addMapRecord(13,"栏杆、护栏",index,12);
     addMapRecord(14,"照明标志",index,13);
     addMapRecord(15,"排水设施",index,14);
     addMapRecord(16,"调治构造物",index,15);
     addMapRecord(17,"其他",index,16);




}








// 习近平新时代中国特色社会主义
let TableColumnWithNew = new Array(12,21,12,23,23,15);
// let TableColumnWithNew = new Array(10,10,10,10,10,10);

let CoSum = 0;
    for(let i = 0;i<6;i++){
        CoSum+=TableColumnWithNew[i];
    }
    for(i = 0;i<6;i++){
     TableColumnWithNew[i] = TableColumnWithNew[i]/CoSum*100+"%";
        document.getElementById("th"+String(i)+"New").style.width = TableColumnWithNew[i];
    }
function addMapRecord(sort,item,dataMapSort,row){
     
     
     var tr = document.createElement('tr');
     tr.className="toClearFlag";
 
     var td = new Array();
     for(let tdid = 0;tdid<6;tdid++){
         td[tdid] = document.createElement('td');
         td[tdid].style.width = TableColumnWithNew[tdid];
     }
 
     // td[0].innerHTML = dataMap[dataMapSort].level;
     // td[1].innerHTML = dataMap[dataMapSort].bridge;
     // td[1].style.cursor = "pointer";
     // td[1].title = "复制";
     // td[1].onclick = function(){copyLabel(this)};
     // td[2].innerHTML = dataMap[dataMapSort].item;
     // td[3].innerHTML = dataMap[dataMapSort].value;
     // td[4].innerHTML = dataMap[dataMapSort].source;
     // td[5].innerHTML = dataMap[dataMapSort].remark;
     // td[6].innerHTML = dataMap[dataMapSort].time;
     // td[7].innerHTML = dataMap[dataMapSort].place;
 
 
     td[0].innerHTML = sort;
     td[1].innerHTML = item;
     td[2].innerHTML = dataMap[dataMapSort].ArrayMap[row*3];
     td[3].innerHTML = dataMap[dataMapSort].ArrayMap[row*3+1];
     td[4].innerHTML = dataMap[dataMapSort].ArrayMap[row*3+2];
     if(dataMap[dataMapSort].imgMap[sort-1]!="上传" && dataMap[dataMapSort].imgMap[sort-1]!=""){
          td[5].innerHTML = "查看";
          td[5].style.cursor = "pointer";
     
          td[5].style.color = "#1ba3fe";
     }else{
          td[5].innerHTML = "--";
     }

     

     for(let tdid = 0;tdid<6;tdid++){
          tr.appendChild(td[tdid]);
     }
     document.getElementById('formNew').appendChild(tr);
 }
