export default class Calendar {
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

    this.btnApply = this.mainContainer.querySelector('.js-calendar__button-submit');
    this.btnReset = this.mainContainer.querySelector('.js-calendar__button-reset');
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
    if (noDays && afterToday) {
      if (this.existCheckinCheckout) this.makeCheckin(e);
      else if (this.existCheckinOnly) {
        let [dayBeforeExistingCheckin, dayAfterExistingCheckin] = this.getCheckinData(e);
        if (dayBeforeExistingCheckin) this.makeCheckin(e);
        else if (dayAfterExistingCheckin) this.makeCheckout(e);
      }
      else if (!this.checkin && !this.checkout) this.makeCheckin(e);
    }
  }

  getCheckinData(e) {
    const yearCheckin = parseInt(this.year) === parseInt(this.checkin.getFullYear());
    const yearBeforeCheckin = parseInt(this.year) < parseInt(this.checkin.getFullYear());
    const yearAfterCheckin = parseInt(this.year) > parseInt(this.checkin.getFullYear());
    const monthCheckin = parseInt(this.month) === parseInt(this.checkin.getMonth());
    const monthBeforeCheckin = parseInt(this.month) < parseInt(this.checkin.getMonth());
    const monthAfterCheckin = parseInt(this.month) > parseInt(this.checkin.getMonth());   
    const dayBeforeCheckin = parseInt(e.target.innerText) < parseInt(this.checkin.getDate());
    const dayAfterCheckin = parseInt(e.target.innerText) > parseInt(this.checkin.getDate());
    const dayBeforeExistingCheckin = this.chooseBeforeCheckin(yearBeforeCheckin, yearCheckin, monthBeforeCheckin, monthCheckin, dayBeforeCheckin);
    const dayAfterExistingCheckin = this.chooseAfterCheckin(yearAfterCheckin, yearCheckin, monthAfterCheckin, monthCheckin, dayAfterCheckin);
    return [dayBeforeExistingCheckin, dayAfterExistingCheckin];
  }

  chooseBeforeCheckin(yearBeforeCheckin, yearCheckin, monthBeforeCheckin, monthCheckin, dayBeforeCheckin) {
    const dayBeforeExistingCheckin = (this.existCheckinOnly)
      ? (yearBeforeCheckin
        || (yearCheckin && monthBeforeCheckin)
        || (yearCheckin && monthCheckin && dayBeforeCheckin))
      : false;
    return dayBeforeExistingCheckin;
  }

  chooseAfterCheckin(yearAfterCheckin, yearCheckin, monthAfterCheckin, monthCheckin, dayAfterCheckin) {
    const dayAfterExistingCheckin = this.existCheckinOnly
    ? (yearAfterCheckin
      || (yearCheckin && monthAfterCheckin)
      || (yearCheckin && monthCheckin && dayAfterCheckin))
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

  // ----------------------------end chooseRange--------------------------------//

  applyRange(e) {
    e.preventDefault();
    this.examineCheckinCheckout();
    if (this.existCheckinCheckout) {
      this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanEndMonth = this.months[this.checkout.getMonth()].slice(0, 3);
      this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeSpanStartMonth} - ${this.checkout.getDate()} ${this.rangeSpanEndMonth}`;
    } else if (this.existCheckinOnly) {
      this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeSpanStartMonth}`;
    } else {
      this.rangeSpanText = '';
    }
    this.rangeSpan.value = this.rangeSpanText;
    this.calendar.classList.remove('js-expand__show');
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
    this.calendar.classList.remove('js-expand__show');
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
      const prevDay = this.lastDayPrev - p + 1;
      if (this.checkinPrevMonth(prevDay) || this.checkinPrevYear(prevDay)) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_prev_checkin ">${prevDay}</div>`;
      else if (this.checkoutPrevMonth(prevDay) || this.checkoutPrevYear(prevDay)) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_prev_checkedout ">${prevDay}</div>`;
      else if (this.betweenInOutPrevMonth(prevDay) 
        || this.betweenInOutPrevYear(prevDay) 
        || this.betweenInOutSameYear(prevDay)
        || this.betweenInOutDiffYears(prevDay)) 
        prevDays += `<div class="weeks__day weeks__day_prev weeks__day_ranged_between">${prevDay}</div>`;
      else prevDays += `<div class="weeks__day weeks__day_prev">${prevDay}</div>`;
    }
    return prevDays;
  }

  checkinPrevMonth(prevDay) {
    const checkinPrevMonth = (this.checkin)
      ? (this.checkin.getMonth() === (this.month - 1)
        && this.checkin.getFullYear() === this.year
        && this.checkin.getDate() === (prevDay))
      : false;
    return checkinPrevMonth;
  }

  checkinPrevYear(prevDay) {
    const checkinPrevYear = (this.checkin)
      ? (this.checkin.getFullYear === this.year - 1)
        && this.checkin.getMonth() === 12
        && this.month === 1
        && this.checkin.getDate() === prevDay
      : false;
    return checkinPrevYear;
  }

  checkoutPrevMonth(prevDay) {
    const checkoutPrevMonth = (this.checkout)
      ? (this.checkout.getMonth() === (this.month - 1)
        && this.checkin.getFullYear() === this.year
        && this.checkout.getDate() === (prevDay))
      : false;
    return checkoutPrevMonth;
  }

  checkoutPrevYear(prevDay) {
    const checkoutPrevYear = (this.checkout)
      ? (this.checkout.getFullYear() === this.year - 1)
        && this.checkout.getMonth() === 12
        && this.month === 1
        && this.checkout.getDate() === prevDay
      : false;
    return checkoutPrevYear;
  }

  betweenInOutPrevMonth(prevDay) {
    if (!this.checkin || !this.checkout) return;
    const sameYear = this.checkin.getFullYear() === this.year 
      && this.checkout.getFullYear() === this.year;
    const checkinOrOutPrevMonth = sameYear
      && (
        (this.checkin.getMonth() === this.month - 1
          && this.checkout.getMonth() === this.month - 1
          && this.checkin.getDate() < prevDay
          && this.checkout.getDate() > prevDay)
        || (this.checkin.getMonth() === this.month - 1
          && this.checkin.getDate() < prevDay
          )
        )
    return checkinOrOutPrevMonth;
  }

  betweenInOutPrevYear(prevDay) {
    if (!this.checkin || !this.checkout) return;
    const checkinPrevYear =  this.checkin.getFullYear() === this.year - 1
      && this.checkout.getFullYear() >= this.year;
    const checkInOutPrevYear = this.checkin.getFullYear() === this.year - 1 
      && this.checkout.getFullYear() === this.year - 1;  
    const checkoutPrevYear = this.checkout.getFullYear() === this.year - 1;
    const betweenCheckinPrevYear = checkinPrevYear
      && this.checkin.getMonth() === 12
      && this.checkin.getDate() < prevDay;
    const betweenCheckInOutPrevYear = checkInOutPrevYear
      && (this.checkin.getMonth() === 12
        && this.checkin.getDate() < prevDay)
      && (thic.checkout.getMonth() === 12
        && this.checkout.getDate() > prevDay);
    const betweenCheckoutPrevYeaer = checkoutPrevYear
      && (this.checkout.getMonth() === 12
        && this.checkout.getDate() > prevDay);
    const betweenInOutPrevYear = betweenCheckinPrevYear
      || betweenCheckInOutPrevYear
      || betweenCheckoutPrevYeaer;
    return betweenInOutPrevYear;
  }

  betweenInOutSameYear(prevDay) {
    if (!this.checkin || !this.checkout) return;
    const sameYear = this.checkin.getFullYear() === this.year 
      && this.checkout.getFullYear() === this.year;
    const betweenInOutSameYear = sameYear 
      && (this.checkin.getMonth() < this.month - 1
        && this.checkout.getMonth() >= this.month
      );
    return betweenInOutSameYear;
  }

  betweenInOutDiffYears(prevDay) {
    if (!this.checkin || !this.checkout) return;
    const diffYears = this.checkin.getFullYear() < this.checkout.getFullYear();
    const betweenInOutDiffYears = diffYears
      && ((this.checkin.getFullYear() === this.year
          && this.checkin.getMonth() <= this.month - 1
          && this.checkin.getDate() < prevDay)
        || (this.checkout.getFullYear() === this.year
          && this.checkout.getMonth() >= this.month)
      )
    return betweenInOutDiffYears;
  }

  

  renderCurrentMonth() {
    let currDays = '';
    for (let i = 1; i <= this.lastDay; i += 1) {
      if (this.checkinToday(i)) currDays += `<div class="weeks__day weeks__day_today weeks__day_checkin">${i}</div>`;
      else if (this.checkinCurrMonth(i)) currDays += `<div class="weeks__day weeks__day_checkin">${i}</div>`;
      else if (this.checkoutCurrMonth(i)) currDays += `<div class="weeks__day weeks__day_checkedout">${i}</div>`;
      else if (this.todayCurrMonth(i)) currDays += `<div class="weeks__day weeks__day_today">${i}</div>`;
      else if (this.betweenInOutCurrentMonth(i)) currDays += `<div class="weeks__day weeks__day_ranged">${i}</div>`;
      else currDays += `<div class="weeks__day">${i}</div>`;
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

    const thisYearRange = 
      yearCheckoutSameCheckin && sameMonth && dayBetweenCheckinCheckout
      || (yearCheckoutSameCheckin && monthCheckin && monthBeforeCheckout && dayAfterCheckin)
      || (yearCheckoutSameCheckin && monthCheckout && monthAfterCheckin && dayBeforeCheckout)
      || (yearCheckoutSameCheckin && monthAfterCheckin && monthBeforeCheckout);

    const prevYearRange = (yearCheckin && yearCheckoutAfterCheckin)
      && (monthCheckin && dayAfterCheckin
        || monthAfterCheckin);
    
    const nextYearRange = (yearCheckout && yearCheckoutAfterCheckin)
      && (monthCheckout && dayBeforeCheckout
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
     
      if (this.checkinNextMonth(n, yearCheckin) || this.checkinNextYear(n)) nextDays += `<div class="weeks__day weeks__day_next weeks__day_next_checkin">${n}</div>`;
      else if (this.checkoutNextMonth(n, yearCheckout) || this.checkoutNextYear(n)) nextDays += `<div class="weeks__day weeks__day_next weeks__day_next_checkedout">${n}</div>`;
      else if (this.betweenInOutCurrentYear(n, yearCheckin, yearCheckout) || this.betweenInOutNextYear(yearCheckin, yearCheckout)) nextDays += `<div class="weeks__day weeks__day_next weeks__day_ranged_between">${n}</div>`;
      else nextDays += `<div class="weeks__day weeks__day_next">${n}</div>`;
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
  
  // ----------------------------end render--------------------------------//
}
