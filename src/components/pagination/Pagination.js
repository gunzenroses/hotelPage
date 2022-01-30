import { boundMethod } from 'autobind-decorator';
import paginationData1 from 'Scripts/my-data';

class Pagination {
  constructor(item) {
    this.data = paginationData1;
    this.num = this.data.currentNum;
    this.createContainer(item);
    this.init();
  }

  createContainer(item) {
    this.paginationContainer = item;
    this.pageButtons = document.createElement('div');
    this.pageButtons.classList.add(
      'pagination__content',
      'js-pagination__content'
    );
    this.paginationContainer.prepend(this.pageButtons);

    this.paginationInfo = document.createElement('div');
    this.paginationInfo.classList.add(
      'pagination__info',
      'js-pagination__info'
    );
    this.paginationContainer.append(this.paginationInfo);
  }

  init() {
    this.render();
    this.createChildren();
    this.enable();
  }

  createChildren() {
    this.buttonItems = Array.from(
      this.pageButtons.querySelectorAll('.js-pagination__item')
    );
    this.buttonFirst = this.pageButtons.querySelector(
      '.js-pagination__button_first'
    );
    this.buttonLast = this.pageButtons.querySelector(
      '.js-pagination__button_last'
    );
    this.buttonNext = this.num < this.data.totalNum
      ? this.pageButtons.querySelector('.js-pagination__button_next')
      : null;
    this.buttonPrev = this.num > 3
      ? this.pageButtons.querySelector('.js-pagination__button_prev')
      : null;
  }

  enable() {
    this.buttonItems.forEach((item) => {
      item.addEventListener('click', this.onButtonClick);
    });
    if (this.buttonNext) {
      this.buttonNext.addEventListener('click', this.onButtonNextClick);
    }
    if (this.buttonPrev) {
      this.buttonPrev.addEventListener('click', this.onButtonPrevClick);
    }
    if (this.buttonFirst) {
      this.buttonFirst.addEventListener('click', this.onButtonFirstClick);
    }
    if (this.buttonLast) {
      this.buttonLast.addEventListener('click', this.onButtonLastClick);
    }
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
    const starting = ifNumIsOne ? 1 : this.min;
    const ending = ifNumIsOne ? 3 : this.max;

    for (let i = starting; i <= ending; i += 1) {
      this.pageButtons.appendChild(this.addButton(i));
    }
  }

  addButton(i) {
    const button = document.createElement('button');
    button.innerText = i;
    button.value = i;
    if (i === this.num) {
      button.classList.add(
        'pagination__item',
        'pagination__item_current',
        'js-pagination__item_current'
      );
    } else {
      button.classList.add(
        'pagination__item',
        'js-pagination__item'
      );
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
    const paginationRest = 'pagination__item js-pagination__item';
    this.pageButtons.innerHTML = `${
      this.pageButtons.innerHTML
    }<button value='4' class= ${ paginationRest }>...</button>`;
  }

  addLastButton() {
    const paginationLast = 'pagination__button_last js-pagination__button_last';
    this.pageButtons.innerHTML = `${
      this.pageButtons.innerHTML
    }<button class= 'pagination__button ${ paginationLast }'>15</button>`;
  }

  addPrevButton() {
    const paginationPrev = 'pagination__button pagination__button_prev';
    this.pageButtons.innerHTML = `
      <button class= '${ paginationPrev } js-pagination__button_prev'></button>
      ${ this.pageButtons.innerHTML }`;
  }

  addNextButton() {
    const paginationNext = 'pagination__button pagination__button_next';
    this.pageButtons.innerHTML = `
      ${ this.pageButtons.innerHTML }
      <button class= '${
  paginationNext } js-pagination__button_next'></button>`;
  }

  addFirstButton() {
    const patinationFirst = 'pagination__button pagination__button_first';
    this.pageButtons.innerHTML = `
      <button class= '${
  patinationFirst } js-pagination__button_first'>1</button>
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
