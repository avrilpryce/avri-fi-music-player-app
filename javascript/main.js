/**
* main.js
*
*/

import {songs} from './modules/songs.js';
import {shuffleSong} from './modules/shuffle.js';
import {toggleOverlay} from './modules/overlay.js';
import {repeatAudio} from './modules/repeat.js';
import {updateTime, setProgress} from './modules/time.js';
import {changeVolume, changeVolumeProgressColor, volumeOff, volumeUp} from './modules/volume.js';
import {initPlayer, nextSong, skipSong, togglePlayer} from './modules/player.js';


window.onload = () => {

    // Element References
    const playBtn = document.getElementById('play-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loopBtn = document.getElementById('loop-btn');
    const audio = document.getElementById('audio');
    const songProgessContainer = document.getElementById('song-progress-container');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeOffBtn = document.getElementById('volume-off-btn');
    const volumeUpBtn = document.getElementById('volume-up-btn');
    
    
    // Event Listeners
    playBtn.addEventListener('click', togglePlayer);
    nextBtn.addEventListener('click', skipSong);
    prevBtn.addEventListener('click', () => skipSong(false));
    shuffleBtn.addEventListener('click',() => shuffleSong(shuffleBtn, songs));
    loopBtn.addEventListener('click', () => repeatAudio());
    audio.addEventListener('timeupdate', updateTime);
    songProgessContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', nextSong);
    volumeSlider.addEventListener('mousemove', changeVolume);
    volumeSlider.addEventListener('input', changeVolumeProgressColor);
    volumeOffBtn.addEventListener('click', volumeOff);
    volumeUpBtn.addEventListener('click', volumeUp);
    
    $('.app-wrapper').click(function(e) {
        if(!$(e.target).closest('.main-section').length){
            toggleOverlay ();
        }
    });
    
    initPlayer();
    
    
}
