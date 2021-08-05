export default class DropdownGuests {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId)
    this.containerClass = this.container.classList.value
    this.dropdownExpanded = this.container.querySelector(".dropdown__guests")
    this.data = (data)
      ? data
      : [0, 0, 0];
    this.init()
  }

  init() {
    this.createChildren();
    this.dropdownItems.map((_, i) => { this.showItemNumber(i) });
    this.totalGuestsCount();
    this.enableHandlers();
    this.enableEventListeners();
  }

  createChildren() {
    this.info = this.container.querySelector(".dropdown__info");
    this.infoInput = this.container.querySelector(".dropdown__input");
    this.dropdownItems = Array.from(this.container.querySelectorAll(".dropdown__item_expanded"));
    this.dropdownMinuses = this.container.querySelectorAll(".dropdown__minus");
    this.containerClassExpanded = "." + this.containerClass;
    this.resetButton = this.dropdownExpanded.querySelector(".dropdown__button_reset");
    this.submitButton = this.dropdownExpanded.querySelector(".dropdown__button_submit");
  }

  enableHandlers() {
    this.plusAndMinusHandler = this.plusAndMinusToItem.bind(this);
    this.resetGuestsHandler = this.resetGuests.bind(this);
    this.submitGuestsHandler = this.submitGuests.bind(this);
  }

  enableEventListeners() {
    this.dropdownExpanded.addEventListener("click", this.plusAndMinusHandler);
    this.resetButton.addEventListener("click", this.resetGuestsHandler);
    this.submitButton.addEventListener("click", this.submitGuestsHandler);
  }

  plusAndMinusToItem(e) {
    let trg = e.target;
    if (trg.classList.value == "dropdown__minus") this.minusToItem(trg);
    if (trg.classList.value == "dropdown__plus") this.plusToItem(trg);
  }

  minusToItem(trg) {
    this.orderInData = parseInt(trg.nextElementSibling.dataset.order);
    this.data[this.orderInData]--;
    this.showItemNumber(this.orderInData);
    this.totalGuestsCount();
  }

  plusToItem(trg) {
    this.orderInData = parseInt(trg.previousElementSibling.dataset.order);
    this.data[this.orderInData]++;
    this.showItemNumber(this.orderInData);
    this.totalGuestsCount();
  }

  resetGuests(e) {
    e.preventDefault();
    this.data = [0, 0, 0];
    this.dropdownItems.map((_, i) => { this.showItemNumber(i) });
    this.onZeroGuests();
  }

  submitGuests(e) {
    e.preventDefault();
    this.dropdownExpanded.classList.remove("dropdown__show");
  }

  showItemNumber(i) {
    this.data[i] = (this.data[i] < 0)
      ? 0
      : ((this.data[i] > 10)
        ? 10
        : this.data[i])
    let dropdownItem = this.dropdownItems[i].querySelector(".dropdown__number");
    dropdownItem.innerText = this.data[i];
    this.activateMinus(i);
  }

  activateMinus(i) {
    (this.data[i] > 0)
      ? this.dropdownMinuses[i].classList.remove("button_disabled")
      : this.dropdownMinuses[i].classList.add("button_disabled");
  }

  totalGuestsCount() {
    this.adultGuests = parseInt(this.data[0]) + parseInt(this.data[1]);
    this.infantGuests = parseInt(this.data[2]);
    this.totalGuests = this.adultGuests + this.infantGuests;

    (this.totalGuests > 0)
      ? this.onSomeGuests()
      : this.onZeroGuests();
  }

  onZeroGuests() {
    this.resetButton.classList.remove("button__show");
    this.infoInput.value = "";
  }

  onSomeGuests() {
    this.resetButton.classList.add("button__show");
    this.render();
  }

  render() {
    let adultWord = this.matchWordForAdult();
    let infantWord = this.matchWordForInfant();

    let onlyAdults = (this.adultGuests > 0) && (this.infantGuests < 1);
    let onlyInfants = (this.adultGuests < 1) && (this.infantGuests > 0);
    let adultsWithInfants = (this.adultGuests > 0) && (this.infantGuests > 0);
    
    let adultsInfo = `${this.adultGuests} ${adultWord}`;
    let infantsInfo = `${this.infantGuests} ${infantWord}`;

    this.infoInput.value = (onlyAdults)
      ? adultsInfo
      : ((onlyInfants)
          ? infantsInfo
          : (adultsWithInfants
              ? `${adultsInfo}, ${infantsInfo}`
              : "" ))
  }

  matchWordForAdult(){
    let form;
    switch (this.adultGuests) {
      case 1:
      case 21: form = "гость"; break;
      case 2:
      case 3:
      case 4:
      case 22:
      case 23:
      case 24: form = "гостя"; break;
      default: form = "гостей"; break;
    }
    return form;
  }

  matchWordForInfant(){
    let form;
    switch (this.infantGuests) {
      case 1:
      case 21: form = "младенец"; break;
      case 2:
      case 3:
      case 4:
      case 22:
      case 23:
      case 24: form = "младенца"; break;
      default: form = "младенцев"; break;
    }
    return form;
  }
}