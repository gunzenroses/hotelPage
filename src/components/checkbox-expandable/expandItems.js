export default class ExpandItems {
  constructor(dropdownWatch) {
    this.dropdownWatch = dropdownWatch || document.querySelector('.js-dropdown__watch');
    this.dropdownWatchedInits = Array.from(this.dropdownWatch.querySelectorAll('.js-dropdown__init'));
    this.dropdownWatchedParents = [];
    this.dropdownWatchedExpands = [];
    this.init();
  }

  init() {
    this.createChildren();
    this.setupHandlers();
    this.enable();
  }

  createChildren() {
    this.dropdownWatchedInits.forEach((item) => {
      this.dropdownWatchedParents.push(item.parentElement);
    });

    this.dropdownWatchedParents.forEach((item) => {
      this.dropdownWatchedExpands.push(item.querySelector('.js-dropdown__content'));
    });
  }

  setupHandlers() {
    this.dropdownClickHandler = this.dropdownClick.bind(this);
  }

  enable() {
    this.dropdownWatch.addEventListener('click', this.dropdownClickHandler);
  }

  dropdownClick(event) {
    const hasInnerExpand = event.target.closest('.dropdown__show');
    const hasExpand = event.target.closest('.js-dropdown__init');
    const hasParent = event.target.parentElement;
    const element = event.target;

    if (hasInnerExpand && hasExpand) this.expandElement(element);
    if (!hasInnerExpand && hasExpand) this.expandInner(element);
    if (!hasInnerExpand && !hasExpand && hasParent) this.hideElements();
  }

  expandElement(element) {
    const innerParent = element.closest('.js-dropdown__init').parentElement;
    const innerExpand = innerParent.querySelector('.js-dropdown__content');
    innerExpand.classList.toggle('dropdown__show');
  }

  expandInner(element) {
    this.dropdownWatchedExpands.forEach((item, index) => {
      (element.closest('.js-dropdown__init') != this.dropdownWatchedInits[index])
        ? item.classList.remove('dropdown__show')
        : item.classList.toggle('dropdown__show');
    });
  }

  hideElements() {
    this.dropdownWatchedExpands.forEach((item) => {
      item.classList.remove('dropdown__show');
    });
  }
}
