class Suduko {
    constructor() {
        this.i = 0 
        this.j = 0 
        this.q = 0 
        this.opt = 0 
        this.row = 0 
        this.spot = 0 
        this.weak = 0 
        this.current = 0 
        this.tmp = 0 
        this.badFlag = 0 
    }
    scramble(arr) { //returns array in scrambled order
        let i, len, obj, sorter, rnd, res;
        obj = {};
        sorter = [];
        res = [];
        len = arr.length;
        i = 0;
        while (i < len) {
            rnd = Math.random() + "";
            if (obj[rnd]) {
                continue;
            }
            obj[rnd] = arr[i];
            i++;
            sorter.push(rnd);
        }
        sorter = sorter.sort();
        for (i = 0; i < len; i++) {
            res.push(obj[sorter[i]]);
        }
        return res;
    }

    //=================================


    join(a1, a2) { //joins two arrays but strains out duplicate values
        let arr, i, len, v;
        arr = a1.concat(a2);
        len = arr.length;
        for (i = 0; i < len; i++) {
            v = arr.shift();
            if (arr.indexOf(v) !== -1) {
                continue;
            }
            arr.push(v);
        }
        return arr;
    }

    getColumn(off) { //gets all values in the specified column
        let i, arr, v;
        arr = [];
        for (i = 0; i < 9; i++) {
            v = this.q[i][off];
            if (v !== 0) {
                arr.push(v);
            }
        }
        return arr;
    }

    getRow(off) { //gets all values in a row
        let i, arr, v;
        arr = [];
        for (i = 0; i < 9; i++) {
            v = this.q[off][i];
            if (v !== 0) {
                arr.push(v);
            }
        }
        return arr;
    }

    invert(arr) { //gives all values that are NOT in the argument array
        let i, res, b = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        b = this.scramble(b);
        res = [];
        for (i = 0; i < 9; i++) {
            if (arr.indexOf(b[i]) === -1) {
                res.push(b[i]);
            }
        }
        return res;
    }

    getGrid(col, row) { //gives all the current values in the 3X3 box to which it belongs
        let res, i, j, v;
        let jmp = [0, 3, 6, 9];
        res = [];
        col = Math.floor(col / 3);
        col = jmp[col];
        row = Math.floor(row / 3);
        row = jmp[row];

        for (i = row; i < (row + 3); i++) {
            for (j = col; j < (col + 3); j++) {
                v = this.q[i][j];
                if (res.indexOf(v) === -1 && v !== 0) {
                    res.push(v);
                }
            }
        }
        return res;
    }

    getSet(c, r) { //get all current possible valid options for the position
        let a, b;
        a = this.getGrid(c, r);
        b = this.getRow(r);
        c = this.getColumn(c);
        a = this.join(a, b);
        a = this.join(a, c);
        a = this.invert(a);
        return a;
    }

    init() { //build the 2D array and set all values to zero
        let i, j;
        this.q = [];
        for (i = 0; i < 9; i++) {
            this.q[i] = [];
            for (j = 0; j < 9; j++) {
                this.q[i][j] = 0;
            }
        }
    }
    main(dificulty) {
         //======== loop until the heuristic provides a valid puzzle
        do {
            this.init();
            this.opt = this.scramble([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            for (let i = 0; i < 9; i++) {
                this.q[0][i] = this.opt[i];
            }
            this.opt = this.opt.slice(3, 9);
            this.opt = this.scramble(this.opt);

            for (let i = 0; i < 3; i++) {
                this.q[1][i] = this.opt[i];
                this.q[2][i] = this.opt[(i + 3)];
            }

            this.badFlag = false;

            for (this.row = 1; this.row < 9; this.row++) {
                while (true) {
                    this.tmp = this.getRow(this.row);
                    if (this.tmp.length === 9) {
                        break;
                    }
                    this.weak = 10;
                    for (let i = 0; i < 9; i++) {
                        if (this.q[this.row][i] !== 0) {
                            continue;
                        }
                        this.tmp = this.getSet(i, this.row);
                        if (this.tmp.length < this.weak) {
                            this.weak = this.tmp.length;
                            this.spot = i;
                        }
                    }
                    this.current = this.getSet(this.spot, this.row);
                    if (this.current.length === 0) { //heuristic failed--try again
                        this.badFlag = true;
                        break;
                    }
                    this.tmp = this.current.pop();
                    this.q[this.row][this.spot] = this.tmp;
                }

                if (this.badFlag) {
                    break;
                }

            } //end of row
        } while (this.badFlag);

        //==================
        for (let i=0 ; i<dificulty ; i++) {
            this.q[this.getRandomNumber()][this.getRandomNumber()] = 0
        }
        return this.q;
    }

    getRandomNumber() {
        let n = -1 + Math.ceil(Math.random() * 8)
        return (n > -1 && n < 9 ? n : 1)
    }
    
}

export default Suduko