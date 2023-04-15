export interface Song {
    title: string,
    date: string,
    author: string,
    divide: number,
    bpm: number,
    comment: string,
    cVol: number[],
    wave: (number | Float32Array[])[],
    delay: number[],
    sampleData: any[],
    seq: any[],
    trans?: number,
    ptrn?: any[]
}