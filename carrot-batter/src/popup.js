"use strict";

export default class PopUp {
  //constructor을 통해 필요한 것들 초기화
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');

    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    })          
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide')
  }
}