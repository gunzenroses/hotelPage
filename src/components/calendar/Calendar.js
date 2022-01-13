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
      '.js-calendar__button_prev'
    );
    this.buttonNext = this.calendarContainer.querySelector(
      '.js-calendar__button_next'
    );
    this.dateInCalendar = this.calendarContainer.querySelector(
      '.js-calendar__month'
    );
    this.daysOfMonth = this.calendarContainer.querySelector('.js-calendar__days');

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
      '.js-calendar__button-submit'
    );
    this.btnReset = this.mainContainer.querySelector(
      '.js-calendar__button-reset'
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
    const afterToday = new Date(this.year, this.month, +e.target.innerText) > new Date();
    this.examineCheckinCheckout();
    if (noDays && afterToday) {
      if (this.existCheckinCheckout) this.makeCheckin(e);
      else if (this.existCheckinOnly) {
        const [dayBeforeExistingCheckin, dayAfterExistingCheckin] = this.getCheckinData(e);
        if (dayBeforeExistingCheckin) this.makeCheckin(e);
        else if (dayAfterExistingCheckin) this.makeCheckout(e);
      } else if (!this.checkin && !this.checkout) this.makeCheckin(e);
    }
  }

  getCheckinData(e) {
    const yearCheckin = parseInt(this.year, 10) === parseInt(this.checkin.getFullYear(), 10);
    const yearBeforeCheckin = parseInt(this.year, 10) < parseInt(this.checkin.getFullYear(), 10);
    const yearAfterCheckin = parseInt(this.year, 10) > parseInt(this.checkin.getFullYear(), 10);
    const monthCheckin = parseInt(this.month, 10) === parseInt(this.checkin.getMonth(), 10);
    const monthBeforeCheckin = parseInt(this.month, 10) < parseInt(this.checkin.getMonth(), 10);
    const monthAfterCheckin = parseInt(this.month, 10) > parseInt(this.checkin.getMonth(), 10);
    const dayBeforeCheckin = parseInt(e.target.innerText, 10) < parseInt(this.checkin.getDate(), 10);
    const dayAfterCheckin = parseInt(e.target.innerText, 10) > parseInt(this.checkin.getDate(), 10);
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
    const dayBeforeCheckinSameYear = yearCheckin && monthCheckin && dayBeforeCheckin;
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
    const montAfterCheckin = yearCheckin && monthAfterCheckin;
    const dayAfterCheckinThinYear = yearCheckin && monthCheckin && dayAfterCheckin;
    const afterCheckin = yearAfterCheckin || montAfterCheckin || dayAfterCheckinThinYear;
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
      this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanEndMonth = this.months[this.checkout.getMonth()].slice(0, 3);
      const checkinInfo = `${this.checkin.getDate()} ${this.rangeSpanStartMonth}`;
      const checkoutInfo = `${this.checkout.getDate()} ${this.rangeSpanEndMonth}`;
      this.rangeSpanText = `${checkinInfo} - ${checkoutInfo}`;
    } else if (this.existCheckinOnly) {
      this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeSpanStartMonth}`;
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
    this.lastDay = new Date(this.year, parseInt(this.month, 10) + 1, 0).getDate();
    this.lastDayPrev = new Date(this.year, parseInt(this.month, 10), 0).getDate();
    this.dayOfWeekFirst = new Date(this.year, parseInt(this.month, 10), 1).getDay();
    this.prevMonthDays = (this.dayOfWeekFirst === 0) ? 6 : (this.dayOfWeekFirst - 1);
    this.dayOfWeekLast = new Date(this.year, parseInt(this.month, 10) + 1, 0).getDay();
    this.nextMonthDay = (this.dayOfWeekLast === 0) ? 6 : (this.dayOfWeekLast - 1);
    this.daysLeft = (this.dayOfWeekLast === 0) ? 0 : (7 - this.dayOfWeekLast);
    this.dateInCalendar.textContent = `${this.months[this.month]} ${this.year}`;

    this.daysOfMonth.innerHTML = `${this.renderPrevMonth()} ${
      this.renderCurrentMonth()
    } ${this.renderNextMonth()}`;
  }

  renderPrevMonth() {
    let prevDays = '';
    for (let p = this.prevMonthDays; p > 0; p -= 1) {
      const prevDay = this.lastDayPrev - p + 1;
      const betweenInOutOneYear = (this.betweenInOutPrevYear(prevDay) || this.betweenInOutSameYear(prevDay));
      const betweenInOutYears = betweenInOutOneYear || this.betweenInOutDiffYears(prevDay);
      if (this.checkinPrevMonth(prevDay) || this.checkinPrevYear(prevDay)) {
        prevDays += `<div class="calendar__day_prev_checkin">${prevDay}</div>`;
      } else if (
        this.checkoutPrevMonth(prevDay)
        || this.checkoutPrevYear(prevDay)
      ) {
        prevDays += `<div class="calendar__day_prev_checkout">${prevDay}</div>`;
      } else if (this.betweenInOutPrevMonth(prevDay) || betweenInOutYears) {
        prevDays += `<div class="calendar__day_ranged_between">${prevDay}</div>`;
      } else {
        prevDays += `<div class="calendar__day_prev js-calendar__day_prev">${prevDay}</div>`;
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
    const checkinPrevYear = (this.checkin)
      ? checkinYearBefore && checkinLastMonth && thisMonthFirst && checkinPrevDay
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
    const checkoutPrevYear = (this.checkout)
      ? checkoutYearBefore && checkoutMonthLast && thisMonthFirst && checkoutDayPrev
      : false;
    return checkoutPrevYear;
  }

  betweenInOutPrevMonth(prevDay) {
    if (!this.checkin || !this.checkout) return false;
    const sameYear = this.checkin.getFullYear() === this.year
      && this.checkout.getFullYear() === this.year;
    const checkinPrevMonth = (this.checkin.getMonth() === this.month - 1);
    const checkoutPrevMonth = this.checkout.getMonth() === this.month - 1;
    const checkinPrevDays = this.checkin.getDate() < prevDay;
    const checkoutNextDays = this.checkout.getDate() > prevDay;
    const checkoutMonthAfterCheckin = this.checkout.getMonth() > this.checkin.getMonth();
    const checkinCheckoutPrevMonth = checkinPrevMonth && checkoutPrevMonth && checkinPrevDays && checkoutNextDays;
    const checkinCheckoutDiffMonth = checkinPrevMonth && checkinPrevDays && checkoutMonthAfterCheckin;
    const checkinOrOutPrevMonth = checkinCheckoutPrevMonth || checkinCheckoutDiffMonth;
    const checkinOrOutPrevMonthSameYear = sameYear && checkinOrOutPrevMonth;
    return checkinOrOutPrevMonthSameYear;
  }

  betweenInOutPrevYear(prevDay) {
    if (!this.checkin || !this.checkout) return false;
    const checkinPrevYear = this.checkin.getFullYear() === this.year - 1;
    const checkoutNextYear = this.checkout.getFullYear() >= this.year;
    const checkoutPrevYear = this.checkout.getFullYear() === this.year - 1;
    const checkinLastMonth = this.checkin.getMonth() === 12;
    const checkoutLastMonth = this.checkout.getMonth() === 12;
    const checkinBeforePrevDay = this.checkin.getDate() < prevDay;
    const checkoutAfterPrevDay = this.checkout.getDate() > prevDay;
    const checkinLastMonthBeforePrev = checkinLastMonth && checkinBeforePrevDay;
    const checkoutLastMonthAfterPrev = checkoutLastMonth && checkoutAfterPrevDay;
    const checkinPrevCheckoutNextYear = checkinPrevYear && checkoutNextYear;
    const checkInOutPrevYear = checkinPrevYear && checkoutPrevYear;
    const betweenCheckinPrevYear = checkinPrevCheckoutNextYear
      && checkinLastMonthBeforePrev;
    const betweenCheckInOutPrevYear = checkInOutPrevYear
      && checkinLastMonthBeforePrev
      && checkoutLastMonthAfterPrev;
    const betweenCheckoutPrevYeaer = checkoutPrevYear && checkoutLastMonthAfterPrev;
    const betweenInOutPrevYear = betweenCheckinPrevYear
      || betweenCheckInOutPrevYear
      || betweenCheckoutPrevYeaer;
    return betweenInOutPrevYear;
  }

  betweenInOutSameYear() {
    if (!this.checkin || !this.checkout) return false;
    const checkinThisYear = this.checkin.getFullYear() === this.year;
    const checkoutThisYear = this.checkout.getFullYear() === this.year;
    const sameYear = checkinThisYear && checkoutThisYear;
    const checkinPrevMonth = this.checkin.getMonth() < this.month - 1;
    const checkoutNextMOnth = this.checkout.getMonth() >= this.month;
    const betweenInOutSameYear = sameYear && checkinPrevMonth && checkoutNextMOnth;
    return betweenInOutSameYear;
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
      if (this.checkinToday(i)) currDays += `<div class="calendar__day_checkin">${i}</div>`;
      else if (this.checkinCurrMonth(i)) currDays += `<div class="calendar__day_checkin">${i}</div>`;
      else if (this.checkoutCurrMonth(i)) currDays += `<div class="calendar__day_checkout">${i}</div>`;
      else if (this.todayCurrMonth(i)) currDays += `<div class="calendar__today">${i}</div>`;
      else if (this.betweenInOutCurrentMonth(i)) currDays += `<div class="calendar__day_ranged">${i}</div>`;
      else currDays += `<div class="calendar__day">${i}</div>`;
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
    const yearCheckoutAfterCheckin = this.checkin.getFullYear() < this.checkout.getFullYear();
    const yearCheckoutSameCheckin = yearCheckin && yearCheckout;
    const monthCheckin = this.month === this.checkin.getMonth();
    const monthAfterCheckin = this.month > this.checkin.getMonth();
    const monthBeforeCheckout = this.month < this.checkout.getMonth();
    const monthCheckout = this.month === this.checkout.getMonth();
    const sameMonth = monthCheckin && monthCheckout;
    const dayAfterCheckin = i > this.checkin.getDate();
    const dayBeforeCheckout = i < this.checkout.getDate();
    const dayBetweenCheckinCheckout = dayAfterCheckin && dayBeforeCheckout;

    const thisYearRange = (yearCheckoutSameCheckin && sameMonth && dayBetweenCheckinCheckout)
      || (yearCheckoutSameCheckin && monthCheckin && monthBeforeCheckout && dayAfterCheckin)
      || (yearCheckoutSameCheckin && monthCheckout && monthAfterCheckin && dayBeforeCheckout)
      || (yearCheckoutSameCheckin && monthAfterCheckin && monthBeforeCheckout);

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
      const yearCheckin = this.checkin
        ? this.checkin.getFullYear() === this.year
        : false;
      const yearCheckout = this.checkout
        ? this.checkout.getFullYear() === this.year
        : false;

      if (this.checkinNextMonth(n, yearCheckin) || this.checkinNextYear(n)) nextDays += `<div class="calendar__day_next_checkin">${n}</div>`;
      else if (this.checkoutNextMonth(n, yearCheckout) || this.checkoutNextYear(n)) nextDays += `<div class="calendar__day_next_checkout">${n}</div>`;
      else if (this.betweenInOutCurrentYear(n, yearCheckin, yearCheckout) || this.betweenInOutNextYear(yearCheckin, yearCheckout)) nextDays += `<div class="calendar__day_ranged_between">${n}</div>`;
      else nextDays += `<div class="calendar__day_next js-calendar__day_next">${n}</div>`;
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

  betweenInOutCurrentYear(n, yearCheckin, yearCheckout) {
    const betweenInOutCurrentYear = (yearCheckin && yearCheckout)
      ? (this.checkout.getMonth() > this.month
        && this.checkin.getMonth() <= this.month)
        || (this.checkout.getMonth() === this.month + 1
          && this.checkout.getDate() > n)
      : false;
    return betweenInOutCurrentYear;
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
