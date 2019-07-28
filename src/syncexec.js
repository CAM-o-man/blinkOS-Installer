/**
 * This takes advantage of Node's child_process command which now supports execSync to synchronously execute commands.
 * Consider this a test file for now.
 */
const exec = require('child_process').execSync;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}

//Example usage:
execute('which node', (output) => {
    console.log(output);
});

export {execute};

