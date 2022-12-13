"use strict";

import * as  sound from './sound.js';

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    //1.
    // this.onClick = this.onClick.bind(this);
    // this.field.addEventListener('click', this.onClick);
    //2.
    // this.field.addEventListener('click', (e)=> this.onClick(e));
    //3.
    this.field.addEventListener('click', this.onClick);

  }

  init() {
    this.field.innerHTML = '';

    this._addItem('carrot', this.carrotCount, 'img/carrot.png', CARROT_SIZE)
    this._addItem('bug', this.bugCount, 'img/bug.png', BUG_SIZE)
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath, size) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - size;
    const y2 = this.fieldRect.height - size;
  
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
  
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
  
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item)
    }
  }

  onClick = (e)=>{
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}