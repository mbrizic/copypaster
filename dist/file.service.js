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
exports.readFile = exports.deleteDirectory = exports.deleteFile = exports.copyFile = exports.checkIfExists = exports.ensureFileDirectoryExists = exports.ensureDirectoryExists = exports.writeFile = exports.getFolderContents = exports.getFilesFromFolder = void 0;
const fs = __importStar(require("fs"));
const pathUtil = __importStar(require("path"));
const getFilesFromFolder = (path) => {
    const files = fs.readdirSync(path, { withFileTypes: true })
        .filter(file => file.isFile());
    return files.map(file => {
        const fileContents = (0, exports.readFile)(path + file.name);
        return {
            name: file.name,
            contents: fileContents
        };
    });
};
exports.getFilesFromFolder = getFilesFromFolder;
const getFolderContents = (path) => {
    return fs.readdirSync(path);
};
exports.getFolderContents = getFolderContents;
const writeFile = (path, contents) => {
    ensureFileDirectoryExists(path);
    fs.writeFileSync(path, contents);
};
exports.writeFile = writeFile;
function ensureDirectoryExists(path) {
    if (fs.existsSync(path)) {
        return;
    }
    const containingDirectory = pathUtil.dirname(path);
    ensureDirectoryExists(containingDirectory);
    fs.mkdirSync(path);
}
exports.ensureDirectoryExists = ensureDirectoryExists;
function ensureFileDirectoryExists(filePath) {
    const containingDirectory = pathUtil.dirname(filePath);
    ensureDirectoryExists(containingDirectory);
}
exports.ensureFileDirectoryExists = ensureFileDirectoryExists;
function checkIfExists(path) {
    return fs.existsSync(path);
}
exports.checkIfExists = checkIfExists;
function copyFile(source, destination) {
    fs.copyFileSync(source, destination);
}
exports.copyFile = copyFile;
const deleteFile = (path) => {
    if (fs.existsSync(path)) {
        return fs.unlinkSync(path);
    }
};
exports.deleteFile = deleteFile;
const deleteDirectory = (path) => {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true, force: true });
    }
};
exports.deleteDirectory = deleteDirectory;
const readFile = (path) => {
    return fs.readFileSync(path, "utf-8");
};
exports.readFile = readFile;
