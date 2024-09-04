document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const audioSource = document.getElementById('audio-source');
    const trackName = document.getElementById('track-name');
    const albumArt = document.getElementById('album-art');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const shuffleButton = document.getElementById('shuffle');
    const progress = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const volumeControl = document.getElementById('volume');

    const tracks = [
        { name: 'Track 1', url: 'https://www.dropbox.com/scl/fi/lvy6fmuti1nu9n14i81ps/Bolona-Kothay-Tumi-Arfin-Rumey-Kheya-Official-Music-Video.mp3?rlkey=uyyx46av03fpicq5nnottcrpr&st=abgae5lh&dl=1', albumArt: 'https://via.placeholder.com/150/0000FF/808080?text=Track+1' },
        { name: 'Track 2', url: 'https://www.dropbox.com/scl/fi/j1vlb9mb93wciu80qkr2f/Bolo-Na-Tumi-Amar-Dev-Koel-Mallick-Gautam-Sushmit-Monali-Thakur-Jeet-Gannguli.mp3?rlkey=hmh4xujcj4db7tpxnofkhvcow&st=z287ay0q&dl=1', albumArt: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Track+2' },
        { name: 'Track 3', url: 'https://www.dropbox.com/scl/fi/fvs1ay5j8w1xbl8gn8pmg/Tumi-Amar-Emoni-HD-Salman-Shah-Shabnur-Kanchi-Kanak-Chapa-Anondo-Osru.mp3?rlkey=ddpykusisfya44hgahhbyd1xi&st=d3z993zx&dl=1', albumArt: 'https://via.placeholder.com/150/00FF00/000000?text=Track+3' },
        { name: 'Track 4', url: 'https://www.dropbox.com/scl/fi/t4uj47flpzlyve79thcyg/Tumi-Mor-Jiboner-HD-Salman-Shah-Shabnur-Andrew-Salma-Anondo-Osru.mp3?rlkey=nwoag4bs46yikorrwp1iqakkd&st=nr2247px&dl=1', albumArt: 'https://via.placeholder.com/150/FFFF00/000000?text=Track+4' },
        { name: 'Track 5', url: 'https://www.dropbox.com/scl/fi/ylxqj15xz480nsifskv5l/Tomay-Dekhte-Dekhte-Ami-Amar-Hridoy-Ekta-Ayna-COVER-Huge-Studio-Ayna-Ghor.mp3?rlkey=bo21ojnsi56tkh98w7dqawczu&st=uyzz3mkv&dl=1', albumArt: 'https://via.placeholder.com/150/000000/FFFFFF?text=Track+5' },
        { name: 'Track 6', url: 'https://www.dropbox.com/scl/fi/fiky2l93zli3s6u8oahfc/Tumi-Akasher-Buke-Khalid.mp3?rlkey=no3wjilykuybpt394089iae9r&st=pq3m1lxj&dl=1', albumArt: 'https://via.placeholder.com/150/FFFFFF/000000?text=Track+6' },
    ];

    let currentTrackIndex = 0;
    let isShuffle = false;

    function loadTrack(index) {
        const track = tracks[index];
        audioSource.src = track.url;
        trackName.textContent = track.name;
        albumArt.src = track.albumArt;
        audio.load();
        playTrack();
    }

    function playTrack() {
        audio.play();
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    }

    function pauseTrack() {
        audio.pause();
        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
    }

    function nextTrack() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        }
        loadTrack(currentTrackIndex);
    }

    function updateProgress() {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progressPercent = (currentTime / duration) * 100;
        progress.value = progressPercent;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function setProgress() {
        const duration = audio.duration;
        audio.currentTime = (progress.value / 100) * duration;
    }

    function setVolume() {
        audio.volume = volumeControl.value;
    }

    playButton.addEventListener('click', playTrack);
    pauseButton.addEventListener('click', pauseTrack);
    prevButton.addEventListener('click', prevTrack);
    nextButton.addEventListener('click', nextTrack);
    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle('bg-purple-700', isShuffle);
    });
    audio.addEventListener('timeupdate', updateProgress);
    progress.addEventListener('input', setProgress);
    volumeControl.addEventListener('input', setVolume);

    // Load the first track initially
    loadTrack(currentTrackIndex);
});
