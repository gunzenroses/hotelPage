import { boundMethod } from 'autobind-decorator';

class DateRange {
  constructor(dropdownItem) {
    this.dropdownItem = dropdownItem;
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._enable();
  }

  _createClasses() {
    this.classInit = '.js-date-range__init';
    this.classExpand = '.js-date-range__calendar';
    this.classInner = 'calendar__day';
    this.classShow = 'date-range__show';
    this.classSubmit = '.js-calendar__button_submit';
  }

  _createChildren() {
    this.dropdownInit = this.dropdownItem.querySelector(this.classInit);
    this.dropdownExpand = this.dropdownItem.querySelector(this.classExpand);
    this.dropdownSubmit = this.dropdownItem.querySelector(this.classSubmit);
  }

  _enable() {
    this.dropdownSubmit.addEventListener('pointerup', this._hideElements.bind(this));
    document.addEventListener('pointerup', this._dropdownClick);
  }

  @boundMethod
  _dropdownClick(e) {
    const clickOnExpanded = e.target.closest(this.classExpand) === this.dropdownExpand
      || e.target.classList.contains(this.classInner);
    const clickOnInit = e.target.closest(this.classInit) === this.dropdownInit;
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

export default DateRange;