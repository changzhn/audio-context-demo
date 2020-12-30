(function() {
    const btn = document.querySelector('#btn');

    const audioCtx = new AudioContext();

    // 双声道
    const channels = 2;

    // 创建一个空的2s立体声buffer
    // sampleRate代码音频的采样率 48k
    const frameCount = audioCtx.sampleRate * 2.0;

    const buf = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

    btn.addEventListener('click', () => {
        // fill the buf with white noise;
        // just random values between -1.0 and 1.0
        for(let c = 0; c < channels; c++) {
            // this gives us the actual buf that contains the data
            // Float32Array
            const nowBuffering = buf.getChannelData(c);
            for(let i = 0; i < frameCount; i++) {
                // Math.random is in [0, 1.0]
                // audio needs to be in [-1.0, 1.0]
                nowBuffering[i] = Math.random() * 2 -  1;
            }
        }

        // get an audioBufferSourceNode
        // this is the audioNode to use when we want to play an audioBuffer
        const source = audioCtx.createBufferSource();
        // set the buffer in the audioBufferSourceNode
        source.buffer = buf;
        // connect the audioBufferSourceNode to the destination
        source.connect(audioCtx.destination);
        source.start();
    });

})();