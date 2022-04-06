import { boundMethod } from 'autobind-decorator';

export default class DropdownItem {
  constructor(item) {
    this.container = item;
    this.data = [];
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._makeData();
    this.dropdownItems.forEach((_, index) => {
      this._render(index);
    });
    this._enableEventListeners();
  }

  _createClasses() {
    const modDisabled = 'disabled';
    this.classInput = 'dropdown__input';

    this.classItem = 'dropdown-item';
    this.classItemPlus = `${ this.classItem }__plus`;
    this.classItemMinus = `${ this.classItem }__minus`;
    this.classNumber = `${ this.classItem }__number`;
    this.classItemPlusDisabled = `${ this.classItemPlus }_${ modDisabled }`;
    this.classItemMinusDisabled = `${ this.classItemMinus }_${ modDisabled }`;
  }

  _createChildren() {
    this.infoInput = this.container.querySelector(`.js-${ this.classInput }`);
    this.dropdownItems = Array.from(
      this.container.querySelectorAll(`.js-${ this.classItem }`)
    );
    this.dropdownPluses = this.container.querySelectorAll(
      `.js-${ this.classItemPlus }`
    );
    this.dropdownMinuses = this.container.querySelectorAll(
      `.js-${ this.classItemMinus }`
    );
  }

  _makeData() {
    Array.from(
      this.container.querySelectorAll(`.js-${ this.classNumber }`)
    ).forEach((num) => {
      const value = parseInt(num.textContent, 10);
      this.data.push(value);
    });
  }
 
  _enableEventListeners() {
    this.dropdownItems.forEach((_, i) => {
      this.dropdownMinuses[i].addEventListener('pointerup', this._minusOne);
      this.dropdownPluses[i].addEventListener('pointerup', this._plusOne);
    });
  }

  @boundMethod
  _minusOne(e) {
    const order = parseInt(e.target.nextElementSibling.dataset.order, 10);
    this.data[order] -= 1;
    this._render(order);
  }

  @boundMethod
  _plusOne(e) {
    const order = parseInt(e.target.previousElementSibling.dataset.order, 10);
    this.data[order] += 1;
    this._render(order);
  }

  _render(i){
    this._adjustData(i);
    this._updateItemNumber(i);
    this._updateMinusPlusButton(i);
    this._updateInfoInput();
  }

  _adjustData(i) {
    const temp = this.data[i];
    if (temp < 0) {
      this.data[i] = 0;
    } else if (temp > 10) {
      this.data[i] = 10;
    }
  }

  _updateItemNumber(i) {
    const dropdownItem = this.dropdownItems[i].querySelector(
      `.js-${ this.classNumber }`
    );
    dropdownItem.innerText = this.data[i];
  }

  _updateMinusPlusButton(i) {
    if (this.data[i] <= 0) {
      this.dropdownMinuses[i].classList.add(this.classItemMinusDisabled);
    } else if (this.data[i] > 0 && this.data[i] < 10) {
      this.dropdownPluses[i].classList.remove(this.classItemPlusDisabled);
      this.dropdownMinuses[i].classList.remove(this.classItemMinusDisabled);
    } else {
      this.dropdownPluses[i].classList.add(this.classItemPlusDisabled);
    }
  }

  _updateInfoInput() {
    this.infoInput = '';
  }
}