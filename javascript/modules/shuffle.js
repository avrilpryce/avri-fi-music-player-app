/**
 * shuffleBtn
 * songs
 *  
 */


function shuffleArrayHelper(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function shuffleSong (shuffleBtn, songs) {
    shuffleBtn.classList.toggle('active-btn');
    
    if (shuffleBtn.classList.contains('active-btn') === true) {
        shuffleArrayHelper(songs);
    } else {
        songs.sort(function (a, b) {
            return a.original_index - b.original_index;
        });
    }
}

export {shuffleSong};