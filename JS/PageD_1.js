let personMap = new Array(); //specific dataMap
let TableColumnWith = new Array("15%","15%","15%","15%","25%","15%");
let columnNum = 6;
let serverIPPort = window.parent.serverIPPort;
let chose1 = document.getElementById("chose1");
let adminlist = new Array("管理员","仅可读","仅可写","普通","无")
let focus = new Array(0,0,0,0,0);
let submitCon = new Array();


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
function focus1(submitSort){
    if(focus[submitSort-1]==0){
        submitCon[submitSort-1].value = "";
        submitCon[submitSort-1].style.color = "white";
    }

    for(let i =0 ;i<5;i++){
        if(i==submitSort-1)
            continue;
        if(submitCon[i].value==""){
            if(i==4)
                submitCon[i].value = "请输入少于12个字";
            else
            submitCon[i].value = "请输入";

            focus[i] = 0;
            submitCon[i].style.color = "gray";
        }
    }
    focus[submitSort-1] = 1;
}
function fill(){
    let maxJobNum = 0;
    let mapLength = personMap.length;
    for(let i = 0;i<mapLength;i++){
        if(personMap[i].jobNum>maxJobNum){
            maxJobNum = personMap[i].jobNum;
        }
    }
    submitCon[1].value = parseInt(maxJobNum) + 1;
    focus[1] = 1;
    submitCon[1].style.color = "white";

}
function getCrrFormatTimeStr(){
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

function post(){
    
    let existObj = personMap.find(item=>item.jobNum==submitCon[1].value);
    if(typeof(existObj)!="undefined"){
        alert("该工号 "+submitCon[1].value+"（"+existObj.name+"）已经存在。");
        return ;
    }







    for(let i = 0 ;i<5;i++){

        if(i==3)
            continue;
        if(submitCon[i].value==""||submitCon[i].value=="请输入"||submitCon[i].value=="请输入少于12个字"){
            document.querySelector('.Area2Row5').style.visibility="visible";
            document.getElementById("confirmTip").innerHTML = "这信息它不完整。";
            document.getElementById("confirmTime").innerHTML = "";
            setTimeout(() => {
                document.querySelector('.Area2Row5').style.visibility="hidden";
        
            }, 2000);
            return;
        }
    }
















    httpPostBody("/setPerson","name="+submitCon[0].value+"&jobNum="+submitCon[1].value+"&positon="+submitCon[2].value+"&admin="+
    submitCon[3].innerHTML+"&remark="+submitCon[4].value);
    
    document.querySelector('.Area2Row5').style.visibility="visible";
    document.getElementById("confirmTip").innerHTML = "提交成功，";
    document.getElementById("confirmTime").innerHTML = getCrrFormatTimeStr();
    setTimeout(() => {
        document.querySelector('.Area2Row5').style.visibility="hidden";

    }, 2000);

    httpGetList();


}
function listShow(){
   chose1.querySelector('.choseList').style.visibility="visible";
}
function listDisapear(){
     setTimeout(lDisapear, 120);
}
function lDisapear(){
    chose1.querySelector('.choseList').style.visibility="hidden";
};
function listChoseSel(i){
    document.querySelector('.chosed').innerHTML = adminlist[i];
}
function choseDivInit(){
    chose1.querySelector('.chosed').innerHTML = adminlist[0];
    chose1.querySelector('.choseList').style.height = "190px";
    for(let i = 0;i<adminlist.length;i++){
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(adminlist[i]));
        item.value = adminlist[i];
        item.onclick = function(){listChoseSel(i);};
        item.className="toClearFlag";
        chose1.querySelector('ul').appendChild(item);
    }

    chose1.querySelector('.chose').onclick = function(){listShow();};
    chose1.querySelector('.chose').onblur = function(){listDisapear();};
    
}
//我直接嫖了C1的mapRefresh
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
              for(let i = 0;i<personMap.length;i++){
                   addMap(i);
              }
        break;
         
    }
    tipsNumRefresh();
}
function tipsNumRefresh(){
    document.querySelector('.Tips').innerHTML = "(当前总计"+personMap.length+"项数据)"
}
function httpGetList() {
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+"/personList")
    xhr.send();
    xhr.onreadystatechange = function(){
          
        if(xhr.readyState === 4){
             //判断响应状态 200 4004 403 401 500
             if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                  let jsonObj = JSON.parse(xhr.response);
                  personMap = jsonObj;
                  mapRefresh();
             }
         }
   }
};
function httpSetting(subUrl,queryStr) {
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+subUrl+"?"+queryStr)
    xhr.send();
};
function rebort(){
    httpSetting("/settings","setting=personlist");
    httpGetList();
}
function httpDelPerson(jobNum,i){
        const xhr = new XMLHttpRequest();
        xhr.open('post',serverIPPort+"/delPerson");
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
        xhr.send("jobNum="+jobNum);
        
        xhr.onreadystatechange = function(){
          
            if(xhr.readyState === 4){
                 //判断响应状态 200 4004 403 401 500
                 if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                    if(xhr.response == "deleteOK"){
                    }else{
                        alert("server error")
                    }
                 }
             }
       }
        
}
function httpPostBody(subUrl,body) {
    const xhr = new XMLHttpRequest();
    xhr.open('post',serverIPPort+subUrl)
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型

    xhr.send(body);
};
function mapDelete(jobNum){
    for(let i = 0;i<personMap.length;i++)
        if(personMap[i].jobNum == jobNum){
            httpDelPerson(jobNum,i);
            personMap.splice(i,1);

            break;
    }
    mapRefresh();     
    
}
function addMap(personMapSort){
     
     
    var tr = document.createElement('tr');
    tr.className="toClearFlag";

    var td = new Array();
    for(let tdid = 0;tdid<columnNum;tdid++){
         td[tdid] = document.createElement('td');
         td[tdid].style.width = TableColumnWith[tdid];
    }


 

   //究极注意：此处如果使用tb1.onclick = function(){dataMap[dataMapSort].id};就意味着结构不能变动，而此处显然处理过!
   



    td[0].innerHTML = personMap[personMapSort].name;
    td[1].innerHTML = personMap[personMapSort].jobNum;
    td[1].onclick = function(){copyLabel(this)}
    td[1].style.cursor = "pointer";
    td[1].title = "复制";
    td[2].innerHTML = personMap[personMapSort].positon;
    td[3].innerHTML = personMap[personMapSort].admin;
    td[4].innerHTML = personMap[personMapSort].remark;
    td[5].style.cursor = "pointer";
    td[5].style.color = "tomato";
    td[5].innerHTML = "删除"

    let id1 = personMap[personMapSort].jobNum;
    td[5].onclick = function(){mapDelete(id1)};


    for(let tdid = 0;tdid<columnNum;tdid++){
        tr.appendChild(td[tdid]);
    }
    document.querySelector('.ListTableBody').appendChild(tr);
    formBgdRefresh();
}
function formBgdRefresh(){
    let trs = document.querySelector(".ListTableBody").getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
         if (i % 2 == 0) { trs[i].style.backgroundColor = "#292e33"; }
         else { trs[i].style.backgroundColor = "#1f2327"; }
    }
}
function listReHeight(){
    document.querySelector('.helpHide').style.height = String(window.innerHeight - 133)+"px";

}
//specifies that initialization starts here//
(function init(){
    submitCon[0] = document.getElementById("submit1");
    submitCon[1] = document.getElementById("submit2");
    submitCon[2] = document.getElementById("submit3");
    submitCon[3] = document.getElementById("submit4");
    submitCon[4] = document.getElementById("submit5");

    listReHeight();
    choseDivInit();
    for(i = 0;i<columnNum;i++){
        document.getElementById("th"+String(i)).style.width = TableColumnWith[i];;
    }
    httpGetList();
    window.addEventListener('resize',function(){
        listReHeight();
   })

})();