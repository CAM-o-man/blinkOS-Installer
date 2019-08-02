const shell = require('@cam-o-man/simpleshell').execute;

async function runScript() {
    //const htmlout = document.getElementById("updates");
    //const htmlerr = document.getElementById("errors");
    //const htmlpath = document.getElementById("path");
    let child = shell(`pwd`, []);
    for await (let data of child.stdout) {
        console.log(`Present Working Directory: ${data}`);
        //htmlpath.innerText = `Present Working Directory: ${data}`
    }
    child = shell('./adb devices', []);
    for await (let data of child.stdout) {
        console.log(`adb devices: ${data}`);
        //htmlout.innerText = `adb devices: ${data}`;
    }
    child = shell('./adb reboot bootloader', []);
    for await (let data of child.stdout) {
        console.log(`Entering bootloader: ${data}`);
        //htmlout.innerText = `Entering bootloader: ${data}`;
    }
    child = shell('./fastboot', ['-w update', 'blinkOS.zip']);
    console.log("Sideloading and flashing blinkOS, please be patient.");
    //htmlout.innerText = "Sideloading and flashing blinkOS, please be patient.";
    for await(let data of child.stdout) {
        console.log(`Flashing complete: ${data}.`);
        //htmlout.innerText = `Flashing complete: ${data}.`;
    }
}

// noinspection JSCheckFunctionSignatures
window.onload(runScript());