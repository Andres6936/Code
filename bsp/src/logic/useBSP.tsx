import {useEffect, useMemo, useState} from "react";
import {Optional} from "typescript-optional";
import {Song} from "../types/Song";
import {PulseOscillator, useCreatePulseOscillator} from "./useCreatePulseOscillator";

export function useBSP() {
    const [currentSong, setCurrentSong] = useState<Optional<Song>>(Optional.empty());

    // Generate equal temperment frequencies
    const frequencie: Record<string, number> = useMemo(() => {
        //var JT=[1, 25/24, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8];
        const freq: Record<string, number> = {};
        let i: number = -57;
        const o: string[] = "c,c#,d,d#,e,f,f#,g,g#,a,a#,b".split(",");
        for (let n: number = 0, p: number = 0; 63 > i; i++) {
            //var Q = Math.floor((i+9)/12);
            const freq1 = 440 * Math.pow(Math.pow(2, 1 / 12), i);
            //var freq2 = 261.625*((Q==0)?JT[n]:Math.pow(2,Q)*JT[n]);
            freq[o[n++] + p] = freq1;
            12 == n && (p++, n = 0);
        }
        return freq;
    }, [])

    // Use a WebWorker for something. I guess for accurate scheduling.
    const worker = useMemo(() => {
        const body = function () {
            function tic(n: () => void, t: number) {
                function i() {
                    n(), u || setTimeout(i, t)
                }

                var u = 0;
                return i(), function () {
                    u = 1
                }
            }

            self.onmessage = function (e) {
                tic(function () {
                    self.postMessage(0)
                }, 5);
            };
        };
        const blob = new Blob([body.toString().replace(/(^.*?\{|\}$)/g, "")], {type: "text/javascript"});
        return new Worker(URL.createObjectURL(blob));
    }, [])

    useEffect(() => {
        worker.onmessage = function (e) {
            // if running out of time, schedule the next loop of the song
            if (BSP.ctx.currentTime >= BSP.time - (BSP.speed * BSP.sub)) {
                schedule();
            }
        };

        startSong();
    }, [])

    const getCurrentSong = () => currentSong

    const changeSong = (song: Optional<Song>) => setCurrentSong(song);

    const schedule = () => {
        var SONG = BSP.SONG;
        var fix = function (n) {
            return Math.round(n * 1000) / 1000;
        };
        var gnt = function (n) {
            return n.substr(0, 3).replace("-", "");
        }

        for (var n = 0.000501, j = 0; j < SONG.seq.length; j++) {
            for (var i = 0, tick = BSP.time; i < SONG.seq[j].length;) {
                var step = SONG.seq[j][i], note, nlen = 0;
                if (step && step[0] && step[0].length === 4)  // note length parse
                    nlen = BSP.speed * (("ABCDEFGQ".indexOf(step[0][3].toUpperCase()) + 1) / 8);

                if (step && step[0] && frequencie[gnt(step[0])]) {
                    // set Filter cutoff if found
                    if (step[4] !== undefined)
                        BSP.Filter[j].frequency.setValueAtTime(step[4], tick);
                    // set LFO amount if found
                    if (step[3] !== undefined)
                        BSP.modGain[j].gain.setValueAtTime(step[3], tick);
                    // set PWM value if found
                    if (BSP.osc[j].width && step[2] !== undefined)
                        BSP.osc[j].width.setValueAtTime(step[2], tick);
                    // For noise
                    if (BSP.osc[j].constructor === AudioBufferSourceNode)
                        BSP.osc[j].playbackRate.setValueAtTime(
                            frequencie[gnt(step[0])] / (SONG.sampleData[j][1].length >= 2048 ? SONG.sampleData[j][1].length / 128 : 1) * SONG.sampleData[j][1].length / 44100, tick);
                    // only set frequency if OscNode
                    if (BSP.osc[j].constructor === OscillatorNode)
                        BSP.osc[j].frequency.setValueAtTime((frequencie[gnt(step[0])] / (SONG.trans || 2)), tick);
                    if (BSP.osc[j].osc1 && BSP.osc[j].osc2 && step[2] !== undefined)
                        BSP.lastPWM[j] = step[2];
                    if (BSP.osc[j].osc1 && BSP.osc[j].osc2 && step[5] !== undefined)
                        BSP.lastPWM2[j] = step[5];

                    if (BSP.osc[j].osc1 && BSP.osc[j].osc2) {
                        BSP.osc[j].osc1.frequency.setValueAtTime((frequencie[gnt(step[0])] / (SONG.trans || 2)), tick),
                            BSP.osc[j].osc2.frequency.setValueAtTime((frequencie[gnt(step[0])] / (SONG.trans || 2)), tick),
                            BSP.osc[j].delay.delayTime.setValueAtTime((1 - BSP.lastPWM[j] || 0) / frequencie[gnt(step[0])], tick);
                        BSP.osc[j].osc2.detune.setValueAtTime(BSP.lastPWM2[j] || 0, tick);
                    }
                    if (tick > 0) {
                        BSP.amp[1][j].gain.setValueAtTime(BSP.lastVol[j] || 0, fix(tick - n));
                        BSP.amp[1][j].gain.linearRampToValueAtTime(0, tick);
                    }
                    BSP.amp[1][j].gain.setValueAtTime(0, nlen ? tick + (BSP.speed - nlen) : tick);
                    BSP.amp[1][j].gain.linearRampToValueAtTime(step[1] || 1, fix(tick + n));
                    BSP.lastVol[j] = step[1] || 1;
                } else if (step) {
                    if (tick > 0) {
                        BSP.amp[1][j].gain.setValueAtTime(BSP.lastVol[j] || 0, fix(tick - n));
                        BSP.amp[1][j].gain.linearRampToValueAtTime(0, tick);
                    }
                    BSP.lastVol[j] = 0;
                }
                tick = fix((BSP.time + (++i * BSP.speed)));
            }
        }
        BSP.time = tick;
    };

    const [lastVol, setLastVol] = useState([])
    const [lastPWM, setLastPWM] = useState([])
    const [lastPWM2, setLastPWM2] = useState([])
    const [speed, setSpeed] = useState(0)
    const [sub, setSub] = useState(0)
    const [ctx, setCtx] = useState(new AudioContext())
    const [time, setTime] = useState(ctx.currentTime)
    const [osc, setOsc] = useState<(OscillatorNode | AudioBufferSourceNode | PulseOscillator)[]>([])
    const [amp, setAmp] = useState<[GainNode[], GainNode[]]>([[], []])
    const [delay, setDelay] = useState<DelayNode[]>([])
    const [delayGain, setDelayGain] = useState<GainNode[]>([])
    const [filter, setFilter] = useState<BiquadFilterNode[]>([])
    const [modGain, setModGain] = useState<GainNode[]>([])
    const [LFO, setLFO] = useState({})
    // create Oscillators for song.
    const [waves, setWaves] = useState<OscillatorType[]>(["sine", "square", "triangle", "sawtooth"])

    const startSong = () => {
        function BufferNode(ctx: AudioContext, rate, data): AudioBufferSourceNode {
            var buf = ctx.createBuffer(1, data.length, rate);
            buf.getChannelData(0).set(data);
            var bufferSource = ctx.createBufferSource();

            bufferSource.buffer = buf;
            bufferSource.loop = true;

            return bufferSource;
        }

        const SONG: Song = currentSong.get();
        const speed = 60 / SONG.bpm / (SONG.divide || 4)
        setSub(SONG.seq[0].length);

        const LFO: OscillatorNode = ctx.createOscillator();
        LFO.type = 'sine';
        LFO.frequency.setValueAtTime(7.8, 0);
        LFO.start(0);

        const osc: (OscillatorNode | AudioBufferSourceNode | PulseOscillator)[] = []
        const modGain: GainNode[] = []
        const amp: [GainNode[], GainNode[]] = [[], []]
        const filter: BiquadFilterNode[] = []
        const delay: DelayNode[] = []
        const delayGain: GainNode[] = []

        for (var j = 0; j < SONG.seq.length; j++) {
            osc[j] = ctx.createOscillator();
            // White Noise
            if (SONG.wave && SONG.wave[j] === 4) osc[j] = BufferNode(ctx, SONG.sampleData[j][0], SONG.sampleData[j][1]);
            // PWM
            if (SONG.wave && SONG.wave[j] === 5) osc[j] = useCreatePulseOscillator(ctx);
            // Periodic wave
            if (SONG.wave && SONG.wave[j] && SONG.wave[j].constructor === Array) {
                var waveform = ctx.createPeriodicWave(SONG.wave[j][0], SONG.wave[j][1]);
                (osc[j] as OscillatorNode).setPeriodicWave(waveform);
                // Raw Oscillator Waveform
            } else if (SONG.wave && waves[SONG.wave[j]] !== undefined) {
                (osc[j] as OscillatorNode).type = waves[SONG.wave[j]];
                // No waveforms defined
            } else if (!SONG.wave) {
                (osc[j] as OscillatorNode).type = waves[1];
            }
            if (SONG.wave) {
                modGain[j] = ctx.createGain();
                modGain[j].gain.setValueAtTime(0, 0);
                if (SONG.wave[j] === 4)
                    modGain[j].connect((osc[j] as AudioBufferSourceNode).playbackRate);
                else if (SONG.wave[j] !== 5)
                    modGain[j].connect((osc[j] as OscillatorNode).frequency);
                else
                    modGain[j].connect((osc[j] as PulseOscillator).osc1.frequency),
                        modGain[j].connect((osc[j] as PulseOscillator).osc2.frequency);
                LFO.connect(modGain[j]);
            }

            amp[0][j] = ctx.createGain(); // Osc Channel Volume
            amp[1][j] = ctx.createGain(); // Osc Note Volume
            amp[1][j].gain.setValueAtTime(0, 0);
            amp[0][j].gain.setValueAtTime(SONG.cVol && SONG.cVol[j] ? SONG.cVol[j] : 1, 0);
            if (SONG.wave && SONG.wave[j] == 5)
                (osc[j] as PulseOscillator).output.connect(amp[1][j]);
            else
                (osc[j] as OscillatorNode).connect(amp[1][j]);
            amp[1][j].connect(amp[0][j]);

            filter[j] = ctx.createBiquadFilter();
            filter[j].frequency.setValueAtTime(18000, 0);
            filter[j].Q.setValueAtTime(10, 0);
            filter[j].type = 'lowpass';

            delay[j] = ctx.createDelay(.5);
            delay[j].delayTime.setValueAtTime(speed * 2, 0)
            delayGain[j] = ctx.createGain();
            delayGain[j].gain.setValueAtTime(SONG.delay && SONG.delay[j] ? SONG.delay[j] : 0, 0);

            delay[j].connect(delayGain[j]);
            delayGain[j].connect(ctx.destination);

            if (SONG.wave) {
                amp[0][j].connect(filter[j]);
                filter[j].connect(delay[j]);
                filter[j].connect(ctx.destination);

            } else {
                amp[0][j].connect(delay[j]);
                amp[0][j].connect(ctx.destination);
            }
        }

        for (var i = 0; i < osc.length; i++) {
            osc[i].start(ctx.currentTime);
        }

        setDelayGain(delayGain);
        setModGain(modGain);
        setFilter(filter);
        setSpeed(speed);
        setDelay(delay);
        setLFO(LFO);
        setOsc(osc);
        setAmp(amp);

        schedule();
        worker.postMessage(0);
    };


    return {
        getCurrentSong,
        changeSong,
    };
}