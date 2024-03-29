import Inputmask from 'inputmask';

class InputMask {
  constructor(element) {
    this.init(element);
  }

  init(element) {
    this.elementName = element.getAttribute('name');
    if (this.elementName === 'email') {
      this._maskEmail(element);
    } else if (this.elementName === 'birthday') {
      this._maskDateTime(element);
    }
  }

  _maskEmail(element) {
    this.emailMask = Inputmask({
      mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
      greedy: false,
      onBeforePaste(pastedValue) {
        const lowerPastedValue = pastedValue.toLowerCase();
        return lowerPastedValue.replace('mailto:', '');
      },
      definitions: {
        '*': {
          validator: '[0-9A-Za-z!#$%&\'*+/=?^_`{|}~-]',
          cardinality: 1,
          casing: 'lower'
        }
      }
    }).mask(element);
  }

  _maskDateTime(element) {
    this.dateMask = Inputmask('datetime', {
      placeholder: 'ДД.ММ.ГГГГ',
      separator: '.',
      alias: 'dd.mm.yyyy',
      inputFormat: 'dd.mm.yyyy',
      min: '01/01/1900',
      max: '01/01/2018'
    }).mask(element);
  }
}

export default InputMask;
