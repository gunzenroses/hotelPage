class ButtonPagination {
    constructor(data, containerId){
        this.data = data
        this.paginationContainer = containerId
            this.pageButtons = document.createElement("div")
            this.pageButtons.classList.add("pagination__buttons")
        this.paginationContainer.prepend(this.pageButtons)

        this.paginationInfo = document.createElement("div")
            this.paginationInfo.classList.add("pagination__info")
        this.paginationContainer.append(this.paginationInfo)
        this.makePageButtons(this.data)
    }

    makePageButtons(state){
        this.pageButtons.innerHTML = "";
        let maxLeft = (parseInt(state.currentNum) - parseInt(Math.floor(state.visibleNum/2)));
            let leftDif = state.visibleNum - parseInt(Math.floor(state.visibleNum/2)) - 1;
        let maxRight = (parseInt(state.currentNum) + leftDif);
        if (maxLeft<1){
            maxLeft = 1;
            maxRight = state.visibleNum;
        }
        if (maxRight>state.totalNum){
            maxRight = state.totalNum;
            maxLeft = maxRight - (state.visibleNum - 1);
        }

        for (let i=maxLeft; i<=maxRight; i++){
            this.pageButtons.appendChild(this.createPaginationButton(i));
        }

        if (state.currentNum == 1){
            this.pageButtons.innerHTML = "";
            for (let j=1; j<=3; j++){
                this.pageButtons.appendChild(this.createPaginationButton(j));
            }
            this.pageButtons.innerHTML = this.pageButtons.innerHTML + `<button value="4" class="pagination__item">...</button>`
        }

        if (state.currentNum <= 3){
            this.pageButtons.innerHTML = this.pageButtons.innerHTML + `<button class="pagination__button_last">15</button>`
        }

        if (state.currentNum < maxRight){
            this.pageButtons.innerHTML = this.pageButtons.innerHTML + `<button class="pagination__button_next"></button>` 
        } else {
            this.pageButtons.innerHTML = `<button class="pagination__button_first">1</button>` + this.pageButtons.innerHTML;
        }

        if (state.currentNum > 3){
            this.pageButtons.innerHTML = 
            `<button class="pagination__button_prev"></button>` + this.pageButtons.innerHTML;
        }

        this.onButtonClick();
        this.onNavigationClick();
        this.addInfoLine();
    }


    //2. создать видимые кнопки по заданному алгоритму
    createPaginationButton(i){
        let button = document.createElement("button");
        button.innerText = i;
        button.value = i;
        if (i == this.data.currentNum){
            button.classList.add("pagination__button_current")
        } else {
            button.classList.add("pagination__item")
        }
        return button;
    }

    addInfoLine(){
        this.paginationInfo.innerHTML = "";
        let trimStart = (this.data.currentNum-1)*this.data.itemsPerPage + 1;
        let trimEnd = trimStart + this.data.itemsPerPage - 1;
        this.paginationInfo.innerText = `${trimStart} – ${trimEnd} из 100+ вариантов аренды`;
        return this;
    }

    onButtonClick(){
        let buttonItems = this.pageButtons.getElementsByClassName("pagination__item");
        for (let z=0;z<buttonItems.length;z++){
            buttonItems[z].addEventListener("click", ()=>{
                this.data.currentNum = parseInt(event.target.value);
                this.makePageButtons(this.data);
            });
        }
        return this;
    }

    onNavigationClick(){
        if (this.data.currentNum<this.data.totalNum){
            let buttonNext = this.pageButtons.querySelector(".pagination__button_next");
            buttonNext.addEventListener("click", ()=>{
                this.data.currentNum++;
                this.makePageButtons(this.data);
            })
        }
        if (this.data.currentNum>3){
            let buttonPrev = this.pageButtons.querySelector(".pagination__button_prev");
            buttonPrev.addEventListener("click", ()=>{
                this.data.currentNum--;
                this.makePageButtons(this.data);
            })
        }
        
        let buttonFirst = this.pageButtons.querySelector(".pagination__button_first");
        if (buttonFirst){
            buttonFirst.addEventListener("click", ()=>{
                this.data.currentNum = 1;
                this.makePageButtons(this.data);
            })
        }

        let buttonLast = this.pageButtons.querySelector(".pagination__button_last");
        if (buttonLast){
            buttonLast.addEventListener("click", ()=>{
                this.data.currentNum = 15;
                this.makePageButtons(this.data);
            })
        }

        return this;
    }
}


class DropdownGuests {
    constructor(containerId, expandedClass, data){
        this.container = document.getElementById(containerId)
        this.containerClass = this.container.classList.value
        this.dropdownExpanded = this.container.querySelector(expandedClass)
        if (data){
            this.data = data
        } else {
            this.data = [0, 0, 0]
        }
        this.init()
    }

    init(){
        this.createChildren();
        this.plusAndMinusShow();
        this.totalGuestsCount();
        this.enableHandlers();
        this.enableEventListeners();
        return this;
    }

    createChildren(){
        this.info = this.container.querySelector(".dropdown__info");
        this.infoInput = this.container.querySelector(".dropdown__input");
        this.dropdownItems = this.container.querySelectorAll(".dropdown__expandedItem");
        this.containerClassExpanded = "." + this.containerClass;
        this.resetButton = this.dropdownExpanded.querySelector(".dropdown__button_reset");
        this.submitButton = this.dropdownExpanded.querySelector(".dropdown__button_submit")
        return this;
    }

    enableHandlers(){
        this.toggleHandler = this.toggleExpanded.bind(this);
        //this.closeExpandedHandler = this.closeExpanded.bind(this);
        this.plusAndMinusHandler = this.plusAndMinus.bind(this);
        this.resetGuestsHandler = this.resetGuests.bind(this);
        this.submitGuestsHandler = this.submitGuests.bind(this);
    }

    enableEventListeners(){
        this.info.addEventListener("click", this.toggleHandler);
        //document.addEventListener("click", this.closeExpandedHandler);
        this.dropdownExpanded.addEventListener("click", this.plusAndMinusHandler);
        this.resetButton.addEventListener("click", this.resetGuestsHandler);
        this.submitButton.addEventListener("click", this.submitGuestsHandler);
        return this;
    }

    toggleExpanded(){
        this.dropdownExpanded.classList.toggle("dropdown__show");
        return this;
    }

    // closeExpanded(){
    //     if (!event.target.closest(this.containerClassExpanded)){
    //         this.dropdownExpanded.classList.remove("dropdown__show");
    //     }
    //     return this;
    // }

    plusAndMinus(){
        if (event.target.classList.value == "dropdown__minus"){
            let orderInData = parseInt(event.target.nextElementSibling.dataset.order);
            this.data[orderInData]--;
            //this.render();
            this.plusAndMinusShow();
            this.totalGuestsCount();
            return this;
        }

        if (event.target.classList.value == "dropdown__plus"){
            let orderInData = parseInt(event.target.previousElementSibling.dataset.order);
            this.data[orderInData]++;
            //this.render();
            this.plusAndMinusShow();
            this.totalGuestsCount();
            return this;
        }
    }

    resetGuests(){
        event.preventDefault();
        this.data = [0, 0, 0];
        this.plusAndMinusShow();
        this.infoInput.value = "";
        this.resetButton.classList.remove("button__show");
        return this;
    }

    submitGuests(){
        event.preventDefault();
        this.dropdownExpanded.classList.remove("dropdown__show");
        return this;
    }

    plusAndMinusShow(){
        for (let i=0; i<this.dropdownItems.length;i++){
            if (this.data[i]<0){
                this.data[i]=0;
            }
            if (this.data[i]>10){
                this.data[i]=10;
            }
            let dropdownItem = this.dropdownItems[i].querySelector(".dropdown__number");
            dropdownItem.innerText = this.data[i];
        }
        return this;
    }
    
    totalGuestsCount(){
        this.adultGuests = parseInt(this.data[0]) + parseInt(this.data[1])
        this.infantGuests = parseInt(this.data[2])
        this.totalGuests = this.adultGuests + this.infantGuests
        if (this.totalGuests > 0){
            this.resetButton.classList.add("button__show");
            this.render();
        } else {
            this.resetButton.classList.remove("button__show");
            this.infoInput.value = "";
        }
        return this;
    }

    render(){
        let dataTypeNameAdults;
        switch (this.adultGuests){
            case 1: 
                case 21: this.dataTypeNameAdults = "гость"; break;
            case 2:
            case 3:
            case 4:
                case 22:
                case 23:
                case 24: this.dataTypeNameAdults = "гостя"; break;
            default: this.dataTypeNameAdults = "гостей"; break;
        }
        
        let dataTypeNameInfant;
        switch (this.infantGuests){
            case 1: 
                case 21: this.dataTypeNameInfant = "младенец"; break;
            case 2:
            case 3:
            case 4:
                case 22:
                case 23:
                case 24: this.dataTypeNameInfant = "младенца"; break;
            default: this.dataTypeNameInfant = "младенцев"; break;
        }


        if (this.adultGuests > 0){
            this.infoInput.value = `${this.adultGuests} ${this.dataTypeNameAdults}`;
            if (this.infantGuests > 0){
                this.infoInput.value += `, ${this.infantGuests} ${this.dataTypeNameInfant} `;
            }
        } else {
            this.infoInput.value = ""
        }

        return this;
    }
}


class DropdownRooms {
    constructor(containerId, expandedClass, data){
        this.container = document.getElementById(containerId)
        this.containerClass = this.container.classList.value
        this.dropdownExpanded = this.container.querySelector(expandedClass)
        this.data = [...data]
        this.init()
    }

    init(){
        this.createChildren();
        this.render();
        this.enableHandlers();
        this.enableEventListeners();
        return this;
    }

    createChildren(){
        this.info = this.container.querySelector(".dropdown__info");
        this.infoInput = this.container.querySelector(".dropdown__input");
        this.dropdownItems = this.container.querySelectorAll(".dropdown__expandedItem");
        this.dropdownPluses = this.container.querySelectorAll(".dropdown__plus");
        this.dropdownMinuses = this.container.querySelectorAll(".dropdown__minus");
        this.numbers = this.container.querySelectorAll(".dropdown__number");
        this.containerClassExpanded = "." + this.containerClass;
        return this;
    }

    enableHandlers(){
        this.toggleHandler = this.toggleExpanded.bind(this);
        this.minusOneHandler = this.minusOne.bind(this);
        this.plusOneHandler = this.plusOne.bind(this);
        return this;
    }

    enableEventListeners(){
        this.info.addEventListener("click", this.toggleHandler);

        for (let i=0;i<3;i++){
            this.dropdownMinuses[i].addEventListener("click", this.minusOneHandler);
        }
        for (let i=0;i<3;i++){
            this.dropdownPluses[i].addEventListener("click", this.plusOneHandler);
        }
        return this;
    }

    toggleExpanded(){
        this.dropdownExpanded.classList.toggle("dropdown__show");
        return this;
    }

    minusOne(){
        let orderInData = parseInt(event.target.nextElementSibling.dataset.order);
        this.data[orderInData] = this.data[orderInData] - 1;
        this.render();
        return this;
    }

    plusOne(){
        let orderInData = parseInt(event.target.previousElementSibling.dataset.order);
        this.data[orderInData]++;
        this.render();
        return this;
    }

    render(){
        for (let i=0; i<this.dropdownItems.length;i++){
            if (this.data[i]<0){
                this.data[i]=0;
            }
            if (this.data[i]>10){
                this.data[i]=10;
            }

            let dropdownItem = this.dropdownItems[i].querySelector(".dropdown__number");
            dropdownItem.innerText = this.data[i];

            if (this.data[i] > 0){
                this.dropdownMinuses[i].classList.remove("button_disabled");
            }

            if (this.data[i] === 0){
                this.dropdownMinuses[i].classList.add("button_disabled");
            }
        }

        if (this.dropdownItems[0].dataset.type){
            this.infoInput.value = "";
            this.roomInfo = "";
            for (let j=0; j<this.data.length;j++){
                let dataType = this.dropdownItems[j].dataset.type;
                let dataTypeName;
                if (this.data[j] == 0){
                    switch(dataType){
                        case "bedrooms": dataTypeName = "спален"; break;
                        case "beds": dataTypeName = "кроватей"; break;
                        case "bathrooms": dataTypeName = "ванных комнат"; break;
                    }
                } else if (this.data[j] == 1){
                    switch(dataType){
                        case "bedrooms": dataTypeName = "спальня"; break;
                        case "beds": dataTypeName = "кровать"; break;
                        case "bathrooms": dataTypeName = "ванная комната"; break;
                    }
                } else if (this.data[j]>1 && this.data[j]<5){
                    switch(dataType){
                        case "bedrooms": dataTypeName = "спальни"; break;
                        case "beds": dataTypeName = "кровати"; break;
                        case "bathrooms": dataTypeName = "ванных комнаты"; break;
                    }
                } else {
                    switch(dataType){
                        case "bedrooms": dataTypeName = "спален"; break;
                        case "beds": dataTypeName = "кроватей"; break;
                        case "bathrooms": dataTypeName = "ванных комнат"; break;
                    }
                }
                this.roomInfo += `${this.data[j]} ${dataTypeName}, `;
            }
            this.infoInput.value = this.roomInfo.slice(0,20) + "..."
        }

        return this;
    }
}


class Range {
    constructor(containerId){
        this.container = document.getElementById(containerId)
        this.data = []
        this.init()
    }

    init(){
        this.createChildren();
        this.render();
        this.enableHandlers();
        this.enableEventListeners();
        return this;
    }

    createChildren(){
        this.inputLeft = this.container.querySelector(".left_range");
        this.inputRight = this.container.querySelector(".right_range");
        this.thumbLeft = this.container.querySelector(".slider > .thumb.thumb_left");
        this.thumbRight = this.container.querySelector(".slider > .thumb.thumb_right");
        this.data = [parseInt(this.inputLeft.value), parseInt(this.inputRight.value)];
        this.range = this.container.querySelector(".slider >.range");
        this.rangeInfo = this.container.previousElementSibling;
        return this;
    }

    enableHandlers(){
        this.setLeftValueHandler = this.setLeftValue.bind(this);
        this.setRightValueHandler = this.setRightValue.bind(this);
        return this;
    }

    enableEventListeners(){
        this.inputLeft.addEventListener("input", this.setLeftValueHandler);
        this.inputRight.addEventListener("input", this.setRightValueHandler);
        return this;
    }

    setLeftValue(){
        let _this = this.inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);
        _this.value = Math.min(parseInt(_this.value),parseInt(this.inputRight.value)+1);
        this.data[0] = _this.value;
        
        this.render();
        return this;
    }

    setRightValue(){
        let _this = this.inputRight,
            min = parseInt(_this.min),
            max = parseInt(_this.max);
        _this.value = Math.max(parseInt(_this.value),parseInt(this.inputLeft.value)+ 1);
        this.data[1] = _this.value;
        
        this.render();
        return this;
    }

    render(){
        
        this.leftPercent = this.data[0];
        this.rightPercent = this.data[1];
        
        this.thumbLeft.style.left = this.leftPercent + "%";
        this.range.style.left = this.leftPercent + "%";

        this.thumbRight.style.right= (100 - this.rightPercent) + "%";
        this.range.style.right= (100 - this.rightPercent) + "%";

        let highestPrice = parseInt(15000);
        let start = Math.ceil(this.data[0]/10000 * highestPrice)*100;
        
            let startBeginning = Math.floor(start/1000);
            let startFinish = start.toString().substr(startBeginning.toString().length,);
            let newStart = startBeginning + " " + startFinish + "₽";


        let end = Math.floor(this.data[1]/10000 * highestPrice)*100;
            let endBeginning = Math.floor(end/1000);
            let endFinish = end.toString().substr(endBeginning.toString().length,);
            let newEnd = endBeginning + " " + endFinish + "₽";

        this.rangeInfo.innerText = `${newStart} - ${newEnd}`;
        return this;
    }
}


class likeButtons {
    constructor(containerId, data){
        this.likeButton = document.getElementById(containerId)
        this.data = parseInt(data,10)
        this.init()
    }

    init(){
        this.createChildren();
        this.render();
        this.enableHandlers();
        this.enableEventListeners();
        return this;
    }

    createChildren(){
        this.number = this.likeButton.querySelector('.buttonLike__number');
        this.heart = this.likeButton.querySelector('.buttonLike__heart');
        return this;
    }
    
    enableHandlers(){
        this.buttonLikeIncreaseHandler = this.buttonLikeIncrease.bind(this);
        return this;
    }

    enableEventListeners(){
        this.likeButton.addEventListener('click', this.buttonLikeIncreaseHandler)
        return this;
    }

    buttonLikeIncrease(){
        this.data++;
        this.render();
        return this;
    }

    render(){
        this.number.textContent = this.data;
        if (parseInt(this.number.textContent) > 9){
            this.likeButton.classList.add("buttonLike_popular");
            this.heart.classList.add("buttonLike__heart_popular");
        }
        return this;
    }
}

class renderCalendar {
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
            // this.daysList = this.daysOfMonth.querySelectorAll(".weeks__day");
            // this.listOfDays = Array.prototype.slice.call(this.daysList);
        if (this.calendarContainer.closest(".dateRangeSelector")){
            this.mainContainer = this.calendarContainer.closest(".dateRangeSelector");
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
            this.btnApply.addEventListener("click", this.applyRangeHandler)
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
                                            // if (this.daysOfMonth.querySelector(".weeks__day_checkin")){
                                            //     this.daysOfMonth.querySelector(".weeks__day_checkin").classList.remove("weeks__day_checkin");
                                            // }
                                            // if (this.daysOfMonth.querySelector(".weeks__day_checkout")){
                                            //     this.daysOfMonth.querySelector(".weeks__day_checkout").classList.remove("weeks__day_checkout");
                                            // }
                                            // event.target.classList.add("weeks__day_checkin");
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
                                            // if (this.daysOfMonth.querySelector(".weeks__day_checkin")){
                                            //     this.daysOfMonth.querySelector(".weeks__day_checkin").classList.remove("weeks__day_checkin");
                                            // }
                                            // event.target.classList.add("weeks__day_checkin");
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
                    // event.target.classList.add("weeks__day_checkout");
                    this.checkout = new Date(this.year, this.month, +event.target.innerText);
                    this.render()
                } 
                
                else if (
                            !this.checkin && !this.checkout
                        )
                {
                                            // event.target.classList.add("weeks__day_checkin");
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
        this.daysLeft = 7 - this.dayOfWeekLast;
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
                this.days+=`<div class="weeks__day weeks__day_prev weeks__day_prev_checkin ">${this.lastDayPrev-p+1}</div>`
            } else if (
                    this.checkout 
                    && this.checkout.getMonth() === (this.month - 1)
                    && this.checkout.getDate() === (this.lastDayPrev-p+1)  
                ){
                this.days+=`<div class="weeks__day weeks__day_prev weeks__day_prev_checkout ">${this.lastDayPrev-p+1}</div>`
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
                this.days+=`<div class="weeks__day weeks__day_prev weeks__day_range_another">${this.lastDayPrev-p+1}</div>`
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
                this.days += `<div class="weeks__day weeks__day_today weeks__day_checkin">${i}</div>`;
            } else if (
                        this.checkin 
                        && this.month === this.checkin.getMonth()
                        && i === this.checkin.getDate()
                        )
            {
                this.days += `<div class="weeks__day weeks__day_checkin">${i}</div>`;
            } else if (
                    this.checkout 
                    && this.month === this.checkout.getMonth()
                    && i === this.checkout.getDate()
                    )
            {   
                this.days += `<div class="weeks__day weeks__day_checkout">${i}</div>`;
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
                this.days += `<div class="weeks__day weeks__day_range">${i}</div>`;
            }
                
            else {
                this.days += `<div class="weeks__day">${i}</div>`;
            }
        }

        // add days from next month
        for (let n=1;n<this.daysLeft+1;n++){
            if (
                    this.checkin
                    && this.checkin.getMonth() === this.month + 1 
                    && this.checkin.getDate() === n
                ){
                    this.days += `<div class="weeks__day weeks__day_next weeks__day_next_checkin">${n}</div>`;
            } else if (
                this.checkout
                && this.checkout.getMonth() === this.month + 1 
                && this.checkout.getDate() === n
                ){
                    this.days += `<div class="weeks__day weeks__day_next weeks__day_next_checkout">${n}</div>`;
            } else if 
                    (
                        this.checkin && this.checkout 
                        && (this.month + 1) > this.checkin.getMonth()
                        && (this.month + 1) <= this.checkout.getMonth()
                    ){
                    this.days +=`<div class="weeks__day weeks__day_next weeks__day_range_another">${n}</div>`
            } else {
                this.days += `<div class="weeks__day weeks__day_next">${n}</div>`;
            }
        }
        this.daysOfMonth.innerHTML = this.days;
        return this;
    }
}

export { ButtonPagination, DropdownGuests, DropdownRooms, Range, likeButtons, renderCalendar}