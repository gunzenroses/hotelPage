export default class DropdownRooms {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId)
    this.containerClass = this.container.classList.value
    this.dropdownExpanded = this.container.querySelector(".dropdown__rooms")
    this.data = [...data]
    this.init()
  }

  init() {
    this.createChildren();
    this.dropdownItems.forEach((_, index) => { this.render(index) });
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren() {
    this.info = this.container.querySelector(".dropdown__info");
    this.infoInput = this.container.querySelector(".dropdown__input");
    this.dropdownItems = Array.from(this.container.querySelectorAll(".dropdown__item_expanded"));
    this.dropdownPluses = this.container.querySelectorAll(".dropdown__plus");
    this.dropdownMinuses = this.container.querySelectorAll(".dropdown__minus");
    this.numbers = this.container.querySelectorAll(".dropdown__number");
    this.containerClassExpanded = "." + this.containerClass;
  }

  enableHandlers() {
    this.minusOneHandler = this.minusOne.bind(this);
    this.plusOneHandler = this.plusOne.bind(this);
  }

  enableEventListeners() {
    this.dropdownItems.map((_, i) => {
      this.dropdownMinuses[i].addEventListener("click", this.minusOneHandler);
      this.dropdownPluses[i].addEventListener("click", this.plusOneHandler);
    })
  }

  minusOne(e) {
    let order = parseInt(e.target.nextElementSibling.dataset.order);
    this.data[order]--;
    this.render(order);
  }

  plusOne(e) {
    let order = parseInt(e.target.previousElementSibling.dataset.order);
    this.data[order]++;
    this.render(order);
  }

  render(i) {
    this.adjustData(i);
    this.updateItemNumber(i);
    this.updateMinusButton(i);
    this.updateInfoInput();
  }

  adjustData(i) {
    this.data[i] = (this.data[i] < 1)
      ? 1
      : ((this.data[i] > 10)
        ? 10
        : this.data[i]);
  }

  updateItemNumber(i) {
    let dropdownItem = this.dropdownItems[i].querySelector(".dropdown__number");
    dropdownItem.innerText = this.data[i];
  }

  updateMinusButton(i) {
    (this.data[i] > 0)
      ? this.dropdownMinuses[i].classList.remove("button_disabled")
      : this.dropdownMinuses[i].classList.add("button_disabled");
  }

  updateInfoInput() {
    this.infoInput.value = "";
    this.roomInfo = "";
    this.data.forEach((_, i) => { 
      this.roomInfo += this.adjustDataType(i) 
    })
    this.infoInput.value = this.roomInfo.slice(0, 20) + "..."
  }

  adjustDataType(j){
    let dataType = this.dropdownItems[j].dataset.type;
    let dataTypeName;
    if (this.data[j] == 0) {
      switch (dataType) {
        case "bedrooms": dataTypeName = "спален"; break;
        case "beds": dataTypeName = "кроватей"; break;
        case "bathrooms": dataTypeName = "ванных комнат"; break;
      }
    } else if (this.data[j] == 1) {
      switch (dataType) {
        case "bedrooms": dataTypeName = "спальня"; break;
        case "beds": dataTypeName = "кровать"; break;
        case "bathrooms": dataTypeName = "ванная комната"; break;
      }
    } else if (this.data[j] > 1 && this.data[j] < 5) {
      switch (dataType) {
        case "bedrooms": dataTypeName = "спальни"; break;
        case "beds": dataTypeName = "кровати"; break;
        case "bathrooms": dataTypeName = "ванных комнаты"; break;
      }
    } else {
      switch (dataType) {
        case "bedrooms": dataTypeName = "спален"; break;
        case "beds": dataTypeName = "кроватей"; break;
        case "bathrooms": dataTypeName = "ванных комнат"; break;
      }
    }
    return `${this.data[j]} ${dataTypeName}, `;
  }
}
