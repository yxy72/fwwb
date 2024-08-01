let columnNum = document.querySelector('.trTitle').getElementsByTagName("*").length
let BridgeMap = new Array();
let BridgeOnEdit = new Array();
let TCWNum = new Array(50,70,80,30,30,30,30,30,30,30,30,50,30,64,64,30);
let TableColumnWith = new Array();
let TCWSum = 0;
var ptMap = new Array();
let tempPtMap = new Array();
let ptNum=0;
let currentPT;
let onEditBridge;
let chose1 = document.getElementById("chose1");
let con_bridge = document.getElementById("bridge");
let con_lltude = document.getElementById("lltude");
let con_location = document.getElementById("location");
let con_remark = document.getElementById("remark");
let con_pt_type = document.getElementById("type");
let con_pt_sort = document.getElementById("sort");
let con_pt_alertVal = document.getElementById("alertVal");


let con_Title = document.querySelector('.Area2Row1Lebal');
let con_bridgeTitle = document.getElementById("itemBridgeLabel");
let SubmitMode = "";
let submitCon = new Array();
let focus = new Array(0,0,0,0,0,0);



for(let i = 0;i<TCWNum.length;i++){
    TCWSum += TCWNum[i];
}
for(let i = 0;i<TCWNum.length;i++){
    TableColumnWith.push((TCWNum[i]/TCWSum*100)+"%")
    // alert(TCWNum[i]+"--"+TCWSum+"--"+(TCWNum[i]/TCWSum*100).toFixed(2))
}
let serverIPPort = window.parent.serverIPPort;

function toDetail(bridge){
    window.parent.selectBridgeID_PB = bridge;
    window.parent.PBhasSelect = true;
    window.parent.navSelected(2);
}

//传感器列表逻辑↓
function listChoseSel(sort,item){
    switch(sort){
         case 1:
            chose1.querySelector('.chosed').innerHTML = ptNameMap[item];
            currentPT = item;
            let content1 = ptNameMap[currentPT];
            if(content1.length>4)
                domWidthSet(chose1,content1.length*16);
         break;
    }

   
}
function listShow(sort){
    switch(sort){
        case 1: chose1.querySelector('.choseList').style.visibility="visible";break;

    }
     
}
function listDisapear(sort){
     setTimeout(function(){
        switch(sort){
            case 1: chose1.querySelector('.choseList').style.visibility="hidden";break;
        }
     }, 120);
}
function domWidthSet(control,width){
    control.querySelector('.chose').style.width = width+"px";
    control.querySelector('.choseList').style.width = width+"px";
}
function domListHeightSet(control,height){
    control.querySelector('.choseList').style.height = height+"px";
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
function getListByID(id){
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+'/seek'+'?'+"PTsID="+id)
    xhr.send();
    xhr.onreadystatechange = function(){
         
         if(xhr.readyState === 4){
              //判断响应状态 200 4004 403 401 500
              if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                let jsonObj = JSON.parse(xhr.response);
                ptMap = jsonObj;
                    //更新选择列表
                    selectListRefresh(ptMap);
                    ptNum = ptMap.length;
                    tempPtMap = new Array();
                    for(let i = 0;i<ptMap.length;i++){
                        tempPtMap.push(ptMap[i]);
                    }
              }
          }
    }
}
function selectListRefresh(ptMap){
    
    ptNameMap = new Array()
    for(let i = 0;i<ptMap.length;i++){
         ptNameMap.push(ptMap[i].type+" "+ptMap[i].sort);

    }
    if(ptMap.length==0){
         ptNameMap.push("无")
    }
    choseDivInit(chose1,ptNameMap,1," &nbsp&nbsp&nbsp","16px");

    domListHeightSet(chose1,String(ptNameMap.length>=5?184:ptNameMap.length*36+10));


    let content1 = ptNameMap[0];
    if(content1.length>4)
         domWidthSet(chose1,content1.length*16);
}


//传感器列表逻辑↑






function httpGetBridgeMap() {
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+"/BridgeMapList")
    xhr.send();
    xhr.onreadystatechange = function(){
          
        if(xhr.readyState === 4){
            //判断响应状态 200 4004 403 401 500
            if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                let jsonObj = JSON.parse(xhr.response);
                BridgeMap = jsonObj;
                  
                for(let i = 0;i<BridgeMap.length;i++)
                    BridgeOnEdit.push(false);
                    mapRefresh();
                
            }
        }
   }
};

//我直接嫖了D1的mapRefresh
function mapRefresh(mode = ""){

    var list = document.querySelector('.ListTableBody').getElementsByTagName("tr");
    for(var i = 0; i < list.length; i++) {
        if(list[i].className == "toClearFlag") {
            list[i].parentNode.removeChild(list[i]);
            i--;
        }
    }

    switch(mode){
        case "":
            for(let i = 0;i<BridgeMap.length;i++){
                // if(BridgeOnEdit[i])
                //     addEditMap(i);
                // else
                    addMap(i);
            }
            addNewTr();
        break;
        // case "edit":
        //     for(let i = 0;i<BridgeMap.length;i++){
        //         addEditMap(i);
        //     }
        // break;
         
    }
    tipsNumRefresh();
}
function formBgdRefresh(){
    let trs = document.querySelector(".ListTableBody").getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
         if (i % 2 == 0) { trs[i].style.backgroundColor = "#292e33"; }
         else { trs[i].style.backgroundColor = "#1f2327"; }
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
function copyID(){
    var Url2=document.getElementById("bridge").value;
    var oInput = document.createElement('input');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); 
    document.execCommand("Copy");
    oInput.className = 'oInput';
    oInput.style.display='none';
}
function toMapPage(){
    parent.navSelected(1);
    parent.topSelected(1);
    window.parent.PDhasSelect = true;
}
function editItemOnclick(bridge){

    document.querySelector('.area1_5').style.visibility="visible"
    document.querySelector('.confirmDel').style.visibility = "visible";
    document.querySelector('.confirmDel').style.marginRight = "60px";

    let index = BridgeMap.findIndex(item=>item.bridge == bridge);
    con_bridge.value = BridgeMap[index].bridge;
    con_lltude.value = BridgeMap[index].longitude + "," + BridgeMap[index].latitude;
    con_location.value = BridgeMap[index].place;

    setTimeout(()=>{
        document.querySelector('.itemTips').innerHTML = "当前共计"+ptNum+"个传感器";

    },50);



    onEditBridge = bridge;
    SubmitMode = "edit";
    for(let i =0;i<submitCon.length;i++){
        submitCon[i].style.color = "white"
    }

    submitCon[3].value = "温度传感器";
    submitCon[5].value = "512";
    getListByID(bridge);

    setTimeout(()=>{
        let maxSort = 0;
        for(let i = 0;i<tempPtMap.length;i++){
            if(parseInt(tempPtMap[i].sort)>maxSort)
                maxSort = tempPtMap[i].sort;
        }
        if(maxSort==0){
            con_pt_sort.value = 14400;
        }else
            con_pt_sort.value = (parseInt(maxSort)+1);
    },100);





    con_Title.innerHTML = "编辑桥梁对象 - "+ bridge;
    con_bridgeTitle.innerHTML = "修改编号";

    
    //您好，这段注释不能删的。

    // let MapIndex = BridgeMap.findIndex(item=>item.bridge == bridge);
    // var table = document.querySelector(".ListTableBody");
    // var rows = table.rows;
    // for(let i = 0;i<BridgeMap.length;i++){

    //     if(rows[i].cells[0].innerHTML == bridge){
    //         let td = new Array();
    //         td[0] = document.createElement('input');
    //         td[0].value = "bridge";
    //         rows[i].insertBefore(td[0],rows[i].cells[0])
    //         rows[i].removeChild(rows[i].cells[0])
    //         return;
    //     }

    // }

    // let con_bridge = document.getElementById("bridge");
    // let con_lltude = document.getElementById("lltude");
    // let con_location = document.getElementById("location");
    // let con_remark = document.getElementById("remark");
    // let con_pt_type = document.getElementById("type");
    // let con_pt_sort = document.getElementById("sort");
    // let con_pt_alertVal = document.getElementById("alertVal");
    if(window.parent.PDhasSelect){
        submitCon[1].value = window.parent.PDLLtude;
        submitCon[2].value = window.parent.PDLocation;
    }
}

function addItemOnclick(){
    document.querySelector('.area1_5').style.visibility="visible"
    document.querySelector('.confirmDel').style.visibility = "hidden";
    document.querySelector('.confirmDel').style.marginRight = "-45px";

    con_bridge.value = "";
    con_lltude.value = "";
    con_location.value = "";
    ptNum = 0;
    setTimeout(()=>{
        document.querySelector('.itemTips').innerHTML = "当前共计"+ptNum+"个传感器";

    },50);
    for(let i = 0;i<6;i++){
        submitCon[i].value = "请输入";
        submitCon[i].style.color = "gray"
    }


    onEditBridge = false;
    SubmitMode = "add";
    con_Title.innerHTML = "新增桥梁对象";
    con_bridgeTitle.innerHTML = "桥梁编号";

    submitCon[0].value = "请输入";
    submitCon[1].value = "浮点数,浮点数";
    submitCon[2].value = "请输入";
    submitCon[3].value = "请输入";
    submitCon[4].value = "整数";
    submitCon[5].value = "整数";

    for(let i =0;i<submitCon.length;i++){
        submitCon[i].style.color = "gray"
    }

    tempPtMap = new Array();
    selectListRefresh(tempPtMap);
    if(window.parent.PDhasSelect){
        submitCon[1].value = window.parent.PDLLtude;
        submitCon[2].value = window.parent.PDLocation;
        submitCon[1].style.color = "white"
        submitCon[2].style.color = "white"


    }
}







function pushNewPtToTemp(){
    // ptNameMap.push(ptMap[i].type+" "+ptMap[i].sort);
    let item = new Object();
    item.type = con_pt_type.value;
    item.sort = con_pt_sort.value;
    item.alertVal = con_pt_alertVal.value;
    item.crrData = 0;
    item.runtime = 0;
    item.status = "运行中";
    tempPtMap.push(item);
    
    selectListRefresh(tempPtMap)
    let maxSort = 0;
        for(let i = 0;i<tempPtMap.length;i++){
            if(parseInt(tempPtMap[i].sort)>maxSort)
                maxSort = tempPtMap[i].sort;
        }
        if(maxSort==0){
            con_pt_sort.value = 14400;
        }else
            con_pt_sort.value = (parseInt(maxSort)+1);
}
function PopOldPtFromTemp(){
    tempPtMap.splice(currentPT,1);
    selectListRefresh(tempPtMap)
}

let canPtPush = true;
let canPtPop = true;

function ptConfirm(){
    if(!canPtPush)
        return;

    if(tempPtMap.findIndex(item=>item.sort==con_pt_sort.value)!=-1){
        document.getElementById("confirmPtTip").style.visibility = "visible";
        document.getElementById("confirmPtTip").innerHTML = "传感器编号应具有唯一性。";

        canPtPush = false;
        setTimeout(()=>{
            document.getElementById("confirmPtTip").style.visibility = "hidden";
            canPtPush = true;
        },1000);
        return;
    }

    if(submitCon[3].value=="请输入"||submitCon[3].value==""||submitCon[4].value=="整数"||submitCon[4].value==""||submitCon[5].value=="整数"||submitCon[5].value==""){
        document.getElementById("confirmPtTip").style.visibility = "visible";
        document.getElementById("confirmPtTip").innerHTML = "你把他填完嘛。";

        canPtPush = false;
        setTimeout(()=>{
            document.getElementById("confirmPtTip").style.visibility = "hidden";
            canPtPush = true;
        },1000);
        return;
    
    }


    document.getElementById("confirmPtTip").style.visibility = "visible";
    document.getElementById("confirmPtTip").innerHTML = "已记录该操作";
    canPtPush = false;
    setTimeout(()=>{
        document.getElementById("confirmPtTip").style.visibility = "hidden";
        canPtPush = true;
    },1000);

    pushNewPtToTemp();
    document.querySelector('.itemTips').innerHTML = "当前共计"+tempPtMap.length+"个传感器";


}
function ptDelete(){
    if(!canPtPop)
        return;


    if(tempPtMap.length==0){
        document.getElementById("deletePtTip").style.visibility = "visible";
        document.getElementById("deletePtTip").innerHTML = "删无可删乐";

        canPtPop = false;
        setTimeout(()=>{
            document.getElementById("deletePtTip").style.visibility = "hidden";
            canPtPop = true;
        },1000);
        return;
    }


    document.getElementById("deletePtTip").style.visibility = "visible";
    document.getElementById("deletePtTip").innerHTML = "已记录该操作";

    canPtPop = false;
    setTimeout(()=>{
        document.getElementById("deletePtTip").style.visibility = "hidden";
        canPtPop = true;

    },1000);

    PopOldPtFromTemp();
    document.querySelector('.itemTips').innerHTML = "当前共计"+tempPtMap.length+"个传感器";

}
function httpSetting(subUrl,queryStr) {
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+subUrl+"?"+queryStr)
    xhr.send();
};
function rebort(){
    httpSetting("/settings","setting=Bridgelist");
    setTimeout(
        ()=>{
            httpGetBridgeMap();
        } ,100);
}
function httpDeleteBridge(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('post',serverIPPort+"/delBridge")
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send('id='+id);
};
function httpSetFullBridge(id,longitude,latitude,place,remark) {
    const xhr = new XMLHttpRequest();
    if(remark=="")
    remark = "无"
    xhr.open('post',serverIPPort+"/addFullBridge")
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send('id='+id+"&longitude="+longitude+"&latitude="+latitude+"&place="+place+"&pt="+JSON.stringify(tempPtMap)+"&remark="+remark);
};
function httpEditExistBridge(id,newID,longitude,latitude,place,remark) {
    const xhr = new XMLHttpRequest();
    if(remark=="")
    remark = "无"
    xhr.open('post',serverIPPort+"/editExitBridge")
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send('id='+id+"&newID="+newID+"&longitude="+longitude+"&latitude="+latitude+"&place="+place+"&pt="+JSON.stringify(tempPtMap)+"&remark="+remark);
};

function closeBottom(){
    document.querySelector('.area1_5').style.visibility="hidden"
    // window.parent.PDhasSelect = false;
    document.querySelector('.confirmDel').style.visibility = "hidden";
}

let canSubmit = true;
let ifFloat = /^(-?\d+)(\.\d+)?$/; //好牛啊

function Submit(){
    if(!canSubmit)
        return;

    if(SubmitMode=="add"){
        let index = BridgeMap.findIndex(item=>item.bridge == con_bridge.value)

        if(submitCon[0].value=="请输入"||submitCon[0].value==""||submitCon[1].value=="浮点数,浮点数"||submitCon[1].value==""||submitCon[2].value=="请输入"||submitCon[2].value==""){
            document.querySelector(".confirmVisibility").style.visibility = "visible";
                document.getElementById("confirmTime").innerHTML = "";
                document.getElementById("confirmTip").innerHTML = "至少需要输入编号、经纬度和位置。"
                canSubmit = false;
                setTimeout(()=>{
                    document.querySelector(".confirmVisibility").style.visibility = "hidden";
                    canSubmit = true;
                },2000);
                return;
        }


        if(index!=-1){
                document.querySelector(".confirmVisibility").style.visibility = "visible";
                document.getElementById("confirmTime").innerHTML = "";
                document.getElementById("confirmTip").innerHTML = "操作失败，桥梁编号"+con_bridge.value+"已存在。"
                canSubmit = false;
                setTimeout(()=>{
                    document.querySelector(".confirmVisibility").style.visibility = "hidden";
                    canSubmit = true;
                },2000);
                return;
        }
    
        if(!ifFloat.test(con_lltude.value.split(",")[0])||!ifFloat.test(con_lltude.value.split(",")[1])){
            document.querySelector(".confirmVisibility").style.visibility = "visible";
            document.getElementById("confirmTime").innerHTML = "";
            document.getElementById("confirmTip").innerHTML = "操作失败，经纬度格式应为 <浮点数>,<浮点数>"
            canSubmit = false;
            setTimeout(()=>{
                document.querySelector(".confirmVisibility").style.visibility = "hidden";
                canSubmit = true;
            },2000);
            return;
        }

        httpSetFullBridge(con_bridge.value,con_lltude.value.split(",")[0],con_lltude.value.split(",")[1],con_location.value,con_remark.value);
        // tempPtMap = new Array();



        document.querySelector(".confirmVisibility").style.visibility = "visible";
        document.getElementById("confirmTime").innerHTML = getCrrFormatTime();
        document.getElementById("confirmTip").innerHTML = "提交成功，提交时间：";

        canSubmit = false;
        setTimeout(()=>{
            canSubmit = true;
            document.querySelector(".confirmVisibility").style.visibility = "hidden";
        },2000);


        httpGetBridgeMap();
        window.parent.PDhasSelect = false;

    }else if(SubmitMode=="edit"){

// let index = yxyMarkerGroup.findIndex(item=>item.id == id);
    // if(index==-1){
    //     alert("地图中不存在桥梁对象："+id+"。");
    //     return false;
    // }
    
    let index = BridgeMap.findIndex(item=>item.bridge == con_bridge.value)
    if(index!=-1){
        if(BridgeMap[index].bridge!=onEditBridge){
            document.querySelector(".confirmVisibility").style.visibility = "visible";
            document.getElementById("confirmTime").innerHTML = "";
            document.getElementById("confirmTip").innerHTML = "操作失败，桥梁编号"+con_bridge.value+"已存在。"
            canSubmit = false;
            setTimeout(()=>{
                document.querySelector(".confirmVisibility").style.visibility = "hidden";
                canSubmit = true;
            },2000);
            return;
        }    
    }

    if(!ifFloat.test(con_lltude.value.split(",")[0])||!ifFloat.test(con_lltude.value.split(",")[1])){
        document.querySelector(".confirmVisibility").style.visibility = "visible";
        document.getElementById("confirmTime").innerHTML = "";
        document.getElementById("confirmTip").innerHTML = "操作失败，经纬度格式应为 <浮点数>,<浮点数>"
        canSubmit = false;
        setTimeout(()=>{
            document.querySelector(".confirmVisibility").style.visibility = "hidden";
            canSubmit = true;
        },2000);
        return;
    }





        httpEditExistBridge(onEditBridge,con_bridge.value,con_lltude.value.split(",")[0],con_lltude.value.split(",")[1],con_location.value,con_remark.value);
        // tempPtMap = new Array();



        document.querySelector(".confirmVisibility").style.visibility = "visible";
        document.getElementById("confirmTime").innerHTML = getCrrFormatTime();
        document.getElementById("confirmTip").innerHTML = "提交成功，提交时间：";

        canSubmit = false;
        setTimeout(()=>{
            canSubmit = true;
            document.querySelector(".confirmVisibility").style.visibility = "hidden";
        },2000);

        //优化显示
        onEditBridge = con_bridge.value;
        con_Title.innerHTML = "编辑桥梁对象 - "+ onEditBridge;

        httpGetBridgeMap();
        window.parent.PDhasSelect = false;

    }


    



    




    //httpSetFullBridge(con_bridge.value,con_lltude.value.split(",")[0],con_lltude.value.split(",")[1],con_location.value,con_remark.value);


}
function focus1(submitSort){
    if(SubmitMode!="add")
        return;
    if(focus[submitSort]==0){
        submitCon[submitSort].value = "";
        submitCon[submitSort].style.color = "white";
    }

    for(let i =0 ;i<6;i++){
        if(i==submitSort)
            continue;
        if(submitCon[i].value==""){
            if(i==1)
                submitCon[i].value = "浮点数,浮点数";
            else if(i==4)
                submitCon[i].value = "整数";
            else if(i==5)
                submitCon[i].value = "整数";
            else
            submitCon[i].value = "请输入";

            focus[i] = 0;
            submitCon[i].style.color = "gray";
        }
    }
    focus[submitSort] = 1;
}
function SubmitDelete(){
    if(onEditBridge==false)
        return;
    if(confirm('确定要删除桥梁对象'+onEditBridge+"吗？")){
        httpDeleteBridge(onEditBridge);
        alert("删除成功。")
        httpGetBridgeMap();
        document.querySelector('.area1_5').style.visibility="hidden";
        document.querySelector('.confirmDel').style.visibility="hidden";

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









function saveItem(BridgeMapSort){
    // alert(BridgeMapSort)
    for(let i =0;i<BridgeOnEdit.length;i++)
        BridgeOnEdit[i] = false;

    mapRefresh();
}
function tipsNumRefresh(){
    document.querySelector('.Tips').innerHTML = "(当前总计"+BridgeMap.length+"项数据)"
}
function addMap(BridgeMapSort){ 
    var tr = document.createElement('tr');
    tr.className="toClearFlag";
    var td = new Array();
    for(let tdid = 0;tdid<columnNum;tdid++){
         td[tdid] = document.createElement('td');
         td[tdid].style.width = TableColumnWith[tdid];

    }

    td[0].innerHTML = BridgeMap[BridgeMapSort].bridge;
    td[1].innerHTML = BridgeMap[BridgeMapSort].longitude + ","+BridgeMap[BridgeMapSort].latitude;
    td[2].innerHTML = BridgeMap[BridgeMapSort].place;
    td[3].innerHTML = BridgeMap[BridgeMapSort].pDataNum;
    td[4].innerHTML = BridgeMap[BridgeMapSort].ptNum;
    td[5].innerHTML = typeof(BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="温度传感器")])=="undefined"?"-":BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="温度传感器")].crrData;
    td[6].innerHTML = typeof(BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="湿度传感器")])=="undefined"?"-":BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="湿度传感器")].crrData;
    td[7].innerHTML = typeof(BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="伸缩缝传感器")])=="undefined"?"-":BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="伸缩缝传感器")].crrData;
    td[8].innerHTML = typeof(BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="应力传感器")])=="undefined"?"-":BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="应力传感器")].crrData;
    td[9].innerHTML = typeof(BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="索力传感器")])=="undefined"?"-":BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="索力传感器")].crrData;
    td[10].innerHTML = typeof(BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="沉降传感器")])=="undefined"?"-":BridgeMap[BridgeMapSort].pt[BridgeMap[BridgeMapSort].pt.findIndex(item=>item.type=="沉降传感器")].crrData;
    td[11].innerHTML = BridgeMap[BridgeMapSort].remark
    td[13].innerHTML = BridgeMap[BridgeMapSort].createTime;
    td[14].innerHTML = BridgeMap[BridgeMapSort].editTime;
    
    td[12].innerHTML = "细则"
    td[12].style.cursor = "pointer";
    td[12].style.color = "#1ba3fe";
    let id0 =  BridgeMap[BridgeMapSort].bridge;
    td[12].onclick = function(){toDetail(id0)};



    td[15].innerHTML = "编辑"
    td[15].style.cursor = "pointer";
    td[15].style.color = "#1ba3fe";
    let id =  BridgeMap[BridgeMapSort].bridge;
    td[15].onclick = function(){editItemOnclick(id)};


    td[0].style.cursor = "pointer";
    td[0].title = "复制";
    td[0].onclick = function(){copyLabel(this)}

    td[1].style.cursor = "pointer";
    td[1].title = "复制";
    td[1].onclick = function(){copyLabel(this)}


    for(let tdid = 0;tdid<columnNum;tdid++){
        tr.appendChild(td[tdid]);
    }
    document.querySelector('.ListTableBody').appendChild(tr);
    formBgdRefresh();
}

function addNewTr(){ 
    var tr = document.createElement('tr');
    tr.className="toClearFlag";
    var td = new Array();
    for(let tdid = 0;tdid<columnNum;tdid++){
         td[tdid] = document.createElement('td');
         td[tdid].style.width = TableColumnWith[tdid];

    }
    td[15].innerHTML = "新增.."
    td[15].style.cursor = "pointer";
    td[15].style.color = "wheat";
    td[15].onclick = function(){addItemOnclick()};
    for(let tdid = 0;tdid<columnNum;tdid++){
        tr.appendChild(td[tdid]);
    }
    document.querySelector('.ListTableBody').appendChild(tr);
    formBgdRefresh();
}


//我不写英语啦！
(function init(){


    for(i = 0;i<columnNum;i++){
        document.getElementById("th"+String(i)).style.width = TableColumnWith[i];
    }

    httpGetBridgeMap();
    submitCon[0] = document.getElementById("bridge");
    submitCon[1] = document.getElementById("lltude");
    submitCon[2] = document.getElementById("location");
    submitCon[3] = document.getElementById("type");
    submitCon[4] = document.getElementById("sort");
    submitCon[5] = document.getElementById("alertVal");

})();






window.addEventListener('resize',function(){
    // listReHeight();
    









    // test.innerHTML = document.querySelector('.finalContainer').offsetHeight+">";







})
let realTop = -(document.querySelector('.finalContainer').offsetHeight-425);
//O(∩_∩)O哈哈~
var divMove = document.querySelector(".area2DragDiv");
var divMovePassive = document.querySelector(".area2");
// var test =document.querySelector('.cnm');
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
        
        if(ev.clientY - distanceY<=realTop){
            divMove.style.top = realTop+"px";
            divMovePassive.style.top = realTop+"px";
        }else if(ev.clientY - distanceY>=0){

            divMove.style.top = "0";
            divMovePassive.style.top = "0";
        }
    
        if(ev.clientX - distanceX<=0){
            divMove.style.left = "0px";
            divMovePassive.style.left = "0px";
        }else if(ev.clientX - distanceX>=540){
            divMove.style.left = "540px";
            divMovePassive.style.left = "540px";
        }
        // test.innerHTML = "left="+divMovePassive.style.left+";top="+divMovePassive.style.top;


    
    };
    document.onmouseup = function(){
    document.onmousemove = null;
    document.onmouseup = null;
    };
};






