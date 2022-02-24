import { boundMethod } from 'autobind-decorator';

class DonutChart {
  constructor(element) {
    this.chart = element;
    this.init();
  }

  init() {
    this.marks = ['excellent', 'good', 'satisfied', 'disappointed'];
    this._createClasses();
    this._createChildren();
    this._createItems();
    this._createCircles();
    this._enable();
  }

  restoreInfo() {
    const num = this.donutNumber.dataset.totalNumber;
    this._changeNumber(num);
    this._changeLabel(num);
    this._changeText();
  }

  _createClasses() {
    this.classNumber = 'donut-chart__number';
    this.classLabel = 'donut-chart__label';
    this.classText = 'donut-chart__text';
    this.classSegment = 'donut-chart__segment';
    this.classKeyItem = 'donut-chart__key-item';
  }

  _createChildren() {
    this.donutNumber = this.chart.querySelector(`.js-${ this.classNumber }`);
    this.donutLabel = this.chart.querySelector(`.js-${ this.classLabel }`);
    this.donutText = this.chart.querySelector(`.js-${ this.classText }`);
  }

  _createItems() {
    this.marks.forEach((mark) => {
      this[`${ mark }Item`] = this.chart.querySelector(
        `.js-${ this.classKeyItem }_${ mark }`
      );
    });
  }

  _createCircles() {
    this.marks.forEach((mark) => {
      this[`${ mark }Circle`] = this.chart.querySelector(
        `.js-${ this.classSegment }_${ mark }`
      );
    });
  }

  _enable() {
    this.marks.forEach((mark) => {
      this[`${ mark }Circle`].addEventListener(
        'pointerenter',
        this._renewChart
      );

      this[`${ mark }Item`].addEventListener(
        'pointerenter',
        this._makeEventOnCircle
      );

      this[`${ mark }Item`].addEventListener(
        'pointerleave',
        this._makeEventOnCircle
      );
    });
  }

  @boundMethod
  _makeEventOnCircle(e) {
    const mark = e.target.dataset.circleModifier;
    const evt = e.type;
    this[`${ mark }Circle`].dispatchEvent(
      new Event(evt, { bubbles: true, cancelable: false })
    );
  }

  @boundMethod
  _renewChart(e) {
    this._renewCircle(e);
    this._renewInfo(e);
  }

  _renewCircle(e) {
    e.target.style.transition = 'all 0.3s';
    e.target.classList.add(`${ this.classSegment }_hovered`);
    e.target.addEventListener('pointerleave', this._restoreCircle);
  }

  _renewInfo(e) {
    const num = e.target.dataset.circleNumber;
    const mod = e.target.dataset.circleModifier;
    this._changeNumber(num);
    this._changeLabel(num);
    this._changeText(mod);
  }

  @boundMethod
  _restoreCircle(e) {
    e.target.classList.remove(`${ this.classSegment }_hovered`);
    e.target.removeEventListener('pointerleave', this._restoreCircle);
    this.restoreInfo();
  }

  _changeNumber(num) {
    this.donutNumber.innerText = num;
  }

  _changeLabel(num) {
    const newNum = num.toString().slice(-1);
    let newLabel;
    switch (newNum) {
      case '1':
        newLabel = 'голос';
        break;
      case '2':
      case '3':
      case '4':
        newLabel = 'голоса';
        break;
      default:
        newLabel = 'голосов';
        break;
    }
    this.donutLabel = newLabel;
  }

  _changeText(mod) {
    if (mod) {
      this.donutText.classList.add(`${ this.classText }_${ mod }`);
    } else {
      this.marks.forEach((mark) => {
        this.donutText.classList.remove(`${ this.classText }_${ mark }`);
      });
    }
  }
}

export default DonutChart;
