class Calendar {
  constructor(item) {
    this.date = new Date();
    this.init(item);
  }

  init(item) {
    this.createChildren(item);
    this.render();
    this.enableHandlers();
    this.addEventListener();
  }

  createChildren(item) {
    this.calendarContainer = item;
    this.months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ];
    this.buttonPrev = this.calendarContainer.querySelector(
      '.js-calendar__control_prev'
    );
    this.buttonNext = this.calendarContainer.querySelector(
      '.js-calendar__control_next'
    );
    this.dateInCalendar = this.calendarContainer.querySelector(
      '.js-calendar__month'
    );
    this.daysOfMonth = this.calendarContainer.querySelector(
      '.js-calendar__days'
    );

    if (this.calendarContainer.closest('.js-date-range')) {
      this.mainContainer = this.calendarContainer.closest('.js-date-range');
    } else {
      this.mainContainer = this.calendarContainer;
    }

    if (this.mainContainer.querySelector('input[name=checkin-checkout]')) {
      this.rangeSpan = this.mainContainer.querySelector(
        'input[name=checkin-checkout]'
      );
    }
    if (this.mainContainer.querySelector('input[name=checkin]')) {
      this.rangeStart = this.mainContainer.querySelector('input[name=checkin]');
    }
    if (this.mainContainer.querySelector('input[name=checkout]')) {
      this.rangeEnd = this.mainContainer.querySelector('input[name=checkout]');
    }

    if (this.mainContainer.querySelector('.js-date-range__calendar')) {
      this.calendar = this.mainContainer.querySelector(
        '.js-date-range__calendar'
      );
    }

    this.btnApply = this.mainContainer.querySelector(
      '.js-calendar__button_submit'
    );
    this.btnReset = this.mainContainer.querySelector(
      '.js-calendar__button_reset'
    );
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

  // ---------------start chooseRange-------------------//

  chooseRange(e) {
    const hasPrevDays = e.target.classList.contains('js-calendar__day_prev');
    const hasNextDays = e.target.classList.contains('js-calendar__day_next');
    const noOtherDays = !hasPrevDays && !hasNextDays;
    const hasDays = e.target.classList.contains('.js-calendar__days');
    const noDays = noOtherDays && !hasDays;
    const chosenDay = new Date(this.year, this.month, +e.target.innerText);
    const afterToday = chosenDay > new Date();
    this.examineCheckinCheckout();
    if (noDays && afterToday) {
      if (this.existCheckinCheckout) this.makeCheckin(e);
      else if (this.existCheckinOnly) {
        const [dayBeforeCheckin, dayAfterCheckin] = this.getCheckinData(e);
        if (dayBeforeCheckin) this.makeCheckin(e);
        else if (dayAfterCheckin) this.makeCheckout(e);
      } else if (!this.checkin && !this.checkout) this.makeCheckin(e);
    }
  }

  getCheckinData(e) {
    const thisYear = parseInt(this.year, 10);
    const thisMonth = parseInt(this.month, 10);
    const checkinYear = parseInt(this.checkin.getFullYear(), 10);
    const checkinMonth = parseInt(this.checkin.getMonth(), 10);
    const checkinDay = parseInt(this.checkin.getDate(), 10);
    const yearCheckin = thisYear === checkinYear;
    const yearBeforeCheckin = thisYear < checkinYear;
    const yearAfterCheckin = thisYear > checkinYear;
    const monthCheckin = thisMonth === checkinMonth;
    const monthBeforeCheckin = thisMonth < checkinMonth;
    const monthAfterCheckin = thisMonth > checkinMonth;
    const dayBeforeCheckin = parseInt(e.target.innerText, 10) < checkinDay;
    const dayAfterCheckin = parseInt(e.target.innerText, 10) > checkinDay;
    const dayBeforeExistingCheckin = this.chooseBeforeCheckin(
      yearBeforeCheckin,
      yearCheckin,
      monthBeforeCheckin,
      monthCheckin,
      dayBeforeCheckin
    );
    const dayAfterExistingCheckin = this.chooseAfterCheckin(
      yearAfterCheckin,
      yearCheckin,
      monthAfterCheckin,
      monthCheckin,
      dayAfterCheckin
    );
    return [dayBeforeExistingCheckin, dayAfterExistingCheckin];
  }

  chooseBeforeCheckin(
    yearBeforeCheckin,
    yearCheckin,
    monthBeforeCheckin,
    monthCheckin,
    dayBeforeCheckin
  ) {
    const monthBeforeCheckinSameYear = yearCheckin && monthBeforeCheckin;
    const daysBeforeCheckin = monthCheckin && dayBeforeCheckin;
    const dayBeforeCheckinSameYear = yearCheckin && daysBeforeCheckin;
    const beforeCheckin = yearBeforeCheckin
      || monthBeforeCheckinSameYear
      || dayBeforeCheckinSameYear;
    const dayBeforeExistingCheckin = this.existCheckinOnly
      ? beforeCheckin
      : false;
    return dayBeforeExistingCheckin;
  }

  chooseAfterCheckin(
    yearAfterCheckin,
    yearCheckin,
    monthAfterCheckin,
    monthCheckin,
    dayAfterCheckin
  ) {
    const daysAfterCheckin = monthCheckin && dayAfterCheckin;
    const montAfterCheckin = yearCheckin && monthAfterCheckin;
    const dayAfterCheckinThinYear = yearCheckin && daysAfterCheckin;
    const dayOrMonthAfterCheckin = montAfterCheckin || dayAfterCheckinThinYear;
    const afterCheckin = yearAfterCheckin || dayOrMonthAfterCheckin;
    const dayAfterExistingCheckin = this.existCheckinOnly
      ? afterCheckin
      : false;
    return dayAfterExistingCheckin;
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

  // -------------------end chooseRange-----------------------//

  applyRange(e) {
    e.preventDefault();
    this.examineCheckinCheckout();
    if (this.existCheckinCheckout) {
      this.rangeStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeEndMonth = this.months[this.checkout.getMonth()].slice(0, 3);
      const checkinInfo = `${this.checkin.getDate()} ${this.rangeStartMonth}`;
      const checkoutInfo = `${this.checkout.getDate()} ${this.rangeEndMonth}`;
      this.rangeSpanText = `${checkinInfo} - ${checkoutInfo}`;
    } else if (this.existCheckinOnly) {
      this.rangeStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeStartMonth}`;
    } else {
      this.rangeSpanText = '';
    }
    this.rangeSpan.value = this.rangeSpanText;
    this.calendar.classList.remove('js-expand__show');
  }

  // -------------------end applyStartOrEnd--------------------//
  applyStartOrEnd(e) {
    e.preventDefault();
    this.rangeStart.value = (this.checkin) ? this.applyStart() : '';
    this.rangeEnd.value = (this.checkout) ? this.applyEnd() : '';
    this.calendar.classList.remove('js-expand__show');
  }

  applyStart() {
    const monthBefore10 = parseInt(this.checkin.getMonth() + 1, 10) < 10;
    this.rangeStartMonth = monthBefore10
      ? `0${parseInt(this.checkin.getMonth() + 1, 10)}`
      : parseInt(this.checkin.getMonth() + 1, 10);
    return `${this.checkin.getDate()}.${
      this.rangeStartMonth
    }.${this.checkin.getFullYear()}`;
  }

  applyEnd() {
    const monthBefore10 = parseInt(this.checkout.getMonth() + 1, 10) < 10;
    this.rangeEndMonth = monthBefore10
      ? `0${parseInt(this.checkout.getMonth() + 1, 10)}`
      : parseInt(this.checkout.getMonth() + 1, 10);
    return `${this.checkout.getDate()}.${
      this.rangeEndMonth
    }.${this.checkout.getFullYear()}`;
  }

  // ------------------end applyStartOrEnd-------------------//

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
    this.calendar.classList.remove('js-expand__show');
  }

  showPrevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render();
  }

  showNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.render();
  }

  // -------------------start render---------------------//

  render() {
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();

    // for setting month's days in calendar
    const thisMonth = parseInt(this.month, 10);

    this.lastDay = new Date(this.year, thisMonth + 1, 0).getDate();
    this.lastDayPrev = new Date(this.year, thisMonth, 0).getDate();
    this.dayOfWeekFirst = new Date(this.year, thisMonth, 1).getDay();

    const ifFirstDaySunday = this.dayOfWeekFirst === 0;
    this.prevMonthDays = ifFirstDaySunday ? 6 : (this.dayOfWeekFirst - 1);
    this.dayOfWeekLast = new Date(this.year, thisMonth + 1, 0).getDay();

    const ifLastDaySunday = this.dayOfWeekLast === 0;
    this.nextMonthDay = ifLastDaySunday ? 6 : (this.dayOfWeekLast - 1);
    this.daysLeft = ifLastDaySunday ? 0 : (7 - this.dayOfWeekLast);
    this.dateInCalendar.textContent = `${this.months[this.month]} ${this.year}`;

    this.daysOfMonth.innerHTML = `${this.renderPrevMonth()} ${
      this.renderCurrentMonth()
    } ${this.renderNextMonth()}`;
  }

  renderPrevMonth() {
    let prevDays = '';
    for (let p = this.prevMonthDays; p > 0; p -= 1) {
      const prevDay = this.lastDayPrev - p + 1;
      const betweenInOutOneYear = this.betweenInOutPrevYear(prevDay)
        || this.betweenInOutSameYear(prevDay);
      const betweenInOutYears = betweenInOutOneYear
        || this.betweenInOutDiffYears(prevDay);
      if (this.checkinPrevMonth(prevDay) || this.checkinPrevYear(prevDay)) {
        prevDays += `<div class="calendar__day_prev_checkin">${prevDay}</div>`;
      } else if (
        this.checkoutPrevMonth(prevDay)
        || this.checkoutPrevYear(prevDay)
      ) {
        prevDays += `<div class="calendar__day_prev_checkout">${prevDay}</div>`;
      } else if (this.betweenInOutPrevMonth(prevDay) || betweenInOutYears) {
        prevDays
          += `<div class="calendar__day_ranged_between">${prevDay}</div>`;
      } else {
        prevDays
          += `<div class="calendar__day_prev js-calendar__day_prev">
            ${prevDay}
          </div>`;
      }
    }
    return prevDays;
  }

  checkinPrevMonth(prevDay) {
    if (!this.checkin) return false;
    const checkinMonthBefore = this.checkin.getMonth() === (this.month - 1);
    const checkinThisYear = this.checkin.getFullYear() === this.year;
    const checkinPrevDay = this.checkin.getDate() === (prevDay);
    const checkinPrevMonth = (this.checkin)
      ? (checkinMonthBefore && checkinThisYear && checkinPrevDay)
      : false;
    return checkinPrevMonth;
  }

  checkinPrevYear(prevDay) {
    if (!this.checkin) return false;
    const checkinYearBefore = this.checkin.getFullYear === this.year - 1;
    const checkinLastMonth = this.checkin.getMonth() === 12;
    const thisMonthFirst = this.month === 1;
    const checkinPrevDay = this.checkin.getDate() === prevDay;
    const checkinLastYearLastMonth = checkinYearBefore && checkinLastMonth;
    const checkinBeforeJanuary = thisMonthFirst && checkinPrevDay;
    const checkinPrevYear = this.checkin
      ? checkinLastYearLastMonth && checkinBeforeJanuary
      : false;
    return checkinPrevYear;
  }

  checkoutPrevMonth(prevDay) {
    if (!this.checkout) return false;
    const checkoutPrevMonth = this.checkout.getMonth() === (this.month - 1);
    const checkinThisYear = this.checkin.getFullYear() === this.year;
    const checkoutPrevDday = this.checkout.getDate() === (prevDay);
    const checkoutPrevMonthThisYear = (this.checkout)
      ? checkoutPrevMonth && checkinThisYear && checkoutPrevDday
      : false;
    return checkoutPrevMonthThisYear;
  }

  checkoutPrevYear(prevDay) {
    if (!this.checkout) return false;
    const checkoutYearBefore = this.checkout.getFullYear() === this.year - 1;
    const checkoutMonthLast = this.checkout.getMonth() === 12;
    const thisMonthFirst = this.month === 1;
    const checkoutDayPrev = this.checkout.getDate() === prevDay;
    const checkoutLastYearLastMonth = checkoutYearBefore && checkoutMonthLast;
    const checkoutBeforeJanuary = thisMonthFirst && checkoutDayPrev;
    const checkoutPrevYear = (this.checkout)
      ? checkoutLastYearLastMonth && checkoutBeforeJanuary
      : false;
    return checkoutPrevYear;
  }

  betweenInOutPrevMonth(prevDay) {
    if (!this.checkin || !this.checkout) return false;
    const sameYear = this.checkin.getFullYear() === this.year
      && this.checkout.getFullYear() === this.year;
    const inPrevMonth = (this.checkin.getMonth() === this.month - 1);
    const outPrevMonth = this.checkout.getMonth() === this.month - 1;
    const inPrevDays = this.checkin.getDate() < prevDay;
    const outNextDays = this.checkout.getDate() > prevDay;
    const outAfterInMonth = this.checkout.getMonth() > this.checkin.getMonth();
    const inPrevMonthDay = inPrevMonth && inPrevDays;
    const outPrevMonthNextDay = outPrevMonth && outNextDays;
    const inOutPrevMonth = inPrevMonthDay && outPrevMonthNextDay;
    const inOutDiffMonth = inPrevMonth && inPrevDays && outAfterInMonth;
    const inOrOutPrevMonth = inOutPrevMonth || inOutDiffMonth;
    const inOrOutPrevMonthSameYear = sameYear && inOrOutPrevMonth;
    return inOrOutPrevMonthSameYear;
  }

  betweenInOutPrevYear(prevDay) {
    if (!this.checkin || !this.checkout) return false;
    const inPrevYear = this.checkin.getFullYear() === this.year - 1;
    const outNextYear = this.checkout.getFullYear() >= this.year;
    const outPrevYear = this.checkout.getFullYear() === this.year - 1;
    const inLastMonth = this.checkin.getMonth() === 12;
    const outLastMonth = this.checkout.getMonth() === 12;
    const inBeforePrevDay = this.checkin.getDate() < prevDay;
    const outAfterPrevDay = this.checkout.getDate() > prevDay;
    const inLastMonthBeforePrev = inLastMonth && inBeforePrevDay;
    const outLastMonthAfterPrev = outLastMonth && outAfterPrevDay;
    const inPrevOutNextYear = inPrevYear && outNextYear;
    const InOutPrevYear = inPrevYear && outPrevYear;
    const betweenInPrevYear = inPrevOutNextYear
      && inLastMonthBeforePrev;
    const betweenInOutPrevYear = InOutPrevYear
      && inLastMonthBeforePrev
      && outLastMonthAfterPrev;
    const betweenOutPrevYeaer = outPrevYear && outLastMonthAfterPrev;
    const betweenInOutPrevYearFull = betweenInPrevYear
      || betweenInOutPrevYear
      || betweenOutPrevYeaer;
    return betweenInOutPrevYearFull;
  }

  betweenInOutSameYear() {
    if (!this.checkin || !this.checkout) return false;
    const checkinThisYear = this.checkin.getFullYear() === this.year;
    const checkoutThisYear = this.checkout.getFullYear() === this.year;
    const sameYear = checkinThisYear && checkoutThisYear;
    const checkinPrevMonth = this.checkin.getMonth() < this.month - 1;
    const checkoutNextMOnth = this.checkout.getMonth() >= this.month;
    const betweenInOut = sameYear && checkinPrevMonth && checkoutNextMOnth;
    return betweenInOut;
  }

  betweenInOutDiffYears(prevDay) {
    if (!this.checkin || !this.checkout) return false;
    const diffYears = this.checkin.getFullYear() < this.checkout.getFullYear();
    const checkinThisYear = (this.checkin.getFullYear() === this.year);
    const checkinPrevMonth = this.checkin.getMonth() <= this.month - 1;
    const checkinPrevDay = this.checkin.getDate() < prevDay;
    const checkinPrev = checkinThisYear && checkinPrevMonth && checkinPrevDay;
    const checkoutThisYear = this.checkout.getFullYear() === this.year;
    const checkoutNextMonth = this.checkout.getMonth() >= this.month;
    const checkoutNext = checkoutThisYear && checkoutNextMonth;
    const betweenInOutDiffYears = diffYears && (checkinPrev || checkoutNext);
    return betweenInOutDiffYears;
  }

  renderCurrentMonth() {
    let currDays = '';
    for (let i = 1; i <= this.lastDay; i += 1) {
      if (this.checkinToday(i)) {
        currDays += `<div class="calendar__day_checkin">${i}</div>`;
      } else if (this.checkinCurrMonth(i)) {
        currDays += `<div class="calendar__day_checkin">${i}</div>`;
      } else if (this.checkoutCurrMonth(i)) {
        currDays += `<div class="calendar__day_checkout">${i}</div>`;
      } else if (this.todayCurrMonth(i)) {
        currDays += `<div class="calendar__today">${i}</div>`;
      } else if (this.betweenInOutCurrentMonth(i)) {
        currDays += `<div class="calendar__day_ranged">${i}</div>`;
      } else {
        currDays += `<div class="calendar__day">${i}</div>`;
      }
    }
    return currDays;
  }

  todayCurrMonth(i) {
    const today = (i === new Date().getDate()
      && this.date.getFullYear() === new Date().getFullYear()
      && this.date.getMonth() === new Date().getMonth());
    return today;
  }

  checkinToday(i) {
    const checkinToday = (i === new Date().getDate()
      && this.date.getMonth() === new Date().getMonth()
      && this.checkin
      && this.checkin.getFullYear() === this.year
      && this.checkin.getMonth() === this.month
      && this.checkin.getDate() === i);
    return checkinToday;
  }

  checkinCurrMonth(i) {
    const checkinCurrMonth = (this.checkin)
      ? (this.year === this.checkin.getFullYear()
        && this.month === this.checkin.getMonth()
        && i === this.checkin.getDate())
      : false;
    return checkinCurrMonth;
  }

  checkoutCurrMonth(i) {
    const checkoutCurrMonth = (this.checkout)
      ? (this.year === this.checkout.getFullYear()
        && this.month === this.checkout.getMonth()
        && i === this.checkout.getDate())
      : false;
    return checkoutCurrMonth;
  }

  betweenInOutCurrentMonth(i) {
    if (!this.checkin || !this.checkout) return false;
    const yearCheckin = this.checkin.getFullYear() === this.year;
    const yearCheckout = this.checkout.getFullYear() === this.year;
    const checkinYear = this.checkin.getFullYear();
    const checkoutYear = this.checkout.getFullYear();
    const yearCheckoutAfterCheckin = checkinYear < checkoutYear;
    const yearCheckoutSameCheckin = yearCheckin && yearCheckout;
    const monthCheckin = this.month === this.checkin.getMonth();
    const monthAfterCheckin = this.month > this.checkin.getMonth();
    const monthBeforeCheckout = this.month < this.checkout.getMonth();
    const monthCheckout = this.month === this.checkout.getMonth();
    const sameMonth = monthCheckin && monthCheckout;
    const dayAfterCheckin = i > this.checkin.getDate();
    const dayBeforeCheckout = i < this.checkout.getDate();
    const dayBetweenCheckinCheckout = dayAfterCheckin && dayBeforeCheckout;

    const checkinCheckoutSameMonth = yearCheckoutSameCheckin
      && sameMonth
      && dayBetweenCheckinCheckout;
    const checkinBeforeCheckoutMonth = yearCheckoutSameCheckin
      && monthCheckin
      && monthBeforeCheckout
      && dayAfterCheckin;
    const checkoutAfterCheckinMonth = yearCheckoutSameCheckin
      && monthCheckout
      && monthAfterCheckin
      && dayBeforeCheckout;
    const checkinCheckoutBetween = yearCheckoutSameCheckin
      && monthAfterCheckin
      && monthBeforeCheckout;

    const thisYearRange = checkinCheckoutSameMonth
      || checkinBeforeCheckoutMonth
      || checkoutAfterCheckinMonth
      || checkinCheckoutBetween;

    const prevYearRange = (yearCheckin && yearCheckoutAfterCheckin)
      && ((monthCheckin && dayAfterCheckin)
        || monthAfterCheckin);

    const nextYearRange = (yearCheckout && yearCheckoutAfterCheckin)
      && ((monthCheckout && dayBeforeCheckout)
        || monthBeforeCheckout);

    const ifInRange = (this.checkin && this.checkout)
      ? thisYearRange || prevYearRange || nextYearRange
      : false;

    return ifInRange;
  }

  renderNextMonth() {
    let nextDays = '';
    for (let n = 1; n < this.daysLeft + 1; n += 1) {
      const yearIn = this.checkin
        ? this.checkin.getFullYear() === this.year
        : false;
      const yearOut = this.checkout
        ? this.checkout.getFullYear() === this.year
        : false;
      const inOutCurrYear = this.betweenInOutCurrYear(n, yearIn, yearOut);
      const inOutNextYear = this.betweenInOutNextYear(yearIn, yearOut);
      const checkoutNextMonthOrYear = this.checkoutNextMonth(n, yearOut)
        || this.checkoutNextYear(n);
      const betweenInOutAYear = inOutCurrYear || inOutNextYear;

      if (this.checkinNextMonth(n, yearIn) || this.checkinNextYear(n)) {
        nextDays += `<div class="calendar__day_next_checkin">${n}</div>`;
      } else if (checkoutNextMonthOrYear) {
        nextDays += `<div class="calendar__day_next_checkout">${n}</div>`;
      } else if (betweenInOutAYear) {
        nextDays += `<div class="calendar__day_ranged_between">${n}</div>`;
      } else {
        nextDays
          += `<div class="calendar__day_next js-calendar__day_next">${n}</div>`;
      }
    }
    return nextDays;
  }

  checkinNextMonth(n, yearCheckin) {
    const checkinNextMonth = yearCheckin
      ? (this.checkin.getMonth() === this.month + 1
        && this.checkin.getDate() === n)
      : false;
    return checkinNextMonth;
  }

  checkinNextYear(n) {
    const yearNextCheckin = this.checkin
      ? this.checkin.getFullYear() > this.year
      : false;
    const checkinNextYear = yearNextCheckin
      ? (this.checkin.getMonth() === 1
        && this.month === 12
        && this.checkin.getDate() === n)
      : false;
    return checkinNextYear;
  }

  checkoutNextMonth(n, yearCheckout) {
    const checkoutNextMonth = yearCheckout
      ? (this.checkout.getMonth() === this.month + 1
        && this.checkout.getDate() === n)
      : false;
    return checkoutNextMonth;
  }

  checkoutNextYear(n) {
    const yearNextCheckout = this.checkout
      ? this.checkout.getFullYear() > this.year
      : false;

    const checkoutNextYear = yearNextCheckout
      ? (this.checkout.getMonth() === 1
        && this.month === 12
        && this.checkout.getDate() === n)
      : false;
    return checkoutNextYear;
  }

  betweenInOutCurrYear(n, yearCheckin, yearCheckout) {
    const betweenInOutCurrYear = (yearCheckin && yearCheckout)
      ? (this.checkout.getMonth() > this.month
        && this.checkin.getMonth() <= this.month)
        || (this.checkout.getMonth() === this.month + 1
          && this.checkout.getDate() > n)
      : false;
    return betweenInOutCurrYear;
  }

  betweenInOutNextYear(yearCheckin, yearCheckout) {
    const yearThisCheckinNextCheckout = (this.checkin && this.checkout)
      ? this.checkin.getFullYear() < this.checkout.getFullYear()
      : false;

    const betweenInOutNextYear = yearThisCheckinNextCheckout && (
      (this.month >= this.checkin.getMonth() && yearCheckin)
      || (this.month < this.checkout.getMonth() && yearCheckout));

    return betweenInOutNextYear;
  }

  // ---------------------end render-----------------------//
}

export default Calendar;
