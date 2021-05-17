
function repeatAudio (loopBtnIcon, loopBtn, audio, repeatOneIconHTML, repeatIconHTML) {
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