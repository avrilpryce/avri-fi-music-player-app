/**
* main.js
*
*/

window.onload = () => {

    // Object References
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const backgroundVideo = document.getElementById('video');
    
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loopBtn = document.getElementById('loop-btn');
    const loopBtnIcon = document.getElementById('loop-btn-icon');
    
    const musicPlayer = document.getElementById('audio');
    const songProgessBar = document.getElementById('song-progress-bar');
    const songProgessContainer = document.getElementById('song-progress-container');
    
    const volumeSlider = document.getElementById('volume-slider');
    const volumeOffBtn = document.getElementById('volume-off-btn');
    const volumeUpBtn = document.getElementById('volume-up-btn');
    
    const currentTimeEl = document.getElementById('current-time-text');
    const durationTimeEl = document.getElementById('duration-time-text');
    
    const overlay = document.querySelector('.overlay');

    const repeatIconHTML = '&#xe040;'
    const repeatOneIconHTML = '&#xe041;'

    let lastVolumePosition, currentSongIndex, nextSongIndex;
    
    let songs = [
        {
            title: 'Finally',
            artist: 'CeCe Peniston',
            song_path:'music/finally.mp3',
            video_path: 'videos/finally.mp4',
            original_index: 0,
        },
        {
            title: 'Rain On Me',
            artist: 'Lady Gaga & Ariana Grande',
            song_path:'music/rain-on-me.mp3',
            video_path: 'videos/rain-on-me.mp4',
            original_index: 1,
        },
        {
            title: 'Run the World (Girls)',
            artist: 'Beyoncé',
            song_path:'music/run-the-world.mp3',
            video_path: 'videos/run-the-world-girls.mp4',
            original_index: 2,
        },
        {
            title: 'Up',
            artist: 'Cardi B',
            song_path:'music/up.mp3',
            video_path: 'videos/up.mp4',
            original_index: 3,
        },
        {
            title: 'Level Up (Remix)',
            artist: 'Ciara feat. Missy Elliott & Fatman Scoop',
            song_path:'music/level-up-remix.mp3',
            video_path: 'videos/level-up.mp4',
            original_index: 4,
        }
    ];
    
    // Event Listeners
    playBtn.addEventListener('click', TogglePlaySong);
    nextBtn.addEventListener('click', skipSong);
    prevBtn.addEventListener('click', () => skipSong(false));
    shuffleBtn.addEventListener('click', shuffleSong);
    loopBtn.addEventListener('click', repeatAudio)
    musicPlayer.addEventListener('timeupdate', updateTime);
    songProgessContainer.addEventListener('click', setProgress);
    musicPlayer.addEventListener('ended', nextSong);
    volumeSlider.addEventListener('mousemove', changeVolume);
    volumeSlider.addEventListener('input', changeVolumeProgressColor);
    volumeOffBtn.addEventListener('click', volumeOff);
    volumeUpBtn.addEventListener('click', volumeUp);

    $('.app-wrapper').click(function(e) {
        if(!$(e.target).closest('.main-section').length){
            toggleOverlay ();
        }
    });

    
    
    
    InitPlayer();
    
    /**
    * player
    *
    */

    function InitPlayer () {
        currentSongIndex = 0;
        nextSongIndex = currentSongIndex + 1;
        UpdatePlayer();
    }

    function UpdatePlayer() {
        let song = songs[currentSongIndex];
        backgroundVideo.src = song.video_path;
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;
        musicPlayer.src =   song.song_path;
    }

    function TogglePlaySong () {
        if (musicPlayer.paused) {
            musicPlayer.play();
            playIcon.innerHTML = '&#xe1a2;'
        } else {
            musicPlayer.pause();
            playIcon.innerHTML = '&#xe1c4;'
        }
    }

    function nextSong (next = true) {
        if (next) {
            currentSongIndex++;
            nextSongIndex = currentSongIndex + 1;

            if (currentSongIndex > songs.length - 1 &&  loopBtnIcon.title === 'repeat-playlist') {
                currentSongIndex = 0;
                nextSongIndex = currentSongIndex + 1;
            }

            if (nextSongIndex > songs.length - 1  &&  loopBtnIcon.title === 'repeat-playlist') {
                nextSongIndex = 0;
            }
        } else {
            currentSongIndex--;
            nextSongIndex = currentSongIndex + 1;

            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1;
                nextSongIndex = 0;
            }
        }
        
        UpdatePlayer();
        TogglePlaySong();
    }

    function skipSong (next = true) {
        if (next) {
            currentSongIndex++;
            nextSongIndex = currentSongIndex + 1;

            if (currentSongIndex > songs.length - 1) {
                currentSongIndex = 0;
                nextSongIndex = currentSongIndex + 1;
            }

            if (nextSongIndex > songs.length - 1) {
                nextSongIndex = 0;
            }
        } else {
            currentSongIndex--;
            nextSongIndex = currentSongIndex + 1;

            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1;
                nextSongIndex = 0;
            }
        }

        if (loopBtnIcon.title === 'repeat-song') {
            musicPlayer.loop = false;
            loopBtnIcon.innerHTML = repeatIconHTML;
            loopBtnIcon.title = 'repeat-playlist';
        }
        
        UpdatePlayer();
        TogglePlaySong();
    }

    /**
    * Shuffle
    *
    */

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    function shuffleSong () {
        shuffleBtn.classList.toggle('active-btn');
        
        if (shuffleBtn.classList.contains('active-btn') === true) {
            shuffleArray(songs);
        } else {
            songs.sort(function (a, b) {
                return a.original_index - b.original_index;
            });
        }
    }


    /**
    * Repeat
    *
    */

    function repeatAudio () {
        switch (loopBtnIcon.title) {
            case 'repeat-off':
                loopBtn.classList.add('active-btn');
                loopBtnIcon.title = 'repeat-playlist';
                break;
            case 'repeat-playlist':
                musicPlayer.loop = true;
                loopBtnIcon.innerHTML = repeatOneIconHTML;
                loopBtnIcon.title = 'repeat-song';
                break;
            case 'repeat-song':
                musicPlayer.loop = false;
                loopBtn.classList.remove('active-btn');
                loopBtnIcon.innerHTML = repeatIconHTML;
                loopBtnIcon.title = 'repeat-off';
                break;
        }
    }

    /**
    * Time
    *
    */


    function updateTime(event) {
        const { duration, currentTime } = event.srcElement;

        if(duration) {
            const progressPercent = (currentTime / duration) * 100;
            songProgessBar.style.width = `${progressPercent}%`;

            let currentTimeMins = Math.floor(currentTime / 60);
            let currentTimeSecs = Math.floor(currentTime - currentTimeMins * 60);
            let durationTimeMins = Math.floor(duration / 60);
            let durationTimeSecs = Math.floor(duration - durationTimeMins * 60);

            if(currentTimeSecs < 10){ currentTimeSecs = '0' + currentTimeSecs }
            if(durationTimeSecs < 10){ durationTimeSecs = '0' + durationTimeSecs }

            currentTimeEl.innerHTML = currentTimeMins + ':' + currentTimeSecs;
            durationTimeEl.innerHTML = durationTimeMins + ':' + durationTimeSecs;
        } else {
            currentTimeEl.innerHTML = '0:00'
            durationTimeEl.innerHTML = '0:00'
        }


    }

    function setProgress(event) {
        const width = this.clientWidth;
        const clickX = event.offsetX;
        const duration = musicPlayer.duration;
      
        musicPlayer.currentTime = (clickX / width) * duration;
    }

    /**
    * Volume
    *
    */

    function changeVolume () {
        musicPlayer.volume = volumeSlider.value / 100;

        if (volumeSlider.value > 65) {
            volumeUpBtn.innerHTML = '&#xe050;';
            volumeUpBtn.id = 'volume-up-btn'
        } else {
            volumeUpBtn.innerHTML = '&#xe04d;';
            volumeUpBtn.id = 'volume-down-btn'
        }

        if (volumeSlider.value > 0) {
            volumeOffBtn.innerHTML = '&#xe04e;';
            volumeOffBtn.id = 'volume-mute-btn';
        } else {
            volumeOffBtn.innerHTML = '&#xe04f;';
            volumeOffBtn.id = 'volume-off-btn';
        }
    }

    function changeVolumeProgressColor () {
        const x = volumeSlider.value;
        const progressColor = `linear-gradient(90deg, rgba(255,255,255,.85) ${x}%, rgba(255,255,255,.3) ${x}%)`;
        volumeSlider.style.background = progressColor;
    }

    
    function volumeOff () {
        if (volumeOffBtn.id === 'volume-mute-btn') {
            lastVolumePosition = volumeSlider.value;
            volumeSlider.value = 0;
            changeVolume();
            changeVolumeProgressColor();
        } else if (volumeOffBtn.id === 'volume-off-btn') {
            volumeSlider.value = lastVolumePosition;
            changeVolume ();
            changeVolumeProgressColor ();
        } 
        
    };
    
    
    function volumeUp () {
        volumeSlider.value = 100;
        changeVolume ();
        changeVolumeProgressColor ();
    }

    /**
    * Overlay
    *
    */

    function toggleOverlay () {
        if (overlay.style.display === "none") {
            overlay.style.display = "block";
            setTimeout(function() {overlay.classList.toggle('hide')}, 90)             
        } else {
            overlay.classList.toggle('hide');     
            setTimeout(function() {overlay.style.display = "none";}, 90)
        }

    }
}