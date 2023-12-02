const { app, BrowserWindow, globalShortcut  } = require('electron');
const path = require('path');

let win


// assets
const mainLogo = "https://raw.githubusercontent.com/bcbro2021/kronus-client/main/assets/logo.png"

function client_customs(win) {
    win.webContents.executeJavaScript(`
        document.getElementById("mainLogo").src = "${mainLogo}";
        document.getElementById("mainLogoFace").remove();
        document.getElementById("seasonLabel").remove();
        document.getElementById("editorBtnM").remove();
    `);
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // to remove the client popup
    win.webContents.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

    // load up krunker
    win.loadURL("https://krunker.io/")

    win.webContents.on('did-finish-load', () => {
        // Execute JavaScript code in the loaded page to replace the image
        client_customs(win);
    });

    win.webContents.on('did-navigate',(event, newUrl) => {
        if (newUrl.includes("https://krunker.io/")){client_customs(win);}
    });
}

app.whenReady().then(() => {
    globalShortcut.register('F11', () => {
        win.setFullScreen(!win.isFullScreen());
      });
    createWindow()
})
