/**
 * 
 * currentSongIndex
 * nextSongIndex
 * songs
 * backgroundVideo
 * songTitle
 * songArtist
 * musicPlayer
 * playIcon
 * loopBtnIcon
 */

//  function initPlayer () {
//         currentSongIndex = 0;
//         nextSongIndex = currentSongIndex + 1;
//         updatePlayerHelper();
//     }

//     function updatePlayerHelper() {
//         let song = songs[currentSongIndex];
//         backgroundVideo.src = song.video_path;
//         songTitle.innerText = song.title;
//         songArtist.innerText = song.artist;
//         audio.src =   song.song_path;
//     }

//     function togglePlayer () {
//         if (audio.paused) {
//             audio.play();
//             playIcon.innerHTML = '&#xe1a2;'
//         } else {
//             audio.pause();
//             playIcon.innerHTML = '&#xe1c4;'
//         }
//     }


//     function updateToggleHelper () {
//         updatePlayerHelper();
//         togglePlayer();
//     }
    
//     function nextSong (next = true) {
//         if (next) {
//             currentSongIndex++;
//             nextSongIndex = currentSongIndex + 1;

//             if (currentSongIndex > songs.length - 1 &&  loopBtnIcon.title === 'repeat-playlist') {
//                 currentSongIndex = 0;
//                 nextSongIndex = currentSongIndex + 1;
//             }

//             if (nextSongIndex > songs.length - 1  &&  loopBtnIcon.title === 'repeat-playlist') {
//                 nextSongIndex = 0;
//             }
//         } else {
//             currentSongIndex--;
//             nextSongIndex = currentSongIndex + 1;

//             if (currentSongIndex < 0) {
//                 currentSongIndex = songs.length - 1;
//                 nextSongIndex = 0;
//             }
//         }
        
//         updateToggleHelper();
//     }