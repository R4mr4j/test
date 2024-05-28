const fs = require('fs');
const prompt = require('prompt');
const fetch = require('node-fetch'); // Import the fetch module
const login = require('facebook-chat-api');
const chalk = require('chalk');

prompt.message = '';

prompt.start();

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
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            process.exit(1);
        });

    const appState = JSON.parse(fs.readFileSync(result.apstatefile, 'utf8'), (err, data) => {
        if (err) {
            console.error('Error reading appState file:', err);
            process.exit(1);
        }
        return data;
    });

    login({ appState }, (err, api) => {
        if (err) return console.error(err);
        setInterval(() => {
            var msg = {
                body: "",
                attachment: fs.createReadStream(__dirname + '/sk.gif')
            };
            api.sendMessage(msg, result.targetID); // Use result.targetID instead of targetID
        }, result.timer * 1000, () => {
            const timestamp = new Date().toLocaleString();
            console.log(`\n\x1b[32mImage sent successfully at ${timestamp}.`);
        });
    });
});

function onErr(err) {
    console.error('Error:', err);
    return 1;
}

process.on('unhandledRejection', (err, p) => {});
