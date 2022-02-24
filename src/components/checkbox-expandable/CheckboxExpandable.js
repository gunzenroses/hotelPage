import { boundMethod } from 'autobind-decorator';

class CheckboxExpandable {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._enable();
  }

  _createClasses() {
    this.classExpandInit = 'checkbox-expandable__init';
    this.classExpandContent = 'checkbox-expandable__content';
    this.classExpandShow = 'checkbox-expandable__show';
  }

  _createChildren() {
    this.dropdownInit = this.dropdown.querySelector(
      `.js-${ this.classExpandInit }`
    );
    this.dropdownExpand = this.dropdown.querySelector(
      `.js-${ this.classExpandContent }`
    );
    this.dropdownParent = this.dropdownInit.parentElement;
  }

  _enable() {
    this.dropdownInit.addEventListener('pointerup', this._dropdownClick);
  }

  @boundMethod
  _dropdownClick() {
    this.dropdownExpand.classList.toggle(this.classExpandShow);
  }
}

export default CheckboxExpandable;
