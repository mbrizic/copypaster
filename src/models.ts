import { replaceAll } from "./util"

export type ConfigFile = Record<string, ConfigFileTemplateDefinition>

export interface ConfigFileTemplateDefinition {
    replacementKey: string,
    description: string,
    files: string[],
    folders: string[],
    snippets: FileSnippet[],
}
export interface FileSnippet {
    file: string,
    content: string,
}
export class Entity {
    private snakeCaseName: string = ""

    constructor(
        name: string
    ) {
        if (name.includes("-")) {
            this.snakeCaseName = replaceAll(name, "-", "_")
        } else {
            this.snakeCaseName = name
        }
    }

    getSnakeCase = () => {
        return this.snakeCaseName
    }

    getKebabCase = () => {
        return replaceAll(this.snakeCaseName, "_", "-")
    }

    getPascalCase = () => {
        return this.snakeCaseName.split("_").map((word, index) => {
            return word[0].toUpperCase() + word.slice(1)
        }).join("")
    }

    getCamelCase = () => {
        return this.snakeCaseName.split("_").map((word, index) => {
            if (index == 0) {
                return word
            }

            return word[0].toUpperCase() + word.slice(1)
        }).join("")
    }

    getLowerCase = () => {
        return replaceAll(
            this.snakeCaseName.toLowerCase(), "_", ""
        )
    }

    getUpperCase = () => {
        return replaceAll(
            this.snakeCaseName.toUpperCase(), "_", ""
        )
    }

    getSentenceCase = () => {
        return replaceAll(
            this.snakeCaseName, "_", " "
        )
    }

    getCapitalizedSentenceCase = () => {
        const capitalized = this.snakeCaseName[0].toUpperCase() + this.snakeCaseName.slice(1)

        return replaceAll(
            capitalized, "_", " "
        )
    }

    getTitleCase = () => {
        return this.snakeCaseName.split("_").map((word, index) => {
            return word[0].toUpperCase() + word.slice(1)
        }).join(" ")
    }

}

export const replacementFunctions: (keyof Entity)[] = [
    "getSnakeCase",
    "getCamelCase", 
    "getPascalCase",
    "getLowerCase",
    "getUpperCase",
    "getKebabCase",
    "getSentenceCase",
    "getCapitalizedSentenceCase",
    "getTitleCase"
] 

