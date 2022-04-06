import { boundMethod } from 'autobind-decorator';

import DropdownItem from '../dropdown-item/DropdownItem';

export default class Dropdown extends DropdownItem {
  constructor(item) {
    super(item);
  }

  _createClasses() {
    super._createClasses();
    const blockName = 'dropdown';
    this.classInfo = `.js-${ blockName }__info`;
    this.classExpand = `.js-${ blockName }__content`;
    this.classDropdownReset = `.js-${ blockName }__button_type_reset`;
    this.classDropdownSubmit = `.js-${ blockName }__button_type_submit`;
    this.classDropdownShow = `${ blockName }__show`;
    this.classButtonShow = `${ blockName }__button_visible`;
  }

  _createChildren() {
    super._createChildren();
    this.info = this.container.querySelector(this.classInfo);
    this.dropdownExpanded = this.container.querySelector(this.classExpand);
    this.resetButton = this.dropdownExpanded.querySelector(
      this.classDropdownReset
    );
    this.submitButton = this.dropdownExpanded.querySelector(
      this.classDropdownSubmit
    );
  }

  _enableEventListeners() {
    super._enableEventListeners();
    if (this.resetButton) {
      this.resetButton.addEventListener('pointerup', this._resetGuests);
      this.submitButton.addEventListener('pointerup', this._submitItems);
    }
    document.addEventListener('pointerup', this._clickEvent);
  }

  @boundMethod
  _clickEvent(e) {
    const clickOnExpanded = e.target.closest(this.classExpand);
    const clickOnInit = e.target.closest(this.classInfo);
    if (clickOnInit) {
      this._toggleContent();
    } else if (!clickOnExpanded) {
      this._hideElements();
    }
  }

  _updateInfoInput() {
    this.infoInput.value = '';
    if (this.resetButton) {
      this._updateGuest();
    } else {
      this._updateRooms();
    }
  }

  _updateGuest() {
    this.adultGuests = parseInt(this.data[0], 10) + parseInt(this.data[1], 10);
    this.infantGuests = parseInt(this.data[2], 10);
    this.totalGuests = this.adultGuests + this.infantGuests;

    if (this.totalGuests > 0) {
      this._onSomeGuests();
    } else {
      this._onZero();
    }
  }

  _onZero() {
    this.resetButton.classList.remove(this.classButtonShow);
  }

  _onSomeGuests() {
    this.resetButton.classList.add(this.classButtonShow);
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

  _updateRooms() {
    const roomInfo = [];
    this.data.forEach((num, i) => {
      if (num > 0) {
        roomInfo.push(this._adjustDataType(i));
      }
    });
    const roomText = roomInfo.join(', ');
    this.infoInput.value = roomText.length > 20
      ? `${ roomText.slice(0, 20) }...`
      : roomText;
  }

  _adjustDataType(j) {
    const dataType = this.dropdownItems[j].dataset.type;
    let dataTypeName;
    if (this.data[j] === 1) {
      switch (dataType) {
        case 'bedrooms':
          dataTypeName = 'спальня';
          break;
        case 'beds':
          dataTypeName = 'кровать';
          break;
        default:
          dataTypeName = 'ванная комната';
          break;
      }
    } else if (this.data[j] > 1 && this.data[j] < 5) {
      switch (dataType) {
        case 'bedrooms':
          dataTypeName = 'спальни';
          break;
        case 'beds':
          dataTypeName = 'кровати';
          break;
        default:
          dataTypeName = 'ванных комнаты';
          break;
      }
    } else {
      switch (dataType) {
        case 'bedrooms':
          dataTypeName = 'спален';
          break;
        case 'beds':
          dataTypeName = 'кроватей';
          break;
        default:
          dataTypeName = 'ванных комнат';
          break;
      }
    }
    return `${ this.data[j] } ${ dataTypeName }`;
  }

  _toggleContent() {
    console.log(11)
    this.dropdownExpanded.classList.toggle(this.classDropdownShow);
  }

  _hideElements() {
    this.dropdownExpanded.classList.remove(this.classDropdownShow);
  }

  @boundMethod
  _resetGuests() {
    this.data = [0, 0, 0];
    this.dropdownItems.forEach((_, i) => {
      this._render(i);
    });
    this._onZero();
  }

  @boundMethod
  _submitItems() {
    this.dropdownExpanded.classList.remove(this.classDropdownShow);
  }
}
