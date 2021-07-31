export default class DropdownGuests {
    constructor(containerId, data){
        this.container = document.getElementById(containerId)
        this.containerClass = this.container.classList.value
        this.dropdownExpanded = this.container.querySelector(".dropdown__guests")
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
        this.dropdownItems = this.container.querySelectorAll(".dropdown__item_expanded");
        this.dropdownMinuses = this.container.querySelectorAll(".dropdown__minus");
        this.containerClassExpanded = "." + this.containerClass;
        this.resetButton = this.dropdownExpanded.querySelector(".dropdown__button_reset");
        this.submitButton = this.dropdownExpanded.querySelector(".dropdown__button_submit")
        return this;
    }

    enableHandlers(){
        // this.toggleHandler = this.toggleExpanded.bind(this);
        this.plusAndMinusHandler = this.plusAndMinus.bind(this);
        this.resetGuestsHandler = this.resetGuests.bind(this);
        this.submitGuestsHandler = this.submitGuests.bind(this);
    }

    enableEventListeners(){
        // this.info.addEventListener("click", this.toggleHandler);
        this.dropdownExpanded.addEventListener("click", this.plusAndMinusHandler);
        this.resetButton.addEventListener("click", this.resetGuestsHandler);
        this.submitButton.addEventListener("click", this.submitGuestsHandler);
        return this;
    }

    // toggleExpanded(){
    //     this.dropdownExpanded.classList.toggle("dropdown__show");
    //     return this;
    // }

    plusAndMinus(){
        if (event.target.classList.value == "dropdown__minus"){
            console.log("minus")
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

            if (this.data[i] > 0){
                this.dropdownMinuses[i].classList.remove("button_disabled");
            }

            if (this.data[i] === 0){
                this.dropdownMinuses[i].classList.add("button_disabled");
            }
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