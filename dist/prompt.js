"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close', function () {
    process.exit(0);
});
function ask(text, fn) {
    rl.question(text, (input) => {
        fn(input);
    });
}
exports.ask = ask;
