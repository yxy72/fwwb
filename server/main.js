const express = require('express');
// const { request, response, json } = require('express');
const app = express();
var bodyParser = require('body-parser');//用于req.body获取值的
app.use(bodyParser());
//nodemon 

var mainShowBridgeName = "Cyberpunk3608";


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

//操作记录
function DATA1(id,bridge,item,value,source,remark,time,place,level,marked,scanner="",doner="",scantime="",assess="无",harmInfo=new Array("--","--","--"),zkjg="",qc="",zdkj="",gydw="",qh="",xcrq="",dj="",jy="",ArrayMap=new Array(),imgMap=new Array("","","","","","","","","","","","","","","","","")){
    this.level = level;
    this.bridge = bridge;
    this.item = item;
    this.value = value;
    this.source = source;
    this.remark = remark;
    this.time = time;
    this.place = place;
    this.id = id;
    this.marked = marked;
    this.scanner = scanner;
    this.doner = doner;
    this.scantime = scantime;
    this.assess = assess;
    this.harmInfo = harmInfo;
    //zkjg,qc,zdkj,gydw,qh,xcrq,dj,ArrayMap
    this.zkjg = zkjg;
    this.qc = qc;
    this.zdkj = zdkj;
    this.gydw = gydw;
    this.qh = qh;
    this.xcrq = xcrq;
    this.dj = dj;
    this.jy = jy;
    this.ArrayMap = ArrayMap;
    this.imgMap = imgMap;
}
//全体传感器情况
function DATA2(id,bridge,type,sort,crrData,runtime,status){
    this.type = type;
    this.sort = sort;
    this.crrData = crrData;
    this.runtime = runtime;
    this.status = status;
    this.id = id;
    this.bridge = bridge;
}
//子传感器组
function PT(type,sort,crrData,runtime,status,alertVal){
    this.type = type;
    this.sort = sort;
    this.crrData = crrData;
    this.runtime = runtime;
    this.status = status;
    this.alertVal = alertVal;
}
//人员情况
function DATAPerson(name,jobNum,positon,admin,remark){
    this.name = name;
    this.jobNum = jobNum;
    this.positon = positon;
    this.admin = admin;
    this.remark = remark;
}
function MainBridge(bridge,longitude,latitude,place,createTime,editTime,pt = new Array(),remark="无"){
    this.bridge = bridge;
    this.longitude = longitude;
    this.latitude = latitude;
    this.place = place;
    this.createTime = createTime;
    this.editTime = editTime;
    this.pt = pt;
    this.ptNum = pt.length;
    this.pDataNum = 0;
    this.remark = remark;
}

function PushPTbyID(bridge,type,sort,crrData,runtime,status,alertVal = "未设置"){
    let bridgeObject = BridgeMap.find(item=>item.bridge==bridge);
    if(typeof(bridgeObject)!="undefined"){
        bridgeObject.pt.push(new PT(type,sort,crrData,runtime,status,alertVal));
        bridgeObject.ptNum++;

        let d = randomZ(0,60);
        let h = randomZ(0,23);
        let m = randomZ(0,59);
        let s = randomZ(0,59);
        bridgeObject.pt[bridgeObject.ptNum-1].runtime = 0; 


        return;
    }
}
function PopPTbyIDSort(bridge,sort){
    let bridgeObject = BridgeMap.find(item=>item.bridge==bridge);
    if(typeof(bridgeObject)!="undefined"){
        let ptSort = bridgeObject.pt.findIndex(item=>item.sort==sort);
        if(ptSort!=-1){
            bridgeObject.pt.splice(ptSort,1);
            bridgeObject.ptNum--;


        }
            return;
    }
}


var dataMap = new Array();
// var PTMap = new Array();
var PersonMap = new Array();
var BridgeMap = new Array();
// var yxyMarkerGroup = new Array();

function alertValInitById(bridge){
    PushPTbyID(bridge,"沉降传感器","14405",randomF(18,37).toFixed(2),"null","运行中");
    PushPTbyID(bridge,"湿度传感器","14401",randomF(80,90).toFixed(2),"null","运行中");
    PushPTbyID(bridge,"伸缩缝传感器","14402",randomZ(1800,2400),"null","运行中",randomZ(1900,2100));
    PushPTbyID(bridge,"应力传感器","14403",randomZ(1200,4800),"null","运行中",randomZ(5100,5140));
    PushPTbyID(bridge,"索力传感器","14404",randomZ(3600,9600),"null","运行中",randomZ(2300,2366));
    PushPTbyID(bridge,"沉降传感器","14405",randomZ(100,300),"null","运行中",randomZ(190,194));
}

//测试值
function BridgeMapInit(){
    BridgeMap.splice(0,BridgeMap.length);

    BridgeMap.push(new MainBridge(mainShowBridgeName,103.992864,30.768913,"四川省成都市西南交通大学","2020/2/1 00:10:00","2020/2/2 00:30:00"));
    BridgeMap.push(new MainBridge("BR20210224",103.991593,30.763494,"四川省成都市郫都区","2020/2/1 00:10:00","2020/2/2 00:30:00"));
    BridgeMap.push(new MainBridge("BT20280435",103.988658,30.773476,"四川省成都市郫都区","2020/1/1 00:20:00","2020/1/1 00:40:00"));
    BridgeMap.push(new MainBridge("BT20280440",104.196768,30.817479,"四川省成都市新都区","2021/1/1 00:10:00","2021/1/2 00:20:00"));
    BridgeMap.push(new MainBridge("BT20270325",104.083812,30.696881,"四川省成都市金牛区","2021/2/1 00:20:00","2021/2/2 00:10:00"));
    
    // PushPTbyID(mainShowBridgeName,"应力预测传感器","10000","--","null","运行中","--");

    for(let i = 0;i<BridgeMap.length;i++){
        alertValInitById(BridgeMap[i].bridge)
    }
    for(let i = 0;i<BridgeMap.length;i++){
        for(let j = 0;j<BridgeMap[i].pt.length;j++){
            let d = randomZ(0,60);
            let h = randomZ(0,23);
            let m = randomZ(0,59);
            let s = randomZ(0,59);
            BridgeMap[i].pt[j].runtime = s+m*60+h*3600+d*3600*24; 
        }
        
    }

    for(let i = 0;i<BridgeMap.length;i++){
       BridgeMap[i].pDataNum = randomZ(0,20);
    }

}
function personListInit(){
    PersonMap.splice(0,PersonMap.length);

    PersonMap.push(new DATAPerson("叶子强","650300","巡检员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("严雅岚","650301","设计员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("姚东海","650302","巡检员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("张景桃","650303","巡检员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("陆仁贾","650304","巡检员","仅可读","新入职。"));
    PersonMap.push(new DATAPerson("陈大光","650305","设计员","仅可读","新入职。"));
    PersonMap.push(new DATAPerson("陈飞","650306","设计师","仅可读","入职一年。"));
    PersonMap.push(new DATAPerson("阿尔法","650307","门卫","可写入","入职一年。"));
    PersonMap.push(new DATAPerson("凯瑟琳","650308","部门经理","仅可读","入职一年。"));
    PersonMap.push(new DATAPerson("刘映辉","650309","司机","管理员","新入职。"));
    PersonMap.push(new DATAPerson("张三","650310","厨师","无","新入职。"));
    PersonMap.push(new DATAPerson("叶子强","650311","巡检员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("严雅岚","650312","巡检员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("姚东海","650313","设计员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("张景桃","650314","巡检员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("陆仁贾","650315","巡检员","仅可读","新入职。"));
    PersonMap.push(new DATAPerson("离散","650316","指挥","仅可读","新入职。"));
    PersonMap.push(new DATAPerson("陈龙","650317","调度员","仅可读","入职一年。"));
    PersonMap.push(new DATAPerson("李四","650318","巡检员","可写入","入职一年。"));
    PersonMap.push(new DATAPerson("凯特琳","650319","调度员","仅可读","入职一年。"));
    PersonMap.push(new DATAPerson("刘叔","650320","调度员","管理员","新入职。"));
    PersonMap.push(new DATAPerson("凯南","650321","巡检员","无","新入职。"));
    PersonMap.push(new DATAPerson("大菠萝3","650322","食物","无","新入职。"));

}
function dataListInit(){

    dataMap.splice(0,dataMap.length);
    dataMap.push(new DATA1(1,mainShowBridgeName,"各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省成都市郫都区",1,0))
    dataMap.push(new DATA1(2,mainShowBridgeName,"温度","36.6","PC12138","传感器已损坏，待检修","2021/02/24 23:48:21","四川省成都市郫都区",2,0))
    dataMap.push(new DATA1(3,"BT20270325","各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 23:48:21","四川省成都市青羊区",1,0))
    dataMap.push(new DATA1(4,mainShowBridgeName,"各类测值","[dataGroup]","fwwb123","上传图片数据",getCrrFormatTime(),"四川省成都市金牛区",2,0,))
    dataMap.push(new DATA1(5,mainShowBridgeName,"各类测值","[dataGroup]","fwwb123","上传图片数据","2021/02/24 21:48:21","四川省成都市郫都区",2,0))
    dataMap.push(new DATA1(6,mainShowBridgeName,"各类测值","[dataGroup]","fwwb123","上传图片数据","2021/02/24 23:48:21","四川省成都市郫都区",2,0))
    dataMap.push(new DATA1(7,"BT20280440","各类测值","--","PC123","桥炸了","2021/01/24 19:48:21","四川省绵阳市游仙区",6,0))
    dataMap.push(new DATA1(8,"BR20210224","各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省成都市青羊区",1,0))
    dataMap.push(new DATA1(9,"BR20210224","湿度","80.9","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省绵阳市涪城区",2,0))
    dataMap.push(new DATA1(10,"BR20210224","各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省成都市双流区",1,0))
    dataMap.push(new DATA1(11,"BR20210224","各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省成都市双流区",1,0))
    dataMap.push(new DATA1(12,"BR20210224","各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省成都市金牛区",1,0))
    dataMap.push(new DATA1(13,"BR20210224","各类测值","[dataGroup]","传感器","传感器自动上传值",getCrrFormatTime(),"四川省绵阳市三台县",1,0))
    dataMap.push(new DATA1(14,"BR20210224","各类测值","[dataGroup]","传感器","传感器自动上传值","2021/02/24 22:48:21","四川省成都市锦江区",1,0))
    dataMap.push(new DATA1(15,mainShowBridgeName,"各类测值","--","PC123","桥塌了","2021/02/24 12:48:21","四川省成都市郫都区",6,0))
    
}

(function cnm(){
    
    // PTMap.push(new DATA2(1,"BT20280435","温度传感器","PT12138","38.59","23:23:58:21","运行中"));
    // PTMap.push(new DATA2(2,"BT20280435","湿度传感器","PT12139","88.59","23:22:23:23","运行中"));
    // PTMap.push(new DATA2(3,"BT20280435","某种传感器","PT12140","doublekill","23:21:23:23","已停止"));

    // PTMap.push(new DATA2(4,"BR20210224","温度传感器","PT12137","38.45","5:20:15:19","运行中"));
    // PTMap.push(new DATA2(5,"BR20210224","温度传感器","PT12142","38.45","23:20:23:23","运行中"));
    // PTMap.push(new DATA2(6,"BR20210224","温度传感器","PT12141","38.45","23:20:19:23","运行中"));

    // PTMap.push(new DATA2(7,"BT20280435","沙雕传感器","PT12143","none","16:21:51:40","运行中"));
    // PTMap.push(new DATA2(8,"BT20280435","量子传感器","PT12144","none","23:21:35:35","运行中"));
    // PTMap.push(new DATA2(9,"BT20280435","核爆传感器","PT12145","none","18:21:14:57","运行中"));
    // PTMap.push(new DATA2(10,"BT20280435","什么传感器","PT12146","none","23:21:23:23","已停止"));
    // PTMap.push(new DATA2(11,"BT20280435","？传感器","PT12147","none","23:16:12:18","运行中"));
    // PTMap.push(new DATA2(12,"BT20280435","？？传感器","PT12148","none","21:21:19:18","已停止"));
    
    BridgeMapInit();

    PushPTbyID("BT20280435","温度传感器","12138","38.59","23:23:58:21","运行中");
    PushPTbyID("BT20280435","湿度传感器","12139","88.59","23:22:23:23","运行中");
    PushPTbyID("BT20280435","某种传感器","12140","doublekill","23:21:23:23","已停止");
    PushPTbyID("BT20280435","某种传感器","12143","none","16:21:51:40","运行中");
    PushPTbyID("BT20280435","量子传感器","12144","none","23:21:35:35","运行中");
    PushPTbyID("BT20280435","核爆传感器","12145","none","18:21:14:57","运行中");
    PushPTbyID("BT20280435","某种传感器","12146","none","23:21:23:23","已停止");
    PushPTbyID("BT20280435","某种传感器","12147","none","23:16:12:18","运行中");
    PushPTbyID("BT20280435","某种传感器","12148","none","21:21:19:18","已停止");
    PushPTbyID("BR20210224","温度传感器","12141","38.45","5:20:15:19","运行中");
    PushPTbyID("BR20210224","温度传感器","12142","38.45","23:20:23:23","运行中");
    PushPTbyID("BR20210224","温度传感器","12137","38.45","23:20:19:23","运行中");


    
    dataListInit();






   personListInit();

    
    


    

    setInterval(() => {
        for(let i = 0;i<BridgeMap.length;i++){
            for(let j = 0;j<BridgeMap[i].pt.length;j++){
                BridgeMap[i].pt[j].runtime++; 
            }
            
        }
    }, 1000);


})();
function randomZ(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function randomF(min, max) {
    return Math.random() * (max - min) + min;
}
jsonStr = JSON.stringify(dataMap);




//路由规则
//注意：只能访问到url为/server的地方
app.get('/server',(request,response)=>{

    //响应头
    response.setHeader('Access-Control-Allow-Origin','*');//允许跨域，使得前端处理轻松
    //设置响应体
    response.send(jsonStr)
});

//all类型接收任何类型请求
app.post('/server',(request,response)=>{

    //响应头
    response.setHeader('Access-Control-Allow-Origin','*');//允许跨域，使得前端处理轻松
    //设置响应体
    response.send('helloWorld')
    // //自定义响应头哦
    // response.setHeader('Access-Control-Allow-Headers','*')
    
});
app.get('/jason-server',(request,response)=>{

    //响应头
    response.setHeader('Access-Control-Allow-Origin','*');//允许跨域，使得前端处理轻松
    //设置响应体
    response.send(jsonStr);

    // //自定义响应头哦
    response.setHeader('Access-Control-Allow-Headers','*')
    
});
//监听端口
app.listen(8000,()=>{
    console.log("已启动，端口8000")
})


app.get('/list',(request,response)=>{

    response.setHeader('Access-Control-Allow-Origin','*');
    jsonStr = JSON.stringify(dataMap);
    response.send(jsonStr);
});

app.get('/setMark',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    for(let i = 0;i<dataMap.length;i++)
        if(dataMap[i].id == request.query.id){
            dataMap[i].marked = parseInt(request.query.marked);
        }
    response.send("over");
});
app.get('/setDelete',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    for(let i = 0;i<dataMap.length;i++)
        if(dataMap[i].id == request.query.id){
            dataMap.splice(i,1);
        }
    response.send("over");
});




app.post('/addList',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    // request.body.name;


    let level = request.body.level;
    let bridge = request.body.bridge;
    let item = request.body.item;
    let value = request.body.value;
    let source = request.body.source;
    let remark = request.body.remark;
    let time = request.body.time;
    let place = request.body.place;
    let scanner = request.body.scanner;
    let doner = request.body.doner;
    let scantime = request.body.scantime;
    // let assess = request.body.assess;
    // let harmInfo = JSON.parse(request.body.harmInfo);

    let zkjg =request.body.zkjg;
    let qc =request.body.qc;
    let zdkj =request.body.zdkj;
    let gydw =request.body.gydw;
    let qh =request.body.qh;
    let xcrq =request.body.xcrq;
    let dj =request.body.dj;
    let jy =request.body.jy;
    let ArrayMap =request.body.ArrayMap;
    let imgMap = request.body.imgMap;


        for(let j = 1;j<100;j++){
            let has = false;
            for(let i=0;i<dataMap.length;i++){
                if(j==dataMap[i].id){
                    has = true;
                    break;
                }
            }
            if(!has){
                dataMap.push(new DATA1(j,bridge,item,value,source,remark,time,place,level,0,scanner,doner,scantime,jy,new Array("--","--","--"),zkjg,qc,zdkj,gydw,qh,xcrq,dj,jy,JSON.parse(ArrayMap),JSON.parse(imgMap)));
                break;
            }
        }
        console.warn(request.body)

    response.send("over");
});
// let SSAlert = 2000;
// let CJAlert = 192;
// let YLAlert = 5120;
// let SLAlert = 2333;
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
var init = getCrrFormatTimeStr();
app.get('/time',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(init);
});

app.get('/settings',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let setting = request.query.setting;
    let setAlertOrder = request.query.setAlertOrder;
    let val = request.query.val;
    let order = request.query.order;

    
    if(setting=="list"){

        dataListInit();
        response.send("over");
        return;
    }
    if(setting=="personlist"){

        PersonMap.splice(0,PersonMap.length);
        PersonMap.push(new DATAPerson("叶子强","650300","你队队长","管理员","新入职。"));
        PersonMap.push(new DATAPerson("严雅岚","650301","你队成员","管理员","新入职。"));
        PersonMap.push(new DATAPerson("姚东海","650302","你队成员","管理员","新入职。"));
        PersonMap.push(new DATAPerson("张景桃","650303","你队成员","管理员","新入职。"));
        PersonMap.push(new DATAPerson("陆仁贾","650304","就硬搬","仅可读","新入职。"));
        PersonMap.push(new DATAPerson("达沙比","650305","黄金旷工","仅可读","新入职。"));
        PersonMap.push(new DATAPerson("陈龙","650306","保安","仅可读","入职一年。"));
        PersonMap.push(new DATAPerson("Siri","650307","门卫","可写入","入职一年。"));
        PersonMap.push(new DATAPerson("凯瑟琳","650308","厨子","仅可读","入职一年。"));
        PersonMap.push(new DATAPerson("刘映辉","650309","司机","管理员","新入职。"));
        PersonMap.push(new DATAPerson("Kabane Kusaka","650310","打手","无","新入职。"));
        PersonMap.push(new DATAPerson("叶子强","650311","你队队长","管理员","新入职。"));
        PersonMap.push(new DATAPerson("严雅岚","650312","你队成员","管理员","新入职。"));
        PersonMap.push(new DATAPerson("姚东海","650313","你队成员","管理员","新入职。"));
        PersonMap.push(new DATAPerson("张景桃","650314","你队成员","管理员","新入职。"));
        PersonMap.push(new DATAPerson("陆仁贾","650315","就硬搬","仅可读","新入职。"));
        PersonMap.push(new DATAPerson("达沙比","650316","黄金旷工","仅可读","新入职。"));
        PersonMap.push(new DATAPerson("陈龙","650317","保安","仅可读","入职一年。"));
        PersonMap.push(new DATAPerson("Siri","650318","门卫","可写入","入职一年。"));
        PersonMap.push(new DATAPerson("凯瑟琳","650319","厨子","仅可读","入职一年。"));
        PersonMap.push(new DATAPerson("刘映辉","650320","司机","管理员","新入职。"));
        PersonMap.push(new DATAPerson("Kabane Kusaka","650321","打手","无","新入职。"));
        PersonMap.push(new DATAPerson("大菠萝3","650322","食物","无","新入职。"));response.send("over");
        return;
    }
    if(setting=="Bridgelist"){
        BridgeMapInit();
        response.send("ResetBridgeOver");
    }
    if(setAlertOrder=="setSLAlert"){
        SLAlert = val;
        response.send("over");
    }else if(setAlertOrder=="setYLAlert"){
        YLAlert = val;
        response.send("over");
    }else if(setAlertOrder=="setSSAlert"){
        SSAlert = val;
        response.send("over");
    }else if(setAlertOrder=="setCJAlert"){
        CJAlert = val;
        response.send("over");
    }
    // if(order=="getAlert"){
    //     var alertGroup =  new Object();
    //     alertGroup.SSAlert = SSAlert;
    //     alertGroup.CJAlert = CJAlert;
    //     alertGroup.YLAlert = YLAlert;
    //     alertGroup.SLAlert = SLAlert;

    //     var alertJsonObj = JSON.stringify(alertGroup);

    //     response.send(alertJsonObj);
    // }

});













//地图类
function yxyMarker(id,longitude,latitude,place){
    this.longitude = longitude;
    this.latitude = latitude;
    this.id = id;
    this.place = place;
}



app.get('/getBridge',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let yxyMarkerGroup = new Array();
    for(let i = 0;i<BridgeMap.length;i++){
        yxyMarkerGroup.push(new yxyMarker(BridgeMap[i].bridge,BridgeMap[i].longitude,BridgeMap[i].latitude,BridgeMap[i].place))
    }
    response.send(JSON.stringify(yxyMarkerGroup));
});
app.post('/setBridge',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let id = request.body.id;
    let longitude = request.body.longitude;
    let latitude = request.body.latitude;
    let place = request.body.place;
    BridgeMap.push(new MainBridge(id,longitude,latitude,place,getCrrFormatTime(),getCrrFormatTime()))
    alertValInitById(id)
    response.send("setOK");

});
app.post('/delBridge',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let id = request.body.id;
    let index = BridgeMap.findIndex(item=>item.bridge == id);
    if(index==-1)
        response.send("deleteError");
    else{
        response.send("deleteOK");
        BridgeMap.splice(index,1);
}

});

app.get('/seek',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let obj = BridgeMap.find(item=>item.bridge == request.query.PTsID);
    if(typeof(obj.pt)=="undefined"){
        response.send("123");
    }else
        response.send(JSON.stringify(obj.pt));
    // let ptGroup = new Array();
    // for(let i = 0;i<PTMap.length;i++){
    //     if(PTMap[i].bridge == request.query.PTsID){
    //         ptGroup.push(PTMap[i]);
    //     }
    // }
    // response.send(JSON.stringify(ptGroup));
    // response.setHeader('Access-Control-Allow-Origin','*');
    // jsonStr = JSON.stringify(dataMap);
    // response.send(jsonStr);
    
    // let ptGroup = new Array();
    // for(let i = 0;i<PTMap.length;i++){
    //     if(PTMap[i].bridge == request.query.PTsID){
    //         ptGroup.push(PTMap[i]);
    //     }
    // }
    // response.send(JSON.stringify(ptGroup));


});
app.get('/personList',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(JSON.stringify(PersonMap));
});
app.post('/setPerson',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let name = request.body.name;
    let jobNum = request.body.jobNum;
    let positon = request.body.positon;
    let admin = request.body.admin;
    let remark = request.body.remark;
    PersonMap.push(new DATAPerson(name,jobNum,positon,admin,remark));


    response.send("setOK");

});
app.post('/delPerson',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let jobNum = request.body.jobNum;
    let index = PersonMap.findIndex(item=>item.jobNum == jobNum);
    PersonMap.splice(index,1);
    response.send("deleteOK");

});
app.get('/bridgeName',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let bridgeName = new Array();
    for(let i = 0;i<BridgeMap.length;i++){
        bridgeName.push(BridgeMap[i].bridge);
    }
    response.send(JSON.stringify(bridgeName));
});

app.get('/alertVal',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let obj = BridgeMap.find(item=>item.bridge == request.query.bridge);
    if(typeof(obj)=="undefined")
        return;

    if(obj.pt.findIndex(item=>item.type == "伸缩缝传感器")==-1||obj.pt.findIndex(item=>item.type == "沉降传感器")==-1||obj.pt.findIndex(item=>item.type == "应力传感器")==-1||obj.pt.findIndex(item=>item.type == "索力传感器")==-1){
        response.send("none");
        return;
    }





    let SSAlert = obj.pt.find(item=>item.type == "伸缩缝传感器").alertVal;
    let CJAlert = obj.pt.find(item=>item.type == "沉降传感器").alertVal;
    let YLAlert = obj.pt.find(item=>item.type == "应力传感器").alertVal;
    let SLAlert = obj.pt.find(item=>item.type == "索力传感器").alertVal;
    let bridge = obj.bridge;

        var alertGroup =  new Object();
        alertGroup.SSAlert = SSAlert;
        alertGroup.CJAlert = CJAlert;
        alertGroup.YLAlert = YLAlert;
        alertGroup.SLAlert = SLAlert;
        alertGroup.bridge = bridge;
        var alertJsonObj = JSON.stringify(alertGroup);

        response.send(alertJsonObj);


    //     PushPTbyID(bridge,"温度传感器","14400",randomF(18,37).toFixed(2),"null","运行中");
    // PushPTbyID(bridge,"湿度传感器","14401",randomF(80,90).toFixed(2),"null","运行中");
    // PushPTbyID(bridge,"伸缩缝传感器","14402",randomZ(1800,2400),"null","运行中",2000);
    // PushPTbyID(bridge,"应力传感器","14403",randomZ(1200,4800),"null","运行中",5120);
    // PushPTbyID(bridge,"索力传感器","14404",randomZ(3600,9600),"null","运行中",2333);
    // PushPTbyID(bridge,"沉降传感器","14405",randomZ(100,300),"null","运行中",192);

});
app.post('/setAlertVal',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let bridge = request.body.bridge;
    let ptType = request.body.ptType;
    let alertVal = request.body.alertVal;
    
    let obj = BridgeMap.find(item=>item.bridge == bridge);
    let ptObj = obj.pt.find(item=>item.type == ptType)
    ptObj.alertVal = alertVal;
    response.send("setOK");

});

app.get('/BridgeMapList',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(JSON.stringify(BridgeMap));
});



// function MainBridge(bridge,longitude,latitude,place,createTime,editTime,pt = new Array(),remark="无"){
//     this.bridge = bridge;
//     this.longitude = longitude;
//     this.latitude = latitude;
//     this.place = place;
//     this.createTime = createTime;
//     this.editTime = editTime;
//     this.pt = pt;
//     this.ptNum = 0;
//     this.pDataNum = 0;
//     this.remark = remark;
// }
app.post('/addFullBridge',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let id = request.body.id;
    let longitude = request.body.longitude;
    let latitude = request.body.latitude;
    let place = request.body.place;
    let pt = JSON.parse(request.body.pt);
    
    let ptArrAy = new Array();
    for(let i =0;i<pt.length;i++)
        ptArrAy.push(pt[i]);
    
    let remark = request.body.remark;
    BridgeMap.push(new MainBridge(id,longitude,latitude,place,getCrrFormatTime(),getCrrFormatTime(),pt,remark))
    BridgeMap[BridgeMap.length-1].ptNum = pt.length;

    response.send("setFullOK");

});

app.post('/editExitBridge',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    let id = request.body.id;
    let newID = request.body.newID;
    let longitude = request.body.longitude;
    let latitude = request.body.latitude;
    let place = request.body.place;
    let pt = JSON.parse(request.body.pt);

    let remark = request.body.remark;

    let index = BridgeMap.findIndex(item=>item.bridge == id);

    BridgeMap[index].bridge = newID;
    BridgeMap[index].longitude = longitude;
    BridgeMap[index].latitude = latitude;
    BridgeMap[index].place = place;
    BridgeMap[index].pt = pt;
    BridgeMap[index].remark = remark;
    BridgeMap[index].editTime = getCrrFormatTime();
    BridgeMap[index].ptNum = pt.length;
    response.send("setFullOK");

});

(function init(){
    let obj = BridgeMap.find(item=>item.bridge == mainShowBridgeName);
    let ptObj = obj.pt.find(item=>item.type == "伸缩缝传感器")
    ptObj.alertVal = "1.00";
    ptObj = obj.pt.find(item=>item.type == "沉降传感器")
    ptObj.alertVal = "0.85";
    ptObj = obj.pt.find(item=>item.type == "应力传感器")
    ptObj.alertVal = "0.96";
    ptObj = obj.pt.find(item=>item.type == "索力传感器")
    ptObj.alertVal = "4999.0";
})();