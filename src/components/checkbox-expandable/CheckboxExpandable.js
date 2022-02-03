import { boundMethod } from 'autobind-decorator';

class CheckboxExpandable {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.init();
  }

  init() {
    this.createChildren();
    this.enable();
  }

  createChildren() {
    this.dropdownInit = this.dropdown.querySelector(
      '.js-checkbox-expandable__init'
    );
    this.dropdownExpand = this.dropdown.querySelector(
      '.js-checkbox-expandable__content'
    );
    this.dropdownParent = this.dropdownInit.parentElement;
  }

  enable() {
    this.dropdownInit.addEventListener('click', this.dropdownClick);
  }

  @boundMethod
  dropdownClick() {
    this.dropdownExpand.classList.toggle('checkbox-expandable__show');
  }
}

export default CheckboxExpandable;
