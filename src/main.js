const shell = require('shelljs');


/**
 * This function will run the script when the run button is pressed on the HTML page.
 * NOTE: KNOWN ISSUES:
 * ShellJS does not currently support Electron. Because of this, shell.exec() is broken.
 * KNOWN WORKAROUND: Set shell.config.execPath to the absolute path of the Node binary.
 * This *may* work by setting shell.config.execPath = shell.which('node').toString();
 * However, a more reliable method is to pass an argument from an external script which will somehow change this. Perhaps `replace`?
 */
function runScript() {
    document.getElementById("debug").style.display = "block";



//Check adb for devices
    // noinspection JSUnresolvedFunction
    let out = shell.exec("adb devices").stdout;
//htmlout links to the output path on the user interface
    let htmlout = document.getElementById("updates");
//htmlerr links to the error path on the user interface
    let htmlerr = document.getElementById("errors");
//I need the cwd
    let htmlpath = document.getElementById("path");
    htmlpath.innerText = shell.exec("pwd", "", "stdout");
//adb must be authorised on the device to run
    htmlout.innerText = out;
    if (out.includes("unauthorized")) {
        document.getElementById("errors").innerText = "Please check the dialog box on your phone and authorise the device.";
    }
//Assuming all is well, proceed.

    out = shell.exec("adb reboot bootloader").stdout;
    htmlout.innerText = out;
//Commands should run synchronously, no need to wait for completion.
    out = shell.exec("fastboot -w update images.zip").stdout;

}

