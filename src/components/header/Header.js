import { boundMethod } from 'autobind-decorator';

class Header {
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
    this.classInit = '.js-header__init';
    this.classExpand = '.js-header__expand';
    this.classShow = 'header__dropdown_visible';
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
    const clickOnExpanded =  
      e.target === this.dropdownExpand 
      || e.target.closest(this.classExpand)
    const clickOnInit = 
      e.target === this.dropdownInit 
      || e.target.parentElement === this.dropdownInit;
    if (clickOnInit) {
      this._toggleClass();
    } else if (!clickOnExpanded) {
      this._hideElements();
    }
  }

  _toggleClass() {
    this.dropdownExpand.classList.toggle(this.classShow);
  }

  _hideElements() {
    this.dropdownExpand.classList.remove(this.classShow);
  }
}

export default Header;
