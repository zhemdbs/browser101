"use strict";
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as  sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 30;


const gameFinishBanner = new PopUp();

//정확하게 어떤 값을 설정하는지 한눈에 알아 보기 쉬운 장점
const game = new GameBuilder()
  .withGameDuration(GAME_DURATION_SEC)
  .withCarrotCount(CARROT_COUNT)
  .withBugCount(BUG_COUNT)
  .build();

game.setGameStopLister((reason)=> {
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'REPLAY?';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WIN'
      sound.playWin();
      break
    case Reason.lose :
      message = 'YOU LOSE'
      sound.playAlert();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(()=> {
  game.start();
})


