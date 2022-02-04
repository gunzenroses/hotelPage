import { boundMethod } from 'autobind-decorator';

class DonutChart {
  constructor(element) {
    this.chart = element;
    this.init();
  }

  init() {
    this.marks = ['excellent', 'good', 'satisfied', 'disappointed'];
    this.createChildrens();
    this.createItems();
    this.createCircles();
    this.enable();
  }

  createChildrens() {
    this.donutNumber = this.chart.querySelector('.js-donut-chart__number');
    this.donutNumber.style.transition = 'all 0.3s';
    this.donutLabel = this.chart.querySelector('.js-donut-chart__label');
    this.donutLabel.style.transition = 'all 0.3s';
    this.donutText = this.chart.querySelector('.js-donut-chart__text');
  }

  createItems() {
    this.marks.forEach((mark) => {
      this[`${ mark }Item`] = this.chart.querySelector(
        `.js-donut-chart__key-item_${ mark }`
      );
    });
  }

  createCircles() {
    this.marks.forEach((mark) => {
      this[`${ mark }Circle`] = this.chart.querySelector(
        `.js-donut-chart__segment_${ mark }`
      );
    });
  }

  enable() {
    this.marks.forEach((mark) => {
      this[`${ mark }Circle`].addEventListener(
        'pointerenter',
        this.renewChart
      );

      this[`${ mark }Item`].addEventListener(
        'pointerenter',
        this.makeEventOnCircle
      );

      this[`${ mark }Item`].addEventListener(
        'pointerleave',
        this.makeEventOnCircle
      );
    });
  }

  @boundMethod
  makeEventOnCircle(e) {
    const mark = e.target.dataset.circleModificator;
    const evt = e.type;
    this[`${ mark }Circle`].dispatchEvent(
      new Event(evt, { bubbles: true, cancelable: false })
    );
  }

  @boundMethod
  renewChart(e) {
    this.renewCircle(e);
    this.renewInfo(e);
  }

  renewCircle(e) {
    e.target.style.transition = 'all 0.3s';
    e.target.classList.add('donut-chart__segment_hovered');
    e.target.addEventListener('pointerleave', this.restoreCircle);
  }

  renewInfo(e) {
    const num = e.target.dataset.circleNumber;
    const modif = e.target.dataset.circleModificator;
    this.changeNumber(num);
    this.changeLabel(num);
    this.changeText(modif);
  }

  @boundMethod
  restoreCircle(e) {
    e.target.classList.remove('donut-chart__segment_hovered');
    e.target.removeEventListener('pointerleave', this.restoreCircle);
    this.restoreInfo();
  }

  restoreInfo() {
    const num = this.donutNumber.dataset.totalNumber;
    this.changeNumber(num);
    this.changeLabel(num);
    this.changeText();
  }

  changeNumber(num) {
    this.donutNumber.innerText = num;
  }

  changeLabel(num) {
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

  changeText(modif) {
    if (modif) {
      this.donutText.classList.add(`donut-chart__text_${ modif }`);
    } else {
      this.marks.forEach((mark) => {
        this.donutText.classList.remove(`donut-chart__text_${ mark }`);
      });
    }
  }
}

export default DonutChart;
