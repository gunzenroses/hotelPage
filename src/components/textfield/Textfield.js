import { boundMethod } from 'autobind-decorator';

import Inputmask from 'Libs/inputmask/Inputmask';

class Textfield {
  constructor(item) {
    this.init(item);
  }

  init(item) {
    this.startValidation(item);
    if (item.getAttribute('name') === 'email') {
      item.addEventListener('pointerup', this.correctEmail);
    }
  }

  startValidation(element) {
    this.validation = new Inputmask(element);
  }

  @boundMethod
  correctEmail(e) {
    if (!e.target) return;
    this.item = e.target;
    const itemText = this.item.value;
    const afterDog = itemText.search(/@[a-z|A-Z]/i) > 1;
    const longEnough = itemText.length > 4;
    if (!afterDog && longEnough) {
      const newValue = itemText.replace(/[^a-zA-Z0-9\s]/gi, '');
      this.item.value = `${ newValue }@`;
    }
  }
}

export default Textfield;
