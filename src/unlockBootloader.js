const shell = require('@cam-o-man/simpleshell').execute;

async function unlockBootloader() {
    let child = shell('pwd', []);
    for await (let data of child.stdout) {
        console.log(`Present working directory: ${data}`); //Note the backticks (`) surrounding the string. These *must* be used otherwise the ${data} variable will not work.
    }
    child = shell('./adb reboot bootloader', []);
    for await (let data of child.stdout) {
        console.log(`Entering bootloader: ${data}`);
    }
    child = shell('./fastboot flashing unlock', []);
    for await (let data of child.stdout) {
        console.log(`Unlocking bootloader: ${data}`);
    }
}

// noinspection JSCheckFunctionSignatures
window.onload(unlockBootloader());