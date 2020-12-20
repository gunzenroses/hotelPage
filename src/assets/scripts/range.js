const inputLeft = document.getElementById("left-range");
const inputRight = document.getElementById("right-range");

const thumbLeft = document.querySelector(".slider > .thumb.thumb_left");
const thumbRight = document.querySelector(".slider > .thumb.thumb_right");

const range = document.querySelector(".slider >.range");

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);


function setLeftValue(){
    let _this=inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    _this.value = Math.min(parseInt(_this.value),parseInt(inputRight.value)+1);
    let percent = (_this.value - min);
    thumbLeft.style.left = percent+"%";
    range.style.left = percent+"%";
}
setLeftValue();

function setRightValue(){
    let _this = inputRight,
        min = _this.min,
        max = _this.max;
    
    _this.value = Math.max(parseInt(_this.value),parseInt(inputLeft.value)+ 1);
    let percent = max - _this.value;
    
    thumbRight.style.right= percent+"%";
    range.style.right= percent+"%";
}
setRightValue();


/*thumbLeft.addEventListener ('click', function(){
  inputLeft.style.zIndex = "3";                                                   inputLeft.addEventListener("input", setLeftValue);
});

thumbRight.addEventListener ("click", ()=>{
  inputLeft.style.zIndex = "2";
  inputRight.addEventListener("input", setRightValue);
});*/