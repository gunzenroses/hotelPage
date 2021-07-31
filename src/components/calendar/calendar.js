export default class renderCalendar {
    constructor(calendarId){
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

    init(){
        this.render()
        this.createChildren()
        this.enableHandlers()
        this.addEventListener()
        return this;
    }

    createChildren(){
        if (this.calendarContainer.closest(".date-range__selector")){
            this.mainContainer = this.calendarContainer.closest(".date-range__selector");
        } else {
            this.mainContainer = this.calendarContainer;
        }

        this.btnApply = this.mainContainer.querySelector(".calendar__buttons_submit")
        this.btnReset = this.mainContainer.querySelector(".calendar__buttons_reset")
        
        if (this.mainContainer.querySelector("input[name=checkin-checkout]")){
            this.rangeSpan = this.mainContainer.querySelector("input[name=checkin-checkout]")
        }
        if (this.mainContainer.querySelector("input[name=checkin]")){
            this.rangeStart = this.mainContainer.querySelector("input[name=checkin]")
        }
        if (this.mainContainer.querySelector("input[name=checkout]")){
            this.rangeEnd = this.mainContainer.querySelector("input[name=checkout]")
        }

        if (this.mainContainer.querySelector(".dropdown__calendar ")) {
            this.calendar = this.mainContainer.querySelector(".dropdown__calendar ");
        }
        this.checkin; 
        this.checkout;
        return this;
    }

    enableHandlers(){
        this.showNextMonthHandler = this.showNextMonth.bind(this);
        this.showPrevMonthHandler = this.showPrevMonth.bind(this);
        this.chooseRangeHandler = this.chooseRange.bind(this);
        this.applyRangeHandler = this.applyRange.bind(this);
        this.applyStartOrEndHandler = this.applyStartOrEnd.bind(this);
        this.resetInputHandler = this.resetInput.bind(this);
        return this;
    }

    addEventListener(){
        this.buttonPrev.addEventListener("click", this.showPrevMonthHandler);
        this.buttonNext.addEventListener("click", this.showNextMonthHandler);
        this.daysOfMonth.addEventListener("click", this.chooseRangeHandler);
        if (this.calendar){
            this.btnReset.addEventListener("click", this.resetInputHandler);
        }
        if ( this.rangeSpan ){
            this.btnApply.addEventListener("click", this.applyRangeHandler);
        }
        if ( this.rangeStart && this.rangeEnd ){
            this.btnApply.addEventListener("click", this.applyStartOrEndHandler)
        }
        return this;
    }

    chooseRange(){
        if (!event.target.classList.contains("weeks__day_prev") 
            && !event.target.classList.contains("weeks__day_next") 
            && !event.target.classList.contains(".weeks__days") 
            && (new Date(this.year, this.month, +event.target.innerText) > new Date()))
        {
                //make new checkin-checkout set
                if 
                    (this.checkin && this.checkout)
                {
                    this.checkin = "";
                    this.checkout = "";
                    this.checkin = new Date(this.year, this.month, +event.target.innerText);
                    this.render()
                } 
                
                //change checkin on earlier date
                else if (
                    this.checkin 
                    && !this.checkout
                    && (
                            (
                                +this.month < +this.checkin.getMonth()
                            )
                        ||
                            (
                                +this.month === +this.checkin.getMonth()
                                && +event.target.innerText < +this.checkin.getDate()
                            )
                        )
                    )
                {
                    this.checkin = "";
                    this.checkin = new Date(this.year, this.month, +event.target.innerText);
                    this.render()
                } 

                //make checkout date
                else if (
                            this.checkin 
                            && !this.checkout
                            && (
                                //this month then date should be grater than checkin
                                (+this.month === +this.checkin.getMonth() 
                                    && +event.target.innerText > +this.checkin.getDate()
                                )
                                //or just next month and any date
                                || +this.month > +this.checkin.getMonth()
                                )
                        )
                {
                    this.checkout = new Date(this.year, this.month, +event.target.innerText);
                    this.render()
                } 
                
                else if (
                            !this.checkin && !this.checkout
                        )
                {
                    this.checkin = new Date(this.year, this.month, +event.target.innerText);
                    this.render()
                }
        }
        return this;
    }

    applyRange(){
        event.preventDefault();
        if (this.checkin && this.checkout){
        this.rangeSpanStartMonth = this.months[this.checkin.getMonth()].slice(0,3);
        this.rangeSpanEndMonth = this.months[this.checkout.getMonth()].slice(0,3);
        this.rangeSpanText = `${this.checkin.getDate()} ${this.rangeSpanStartMonth} - ${this.checkout.getDate()} ${this.rangeSpanEndMonth}`;
        // set the range
        this.rangeSpan.value = this.rangeSpanText;
        }
        this.calendar.classList.remove("dropdown__show");
        return this;
    }
    
    applyStartOrEnd(){
        event.preventDefault();
        if (this.checkin){
            if (parseInt(this.checkin.getMonth()+1) < 10){
                this.rangeStartMonth = "0" + parseInt(this.checkin.getMonth()+1);
            } else {
                this.rangeStartMonth = parseInt(this.checkin.getMonth()+1);
            }
            this.rangeSpanStart = `${this.checkin.getDate()}.${this.rangeStartMonth}.${this.checkin.getFullYear()}`;
            this.rangeStart.value = this.rangeSpanStart;

        }
        if (this.checkout){
            if (parseInt(this.checkout.getMonth()+1) < 10){
                this.rangeEndMonth = "0" + parseInt(this.checkout.getMonth()+1);
            } else {
                this.rangeEndMonth = parseInt(this.checkout.getMonth()+1);
            }
            this.rangeSpanEnd = `${this.checkout.getDate()}.${this.rangeEndMonth}.${this.checkout.getFullYear()}`;
            this.rangeEnd.value = this.rangeSpanEnd;
        }
        this.calendar.classList.remove("dropdown__show");
        return this;
    }

    resetInput(){
        event.preventDefault();
        if ( this.rangeSpan ){
            this.rangeSpan.value = "";
            this.checkin = "";
            this.checkout = "";
            this.render();
        }
        if ( this.rangeStart && this.rangeEnd ){
            this.checkin = "";
            this.checkout = "";
            this.rangeStart.value = "";
            this.rangeEnd.value = "";
            this.render();
        }
        this.calendar.classList.remove("dropdown__show");
        return this;
    }

    showPrevMonth(){
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
        return this;
    }

    showNextMonth(){
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
        return this;
    }
    
    render(){
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        //for setting month days in calendar
        this.lastDay = new Date(this.year, parseInt(this.month)+1, 0).getDate();
        this.lastDayPrev = new Date(this.year, parseInt(this.month), 0).getDate();
        this.dayOfWeekFirst = new Date(this.year, parseInt(this.month), 1).getDay();
        this.prevMonthDays = (this.dayOfWeekFirst === 0) ? 6 : (this.dayOfWeekFirst - 1);
        this.dayOfWeekLast = new Date(this.year, parseInt(this.month) + 1, 0).getDay();
        this.nextMonthDay = (this.dayOfWeekLast === 0) ? 6 : (this.dayOfWeekLast - 1);
        this.daysLeft = (this.dayOfWeekLast === 0) ? 0 : (7 - this.dayOfWeekLast);
        this.dateInCalendar.textContent = `${this.months[this.month]} ${this.year}`;

        
        //filling the calendar dates
        //add days from previous month
        this.days = "";
        for (let p=this.prevMonthDays;p>0;p--){
            if ( 
                this.checkin 
                && this.checkin.getMonth() === (this.month - 1)
                && this.checkin.getDate() === (this.lastDayPrev-p+1) 
                ){
                this.days+=`<div class="weeks__day weeks__day_prev weeks__day_prev_checkedin ">${this.lastDayPrev-p+1}</div>`
            } else if (
                    this.checkout 
                    && this.checkout.getMonth() === (this.month - 1)
                    && this.checkout.getDate() === (this.lastDayPrev-p+1)  
                ){
                this.days+=`<div class="weeks__day weeks__day_prev weeks__day_prev_checkedout ">${this.lastDayPrev-p+1}</div>`
            } else if 
                    (
                        (
                            this.checkin && this.checkout
                            && this.checkin.getMonth() === (this.month - 1)
                            && this.checkin.getDate() < (this.lastDayPrev-p+1) 
                        )
                    ||
                        (
                            this.checkin && this.checkout 
                            && this.checkout.getMonth() === (this.month - 1)
                            && this.checkout.getDate() > (this.lastDayPrev-p+1) 
                        )
                    ||
                        (
                            this.checkin && this.checkout 
                            && this.checkin.getMonth() < (this.month - 1)
                            && this.checkout.getMonth() > (this.month - 1)
                        )
                    ){
                this.days+=`<div class="weeks__day weeks__day_prev weeks__day_ranged_another">${this.lastDayPrev-p+1}</div>`
            } else {
                this.days+=`<div class="weeks__day weeks__day_prev">${this.lastDayPrev-p+1}</div>`
            }
        }

        // add days for this month
        for (let i=1;i<=this.lastDay;i++){
            if (
                i === new Date().getDate() 
                && this.date.getMonth() === new Date().getMonth()
                && this.checkin
                && this.checkin.getMonth() === this.month 
                && this.checkin.getDate() === i
            ){
                this.days += `<div class="weeks__day weeks__day_today weeks__day_checkedin">${i}</div>`;
            } else if (
                        this.checkin 
                        && this.month === this.checkin.getMonth()
                        && i === this.checkin.getDate()
                        )
            {
                this.days += `<div class="weeks__day weeks__day_checkedin">${i}</div>`;
            } else if (
                    this.checkout 
                    && this.month === this.checkout.getMonth()
                    && i === this.checkout.getDate()
                    )
            {   
                this.days += `<div class="weeks__day weeks__day_checkedout">${i}</div>`;
            } 
            else if (
                i === new Date().getDate() 
                && this.date.getFullYear() === new Date().getFullYear()
                && this.date.getMonth() === new Date().getMonth()
            ){
                //
                //
                //
                // console.log(new Date().getFullYear());
                this.days += `<div class="weeks__day weeks__day_today">${i}</div>`;
            }
            else if (
                    this.checkin && this.checkout 
                    &&
                        (
                            (
                                this.month === this.checkin.getMonth()
                                && this.month === this.checkout.getMonth()
                                && i > this.checkin.getDate()
                                && i < this.checkout.getDate()
                            )
                        ||
                            (
                                this.month === this.checkin.getMonth()
                                && this.month < this.checkout.getMonth()
                                && i > this.checkin.getDate()
                            )
                        ||
                            (   
                                this.month === this.checkout.getMonth()
                                && this.month > this.checkin.getMonth()
                                && i < this.checkout.getDate()
                            )
                        ||
                            (   
                                this.month < this.checkout.getMonth()
                                && this.month > this.checkin.getMonth()
                            )
                        )
                )
            {
                this.days += `<div class="weeks__day weeks__day_ranged">${i}</div>`;
            }
                
            else {
                this.days += `<div class="weeks__day">${i}</div>`;
            }
        }

        // add days from next month
        for (let n=1;n<this.daysLeft+1;n++){
            if (
                    this.checkedin
                    && this.checkin.getMonth() === this.month + 1 
                    && this.checkin.getDate() === n
                ){
                    this.days += `<div class="weeks__day weeks__day_next weeks__day_next_checkedin">${n}</div>`;
            } else if (
                this.checkout
                && this.checkout.getMonth() === this.month + 1 
                && this.checkout.getDate() === n
                ){
                    this.days += `<div class="weeks__day weeks__day_next weeks__day_next_checkedout">${n}</div>`;
            } else if 
                    (
                        this.checkin && this.checkout 
                        && (this.month + 1) > this.checkin.getMonth()
                        && (this.month + 1) <= this.checkout.getMonth()
                    ){
                    this.days +=`<div class="weeks__day weeks__day_next weeks__day_ranged_another">${n}</div>`
            } else {
                this.days += `<div class="weeks__day weeks__day_next">${n}</div>`;
            }
        }
        this.daysOfMonth.innerHTML = this.days;
        return this;
    }
}