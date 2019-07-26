const shell = require('shelljs');

//Check adb for devices
let out = shell.exec("adb devices").stdout;
//htmlout links to the output path on the user interface
let htmlout = document.getElementById("updates");
//htmlerr links to the error path on the user interface
let htmlerr = document.getElementById("errors");
//I need the cwd
let htmlpath = document.getElementById("path");
htmlpath.innerText = shell.pwd().toString();
//adb must be authorised on the device to run
htmlout.innerText = out;
if (out.includes("unauthorized")) {
    document.getElementById("errors").innerText = "Please check the dialog box on your phone and authorise the device.";
}
//Assuming all is well, proceed.

out = shell.exec("adb reboot bootloader").stdout;
htmlout.innerText = out;
//Commands should run synchronously, no need to wait for completion.
out = shell.exec("fastboot -w update images.zip");
