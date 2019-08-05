const shell = require('@cam-o-man/simpleshell').execute;

async function lock() {
    let child = shell('pwd', []);
    for await (let data of child.stdout) {
        console.log(`Present Working Directory: ${data}`);
    }
    child = shell('src/platform-tools/fastboot', ['flashing', 'lock']);
    for await (let data of child.stdout || child.stderr) {
        console.log(`Locking bootloader: ${data}`);
    }
    child = shell('src/platform-tools/fastboot', 'reboot');
    for await (let data of child.stdout || child.stderr) {
        console.log(`Rebooting...: ${data}`);
    }
}

window.onload = lock;