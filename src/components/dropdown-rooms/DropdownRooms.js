import { boundMethod } from "autobind-decorator";

export default class DropdownRooms {
  constructor(item) {
    this.container = item;
    this.data = [];
    this.init();
  }

  init() {
    this.createChildren();
    this.makeData();
    this.dropdownItems.forEach((_, index) => {
      this.render(index);
    });
    this.enableEventListeners();
  }

  createChildren() {
    this.info = this.container.querySelector(".js-dropdown__info");
    this.infoInput = this.container.querySelector(".js-dropdown__input");
    this.dropdownItems = Array.from(
      this.container.querySelectorAll(".js-dropdown-item")
    );
    this.dropdownPluses = this.container.querySelectorAll(".js-dropdown-item__plus");
    this.dropdownMinuses = this.container.querySelectorAll(
      ".js-dropdown-item__minus"
    );
  }

  makeData() {
    const nums = Array.from(
      this.container.querySelectorAll(".js-dropdown-item__number")
    );
    nums.forEach((num) => {
      const value = parseInt(num.textContent, 10);
      this.data.push(value);
    });
  }

  enableEventListeners() {
    this.dropdownItems.forEach((_, i) => {
      this.dropdownMinuses[i].addEventListener("click", this.minusOne);
      this.dropdownPluses[i].addEventListener("click", this.plusOne);
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
    this.updateMinusButton(i);
    this.updateInfoInput();
  }

  adjustData(i) {
    this.data[i] = this.data[i] < 0 ? 0 : this.data[i] > 10 ? 10 : this.data[i];
  }

  updateItemNumber(i) {
    const dropdownItem = this.dropdownItems[i].querySelector(
      ".js-dropdown-item__number"
    );
    dropdownItem.innerText = this.data[i];
  }

  updateMinusButton(i) {
    if (this.data[i] > 0) {
      this.dropdownMinuses[i].classList.remove("js-dropdown-item__minus_disabled");
    } else {
      this.dropdownMinuses[i].classList.add("js-dropdown-item__minus_disabled");
    }
  }

  updateInfoInput() {
    this.infoInput.value = "";
    this.roomInfo = "";
    this.data.forEach((_, i) => {
      this.roomInfo += this.adjustDataType(i);
    });
    this.infoInput.value = `${ this.roomInfo.slice(0, 20) }...`;
  }

  adjustDataType(j) {
    const dataType = this.dropdownItems[j].dataset.type;
    let dataTypeName;
    if (this.data[j] === 0) {
      switch (dataType) {
        case "bedrooms":
          dataTypeName = "спален";
          break;
        case "beds":
          dataTypeName = "кроватей";
          break;
        default:
          dataTypeName = "ванных комнат";
          break;
      }
    } else if (this.data[j] === 1) {
      switch (dataType) {
        case "bedrooms":
          dataTypeName = "спальня";
          break;
        case "beds":
          dataTypeName = "кровать";
          break;
        default:
          dataTypeName = "ванная комната";
          break;
      }
    } else if (this.data[j] > 1 && this.data[j] < 5) {
      switch (dataType) {
        case "bedrooms":
          dataTypeName = "спальни";
          break;
        case "beds":
          dataTypeName = "кровати";
          break;
        default:
          dataTypeName = "ванных комнаты";
          break;
      }
    } else {
      switch (dataType) {
        case "bedrooms":
          dataTypeName = "спален";
          break;
        case "beds":
          dataTypeName = "кроватей";
          break;
        default:
          dataTypeName = "ванных комнат";
          break;
      }
    }
    return `${ this.data[j] } ${ dataTypeName }, `;
  }
}
