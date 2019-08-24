import Suduko from './SudokuGenerator'

export const getSudukuProblem = (dificulty) => {
    let arr = new Suduko().main(dificulty)
    return arr
    // return arr = [
    //   [2, 3, 0, 4, 1, 5, 0, 6, 8],
    //   [0, 8, 0, 2, 3, 6, 5, 1, 9],
    //   [1, 6, 0, 9, 8, 7, 2, 3, 4],
    //   [3, 1, 7, 0, 9, 4, 0, 2, 5],
    //   [4, 5, 8, 1, 2, 0, 6, 9, 7],
    //   [9, 2, 6, 0, 5, 8, 3, 0, 1],
    //   [0, 0, 0, 5, 0, 0, 1, 0, 2],
    //   [0, 0, 0, 8, 4, 2, 9, 0, 3],
    //   [5, 9, 2, 3, 7, 1, 4, 8, 6]
    // ]
};


export const Helper = {
    isValidArray: (inputArr) => {
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
    },

    isValidSuduku: (validations) => {
      for (let i in validations) {
          if (!Helper.isValidArray(validations[i])) {
              return false
          }
      }
      return true
    },

    getValidations: (arr) => {
      let validations = {}
      //bock 3x3 validation
      let j = 0, min = 0
      for (let i=0;i<9;i++) {
          validations[ 'blockValidation' + i ] = Helper.concatArr(arr[j].slice(min, min+3), arr[j+1].slice(min, min+3), arr[j+2].slice(min, min+3))
          j += 3
          if (j === 9) {
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
    },

    concatArr: (...arg) => {
        let arr = []
        for (let i in arg) {
            arr = arr.concat(arg[i])
        }
        return arr
    },
    
    checkSudukuFinished: (arr) => {
        for (let i=0 ; i<9 ; i++) {
            for (let j=0 ; j<9 ; j++) {
                if (arr[i][j] === 0)
                    return false
            }
        }
        return true
    }
}