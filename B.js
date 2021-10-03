// S = n * (2**x - 1) + n * (n-1) / 2
// n - кол-во команд попавших во второй тур (нечетный делитель s)
// x - количество шагов(этапов) первого тура
// S - всего боёв

function solve(input) {
    //battle counts
    let bCount = +input
    if (bCount <= 0 || bCount === 2 || bCount === 4 || bCount === 5 || bCount > 10**18) {
        return -1
    }
    if (bCount === 1) {
        return 2
    }

    const result = [];
    const factors = getFactors(bCount)

    factors.forEach(n => {
        if (n % 2 === 0) {
            return
        }
        let x = calc(bCount, n);
        if (x % 1) {
            return
        }
        if (validate(x, n) === bCount) {
            result.push(n*(2**x));
        }
    })

    if (!result.length) {
        return -1
    }

    for (let i = 0; i < result.sort((a,b) => a -b).length - 1; i++) {
        console.log(result[i])
    }
    return result[result.length - 1];

}


//
function calc(bCount, n) {
    return Math.log2(bCount / n - (n - 1) / 2 + 1)
}

//https://stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
function getFactors(num) {
    const maxFactorNum = Math.floor(Math.sqrt(num))
    const factorArr = []
    let count = 0  //count of factors found < maxFactorNum.

    for (let i = 1; i <= maxFactorNum; i++) {
        //inserting new elements in the middle using splice
        if (num % i === 0) {
            factorArr.splice(count, 0, i)
            let otherFactor = num / i //the other factor
            if (i !== otherFactor) {
                //insert these factors in the front of the array
                factorArr.splice(-count, 0, otherFactor);
            }
            count++;
        }
    }

    //swapping first and last elements
    let lastIndex = factorArr.length - 1
    let temp = factorArr[lastIndex]
    factorArr[lastIndex] = factorArr[0]
    factorArr[0] = temp

    return factorArr
}

function validate(x, n) {
    return n * (2**x - 1) + n * (n-1) / 2
}

const fs = require('fs')
const input = fs.readFileSync(0, 'utf-8')
console.log(solve(input))