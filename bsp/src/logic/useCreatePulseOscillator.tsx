export interface PulseOscillator {
    osc1: OscillatorNode,
    osc2: OscillatorNode,
    output: GainNode,
    delay: DelayNode,
    start: (when?: number | undefined) => void,
    stop: (when?: number | undefined) => void,
}

export function useCreatePulseOscillator(context: AudioContext) : PulseOscillator {
    const PWM: PulseOscillator = {} as PulseOscillator;
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const inverter = context.createGain();
    const output = context.createGain();
    const delay = context.createDelay();

    osc1.type = "sawtooth", osc2.type = "sawtooth";
    inverter.gain.setValueAtTime(-1, 0);
    delay.delayTime.setValueAtTime(.004, 0); // Hmm

    osc1.connect(output);
    osc2.connect(inverter);
    inverter.connect(delay);
    delay.connect(output);

    PWM.osc1 = osc1, PWM.osc2 = osc2,
        PWM.output = output, PWM.delay = delay;

    // PWM.connect = inverter.connect;
    PWM.start = function (t) {
        this.osc1.start(t);
        this.osc2.start(t)
    };
    PWM.stop = function (t) {
        this.osc1.stop(t);
        this.osc2.stop(t)
    };
    //this.delay.delayTime.value = amt/this.osc1.frequency.value;

    //BSP.osc[j].delay.delayTime.setValueAtTime(step[2] / BSP.osc[j].osc1.frequency.value, tick);
    return PWM;
}