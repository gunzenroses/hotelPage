export default class DropdownRooms {
    constructor(containerId, data){
        this.container = document.getElementById(containerId)
        this.containerClass = this.container.classList.value
        this.dropdownExpanded = this.container.querySelector(".dropdown__rooms")
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
        this.dropdownItems = this.container.querySelectorAll(".dropdown__item_expanded");
        this.dropdownPluses = this.container.querySelectorAll(".dropdown__plus");
        this.dropdownMinuses = this.container.querySelectorAll(".dropdown__minus");
        this.numbers = this.container.querySelectorAll(".dropdown__number");
        this.containerClassExpanded = "." + this.containerClass;
        return this;
    }

    enableHandlers(){
        //this.toggleHandler = this.toggleExpanded.bind(this);
        this.minusOneHandler = this.minusOne.bind(this);
        this.plusOneHandler = this.plusOne.bind(this);
        return this;
    }

    enableEventListeners(){
        //this.info.addEventListener("click", this.toggleHandler);

        for (let i=0;i<3;i++){
            this.dropdownMinuses[i].addEventListener("click", this.minusOneHandler);
        }
        for (let i=0;i<3;i++){
            this.dropdownPluses[i].addEventListener("click", this.plusOneHandler);
        }
        return this;
    }

    // toggleExpanded(){
    //     this.dropdownExpanded.classList.toggle("dropdown__show");
    //     return this;
    // }

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
