import { boundMethod } from 'autobind-decorator';

export default class DropdownRooms {
  constructor(item) {
    this.container = item;
    this.data = [];
    this.init();
  }

  init() {
    this.createClasses();
    this.createChildren();
    this.makeData();
    this.dropdownItems.forEach((_, index) => {
      this.render(index);
    });
    this.enableEventListeners();
  }

  createClasses() {
    this.classItemPlus = 'dropdown-item__plus';
    this.classItemMinus = 'dropdown-item__minus';
    this.classNumber = 'dropdown-item__number';
  }

  createChildren() {
    this.info = this.container.querySelector('.js-dropdown__info');
    this.infoInput = this.container.querySelector('.js-dropdown__input');
    this.dropdownItems = Array.from(
      this.container.querySelectorAll('.js-dropdown-item')
    );
    this.dropdownPluses = this.container.querySelectorAll(
      `.js-${ this.classItemPlus }`
    );
    this.dropdownMinuses = this.container.querySelectorAll(
      `.js-${ this.classItemMinus }`
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
    this.dropdownItems.forEach((_, i) => {
      this.dropdownMinuses[i].addEventListener('pointerup', this.minusOne);
      this.dropdownPluses[i].addEventListener('pointerup', this.plusOne);
    });
  }

  @boundMethod
  minusOne(e) {
    const order = parseInt(e.target.nextElementSibling.dataset.order, 10);
    this.data[order] -= 1;
    this.render(order);
  }

  @boundMethod
  plusOne(e) {
    const order = parseInt(e.target.previousElementSibling.dataset.order, 10);
    this.data[order] += 1;
    this.render(order);
  }

  render(i) {
    this.adjustData(i);
    this.updateItemNumber(i);
    this.updateMinusPlusButton(i);
    this.updateInfoInput();
  }

  adjustData(i) {
    const temp = this.data[i];
    if (temp < 0) {
      this.data[i] = 0;
    } else if (temp > 10) {
      this.data[i] = 10;
    }
  }

  updateItemNumber(i) {
    const dropdownItem = this.dropdownItems[i].querySelector(
      `.js-${ this.classNumber }`
    );
    dropdownItem.innerText = this.data[i];
  }

  updateMinusPlusButton(i) {
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
      this.dropdownPluses[i].classList.add(
        `${ this.classItemPlus }_disabled`
      );
    }
  }

  updateInfoInput() {
    this.infoInput.value = '';
    const roomInfo = [];
    this.data.forEach((num, i) => {
      if (num > 0) {
        roomInfo.push(this.adjustDataType(i));
      };
    });
    const roomText = roomInfo.join(', ');
    this.infoInput.value = roomText.length > 20 
      ? `${ roomText.slice(0, 20) }...` 
      : roomText;
  }

  adjustDataType(j) {
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
    return `${ this.data[j] } ${ dataTypeName } `;
  }
}
