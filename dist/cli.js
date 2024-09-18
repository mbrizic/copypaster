#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_service_1 = require("./file.service");
const path_1 = require("path");
const prompt_1 = require("./prompt");
const generator_1 = require("./generator");
const configFileName = 'copypaster.config.json';
const currentDir = process.cwd();
const userDir = process.env.HOME || process.env.USERPROFILE || "~";
// Ordered by preference, searched from top to bottom
const configurationFolders = [
    currentDir,
    userDir
];
var config;
for (var configFolder of configurationFolders) {
    if ((0, file_service_1.checkIfExists)(getAbsolutePath(configFolder, configFileName))) {
        console.log(`Found a config file in ${configFolder}`);
        config = tryParseConfigJson(configFolder);
        break;
    }
}
if (config) {
    displayAvailableTemplates(config);
    handleUserInput(config);
}
else {
    askShouldCreateConfigFile();
}
function askShouldCreateConfigFile() {
    console.log(`Can't find ${configFileName} in neither of the supported directories:`);
    configurationFolders.forEach(folder => {
        console.log(`  - ${folder}`);
    });
    (0, prompt_1.ask)(`\nDo you want to create it in current folder? y/n `, answer => {
        if (answer.toLowerCase() == "y" || answer.toLowerCase() == "yes") {
            createTemplateConfigFile();
            exitWithErrorMessage(`  ${configFileName} created in current directory, please modify it based on your needs and run the tool again.`);
        }
        exitWithErrorMessage(`Ok, quitting`);
    });
}
function tryParseConfigJson(configFolder) {
    const filePath = getAbsolutePath(configFolder, configFileName);
    const contents = (0, file_service_1.readFile)(filePath);
    try {
        return JSON.parse(contents);
    }
    catch (e) {
        exitWithErrorMessage(`${filePath} might have some errors in it. Please double-check it.`);
    }
    process.exit();
}
function displayAvailableTemplates(configFile) {
    const templateKeys = Object.keys(configFile);
    console.log("\nListing available templates from your config file: \n");
    templateKeys.forEach((templateName, index) => {
        const template = configFile[templateName];
        let message = `  ${index + 1}) ${templateName}`;
        if (template.description) {
            message += ` - ${template.description}`;
        }
        console.log(message);
    });
}
function handleUserInput(configFile) {
    const templateKeys = Object.keys(configFile);
    (0, prompt_1.ask)("\nEnter index of template you'd like to use: ", templateIndex => {
        if (templateIndex.length == 0) {
            exitWithErrorMessage("Nothing selected, exiting.");
        }
        const parsedIndex = parseInt(templateIndex);
        if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > templateKeys.length) {
            exitWithErrorMessage("Not a valid index, please try again.");
        }
        const templateName = templateKeys[parsedIndex - 1];
        const template = configFile[templateName];
        const replacementKey = template.replacementKey;
        if (replacementKey == null || replacementKey.length == 0) {
            exitWithErrorMessage("Replacement key must be present in config file.");
        }
        (0, prompt_1.ask)(`\nWhat do you want to replace "${replacementKey}" with? In snake_case format please: `, name => {
            if (name == null || name.length == 0) {
                exitWithErrorMessage("Invalid input, quitting.");
            }
            (0, generator_1.generate)(template, name);
            process.exit();
        });
    });
}
function createTemplateConfigFile() {
    let templateConfig = `{
    "templateName": {
        "replacementKey": "some_name",
        "folders": [
            "example/some_name/some_name_settings"
        ],
        "files": [
            "example/some_name/some_name.js"
        ],
        "snippets": [
            {
                "file": "example/config.js",
                "content": "some_name"
            }
        ]
    }
}`;
    (0, file_service_1.writeFile)(getAbsolutePath(currentDir, configFileName), templateConfig);
}
function getAbsolutePath(dir, file) {
    return (0, path_1.join)(dir, file);
}
function exitWithErrorMessage(error) {
    console.error(error);
    process.exit();
}
