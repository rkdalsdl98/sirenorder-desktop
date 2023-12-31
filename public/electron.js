"use strict";
exports.__esModule = true;
var path = require("path");
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var BASE_URL = 'http://localhost:3000';
var mainWindow;
var windowWidth = 1280;
var windowHeight = 960;
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        resizable: true,
        webPreferences: {
            devTools: isDev,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.once('ready-to-show', function () {
        if (mainWindow) {
            mainWindow.setMenu(null);
            mainWindow.show();
        }
    });
    if (isDev) {
        mainWindow.loadURL(BASE_URL);
        mainWindow.webContents.openDevTools({ mode: "detach" });
    }
    else {
        mainWindow.loadFile(path.join(__dirname, './index.html'));
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
// Electron이 준비되면 whenReady 메서드가 호출되어,
// 초기화 및 browser window를 생성합니다.
electron_1.app.whenReady().then(function () {
    createMainWindow();
    // Linux와 Winodws 앱은 browser window가 열려 있지 않을 때 종료됩니다.
    // macOS는 browser window가 열려 있지 않아도 계속 실행되기 때문에,
    // browser window가 열려 있지 않을 때 앱을 활성화 하면 새로운 browser window를 열어줍니다.
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});
// Linux와 Winodws에서는 모든 창을 종료하면 일반적으로 앱이 완전히 종료됩니다.
// macOS(darwin)가 아닌 경우, 'window-all-closed' 이벤트가 발생했을 때, 앱을 종료합니다.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
