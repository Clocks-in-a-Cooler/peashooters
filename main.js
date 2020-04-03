const Electron = require("electron");

function create_window() {
    const window = new Electron.BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    
    window.loadFile("index.html");
}

Electron.app.whenReady().then(create_window);

Electron.app.on("window-all-closed", () => {
    Electron.app.quit();
});