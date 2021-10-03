function solve(input) {
    let strArr = input.split(',');
    const result = [];
    let list = [];
    let prev;

    let numArr = Array.from(new Set(strArr.map(a => +a))).sort((a, b) => a - b);

    numArr.forEach(current => {
        if (prev && prev + 1 < current) {
            result.push(getStrFromList(list));
            list = [];
        }

        list.push(current);
        prev = current;
    })

    const resultStr = getStrFromList(list);
    if (resultStr) {
        result.push(resultStr);
    }
    return result.join(',');
}

function getStrFromList(list) {
    if (list.length > 1) {
        return `${list[0]}-${list[list.length - 1]}`;
    }

    if (!list.length) {
        return '';
    }
    return `${list[0]}`;
}

const fs = require('fs')
const input = fs.readFileSync(0, 'utf-8')
console.log(solve(input))