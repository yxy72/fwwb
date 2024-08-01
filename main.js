const {app,BrowserWindow} = require('electron');
let mainWindow = null;
app.whenReady().then(()=>createWindow());
app.on("window-all-closed",function(){
    mainWindow = null;
    app.quit();
})
function createWindow(){
    mainWindow = new BrowserWindow({
        webPreferences:{webviewTag: true,nodeIntegration:true,contextIsolation: false},fullscreen:true
    });
    mainWindow.loadFile('./index.html');
    mainWindow.maximize();
    mainWindow.removeMenu();
}
function exit(){
    mainWindow = null;
    app.quit();
}