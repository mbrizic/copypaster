
import * as fs from 'fs'
import { deleteFile, ensureDirectoryExists, readFile, writeFile } from './file.service'
import { join as joinPath } from 'path'
import { replaceAll } from './util'
import { ConfigFileTemplateDefinition, Entity, replacementFunctions } from './models'

export function generate(template: ConfigFileTemplateDefinition, templateName: string, newName: string) {

    const templateEntity = new Entity(templateName)
    const newEntity = new Entity(newName)

    const files = template.files
    const folders = template.folders
    const snippets = template.lines

    console.log(`\nGenerating entity "${newEntity.getCamelCase()}" from entity "${templateEntity.getCamelCase()}"`)

    generateFiles()

    function generateFiles() {
        folders && folders.forEach(folder => {
            const doesTemplateFolderExist = fs.existsSync(getAbsolutePath(folder))

            if (!doesTemplateFolderExist) {
                console.log(`  Required template folder does not exist: ${folder}`)
                process.exit()
            }

            const newFolderPath = performAllReplacements(folder)

            ensureDirectoryExists(
                getAbsolutePath(newFolderPath)
            )

            console.log(`  Generated folder: ${newFolderPath}`)
        })

        files && files.forEach(file => {
            const absoluteTemplatePath = getAbsolutePath(file)
            const doesTemplateFileExist = fs.existsSync(absoluteTemplatePath)

            if (!doesTemplateFileExist) {
                console.error(`  Required template file does not exist: ${file}`)
                return
            }

            const contents = readFile(absoluteTemplatePath)

            const newPath = performAllReplacements(file)
            const newContents = performAllReplacements(contents)

            const absoluteNewPath = getAbsolutePath(newPath)

            deleteFile(absoluteNewPath)
            writeFile(absoluteNewPath, newContents)
            console.log(`  Generated file: ${newPath}`)
        })

        snippets && snippets.forEach(snippet => {
            const absolutePath = getAbsolutePath(snippet.file)
            const doesTemplateFileExist = fs.existsSync(absolutePath)

            if (!doesTemplateFileExist) {
                console.error(`  Required template file does not exist: ${snippet.file}`)
                return
            }

            const contents = readFile(absolutePath)

            const newSnippetContent = performAllReplacements(snippet.content)

            if (snippet.content == newSnippetContent) {
                console.error(`  Nothing to replace in ${snippet.file}`)
                return
            }

            const newContents = replaceAll(
                contents, 
                snippet.content, 
                snippet.content + "\n" + newSnippetContent
            )

            deleteFile(absolutePath)
            writeFile(absolutePath, newContents)
            console.log(`  Updated file: ${snippet.file}`)
        })
    }

    function performAllReplacements(contents: string) {
        let output = contents

        replacementFunctions.forEach(replacementFunction => {
            output = replaceAll(
                output,
                templateEntity[replacementFunction](),
                newEntity[replacementFunction]()
            )
        })

        return output
    }

    function getAbsolutePath(path: string) {
        return joinPath(process.cwd(), path)
    }
}

