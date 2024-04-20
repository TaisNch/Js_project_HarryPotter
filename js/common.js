const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
let playing = false;
audio.preload = 'auto';
audio.addEventListener('ended', function() {
    playing = false;
});
playButton.addEventListener('click', playStop);

function playStop() {
    if( playing) {
        audio.pause();
      } else {
        audio.play();
      }
      playing = !playing;
}

