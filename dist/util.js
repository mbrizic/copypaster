"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatNotNull = exports.average = exports.sum = exports.replaceAll = exports.matchAll = exports.orderByDescending = exports.orderByAscending = exports.onlyUnique = exports.isEmptyObject = void 0;
const isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
};
exports.isEmptyObject = isEmptyObject;
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
exports.onlyUnique = onlyUnique;
function orderByAscending(array, fn) {
    array.sort((a, b) => {
        return fn(a) - fn(b);
    });
    return array;
}
exports.orderByAscending = orderByAscending;
function orderByDescending(array, fn) {
    array.sort((a, b) => {
        return fn(b) - fn(a);
    });
    return array;
}
exports.orderByDescending = orderByDescending;
function matchAll(str, regex) {
    let result = [];
    let m;
    if (regex.global) {
        while (m = regex.exec(str)) {
            result.push(m[0]);
        }
    }
    else {
        if (m = regex.exec(str)) {
            result.push(m[0]);
        }
    }
    return result;
}
exports.matchAll = matchAll;
function replaceAll(str, find, replace) {
    const sanitized = find.replace(/\W/g, "\\$&");
    return str.replace(new RegExp(sanitized, 'g'), replace);
}
exports.replaceAll = replaceAll;
function sum(array) {
    return array.reduce((acc, value) => acc + value, 0);
}
exports.sum = sum;
function average(array) {
    if (array.length == 0) {
        return 0;
    }
    return sum(array) / array.length;
}
exports.average = average;
function concatNotNull(...array) {
    return array
        .filter(item => item != null)
        .join("");
}
exports.concatNotNull = concatNotNull;
