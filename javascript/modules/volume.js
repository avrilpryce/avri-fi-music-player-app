
/**
 * volume.js
 * 
 * Index
 * 1. changeVolume
 * 2. changeVolumeProgressColor
 * 3. volumeOff
 * 4. volumeUp
 * 
 */

const volumeSlider = document.getElementById('volume-slider');
const volumeOffBtn = document.getElementById('volume-off-btn');
const volumeUpBtn = document.getElementById('volume-up-btn');

let lastVolumePosition;

// * 1. changeVolume
function changeVolume () {
    const audio = document.getElementById('audio');

    audio.volume = volumeSlider.value / 100;

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


// * 2. changeVolumeProgressColor
function changeVolumeProgressColor () {
    const x = volumeSlider.value;
    const progressColor = `linear-gradient(90deg, rgba(255,255,255,.85) ${x}%, rgba(255,255,255,.3) ${x}%)`;
    volumeSlider.style.background = progressColor;
}


// * 3. volumeOff
function volumeOff () {
    if (volumeOffBtn.id === 'volume-mute-btn') {
        lastVolumePosition = volumeSlider.value;
        volumeSlider.value = 0;
        changeVolume();
        changeVolumeProgressColor();
    } else if (volumeOffBtn.id === 'volume-off-btn') {
        volumeSlider.value = lastVolumePosition;
        changeVolume();
        changeVolumeProgressColor();
    } 
    
}


// * 4. volumeUp
function volumeUp () {
    volumeSlider.value = 100;
    changeVolume();
    changeVolumeProgressColor();
}


export {changeVolume, changeVolumeProgressColor, volumeOff, volumeUp};