
// form a list of class "dropdown__init"
let dropdownInits = document.querySelectorAll(".dropdown__init");


// init functionality for every element of the list
for (let dropdownInit of dropdownInits){
    let dropdownParent = dropdownInit.parentElement;
    let dropdownExpanded = dropdownParent.querySelector(".dropdown__content");

    if (dropdownParent.closest(".dropdown__watch")){
        let dropdownWatch = dropdownParent.closest(".dropdown__watch");

        dropdownWatch.addEventListener("click", ()=>{
            if (event.target != dropdownInit){
                dropdownExpanded.classList.remove("dropdown__show");
            } else {
                dropdownExpanded.classList.toggle("dropdown__show");
            }
        })
    } else {

    dropdownInit.addEventListener("click", ()=>{
        dropdownExpanded.classList.toggle("dropdown__show");
    });
    
    }
}

// the following code was replaced
// class Dropdown {
//     constructor(containerId, buttonSelector, contentSelector){
//         this.container = document.getElementById(containerId)
//         this.containerClass = this.container.classList.value
//         this.dropdownButton = this.container.querySelector(buttonSelector);
//         this.dropdownExpanded = this.container.querySelector(contentSelector)
//         this.init()
//     }

//     init(){
//         this.createChildren();
//         this.enableHandlers();
//         this.enableEventListeners();
//         return this;
//     }

//     createChildren(){
//         this.containerClassExpanded = "." + this.containerClass;
//         return this;
//     }

//     enableHandlers(){
//         this.toggleHandler = this.toggleExpanded.bind(this);
//     }

//     enableEventListeners(){
//         this.dropdownButton.addEventListener("click", this.toggleHandler);
//         return this;
//     }

//     toggleExpanded(){
//         this.dropdownExpanded.classList.toggle("dropdown__show");
//         return this;
//     }
// }