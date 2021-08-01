export default class Calendar {
  constructor(calendarId) {
    this.calendarContainer = document.getElementById(calendarId)
    this.date = new Date()
    this.months = ["Январь", "Февраль", "Март", "Апрель",
      "Май", "Июнь", "Июль", "Август",
      "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    this.buttonPrev = this.calendarContainer.querySelector(".date__prev");
    this.buttonNext = this.calendarContainer.querySelector(".date__next");
    this.dateInCalendar = this.calendarContainer.querySelector(".date__month");
    this.daysOfMonth = this.calendarContainer.querySelector(".weeks__days");
    this.init()
  }

  init() {
    this.render()
    this.createChildren()
    this.enableHandlers()
    this.addEventListener()
    return this;
  }

  createChildren() {
    if (this.calendarContainer.closest(".date-range__selector")) {
      this.mainContainer = this.calendarContainer.closest(".date-range__selector");
    } else {
      this.mainContainer = this.calendarContainer;
    }

    this.btnApply = this.mainContainer.querySelector(".calendar__buttons_submit")
    this.btnReset = this.mainContainer.querySelector(".calendar__buttons_reset")

    if (this.mainContainer.querySelector("input[name=checkin-checkout]")) {
      this.rangeSpan = this.mainContainer.querySelector("input[name=checkin-checkout]")
    }
    if (this.mainContainer.querySelector("input[name=checkin]")) {
      this.rangeStart = this.mainContainer.querySelector("input[name=checkin]")
    }
    if (this.mainContainer.querySelector("input[name=checkout]")) {
      this.rangeEnd = this.mainContainer.querySelector("input[name=checkout]")
    }

    if (this.mainContainer.querySelector(".dropdown__calendar ")) {
      this.calendar = this.mainContainer.querySelector(".dropdown__calendar ");
    }
    this.checkin;
    this.checkout;

    this.existCheckinCheckout = this.checkin && this.checkout;
    this.existCheckinOnly = this.checkin && !this.checkout;
    return this;
  }

  enableHandlers() {
    this.showNextMonthHandler = this.showNextMonth.bind(this);
    this.showPrevMonthHandler = this.showPrevMonth.bind(this);
    this.chooseRangeHandler = this.chooseRange.bind(this);
    this.applyRangeHandler = this.applyRange.bind(this);
    this.applyStartOrEndHandler = this.applyStartOrEnd.bind(this);
    this.resetInputHandler = this.resetInput.bind(this);
    return this;
  }

  addEventListener() {
    this.buttonPrev.addEventListener("click", this.showPrevMonthHandler);
    this.buttonNext.addEventListener("click", this.showNextMonthHandler);
    this.daysOfMonth.addEventListener("click", this.chooseRangeHandler);
    if (this.calendar) {
      this.btnReset.addEventListener("click", this.resetInputHandler);
    }
    if (this.rangeSpan) {
      this.btnApply.addEventListener("click", this.applyRangeHandler);
    }
    if (this.rangeStart && this.rangeEnd) {
      this.btnApply.addEventListener("click", this.applyStartOrEndHandler)
    }
    return this;
  }

  //----------------------------start chooseRange--------------------------------//

  chooseRange(event) {
    let hasPrevDays = event.target.classList.contains("weeks__day_prev");
    let hasNextDays = event.target.classList.contains("weeks__day_next");
    let hasDays = event.target.classList.contains(".weeks__days");
    let afterToday = (new Date(this.year, this.month, +event.target.innerText) > new Date());
    this.examineCheckinCheckout();
    let dayBeforeExistingCheckin = (this.existCheckinOnly)
          ? (
              (+this.month < +this.checkin.getMonth()) 
            ||  
              (+this.month === +this.checkin.getMonth() &&
              +event.target.innerText < +this.checkin.getDate())  )
          : false;

    let dayAfterExistingCheckin = this.existCheckinOnly
            ? ( +this.month > +this.checkin.getMonth()
                ||
                (+this.month === +this.checkin.getMonth() &&
                +event.target.innerText > +this.checkin.getDate())
              )
            : false;
    if (!hasPrevDays && !hasNextDays && !hasDays && afterToday) {
      if (this.existCheckinCheckout) this.makeCheckin();
      else if (dayBeforeExistingCheckin) this.makeCheckin();
      else if (dayAfterExistingCheckin) this.makeCheckout();
      else if (!this.checkin && !this.checkout) this.makeCheckin();
    }
    return this;
  }

  examineCheckinCheckout(){
    this.existCheckinCheckout = this.checkin && this.checkout;
    this.existCheckinOnly = this.checkin && !this.checkout;
  }

  makeCheckin() {
    this.checkin = "";
    this.checkout = "";
    this.checkin = new Date(this.year, this.month, +event.target.innerText);
    this.render()
  }

  makeCheckout() {
    this.checkout = new Date(this.year, this.month, +event.target.innerText);
    this.render();
  }

  //----------------------------end chooseRange--------------------------------//

  applyRange(event) {
    event.preventDefault();
    if (this.existCheckinCheckout) {
      this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0, 3);
      this.rangeSpanEndMonth = this.months[this.checkout.getMonth()].slice(0, 3);
      this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeSpanStartMonth} - ${this.checkout.getDate()} ${this.rangeSpanEndMonth}`;
      // set the range
      this.rangeSpan.value = this.rangeSpanText;
    }
    this.calendar.classList.remove("dropdown__show");
    return this;
  }

  //----------------------------end applyStartOrEnd--------------------------------//
  applyStartOrEnd(event) {
    event.preventDefault();
    this.rangeStart.value = (this.checkin)
      ? this.applyStart()
      : "";
    this.rangeEnd.value = (this.checkout)
      ? this.applyEnd()
      : "";
    this.calendar.classList.remove("dropdown__show");
    return this;
  }

  applyStart() {
    let monthBefore10 = (parseInt(this.checkin.getMonth() + 1) < 10);
    this.rangeStartMonth = monthBefore10
      ? "0" + parseInt(this.checkin.getMonth() + 1)
      : parseInt(this.checkin.getMonth() + 1);
    return `${this.checkin.getDate()}.${this.rangeStartMonth}.${this.checkin.getFullYear()}`;
  }

  applyEnd() {
    let monthBefore10 = (parseInt(this.checkout.getMonth() + 1) < 10);
    this.rangeEndMonth = monthBefore10
      ? "0" + parseInt(this.checkout.getMonth() + 1)
      : parseInt(this.checkout.getMonth() + 1);
    return `${this.checkout.getDate()}.${this.rangeEndMonth}.${this.checkout.getFullYear()}`;
  }

  //----------------------------end applyStartOrEnd--------------------------------//

  resetInput(event) {
    event.preventDefault();
    let rangeInput = this.rangeSpan;
    let separateInput = this.rangeStart && this.rangeEnd;
    this.checkin = "";
    this.checkout = "";
    if (rangeInput) {
      this.rangeSpan.value = "";
    };
    if (separateInput) {
      this.rangeStart.value = "";
      this.rangeEnd.value = "";
    };
    this.render();
    this.calendar.classList.remove("dropdown__show");
  }

  showPrevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render();
    return this;
  }

  showNextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.render();
    return this;
  }

  //----------------------------start render--------------------------------//

  render() {
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();

    //for setting month days in calendar
    this.lastDay = new Date(this.year, parseInt(this.month) + 1, 0).getDate();
    this.lastDayPrev = new Date(this.year, parseInt(this.month), 0).getDate();
    this.dayOfWeekFirst = new Date(this.year, parseInt(this.month), 1).getDay();
    this.prevMonthDays = (this.dayOfWeekFirst === 0) ? 6 : (this.dayOfWeekFirst - 1);
    this.dayOfWeekLast = new Date(this.year, parseInt(this.month) + 1, 0).getDay();
    this.nextMonthDay = (this.dayOfWeekLast === 0) ? 6 : (this.dayOfWeekLast - 1);
    this.daysLeft = (this.dayOfWeekLast === 0) ? 0 : (7 - this.dayOfWeekLast);
    this.dateInCalendar.textContent = `${this.months[this.month]} ${this.year}`;

    this.daysOfMonth.innerHTML = this.renderPrevMonth() +
      this.renderCurrentMonth() +
      this.renderNextMonth();
    return this;
  }

  renderPrevMonth() {
    let prevDays = "";
    for (let p = this.prevMonthDays; p > 0; p--) {
      let chechedInPrevMonth = (this.checkin)
          ? (this.checkin.getMonth() === (this.month - 1) &&
            this.checkin.getDate() === (this.lastDayPrev - p + 1))
          : false;

      let checkedOutPrevMonth = (this.checkout)
        ? (this.checkout.getMonth() === (this.month - 1) &&
          this.checkout.getDate() === (this.lastDayPrev - p + 1))
        : false;

      let checkedInOrOutPrevMonth = (this.checkin && this.checkout)
        ? ( ( this.checkin.getMonth() === (this.month - 1) && 
              this.checkin.getDate() < (this.lastDayPrev - p + 1))
            ||
            ( this.checkout.getMonth() === (this.month - 1) && 
              this.checkout.getDate() > (this.lastDayPrev - p + 1))
            ||
            ( this.checkin.getMonth() < (this.month - 1) && 
              this.checkout.getMonth() > (this.month - 1)) ) 
        : false;

      if (chechedInPrevMonth) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_prev_checkedin ">${this.lastDayPrev - p + 1}</div>`;
      else if (checkedOutPrevMonth) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_prev_checkedout ">${this.lastDayPrev - p + 1}</div>`
      else if (checkedInOrOutPrevMonth) prevDays += `<div class="weeks__day weeks__day_prev weeks__day_ranged_another">${this.lastDayPrev - p + 1}</div>`
      else prevDays += `<div class="weeks__day weeks__day_prev">${this.lastDayPrev - p + 1}</div>`;
    }
    return prevDays;
  }

  renderCurrentMonth() {
    let currDays = "";
    for (let i = 1; i <= this.lastDay; i++) {
      let chechedInToday = (i === new Date().getDate() &&
        this.date.getMonth() === new Date().getMonth() &&
        this.checkin &&
        this.checkin.getMonth() === this.month &&
        this.checkin.getDate() === i);
      let chechedInCurrMonth = (this.checkin)
        ? (this.month === this.checkin.getMonth() &&
          i === this.checkin.getDate())
        : false;
      let checkedOutCurrMonth = (this.checkout)
        ? ( this.month === this.checkout.getMonth() &&
          i === this.checkout.getDate())
        : false;
      let today = (i === new Date().getDate() &&
        this.date.getFullYear() === new Date().getFullYear() &&
        this.date.getMonth() === new Date().getMonth());

      let checkedRangeCurrMonth = (this.checkin && this.checkout)
        ? ((this.month === this.checkin.getMonth() &&
            this.month === this.checkout.getMonth() &&
            i > this.checkin.getDate() &&
            i < this.checkout.getDate())
          ||
          (this.month === this.checkin.getMonth() &&
            this.month < this.checkout.getMonth() &&
            i > this.checkin.getDate())
          ||
          (this.month === this.checkout.getMonth() &&
            this.month > this.checkin.getMonth() &&
            i < this.checkout.getDate())
          ||
          (this.month < this.checkout.getMonth() &&
            this.month > this.checkin.getMonth()))
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
    let nextDays = "";
    for (let n = 1; n < this.daysLeft + 1; n++) {
      let chechedInNextMonth = this.checkedin 
        ? (this.checkin.getMonth() === this.month + 1 &&
          this.checkin.getDate() === n)
        : false;
      let checkedOutNextMonth = this.checkout
        ? (this.checkout.getMonth() === this.month + 1 &&
          this.checkout.getDate() === n)
        : false;
      let checkedRangeNextMonth = (this.checkin && this.checkout)
        ? ((this.month + 1) > this.checkin.getMonth() &&
          (this.month + 1) <= this.checkout.getMonth())
        : false;

      if (chechedInNextMonth) nextDays += `<div class="weeks__day weeks__day_next weeks__day_next_checkedin">${n}</div>`;
      else if (checkedOutNextMonth) nextDays += `<div class="weeks__day weeks__day_next weeks__day_next_checkedout">${n}</div>`;
      else if (checkedRangeNextMonth) nextDays += `<div class="weeks__day weeks__day_next weeks__day_ranged_another">${n}</div>`
      else nextDays += `<div class="weeks__day weeks__day_next">${n}</div>`;
    }
    return nextDays;
  }
  //----------------------------end render--------------------------------//
}