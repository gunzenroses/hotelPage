import { boundMethod } from 'autobind-decorator';

class CheckboxExpandable {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.init();
  }

  init() {
    this._createChildren();
    this._enable();
  }

  

  _createChildren() {
    this.dropdownInit = this.dropdown.querySelector(
      '.js-checkbox-expandable__init'
    );
    this.dropdownExpand = this.dropdown.querySelector(
      '.js-checkbox-expandable__content'
    );
    this.dropdownParent = this.dropdownInit.parentElement;
  }

  _enable() {
    this.dropdownInit.addEventListener('pointerup', this._dropdownClick);
  }

  @boundMethod
  _dropdownClick() {
    this.dropdownExpand.classList.toggle('checkbox-expandable__show');
  }
}

export default CheckboxExpandable;
