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
        item.querySelector('.js-expand')
      );
    });
  }

  enable() {
    this.dropdownWatch.addEventListener('pointerup', this.dropdownClick);
  }

  @boundMethod
  dropdownClick(event) {
    const el = event.target;
    const hasInnerExpand = el.closest('.js-expand');
    const hasExpand = el.closest('.js-expand__init');
    const hasParent = el.parentElement;
    const noExpand = !hasInnerExpand && !hasExpand;

    if (hasInnerExpand && hasExpand) this.expandElement(el);
    if (!hasInnerExpand && hasExpand) this.expandInner(el);
    if (noExpand && hasParent) this.hideElements();
  }

  expandElement(el) {
    const innerParent = el.closest('.js-expand__init').parentElement;
    const innerExpand = innerParent.querySelector('.js-expand');
    innerExpand.classList.toggle('expand__show');
    return this;
  }

  expandInner(el) {
    this.dropdownWatchedExpands.forEach((item, index) => {
      if (el.closest('.js-expand__init') !== this.dropdownWatchedInits[index]) {
        item.classList.remove('expand__show');
      } else {
        item.classList.toggle('expand__show');
      }
    });
  }

  hideElements() {
    this.dropdownWatchedExpands.forEach((item) => {
      item.classList.remove('expand__show');
    });
  }
}

export default Expand;
