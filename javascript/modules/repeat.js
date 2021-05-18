/**
* repeat.js
*
*/

function repeatAudio () {
    const loopBtnIcon = document.getElementById('loop-btn-icon');
    const loopBtn = document.getElementById('loop-btn');
    const audio = document.getElementById('audio');
    const repeatIconHTML = '&#xe040;'
    const repeatOneIconHTML = '&#xe041;'

    switch (loopBtnIcon.title) {
        case 'repeat-off':
            loopBtn.classList.add('active-btn');
            loopBtnIcon.title = 'repeat-playlist';
            break;
        case 'repeat-playlist':
            audio.loop = true;
            loopBtnIcon.innerHTML = repeatOneIconHTML;
            loopBtnIcon.title = 'repeat-song';
            break;
        case 'repeat-song':
            audio.loop = false;
            loopBtn.classList.remove('active-btn');
            loopBtnIcon.innerHTML = repeatIconHTML;
            loopBtnIcon.title = 'repeat-off';
            break;
    }

}


export {repeatAudio};