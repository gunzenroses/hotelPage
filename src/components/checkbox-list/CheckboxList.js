import { boundMethod } from 'autobind-decorator';

class Checkbox {
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
    this.classExpandInit = 'checkbox-list__init';
    this.classExpandContent = 'checkbox-list__content';
    this.classExpandShow = 'checkbox-list__show';
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

export default Checkbox;
