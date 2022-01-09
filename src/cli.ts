#!/usr/bin/env node

import { readFile, checkIfExists } from './file.service'
import { join as joinPath } from 'path'
import { ask } from './prompt'
import { generate } from './generator'
import { ConfigFile } from './models'

const configFileName = 'copypaster.config.json'
const currentDir = process.cwd()
let configFile: ConfigFile = {}

const configFilePath = getAbsolutePath(configFileName)

if (!checkIfExists(configFilePath)) {
    exitWithErrorMessage(`Couldn't find ${configFileName} in ${currentDir}, quitting. `)
}

try {
    configFile = JSON.parse(
        readFile(getAbsolutePath(configFileName))
    )
} catch (e) {
    exitWithErrorMessage(`${configFileName} might have some errors in it. Please double-check it.`)
}

const templates = Object.keys(configFile)

console.log("\nListing available templates from your config file: \n") 

templates.forEach((templateName, index) => {
    const template = configFile[templateName]

    let message = `  ${index + 1}) ${templateName}`

    if (template.description) {
        message += ` - ${template.description}`
    }

    console.log(message)
})

ask("\nEnter index of template you'd like to use: ", templateIndex => {
    if (templateIndex.length == 0) {
        exitWithErrorMessage("Nothing selected, exiting.")
    }

    const parsedIndex = parseInt(templateIndex)

    if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > templates.length) {
        exitWithErrorMessage("Not a valid index, please try again.")
    }
    
    const templateName = templates[parsedIndex - 1]
    const template = configFile[templateName]

    const replacementKey = template.replacementKey

    if (replacementKey == null || replacementKey.length == 0) {
        exitWithErrorMessage("Replacement key must be present in config file.")
    }

    ask(`\nWhat do you want to replace "${replacementKey}" with? In snake_case format please: `, name => {
        if (name == null || name.length == 0) {
            exitWithErrorMessage("Invalid input, quitting.")
        }

        generate(template, replacementKey, name)
        process.exit()
    })
})

function getAbsolutePath(path: string) {
    return joinPath(currentDir, path)
}

function exitWithErrorMessage(error: string) {
    console.error(error)
    process.exit()
}