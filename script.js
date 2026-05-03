async function init() {
    const video = document.getElementById('video');
    const ui = video['ui'];
    const player = ui.getControls().getPlayer();

    // Mengambil data dari URL browser (?mpd=...&key=...)
    const params = new URLSearchParams(window.location.search);
    const mpdUrl = params.get('mpd');
    const keyPair = params.get('key');

    // Setting ClearKey jika ada parameter key
    if (keyPair && keyPair.includes(':')) {
        const [kid, key] = keyPair.split(':');
        player.configure({
            drm: {
                clearKeys: {
                    [kid]: key
                }
            }
        });
    }

    // Load link MPD
    if (mpdUrl) {
        try {
            await player.load(mpdUrl);
            console.log('Video berhasil dimuat!');
        } catch (e) {
            console.error('Gagal memuat video:', e);
        }
    }
}

// Menjalankan fungsi setelah Shaka UI siap
document.addEventListener('shaka-ui-loaded', init);