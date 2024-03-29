import { boundMethod } from 'autobind-decorator';
import * as paginationData from './pagination.json';

class Pagination {
  constructor(item) {
    this.data = paginationData;
    this.num = this.data.currentNum;
    this.init(item);
  }

  init(item) {
    this._createClasses();
    this._createContainer(item);
    this._enable();
  }

  _createClasses() {
    this.classContent = 'pagination__content';
    this.classInfo = 'pagination__info';

    const currentMod = 'current';
    this.classItem = 'pagination__item';
    this.arrClassesOfItem = [this.classItem, `js-${ this.classItem }`];
    this.arrClassesOfItemCurrent = [this.classItem, `${ this.classItem }_${
      currentMod }`, `js-${ this.classItem }_${ currentMod }`];

    const lastMod = 'last';
    const firstMod = 'first';
    const nextMod = 'next';
    const prevMod = 'prev';
    this.classButton = 'pagination__button';
    this.classButtonLast = `${ this.classButton } ${ this.classButton }_${
      lastMod } js-${ this.classButton }_${ lastMod }`;
    this.selectorButtonLast = `.js-${ this.classButton }_${ lastMod }`;
    this.classButtonFirst = `${ this.classButton } ${ this.classButton }_${
      firstMod } js-${ this.classButton }_${ firstMod }`;
    this.selectorButtonFirst = `.js-${ this.classButton }_${ firstMod }`;
    this.classButtonNext = `${ this.classButton } ${ this.classButton }_${
      nextMod } js-${ this.classButton }_${ nextMod }`;
    this.selectorButtonNext = `.js-${ this.classButton }_${ nextMod }`;
    this.classButtonPrev = `${ this.classButton } ${ this.classButton }_${
      prevMod } js-${ this.classButton }_${ prevMod }`;
    this.selectorButtonPrev = `.js-${ this.classButton }_${ prevMod }`;
  }

  _createContainer(item) {
    this.paginationContainer = item;
    this.pageButtons = document.createElement('div');
    this.pageButtons.classList.add(
      this.classContent,
      `js-${ this.classContent }`
    );
    this.paginationInfo = document.createElement('div');
    this.paginationInfo.classList.add(this.classInfo, `js-${ this.classInfo }`);
  }

  _enable() {
    this._render();
    this._createChildren();
    this._addListeners();
    this._addToContainer();
  }

  _createChildren() {
    this.buttonItems = Array.from(
      this.pageButtons.querySelectorAll(`.js-${ this.classItem }`)
    );
    this.buttonFirst = this.pageButtons.querySelector(this.selectorButtonFirst);
    this.buttonLast = this.pageButtons.querySelector(this.selectorButtonLast);
    this.buttonNext = this.num < this.data.totalNum
      ? this.pageButtons.querySelector(this.selectorButtonNext)
      : null;
    this.buttonPrev = this.num > 3
      ? this.pageButtons.querySelector(this.selectorButtonPrev)
      : null;
  }

  _addListeners() {
    this.buttonItems.forEach((item) => {
      item.addEventListener('pointerup', this._onButtonClick);
    });
    if (this.buttonNext) {
      this.buttonNext.addEventListener('pointerup', this._onButtonNextClick);
    }
    if (this.buttonPrev) {
      this.buttonPrev.addEventListener('pointerup', this._onButtonPrevClick);
    }
    if (this.buttonFirst) {
      this.buttonFirst.addEventListener('pointerup', this._onButtonFirstClick);
    }
    if (this.buttonLast) {
      this.buttonLast.addEventListener('pointerup', this._onButtonLastClick);
    }
  }

  _addToContainer() {
    this.paginationContainer.prepend(this.pageButtons);
    this.paginationContainer.append(this.paginationInfo);
  }

  _render() {
    this.pageButtons.innerHTML = '';
    this._countMinMax();
    this._makeNumberButtons();
    this._makeNavigationButtons();
    this._makeInfoLine();
  }

  _countMinMax() {
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

  _makeNumberButtons() {
    const ifNumIsOne = this.num === 1;
    const start = ifNumIsOne ? 1 : this.min;
    const end = ifNumIsOne ? 3 : this.max;
    Array.from({ length: end - start + 1 }, (_, i) => i + start).forEach(
      (i) => {
        this.pageButtons.appendChild(this._addButton(i));
      }
    );
  }

  _addButton(i) {
    const button = document.createElement('button');
    button.innerText = i;
    button.value = i;
    if (i === this.num) {
      button.classList.add(...this.arrClassesOfItemCurrent);
    } else {
      button.classList.add(...this.arrClassesOfItem);
    }
    return button;
  }

  _makeNavigationButtons() {
    if (this.num === 1) this._addRestButton();
    if (this.num <= 3) this._addLastButton();
    if (this.num < this.max) {
      this._addNextButton();
    } else {
      this._addFirstButton();
    }
    if (this.num > 3) this._addPrevButton();
  }

  _addRestButton() {
    this.pageButtons.innerHTML = `${
      this.pageButtons.innerHTML }<button value = '4' class = 'js-${
      this.classItem } ${ this.classItem }'>...</button>`;
  }

  _addLastButton() {
    this.pageButtons.innerHTML = `${
      this.pageButtons.innerHTML }<button class = '${
      this.classButtonLast }'>15</button>`;
  }

  _addPrevButton() {
    this.pageButtons.innerHTML = `
      <button class = '${ this.classButtonPrev }'></button>
      ${ this.pageButtons.innerHTML }`;
  }

  _addNextButton() {
    this.pageButtons.innerHTML = `
      ${ this.pageButtons.innerHTML }
      <button class = '${ this.classButtonNext }'></button>`;
  }

  _addFirstButton() {
    this.pageButtons.innerHTML = `
      <button class = '${ this.classButtonFirst }'>1</button>
      ${ this.pageButtons.innerHTML }`;
  }

  _makeInfoLine() {
    this.paginationInfo.innerHTML = '';
    const trimStart = (this.num - 1) * this.data.itemsPerPage + 1;
    const trimEnd = trimStart + this.data.itemsPerPage - 1;
    this.paginationInfo.innerText = `${
      trimStart } – ${ trimEnd } из 100+ вариантов аренды`;
  }

  @boundMethod
  _onButtonClick(e) {
    this.num = parseInt(e.target.value, 10);
    this._enable();
  }

  @boundMethod
  _onButtonNextClick() {
    this.num += 1;
    this._enable();
  }

  @boundMethod
  _onButtonPrevClick() {
    this.num -= 1;
    this._enable();
  }

  @boundMethod
  _onButtonFirstClick() {
    this.num = 1;
    this._enable();
  }

  @boundMethod
  _onButtonLastClick() {
    this.num = 15;
    this._enable();
  }
}

export default Pagination;
