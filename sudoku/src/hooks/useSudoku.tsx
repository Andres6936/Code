export type UseSudoku = [number[], number[]]

export function useSudoku(): UseSudoku {
    let boardSolution: number[];

// not what i thought it was, but keeping it here
    function normalize() {
        let row1 = boardSolution.slice(0, 9);
        for (let i = 0; i < boardSolution.length; i++) {
            switch (boardSolution[i]) {
                case row1[0]:
                    boardSolution[i] = 1;
                    break;
                case row1[1]:
                    boardSolution[i] = 2;
                    break;
                case row1[2]:
                    boardSolution[i] = 3;
                    break;
                case row1[3]:
                    boardSolution[i] = 4;
                    break;
                case row1[4]:
                    boardSolution[i] = 5;
                    break;
                case row1[5]:
                    boardSolution[i] = 6;
                    break;
                case row1[6]:
                    boardSolution[i] = 7;
                    break;
                case row1[7]:
                    boardSolution[i] = 8;
                    break;
                case row1[8]:
                    boardSolution[i] = 9;
                    break;
            }
        }
    }

    function rotate() {
        let size = 9, result = [];
        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                result[i * size + j] = boardSolution[(size - j - 1) * size + i];
            }
        }
        boardSolution = result;
    }

    function shuffle(arr: number[]) {
        for (var v, s = arr.length; s;) {
            v = 0 | Math.random() * s--;
            [arr[s], arr[v]] = [arr[v], arr[s]];
        }
    }


    function swapRows(puz: number[], fr: number, to: number) {
        var a1 = fr * 9, a2 = a1 + 9, b1 = to * 9, b2 = b1 + 9;
        for (var i = 0, newp = []; i < puz.length; i++) {
            i >= a1 && i < a2 ? newp.push(puz[i - a1 + b1]) :
                i >= b1 && i < b2 ? newp.push(puz[i - b1 + a1]) :
                    newp.push(puz[i]);
        }
        return newp;
    }

    function swapCols(puz: number[], fr: number, to: number) {
        var fCol = [], tCol = [];
        for (var i = fr; i < fr + 81; i += 9) fCol.push(puz[i]);
        for (var i = to; i < to + 81; i += 9) tCol.push(puz[i]);
        for (var i = 0, newp = []; i < puz.length; i++) {
            i % 9 === fr ? newp.push(tCol[i / 9 | 0]) :
                i % 9 === to ? newp.push(fCol[i / 9 | 0]) :
                    newp.push(puz[i]);
        }
        return newp;
    }

    // Start with a complete valid Sudoku
    boardSolution = [
        1, 6, 7, 9, 8, 5, 2, 3, 4,
        8, 4, 5, 2, 3, 1, 9, 6, 7,
        9, 3, 2, 4, 7, 6, 5, 8, 1,

        3, 5, 9, 1, 4, 8, 6, 7, 2,
        4, 2, 1, 6, 5, 7, 8, 9, 3,
        7, 8, 6, 3, 2, 9, 4, 1, 5,

        2, 9, 8, 7, 1, 4, 3, 5, 6,
        5, 1, 3, 8, 6, 2, 7, 4, 9,
        6, 7, 4, 5, 9, 3, 1, 2, 8
    ];

    // Rotate 90 degrees (50% chance)
    if (Math.random() > .5) rotate();

    // Swap a Number with another Number 81 times.
    var num = [];
    for (let i = 1; i <= 9; i++) num.push(i);
    for (let i = 0, num2; i < 81; i++) {
        shuffle(num);
        num2 = num.slice(-2);
        //console.log(num, num2)
        for (let i = 0; i < boardSolution.length; i++) {
            switch (boardSolution[i]) {
                case num2[0]:
                    boardSolution[i] = num2[1];
                    break;
                case num2[1]:
                    boardSolution[i] = num2[0];
                    break;
            }
        }
    }

    // Swap a Row or Column 81 times.
    for (var i = 0; i < 81; i++) {
        var idx = (Math.random() * 3 | 0) * 3, set = [idx + 0, idx + 1, idx + 2];
        shuffle(set);
        var swap = set.slice(-2);
        boardSolution = Math.random() > .5 ? swapRows(boardSolution, swap[0], swap[1]) : swapCols(boardSolution, swap[0], swap[1])
    }

    function* solver(board: number[]) {
        const masks = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256],
            rows = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            cols = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            blks = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            row = (n: number) => n / 9 | 0,
            col = (n: number) => n % 9,
            blk = (n: number) => 3 * (n / 27 | 0) + (n % 9 / 3 | 0);

        for (let i = 0; i < 81; i++) {
            const mask = masks[board[i]];
            rows[row(i)] |= mask,
                cols[col(i)] |= mask,
                blks[blk(i)] |= mask;
        }

        function* solve(i: number): Generator<number[]> {
            if (i === 81) return yield board;
            if (board[i] !== 0) return yield* solve(i + 1);
            const r = row(i), c = col(i), b = blk(i), used = rows[r] | cols[c] | blks[b];
            for (let v = 1; v <= 9; v++) {
                const mask = masks[v];
                if (used & mask) continue;
                rows[r] |= mask,
                    cols[c] |= mask,
                    blks[b] |= mask;
                board[i] = v;
                yield* solve(i + 1);
                rows[r] &= ~mask,
                    cols[c] &= ~mask,
                    blks[b] &= ~mask;
                board[i] = 0;
            }
        }

        yield* solve(0);
    }

    var count = 0;

    function mask(puzzle: number[]): number[] {
        //console.log("Te");
        let ct = 0,
            ls = [...Array(81).keys()].map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]),
            npuzz = puzzle.slice();
        // console.log(ls)
        for (var i = 0, cnt = 40; i < cnt; i++) npuzz[ls[i]] = 0;
        for (var sol of solver(npuzz)) if (ct++, ct > 1) break;

        count++;
        //console.log(sol)
        return ct === 1 ? npuzz : mask(puzzle);
    }

    function remove(puzzle: number[], removals: number[]): number[] {

        var prior = puzzle.slice();

        // Remove one number
        //console.log("REMOVING ", removals[0], puzzle[ removals[0] ]);
        puzzle[removals[0]] = 0;
        removals.shift();

        // Try to Solve it
        var ct = 0;
        for (var sol of solver(puzzle.slice())) if (ct++, ct > 1) break;

        // If removal results in multiple solutions, undo
        if (ct !== 1) puzzle = prior;


        //console.log(ct)

        wtf++;
        //  count++;

        return wtf > 20 ? prior : remove(puzzle, removals);
    }

    var wtf = 0;
    var ls = [];
    var boardIncognitos: number[] = mask(boardSolution);

    for (var i = 0; i < boardIncognitos.length; i++) if (boardIncognitos[i]) ls.push(i)
    shuffle(ls)
    //console.log(ls, outp[ls[0]])

    console.log(boardIncognitos.join(""))
    boardIncognitos = remove(boardIncognitos, ls);
    console.log(boardIncognitos.join(""))
    console.log("iterations: ", count)
    console.log('Sudoku Generated:', boardIncognitos.toString().replace(/,/g, ''));
    // loadPuzzle(savePuzzle());

    return [
        // The board with the incognitos.
        boardIncognitos,
        // The board with the solution.
        boardSolution
    ]
}
