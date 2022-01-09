export const isEmptyObject = (obj: object): boolean => {
    return !Object.keys(obj).length;
};

export function onlyUnique(value: object, index: number, self: any[]) { 
    return self.indexOf(value) === index;
}

export function orderByAscending<T>(array: T[], fn: (a: T) => number) {
    array.sort((a: T, b: T) => {
        return fn(a) - fn(b)
    })

    return array
}

export function orderByDescending<T>(array: T[], fn: (a: T) => number): T[] {
    array.sort((a: T, b: T) => {
        return fn(b) - fn(a)
    })

    return array
}

export function matchAll(str: string, regex: RegExp) {
    let result = [];
    let m;
    if (regex.global) {
        while (m = regex.exec(str)) {
            result.push(m[0]);
        }
    } else {
        if (m = regex.exec(str)) {
            result.push(m[0]);
        }
    }
    return result;
}

export function replaceAll(str: string, find: string, replace: string) {
    const sanitized = find.replace(/\W/g, "\\$&") 

    return str.replace(new RegExp(sanitized, 'g'), replace);
}
  
export function sum(array: number[]) {
    return array.reduce((acc, value) => acc + value, 0)
}

export function average(array: number[]) {
    if (array.length == 0) {
        return 0
    }

    return sum(array) / array.length
}

export function concatNotNull(...array: (string | null)[]) {
    return array
        .filter(item => item != null)
        .join("")
}