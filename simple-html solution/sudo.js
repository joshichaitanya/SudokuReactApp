let arr =  [[2, 3, 0, 4, 1, 5, 0, 6, 8] ,
        [0, 8, 0, 2, 3, 6, 5, 1, 9] ,
        [1, 6, 0, 9, 8, 7, 2, 3, 4] ,
        [3, 1, 7, 0, 9, 4, 0, 2, 5] ,
        [4, 5, 8, 1, 2, 0, 6, 9, 7] ,
        [9, 2, 6, 0, 5, 8, 3, 0, 1] ,
        [0, 0, 0, 5, 0, 0, 1, 0, 2] ,
        [0, 0, 0, 8, 4, 2, 9, 0, 3],
        [5, 9, 2, 3, 7, 1, 4, 8, 6]]
console.log(arr)
let validations = getValidations(arr)
    
document.addEventListener("DOMContentLoaded", function() {
    console.log('isValidSuduku: ', isValidSuduku(validations))
    for (var i=0;i<9;i++) {
		for (var j=0;j<9;j++) {
            let domEle = document.getElementById('input-' + i + '-' + j)
            if (i === 2 || i === 5) {
                domEle.style.borderBottom = 'solid 4px'
            }
            if (j === 2 || j === 5) {
                domEle.style.borderRight = 'solid 4px'
            }
            domEle.value = arr[i][j] !== 0 ? arr[i][j] : ''
        }
    }
})

function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[1-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    } else {
        let i = evt.target.id.split('-')[1]
        let j = evt.target.id.split('-')[2]
        arr[i][j] = Number(key)
        validations = getValidations(arr)
        console.log('isValidSuduku: ', isValidSuduku(validations))
    }
}

// var arr  = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0] , [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

function isValidArray(inputArr) {
    let outputArr = Object.assign([], inputArr)
    outputArr.sort()
    let lastOne = 0
    for (let i=0;i<outputArr.length;i++) {
        let num = outputArr[i]
        if (num > 9 || num < 0 || (num !== 0 && num === lastOne)) {
            console.log(num)
            return false
        }
        lastOne = num
    }
    return true
}

function isValidSuduku(validations) {
    for (let i in validations) {
        if (!isValidArray(validations[i])) {
            document.getElementById('isValid').innerHTML = 'In-Valid'
            return false
        }
    }
    document.getElementById('isValid').innerHTML = 'Valid'
    return true
}

function getValidations(arr) {
    let validations = {}
    //bock 3x3 validation
    let j = 0, min = 0
    for (let i=0;i<9;i++) {
        validations[ 'blockValidation' + i ] = concatArr(arr[j].slice(min, min+3), arr[j+1].slice(min, min+3), arr[j+2].slice(min, min+3))
        j += 3
        if (j==9) {
            j = 0
            min += 3
        }
    }

    // horizontal / row validation
    for (let i=0;i<9;i++) {
        validations['horizontalValidation' + i] = arr[i]
    }

    // vertical / column validation
    for (let i=0;i<9;i++) {
        let tempArr = []
        for (let j=0;j<9;j++) {
            tempArr.push(arr[j][i])
        }
        validations['verticalValidation' + i] = tempArr
    }
    return validations
}


function concatArr(...arg) {
    var arr = []
    for (let i in arg) {
        arr = arr.concat(arg[i])
    }
    return arr
}














// function shuffle(array) {
//     return array.sort(() => Math.random() - 0.5);
// }

// let demoArr = shuffle([1,2,3,4,5,6,7,8,9])
// arr[0] = demoArr

// for(let i=0;i<9;i++) {
//     for(let j=0;j<9;j++) {
//         setNumber(i, j)
//     }
// }
// console.log(arr)

// function setNumber(i, j) {
//     for (let k=1;k<=9;k++) {
//         arr[i][j] = k
//         if (isValidSuduku()) return
//     }
// }
