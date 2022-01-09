import * as fs from 'fs'
import * as pathUtil from 'path'

export const getFilesFromFolder = (path: string): FileRequestResult[] => {
    const files = fs.readdirSync(path, { withFileTypes: true })
        .filter(file => file.isFile())

    return files.map(file => {
        const fileContents = readFile(path + file.name)
        return {
            name: file.name,
            contents: fileContents
        }
    })
}

export const getFolderContents = (path: string): string[] => {
    return fs.readdirSync(path)
}

export const writeFile = (path: string, contents: string) => {
    ensureFileDirectoryExists(path)
    fs.writeFileSync(path, contents)
}

export function ensureDirectoryExists(path: string) {
    if (fs.existsSync(path)) {
        return
    }
    const containingDirectory = pathUtil.dirname(path)

    ensureDirectoryExists(containingDirectory)

    fs.mkdirSync(path)
}

export function ensureFileDirectoryExists(filePath: string) {
    const containingDirectory = pathUtil.dirname(filePath)
    ensureDirectoryExists(containingDirectory)
}

export function checkIfExists(path: string) {
    return fs.existsSync(path)
}

export function copyFile(source: string, destination: string) {
    fs.copyFileSync(source, destination)
}

export const deleteFile = (path: string) => {
    if (fs.existsSync(path)) {
        return fs.unlinkSync(path)
    }
}

export const deleteDirectory = (path: string) => {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true, force: true });
    }
}

export const readFile = (path: string) => {
    return fs.readFileSync(path, "utf-8")
}
export interface FileRequestResult {
    name: string,
    contents: string,
}