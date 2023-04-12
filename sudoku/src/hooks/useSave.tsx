import {crc8, eee, arst} from "./useLogic";

export function useSave(board: readonly number[]): string {
    for (var i = 0, j = 0, data = []; i < board.length; i++) {
        var c = board[i] || 0;
        if (c === 0) j++;
        else {
            switch (true) {
                case j == 2:
                    data.push(0xA);
                    break;
                case j == 3:
                    data.push(0xB);
                    break;
                case j == 4:
                    data.push(0xC);
                    break;
                case j == 5:
                    data.push(0xD);
                    break;
                case j > 15:
                    data.push(0xF, j >> 4, j & 0xF);
                    break;
                case j > 5 :
                    data.push(0xE, j);
                    break;
                default  :
                    while (j--) data.push(0);
            }
            j = 0;
            data.push(c);
        }
    }
    var packed = [];
    for (var i = 0, len = data.length; i < len; i += 2) {
        var b = (i !== len - 1) ? data[i + 1] : 0; // 0 for missing nibble
        // @ts-ignore
        packed.push((data[i] << 4) + b);
    }

    var crc = crc8(packed);
    var output = [crc].concat(eee(packed, [crc]));
    return btoa(arst(output)).replace(/=/g, "");
}