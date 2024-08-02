let navBarBtnInit,navBarIconInit,topNavLabelInit;
let navBtns = new Array(6);
let navIcons = new Array(6);
let topNavBtns = new Array(5);
let topNavDivs = new Array(5);
let mainContainer;
let navMode = 3,subMode =1;


//服务器
var yzq = "http://47.108.197.27";
//本地服务器
var yxy = "http://localhost"
var serverIP = yxy;
var serverPort = "8000";
var serverIPPort = serverIP + ":"+serverPort;

var selectBridgeID = "请先在地图中选中桥梁";
var selectBridgeID_PB = "全部";
var PBhasSelect = false;

//非调试数据库服务器
var ydh = 1;
var ifYdh = true;

var PDhasSelect = false;
var PDLLtude;
var PDLocation;

var showBridge = "Cyberpunk3608"

function load(){
    //标签定位
    navBarBtnInit = document.getElementById("no1Btn").style;
    navBarIconInit =  document.getElementById("no1Icon").style;
    topNavLabelInit = document.getElementById("topseclet1").style;
    navBtns[1] = document.getElementById("no1Btn");
    navBtns[2] = document.getElementById("no2Btn");
    navBtns[3] = document.getElementById("no3Btn");
    navBtns[4] = document.getElementById("no4Btn");
    navBtns[5] = document.getElementById("no5Btn");
    navIcons[1] = document.getElementById("no1Icon");
    navIcons[2] = document.getElementById("no2Icon");
    navIcons[3] = document.getElementById("no3Icon");
    navIcons[4] = document.getElementById("no4Icon");
    navIcons[5] = document.getElementById("no5Icon");
    mainContainer = document.getElementById("MainContainer");
    topNavBtns[1] = document.getElementById("topseclet1");
    topNavBtns[2] = document.getElementById("topseclet2");
    topNavBtns[3] = document.getElementById("topseclet3");
    topNavBtns[4] = document.getElementById("topseclet4");
    topNavDivs[1] = document.getElementById("topDiv1");
    topNavDivs[2] = document.getElementById("topDiv2");
    topNavDivs[3] = document.getElementById("topDiv3");
    topNavDivs[4] = document.getElementById("topDiv4");

    //控件初始化
    mainContainer.src="../html/Page"+String.fromCharCode(navMode+64)+"_" + String(subMode) +".html";
    topNavBtns[subMode].style.color = "#fff";
    topNavDivs[subMode].style.backgroundColor = "#3a78f3";
    navBtns[navMode].style.background="url('../res/img/ItemBgd.png')" ; 
    navBtns[navMode].style.color="white"; 
    if(navMode==2)
        navIcons[navMode].style.fontSize = "24px";
    else
        navIcons[navMode].style.fontSize = "30px";

    topBtnTextFresh(navMode);
}

//关闭程序逻辑
function NavbarExitButtonClicked(){
    if(!confirm('确定要退出吗？'))
        return;
        // window.open("about:blank","_self").close()   ;
        window.location.href = "./Login.html";
}

//顶部标签刷新
function topBtnTextFresh(sort){
    switch(sort){
        
        case 1: topNavBtns[1].innerHTML="区域概览";
                topNavBtns[2].innerHTML="详情数据";
                topNavBtns[3].innerHTML="";
                topNavBtns[4].innerHTML="";break;
        case 2: topNavBtns[1].innerHTML="信息查询";
                topNavBtns[2].innerHTML="录入信息";
                topNavBtns[3].innerHTML="";
                topNavBtns[4].innerHTML="";break;
        case 3: topNavBtns[1].innerHTML="预测分析";
                topNavBtns[2].innerHTML="健康报告";
                topNavBtns[3].innerHTML="";
                topNavBtns[4].innerHTML="";break;
        case 4: topNavBtns[1].innerHTML="用户配置";
                topNavBtns[2].innerHTML="桥梁配置";
                topNavBtns[3].innerHTML="";
                topNavBtns[4].innerHTML="";break;     
    }

}

//左侧导航选择
function navSelected(sort){
    
    // 更改后台位置值
    if(navMode==sort)
        return;
    else navMode = sort;

    // 改变主容器界面
    mainContainer.src="../html/Page"+String.fromCharCode(navMode+64)+"_1.html";

    // 按钮样式重置
    for(let i=1;i<6;i++){
        navBtns[i].style = navBarBtnInit;
        navIcons[i].style = navBarIconInit;
    }
    navBtns[sort].style.background="url('../res/img/ItemBgd.png')" ; 
    navBtns[sort].style.color="white"; 
    if(sort==2)
        navIcons[sort].style.fontSize = "24px";
    else
        navIcons[sort].style.fontSize = "30px";
    // 更改顶部标签
    topBtnTextFresh(sort);

    // 更改初始选中div
    for(let i=1;i<5;i++){
        
        topNavDivs[i].style.backgroundColor = "transparent";
    }
    for(let i=1;i<5;i++){
        topNavBtns[i].style = topNavLabelInit;
    }

    topNavBtns[1].style.color = "#fff";
    topNavDivs[1].style.backgroundColor = "#3a78f3";
    subMode = 1;
}

//顶部导航选择
function topSelected(sort){
    if(subMode == sort)
        return;
    else
        subMode = sort;


    for(let i=1;i<5;i++){
        topNavBtns[i].style = topNavLabelInit;
        topNavDivs[i].style.backgroundColor = "transparent";
    }
    topNavBtns[sort].style.color = "#fff";
    topNavDivs[sort].style.backgroundColor = "#3a78f3";
    
    

    mainContainer.src="../html/Page"+String.fromCharCode(navMode+64)+"_" + String(sort) +".html";
}

