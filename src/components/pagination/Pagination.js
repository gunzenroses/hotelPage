import { boundMethod } from 'autobind-decorator';
import * as paginationData from './pagination.json';

class Pagination {
  constructor(item) {
    this.data = paginationData;
    this.num = this.data.currentNum;
    this.createClasses();
    this.createContainer(item);
    this.init();
  }

  createClasses(){
    this.classContent = 'pagination__content';
    this.classInfo = 'pagination__info';
    this.classItem = 'pagination__item';
    this.classItemCurrent = 'pagination__item_current';
    this.classButton = 'pagination__button';
    this.classButtonNext = 'pagination__button_next';
    this.classButtonPrev = 'pagination__button_prev';
    this.classButtonFirst = 'pagination__button_first';
    this.classButtonLast = 'pagination__button_last';
  }
 
  createContainer(item) {
    this.paginationContainer = item;
    this.pageButtons = document.createElement('div');
    this.pageButtons.classList.add(
      this.classContent,
      `js-${ this.classContent }`
    );
    
    this.paginationInfo = document.createElement('div');
    this.paginationInfo.classList.add(
      this.classInfo, 
      `js-${ this.classInfo }`
    );
    
  }

  init() {
    this.render();
    this.createChildren();
    this.enable();
    this.addToContainer();
  }

  createChildren() {
    this.buttonItems = Array.from(
      this.pageButtons.querySelectorAll(`.js-${ this.classItem }`)
    );
    this.buttonFirst = this.pageButtons.querySelector(
      `.js-${ this.classButtonFirst }`
    );
    this.buttonLast = this.pageButtons.querySelector(
      `.js-${ this.classButtonLast }`
    );
    this.buttonNext = this.num < this.data.totalNum
      ? this.pageButtons.querySelector(`.js-${ this.classButtonNext }`)
      : null;
    this.buttonPrev = this.num > 3
      ? this.pageButtons.querySelector(`.js-${ this.classButtonPrev }`)
      : null;
  }

  enable() {
    this.buttonItems.forEach((item) => {
      item.addEventListener('pointerup', this.onButtonClick);
    });
    if (this.buttonNext) {
      this.buttonNext.addEventListener('pointerup', this.onButtonNextClick);
    }
    if (this.buttonPrev) {
      this.buttonPrev.addEventListener('pointerup', this.onButtonPrevClick);
    }
    if (this.buttonFirst) {
      this.buttonFirst.addEventListener('pointerup', this.onButtonFirstClick);
    }
    if (this.buttonLast) {
      this.buttonLast.addEventListener('pointerup', this.onButtonLastClick);
    }
  }

  addToContainer(){
    this.paginationContainer.prepend(this.pageButtons);
    this.paginationContainer.append(this.paginationInfo);
  }

  render() {
    this.pageButtons.innerHTML = '';
    this.countMinMax();
    this.makeNumberButtons();
    this.makeNavigationButtons();
    this.makeInfoLine();
  }

  countMinMax() {
    const halfOfVisible = parseInt(Math.floor(this.data.visibleNum / 2), 10);
    const currNum = parseInt(this.num, 10);
    this.min = currNum - halfOfVisible;
    this.leftDif = this.data.visibleNum - halfOfVisible - 1;
    this.max = currNum + this.leftDif;

    if (this.min < 1) {
      this.min = 1;
      this.max = this.data.visibleNum;
    }

    if (this.max > this.data.totalNum) {
      this.max = this.data.totalNum;
      this.min = this.max - (this.data.visibleNum - 1);
    }
  }

  makeNumberButtons() {
    const ifNumIsOne = this.num === 1;
    const start = ifNumIsOne ? 1 : this.min;
    const end = ifNumIsOne ? 3 : this.max;
    Array.from(
      { length: (end - start + 1) },
      (_, i) => i + start
    ).forEach((i) => {
      this.pageButtons.appendChild(this.addButton(i)) 
    });
  }

  addButton(i) {
    const button = document.createElement('button');
    button.innerText = i;
    button.value = i;
    if (i === this.num) {
      button.classList.add(
        this.classItem,
        this.classItemCurrent,
        `js-${ this.classItemCurrent }`
      );
    } else {
      button.classList.add(this.classItem, `js-${ this.classItem }`);
    }
    return button;
  }

  makeNavigationButtons() {
    if (this.num === 1) this.addRestButton();
    if (this.num <= 3) this.addLastButton();
    if (this.num < this.max) {
      this.addNextButton();
    } else {
      this.addFirstButton();
    }
    if (this.num > 3) this.addPrevButton();
  }

  addRestButton() {
    this.pageButtons.innerHTML = `${
      this.pageButtons.innerHTML
    }<button value = '4' class = 'js-${
       this.classItem 
      } ${ this.classItem }'>...</button>`;
  }

  addLastButton() {
    this.pageButtons.innerHTML = `${
      this.pageButtons.innerHTML
    }<button class = 'pagination__button js-${ 
        this.classButtonLast 
      } ${ this.classButtonLast } '>15</button>`;
  }

  addPrevButton() {
    this.pageButtons.innerHTML = `
      <button class = 'pagination__button js-${ 
        this.classButtonPrev 
      } ${ this.classButtonPrev }'></button>
      ${ this.pageButtons.innerHTML }`;
  }

  addNextButton() {
    this.pageButtons.innerHTML = `
      ${this.pageButtons.innerHTML}
      <button class = 'pagination__button js-${
        this.classButtonNext
      } ${ this.classButtonNext }'></button>`;
  }

  addFirstButton() {
    this.pageButtons.innerHTML = `
      <button class = 'pagination__button js-${
        this.classButtonFirst 
      } ${ this.classButtonFirst }'>1</button>
      ${ this.pageButtons.innerHTML }`;
  }

  makeInfoLine() {
    this.paginationInfo.innerHTML = '';
    const trimStart = (this.num - 1) * this.data.itemsPerPage + 1;
    const trimEnd = trimStart + this.data.itemsPerPage - 1;
    this.paginationInfo.innerText = `${
      trimStart } – ${ trimEnd } из 100+ вариантов аренды`;
  }

  @boundMethod
  onButtonClick(e) {
    this.num = parseInt(e.target.value, 10);
    this.init();
  }

  @boundMethod
  onButtonNextClick() {
    this.num += 1;
    this.init();
  }

  @boundMethod
  onButtonPrevClick() {
    this.num -= 1;
    this.init();
  }

  @boundMethod
  onButtonFirstClick() {
    this.num = 1;
    this.init();
  }

  @boundMethod
  onButtonLastClick() {
    this.num = 15;
    this.init();
  }
}

export default Pagination;
