const fs = require('fs');
const prompt = require('prompt');
const login = require('facebook-chat-api');
const chalk = require('chalk');

prompt.message = '';

var msg = {
    body: "",
    attachment: fs.createReadStream(__dirname + '/sk.gif')
}

prompt.start();

console.log(chalk.bold.hex("#00FF00").bold(" "));

prompt.get(['password', 'apstatefile', 'targetID', 'timer'], function (err, result) {
    if (err) { return onErr(err); }
    console.log(chalk.bold.hex("#00FF00").bold(" "));
    console.log(chalk.bold.hex("#00FF00").bold(" "));
    fetch('https://pastebin.com/raw/rnFaATDQ')
        .then(response => response.text())
        .then(data => {
            if (data.trim() !== result.password) {
                console.log('[x] Your password is incorrect! Please enter the correct password.');
                process.exit();
            }
        });

    const appState = JSON.parse(fs.readFileSync(result.apstatefile, 'utf8'));
    login({ appState }, (err, api) => {
        if (err) return console.error(err);
        setInterval(() => {
        	var msg = {
            body: "",
            attachment: fs.createReadStream(__dirname + '/sk.gif')
        };
            api.sendMessage(msg, targetID);
        }, result.targetID, () => {
            const timestamp = new Date().toLocaleString();
            console.log(`\n\x1b[32mImage sent successfully at ${timestamp}.`);
        });
    }, result.timer * 1000);

});

function onErr(err) {
    console.error('Error:', err);
    return 1;
}

process.on('unhandledRejection', (err, p) => {});
    
