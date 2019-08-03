const remote = require('electron').remote;

function closeWindow() {
    remote.getCurrentWindow().close();
}