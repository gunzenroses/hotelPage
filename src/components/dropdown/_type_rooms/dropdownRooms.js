export default class DropdownRooms {
  constructor(containerId, data) {
    this.data = [...data];
    this.init(containerId);
  }

  init(id) {
    this.createChildren(id);
    this.dropdownItems.forEach((_, index) => { this.render(index); });
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren(id) {
    this.container = document.getElementById(id);
    this.info = this.container.querySelector('.js-dropdown__info');
    this.infoInput = this.container.querySelector('.js-dropdown__input');
    this.dropdownItems = Array.from(this.container.querySelectorAll('.js-dropdown__item_expanded'));
    this.dropdownPluses = this.container.querySelectorAll('.js-dropdown__plus');
    this.dropdownMinuses = this.container.querySelectorAll('.js-dropdown__minus');
  }

  enableHandlers() {
    this.minusOneHandler = this.minusOne.bind(this);
    this.plusOneHandler = this.plusOne.bind(this);
  }

  enableEventListeners() {
    this.dropdownItems.forEach((_, i) => {
      this.dropdownMinuses[i].addEventListener('click', this.minusOneHandler);
      this.dropdownPluses[i].addEventListener('click', this.plusOneHandler);
    });
  }

  minusOne(e) {
    const order = parseInt(e.target.nextElementSibling.dataset.order, 10);
    this.data[order] -= 1;
    this.render(order);
  }

  plusOne(e) {
    const order = parseInt(e.target.previousElementSibling.dataset.order, 10);
    this.data[order] += 1;
    this.render(order);
  }

  render(i) {
    this.adjustData(i);
    this.updateItemNumber(i);
    this.updateMinusButton(i);
    this.updateInfoInput();
  }

  adjustData(i) {
    this.data[i] = (this.data[i] < 0)
      ? 0
      : ((this.data[i] > 10)
        ? 10
        : this.data[i]);
  }

  updateItemNumber(i) {
    const dropdownItem = this.dropdownItems[i].querySelector('.js-dropdown__number');
    dropdownItem.innerText = this.data[i];
  }

  updateMinusButton(i) {
    if (this.data[i] > 0) {
      this.dropdownMinuses[i].classList.remove('button_disabled');
    } else {
      this.dropdownMinuses[i].classList.add('button_disabled');
    }
  }

  updateInfoInput() {
    this.infoInput.value = '';
    this.roomInfo = '';
    this.data.forEach((_, i) => {
      this.roomInfo += this.adjustDataType(i);
    });
    this.infoInput.value = `${this.roomInfo.slice(0, 20)}...`;
  }

  adjustDataType(j) {
    const dataType = this.dropdownItems[j].dataset.type;
    let dataTypeName;
    if (this.data[j] === 0) {
      switch (dataType) {
        case 'bedrooms': dataTypeName = 'спален'; break;
        case 'beds': dataTypeName = 'кроватей'; break;
        default: dataTypeName = 'ванных комнат'; break;
      }
    } else if (this.data[j] === 1) {
      switch (dataType) {
        case 'bedrooms': dataTypeName = 'спальня'; break;
        case 'beds': dataTypeName = 'кровать'; break;
        default: dataTypeName = 'ванная комната'; break;
      }
    } else if (this.data[j] > 1 && this.data[j] < 5) {
      switch (dataType) {
        case 'bedrooms': dataTypeName = 'спальни'; break;
        case 'beds': dataTypeName = 'кровати'; break;
        default: dataTypeName = 'ванных комнаты'; break;
      }
    } else {
      switch (dataType) {
        case 'bedrooms': dataTypeName = 'спален'; break;
        case 'beds': dataTypeName = 'кроватей'; break;
        default: dataTypeName = 'ванных комнат'; break;
      }
    }
    return `${this.data[j]} ${dataTypeName}, `;
  }
}
