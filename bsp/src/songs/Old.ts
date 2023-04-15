import {Song} from "../types/Song"

export function useOld() {
    const SONG: Song = {} as Song

    SONG.title = "Old"
    SONG.bpm = 256
    SONG.wave = [1]
    SONG.cVol = [0.18]

    SONG.seq = [[
        ["g#4"], ["g#2"], , , ["d#5"], 1,
        ["f#5"], ["c#2"], , 1, ["f5"], ["c#3"],
        , , 1, , ["g#5"], , , 1, , , ["f#5"], ,
        ["b2"], , , , ["d#5"], ["g#2"],
        ["a#4"], ["c#4"], , , ["f5"], ["g#2"],
        , , , 1, ["c#5"], 1, ["g#4"], , , 1, , ,
    ]]

    /* ----------------------------- */
    return SONG;
    /* ----------------------------- */
}