export default class DropdownGuests {
  constructor(item) {
    this.container = item;
    this.data = [];
    this.init();
  }

  init() {
    this.createChildren();
    this.makeData();
    this.dropdownItems.forEach((_, i) => {
      this.showItemNumber(i);
    });
    this.totalGuestsCount();
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren() {
    this.dropdownExpanded = this.container.querySelector('.js-expand__content');
    this.info = this.container.querySelector('.js-dropdown__info');
    this.infoInput = this.container.querySelector('.js-dropdown__input');
    this.dropdownItems = Array.from(
      this.container.querySelectorAll('.js-dropdown__item')
    );
    this.dropdownMinuses = this.container.querySelectorAll(
      '.js-dropdown__minus'
    );
    this.resetButton = this.dropdownExpanded.querySelector(
      '.js-dropdown__button_type_reset'
    );
    this.submitButton = this.dropdownExpanded.querySelector(
      '.js-dropdown__button_type_submit'
    );
  }

  makeData() {
    const nums = Array.from(
      this.container.querySelectorAll('.js-dropdown__number')
    );
    nums.forEach((num) => {
      const value = parseInt(num.textContent, 10);
      this.data.push(value);
    });
  }

  enableHandlers() {
    this.plusAndMinusHandler = this.plusAndMinusToItem.bind(this);
    this.resetGuestsHandler = this.resetGuests.bind(this);
    this.submitGuestsHandler = this.submitGuests.bind(this);
  }

  enableEventListeners() {
    this.dropdownExpanded.addEventListener('click', this.plusAndMinusHandler);
    this.resetButton.addEventListener('click', this.resetGuestsHandler);
    this.submitButton.addEventListener('click', this.submitGuestsHandler);
  }

  plusAndMinusToItem(e) {
    const trg = e.target;
    if (trg.classList.contains('js-dropdown__minus')) this.minusToItem(trg);
    if (trg.classList.contains('js-dropdown__plus')) this.plusToItem(trg);
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

  resetGuests(e) {
    e.preventDefault();
    this.data = [0, 0, 0];
    this.dropdownItems.forEach((_, i) => {
      this.showItemNumber(i);
    });
    this.onZeroGuests();
  }

  submitGuests(e) {
    e.preventDefault();
    this.dropdownExpanded.classList.remove('js-expand__show');
  }

  showItemNumber(i) {
    this.data[i] = this.data[i] < 0 ? 0 : this.data[i] > 10 ? 10 : this.data[i];
    const dropdownItem = this.dropdownItems[i].querySelector(
      '.js-dropdown__number'
    );
    dropdownItem.innerText = this.data[i];
    this.activateMinus(i);
  }

  activateMinus(i) {
    if (this.data[i] > 0) {
      this.dropdownMinuses[i].classList.remove('js-button_disabled');
    } else {
      this.dropdownMinuses[i].classList.add('js-button_disabled');
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
    this.resetButton.classList.remove('js-button__show');
    this.infoInput.value = '';
  }

  onSomeGuests() {
    this.resetButton.classList.add('js-button__show');
    this.render();
  }

  render() {
    const adultWord = this.matchWordForAdult();
    const infantWord = this.matchWordForInfant();

    const onlyAdults = this.adultGuests > 0 && this.infantGuests < 1;
    const onlyInfants = this.adultGuests < 1 && this.infantGuests > 0;
    const adultsWithInfants = this.adultGuests > 0 && this.infantGuests > 0;

    const adultsInfo = `${this.adultGuests} ${adultWord}`;
    const infantsInfo = `${this.infantGuests} ${infantWord}`;

    this.infoInput.value = (onlyAdults)
      ? adultsInfo
      : ((onlyInfants)
        ? infantsInfo
        : (adultsWithInfants
          ? `${adultsInfo}, ${infantsInfo}`
          : ''));
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
