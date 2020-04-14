//module that loads the player's code to control their squad

//all of this just to communicate with the main process
const Electron = require("electron");
const remote = Electron.remote;
const ipc_renderer = Electron.ipcRenderer;
const main_process = remote.require("./main.js");

//parsing javascript
var esprima = require("esprima");

//player clicks on the "open file" button
function open_file() {
    main_process.select_file();
}

var airplane;

//after the player selects a file
ipc_renderer.on("file opened", (event, file, contents) => {
    console.log("opened: " + file);
    
    //parse the javascript file
    try {
        esprima.parseScript(contents);
    } catch (error) {
        console.log();
        //notify the player
        alert("syntax error in your file.");
        return;
    }
    
    //load the ai
    airplane.ai = Function("me", contents);
});

module.exports = function(button) {
    button.addEventListener("click", open_file);
    
    return function(a) {
        airplane = a;
    }
}