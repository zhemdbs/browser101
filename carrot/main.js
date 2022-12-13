"use strict";
const carrotItemNum = 25;
const bugItemNum = 35;
const carrotSize = 80;
const bugSize = 50;
const GAME_DURATION_SEC = 30;

const playBtn = document.querySelector('.playBtn');
const countBox = document.querySelector('.countBox')
const time = document.querySelector('.time')
const carrotNum = document.querySelector('.countCarrot');
const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();

const popUp = document.querySelector('.pop-up');
const replayBtn = document.querySelector('.replayBtn');

const bgAudio = new Audio('./sound/bg.mp3');
const alertAudio = new Audio('./sound/alert.wav');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');
const bugAudio = new Audio('./sound/bug_pull.mp3');
const winAudio = new Audio('./sound/game_win.mp3');

let timeOut;

//게임시작
function gameStart() {
  initGame();

  const text = document.querySelector('.playBtn > .blind');
  audioPlay(bgAudio);
  
  if (!(playBtn.classList.contains('controls--stop'))) {
    playBtn.classList.add('controls--stop')
    text.innerHTML = 'play';
    
    timerStop();
  } else {
    playBtn.classList.remove('controls--stop')
    text.innerHTML = 'stop';

    timerStart();
  }
}

//타이머시작
function timerStart() {
  timer();
}
//타이머 멈춤
function timerStop() {
  clearInterval(timeOut);

  audioStop(bgAudio); 
  audioPlay(alertAudio);
  popUp.style.visibility = 'visible';
  playBtn.style.visibility = 'hidden';

  if (document.querySelector('.time').innerHTML == '0:0') { 
    audioPlay(alertAudio);
    popUp.style.visibility = 'visible';
  }
}
function timer() {
  let time = GAME_DURATION_SEC;
  let min;
  let sec;

  timeOut = setInterval(() => {
    min = parseInt(time / 60);
    sec = time % 60;
    
    document.querySelector('.time').innerHTML = min + ':' + sec;
    time--;

    if (time < 0) {
      timerStop();
    }
  }, 1000)
}

//init
function initGame() {
  time.style.visibility = 'visible';
  carrotNum.style.visibility = 'visible';
  field.innerText = '';

  carrotNum.innerHTML = carrotItemNum;

  randomItem('carrot', carrotItemNum, carrotSize);
  randomItem('bug', bugItemNum, bugSize);
}
//random 아이템 배치
function randomItem(className, count, size) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - size;
  const y2 = fieldRect.height - size;
  
  for (let i = 0; i < count; i++){
    const item = document.createElement('div');
    item.setAttribute('class', className);
    item.style.position = 'absolute';
    
    const randomItemX = randomNum(x1, x2);
    const randomItemY = randomNum(y1, y2);
    
    item.style.left = `${randomItemX}px`;
    item.style.top = `${randomItemY}px`;
    field.appendChild(item);
  }
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//당근없애기
function removeCarrot(e) {
  e.preventDefault();

  const target = e.target;
  if (target.classList.contains('carrot')) {
    audioPlay(carrotAudio);
    let number = document.getElementsByClassName('carrot').length;
    
    target.remove();
    
    carrotNum.innerHTML = number - 1;
    totalCarrot();
  } else if (target.classList.contains('bug')){
    audioPlay(bugAudio);
    timerStop();
  }
}
//당근 총갯수
function totalCarrot() {
  if (document.getElementsByClassName('carrot').length === 0) {

    audioStop(bgAudio);
    audioPlay(alertAudio);
    audioPlay(winAudio);

    timerStop();
    
    document.querySelector('.alertText').innerHTML = '🎉congratulation🎉'
    popUp.style.visibility = 'visible';
  }
}

//sound play
function audioPlay(audio) {
  audio.currentTime = 0;
  audio.play();
}
//sound stop
function audioStop(audio) {
  audio.pause();
}

field.addEventListener('click', (e)=> {
  removeCarrot(e);
})
playBtn.addEventListener('click', () => {
  gameStart();
})
replayBtn.addEventListener('click', () => {
  popUp.style.visibility = 'hidden';
  playBtn.classList.add('controls--stop');
  document.querySelector('.alertText').innerHTML = 'Replay'
  gameStart();
})
