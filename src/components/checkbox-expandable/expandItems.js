export default class ExpandItems {
  constructor(dropdownWatch) {
    this.dropdownWatch = dropdownWatch;
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
    this.dropdownWatchedInits = Array.from(this.dropdownWatch.querySelectorAll('.js-dropdown__init'));
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
    const hasInnerExpand = event.target.closest('.js-dropdown__show');
    const hasExpand = event.target.closest('.js-dropdown__init');
    const hasParent = event.target.parentElement;
    const noExpand = !hasInnerExpand && !hasExpand;
    const el = event.target;

    if (hasInnerExpand && hasExpand) this.expandElement(el);
    if (!hasInnerExpand && hasExpand) this.expandInner(el);
    if (noExpand && hasParent) this.hideElements();
  }

  expandElement(el) {
    const innerParent = el.closest('.js-dropdown__init').parentElement;
    const innerExpand = innerParent.querySelector('.js-dropdown__content');
    innerExpand.classList.toggle('js-dropdown__show');
  }

  expandInner(el) {
    this.dropdownWatchedExpands.forEach((item, index) => {
      if (el.closest('.js-dropdown__init') !== this.dropdownWatchedInits[index]) {
        item.classList.remove('js-dropdown__show');
      } else {
        item.classList.toggle('js-dropdown__show');
      }
    });
  }

  hideElements() {
    this.dropdownWatchedExpands.forEach((item) => {
      item.classList.remove('js-dropdown__show');
    });
  }
}
