let serverIPPort = window.parent.parent.serverIPPort;
// var yzq = "http://47.108.197.27";
// var yxy = "http://localhost"
// var serverIP = yxy;
// var serverPort = "8000";
// var serverIPPort = serverIP + ":"+serverPort;
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
    var myIcon = new BMapGL.Icon("../res/img/bridgeIcon.png",new BMapGL.Size(50,50));

    for(let i=0;i<tempServerGroup.length;i++){
        obj = new yxyMarker(tempServerGroup[i].id,
            new BMapGL.Marker(new BMapGL.Point(parseFloat(tempServerGroup[i].longitude).toFixed(6),parseFloat(tempServerGroup[i].latitude).toFixed(6)),{
                icon: myIcon

            }),
            tempServerGroup[i].place);
        
        obj.marker.setTitle(tempServerGroup[i].id);

        yxyMarkerGroup.push(obj);
    }
}
var yxyMarkerGroup = new Array();
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
    var myIcon = new BMapGL.Icon("../res/img/bridgeIcon.png",new BMapGL.Size(50,50));

    var marker = new BMapGL.Marker(new BMapGL.Point(parseFloat(longitude),parseFloat(latitude)),{
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
            parent.setSSMsg(yxyMarkerGroup[index].id,yxyMarkerGroup[index].place,yxyMarkerGroup[index].marker.getPosition().lng.toFixed(6)+"°",yxyMarkerGroup[index].marker.getPosition().lat.toFixed(6)+"°",1312619,11.0,65.5); 
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


// let CBridge = window.parent.document.getElementById("G3C1");
// let DBridge = window.parent.document.getElementById("G3D1");
let Clongitude = window.parent.document.getElementById("G3C2");
let Clatitude = window.parent.document.getElementById("G3C3");

function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    //addMapControl();//向地图添加控件
    //addMapOverlay();//向地图添加覆盖物
    httpGetBridge();
    //黑夜模式

    
    
    //map.setMapStyle({style:'dark'});
    setTimeout(() => {
        //标记


        for(let i =0;i<yxyMarkerGroup.length;i++){
            yxyMarkerGroup[i].marker.addEventListener("click", function(){
                parent.setSSMsg(yxyMarkerGroup[i].id,yxyMarkerGroup[i].place,parseFloat(yxyMarkerGroup[i].marker.getPosition().lng).toFixed(6)+"°",parseFloat(yxyMarkerGroup[i].marker.getPosition().lat).toFixed(6)+"°",1312619,11.0,65.5); 
                parent.parent.selectBridgeID_PB = yxyMarkerGroup[i].id;
                parent.parent.selectBridgeID = yxyMarkerGroup[i].id;
                parent.parent.PBhasSelect = true;
                parent.document.getElementById("G3D1").value = yxyMarkerGroup[i].id;

            }); 

            map.addOverlay(yxyMarkerGroup[i].marker);

        }


    }, 100);


    
    map.addEventListener('click', function (e) {
        var point = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
        Clongitude.value = e.latlng.lng.toFixed(6);
        Clatitude.value = e.latlng.lat.toFixed(6);

        window.parent.parent.PDLLtude = e.latlng.lng.toFixed(6)+","+e.latlng.lat.toFixed(6);

        let infoStr;
        let gc = new BMapGL.Geocoder();
        gc.getLocation(point, function (rs) {
            infoStr = rs.addressComponents.province + rs.addressComponents.city + rs.addressComponents.district ;
            window.parent.parent.PDLocation = infoStr;
        });

        // var gc = new BMapGL.Geocoder();
        // gc.getLocation(point, function (rs) {
        //     var opts = {
        //         title: '行政区划归属',
        //         width: 220,
        //         height: 92
        //     };
        //     var infoStr = '<div>省：' + rs.addressComponents.province + '</div>'
        //                 + '<div>市：' + rs.addressComponents.city + '</div>'
        //                 + '<div>区：' + rs.addressComponents.district + '</div>';
        //     var infoWindow = new BMapGL.InfoWindow(infoStr, opts);
        //     map.openInfoWindow(infoWindow, point);
        // });
    });
   
}
var styleJson = [{
    "featureType": "poilabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}]
function createMap() {
    map = new BMapGL.Map("map");
    let x = 103.992363,y = 30.768739,z = 18;
    x = 103.992363,y = 30.768739,z = 18;

    map.centerAndZoom(new BMapGL.Point(x,y), z);
    map.setHeading(64.5);
    map.setTilt(73);
    map.setMapStyleV2({     
        styleJson: styleJson
      });

    // setTimeout(() => {
    //     map.centerAndZoom(new BMapGL.Point(103.992363,30.768739), 18);

       
    //     setTimeout(() => {
    //          map.setHeading(64.5);
    //     map.setTilt(73);
    //     }, 1000);
    // }, 12500);



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
    var scaleControl = new BMapGL.ScaleControl({ anchor: BMapGL_ANCHOR_BOTTOM_LEFT });
    scaleControl.setUnit(BMapGL_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMapGL.NavigationControl({ anchor: BMapGL_ANCHOR_TOP_LEFT, type: BMapGL_NAVIGATION_CONTROL_LARGE });
    map.addControl(navControl);
    var overviewControl = new BMapGL.OverviewMapControl({ anchor: BMapGL_ANCHOR_BOTTOM_RIGHT, isOpen: false });
    map.addControl(overviewControl);
}