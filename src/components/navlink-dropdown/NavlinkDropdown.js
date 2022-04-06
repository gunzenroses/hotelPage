import { boundMethod } from 'autobind-decorator';

class NavlinkDropdown {
  constructor(dropdownWatch) {
    this.dropdownWatch = dropdownWatch;
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._enable();
  }

  _createClasses() {
    this.classInit = '.js-navlink-dropdown__init';
    this.classExpand = '.js-navlink-dropdown__expand';
    this.classShow = 'navlink-dropdown__expand_visible';
  }

  _createChildren() {
    this.dropdownInit = this.dropdownWatch.querySelector(this.classInit);
    this.dropdownExpand = this.dropdownWatch.querySelector(this.classExpand);
  }

  _enable() {
    document.addEventListener('pointerup', this._dropdownClick);
  }

  @boundMethod
  _dropdownClick(e) {
    if (e.target.parentElement === this.dropdownInit || e.target === this.classInit) {
      this._toggleClass();
    } else {
      this._hideElement();
    }
  }

  _toggleClass() {
    this.dropdownExpand.classList.toggle(this.classShow);
  }

  _hideElement() {
    this.dropdownExpand.classList.remove(this.classShow);
  }
}

export default NavlinkDropdown;