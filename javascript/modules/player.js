/**
* player.js
* 
 * Index
 * 1. updatePlayerHelper
 * 2. initPlayer
 * 3. togglePlayer
 * 4. nextSong
 * 5. skipSong
 * 
*/

import {songs} from './songs.js'

const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const backgroundVideo = document.getElementById('video');
const playIcon = document.getElementById('play-icon');
const loopBtnIcon = document.getElementById('loop-btn-icon');
let currentSongIndex, nextSongIndex;

// * 1. updatePlayerHelper
function updatePlayerHelper() {
    let song = songs[currentSongIndex];
    backgroundVideo.src = song.video_path;
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    audio.src = song.song_path;
}

// * 2. initPlayer
function initPlayer () {
    currentSongIndex = 0;
    nextSongIndex = currentSongIndex + 1;
    updatePlayerHelper();
}

// * 3. togglePlayer
function togglePlayer () {
    if (audio.paused) {
        audio.play();
        playIcon.innerHTML = '&#xe1a2;'
    } else {
        audio.pause();
        playIcon.innerHTML = '&#xe1c4;'
    }
}

// * 4. nextSong
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
    
    updatePlayerHelper();
    togglePlayer();
}

// * 5. skipSong
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
    
    updatePlayerHelper();
    togglePlayer();
}
    

export{initPlayer, nextSong, skipSong, togglePlayer};