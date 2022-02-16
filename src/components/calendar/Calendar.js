import { boundMethod } from 'autobind-decorator';

class Calendar {
  constructor(item) {
    this.date = new Date();
    this.init(item);
  }

  init(item) {
    this.createChildren(item);
    this.createClasses();
    this.render();
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

    this.mainContainer = this.calendarContainer.closest('.js-date-range');
    if (this.mainContainer === null) {
      this.mainContainer = this.calendarContainer;
    }

    this.rangeSpan = this.mainContainer.querySelector(
      'input[name = check-in-check-out]'
    );

    this.rangeStart = this.mainContainer.querySelector(
      'input[name = check-in]'
    );
    
    this.rangeEnd = this.mainContainer.querySelector('input[name = check-out]');

    this.calendar = this.mainContainer.querySelector(
      '.js-date-range__calendar'
    );

    this.btnApply = this.mainContainer.querySelector(
      '.js-calendar__button_submit'
    );
    this.btnReset = this.mainContainer.querySelector(
      '.js-calendar__button_reset'
    );
  }

  createClasses(){
    this.dayPrev = 'calendar__day_prev';
    this.dayNext = 'calendar__day_next';
    this.dayBetween = 'calendar__day calendar__day_between';
    this.dayCheckIn = 'calendar__day calendar__day_check-in';
    this.dayCalendar = 'calendar__day calendar__day';
  }

  addEventListener() {
    this.buttonPrev.addEventListener('pointerup', this.showPrevMonth);
    this.buttonNext.addEventListener('pointerup', this.showNextMonth);
    this.daysOfMonth.addEventListener('pointerup', this.chooseRange);
    if (this.calendar) {
      this.btnReset.addEventListener('pointerup', this.resetInput);
    }
    if (this.rangeSpan) {
      this.btnApply.addEventListener('pointerup', this.applyRange);
    }
    if (this.rangeStart && this.rangeEnd) {
      this.btnApply.addEventListener('pointerup', this.applyStartOrEnd);
    }
  }

  examineCheckInCheckOut() {
    this.existCheckInCheckOut = this.checkIn && this.checkOut;
    this.existCheckInOnly = this.checkIn && !this.checkOut;
  }

  // ---------------start chooseRange-------------------//
  @boundMethod
  chooseRange(e) {
    const hasPrevDays = e.target.classList.contains(`js-${ this.dayPrev }`);
    const hasNextDays = e.target.classList.contains(`js-${ this.dayNext }`);
    const noOtherDays = !hasPrevDays && !hasNextDays;
    const hasDays = e.target.classList.contains('.js-calendar__days');
    const noDays = noOtherDays && !hasDays;
    const chosenDay = new Date(this.year, this.month, +e.target.innerText);
    const afterToday = chosenDay > new Date();
    this.examineCheckInCheckOut();
    if (noDays && afterToday) {
      if (this.existCheckInCheckOut) this.makeCheckIn(e);
      else if (this.existCheckInOnly) {
        const [dayBeforeCheckIn, dayAfterCheckIn] = this.getCheckInData(e);
        if (dayBeforeCheckIn) this.makeCheckIn(e);
        else if (dayAfterCheckIn) this.makeCheckOut(e);
      } else if (!this.checkIn && !this.checkOut) this.makeCheckIn(e);
    }
  }

  getCheckInData(e) {
    const thisYear = parseInt(this.year, 10);
    const thisMonth = parseInt(this.month, 10);
    const checkInYear = parseInt(this.checkIn.getFullYear(), 10);
    const checkInMonth = parseInt(this.checkIn.getMonth(), 10);
    const checkInDay = parseInt(this.checkIn.getDate(), 10);
    const yearCheckIn = thisYear === checkInYear;
    const yearBeforeCheckIn = thisYear < checkInYear;
    const yearAfterCheckIn = thisYear > checkInYear;
    const monthCheckIn = thisMonth === checkInMonth;
    const monthBeforeCheckIn = thisMonth < checkInMonth;
    const monthAfterCheckIn = thisMonth > checkInMonth;
    const dayBeforeCheckIn = parseInt(e.target.innerText, 10) < checkInDay;
    const dayAfterCheckIn = parseInt(e.target.innerText, 10) > checkInDay;
    const checkInBefore = {
      yearBeforeCheckIn,
      yearCheckIn,
      monthBeforeCheckIn,
      monthCheckIn,
      dayBeforeCheckIn
    };
    const checkInAfter = {
      yearAfterCheckIn,
      yearCheckIn,
      monthAfterCheckIn,
      monthCheckIn,
      dayAfterCheckIn
    };
    const dayBeforeExistingCheckIn = this.chooseBeforeCheckIn(checkInBefore);
    const dayAfterExistingCheckIn = this.chooseAfterCheckIn(checkInAfter);
    return [dayBeforeExistingCheckIn, dayAfterExistingCheckIn];
  }

  chooseBeforeCheckIn(options) {
    const {
      yearBeforeCheckIn,
      yearCheckIn,
      monthBeforeCheckIn,
      monthCheckIn,
      dayBeforeCheckIn
    } = options;
    const monthBeforeCheckInSameYear = yearCheckIn && monthBeforeCheckIn;
    const daysBeforeCheckIn = monthCheckIn && dayBeforeCheckIn;
    const dayBeforeCheckInSameYear = yearCheckIn && daysBeforeCheckIn;
    const beforeCheckIn = yearBeforeCheckIn
      || monthBeforeCheckInSameYear
      || dayBeforeCheckInSameYear;
    const dayBeforeExistingCheckIn = this.existCheckInOnly
      ? beforeCheckIn
      : false;
    return dayBeforeExistingCheckIn;
  }

  chooseAfterCheckIn(options) {
    const {
      yearAfterCheckIn,
      yearCheckIn,
      monthAfterCheckIn,
      monthCheckIn,
      dayAfterCheckIn
    } = options;
    const daysAfterCheckIn = monthCheckIn && dayAfterCheckIn;
    const montAfterCheckIn = yearCheckIn && monthAfterCheckIn;
    const dayAfterCheckInThinYear = yearCheckIn && daysAfterCheckIn;
    const dayOrMonthAfterCheckIn = montAfterCheckIn || dayAfterCheckInThinYear;
    const afterCheckIn = yearAfterCheckIn || dayOrMonthAfterCheckIn;
    const dayAfterExistingCheckIn = this.existCheckInOnly
      ? afterCheckIn
      : false;
    return dayAfterExistingCheckIn;
  }

  makeCheckIn(e) {
    this.checkOut = '';
    this.checkIn = new Date(this.year, this.month, +e.target.innerText);
    this.render();
  }

  makeCheckOut(e) {
    this.checkOut = new Date(this.year, this.month, +e.target.innerText);
    this.render();
  }

  // -------------------end chooseRange-----------------------//
  @boundMethod
  applyRange(e) {
    e.preventDefault();
    this.examineCheckInCheckOut();
    if (this.existCheckInCheckOut) {
      this.rangeStartMonth = this.months[this.checkIn.getMonth()].slice(0, 3);
      this.rangeEndMonth = this.months[this.checkOut.getMonth()].slice(0, 3);
      const checkInInfo = `${
        this.checkIn.getDate() } ${ this.rangeStartMonth }`;
      const checkOutInfo = `${
        this.checkOut.getDate() } ${ this.rangeEndMonth }`;
      this.rangeSpanText = `${ checkInInfo } - ${ checkOutInfo }`;
    } else if (this.existCheckInOnly) {
      this.rangeStartMonth = this.months[this.checkIn.getMonth()].slice(0, 3);
      this.rangeSpanText = `${
        this.checkIn.getDate() } ${ this.rangeStartMonth }`;
    } else {
      this.rangeSpanText = '';
    }
    this.rangeSpan.value = this.rangeSpanText;
    this.calendar.classList.remove('expand__show');
  }

  // -------------------end applyStartOrEnd--------------------//
  @boundMethod
  applyStartOrEnd(e) {
    e.preventDefault();
    this.rangeStart.value = this.checkIn ? this.applyStart() : '';
    this.rangeEnd.value = this.checkOut ? this.applyEnd() : '';
    this.calendar.classList.remove('expand__show');
  }

  applyStart() {
    const monthBefore10 = parseInt(this.checkIn.getMonth() + 1, 10) < 10;
    this.rangeStartMonth = monthBefore10
      ? `0${ parseInt(this.checkIn.getMonth() + 1, 10) }`
      : parseInt(this.checkIn.getMonth() + 1, 10);
    return `${ this.checkIn.getDate() }.${
      this.rangeStartMonth
    }.${ this.checkIn.getFullYear() }`;
  }

  applyEnd() {
    const monthBefore10 = parseInt(this.checkOut.getMonth() + 1, 10) < 10;
    this.rangeEndMonth = monthBefore10
      ? `0${ parseInt(this.checkOut.getMonth() + 1, 10) }`
      : parseInt(this.checkOut.getMonth() + 1, 10);
    return `${ this.checkOut.getDate() }.${
      this.rangeEndMonth
    }.${ this.checkOut.getFullYear() }`;
  }

  // ------------------end applyStartOrEnd-------------------//
  @boundMethod
  resetInput(e) {
    e.preventDefault();
    this.checkIn = '';
    this.checkOut = '';
    if (this.rangeSpan) {
      this.rangeSpan.value = '';
    }
    if (this.rangeStart && this.rangeEnd) {
      this.rangeStart.value = '';
      this.rangeEnd.value = '';
    }
    this.calendar.classList.remove('expand__show');
    this.render();
  }

  @boundMethod
  showPrevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render();
  }

  @boundMethod
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
    this.prevMonthDays = ifFirstDaySunday ? 6 : this.dayOfWeekFirst - 1;
    this.dayOfWeekLast = new Date(this.year, thisMonth + 1, 0).getDay();

    const ifLastDaySunday = this.dayOfWeekLast === 0;
    this.nextMonthDay = ifLastDaySunday ? 6 : this.dayOfWeekLast - 1;
    this.daysLeft = ifLastDaySunday ? 0 : 7 - this.dayOfWeekLast;
    this.dateInCalendar.textContent = `${
      this.months[this.month] } ${ this.year }`;

    this.daysOfMonth.innerHTML = `${
      this.renderPrevMonth() } ${
      this.renderCurrentMonth() } ${ this.renderNextMonth() }`;
  }

  renderPrevMonth() {
    let prevDays = '';
    const prevDaysArr = Array.from(
      { length: this.prevMonthDays },
      (_, i) => this.prevMonthDays - i
    );
    prevDaysArr.forEach((p) => {
      const prevDay = this.lastDayPrev - p + 1;
      const betweenInOutOneYear = this.betweenInOutPrevYear(prevDay)
        || this.betweenInOutSameYear(prevDay);
      const betweenInOutYears = betweenInOutOneYear
        || this.betweenInOutDiffYears(prevDay);
      if (this.checkInPrevMonth(prevDay) || this.checkInPrevYear(prevDay)) {
        prevDays += `<div class = '${ this.dayCalendar }_prev_check-in'>${prevDay}</div>`;
      } else if (
        this.checkOutPrevMonth(prevDay)
        || this.checkOutPrevYear(prevDay)
      ) {
        prevDays += `<div class = '${ this.dayCalendar }_prev_check-out'>${
          prevDay }</div>`;
      } else if (this.betweenInOutPrevMonth(prevDay) || betweenInOutYears) {
        prevDays += `<div class = '${ this.dayBetween }'>${prevDay}</div>`;
      } else {
        prevDays += 
          `<div class = 'calendar__day js-${
             this.dayPrev 
            } ${ this.dayPrev }'>${ prevDay }</div>`;
      }
    });
    return prevDays;
  }

  checkInPrevMonth(prevDay) {
    if (!this.checkIn) return false;
    const checkInMonthBefore = this.checkIn.getMonth() === this.month - 1;
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkInPrevDay = this.checkIn.getDate() === prevDay;
    const checkInPrevMonth = this.checkIn
      ? checkInMonthBefore && checkInThisYear && checkInPrevDay
      : false;
    return checkInPrevMonth;
  }

  checkInPrevYear(prevDay) {
    if (!this.checkIn) return false;
    const checkInYearBefore = this.checkIn.getFullYear === this.year - 1;
    const checkInLastMonth = this.checkIn.getMonth() === 12;
    const thisMonthFirst = this.month === 1;
    const checkInPrevDay = this.checkIn.getDate() === prevDay;
    const checkInLastYearLastMonth = checkInYearBefore && checkInLastMonth;
    const checkInBeforeJanuary = thisMonthFirst && checkInPrevDay;
    const checkInPrevYear = this.checkIn
      ? checkInLastYearLastMonth && checkInBeforeJanuary
      : false;
    return checkInPrevYear;
  }

  checkOutPrevMonth(prevDay) {
    if (!this.checkOut) return false;
    const checkOutPrevMonth = this.checkOut.getMonth() === this.month - 1;
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkOutPrevDay = this.checkOut.getDate() === prevDay;
    const checkOutPrevMonthThisYear = this.checkOut
      ? checkOutPrevMonth && checkInThisYear && checkOutPrevDay
      : false;
    return checkOutPrevMonthThisYear;
  }

  checkOutPrevYear(prevDay) {
    if (!this.checkOut) return false;
    const checkOutYearBefore = this.checkOut.getFullYear() === this.year - 1;
    const checkOutMonthLast = this.checkOut.getMonth() === 12;
    const thisMonthFirst = this.month === 1;
    const checkOutDayPrev = this.checkOut.getDate() === prevDay;
    const checkOutLastYearLastMonth = checkOutYearBefore && checkOutMonthLast;
    const checkOutBeforeJanuary = thisMonthFirst && checkOutDayPrev;
    const checkOutPrevYear = this.checkOut
      ? checkOutLastYearLastMonth && checkOutBeforeJanuary
      : false;
    return checkOutPrevYear;
  }

  betweenInOutPrevMonth(prevDay) {
    if (!this.checkIn || !this.checkOut) return false;
    const sameYear = this.checkIn.getFullYear() === this.year
      && this.checkOut.getFullYear() === this.year;
    const inPrevMonth = this.checkIn.getMonth() === this.month - 1;
    const outPrevMonth = this.checkOut.getMonth() === this.month - 1;
    const inPrevDays = this.checkIn.getDate() < prevDay;
    const outNextDays = this.checkOut.getDate() > prevDay;
    const outAfterInMonth = this.checkOut.getMonth() > this.checkIn.getMonth();
    const inPrevMonthDay = inPrevMonth && inPrevDays;
    const outPrevMonthNextDay = outPrevMonth && outNextDays;
    const inOutPrevMonth = inPrevMonthDay && outPrevMonthNextDay;
    const inOutDiffMonth = inPrevMonth && inPrevDays && outAfterInMonth;
    const inOrOutPrevMonth = inOutPrevMonth || inOutDiffMonth;
    const inOrOutPrevMonthSameYear = sameYear && inOrOutPrevMonth;
    return inOrOutPrevMonthSameYear;
  }

  betweenInOutPrevYear(prevDay) {
    if (!this.checkIn || !this.checkOut) return false;
    const inPrevYear = this.checkIn.getFullYear() === this.year - 1;
    const outNextYear = this.checkOut.getFullYear() >= this.year;
    const outPrevYear = this.checkOut.getFullYear() === this.year - 1;
    const inLastMonth = this.checkIn.getMonth() === 12;
    const outLastMonth = this.checkOut.getMonth() === 12;
    const inBeforePrevDay = this.checkIn.getDate() < prevDay;
    const outAfterPrevDay = this.checkOut.getDate() > prevDay;
    const inLastMonthBeforePrev = inLastMonth && inBeforePrevDay;
    const outLastMonthAfterPrev = outLastMonth && outAfterPrevDay;
    const inPrevOutNextYear = inPrevYear && outNextYear;
    const InOutPrevYear = inPrevYear && outPrevYear;
    const betweenInPrevYear = inPrevOutNextYear && inLastMonthBeforePrev;
    const betweenInOutPrevYear = InOutPrevYear
      && inLastMonthBeforePrev
      && outLastMonthAfterPrev;
    const betweenOutPrevYear = outPrevYear && outLastMonthAfterPrev;
    const betweenInOutPrevYearFull = betweenInPrevYear
      || betweenInOutPrevYear
      || betweenOutPrevYear;
    return betweenInOutPrevYearFull;
  }

  betweenInOutSameYear() {
    if (!this.checkIn || !this.checkOut) return false;
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkOutThisYear = this.checkOut.getFullYear() === this.year;
    const sameYear = checkInThisYear && checkOutThisYear;
    const checkInPrevMonth = this.checkIn.getMonth() < this.month - 1;
    const checkOutNextMOnth = this.checkOut.getMonth() >= this.month;
    const betweenInOut = sameYear && checkInPrevMonth && checkOutNextMOnth;
    return betweenInOut;
  }

  betweenInOutDiffYears(prevDay) {
    if (!this.checkIn || !this.checkOut) return false;
    const diffYears = this.checkIn.getFullYear() < this.checkOut.getFullYear();
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkInPrevMonth = this.checkIn.getMonth() <= this.month - 1;
    const checkInPrevDay = this.checkIn.getDate() < prevDay;
    const checkInPrev = checkInThisYear && checkInPrevMonth && checkInPrevDay;
    const checkOutThisYear = this.checkOut.getFullYear() === this.year;
    const checkOutNextMonth = this.checkOut.getMonth() >= this.month;
    const checkOutNext = checkOutThisYear && checkOutNextMonth;
    const betweenInOutDiffYears = diffYears && (checkInPrev || checkOutNext);
    return betweenInOutDiffYears;
  }

  renderCurrentMonth() {
    let currDays = '';
    const lastDaysArr = Array.from(
      { length: this.lastDay },
      (_, i) => i + 1
    );
    lastDaysArr.forEach((i) => {
      if (this.checkInToday(i)) {
        currDays
          += `<div class = '${ this.dayCheckIn  }'>${ i }</div>`;
      } else if (this.checkInCurrMonth(i)) {
        currDays
          += `<div class = '${ this.dayCheckIn  }'>${ i }</div>`;
      } else if (this.checkOutCurrMonth(i)) {
        currDays
          += `<div class = '${ this.dayCalendar }_check-out'>${ i }</div>`;
      } else if (this.todayCurrMonth(i)) {
        currDays
          += `<div class = '${ this.dayCalendar }_today'>${ i }</div>`;
      } else if (this.betweenInOutCurrentMonth(i)) {
        currDays
          += `<div class = '${ this.dayCalendar }_ranged'>${ i }</div>`;
      } else {
        currDays
          += `<div class = 'calendar__day'>${ i }</div>`;
      }
    });
    return currDays;
  }

  todayCurrMonth(i) {
    const today = i === new Date().getDate()
      && this.date.getFullYear() === new Date().getFullYear()
      && this.date.getMonth() === new Date().getMonth();
    return today;
  }

  checkInToday(i) {
    const checkInToday = i === new Date().getDate()
      && this.date.getMonth() === new Date().getMonth()
      && this.checkIn
      && this.checkIn.getFullYear() === this.year
      && this.checkIn.getMonth() === this.month
      && this.checkIn.getDate() === i;
    return checkInToday;
  }

  checkInCurrMonth(i) {
    const checkInCurrMonth = this.checkIn
      ? this.year === this.checkIn.getFullYear()
        && this.month === this.checkIn.getMonth()
        && i === this.checkIn.getDate()
      : false;
    return checkInCurrMonth;
  }

  checkOutCurrMonth(i) {
    const checkOutCurrMonth = this.checkOut
      ? this.year === this.checkOut.getFullYear()
        && this.month === this.checkOut.getMonth()
        && i === this.checkOut.getDate()
      : false;
    return checkOutCurrMonth;
  }

  betweenInOutCurrentMonth(i) {
    if (!this.checkIn || !this.checkOut) return false;
    const yearCheckIn = this.checkIn.getFullYear() === this.year;
    const yearCheckOut = this.checkOut.getFullYear() === this.year;
    const checkInYear = this.checkIn.getFullYear();
    const checkOutYear = this.checkOut.getFullYear();
    const yearCheckOutAfterCheckIn = checkInYear < checkOutYear;
    const yearCheckOutSameCheckIn = yearCheckIn && yearCheckOut;
    const monthCheckIn = this.month === this.checkIn.getMonth();
    const monthAfterCheckIn = this.month > this.checkIn.getMonth();
    const monthBeforeCheckOut = this.month < this.checkOut.getMonth();
    const monthCheckOut = this.month === this.checkOut.getMonth();
    const sameMonth = monthCheckIn && monthCheckOut;
    const dayAfterCheckIn = i > this.checkIn.getDate();
    const dayBeforeCheckOut = i < this.checkOut.getDate();
    const dayBetweenCheckInCheckOut = dayAfterCheckIn && dayBeforeCheckOut;

    const checkInCheckOutSameMonth = yearCheckOutSameCheckIn
      && sameMonth
      && dayBetweenCheckInCheckOut;
    const checkInBeforeCheckOutMonth = yearCheckOutSameCheckIn
      && monthCheckIn
      && monthBeforeCheckOut
      && dayAfterCheckIn;
    const checkOutAfterCheckInMonth = yearCheckOutSameCheckIn
      && monthCheckOut
      && monthAfterCheckIn
      && dayBeforeCheckOut;
    const checkInCheckOutBetween = yearCheckOutSameCheckIn
      && monthAfterCheckIn
      && monthBeforeCheckOut;

    const thisYearRange = checkInCheckOutSameMonth
      || checkInBeforeCheckOutMonth
      || checkOutAfterCheckInMonth
      || checkInCheckOutBetween;

    const prevYearRange = yearCheckIn
      && yearCheckOutAfterCheckIn
      && ((monthCheckIn && dayAfterCheckIn) || monthAfterCheckIn);

    const nextYearRange = yearCheckOut
      && yearCheckOutAfterCheckIn
      && ((monthCheckOut && dayBeforeCheckOut) || monthBeforeCheckOut);

    const ifInRange = this.checkIn && this.checkOut
      ? thisYearRange || prevYearRange || nextYearRange
      : false;

    return ifInRange;
  }

  renderNextMonth() {
    let nextDays = '';
    const nextDaysArr = Array.from(
      { length: this.daysLeft },
      (_, i) => i + 1
    );
    nextDaysArr.forEach((n) => {
      const yearIn = this.checkIn
        ? this.checkIn.getFullYear() === this.year
        : false;
      const yearOut = this.checkOut
        ? this.checkOut.getFullYear() === this.year
        : false;
      const optionsInOutYear = {
        n, yearIn, yearOut
      };
      const inOutCurrYear = this.betweenInOutCurrYear(optionsInOutYear);
      const inOutNextYear = this.betweenInOutNextYear(yearIn, yearOut);
      const checkOutNextMonthOrYear = this.checkOutNextMonth(n, yearOut)
        || this.checkOutNextYear(n);
      const betweenInOutAYear = inOutCurrYear || inOutNextYear;

      if (this.checkInNextMonth(n, yearIn) || this.checkInNextYear(n)) {
        nextDays += `<div class = '${ this.dayCalendar }_next_check-in'>${
          n }</div>`;
      } else if (checkOutNextMonthOrYear) {
        nextDays += `<div class = '${ this.dayCalendar }_next_check-out'>${
          n }</div>`;
      } else if (betweenInOutAYear) {
        nextDays += `<div class = '${ this.dayBetween }'>${
          n }</div>`;
      } else {
        nextDays += `<div class = 'calendar__day js-${
           this.dayNext } ${ this.dayNext }'>${ n }</div>`;
      }
    });
    return nextDays;
  }

  checkInNextMonth(n, yearCheckIn) {
    const checkInNextMonth = yearCheckIn
      ? this.checkIn.getMonth() === this.month + 1
        && this.checkIn.getDate() === n
      : false;
    return checkInNextMonth;
  }

  checkInNextYear(n) {
    const yearNextCheckIn = this.checkIn
      ? this.checkIn.getFullYear() > this.year
      : false;
    const checkInNextYear = yearNextCheckIn
      ? this.checkIn.getMonth() === 1
        && this.month === 12
        && this.checkIn.getDate() === n
      : false;
    return checkInNextYear;
  }

  checkOutNextMonth(n, yearCheckOut) {
    const checkOutNextMonth = yearCheckOut
      ? this.checkOut.getMonth() === this.month + 1
        && this.checkOut.getDate() === n
      : false;
    return checkOutNextMonth;
  }

  checkOutNextYear(n) {
    const yearNextCheckOut = this.checkOut
      ? this.checkOut.getFullYear() > this.year
      : false;

    const checkOutNextYear = yearNextCheckOut
      ? this.checkOut.getMonth() === 1
        && this.month === 12
        && this.checkOut.getDate() === n
      : false;
    return checkOutNextYear;
  }

  betweenInOutCurrYear(options) {
    const { n, yearIn, yearOut } = options;
    const betweenInOutCurrYear = yearIn && yearOut
      ? (this.checkOut.getMonth() > this.month + 1
            && this.checkIn.getMonth() <= this.month)
          || (this.checkOut.getMonth() === this.month + 1
            && this.checkOut.getDate() > n)
      : false;
    return betweenInOutCurrYear;
  }

  betweenInOutNextYear(yearCheckIn, yearCheckOut) {
    const yearThisCheckInNextCheckOut = this.checkIn && this.checkOut
      ? this.checkIn.getFullYear() < this.checkOut.getFullYear()
      : false;
    const betweenInOutNextYear = yearThisCheckInNextCheckOut
      && ((this.month >= this.checkIn.getMonth() && yearCheckIn)
        || (this.month < this.checkOut.getMonth() && yearCheckOut));

    return betweenInOutNextYear;
  }

  // ---------------------end render-----------------------//
}

export default Calendar;
