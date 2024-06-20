document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const bufferingMessage = document.getElementById('buffering-message');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource('https://tv5.hoichoi24.com/1024/index.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });

        hls.on(Hls.Events.BUFFER_STALLED, () => {
            bufferingMessage.style.display = 'block';
        });

        hls.on(Hls.Events.BUFFER_APPENDED, () => {
            bufferingMessage.style.display = 'none';
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://tv5.hoichoi24.com/1024/index.m3u8';
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });

        video.addEventListener('waiting', () => {
            bufferingMessage.style.display = 'block';
        });

        video.addEventListener('playing', () => {
            bufferingMessage.style.display = 'none';
        });
    }
});
