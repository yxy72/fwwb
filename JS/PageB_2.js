
let chose1 = document.getElementById("chose1");
let chose2 = document.getElementById("chose2");
let chose3 = document.getElementById("chose3");
let chose4 = document.getElementById("chose4");
let chose5 = document.getElementById("chose5");
let currentBJH = 0;
function formBgdRefresh(){
    let trs = document.getElementById("form").getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
         if (i % 2 == 0) { trs[i].style.backgroundColor = "#292e33"; }
         else { trs[i].style.backgroundColor = "#1f2327"; }
    }
}
let adminlist = new Array("优","良","差");
let TableColumnWith = new Array(12,21,12,23,23,25);
// var addImgDom = document.querySelector('.addImgBtn');
// var addImgBtnInput = document.querySelector('.addImgBtnInput');
function addMapRecord(sort,item){
     
     
    var tr = document.createElement('tr');
    tr.className="toClearFlag";

    var td = new Array();
    for(let tdid = 0;tdid<6;tdid++){
        td[tdid] = document.createElement('td');
        td[tdid].style.width = TableColumnWith[tdid];
    }

    var ti = new Array();
    for(let tiid = 0;tiid <3;tiid++){
        ti[tiid] = document.createElement('input');
        ti[tiid].style.width="100%"
        ti[tiid].style.backgroundColor="transparent"
        ti[tiid].style.border = "none";
        ti[tiid].style.cursor="";
        ti[tiid].style.outline = "none";
        ti[tiid].style.textAlign="center";
    }



    td[0].innerHTML = sort;
    td[1].innerHTML = item;
    td[1].style.cursor = "pointer";
    td[1].title = "复制";
    td[1].onclick = function(){copyLabel(this)};
    // td[2].innerHTML = 3;
    for(let i = 2;i<5;i++){
        td[i].appendChild(ti[i-2]);
    }
    // var temp = addImgDom.cloneNode();
    // temp.appendChild(addImgBtnInput.cloneNode());
    td[5].innerHTML = "上传";
    td[5].style.cursor="pointer";
    td[5].style.color = "#1ba3fe";
    let tempSort = sort;
    td[5].onclick=function(){currentBJH = tempSort; document.querySelector('.addImgBtnInput').click()}
        for(let tdid = 0;tdid<6;tdid++){
       
         tr.appendChild(td[tdid]);
    }
    document.getElementById('form').appendChild(tr);
    formBgdRefresh();
}
let chose0 = document.getElementById("chose0");
function listShow1(){
    chose0.querySelector('.choseList').style.visibility="visible";
 }
 function listDisapear1(){
      setTimeout(lDisapear1, 120);
 }
 function lDisapear1(){
     chose0.querySelector('.choseList').style.visibility="hidden";
 };
 function listChoseSel1(i){
     document.querySelector('.chosed').innerHTML = adminlist[i];
 }
 function choseDivInit1(){
     chose0.querySelector('.chosed').innerHTML = adminlist[0];
     chose0.querySelector('.choseList').style.height = "106px";
     for(let i = 0;i<adminlist.length;i++){
         let item = document.createElement("li");
         item.appendChild(document.createTextNode(adminlist[i]));
         item.value = adminlist[i];
         item.onclick = function(){listChoseSel1(i);};
         item.className="toClearFlag";
         item.style.height = "32px"
         chose0.querySelector('ul').appendChild(item);
     }
 
     chose0.querySelector('.chose').onclick = function(){listShow1();};
     chose0.querySelector('.chose').onblur = function(){listDisapear1();};
     
 }

function loadName(dom){
    let dom1 = document.querySelector('.form').getElementsByTagName('td')[(currentBJH-1)*6+5];
    // dom1.style.fontSize = "12px"
    dom1.innerHTML=dom.files[0].name;

}

(function(){

    let CoSum = 0;
    for(let i = 0;i<6;i++){
        CoSum+=TableColumnWith[i];
    }
    for(i = 0;i<6;i++){
        TableColumnWith[i] = TableColumnWith[i]/CoSum*100+"%";
        document.getElementById("th"+String(i)).style.width = TableColumnWith[i];
    }
    addMapRecord(1,"翼墙、耳墙");
    addMapRecord(2,"锥坡、护坡");
    addMapRecord(3,"桥台及基础");
    addMapRecord(4,"桥墩及基础");
    addMapRecord(5,"地基冲刷");
    addMapRecord(6,"支座");
    addMapRecord(7,"上部主要承重构件");
    addMapRecord(8,"上部一般承重构件");
    addMapRecord(9,"桥面铺装");
    addMapRecord(10,"桥头跳车");
    addMapRecord(11,"伸缩缝");
    addMapRecord(12,"人行道");
    addMapRecord(13,"栏杆、护栏");
    addMapRecord(14,"照明标志");
    addMapRecord(15,"排水设施");
    addMapRecord(16,"调治构造物");
    addMapRecord(17,"其他");

    choseDivInit1();


})();

var listProvince = new Array;
var listCity = new Array;
var listYear = new Array;
var listMon = new Array;
var listDay = new Array;

let serverIPPort = window.parent.serverIPPort;

    listProvince[listProvince.length] = "北京市";
    listProvince[listProvince.length] = "天津市";
    listProvince[listProvince.length] = "河北省";
    listProvince[listProvince.length] = "山西省";
    listProvince[listProvince.length] = "内蒙古";
    listProvince[listProvince.length] = "辽宁省";
    listProvince[listProvince.length] = "吉林省";
    listProvince[listProvince.length] = "黑龙江省";
    listProvince[listProvince.length] = "上海市";
    listProvince[listProvince.length] = "江苏省";
    listProvince[listProvince.length] = "浙江省";
    listProvince[listProvince.length] = "安徽省";
    listProvince[listProvince.length] = "福建省";
    listProvince[listProvince.length] = "江西省";
    listProvince[listProvince.length] = "山东省";
    listProvince[listProvince.length] = "河南省";
    listProvince[listProvince.length] = "湖北省";
    listProvince[listProvince.length] = "湖南省";
    listProvince[listProvince.length] = "广东省";
    listProvince[listProvince.length] = "广西";
    listProvince[listProvince.length] = "海南省";
    listProvince[listProvince.length] = "重庆市";
    listProvince[listProvince.length] = "四川省";
    listProvince[listProvince.length] = "贵州省";
    listProvince[listProvince.length] = "云南省";
    listProvince[listProvince.length] = "西藏";
    listProvince[listProvince.length] = "陕西省";
    listProvince[listProvince.length] = "甘肃省";
    listProvince[listProvince.length] = "青海省";
    listProvince[listProvince.length] = "宁夏";
    listProvince[listProvince.length] = "新疆";
    listProvince[listProvince.length] = "香港";
    listProvince[listProvince.length] = "澳门";
    listProvince[listProvince.length] = "台湾省";

    listCity[listCity.length] = new Array("北京", "东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", " 海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", " 其他");
    listCity[listCity.length] = new Array("和平区", "河东区", "河西区", "南开区", "红桥区", "塘沽区", "汉沽区", "大港区",
                "西青区", "津南区", "武清区", "蓟县", "宁河县", "静海县", "其他");
    listCity[listCity.length] = new Array("石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "衡水市",
                "沧州市", "邢台市", "邯郸市", "保定市", "其他");
    listCity[listCity.length] = new Array("太原市", "朔州市", "大同市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市",
                "吕梁市", "运城市", "其他");
    listCity[listCity.length] = new Array("呼和浩特市", "包头市", "赤峰市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市",
                "巴彦淖尔市", "兴安盟", "阿拉善盟", "锡林郭勒盟", "其他");
    listCity[listCity.length] = new Array("沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "丹东市", "本溪市", "辽阳市",
                "鞍山市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市", "其他");
    listCity[listCity.length] = new Array("长春市", "白城市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边朝鲜族自治州", "其他");
    listCity[listCity.length] = new Array("哈尔滨市", "七台河市", "黑河市", "大庆市", "齐齐哈尔市", "伊春市", "佳木斯市",
                "双鸭山市", "鸡西市", "大兴安岭地区(加格达奇)", "牡丹江", "鹤岗市", "绥化市　", "其他");
    listCity[listCity.length] = new Array("黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区",
                "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "其他");
    listCity[listCity.length] = new Array("南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市",
                "南通市", "镇江市", "常州市", "无锡市", "苏州市", "其他");
    listCity[listCity.length] = new Array("杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市",
                "台州市", "温州市", "丽水市", "其他");
    listCity[listCity.length] = new Array("合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市",
                "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市", "宣城市", "其他");
    listCity[listCity.length] = new Array("福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市", "其他");
    listCity[listCity.length] = new Array("南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市",
                "抚州市", "宜春市", "吉安市", "其他");
    listCity[listCity.length] = new Array("济南市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市",
                "青岛市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市", "其他");
    listCity[listCity.length] = new Array("郑州市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市",
                "开封市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市", "其他");
    listCity[listCity.length] = new Array("武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市",
                "咸宁市", "荆州市", "宜昌市", "随州市", "恩施土家族苗族自治州", "仙桃市", "天门市", "潜江市", "神农架林区", "其他");
    listCity[listCity.length] = new Array("长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市",
                "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西土家族苗族自治州", "其他");
    listCity[listCity.length] = new Array("广州市", "清远市市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市",
                "汕尾市", " 惠州市", "东莞市", "深圳市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市",
                "阳江市", "茂名市", "湛江市", " 其他");
    listCity[listCity.length] = new Array("南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市",
                "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市", "其他");
    listCity[listCity.length] = new Array("海口市", "三亚市", "其他");
    listCity[listCity.length] = new Array("渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区",
                "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "合川市", "永川市",
                "江津市", "南川市", "綦江县", "潼南县", "铜梁县", "大足县", "璧山县", "垫江县", "武隆县", "丰都县",
                "城口县", "开县", "巫溪县", "巫山县", "奉节县", "云阳县", "忠县", "石柱土家族自治县", "彭水苗族土家族自治县",
                "酉阳土家族苗族自治县", "秀山土家族苗族自治县", "其他");
    listCity[listCity.length] = new Array("成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市",
                "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "资阳市", "眉山市", "雅安",
                "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州县", "其他");
    listCity[listCity.length] = new Array("贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区",
                "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "其他");
    listCity[listCity.length] = new Array("昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市",
                "临沧市", "宁德市", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州",
                "文山壮族苗族自治州", "大理白族自治州", "迪庆藏族自治州", "西双版纳傣族自治州", "其他");
    listCity[listCity.length] = new Array("拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区", "其他");
    listCity[listCity.length] = new Array("西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "安康市", "商洛市", "其他");
    listCity[listCity.length] = new Array("兰州市 ", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "酒泉市",
                "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州", "其他");
    listCity[listCity.length] = new Array("西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "玉树藏族自治州",
                "海南藏族自治州", "果洛藏族自治州", "海西蒙古族藏族自治州", "其他");
    listCity[listCity.length] = new Array("银川市", "石嘴山市", "吴忠市", "固原市", "中卫市", "其他");
    listCity[listCity.length] = new Array("乌鲁木齐市", "克拉玛依市", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区",
                "哈密地区", "塔城地区", "阿勒泰地区", "克孜勒苏柯尔克孜自治州", "博尔塔拉蒙古自治州",
                "昌吉回族自治州伊犁哈萨克自治州", "巴音郭楞蒙古自治州", "河子市", "阿拉尔市", "五家渠市", "图木舒克市", "其他");
    listCity[listCity.length] = new Array("香港", "其他");
    listCity[listCity.length] = new Array("澳门", "其他");
    listCity[listCity.length] = new Array("台湾", "宝贝");




let itemBox1 = ["四川省","重庆市","山东省","上海市"];
let itemBox2 = ["成都市","绵阳市","乐山市","江油市"];

// function test(){
//     document.getElementById("chosed1").innerHTML="cnm";
// }

(function(){
    for(i = 2021; i>=2000; i--){
        listYear.push(i);
    }
    for(i = 1;i<=12;i++){
        listMon.push(i);
    }
    for(i = 1;i<=31;i++){
        listDay.push(i);
    }
})();


let currentProvince = 0;
function listSel(sort,item){
    switch(sort){
        case 1:
            chose1.querySelector('.chosed').innerHTML = listProvince[item];
            choseDivInit(chose2,listCity[item],2,"&nbsp&nbsp","10px");
            currentProvince = item;


            //切换省份时文字框显示优化
            let content1 = listCity[currentProvince][0];
            if(content1.length>4)
                domWidthSet(chose2,content1.length*17+32);
            else
                domWidthSet(chose2,100);
            //切换省份时列表长度显示优化

            let listLen = listCity[currentProvince].length;
            if(listLen<8)
                domListHeightSet(chose2,listLen*36+10);
            else
                domListHeightSet(chose2,320);



            break;
        case 2:
            let content = listCity[currentProvince][item];
            chose2.querySelector('.chosed').innerHTML = content;
            if(content.length>4)
                domWidthSet(chose2,content.length*17+32);
            else
                domWidthSet(chose2,100);

            break;
        case 3:
            let text = listYear[item];
            let monContent = parseInt(chose4.querySelector('.chosed').innerHTML); 
            dayReset(parseInt(text),monContent);
            chose3.querySelector('.chosed').innerHTML = text;
            choseDivInit(chose5,listDay,5,"&nbsp月&nbsp","28px","&nbsp日&nbsp");

            break;
        case 4:
            let text1 = listMon[item];
            let yearContent = parseInt(chose3.querySelector('.chosed').innerHTML); 
            dayReset(yearContent,parseInt(text1));
            chose4.querySelector('.chosed').innerHTML = text1;
            choseDivInit(chose5,listDay,5,"&nbsp月&nbsp","28px","&nbsp日&nbsp");

            break;   
        case 5:
            chose5.querySelector('.chosed').innerHTML = listDay[item];
            break;      
    }
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
     }, 130);
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
        item.onclick = function(){listSel(sort,i);};
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
function dayReset(year,mon){
    listDay = new Array();
    if(mon==1||mon==3||mon==5||mon==7||mon==8||mon==10||mon==12){
        for(let i = 1;i<=31;i++)
            listDay.push(i);
    }else if(mon==4||mon==6||mon==9||mon==11){
        for(let i = 1;i<=30;i++)
            listDay.push(i);
    }else{
        if( year % 4 == 0 && ( year % 100 != 0 ||year % 400 == 0)){
            for(let i = 1;i<=29;i++)
                listDay.push(i);
        }else{
            for(let i = 1;i<=28;i++)
                listDay.push(i);
        }
    }
}



choseDivInit(chose1,listProvince,1,"所在地：","73px");
choseDivInit(chose2,listCity[0],2,"&nbsp&nbsp","10px");
choseDivInit(chose3,listYear,3,"本次检测日期：","90px");
choseDivInit(chose4,listMon,4,"&nbsp年&nbsp","28px");
choseDivInit(chose5,listDay,5,"&nbsp月&nbsp","28px","&nbsp日&nbsp");

domWidthSet(chose3,"80");
domWidthSet(chose4,"55");
domWidthSet(chose5,"55");
domListHeightSet(chose3,"270");
domListHeightSet(chose4,"270")
domListHeightSet(chose5,"270")




let B2level = document.getElementById("B2level");
let B2obj = document.getElementById("B2obj");
let B2scanner = document.getElementById("B2scanner");
let B2doner = document.getElementById("B2doner");
let B2remark = document.querySelector('.remarksArea');
let canCreate = true;

var bridgeNameMap = new Array();
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

function post(){
    if(!canCreate)
        return;
    HttpGetList();
    let bridge = B2obj.value;
    if(bridgeNameMap.findIndex(item=>item == bridge)==-1){
        document.querySelector('.confirmVisibility').style.visibility="visible";
        document.getElementById("confirmTip").innerHTML = "提交失败：桥梁编号"+bridge+"不存在，请先创建桥梁。";
        document.getElementById("confirmTime").innerHTML = "";
        canCreate = false;
        setTimeout(() => {
            document.querySelector('.confirmVisibility').style.visibility="hidden";
            canCreate = true;
        }, 2500);


        return;
    }
    
    
    
    let level = B2level.value;
    let item = "巡检";
    let value = "[dataGroup]";
    let source = "管理终端";
    let remark = B2remark.value;
    let time = getCrrFormatTimeStr();
    let place = chose1.querySelector('.chosed').innerHTML+chose2.querySelector('.chosed').innerHTML;
    let scanner = B2scanner.value;
    let doner = B2doner.value;
    let scantime = gerFormatTimeStr(new Date(chose3.querySelector('.chosed').innerHTML+"/"+chose4.querySelector('.chosed').innerHTML+"/"+chose5.querySelector('.chosed').innerHTML));

    let zkjg = document.getElementById("B2zkjg").value;
    let qc = document.getElementById("B2qc").value;
    let zdkj = document.getElementById("B2zdkj").value;
    let gydw = document.getElementById("B2gydw").value;
    let qh = document.getElementById("B2qh").value;
    let xcrq = document.getElementById("B2xcrq").value;
    let dj = document.getElementById("submit0").innerHTML;
    let jy = document.querySelector(".evaStyle").value;

    // let harmInfo = new Array();
    // harmInfo.push(assess11.value);
    // harmInfo.push(assess12.value);
    // harmInfo.push(assess13.value);


    // httpPost("/addList","level="+level+"&bridge="+bridge+"&item="+item+"&value="+
    // value+"&source="+source+"&remark="+remark+"&time="+time+"&place="+place+
    // "&scanner="+scanner+"&doner="+doner+"&scantime="+scantime+"&assess="+assess+"&harmInfo="+JSON.stringify(harmInfo));
    
    let objt = document.querySelector(".tableDiv").getElementsByTagName('input');
    let ArrayMap = new Array();
    for(let i = 0; i<objt.length;i++){
        ArrayMap.push(objt[i].value);
    }
    let imgMap = new Array();
    for(let i = 0;i<17;i++){
        //暂时只传名字
        imgMap.push(document.querySelector('.form').getElementsByTagName('td')[i*6+5].innerHTML);
    }

    httpPost("/addList","level="+level+"&bridge="+bridge+"&item="+item+"&value="+
    value+"&source="+source+"&remark="+remark+"&time="+time+"&place="+place+
    "&scanner="+scanner+"&doner="+doner+"&scantime="+scantime+
    "&zkjg="+zkjg+"&qc="+qc+"&zdkj="+zdkj+"&gydw="+gydw+"&qh="+qh+"&xcrq="+xcrq+"&dj="+dj+"&jy="+jy+"&ArrayMap="+JSON.stringify(ArrayMap)+"&imgMap="+JSON.stringify(imgMap));
    
    document.querySelector('.confirmVisibility').style.visibility="visible";
    document.getElementById("confirmTip").innerHTML = "提交成功，提交时间：";
    document.getElementById("confirmTime").innerHTML = getCrrFormatTimeStr();
    canCreate = false;
    setTimeout(() => {
        document.querySelector('.confirmVisibility').style.visibility="hidden";
        canCreate = true;
    }, 2000);

}
function httpPost(subUrl,sendBody) {
    const xhr = new XMLHttpRequest();
    xhr.open('post',serverIPPort+subUrl);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send(sendBody);
};

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
function gerFormatTimeStr(myDate){
     mon = myDate.getMonth()+1;
     day = myDate.getDate();
     function done(item){
          return item<10?"0"+item:item;
     }
     mon = done(mon);
     day = done(day);
     return myDate.getFullYear()+"/"+mon+"/"+day;
}
//规定本函数初始化所有东西
(function init(){
    listSel(4,parseInt(new Date().getMonth()));
    listSel(5,parseInt(new Date().getDate()-1));

})();








//获取桥梁列表
var bridgeNameMap = new Array();
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
    document.querySelector('.A1R1ListBody').style.width = maxName*11 + "px"
    document.querySelector('.A1R1ListBody').style.height = mapLength<=6?mapLength*32 + 5+ "px":6*32 + 5+ "px"


}
function autoListDisapear(){
    setTimeout(() => {
        document.querySelector('.A1R1ListBody').style.visibility = "hidden";

    }, 140);

}
function ListSelected(bridgeName){
    document.querySelector('.A1R1ListBody').style.visibility = "hidden";
    document.getElementById("B2obj").value = bridgeName;
    // alert(bridge)
}

function ListBodyRefresh(){

    let control = document.getElementById('autoSelect');

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

HttpGetList();
setTimeout(()=>{
    ListBodyRefresh();
    document.querySelector(".lcRow2Input").value = bridgeNameMap[0];
},50);



