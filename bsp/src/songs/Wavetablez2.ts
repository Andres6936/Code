import {Song} from "../types/Song"

export function useWavetablez2() {
    const SONG: Song = {} as Song

    function bT() {
        for (var i = 0, out = []; i < arguments.length; i++) {
            var item = arguments[i];
            if (typeof item === 'number' && SONG.ptrn[item] !== undefined)
                item = SONG.ptrn[item];
            if (Array.isArray(item)) out = out.concat(item);
        }
        return out;
    }

    var mb32 = s => t => (s = s + 1831565813 | 0, t = Math.imul(s ^ s >>> 15, 1 | s), t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, (t ^ t >>> 14) >>> 0) / 2 ** 32;
    var rand1 = mb32(3657)
    var rand2 = mb32(763)
    var rand3 = mb32(246)
    var rand4 = mb32(49)
    var rand5 = mb32(133)


    /* ----------------------------- */
    SONG.title = "wavetablez2"
    SONG.author = "bryc"
    SONG.date = "aug-21-2019"
    SONG.comment = "messing with single cycle waveforms (32 samples). seems to have an unhealthy bias toward high frequencies and appears to be interpolated. but there's potential."
    SONG.bpm = 84
    SONG.divide = 6
    SONG.cVol = [
        0.13, // arp
        0.14, // bass
        0.12, // noise
        0.14, // melo
        0.09, // arp2
        0.10] // bass2
    SONG.wave = [4, 4, 4, 4, 4, 4]
    SONG.delay = [.3, 0, 0, .36, .18, .3]


    SONG.sampleData = []
    SONG.sampleData[0] = [44100, [-.5, -.5, -.5, -.5, .75, .75, .75, .75, .75, .75, .75, .25, .25, .25, .25, .25, 0, 0, 0, -.75, -.75, -.75, -.75, -.75, .75, .75, .75, .25, .25, .25, 0, 0]]
    SONG.sampleData[1] = [44100, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]
    SONG.sampleData[2] = [44100, [...Array(2048)].map(q => rand1() * 2 - 1)]
    SONG.sampleData[3] = [44100, [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1]]
    SONG.sampleData[4] = [44100, [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1]]
    SONG.sampleData[5] = [44100, [1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, .5, .5, .5, .5, .5, .5, .5, -1, -1, -1, -1, -1, -1, -1, -1]]

    SONG.ptrn = [
        [
            ['c-6'], ['a#5'], ['g-5'], ['d-5'], ['g-5'], ['a#5'],
            ['c-6'], ['a#5'], ['g-5'], ['d-5'], ['g-5'], ['a#5'],
            ['c-6'], ['a#5'], ['f-5'], ['d-5'], ['f-5'], ['a#5'],
            ['c-6'], ['a#5'], ['f-5'], ['d-5'], ['f-5'], ['a#5'],
        ],
        [
            ['b-5'], ['a-5'], ['e-5'], ['b-4'], ['e-5'], ['a-5'],
            ['b-5'], ['a-5'], ['e-5'], ['b-4'], ['e-5'], ['a-5'],
            ['b-5'], ['g-5'], ['d-5'], ['b-4'], ['d-5'], ['g-5'],
            ['b-5'], ['g-5'], ['d-5'], ['b-4'], ['d-5'], ['g-5'],
        ],
        [
            ['b-5'], ['g#5'], ['e-5'], ['b-4'], ['e-5'], ['g#5'],
            ['b-5'], ['g#5'], ['e-5'], ['b-4'], ['e-5'], ['g#5'],
            ['d-6'], ['g-5'], ['e-5'], ['g-4'], ['e-5'], ['g-5'],
            ['d-6'], ['g-5'], ['e-5'], ['g-4'], ['e-5'], ['g-5'],
        ],
        [
            ['g-1'], , , , , -1,
            , , ['g-2'], ['g-1'], -1, ['g-2'],
            ['g-1'], , , , , -1,
            , , ['g-2'], ['g-1'], -1, ['g-2'],
        ],
        [
            ['g-1'], , , , -1, ['g-1'],
            -1, , ['g-2'], ['g-1'], -1, ['g-2'],
            ['g-1'], , , , -1, ['g-1'],
            -1, , ['g-2'], ['g-1'], -1, ['g-2'],
        ],
        [
            ['g-1'], , -1, ['g-1'], -1, ['g-1'],
            -1, , ['g-2'], ['g-1'], -1, ['g-2'],
            ['g-1'], -1, ['g-1'], ['g-2'], -1, ['g-1'],
            ['g-1'], -1, ['g-1'], ['g-2'], ['g-1'], ['g-2'],
        ],
        [
            ['d#1'], -1, ['d#1'], ['d#2'], -1, ['d#1'],
            ['d#1'], -1, ['d#1'], ['d#2'], ['a#1'], ['d#1'],
            ['g-1'], -1, ['g-1'], ['g-2'], -1, ['g-1'],
            ['g-1'], -1, ['g-1'], ['g-2'], ['d-2'], ['g-1'],
        ],
        [
            ['c-1'], -1, ['c-1'], ['c-2'], -1, ['c-1'],
            ['c-1'], -1, ['c-1'], ['c-2'], ['g-1'], ['c-1'],
            ['g-1'], -1, ['g-1'], ['g-2'], -1, ['g-1'],
            ['g-1'], -1, ['g-1'], ['g-2'], ['d-2'], ['g-1'],
        ],
        [
            ['e-1'], -1, ['e-2'], ['e-1'], -1, ['e-1'],
            ['e-2'], -1, ['e-1'], ['e-2'], ['e-1'], ['e-3'],
            ['e-1'], -1, ['e-2'], ['e-1'], -1, ['e-1'],
            ['e-2'], -1, ['e-1'], ['e-2'], ['e-1'], ['d-2'],
        ],
        [
            ['d-2'], , -1, ['b-3'], -1, ,
            , , -1, ['b-3'], -1, ['c-3'],
            ['d-2'], , -1, ['b-3'], -1, ,
            , , -1, ['b-3'], -1, ,
        ],
        [
            ['d-2'], , -1, ['b-3'], -1, ,
            ['d-2'], , -1, ['b-3'], -1, ,
            ['d-2'], , -1, ['b-3'], -1, ,
            ['d-2'], , -1, ['b-3'], -1, ,
        ],
        [
            ['a#4', , , 0], ['a#4', , , .03 / 2, ,], ['a#4', , , .05 / 2, ,], -1, ['d#4', , , 0, ,], ['f-4'],
            ['g-4'], , , ['c-5'], , ,
            ['d-5', , , 0, , 0], ['d-5', , , .03 / 2, ,], ['d-5', , , .05 / 2, ,], -1, , ,
            ['a#4', , , 0, ,], ['a#4', , , .03 / 2, ,], ['a#4', , , .05 / 2, ,], -1, , ,
        ],
        [
            ['g-4', , , 0], ['g-4', , , .03 / 2, ,], ['g-4', , , .05 / 2, ,], -1, ['c-4', , , 0, ,], ['d-4'],
            ['e-4'], , , ['a-4'], , ,
            ['b-4', , , 0, , 0], ['b-4', , , .03 / 2, ,], ['b-4', , , .05 / 2, ,], -1, , ,
            ['g-4', , , 0, ,], ['g-4', , , .03 / 2, ,], ['g-4', , , .05 / 2, ,], -1, , ,
        ],
        [
            ['g-4', , , 0, , 0], ['g-4', , , .03 / 2, ,], ['g-4', , , .05 / 2, ,], -1, ['c-4', , , 0, ,], ['d-4'],
            ['e-4', , , 0, , 0], , , ['a-4'], , ,
            ['b-4'], , ['a-4'], , -1, ,
            ['e-4'], , , -1, , ,
        ],
        [
            ['e-6'], ['e-5'], ['g#5'], ['b-4'], ['g#5'], ['e-5'],
            ['e-6'], ['g#5'], ['e-5'], ['b-4'], ['g#5'], ['e-5'],
            ['a-5'], ['e-5'], ['g-5'], ['g-4'], ['g-5'], ['e-5'],
            ['a-5'], ['e-5'], ['g-5'], ['g-4'], ['g-5'], ['e-5'],
        ],
        [
            ['e-3'], -1, ['e-4'], ['e-3'], -1, ['e-3'],
            ['e-4'], -1, ['e-3'], ['e-4'], ['e-3'], ['e-5'],
            ['e-3'], -1, ['e-4'], ['e-3'], -1, ['e-3'],
            ['e-4'], -1, ['e-3'], ['e-4'], ['e-3'], ['d-4'],
        ]
    ];

    SONG.seq = [
// arp
        bT(
            0, 0, 0, 0, 0, 0,
            0, 0, 1, 1,
            0, 0, 1, 1,
            0, 0, 1, 1,
            2, 2, 2, 2, 2, 2,
            [-1, , , , , ,]
        ),
// bass
        bT(
            Array(24 * 2), 3, 3, 4, 5,
            6, 6, 7, 7,
            6, 6, 7, 7,
            6, 6, 7, 7,
            8, 8, 8, 8, 8, 8,
            [['e-1'], , , , , -1]
        ),
// noise
        bT(
            Array(24 * 6),
            9, 9, 9, 9,
            9, 9, 9, 9,
            9, 9, 9, 10,
            9, 9, 9, 9, 9, 9,
            [, , , , , ,]
        ),
// melo
        bT(
            Array(24 * 10),
            11, 11, 12, 12,
            11, 11, 12, 13,
            Array(24 * 6),
            [, , , , , ,]
        ),
// arp overlay
        bT(
            Array(24 * 18),
            14, 14, 14, 14, 14, 14,
            [-1, , , , , ,]
        ),
// bass end high
        bT(
            Array(24 * 22), 15, 15,
            [['e-3'], , , , , -1]
        ),
    ]


//for(var i = 0; i < SONG.seq.length; i++) {
    //SONG.seq[i] = SONG.seq[i].slice(24*10)
//}

    /* ----------------------------- */
    return SONG;
    /* ----------------------------- */
}