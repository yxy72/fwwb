let serverIPPort = window.parent.parent.serverIPPort;

function yxyMarker(id,marker,place){
    this.marker = marker;
    this.id = id;
    this.place = place;
}
function tempServerGroup(id,longitude,latitude,place){
    this.longitude = longitude;
    this.latitude = latitude;
    this.id = id;
    this.place = place;

}
function serverTranslateToYxyMaker(){
    yxyMarkerGroup.splice(0,yxyMarkerGroup.length);
    var myIcon = new BMap.Icon("../res/img/bridgeIcon_low.png",new BMap.Size(45,45));

    for(let i=0;i<tempServerGroup.length;i++){
        obj = new yxyMarker(tempServerGroup[i].id,
            new BMap.Marker(new BMap.Point(parseFloat(tempServerGroup[i].longitude).toFixed(6),parseFloat(tempServerGroup[i].latitude).toFixed(6)),{
                icon: myIcon

            }),
            tempServerGroup[i].place);
        
        obj.marker.setTitle(tempServerGroup[i].id);

        yxyMarkerGroup.push(obj);
    }
}
var yxyMarkerGroup = new Array();
// yxyMarkerGroup.push(new yxyMarker("BR20210224",new BMap.Marker(new BMap.Point(103.993363,30.771839))))
// yxyMarkerGroup.push(new yxyMarker("BT20280435",new BMap.Marker(new BMap.Point(103.992363,30.768739))))


function httpGetBridge() {
    const xhr = new XMLHttpRequest();
    xhr.open('get',serverIPPort+"/getBridge")
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
             if(xhr.status >= 200 || xhr.status<300) {
                jsonObj = JSON.parse(xhr.response);
                tempServerGroup = jsonObj;
                serverTranslateToYxyMaker();
             }
         }
   }
};
function httpSetBridge(id,longitude,latitude,place) {
    const xhr = new XMLHttpRequest();
    xhr.open('post',serverIPPort+"/setBridge")
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send('id='+id+"&longitude="+longitude+"&latitude="+latitude+"&place="+place);
};
function httpDeleteBridge(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('post',serverIPPort+"/delBridge")
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//设置请求体类型
    xhr.send('id='+id);
};



function setBridge(longitude,latitude,id){
    return createMarkerInMapAt(longitude,latitude,id);
}

function deleteBridge(id){
    if(deleteMarkerByID(id)){
        httpDeleteBridge(id);
        return true;
    }
    return false;
}



function createMarkerInMapAt(longitude,latitude,id){
    var myIcon = new BMap.Icon("../res/img/bridgeIcon_low.png",new BMap.Size(50,50));

    var marker = new BMap.Marker(new BMap.Point(parseFloat(longitude),parseFloat(latitude)),{
        icon: myIcon

    });

    marker.setTitle(id);


    let existObj = yxyMarkerGroup.find(item=>item.id==id);
    if(typeof(existObj)!="undefined"){
        alert("桥梁对象："+id+"已经存在。经纬度为"+existObj.marker.getPosition().lng.toFixed(6)+","+existObj.marker.getPosition().lat.toFixed(6));
        return false;
    }



    let infoStr;
    let point = new BMapGL.Point(longitude, latitude);
    let gc = new BMapGL.Geocoder();
    gc.getLocation(point, function (rs) {
        infoStr = rs.addressComponents.province + rs.addressComponents.city + rs.addressComponents.district ;
    });
    
    setTimeout(() => {
        yxyMarkerGroup.push(new yxyMarker(id,marker,infoStr));
        let index = yxyMarkerGroup.length-1;
        map.addOverlay(yxyMarkerGroup[index].marker);
        yxyMarkerGroup[index].marker.addEventListener("click", function(){
            parent.setSSMsg(yxyMarkerGroup[index].id,yxyMarkerGroup[index].place,yxyMarkerGroup[index].marker.getPosition().lng.toFixed(6)+"°",yxyMarkerGroup[index].marker.getPosition().lat.toFixed(6)+"°",1312619,27.0,85.0); 
            parent.parent.selectBridgeID_PB = yxyMarkerGroup[i].id;
            parent.parent.selectBridgeID = yxyMarkerGroup[i].id;
            parent.parent.PBhasSelect = true;
        }); 
        httpSetBridge(id,longitude,latitude,infoStr);
    }, 100);




    


   

    return true;

}

function deleteMarkerByID(id){
    let index = yxyMarkerGroup.findIndex(item=>item.id == id);
    if(index==-1){
        alert("地图中不存在桥梁对象："+id+"。");
        return false;
    }
    map.removeOverlay(yxyMarkerGroup[index].marker);
    yxyMarkerGroup.splice(index,1);
    httpDeleteBridge(id);
    return true;
}


function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    //addMapControl();//向地图添加控件
    //addMapOverlay();//向地图添加覆盖物
    httpGetBridge();
    //黑夜模式

    
    map.setMapStyle({style:'dark'});
    setTimeout(() => {
        //标记


        for(let i =0;i<yxyMarkerGroup.length;i++){
            yxyMarkerGroup[i].marker.addEventListener("click", function(){
                parent.setSSMsg(yxyMarkerGroup[i].id,yxyMarkerGroup[i].place,parseFloat(yxyMarkerGroup[i].marker.getPosition().lng).toFixed(6)+"°",parseFloat(yxyMarkerGroup[i].marker.getPosition().lat).toFixed(6)+"°",1312619,27.0,85.0); 
                parent.parent.selectBridgeID_PB = yxyMarkerGroup[i].id;
                parent.parent.selectBridgeID = yxyMarkerGroup[i].id;
                parent.parent.PBhasSelect = true;

            }); 

            map.addOverlay(yxyMarkerGroup[i].marker);

        }


        // yxyMarkerGroup[1].marker
        // yxyMarkerGroup[0].marker.addEventListener("click", function(){
        //     parent.setSSMsg("BR20210224","9号教学楼","103.993363°","30.771839°",2312619,22.0,89.0); 
        // });

    }, 100);
    

   
}
function createMap() {
    map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(103.992363,30.768739), 16);

}
function setMapEvent() {
    map.enableScrollWheelZoom();
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom()
}
function addClickHandler(target, window) {
    target.addEventListener("click", function () {
        target.openInfoWindow(window);
    });
}
function addMapOverlay() {
}
//向地图添加控件
function addMapControl() {
    var scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: false });
    map.addControl(overviewControl);
}