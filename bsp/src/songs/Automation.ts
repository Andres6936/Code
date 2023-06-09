import { Song } from "../types/Song"

export function useAutomation() {
    const SONG: Song = {} as Song
    
    SONG.title = "automation"
    SONG.author = "bryc"
    SONG.date = "feb-22-2018"
    SONG.comment = "A cover of Adam Szabo - One Day.<br>Implemented noise, PWM, LFO, filter and delay<br>Updated on may-04-2019 to allow independent control of parameters."
    SONG.bpm = 112
    SONG.divide = 4
    SONG.cVol = [.3, .3, .3]
    SONG.wave = [5, 5, 4]
    SONG.delay = [.22, .22, .22]

    var noiseData = [];
    for (var i = 0; i < 4096; i++) noiseData.push(Math.random() * 2);

    SONG.sampleData = []
    SONG.sampleData[2] = [44100, noiseData]

    var bass = [
        ['c-3', , 0.71], , ['c-4'], -1, // bar 1
        , , ['a#3', , 0.64], ['c-4'],
        -1, ['a#3', , 0.41], -1, ['d#4'],
        , , , ['c-4', , 0.25],
        ['f-3'], , ['d#4'], -1, // bar 2
        ['f-4'], , ['d#4', , 0], ['c-4'],
        -1, ['a#3'], -1, ['g#4'],
        , ['c-5', , 0.1], -1, ['f-4'],
        ['g#3'], , , ['g#4'], // bar 3
        -1, ['c-4'], -1, ['c-4', , 0.44],
        ['g#3'], , ['g#4'], -1,
        ['c-5'], , ['g#4'], ,
        ['g-3', , 0.73], , -1, ['g-3'], // bar 4
        ['b-3'], , ['b-4'], -1,
        ['f-4', , 0.27], , ['f-5'], -1,
        ['d#4'], , ['g#3'], ,
    ]

    var lead = [
        ['g-6', , 0.71, 9, 7000], , ['f-6', , , 0, 3000], ['g-6'], // bar 1
        ['f-6', , 0.64, 3, 6000], , ['d#6', , , 0, 2000], ['f-6'],
        ['d#6', , 0.41, 7, 5000], , ['d-6', , , 0, 1000], ['d#6'],
        ['d-6', , 0.25, , 4000], , ['c-6', , , , 2500], ,
        , , ['c-6', , , 9], , // bar 2
        , -1, ['c-6', , 0.1, 0, 4000], -1,
        ['a#5', , , , 6000], , ['a#5', , , 8], ,
        ['g-6', , 0.44, 0, 2500], -1, ['a#5', , , , 3000], ,
        , , , ['a#5', , , 5], // bar 3
        , , ['c-6', , , 0, 6000], ,
        , ['c-6', , , 5], , ,
        ['g-5', , , 0, 5000], , ['a#5', , , , 7000], ,
        ['d-6', , 0.73, , 6000], , ['d-6', , , 5], , // bar 4
        , , ['d#6', , , 0], ['f-6'],
        ['g#5', , 0.27, 3, 7500], , , ,
        ['a#5', , , , 4000], , ['g-5', , , , 1000], ,
    ]

    var noise = [
        , , , , // bar 1
        ['f-4'], -1, , ,
        , , , ,
        ['c-2'], -1, ['c-5'], -1,
        , , , , // bar 2
        ['c-5'], -1, , ,
        , , , ,
        ['c-2'], ['c-3'], -1, ['c-5'],
        -1, , , , // bar 3
        ['c-5'], -1, , ,
        , , , ,
        ['c-2'], -1, , ['c-5'],
        -1, ['c-2'], ['c-3'], -1, // bar 4
        ['c-5'], -1, , ['c-3'],
        ['c-5'], ['c-1'], -1, ['c-4'],
        ['c-2'], ['c-3'], ['c-5'], -1,
    ]

    SONG.seq = [bass, lead, noise]

    return SONG;
}