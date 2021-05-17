



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
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
}
