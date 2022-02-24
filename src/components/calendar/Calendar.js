import { boundMethod } from 'autobind-decorator';

class Calendar {
  constructor(item) {
    this.date = new Date();
    this.init(item);
  }

  init(item) {
    this._createClasses();
    this._createChildren(item);
    this._setCheckInCheckOut();
    this._render();
    this._addListeners();
  }

  @boundMethod
  resetInput() {
    this.checkIn = '';
    this.checkOut = '';
    if (this.rangeSpan) {
      this.rangeSpan.value = '';
    }
    if (this.rangeStart && this.rangeEnd) {
      this.rangeStart.value = '';
      this.rangeEnd.value = '';
    }
    this.calendar.classList.remove(this.classExpandShow);
    this._render();
  }

  _setCheckInCheckOut() {
    if (this.rangeSpan) {
      const rangeData = this.rangeSpan.value.split(' - ');

      const checkInData = rangeData[0].split(' ');
      const checkInDay = checkInData[0];
      const checkInMonthName = checkInData[1];
      const checkInMonth = this.months.indexOf(checkInMonthName);
      this.checkIn = new Date(
        new Date().getFullYear(),
        checkInMonth,
        checkInDay
      );

      const checkOutData = rangeData[1].split(' ');
      const checkOutDay = checkOutData[0];
      const checkOutMonthName = checkOutData[1];
      const checkOutMonth = this.months.indexOf(checkOutMonthName);
      this.checkOut = new Date(
        new Date().getFullYear(),
        checkOutMonth,
        checkOutDay
      );
    }
    if (this.rangeStart && this.rangeEnd) {
      const checkInData = this.rangeStart.value.split('.');
      this.checkIn = new Date(checkInData[2], checkInData[1], checkInData[0]);
      const checkOutData = this.rangeEnd.value.split('.');
      this.checkOut = new Date(
        checkOutData[2],
        checkOutData[1],
        checkOutData[0]
      );
    }
  }

  _createClasses() {
    this.classCalendarDay = 'calendar__day';
    this.classDayPrev = 'calendar__day_prev';
    this.classDayNext = 'calendar__day_next';
    this.classDayBetween = 'calendar__day calendar__day_between';
    this.classDayCheckIn = 'calendar__day calendar__day_check-in';
    this.classDayCalendar = 'calendar__day calendar__day';
    this.classButtonSubmit = 'calendar__button_submit';
    this.classButtonReset = 'calendar__button_reset';
    this.classDateRangeCalendar = 'date-range__calendar';
    this.classDateRange = 'date-range';
    this.classCalendarDays = 'calendar__days';
    this.classCalendarMonth = 'calendar__month';
    this.classControlNext = 'calendar__control_next';
    this.classControlPrev = 'calendar__control_prev';
    this.classExpandShow = 'expand__show';
  }

  _createChildren(item) {
    this.calendarContainer = item;
    this.months = [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек'
    ];

    this.buttonPrev = this.calendarContainer.querySelector(
      `.js-${ this.classControlPrev }`
    );
    this.buttonNext = this.calendarContainer.querySelector(
      `.js-${ this.classControlNext }`
    );
    this.dateInCalendar = this.calendarContainer.querySelector(
      `.js-${ this.classCalendarMonth }`
    );
    this.daysOfMonth = this.calendarContainer.querySelector(
      `.js-${ this.classCalendarDays }`
    );

    this.mainContainer = this.calendarContainer.closest(
      `.js-${ this.classDateRange }`
    );
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
      `.js-${ this.classDateRangeCalendar }`
    );

    this.btnApply = this.mainContainer.querySelector(
      `.js-${ this.classButtonSubmit }`
    );
    this.btnReset = this.mainContainer.querySelector(
      `.js-${ this.classButtonReset }`
    );
  }

  _addListeners() {
    this.buttonPrev.addEventListener('pointerup', this._showPrevMonth);
    this.buttonNext.addEventListener('pointerup', this._showNextMonth);
    this.daysOfMonth.addEventListener('pointerup', this._chooseRange);
    if (this.calendar) {
      this.btnReset.addEventListener('pointerup', this.resetInput);
    }
    if (this.rangeSpan) {
      this.btnApply.addEventListener('pointerup', this._applyRange);
    }
    if (this.rangeStart && this.rangeEnd) {
      this.btnApply.addEventListener('pointerup', this._applyStartOrEnd);
    }
  }

  _examineCheckInCheckOut() {
    this.existCheckInCheckOut = this.checkIn && this.checkOut;
    this.existCheckInOnly = this.checkIn && !this.checkOut;
  }

  // ---------------start chooseRange-------------------//
  @boundMethod
  _chooseRange(e) {
    const hasPrevDays = e.target.classList.contains(
      `js-${ this.classDayPrev }`
    );
    const hasNextDays = e.target.classList.contains(
      `js-${ this.classDayNext }`
    );
    const noOtherDays = !hasPrevDays && !hasNextDays;
    const hasDays = e.target.classList.contains(
      `.js-${ this.classCalendarDays }`
    );
    const noDays = noOtherDays && !hasDays;
    const chosenDay = new Date(this.year, this.month, +e.target.innerText);
    const afterToday = chosenDay > new Date();
    this._examineCheckInCheckOut();
    if (noDays && afterToday) {
      if (this.existCheckInCheckOut) this._makeCheckIn(e);
      else if (this.existCheckInOnly) {
        const [dayBeforeCheckIn, dayAfterCheckIn] = this._getCheckInData(e);
        if (dayBeforeCheckIn) this._makeCheckIn(e);
        else if (dayAfterCheckIn) this._makeCheckOut(e);
      } else if (!this.checkIn && !this.checkOut) this._makeCheckIn(e);
    }
  }

  _getCheckInData(e) {
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
    const dayBeforeExistingCheckIn = this._chooseBeforeCheckIn(checkInBefore);
    const dayAfterExistingCheckIn = this._chooseAfterCheckIn(checkInAfter);
    return [dayBeforeExistingCheckIn, dayAfterExistingCheckIn];
  }

  _chooseBeforeCheckIn(options) {
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

  _chooseAfterCheckIn(options) {
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

  _makeCheckIn(e) {
    this.checkOut = '';
    this.checkIn = new Date(this.year, this.month, +e.target.innerText);
    this._render();
  }

  _makeCheckOut(e) {
    this.checkOut = new Date(this.year, this.month, +e.target.innerText);
    this._render();
  }

  // -------------------end chooseRange-----------------------//
  @boundMethod
  _applyRange() {
    this._examineCheckInCheckOut();
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
    this.calendar.classList.remove(this.classExpandShow);
  }

  // -------------------start applyStartOrEnd--------------------//
  @boundMethod
  _applyStartOrEnd() {
    this.rangeStart.value = this.checkIn ? this._applyStart() : '';
    this.rangeEnd.value = this.checkOut ? this._applyEnd() : '';
    this.calendar.classList.remove(this.classExpandShow);
  }

  _applyStart() {
    const monthBefore10 = parseInt(this.checkIn.getMonth() + 1, 10) < 10;
    this.rangeStartMonth = monthBefore10
      ? `0${ parseInt(this.checkIn.getMonth() + 1, 10) }`
      : parseInt(this.checkIn.getMonth() + 1, 10);
    return `${ this.checkIn.getDate() }.${
      this.rangeStartMonth
    }.${ this.checkIn.getFullYear() }`;
  }

  _applyEnd() {
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
  _showPrevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this._render();
  }

  @boundMethod
  _showNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this._render();
  }

  // -------------------start _render---------------------//
  _render() {
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
    this.dateInCalendar.textContent = `${ this.months[this.month] } ${ this.year }`;

    this.daysOfMonth.innerHTML = `${
      this._renderPrevMonth() } ${
      this._renderCurrentMonth() } ${
      this._renderNextMonth() }`;
  }

  _renderPrevMonth() {
    let prevDays = '';
    const prevDaysArr = Array.from(
      { length: this.prevMonthDays },
      (_, i) => this.prevMonthDays - i
    );
    prevDaysArr.forEach((p) => {
      const prevDay = this.lastDayPrev - p + 1;
      const betweenInOutOneYear = this._betweenInOutPrevYear(prevDay)
        || this._betweenInOutSameYear(prevDay);
      const betweenInOutYears = betweenInOutOneYear
        || this._betweenInOutDiffYears(prevDay);
      if (this._checkInPrevMonth(prevDay) || this._checkInPrevYear(prevDay)) {
        prevDays += `<div class = '${
          this.classDayCalendar }_prev_check-in'>${ prevDay }</div>`;
      } else if (
        this._checkOutPrevMonth(prevDay)
        || this._checkOutPrevYear(prevDay)
      ) {
        prevDays += `<div class = '${
          this.classDayCalendar }_prev_check-out'>${ prevDay }</div>`;
      } else if (this._betweenInOutPrevMonth(prevDay) || betweenInOutYears) {
        prevDays += `<div class = '${
          this.classDayBetween }'>${ prevDay }</div>`;
      } else {
        prevDays += `<div class = '${
          this.classCalendarDay
        } js-${ this.classDayPrev } ${
          this.classDayPrev }'>${ prevDay }</div>`;
      }
    });
    return prevDays;
  }

  _checkInPrevMonth(prevDay) {
    if (!this.checkIn) return false;
    const checkInMonthBefore = this.checkIn.getMonth() === this.month - 1;
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkInPrevDay = this.checkIn.getDate() === prevDay;
    const checkInPrevMonth = this.checkIn
      ? checkInMonthBefore && checkInThisYear && checkInPrevDay
      : false;
    return checkInPrevMonth;
  }

  _checkInPrevYear(prevDay) {
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

  _checkOutPrevMonth(prevDay) {
    if (!this.checkIn || !this.checkOut) return false;
    const checkOutPrevMonth = this.checkOut.getMonth() === this.month - 1;
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkOutPrevDay = this.checkOut.getDate() === prevDay;
    const checkOutPrevMonthThisYear = this.checkOut
      ? checkOutPrevMonth && checkInThisYear && checkOutPrevDay
      : false;
    return checkOutPrevMonthThisYear;
  }

  _checkOutPrevYear(prevDay) {
    if (!this.checkIn || !this.checkOut) return false;
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

  _betweenInOutPrevMonth(prevDay) {
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

  _betweenInOutPrevYear(prevDay) {
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

  _betweenInOutSameYear() {
    if (!this.checkIn || !this.checkOut) return false;
    const checkInThisYear = this.checkIn.getFullYear() === this.year;
    const checkOutThisYear = this.checkOut.getFullYear() === this.year;
    const sameYear = checkInThisYear && checkOutThisYear;
    const checkInPrevMonth = this.checkIn.getMonth() < this.month - 1;
    const checkOutNextMOnth = this.checkOut.getMonth() >= this.month;
    const betweenInOut = sameYear && checkInPrevMonth && checkOutNextMOnth;
    return betweenInOut;
  }

  _betweenInOutDiffYears(prevDay) {
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

  _renderCurrentMonth() {
    let currDays = '';
    const lastDaysArr = Array.from({ length: this.lastDay }, (_, i) => i + 1);
    lastDaysArr.forEach((i) => {
      if (this._checkInToday(i)) {
        currDays += `<div class = '${ this.classDayCheckIn }'>${ i }</div>`;
      } else if (this._checkInCurrMonth(i)) {
        currDays += `<div class = '${ this.classDayCheckIn }'>${ i }</div>`;
      } else if (this._checkOutCurrMonth(i)) {
        currDays += `<div class = '${
          this.classDayCalendar }_check-out'>${ i }</div>`;
      } else if (this._todayCurrMonth(i)) {
        currDays += `<div class = '${
          this.classDayCalendar }_today'>${ i }</div>`;
      } else if (this._betweenInOutCurrentMonth(i)) {
        currDays += `<div class = '${
          this.classDayCalendar }_ranged'>${ i }</div>`;
      } else {
        currDays += `<div class = '${ this.classCalendarDay }'>${ i }</div>`;
      }
    });
    return currDays;
  }

  _todayCurrMonth(i) {
    const thisIfCurrYear = this.date.getFullYear() === new Date().getFullYear();
    const thisMonthCurrMonth = this.date.getMonth() === new Date().getMonth();
    const thisDayI = i === new Date().getDate();
    const today = thisDayI && thisIfCurrYear && thisMonthCurrMonth;
    return today;
  }

  _checkInToday(i) {
    if (!this.checkIn) return false;
    const thisYearCheckIn = this.checkIn.getFullYear() === this.year;
    const thisMonthCheckIn = this.checkIn.getMonth() === this.month;
    const checkInDayI = this.checkIn.getDate() === i;
    const thisDayCheckIn = thisYearCheckIn && thisMonthCheckIn && checkInDayI;
    const thisMonthCurrMonth = this.date.getMonth() === new Date().getMonth();
    const thisDayIsI = i === new Date().getDate();
    const checkInToday = thisDayIsI && thisMonthCurrMonth && thisDayCheckIn;
    return checkInToday;
  }

  _checkInCurrMonth(i) {
    if (!this.checkIn) return false;
    const thisYearCheckIn = this.year === this.checkIn.getFullYear();
    const thisMonthCheckIn = this.month === this.checkIn.getMonth();
    const checkInDayI = i === this.checkIn.getDate();
    const checkInCurrMonth = this.checkIn
      ? thisYearCheckIn && thisMonthCheckIn && checkInDayI
      : false;
    return checkInCurrMonth;
  }

  _checkOutCurrMonth(i) {
    if (!this.checkOut) return false;
    const thisYearCheckout = this.year === this.checkOut.getFullYear();
    const thisMonthCheckout = this.month === this.checkOut.getMonth();
    const dayCheckOutI = i === this.checkOut.getDate();
    const checkOutCurrMonth = this.checkOut
      ? thisYearCheckout && thisMonthCheckout && dayCheckOutI
      : false;
    return checkOutCurrMonth;
  }

  _betweenInOutCurrentMonth(i) {
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

  _renderNextMonth() {
    let nextDays = '';
    const nextDaysArr = Array.from({ length: this.daysLeft }, (_, i) => i + 1);
    nextDaysArr.forEach((n) => {
      const yearIn = this.checkIn
        ? this.checkIn.getFullYear() === this.year
        : false;
      const yearOut = this.checkOut
        ? this.checkOut.getFullYear() === this.year
        : false;
      const optionsInOutYear = {
        n,
        yearIn,
        yearOut
      };
      const inOutCurrYear = this._betweenInOutCurrYear(optionsInOutYear);
      const inOutNextYear = this._betweenInOutNextYear(yearIn, yearOut);
      const checkOutNextMonthOrYear = this._checkOutNextMonth(n, yearOut)
        || this._checkOutNextYear(n);
      const betweenInOutAYear = inOutCurrYear || inOutNextYear;

      if (this._checkInNextMonth(n, yearIn) || this._checkInNextYear(n)) {
        nextDays += `<div class = '${
          this.classDayCalendar }_next_check-in'>${ n }</div>`;
      } else if (checkOutNextMonthOrYear) {
        nextDays += `<div class = '${
          this.classDayCalendar }_next_check-out'>${ n }</div>`;
      } else if (betweenInOutAYear) {
        nextDays += `<div class = '${ this.classDayBetween }'>${ n }</div>`;
      } else {
        nextDays += `<div class = '${
          this.classCalendarDay
        } js-${ this.classDayNext
        } ${ this.classDayNext }'>${ n }</div>`;
      }
    });
    return nextDays;
  }

  _checkInNextMonth(n, yearCheckIn) {
    if (!this.checkIn) return false;
    const checkInIsNextMonth = this.checkIn.getMonth() === this.month + 1;
    const checkInNDay = this.checkIn.getDate() === n;
    const checkInNextMonth = yearCheckIn
      ? checkInIsNextMonth && checkInNDay
      : false;
    return checkInNextMonth;
  }

  _checkInNextYear(n) {
    if (!this.checkIn) return false;
    const checkInAfterThisYear = this.checkIn.getFullYear() > this.year;
    const checkInFirstMonth = this.checkIn.getMonth() === 1;
    const checkInNDay = this.checkIn.getDate() === n;
    const thisMonthLast = this.month === 12;
    const monthLastCheckInFirst = checkInFirstMonth && thisMonthLast;
    const checkInNDayLastMonthPrevYear = monthLastCheckInFirst && checkInNDay;
    const yearNextCheckIn = this.checkIn ? checkInAfterThisYear : false;
    const checkInNextYear = yearNextCheckIn
      ? checkInNDayLastMonthPrevYear
      : false;
    return checkInNextYear;
  }

  _checkOutNextMonth(n, yearCheckOut) {
    const checkInCheckOut = this.checkIn && this.checkOut;
    if (!checkInCheckOut) return false;
    const checkOutIsNextMonth = this.checkOut.getMonth() === this.month + 1;
    const checkOutIsNDay = this.checkOut.getDate() === n;
    const checkOutNextMonth = yearCheckOut
      ? checkOutIsNextMonth && checkOutIsNDay
      : false;
    return checkOutNextMonth;
  }

  _checkOutNextYear(n) {
    const checkInCheckOut = this.checkIn && this.checkOut;
    if (!checkInCheckOut) return false;
    const checkOutYearNext = this.checkOut.getFullYear() > this.year;
    const yearNextCheckOut = this.checkOut ? checkOutYearNext : false;

    const checkOutMonthFirst = this.checkOut.getMonth() === 1;
    const thisMonthLast = this.month === 12;
    const checkOutNDay = this.checkOut.getDate() === n;
    const lastMonthCheckOutFirst = checkOutMonthFirst && thisMonthLast;
    const checkOutNDayLastMonthPrevYear = lastMonthCheckOutFirst
      && checkOutNDay;
    const checkOutNextYear = yearNextCheckOut
      ? checkOutNDayLastMonthPrevYear
      : false;
    return checkOutNextYear;
  }

  _betweenInOutCurrYear(options) {
    const checkInCheckOut = this.checkIn && this.checkOut;
    if (!checkInCheckOut) return false;
    const { n, yearIn, yearOut } = options;
    const checkOutMonthNext = this.checkOut.getMonth() > this.month + 1;
    const checkInMonthPrev = this.checkIn.getMonth() <= this.month;
    const betweenCheckInCheckOutMonths = checkOutMonthNext && checkInMonthPrev;
    const checkOutNextMonth = this.checkOut.getMonth() === this.month + 1;
    const checkOutAfterNDay = this.checkOut.getDate() > n;
    const checkOutMonthNextDateAfterN = checkOutNextMonth && checkOutAfterNDay;
    const betweenInOutCurrYear = yearIn && yearOut
      ? betweenCheckInCheckOutMonths || checkOutMonthNextDateAfterN
      : false;
    return betweenInOutCurrYear;
  }

  _betweenInOutNextYear(yearCheckIn, yearCheckOut) {
    const checkInCheckOut = this.checkIn && this.checkOut;
    if (!checkInCheckOut) return false;
    const checkInYear = this.checkIn.getFullYear();
    const checkOutYear = this.checkOut.getFullYear();
    const checkInThisYearCheckOutNext = checkInYear < checkOutYear;
    const checkInMonthPrev = this.month >= this.checkIn.getMonth();
    const checkOutMonthNext = this.month < this.checkOut.getMonth();
    const checkInMonthPrevThisYear = checkInMonthPrev && yearCheckIn;
    const checkoutMonthNextThisYear = checkOutMonthNext && yearCheckOut;
    const yearThisCheckInNextCheckOut = this.checkIn && this.checkOut
      ? checkInThisYearCheckOutNext
      : false;
    const betweenInOutNextYear = yearThisCheckInNextCheckOut
      && (checkInMonthPrevThisYear || checkoutMonthNextThisYear);

    return betweenInOutNextYear;
  }

  // ---------------------end _render-----------------------//
}

export default Calendar;
