/**
* main.js
*
*/

import {songs} from './modules/songs.js';
import {shuffleSong} from './modules/shuffle.js';
import {repeatAudio} from './modules/repeat.js';
import {updateTime, setProgress} from './modules/time.js';
import {changeVolume, changeVolumeProgressColor, volumeOff, volumeUp} from './modules/volume.js';

/**
 * 
 * currentSongIndex - used in skipSong
 * nextSongIndex - used in skipSong
 * songs - skipSong and Shuffle Song
 * backgroundVideo
 * songTitle
 * songArtist
 * audio - everything
 * playIcon
 * loopBtnIcon - skipSong and repeatAudio
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
    
    const audio = document.getElementById('audio');
    const songProgessContainer = document.getElementById('song-progress-container');
    
    const volumeSlider = document.getElementById('volume-slider');
    const volumeOffBtn = document.getElementById('volume-off-btn');
    const volumeUpBtn = document.getElementById('volume-up-btn');
    

    
    const overlay = document.querySelector('.overlay');

    const repeatIconHTML = '&#xe040;'
    const repeatOneIconHTML = '&#xe041;'

    let currentSongIndex, nextSongIndex;
    

    
    // Event Listeners
    playBtn.addEventListener('click', togglePlayer);
    nextBtn.addEventListener('click', skipSong);
    prevBtn.addEventListener('click', () => skipSong(false));
    shuffleBtn.addEventListener('click',() => shuffleSong(shuffleBtn, songs));
    loopBtn.addEventListener('click', () => repeatAudio(loopBtnIcon, loopBtn, audio, repeatOneIconHTML, repeatIconHTML));
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
    
    /**
     * player
     *
     */
    
    function initPlayer () {
        currentSongIndex = 0;
        nextSongIndex = currentSongIndex + 1;
        updatePlayerHelper();
    }
    
    function updatePlayerHelper() {
        let song = songs[currentSongIndex];
        backgroundVideo.src = song.video_path;
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;
        audio.src =   song.song_path;
    }
    
    function togglePlayer () {
        if (audio.paused) {
            audio.play();
            playIcon.innerHTML = '&#xe1a2;'
        } else {
            audio.pause();
            playIcon.innerHTML = '&#xe1c4;'
        }
    }
    
    
    function updateToggleHelper () {
        updatePlayerHelper();
        togglePlayer();
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
        
        updateToggleHelper();
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
            audio.loop = false;
            loopBtnIcon.innerHTML = repeatIconHTML;
            loopBtnIcon.title = 'repeat-playlist';
        }
        
        updateToggleHelper();
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
