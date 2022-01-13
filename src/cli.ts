#!/usr/bin/env node

import { readFile, checkIfExists, writeFile } from './file.service'
import { join as joinPath } from 'path'
import { ask } from './prompt'
import { generate } from './generator'
import { ConfigFile } from './models'

const configFileName = 'copypaster.config.json'
const currentDir = process.cwd()
const configFilePath = getAbsolutePath(configFileName)

if (!checkIfExists(configFilePath)) {
    askShouldCreateConfigFile()
} else {
    const config = tryParseConfigJson()

    displayAvailableTemplates(config)

    handleUserInput(config)
}

function askShouldCreateConfigFile() {
    ask(`Can't find ${configFileName} in ${currentDir}. \nDo you want to create it? y/n `, answer => {
        if (answer.toLowerCase() == "y" || answer.toLowerCase() == "yes") {
            createTemplateConfigFile()
            exitWithErrorMessage(`  ${configFileName} created in current directory, please modify it based on your needs and run the tool again.`)
        }
        exitWithErrorMessage(`Ok, quitting`)
    })
}

function tryParseConfigJson(): ConfigFile {
    try {
        return JSON.parse(
            readFile(getAbsolutePath(configFileName))
        )
    } catch (e) {
        exitWithErrorMessage(`${configFileName} might have some errors in it. Please double-check it.`)
    }

    process.exit()
}

function displayAvailableTemplates(configFile: ConfigFile) {
    const templateKeys = Object.keys(configFile)

    console.log("\nListing available templates from your config file: \n") 
    
    templateKeys.forEach((templateName, index) => {
        const template = configFile[templateName]
    
        let message = `  ${index + 1}) ${templateName}`
    
        if (template.description) {
            message += ` - ${template.description}`
        }
    
        console.log(message)
    })
}

function handleUserInput(configFile: ConfigFile) {
    const templateKeys = Object.keys(configFile)

    ask("\nEnter index of template you'd like to use: ", templateIndex => {
        if (templateIndex.length == 0) {
            exitWithErrorMessage("Nothing selected, exiting.")
        }
    
        const parsedIndex = parseInt(templateIndex)
    
        if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > templateKeys.length) {
            exitWithErrorMessage("Not a valid index, please try again.")
        }
        
        const templateName = templateKeys[parsedIndex - 1]
        const template = configFile[templateName]
    
        const replacementKey = template.replacementKey
    
        if (replacementKey == null || replacementKey.length == 0) {
            exitWithErrorMessage("Replacement key must be present in config file.")
        }
    
        ask(`\nWhat do you want to replace "${replacementKey}" with? In snake_case format please: `, name => {
            if (name == null || name.length == 0) {
                exitWithErrorMessage("Invalid input, quitting.")
            }
    
            generate(template, name)
            process.exit()
        })
    })

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
}`

    writeFile(configFilePath, templateConfig)
}

function getAbsolutePath(path: string) {
    return joinPath(currentDir, path)
}

function exitWithErrorMessage(error: string) {
    console.error(error)
    process.exit()
}