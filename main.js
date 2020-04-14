const Electron = require("electron");

var window;

function create_window() {
    window = new Electron.BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
        show: false,
    });
    
    window.loadFile("index.html");
    
    window.on("ready-to-show", window.show);
    
    window.on("closed", () => {
        window = null;
    });
}

Electron.app.whenReady().then(create_window);

Electron.app.on("window-all-closed", () => {
    Electron.app.quit();
});

//filesystem stuff
var fs = require("fs");

var select_file = module.exports.select_file = function() {
    var files = Electron.dialog.showOpenDialogSync(window, {
        properties: ["openFile"],
        filters: [
            { name: "Javascript files", extensions: ["js"] },
        ],
    });
    
    if (files) open_file(files[0]);
};

function open_file(file) {
    console.log("opening file: " + file);
    var contents = fs.readFileSync(file).toString();
    window.webContents.send("file opened", file, contents);
}