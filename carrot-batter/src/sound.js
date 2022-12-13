const bgAudio = new Audio('./sound/bg.mp3');
const alertAudio = new Audio('./sound/alert.wav');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');
const bugAudio = new Audio('./sound/bug_pull.mp3');
const winAudio = new Audio('./sound/game_win.mp3');

export function playCarrot() {
  playSound(carrotAudio);
}
export function playBug() {
  playSound(bugAudio);
}
export function playBg() {
  playSound(bgAudio);
}
export function playAlert() {
  playSound(alertAudio);
}
export function playWin() {
  playSound(winAudio);
}

export function stopBg() {
  stopSound(bgAudio)
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}