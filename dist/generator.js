"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const fs = __importStar(require("fs"));
const file_service_1 = require("./file.service");
const path_1 = require("path");
const util_1 = require("./util");
const models_1 = require("./models");
function generate(template, newName) {
    const templateEntity = new models_1.Entity(template.replacementKey);
    const newEntity = new models_1.Entity(newName);
    const files = template.files;
    const folders = template.folders;
    const snippets = template.snippets;
    console.log(`\nGenerating entity "${newEntity.getSnakeCase()}" from entity "${templateEntity.getSnakeCase()}"`);
    generateFiles();
    function generateFiles() {
        folders && folders.forEach(folder => {
            const doesTemplateFolderExist = fs.existsSync(getAbsolutePath(folder));
            if (!doesTemplateFolderExist) {
                console.log(`  Required template folder does not exist: ${folder}`);
                return;
            }
            const newFolderPath = performAllReplacements(folder);
            (0, file_service_1.ensureDirectoryExists)(getAbsolutePath(newFolderPath));
            console.log(`  Generated folder: ${newFolderPath}`);
        });
        files && files.forEach(file => {
            const absoluteTemplatePath = getAbsolutePath(file);
            const doesTemplateFileExist = fs.existsSync(absoluteTemplatePath);
            if (!doesTemplateFileExist) {
                console.error(`  Required template file does not exist: ${file}`);
                return;
            }
            const contents = (0, file_service_1.readFile)(absoluteTemplatePath);
            const newPath = performAllReplacements(file);
            const newContents = performAllReplacements(contents);
            const absoluteNewPath = getAbsolutePath(newPath);
            (0, file_service_1.deleteFile)(absoluteNewPath);
            (0, file_service_1.writeFile)(absoluteNewPath, newContents);
            console.log(`  Generated file: ${newPath}`);
        });
        snippets && snippets.forEach(snippet => {
            const absolutePath = getAbsolutePath(snippet.file);
            const doesTemplateFileExist = fs.existsSync(absolutePath);
            if (!doesTemplateFileExist) {
                console.error(`  Required template file does not exist: ${snippet.file}`);
                return;
            }
            const contents = (0, file_service_1.readFile)(absolutePath);
            const newSnippetContent = performAllReplacements(snippet.content);
            if (snippet.content == newSnippetContent) {
                console.error(`  Nothing to replace in ${snippet.file}`);
                return;
            }
            const newContents = (0, util_1.replaceAll)(contents, snippet.content, snippet.content + "\n" + newSnippetContent);
            (0, file_service_1.deleteFile)(absolutePath);
            (0, file_service_1.writeFile)(absolutePath, newContents);
            console.log(`  Updated file: ${snippet.file}`);
        });
    }
    function performAllReplacements(contents) {
        let output = contents;
        models_1.replacementFunctions.forEach(replacementFunction => {
            output = (0, util_1.replaceAll)(output, templateEntity[replacementFunction](), newEntity[replacementFunction]());
        });
        return output;
    }
    function getAbsolutePath(path) {
        return (0, path_1.join)(process.cwd(), path);
    }
}
exports.generate = generate;
