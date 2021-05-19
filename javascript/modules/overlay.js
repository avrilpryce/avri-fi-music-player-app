/**
* overlay.js
*
*/


function toggleOverlay () {
    const overlay = document.querySelector('.overlay');

    if (overlay.style.display === "none") {
        overlay.style.display = "block";
        setTimeout(function() {overlay.classList.toggle('hide')}, 90)             
    } else {
        overlay.classList.toggle('hide');     
        setTimeout(function() {overlay.style.display = "none";}, 90)
    }
    
}

export {toggleOverlay};