// 创建一个helloworld的窗口

// 引入模块 app模块：控制应用的生命周期; BrowserWidow创建一个浏览器窗口
const {
    app,
    BrowserWindow
} = require("electron") // 普通js写法，下面是es6写法
// import { app, BrowserWindow } from "electron"; // 该种写法启动会报错


// 创建窗口函数
function createWindow() {
    // 1.1 创建窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("index.html");

}

// 1,初始化应用之后，会触发监听 ready事件
app.whenReady().then(createWindow);

// 等价下面写法：
// app.on('ready',function(){
// 创建一个窗口函数
// })

// 添加了一个新的侦听器，当应用程序不再有任何打开窗口时试图退出。 由于操作系统的 窗口管理行为 ，此监听器在 macOS 上是禁止操作的。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 添加一个新的侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 例如，在首次启动应用程序后或重启运行中的应用程序。
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// 执行文件方式: 在package.json中scripts中添加 "start": "electron ."
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "electron ."
//   },

// 然后执行npm start