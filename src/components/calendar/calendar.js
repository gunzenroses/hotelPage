export default class Calendar {
  constructor(className) {
    this.date = new Date();
    this.init(className);
  }

  init(className) {
    this.createChildren(className);
    this.render();
    this.enableHandlers();
    this.addEventListener();
  }

  createChildren(className) {
    this.calendarContainer = document.querySelector(className);
    this.months = ['Январь', 'Февраль', 'Март', 'Апрель',
      'Май', 'Июнь', 'Июль', 'Август',
      'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    this.buttonPrev = this.calendarContainer.querySelector('.js-date__prev');
    this.buttonNext = this.calendarContainer.querySelector('.js-date__next');
    this.dateInCalendar = this.calendarContainer.querySelector('.js-date__month');
    this.daysOfMonth = this.calendarContainer.querySelector('.js-weeks__days');

    if (this.calendarContainer.closest('.js-date-range__selector')) {
      this.mainContainer = this.calendarContainer.closest('.js-date-range__selector');
    } else {
      this.mainContainer = this.calendarContainer;
    }

    if (this.mainContainer.querySelector('input[name=checkin-checkout]')) {
      this.rangeSpan = this.mainContainer.querySelector('input[name=checkin-checkout]');
    }
    if (this.mainContainer.querySelector('input[name=checkin]')) {
      this.rangeStart = this.mainContainer.querySelector('input[name=checkin]');
    }
    if (this.mainContainer.querySelector('input[name=checkout]')) {
      this.rangeEnd = this.mainContainer.querySelector('input[name=checkout]');
    }

    if (this.mainContainer.querySelector('.js-dropdown__calendar')) {
      this.calendar = this.mainContainer.querySelector('.js-dropdown__calendar');
    }

    this.btnApply = this.mainContainer.querySelector('.js-calendar__buttons_submit');
    this.btnReset = this.mainContainer.querySelector('.js-calendar__buttons_reset');
    this.examineCheckinCheckout();
  }

  enableHandlers() {
    this.showNextMonthHandler = this.showNextMonth.bind(this);
    this.showPrevMonthHandler = this.showPrevMonth.bind(this);
    this.chooseRangeHandler = this.chooseRange.bind(this);
    this.applyRangeHandler = this.applyRange.bind(this);
    this.applyStartOrEndHandler = this.applyStartOrEnd.bind(this);
    this.resetInputHandler = this.resetInput.bind(this);
  }

  addEventListener() {
    this.buttonPrev.addEventListener('click', this.showPrevMonthHandler);
    this.buttonNext.addEventListener('click', this.showNextMonthHandler);
    this.daysOfMonth.addEventListener('click', this.chooseRangeHandler);
    if (this.calendar) {
      this.btnReset.addEventListener('click', this.resetInputHandler);
    }
    if (this.rangeSpan) {
      this.btnApply.addEventListener('click', this.applyRangeHandler);
    }
    if (this.rangeStart && this.rangeEnd) {
      this.btnApply.addEventListener('click', this.applyStartOrEndHandler);
    }
  }

  examineCheckinCheckout() {
    this.existCheckinCheckout = this.checkin && this.checkout;
    this.existCheckinOnly = this.checkin && !this.checkout;
  }

  // ----------------------------start chooseRange--------------------------------//

  chooseRange(e) {
    const hasPrevDays = e.target.classList.contains('weeks__day_prev');
    const hasNextDays = e.target.classList.contains('weeks__day_next');
    const noOtherDays = !hasPrevDays && !hasNextDays;
    const hasDays = e.target.classList.contains('.weeks__days');
    const noDays = noOtherDays && !hasDays;
    const afterToday = (new Date(this.year, this.month, +e.target.innerText) > new Date());
    this.examineCheckinCheckout();
    const dayBeforeExistingCheckin = (this.existCheckinOnly)
      ? (
        (+this.month < +this.checkin.getMonth())
        || (+this.month === +this.checkin.getMonth()
          && +e.target.innerText < +this.checkin.getDate()))
      : false;

    const dayAfterExistingCheckin = this.existCheckinOnly
      ? (+this.month > +this.checkin.getMonth()
        || (+this.month === +this.checkin.getMonth()
          && +e.target.innerText > +this.checkin.getDate())
      )
      : false;

    if (noDays && afterToday) {
      if (this.existCheckinCheckout) this.makeCheckin(e);
      else if (dayBeforeExistingCheckin) this.makeCheckin(e);
      else if (dayAfterExistingCheckin) this.makeCheckout(e);
      else if (!this.checkin && !this.checkout) this.makeCheckin(e);
    }
  }

  makeCheckin(e) {
    this.checkout = '';
    this.checkin = new Date(this.year, this.month, +e.target.innerText);
    this.render();
  }

  makeCheckout(e) {
    this.checkout = new Date(this.year, this.month, +e.target.innerText);
    this.render();
  }

  // ----------------------------end chooseRange--------------------------------//

  applyRange(e) {
    e.preventDefault();
    if (this.existCheckinCheckout) {
      this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanEndMonth = this.months[this.checkout.getMonth()].slice(0, 3);
      this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeSpanStartMonth} - ${this.checkout.getDate()} ${this.rangeSpanEndMonth}`;
      // set the range
      this.rangeSpan.value = this.rangeSpanText;
    }
    this.calendar.classList.remove('dropdown__show');
  }

  // ----------------------------end applyStartOrEnd--------------------------------//
  applyStartOrEnd(e) {
    e.preventDefault();
    this.rangeStart.value = (this.checkin)
      ? this.applyStart()
      : '';
    this.rangeEnd.value = (this.checkout)
      ? this.applyEnd()
      : '';
    this.calendar.classList.remove('dropdown__show');
  }

  applyStart() {
    const monthBefore10 = (parseInt(this.checkin.getMonth() + 1, 10) < 10);
    this.rangeStartMonth = monthBefore10
      ? `0${parseInt(this.checkin.getMonth() + 1, 10)}`
      : parseInt(this.checkin.getMonth() + 1, 10);
    return `${this.checkin.getDate()}.${this.rangeStartMonth}.${this.checkin.getFullYear()}`;
  }

  applyEnd() {
    const monthBefore10 = (parseInt(this.checkout.getMonth() + 1, 10) < 10);
    this.rangeEndMonth = monthBefore10
      ? `0${parseInt(this.checkout.getMonth() + 1, 10)}`
      : parseInt(this.checkout.getMonth() + 1, 10);
    return `${this.checkout.getDate()}.${this.rangeEndMonth}.${this.checkout.getFullYear()}`;
  }

  // ----------------------------end applyStartOrEnd--------------------------------//

  resetInput(e) {
    e.preventDefault();
    const rangeInput = this.rangeSpan;
    const separateInput = this.rangeStart && this.rangeEnd;
    this.checkin = '';
    this.checkout = '';
    if (rangeInput) {
      this.rangeSpan.value = '';
    }
    if (separateInput) {
      this.rangeStart.value = '';
      this.rangeEnd.value = '';
    }
    this.render();
    this.calendar.classList.remove('dropdown__show');
  }

  showPrevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render();
  }

  showNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.render();
  }

  // ----------------------------start render--------------------------------//

  render() {
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();

    // for setting month's days in calendar
    this.lastDay = new Date(this.year, parseInt(this.month, 10) + 1, 0).getDate();
    this.lastDayPrev = new Date(this.year, parseInt(this.month, 10), 0).getDate();
    this.dayOfWeekFirst = new Date(this.year, parseInt(this.month, 10), 1).getDay();
    this.prevMonthDays = (this.dayOfWeekFirst === 0) ? 6 : (this.dayOfWeekFirst - 1);
    this.dayOfWeekLast = new Date(this.year, parseInt(this.month, 10) + 1, 0).getDay();
    this.nextMonthDay = (this.dayOfWeekLast === 0) ? 6 : (this.dayOfWeekLast - 1);
    this.daysLeft = (this.dayOfWeekLast === 0) ? 0 : (7 - this.dayOfWeekLast);
    this.dateInCalendar.textContent = `${this.months[this.month]} ${this.year}`;

    this.daysOfMonth.innerHTML = this.renderPrevMonth()
      + this.renderCurrentMonth()
      + this.renderNextMonth();
  }

  renderPrevMonth() {
    let prevDays = '';
    for (let p = this.prevMonthDays; p > 0; p -= 1) {
      const chechedInPrevMonth = (this.checkin)
        ? (this.checkin.getMonth() === (this.month - 1)
          && this.checkin.getDate() === (this.lastDayPrev - p + 1))
        : false;

      const checkedOutPrevMonth = (this.checkout)
        ? (this.checkout.getMonth() === (this.month - 1)
          && this.checkout.getDate() === (this.lastDayPrev - p + 1))
        : false;

      const checkedInOrOutPrevMonth = (this.checkin && this.checkout)
        ? ((this.checkin.getMonth() === (this.month - 1)
          && this.checkin.getDate() < (this.lastDayPrev - p + 1))
          || (this.checkout.getMonth() === (this.month - 1)
            && this.checkout.getDate() > (this.lastDayPrev - p + 1))
          || (this.checkin.getMonth() < (this.month - 1)
            && this.checkout.getMonth() > (this.month - 1)))
        : false;

      if (chechedInPrevMonth) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_prev_checkedin ">${this.lastDayPrev - p + 1}</div>`;
      else if (checkedOutPrevMonth) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_prev_checkedout ">${this.lastDayPrev - p + 1}</div>`;
      else if (checkedInOrOutPrevMonth) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_ranged_another">${this.lastDayPrev - p + 1}</div>`;
      else prevDays += `<div class="weeks__day weeks__day_prev">${this.lastDayPrev - p + 1}</div>`;
    }
    return prevDays;
  }

  renderCurrentMonth() {
    let currDays = '';
    for (let i = 1; i <= this.lastDay; i += 1) {
      const chechedInToday = (i === new Date().getDate()
        && this.date.getMonth() === new Date().getMonth()
        && this.checkin
        && this.checkin.getMonth() === this.month
        && this.checkin.getDate() === i);
      const chechedInCurrMonth = (this.checkin)
        ? (this.month === this.checkin.getMonth()
          && i === this.checkin.getDate())
        : false;
      const checkedOutCurrMonth = (this.checkout)
        ? (this.month === this.checkout.getMonth()
          && i === this.checkout.getDate())
        : false;
      const today = (i === new Date().getDate()
        && this.date.getFullYear() === new Date().getFullYear()
        && this.date.getMonth() === new Date().getMonth());

      const checkedRangeCurrMonth = (this.checkin && this.checkout)
        ? ((this.month === this.checkin.getMonth()
          && this.month === this.checkout.getMonth()
          && i > this.checkin.getDate()
          && i < this.checkout.getDate())
          || (this.month === this.checkin.getMonth()
            && this.month < this.checkout.getMonth()
            && i > this.checkin.getDate())
          || (this.month === this.checkout.getMonth()
            && this.month > this.checkin.getMonth()
            && i < this.checkout.getDate())
          || (this.month < this.checkout.getMonth()
            && this.month > this.checkin.getMonth()))
        : false;

      if (chechedInToday) currDays += `<div class="weeks__day weeks__day_today weeks__day_checkedin">${i}</div>`;
      else if (chechedInCurrMonth) currDays += `<div class="weeks__day weeks__day_checkedin">${i}</div>`;
      else if (checkedOutCurrMonth) currDays += `<div class="weeks__day weeks__day_checkedout">${i}</div>`;
      else if (today) currDays += `<div class="weeks__day weeks__day_today">${i}</div>`;
      else if (checkedRangeCurrMonth) currDays += `<div class="weeks__day weeks__day_ranged">${i}</div>`;
      else currDays += `<div class="weeks__day">${i}</div>`;
    }
    return currDays;
  }

  renderNextMonth() {
    let nextDays = '';
    for (let n = 1; n < this.daysLeft + 1; n += 1) {
      const chechedInNextMonth = this.checkedin
        ? (this.checkin.getMonth() === this.month + 1
          && this.checkin.getDate() === n)
        : false;
      const checkedOutNextMonth = this.checkout
        ? (this.checkout.getMonth() === this.month + 1
          && this.checkout.getDate() === n)
        : false;
      const checkedRangeNextMonth = (this.checkin && this.checkout)
        ? ((this.month + 1) > this.checkin.getMonth()
          && (this.month + 1) <= this.checkout.getMonth())
        : false;

      if (chechedInNextMonth) nextDays += `<div class="weeks__day weeks__day_next weeks__day_next_checkedin">${n}</div>`;
      else if (checkedOutNextMonth) nextDays += `<div class="weeks__day weeks__day_next weeks__day_next_checkedout">${n}</div>`;
      else if (checkedRangeNextMonth) nextDays += `<div class="weeks__day weeks__day_next weeks__day_ranged_another">${n}</div>`;
      else nextDays += `<div class="weeks__day weeks__day_next">${n}</div>`;
    }
    return nextDays;
  }
  // ----------------------------end render--------------------------------//
}
