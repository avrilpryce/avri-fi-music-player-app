window.onload = () => {
    const songImg = document.getElementById('song-image');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songNextUp = document.getElementById('song-next-up');

    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    console.log(playBtn);
    console.log(songTitle);

    const audioPlayer = document.getElementById('music-player');
    
    let currentSongIndex;
    let nextSongIndex;

    let songs = [
        {
            title: 'Day One',
            artist: 'Joy Stock',
            song_path:'music/joystock-day-one.mp3',
            img_path: 'images/day-one.jpeg' 
        },
        {
            title: 'Shiny New Kicks',
            artist: 'Joy Stock',
            song_path:'music/joystock-shiny-new-kicks.mp3',
            img_path: 'images/shiny-new-kicks.jpeg'
        },
        {
            title: 'Downtown Delight',
            artist: 'Joy Stock',
            song_path:'music/joystock-downtown-delight.mp3',
            img_path: 'images/downtown-delight.jpeg'
        },
        {
            title: 'Ocean Drift',
            artist: 'Joy Stock',
            song_path:'music/joystock-oceanic-drift.mp3',
            img_path: 'images/oceanic-drift.jpeg'
        }
    ];

    playBtn.addEventListener('click', TogglePlaySong);

    InitPlayer();

    function InitPlayer () {
        currentSongIndex = 0;
        nextSongIndex = currentSongIndex + 1;
        UpdatePlayer();
    };

    function UpdatePlayer() {
        let song = songs[currentSongIndex];

        songImg.style = `background-image: url("${song.image_path}")`;
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;

        songNextUp.innerText = `${songs[nextSongIndex].title} by ${songs[nextSongIndex].artist}`;
        audioPlayer.src = song_path;
    };

    function TogglePlaySong () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            audioPlayer.play();
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        };
    };

};
