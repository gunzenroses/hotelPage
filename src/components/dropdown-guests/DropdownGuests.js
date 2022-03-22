import { boundMethod } from 'autobind-decorator';

import DropdownItem from '../dropdown-item/DropdownItem';

export default class DropdownGuests extends DropdownItem {
  constructor(item) {
    super(item);
  }

  @boundMethod
  resetGuests() {
    this.data = [0, 0, 0];
    this.dropdownItems.forEach((_, i) => {
      this._render(i);
    });
    this._onZeroGuests();
  }

  @boundMethod
  submitGuests() {
    this.dropdownExpanded.classList.remove(this.classExpandShow);
  }

  _createClasses() {
    super._createClasses();
    this.classExpand = '.js-expand';
    this.classExpandShow = 'expand__show';

    const blockName = 'dropdown';
    this.classDropdownShow = `${ blockName }__show`;
    this.classDropdownReset = `${ blockName }__button_type_reset`;
    this.classDropdownSubmit = `${ blockName }__button_type_submit`;
  }

  _createChildren() {
    super._createChildren();
    this.dropdownExpanded = this.container.querySelector(this.classExpand);
    this.resetButton = this.dropdownExpanded.querySelector(
      `.js-${ this.classDropdownReset }`
    );
    this.submitButton = this.dropdownExpanded.querySelector(
      `.js-${ this.classDropdownSubmit }`
    );
  }

  _enableEventListeners() {
    super._enableEventListeners();
    this.resetButton.addEventListener('pointerup', this.resetGuests);
    this.submitButton.addEventListener('pointerup', this.submitGuests);
  }

  _updateInfoInput() {
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
    this._adjustInputData();
  }

  _adjustInputData() {
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
