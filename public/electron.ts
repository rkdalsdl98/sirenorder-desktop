import * as path from 'path';
import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';

const BASE_URL = 'http://localhost:3000';

let mainWindow: BrowserWindow | null;
const windowWidth : number = 1024
const windowHeight : number = 768

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    resizable: true,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.once('ready-to-show', () => {
    if(mainWindow) {
      mainWindow.setMenu(null)
      mainWindow.show()
    }
  });

  if (isDev) {
    mainWindow.loadURL(BASE_URL)
    mainWindow.webContents.openDevTools({ mode: "detach" })
  } else {
    mainWindow.loadFile(path.join(__dirname, './index.html'))
  }

  mainWindow.on('closed', (): void => {
    mainWindow = null;
  })
}

// Electron이 준비되면 whenReady 메서드가 호출되어,
// 초기화 및 browser window를 생성합니다.
app.whenReady().then(() => {
  createMainWindow()

  // Linux와 Winodws 앱은 browser window가 열려 있지 않을 때 종료됩니다.
  // macOS는 browser window가 열려 있지 않아도 계속 실행되기 때문에,
  // browser window가 열려 있지 않을 때 앱을 활성화 하면 새로운 browser window를 열어줍니다.
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
  })
})

// Linux와 Winodws에서는 모든 창을 종료하면 일반적으로 앱이 완전히 종료됩니다.
// macOS(darwin)가 아닌 경우, 'window-all-closed' 이벤트가 발생했을 때, 앱을 종료합니다.
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})