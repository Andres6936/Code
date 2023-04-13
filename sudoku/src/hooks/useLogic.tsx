
function bmap(val: string | any[], mode = 0) {
    var i, data = mode ? [...val].map(a => a.charCodeAt()) : val.slice(),
        tbl = [
            0x22, 0x26, 0x27, 0x3C, 0x3E, 0xB8, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
            0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19,
            0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x7F, 0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87,
            0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8D, 0x8E, 0x8F, 0x90, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97,
            0x98, 0x99, 0x9A, 0x9B, 0x9C, 0x9D, 0x9E, 0x9F, 0xA0, 0xAD
        ];
    for (i = 0; i < val.length; i++) {
        const idx = tbl.indexOf(data[i]);
        if (mode ? data[i] > 255 : idx > -1) {
            // @ts-ignore
            data[i] = mode ? tbl[data[i] - 0x100] : 0x100 + idx;
        }
    }
    // @ts-ignore
    return mode ? data : String.fromCharCode.apply(0, data);
}

// Overload definition for specify the conditional type return
export function arst (a: string) : number[]
export function arst (a: number[]) : string

export function arst (a: string | number[]) : number[] | string {
    return typeof a === "string" ? [...a].map(a => a.charCodeAt(0)) : String.fromCharCode.apply(0, a)
}

function cksm(d: string | any[]) {
    let s;
    for (var i = s = 0; i < d.length; ++i) s += (s << 1) + d[i];
    s ^= s << 9;
    s ^= s << 16;
    return s >>> 0
}

export function eee(r: number[], e: number[]) {
    for (var n, f = [], o = 0, t = [], h = 0; 256 > h; h++) f[h] = h;
    for (h = 0; 256 > h; h++) o = (o + f[h] + e[h % e.length]) % 256, n = f[h], f[h] = f[o], f[o] = n;
    h = 0, o = 0;
    for (var u = 0; u < r.length; u++) h = (h + 1) % 256, o = (o + f[h]) % 256, n = f[h], f[h] = f[o], f[o] = n, t.push(r[u] ^ f[(f[h] + f[o]) % 256]);
    return t
}

export const crc8 = function (data) {
    for (var i = 256, tbl: number[] = [], crc, j; i--; tbl[i] = crc & 0xFF) {
        j = 8;
        for (crc = i; j--;) crc = crc & 128 ? (crc << 1) ^ 0x5a : crc << 1;
    }
    return function (data: number[]) {
        for (var i = 0, crc = 0; i < data.length; ++i)
            crc = tbl[(crc ^ data[i]) % 256];
        return crc;
    }
}();
