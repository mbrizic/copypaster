#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_service_1 = require("./file.service");
const path_1 = require("path");
const prompt_1 = require("./prompt");
const generator_1 = require("./generator");
const configFileName = 'copypaster.config.json';
const currentDir = process.cwd();
let configFile = {};
const configFilePath = getAbsolutePath(configFileName);
if (!(0, file_service_1.checkIfExists)(configFilePath)) {
    exitWithErrorMessage(`Couldn't find ${configFileName} in ${currentDir}, quitting. `);
}
try {
    configFile = JSON.parse((0, file_service_1.readFile)(getAbsolutePath(configFileName)));
}
catch (e) {
    exitWithErrorMessage(`${configFileName} might have some errors in it. Please double-check it.`);
}
const templates = Object.keys(configFile);
console.log("\nListing available templates from your config file: \n");
templates.forEach((templateName, index) => {
    const template = configFile[templateName];
    let message = `  ${index + 1}) ${templateName}`;
    if (template.description) {
        message += ` - ${template.description}`;
    }
    console.log(message);
});
(0, prompt_1.ask)("\nEnter index of template you'd like to use: ", templateIndex => {
    if (templateIndex.length == 0) {
        exitWithErrorMessage("Nothing selected, exiting.");
    }
    const parsedIndex = parseInt(templateIndex);
    if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > templates.length) {
        exitWithErrorMessage("Not a valid index, please try again.");
    }
    const templateName = templates[parsedIndex - 1];
    const template = configFile[templateName];
    const replacementKey = template.replacementKey;
    if (replacementKey == null || replacementKey.length == 0) {
        exitWithErrorMessage("Replacement key must be present in config file.");
    }
    (0, prompt_1.ask)(`\nWhat do you want to replace "${replacementKey}" with? In snake_case format please: `, name => {
        if (name == null || name.length == 0) {
            exitWithErrorMessage("Invalid input, quitting.");
        }
        (0, generator_1.generate)(template, replacementKey, name);
        process.exit();
    });
});
function getAbsolutePath(path) {
    return (0, path_1.join)(currentDir, path);
}
function exitWithErrorMessage(error) {
    console.error(error);
    process.exit();
}
