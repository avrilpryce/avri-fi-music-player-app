window.onload = () => {

    // Object References
    const songImg = document.getElementById('song-image');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songNextUp = document.getElementById('song-next-up');
    
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loopBtn = document.getElementById('loop-btn');
    const loopBtnIcon = document.getElementById('loop-btn-icon');
    
    const musicPlayer = document.getElementById('music-player');
    const songProgessBar = document.getElementById('song-progress-bar');
    const songProgessContainer = document.getElementById('song-progress-container');
    const volumeSlider = document.getElementById('volume-slider');

    const currentTimeEl = document.getElementById('current-time-text');
    const durationTimeEl = document.getElementById('duration-time-text');
    
    let currentSongIndex;
    let nextSongIndex;
    
    let songs = [
        {
            title: 'Day One',
            artist: 'Joy Stock',
            song_path:'music/joystock-day-one.mp3',
            img_path: 'images/day-one.jpeg',
            original_index: 0,
        },
        {
            title: 'Shiny New Kicks',
            artist: 'Joy Stock',
            song_path:'music/joystock-shiny-new-kicks.mp3',
            img_path: 'images/shiny-new-kicks.jpeg',
            original_index: 1,
        },
        {
            title: 'Downtown Delight',
            artist: 'Joy Stock',
            song_path:'music/joystock-downtown-delight.mp3',
            img_path: 'images/downtown-delight.jpeg',
            original_index: 2,
        },
        {
            title: 'Ocean Drift',
            artist: 'Joy Stock',
            song_path:'music/joystock-oceanic-drift.mp3',
            img_path: 'images/oceanic-drift.jpeg',
            original_index: 3,
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
    volumeSlider.addEventListener('input', changeVolumeProgressColor)
    // musicPlayer.addEventListener('timeupdate',DurTime);
    
    
    
    InitPlayer();

    function InitPlayer () {
        currentSongIndex = 0;
        nextSongIndex = currentSongIndex + 1;
        UpdatePlayer();
    }

    function UpdatePlayer() {
        let song = songs[currentSongIndex];

        songImg.style = `background-image: url("${song.img_path}")`;
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;
        musicPlayer.src =   song.song_path;

        updateNextSong();
    }

    function updateNextSong() {
        songNextUp.innerText = `${songs[nextSongIndex].title} by ${songs[nextSongIndex].artist}`;
    }

    function TogglePlaySong () {
        if (musicPlayer.paused) {
            musicPlayer.play();
            playIcon.innerHTML = '&#xe034;'
        } else {
            musicPlayer.pause();
            playIcon.innerHTML = '&#xe037;'
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
        
        UpdatePlayer();
        TogglePlaySong();
    }





    





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


    /* repeatAudio function pseudo code
        - on click one repeat playlist
            - current code
        - on click two repeat song
            - Start same track again when it ends
        - on third click return to original state

    */

        // add loop title and then change it                            

    function repeatAudio () {

        const repeatIconHTML = '&#xe040;'
        const repeatOneIconHTML = '&#xe041;'
        
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


    // function repeatSong () {

    // }

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
            // if(currentTimeMins < 10){ currentTimeMins = '0' + currentTimeMins }
            // if(durationTimeMins < 10){ durationTimeMins = '0' + durationTimeMins }

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

    function changeVolume () {
        musicPlayer.volume = volumeSlider.value / 100;
    }

    function changeVolumeProgressColor () {
        const x = volumeSlider.value;
        const progressColor = `linear-gradient(90deg, #FE4880 ${x}%, #ccc ${x}%)`;
        volumeSlider.style.background = progressColor;
    }






}
