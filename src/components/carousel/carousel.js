// choose all containers for carousel
let carousels = document.querySelectorAll('.carousel');


// do the following code for every carousel
for (let carousel of carousels){
    let carouselInputs = carousel.getElementsByClassName("carousel__radio")[0];
    let carouselNext = carousel.querySelector(".carousel__btn_next");
    let carouselPrev = carousel.querySelector(".carousel__btn_prev");
    let carouselPictures = carousel.querySelector(".carousel__pictures");
    let leftValue = carouselPictures.style.left;
    carouselPictures.style.left = 0;
    
    carouselPrev.addEventListener("click", () => {
        leftValue += 100;
        switch(leftValue){
            case 0:  
                    carouselInputs.querySelectorAll(".carousel__radio_real")[0].checked = true;
                    carouselPictures.style.left = leftValue + "%";
                    break;
            case -100: carouselInputs.querySelectorAll(".carousel__radio_real")[1].checked = true;
                        carouselPictures.style.left = leftValue + "%";
                        break;
            case -200: carouselInputs.querySelectorAll(".carousel__radio_real")[2].checked = true;
                        carouselPictures.style.left = leftValue + "%";
                        break;
            case 100: leftValue = -300;
                    carouselInputs.querySelectorAll(".carousel__radio_real")[3].checked = true;
                    carouselPictures.style.left = leftValue + "%";            
                    break;
        }
    });

    carouselNext.addEventListener("click", () => {
        leftValue -= 100;
        switch(leftValue){
            case -400:  leftValue = 0;
                        carouselInputs.querySelectorAll(".carousel__radio_real")[0].checked = true;
                        carouselPictures.style.left = leftValue + "%";
                        break;
            case -100: carouselInputs.querySelectorAll(".carousel__radio_real")[1].checked = true;
                        carouselPictures.style.left = leftValue + "%";
                        break;
            case -200: carouselInputs.querySelectorAll(".carousel__radio_real")[2].checked = true;
                        carouselPictures.style.left = leftValue + "%";
                        break;
            case -300: carouselInputs.querySelectorAll(".carousel__radio_real")[3].checked = true;
                        carouselPictures.style.left = leftValue + "%";            
                        break;
        }
    });
    
    carouselInputs.addEventListener("click", event => {
        switch(event.target.value){
            case "picture_1": leftValue = 0; break;
            case "picture_2": leftValue = -100; break;
            case "picture_3": leftValue = -200; break;
            case "picture_4": leftValue = -300; break;
        }
        carouselPictures.style.left = leftValue+"%";
    });
}




// class Carousel {
//     constructor(selector){
//         this.carouselContainer = selector;
//         this.init()
//     }

//     init(){
//         this.createChildren();
//         this.enableHandlers();
//         this.enableEventListeners();
//         return this;
//     }

//     createChildren(){
//         this.carouselInputs = this.carouselContainer.getElementsByClassName("carousel__radio")[0];
//         this.carouselPictures = this.carouselContainer.querySelector(".carousel__pictures");
//         return this;
//     }

//     enableHandlers(){
//         this.choosePictureHandler = this.choosePicture.bind(this);
//         return this;
//     }
    
//     enableEventListeners(){
//         this.carouselInputs.addEventlistener("click", this.choosePictureHandler);
//         return this;
//     }

//     choosePicture(){
//         let leftValue;
//         switch(event.target.value){
//             case "picture_1": leftValue = 0; break;
//             case "picture_2": leftValue = -100; break;
//             case "picture_3": leftValue = -200; break;
//             case "picture_4": leftValue = -300; break;
//         }
//         this.carouselPictures.style.left = leftValue+"%";
//         return this;
//     }
// }