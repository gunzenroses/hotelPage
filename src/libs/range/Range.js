import 'ion-rangeslider';
import boundMethod from 'autobind-decorator';

class Range {
  constructor() {
    this.init();
  }

  init() {
    this._makeClasses();
    this._makeSlider();
  }

  _makeClasses() {
    this.classSlider = '.js-range__slider';
    this.classSliderValue = '.js-range__value';
  }

  _makeSlider() {
    $(this.classSlider).ionRangeSlider({
      type: 'double',
      min: 0,
      max: 15000,
      from: 5000,
      to: 10000,
      hide_min_max: true,
      hide_from_to: true,
      prettify_enabled: true,
      step: 100,
      onStart: this._changeValue,
      onChange: this._changeValue
    });
  }

  @boundMethod
  _changeValue(data) {
    const toPretty = data.to_pretty ? data.to_pretty : '10 000';
    const fromPretty = data.from_pretty ? data.from_pretty : '5 000';
    this.rangeValue = $(data.input).siblings(this.classSliderValue);
    this.rangeValue.val(`${ fromPretty }₽ - ${ toPretty }₽`);
  }
}

export default Range;
