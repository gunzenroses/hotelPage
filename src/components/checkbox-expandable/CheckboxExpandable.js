class CheckboxExpandable {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.init();
  }

  init() {
    this.createChildren();
    this.setupHandlers();
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

  setupHandlers() {
    this.dropdownClickHandler = this.dropdownClick.bind(this);
  }

  enable() {
    this.dropdownInit.addEventListener('click', this.dropdownClickHandler);
  }

  dropdownClick() {
    this.dropdownExpand.classList.toggle('js-checkbox-expandable__show');
  }
}

export default CheckboxExpandable;
