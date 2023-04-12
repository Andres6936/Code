import {arst, crc8, eee} from "./useLogic";

export interface HookUseLoad {
    board: number[],
    hash: string
}

export function useLoad(str2: string): HookUseLoad {
    if (!str2) {
        // return
    }
    //   console.log(arst(str2) );
    // decode base64 to string
    var err = 0;
    //var str = atob(str2);
    // console.log(str2)
    var arr = arst(atob(str2));
    // console.log(arr)
    //var arr = arrstr(str);

    // @ts-ignore
    arr = [arr[0]].concat(eee(arr.slice(1), [arr[0]]));
    var hex = Array.prototype.map.call(arr, x => ('00' + x.toString(16).toUpperCase()).slice(-2)).join(' ');
    //   console.log(arr.length, hex);
    // load nibble-frames into data array
    for (var i = 1, data = [], sum, sum2; i < arr.length; i++) {
        const byte = arr[i];
        const nib1 = (byte & 0xF0) >> 4;
        const nib2 = byte & 0x0F;
        data.push(nib1);
        // if the last nibble is 0, skip it (for odd nibble counts)
        if (i === arr.length - 1 && nib2 === 0) break;
        data.push(nib2);
    }
    sum = arr[0];
    sum2 = crc8(arr.slice(1));
    if (sum !== sum2) {
        err++;
        console.error("ERROR:", "Data checksum is invalid.");
    }
    // check data
    for (var t = 0, i = 0, last = 0; i < data.length; i++) {
        const c = data[i];
        // Check code 15 ----------------------------------------------------------
        if (c === 15 && data[i + 1] !== undefined && data[i + 2] !== undefined) {
            var digit = (data[i + 1] << 4) + data[i + 2];
            if (digit < 16 || digit > 80) {
                err++;
                console.error("ERROR:", "At position:", i, "Code 15 has bad size:", digit);
            }
        } else if (c === 15 && (data[i + 1] === undefined || data[i + 2] === undefined)) {
            err++;
            console.error("ERROR:", "At position:", i, "Code 15 is missing data");
            break;
        }
        // Check code 14 ----------------------------------------------------------
        if (c === 14 && data[i + 1] !== undefined) {
            var digit = data[i + 1];
            if (digit < 6) {
                err++;
                console.error("ERROR:", "At position:", i, "Code 14 has bad size:", digit);
            }
        } else if (c === 14 && data[i + 1] === undefined) {
            err++;
            console.error("ERROR:", "At position:", i, "Code 14 is missing data");
            break;
        }
        // Check for repeating compression codes
        if (
            ((c > 9 && c < 16)) &&
            ((last > 9 && last < 16))
        ) {
            err++;
            console.error("ERROR:", "At position:", i, "Compression code repeat: ", "current:" + c, "last:" + last);
        }
        last = c;
        // Check how many cells represented in the data
        switch (c) {
            case 0xA:
                t += 2;
                break;
            case 0xB:
                t += 3;
                break;
            case 0xC:
                t += 4;
                break;
            case 0xD:
                t += 5;
                break;
            case 0xE:
                t += data[i + 1];
                i += 1;
                break;
            case 0xF:
                t += (data[i + 1] << 4) + data[i + 2];
                i += 2;
                break;
            default :
                t += 1;
        }
        if (t > 81) {
            err++;
            console.error("ERROR:", "Data contains more than 81 cells.");
            break;
        }
    }
    // @ts-ignore
    if ((last > 9 && last < 16)) {
        err++;
        console.error("ERROR:", "Compression code cannot be final frame in sequence.");
    }
    if (err > 0) {
        // input.style.border = "1px solid red";
        //input.style.background = "#FFF7F7";
        // return false;
    } else {
        // input.style.border = "";
        //input.style.background = "";
    }

    const board: number[] = new Array(81);

    // info.innerHTML = "puzzHash: <code>" + cksm(arr).toString(36) + "</code>";
    for (var i = 0, k = 0, t = 0, y; i < 81; i++, k++) {
        switch (data[k]) {
            case 0xA:
                y = 1;
                t = 2;
                break;
            case 0xB:
                y = 1;
                t = 3;
                break;
            case 0xC:
                y = 1;
                t = 4;
                break;
            case 0xD:
                y = 1;
                t = 5;
                break;
            case 0xE:
                y = 2;
                t = data[k + 1];
                break;
            case 0xF:
                y = 3;
                t = (data[k + 1] << 4) + data[k + 2];
                break;
            default :
                y = 0;
                t = 0;
        }
        for (let j = 0; j < t; j++, i++) {
            board[i] = 0;
        }

        k += y;

        board[i] = data[k] ? data[k] : 0
    }

    return {board: board, hash: str2}
}