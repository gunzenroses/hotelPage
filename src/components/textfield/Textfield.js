import { boundMethod } from 'autobind-decorator';

import Inputmask from 'Libs/inputmask/Inputmask';

class Textfield {
  constructor(item) {
    this.init(item);
  }

  init(item) {
    this.startValidation(item);
    if (item.getAttribute('name') === "email") {
      item.addEventListener('click', this.correctEmail);
    }
  }

  startValidation(element) {
    this.validation = new Inputmask(element);
  }

  @boundMethod
  correctEmail(e) {
    if (!e.target) return;
    const item = e.target;
    const itemText = item.value;
    if (itemText.search(/@[a-z|A-Z]/i) > 1) { 
      return
    } else if (itemText.length > 4) {
      const newValue = itemText.replace(/[^a-zA-Z0-9\s]/gi, '');
      item.value = `${ newValue }@`;
    }
  }
}

export default Textfield;