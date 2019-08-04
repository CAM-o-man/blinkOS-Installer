const shell = require('@cam-o-man/simpleshell').execute;

async function lock() {
    let child = shell('pwd', []);
    for await (let data of child.stdout) {
        console.log(`Present Working Directory: ${data}`);
    }
    child = shell('src/fastboot', ['flashing', 'lock']);
    for await (let data of child.stdout) {
        console.log(`Locking bootloader: ${data}`);
    }
}

window.onload = lock;