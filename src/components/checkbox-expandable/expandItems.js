export default class ExpandItems {
  constructor(dropdownWatch) {
    this.dropdownWatch = dropdownWatch
      ? dropdownWatch
      : document.querySelector(".dropdown__watch");
    this.dropdownWatchedInits = Array.from(this.dropdownWatch.querySelectorAll(".js-dropdown__init"));
    this.dropdownWatchedParents = [];
    this.dropdownWatchedExpands = [];
    this.init()
  }

  init() {
    this.createChildren();
    this.setupHandlers();
    this.enable();
  }

  createChildren() {
    this.dropdownWatchedInits.forEach(item => {
      this.dropdownWatchedParents.push(item.parentElement);
    });

    this.dropdownWatchedParents.forEach(item => {
      this.dropdownWatchedExpands.push(item.querySelector(".dropdown__content"));
    })
  }

  setupHandlers() {
    this.dropdownClickHandler = this.dropdownClick.bind(this);
  }

  enable() {
    this.dropdownWatch.addEventListener("click", this.dropdownClickHandler);
  }

  dropdownClick(event) {
    let hasInnerExpand = event.target.closest(".dropdown__show");
    let hasExpand = event.target.closest(".js-dropdown__init");
    let hasParent = event.target.parentElement;
    let element = event.target;

    if (hasInnerExpand && hasExpand) this.expandElement(element);
    if (!hasInnerExpand && hasExpand) this.expandInner(element);
    if (!hasInnerExpand && !hasExpand && hasParent) this.hideElements();
  }

  expandElement(element){
    let innerParent = element.closest(".js-dropdown__init").parentElement;
    let innerExpand = innerParent.querySelector(".dropdown__content");
    innerExpand.classList.toggle("dropdown__show");
  }

  expandInner(element){
    this.dropdownWatchedExpands.forEach((item, index) => {
      (element.closest(".js-dropdown__init") != this.dropdownWatchedInits[index])
        ? item.classList.remove("dropdown__show")
        : item.classList.toggle("dropdown__show");
    })
  }

  hideElements(){
    this.dropdownWatchedExpands.forEach(item => {
      item.classList.remove("dropdown__show");
    })
  }
}