"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacementFunctions = exports.Entity = void 0;
const util_1 = require("./util");
class Entity {
    constructor(name) {
        this.snakeCaseName = "";
        this.getSnakeCase = () => {
            return this.snakeCaseName;
        };
        this.getKebabCase = () => {
            return (0, util_1.replaceAll)(this.snakeCaseName, "_", "-");
        };
        this.getPascalCase = () => {
            return this.snakeCaseName.split("_").map((word, index) => {
                return word[0].toUpperCase() + word.slice(1);
            }).join("");
        };
        this.getCamelCase = () => {
            return this.snakeCaseName.split("_").map((word, index) => {
                if (index == 0) {
                    return word;
                }
                return word[0].toUpperCase() + word.slice(1);
            }).join("");
        };
        this.getLowerCase = () => {
            return (0, util_1.replaceAll)(this.snakeCaseName.toLowerCase(), "_", "");
        };
        this.getUpperCase = () => {
            return (0, util_1.replaceAll)(this.snakeCaseName.toUpperCase(), "_", "");
        };
        if (name.includes("-")) {
            this.snakeCaseName = (0, util_1.replaceAll)(name, "-", "_");
        }
        else {
            this.snakeCaseName = name;
        }
    }
}
exports.Entity = Entity;
exports.replacementFunctions = [
    "getSnakeCase",
    "getCamelCase",
    "getPascalCase",
    "getLowerCase",
    "getUpperCase",
    "getKebabCase",
];
