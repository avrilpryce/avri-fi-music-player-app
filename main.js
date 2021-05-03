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
    
    const musicPlayer = document.getElementById('music-player');
    const songProgessBar = document.getElementById('song-progress-bar');
    const songProgessContainer = document.getElementById('song-progress-container');
    const volumeSlider = document.getElementById('volume-slider');
    
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
    nextBtn.addEventListener('click', ChangeSong);
    prevBtn.addEventListener('click', () => ChangeSong(false));
    shuffleBtn.addEventListener('click', shuffleSong);
    loopBtn.addEventListener('click', repeatPlaylist)
    musicPlayer.addEventListener('timeupdate', updateProgress);
    songProgessContainer.addEventListener('click', setProgress);
    musicPlayer.addEventListener('ended', ChangeSong);
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
            playIcon.classList.add('fa-pause');
            playIcon.classList.remove('fa-play');
        } else {
            musicPlayer.pause();
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }

    function ChangeSong (next = true) {
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


    /* repeatPlaylist function pseudo code
        - on click one repeat playlist
            - current code
        - on click two repeat song
            - Start same track again when it ends
        - on third click return to original state

    */


    function repeatPlaylist () {
        loopBtn.classList.toggle('active-btn');
        
        if (loopBtn.classList.contains('active-btn') === true) {
            // Enter code below here
           
        } else {
            // Enter code below here

        }    
    }


    // function repeatSong () {

    // }

    function updateProgress(event) {
        const { duration, currentTime } = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        songProgessBar.style.width = `${progressPercent}%`;
    }

    function setProgress(event) {
        const width = this.clientWidth;
        const clickX = event.offsetX;
        const duration = musicPlayer.duration;
      
        musicPlayer.currentTime = (clickX / width) * duration;
    }






}
