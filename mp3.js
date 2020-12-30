(function() {
    const audioContext = new AudioContext();
    async function play() {
        const  res = await fetch('/tornado.mp3');
        const arraybuffer = await res.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arraybuffer);
        const source = audioContext.createBufferSource();
        source.connect(audioContext.destination); //连接上实例
        source.buffer = audioBuffer;
        source.start();
    }

    document.querySelector('#btn').addEventListener('click', play, false);
})();