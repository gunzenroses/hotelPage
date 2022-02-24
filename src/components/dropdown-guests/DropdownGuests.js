import { boundMethod } from 'autobind-decorator';

export default class DropdownGuests {
  constructor(item) {
    this.container = item;
    this.data = [];
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._makeData();
    this.dropdownItems.forEach((_, i) => {
      this._showItemNumber(i);
    });
    this._totalGuestsCount();
    this._enableEventListeners();
  }

  @boundMethod
  resetGuests() {
    this.data = [0, 0, 0];
    this.dropdownItems.forEach((_, i) => {
      this._showItemNumber(i);
    });
    this._onZeroGuests();
  }

  @boundMethod
  submitGuests() {
    this.dropdownExpanded.classList.remove(this.classExpandShow);
  }

  _createClasses() {
    this.classExpand = '.js-expand';
    this.classItem = 'dropdown-item';
    this.classInfo = 'dropdown__info';
    this.classInput = 'dropdown__input';
    this.classNumber = 'dropdown-item__number';
    this.classItemMinus = 'dropdown-item__minus';
    this.classItemPlus = 'dropdown-item__plus';
    this.classDropdownShow = 'dropdown__show';
    this.classExpandShow = 'expand__show';
    this.classDropdownReset = 'dropdown__button_type_reset';
    this.classDropdownSubmit = 'dropdown__button_type_submit';
  }

  _createChildren() {
    this.dropdownExpanded = this.container.querySelector(this.classExpand);
    this.info = this.container.querySelector(`.js-${ this.classInfo }`);
    this.infoInput = this.container.querySelector(`.js-${ this.classInput }`);
    this.dropdownItems = Array.from(
      this.container.querySelectorAll(`.js-${ this.classItem }`)
    );
    this.dropdownMinuses = this.container.querySelectorAll(
      `.js-${ this.classItemMinus }`
    );
    this.dropdownPluses = this.container.querySelectorAll(
      `.js-${ this.classItemPlus }`
    );
    this.resetButton = this.dropdownExpanded.querySelector(
      `.js-${ this.classDropdownReset }`
    );
    this.submitButton = this.dropdownExpanded.querySelector(
      `.js-${ this.classDropdownSubmit }`
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
    this.dropdownExpanded.addEventListener(
      'pointerup',
      this._plusAndMinusToItem
    );
    this.resetButton.addEventListener('pointerup', this.resetGuests);
    this.submitButton.addEventListener('pointerup', this.submitGuests);
  }

  @boundMethod
  _plusAndMinusToItem(e) {
    const trg = e.target;
    if (trg.classList.contains(this.classItemMinus)) {
      this._minusToItem(trg);
    }
    if (trg.classList.contains(this.classItemPlus)) {
      this._plusToItem(trg);
    }
  }

  _minusToItem(trg) {
    this.orderInData = parseInt(trg.nextElementSibling.dataset.order, 10);
    this.data[this.orderInData] -= 1;
    this._showItemNumber(this.orderInData);
    this._totalGuestsCount();
  }

  _plusToItem(trg) {
    this.orderInData = parseInt(trg.previousElementSibling.dataset.order, 10);
    this.data[this.orderInData] += 1;
    this._showItemNumber(this.orderInData);
    this._totalGuestsCount();
  }

  _showItemNumber(i) {
    const temp = this.data[i];
    if (temp < 0) {
      this.data[i] = 0;
    } else if (temp >= 10) {
      this.data[i] = 10;
    }
    const dropdownItem = this.dropdownItems[i].querySelector(
      `.js-${ this.classNumber }`
    );
    dropdownItem.innerText = this.data[i];
    this._activateMinusPlus(i);
  }

  _activateMinusPlus(i) {
    if (this.data[i] <= 0) {
      this.dropdownMinuses[i].classList.add(
        `${ this.classItemMinus }_disabled`
      );
    } else if (this.data[i] > 0 && this.data[i] < 10) {
      this.dropdownPluses[i].classList.remove(
        `${ this.classItemPlus }_disabled`
      );
      this.dropdownMinuses[i].classList.remove(
        `${ this.classItemMinus }_disabled`
      );
    } else {
      this.dropdownPluses[i].classList.add(`${ this.classItemPlus }_disabled`);
    }
  }

  _totalGuestsCount() {
    this.adultGuests = parseInt(this.data[0], 10) + parseInt(this.data[1], 10);
    this.infantGuests = parseInt(this.data[2], 10);
    this.totalGuests = this.adultGuests + this.infantGuests;

    if (this.totalGuests > 0) {
      this._onSomeGuests();
    } else {
      this._onZeroGuests();
    }
  }

  _onZeroGuests() {
    this.resetButton.classList.remove(this.classDropdownShow);
    this.infoInput.value = '';
  }

  _onSomeGuests() {
    this.resetButton.classList.add(this.classDropdownShow);
    this._render();
  }

  _render() {
    const adultWord = this._matchWordForAdult();
    const infantWord = this._matchWordForInfant();

    const onlyAdults = this.adultGuests > 0 && this.infantGuests < 1;
    const onlyInfants = this.adultGuests < 1 && this.infantGuests > 0;
    const adultsWithInfants = this.adultGuests > 0 && this.infantGuests > 0;

    const adultsInfo = `${ this.adultGuests } ${ adultWord }`;
    const infantsInfo = `${ this.infantGuests } ${ infantWord }`;

    switch (true) {
      case onlyAdults:
        this.infoInput.value = adultsInfo;
        break;
      case onlyInfants:
        this.infoInput.value = infantsInfo;
        break;
      case adultsWithInfants:
        this.infoInput.value = `${ adultsInfo }, ${ infantsInfo }`;
        break;
      default:
        this.infoInput.value = '';
        break;
    }
  }

  _matchWordForAdult() {
    let form;
    switch (this.adultGuests) {
      case 1:
      case 21:
        form = 'гость';
        break;
      case 2:
      case 3:
      case 4:
      case 22:
      case 23:
      case 24:
        form = 'гостя';
        break;
      default:
        form = 'гостей';
        break;
    }
    return form;
  }

  _matchWordForInfant() {
    let form;
    switch (this.infantGuests) {
      case 1:
      case 21:
        form = 'младенец';
        break;
      case 2:
      case 3:
      case 4:
      case 22:
      case 23:
      case 24:
        form = 'младенца';
        break;
      default:
        form = 'младенцев';
        break;
    }
    return form;
  }
}
