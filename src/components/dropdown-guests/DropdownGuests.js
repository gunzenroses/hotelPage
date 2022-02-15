import { boundMethod } from 'autobind-decorator';

export default class DropdownGuests {
  constructor(item) {
    this.container = item;
    this.data = [];
    this.init();
  }

  init() {
    this.createClasses();
    this.createChildren();
    this.makeData();
    this.dropdownItems.forEach((_, i) => {
      this.showItemNumber(i);
    });
    this.totalGuestsCount();
    this.enableEventListeners();
  }

  createClasses() {
    this.classNumber = 'dropdown-item__number';
    this.classItemMinus = 'dropdown-item__minus';
    this.classItemPlus = 'dropdown-item__plus';
  }

  createChildren() {
    this.dropdownExpanded = this.container.querySelector('.js-expand__content');
    this.info = this.container.querySelector('.js-dropdown__info');
    this.infoInput = this.container.querySelector('.js-dropdown__input');
    this.dropdownItems = Array.from(
      this.container.querySelectorAll('.js-dropdown-item')
    );
    this.dropdownMinuses = this.container.querySelectorAll(
      `.js-${ this.classItemMinus }`
    );
    this.dropdownPluses = this.container.querySelectorAll(
      `.js-${ this.classItemPlus }`
    );
    this.resetButton = this.dropdownExpanded.querySelector(
      '.js-dropdown__button_type_reset'
    );
    this.submitButton = this.dropdownExpanded.querySelector(
      '.js-dropdown__button_type_submit'
    );
  }

  makeData() {
    Array.from(
      this.container.querySelectorAll(`.js-${ this.classNumber }`)
    ).forEach((num) => {
      const value = parseInt(num.textContent, 10);
      this.data.push(value);
    });
  }

  enableEventListeners() {
    this.dropdownExpanded.addEventListener('pointerup', this.plusAndMinusToItem);
    this.resetButton.addEventListener('pointerup', this.resetGuests);
    this.submitButton.addEventListener('pointerup', this.submitGuests);
  }

  @boundMethod
  plusAndMinusToItem(e) {
    const trg = e.target;
    if (trg.classList.contains(this.classItemMinus)) {
      this.minusToItem(trg);
    }
    if (trg.classList.contains(this.classItemPlus)) {
      this.plusToItem(trg);
    }
  }

  minusToItem(trg) {
    this.orderInData = parseInt(trg.nextElementSibling.dataset.order, 10);
    this.data[this.orderInData] -= 1;
    this.showItemNumber(this.orderInData);
    this.totalGuestsCount();
  }

  plusToItem(trg) {
    this.orderInData = parseInt(trg.previousElementSibling.dataset.order, 10);
    this.data[this.orderInData] += 1;
    this.showItemNumber(this.orderInData);
    this.totalGuestsCount();
  }

  @boundMethod
  resetGuests(e) {
    e.preventDefault();
    this.data = [0, 0, 0];
    this.dropdownItems.forEach((_, i) => {
      this.showItemNumber(i);
    });
    this.onZeroGuests();
  }

  @boundMethod
  submitGuests(e) {
    e.preventDefault();
    this.dropdownExpanded.classList.remove('expand__show');
  }

  showItemNumber(i) {
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
    this.activateMinusPlus(i);
  }

  activateMinusPlus(i) {
    if (this.data[i] <= 0) {
      this.dropdownMinuses[i].classList.add(`${ 
        this.classItemMinus }_disabled`);
    } else if (this.data[i] > 0 && this.data[i] < 10) {
      this.dropdownPluses[i].classList.remove(`${ 
        this.classItemPlus }_disabled`);
      this.dropdownMinuses[i].classList.remove(`${ 
        this.classItemMinus }_disabled`);
    } else {
      this.dropdownPluses[i].classList.add(`${
        this.classItemPlus }_disabled`);
    }
  }

  totalGuestsCount() {
    this.adultGuests = parseInt(this.data[0], 10) + parseInt(this.data[1], 10);
    this.infantGuests = parseInt(this.data[2], 10);
    this.totalGuests = this.adultGuests + this.infantGuests;

    if (this.totalGuests > 0) {
      this.onSomeGuests();
    } else {
      this.onZeroGuests();
    }
  }

  onZeroGuests() {
    this.resetButton.classList.remove('dropdown__show');
    this.infoInput.value = '';
  }

  onSomeGuests() {
    this.resetButton.classList.add('dropdown__show');
    this.render();
  }

  render() {
    const adultWord = this.matchWordForAdult();
    const infantWord = this.matchWordForInfant();

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

  matchWordForAdult() {
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

  matchWordForInfant() {
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
