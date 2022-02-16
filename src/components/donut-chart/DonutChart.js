import { boundMethod } from 'autobind-decorator';

class DonutChart {
  constructor(element) {
    this.chart = element;
    this.init();
  }

  init() {
    this.marks = ['excellent', 'good', 'satisfied', 'disappointed'];
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

  _createChildren() {
    this.donutNumber = this.chart.querySelector('.js-donut-chart__number');
    this.donutLabel = this.chart.querySelector('.js-donut-chart__label');
    this.donutText = this.chart.querySelector('.js-donut-chart__text');
  }

  _createItems() {
    this.marks.forEach((mark) => {
      this[`${mark}Item`] = this.chart.querySelector(
        `.js-donut-chart__key-item_${mark}`
      );
    });
  }

  _createCircles() {
    this.marks.forEach((mark) => {
      this[`${mark}Circle`] = this.chart.querySelector(
        `.js-donut-chart__segment_${mark}`
      );
    });
  }

  _enable() {
    this.marks.forEach((mark) => {
      this[`${mark}Circle`].addEventListener('pointerenter', this._renewChart);

      this[`${mark}Item`].addEventListener(
        'pointerenter',
        this._makeEventOnCircle
      );

      this[`${mark}Item`].addEventListener(
        'pointerleave',
        this._makeEventOnCircle
      );
    });
  }

  @boundMethod
  _makeEventOnCircle(e) {
    const mark = e.target.dataset.circleModifier;
    const evt = e.type;
    this[`${mark}Circle`].dispatchEvent(
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
    e.target.classList.add('donut-chart__segment_hovered');
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
    e.target.classList.remove('donut-chart__segment_hovered');
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
      this.donutText.classList.add(`donut-chart__text_${mod}`);
    } else {
      this.marks.forEach((mark) => {
        this.donutText.classList.remove(`donut-chart__text_${mark}`);
      });
    }
  }
}

export default DonutChart;
