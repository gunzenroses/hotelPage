import { boundMethod } from 'autobind-decorator';

class Expand {
  constructor(dropdownWatch) {
    this.dropdownWatch = dropdownWatch;
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._enable();
  }

  expandElement(el) {
    const innerParent = el.closest(this.classInit).parentElement;
    const innerExpand = innerParent.querySelector(this.classExpand);
    innerExpand.classList.toggle(this.classShow);
    return this;
  }

  hideElements() {
    this.dropdownWatchedExpands.forEach((item) => {
      item.classList.remove(this.classShow);
    });
  }

  _createClasses() {
    this.classInit = '.js-expand__init';
    this.classExpand = '.js-expand';
    this.classShow = 'expand__show';
  }

  _createChildren() {
    this.dropdownWatchedParents = [];
    this.dropdownWatchedExpands = [];
    this.dropdownWatchedInits = Array.from(
      this.dropdownWatch.querySelectorAll(this.classInit)
    );
    this.dropdownWatchedInits.forEach((item) => {
      this.dropdownWatchedParents.push(item.parentElement);
    });
    this.dropdownWatchedParents.forEach((item) => {
      this.dropdownWatchedExpands.push(item.querySelector(this.classExpand));
    });
  }

  _enable() {
    this.dropdownWatch.addEventListener('pointerup', this._dropdownClick);
  }

  @boundMethod
  _dropdownClick(event) {
    const el = event.target;
    const hasInnerExpand = el.closest(this.classExpand);
    const hasExpand = el.closest(this.classInit);
    const hasParent = el.parentElement;
    const noExpand = !hasInnerExpand && !hasExpand;

    if (hasInnerExpand && hasExpand) this.expandElement(el);
    if (!hasInnerExpand && hasExpand) this._expandInner(el);
    if (noExpand && hasParent) this.hideElements();
  }

  _expandInner(el) {
    this.dropdownWatchedExpands.forEach((item, index) => {
      if (el.closest(this.classInit) !== this.dropdownWatchedInits[index]) {
        item.classList.remove(this.classShow);
      } else {
        item.classList.toggle(this.classShow);
      }
    });
  }
}

export default Expand;
