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


//TODO: should count adults and kids together and infants separate
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
        this.data = [0, 0, 0];
        this.plusAndMinusShow();
        this.infoInput.value = "";
        return this;
    }

    submitGuests(){
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
        this.data = data
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
        this.containerClassExpanded = "." + this.containerClass;
        return this;
    }

    enableHandlers(){
        this.toggleHandler = this.toggleExpanded.bind(this);
        //this.closeExpandedHandler = this.closeExpanded.bind(this);
        this.plusAndMinusHandler = this.plusAndMinus.bind(this);
    }

    enableEventListeners(){
        this.info.addEventListener("click", this.toggleHandler);
        //document.addEventListener("click", this.closeExpandedHandler);
        this.dropdownExpanded.addEventListener("click", this.plusAndMinusHandler);
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
            this.render();
            return this;
        }

        if (event.target.classList.value == "dropdown__plus"){
            let orderInData = parseInt(event.target.previousElementSibling.dataset.order);
            this.data[orderInData]++;
            this.render();
            return this;
        }
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
        }

        if (this.dropdownItems[0].dataset.type){
            this.infoInput.value = "";
            this.roomInfo = [];
            for (let j=0; j<this.data.length;j++){
                let dataType = this.dropdownItems[j].dataset.type;
                let dataTypeName;
                if (this.data[j]==0){
                    switch(dataType){
                        case "bedrooms": dataTypeName = "спален"; break;
                        case "beds": dataTypeName = "кроватей"; break;
                        case "bathrooms": dataTypeName = "ванных комнат"; break;
                    }
                } else if (this.data[j]==1){
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
                //this.infoInput.value += `${this.data[j]} ${dataTypeName}, `;
            }
            this.infoInput.value = this.roomInfo.slice(0,20) + "..."
        }

        return this;
    }
}

class DropdownCheckbox {
    constructor(containerId){
        this.container = document.getElementById(containerId)
        this.containerClass = this.container.classList.value
        this.dropdownExpanded = this.container.querySelector(".dropdown__content")
        this.init()
    }

    init(){
        this.createChildren();
        this.enableHandlers();
        this.enableEventListeners();
        return this;
    }

    createChildren(){
        this.dropdownButton = this.container.querySelector(".dropdown__button_transparent");
        this.containerClassExpanded = "." + this.containerClass;
        return this;
    }

    enableHandlers(){
        this.toggleHandler = this.toggleExpanded.bind(this);
    }

    enableEventListeners(){
        this.dropdownButton.addEventListener("click", this.toggleHandler);
        return this;
    }

    toggleExpanded(){
        this.dropdownExpanded.classList.toggle("dropdown__show");
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

export { ButtonPagination, DropdownGuests, DropdownRooms, DropdownCheckbox, Range, likeButtons}