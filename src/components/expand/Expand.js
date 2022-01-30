import { boundMethod } from 'autobind-decorator';

class Expand {
  constructor(dropdownWatch) {
    this.dropdownWatch = dropdownWatch;
    this.init();
  }

  init() {
    this.createChildren();
    this.enable();
  }

  createChildren() {
    this.dropdownWatchedParents = [];
    this.dropdownWatchedExpands = [];
    this.dropdownWatchedInits = Array.from(
      this.dropdownWatch.querySelectorAll('.js-expand__init')
    );
    this.dropdownWatchedInits.forEach((item) => {
      this.dropdownWatchedParents.push(item.parentElement);
    });

    this.dropdownWatchedParents.forEach((item) => {
      this.dropdownWatchedExpands.push(
        item.querySelector('.js-expand__content')
      );
    });
  }

  enable() {
    this.dropdownWatch.addEventListener('click', this.dropdownClick);
  }

  @boundMethod
  dropdownClick(event) {
    const hasInnerExpand = event.target.closest('.js-expand__show');
    const hasExpand = event.target.closest('.js-expand__init');
    const hasParent = event.target.parentElement;
    const noExpand = !hasInnerExpand && !hasExpand;
    const el = event.target;

    if (hasInnerExpand && hasExpand) this.expandElement(el);
    if (!hasInnerExpand && hasExpand) this.expandInner(el);
    if (noExpand && hasParent) this.hideElements();
  }

  expandElement(el) {
    const innerParent = el.closest('.js-expand__init').parentElement;
    const innerExpand = innerParent.querySelector('.js-expand__content');
    innerExpand.classList.toggle('js-expand__show');
    return this;
  }

  expandInner(el) {
    this.dropdownWatchedExpands.forEach((item, index) => {
      if (el.closest('.js-expand__init') !== this.dropdownWatchedInits[index]) {
        item.classList.remove('js-expand__show');
      } else {
        item.classList.toggle('js-expand__show');
      }
    });
  }

  hideElements() {
    this.dropdownWatchedExpands.forEach((item) => {
      item.classList.remove('js-expand__show');
    });
  }
}

export default Expand;
