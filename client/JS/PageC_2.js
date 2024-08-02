let dataMap = new Array();
let brigeNameMap = new Array();
let serverIPPort = window.parent.serverIPPort;


let onShow = true;
let onShowBridge = window.parent.showBridge;
let showBridge;



function HttpGetList(){
    httpOK = false;
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+'/bridgeName')
    xhr.send();
    xhr.onreadystatechange = function(){
         
         if(xhr.readyState === 4){
              //判断响应状态 200 4004 403 401 500
              if(xhr.status >= 200 || xhr.status<300) {//2开头都是表示成功的 201 206
                    brigeNameMap = JSON.parse(xhr.response);
                //    brigeNameMap = jsonObj;
                //    getBridgeNameMap();
                   return true;
              }
          }
    };
}
// function getBridgeNameMap(){
//     for(let i = 0; i<dataMap.length; i++){
//         if(brigeNameMap.findIndex(item=>item == dataMap[i].bridge)==-1){
//             brigeNameMap.push(dataMap[i].bridge);
//         }
//     }
// }
function TrySelectOnclick(){
    document.querySelector('.A1R1ListBody').style.visibility = "visible";

    let maxName = 0;
    let mapLength = brigeNameMap.length;
    for(let i = 0;i<mapLength;i++){
        if(brigeNameMap[i].length>maxName){
            maxName = brigeNameMap[i].length;
        }
    }

    // alert(max)
    document.querySelector('.A1R1ListBody').style.width = maxName*12 + "px"
    document.querySelector('.A1R1ListBody').style.height = mapLength<=6?mapLength*32 + 5+ "px":6*32 + 5+ "px"



}
function ListSelected(bridgeName){
    showBridge = bridgeName;
    document.querySelector('.A1R1ListBody').style.visibility = "hidden";
    document.getElementById("bridgeId").innerHTML = bridgeName;
    document.querySelector('.evaluateArea').innerHTML ="由于近年桥梁建设速度快，养护工作处于初级或起步阶段，总体来讲桥涵养护管理技术水平低手段落后，机械化程度低，且管理养护桥梁数量大，延米数多，各地养护技术水平不一致，质量意识有高低之分，信息交流少，通过信息交流对养护技术水平及养护质量意识的培养至关重要桥面坑槽破损修补后再次破损，这种反复修补的现象，原因在于修补使用的材料性能及质量离散差异性大，导致构件截面减弱，在车辆反复碾压及冲击作用下存有安全隐患，维修养护人员技术水平及质量意识有待提高，可通过交流应用及推广先进的养护技术和改善养护生产手段提高养护质量水平提高一线养护人员质量意识检查过程中发现个别路面清洁维护人员将桥面垃圾直接倾倒入桥面泄水管，导致泄水管堵塞，桥面排水不畅，桥面及泄水管积水，最终腐蚀弱化桥梁构件，减少或降低桥梁使用寿命对交通繁忙路线重要大桥特大桥及特殊结构桥梁按排特殊检测计划特殊检测相比定期外观检测更能反映桥梁的真实情况，外观检测仅针对外观病害判断桥梁状况，特殊检测能从多个方面综合反映桥梁的真实状况特殊检测包括桥梁结构材料的缺损状况，物理化学性能的退化程度及原因测试鉴定，结构或构件开裂状态的检测评定梁结构的承载能力，包括强度稳定性和刚度的检算试验和鉴定"
    // document.querySelector('.evaluateArea').innerHTML =" randomString(512)"



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
//简易版choseDivInit()
function ListBodyInit(){

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
    for(let i = 0;i<brigeNameMap.length;i++){
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(brigeNameMap[i]));
        item.value = brigeNameMap[i];
        item.onclick = function(){ListSelected(brigeNameMap[i]);};
        item.className="toClearFlag";
        control.appendChild(item);
    }

    // control.querySelector('.chose').onclick = function(){listShow(sort);};
    // control.querySelector('.chose').onblur = function(){listDisapear(sort);};
    
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

//specifies that initialization starts here//
(function init(){
    document.querySelector('.evaluateArea').innerHTML = randomString(512)
    document.querySelector('.evaluateArea').innerHTML ="1由于近年桥梁建设速度快，养护工作处于初级或起步阶段，总体来讲桥涵养护管理技术水平低手段落后，机械化程度低，且管理养护桥梁数量大，延米数多，各地养护技术水平不一致，质量意识有高低之分，信息交流少，通过信息交流对养护技术水平及养护质量意识的培养至关重要桥面坑槽破损修补后再次破损，这种反复修补的现象，原因在于修补使用的材料性能及质量离散差异性大，导致构件截面减弱，在车辆反复碾压及冲击作用下存有安全隐患，维修养护人员技术水平及质量意识有待提高，可通过交流应用及推广先进的养护技术和改善养护生产手段提高养护质量水平提高一线养护人员质量意识检查过程中发现个别路面清洁维护人员将桥面垃圾直接倾倒入桥面泄水管，导致泄水管堵塞，桥面排水不畅，桥面及泄水管积水，最终腐蚀弱化桥梁构件，减少或降低桥梁使用寿命对交通繁忙路线重要大桥特大桥及特殊结构桥梁按排特殊检测计划特殊检测相比定期外观检测更能反映桥梁的真实情况，外观检测仅针对外观病害判断桥梁状况，特殊检测能从多个方面综合反映桥梁的真实状况特殊检测包括桥梁结构材料的缺损状况，物理化学性能的退化程度及原因测试鉴定，结构或构件开裂状态的检测评定梁结构的承载能力，包括强度稳定性和刚度的检算试验和鉴定"

    if(window.parent.selectBridgeID!="请先在地图中选中桥梁")
    {
        document.getElementById("bridgeId").innerHTML = window.parent.selectBridgeID;
    }
    HttpGetList();
    setTimeout(() => {
        //确实不知道在哪里调用webGL加载完成的回调函数。
        document.querySelector('.onloadTip').style.visibility = "hidden"
    }, 300);
    setTimeout(()=>{
        ListBodyInit();
        document.getElementById("bridgeId").innerHTML = brigeNameMap[0];

    },100);

})();
function ChartQuery(){ 
    window.open('http://47.108.197.27:8081/download');
}