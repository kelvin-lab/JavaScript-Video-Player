// get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay (){
    video[video.paused? 'play' :'pause']();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent=icon;
}

function skip(){
    video.currentTime+= parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}


/**
 * The function `handleProgress` calculates the percentage of video playback completed and updates the
 * progress bar accordingly.
 */
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}

/* The `function scrub(e)` is a function that calculates the time in the video to skip to based on the
position where the user clicks on the progress bar. It calculates the percentage of the progress bar
where the user clicked, then uses that percentage to determine the time in the video to skip to.
This allows the user to scrub through the video by clicking on the progress bar. */
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}

//hook up the event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button=>button.addEventListener('click', skip))

ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove', handleRangeUpdate))

let mouseDown= false
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e)=>mouseDown&&scrub(e))
progress.addEventListener('mousedown', ()=>mouseDown=true)
progress.addEventListener('mouseup', ()=>mouseDown=false)