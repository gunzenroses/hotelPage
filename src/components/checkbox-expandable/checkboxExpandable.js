// form a list of class "dropdown__watch";
let dropdownWatchs = document.querySelectorAll(".dropdown__watch");

//for all dropdownWatchs add eventlistener
for (let dropdownWatch of dropdownWatchs) {
  dropdownWatch.addEventListener("click", () => {
    let dropdownWatchedInits = dropdownWatch.querySelectorAll(".dropdown__init");

    let dropdownWatchedParents = [];
    for (let l = 0; l < dropdownWatchedInits.length; l++) {
      dropdownWatchedParents.push(dropdownWatchedInits[l].parentElement);
    }

    let dropdownWatchedExpands = [];
    for (let m = 0; m < dropdownWatchedParents.length; m++) {
      dropdownWatchedExpands.push(dropdownWatchedParents[m].querySelector(".dropdown__content"));
    }

    // if you click on dropdownExpanded
    if (event.target.closest(".dropdown__show")) {
      // and want to expand its item
      if (event.target.closest(".dropdown__init")) {

        let innerParent = event.target.closest(".dropdown__init").parentElement;
        let innerExpand = innerParent.querySelector(".dropdown__content");
        //then toggle
        innerExpand.classList.toggle("dropdown__show");
      }
      // if you click on the same "init" element, its "dropdown" should toggle
    } else if (event.target.closest(".dropdown__init")) {
      for (let n = 0; n < dropdownWatchedExpands.length; n++) {
        if (event.target.closest(".dropdown__init") != dropdownWatchedInits[n]) {
          dropdownWatchedExpands[n].classList.remove("dropdown__show");
        } else {
          dropdownWatchedExpands[n].classList.toggle("dropdown__show");
        }
      }
      // if you click somewhere else, all watched dropdowns should close
    } else if (event.target.parentElement) {
      for (let z = 0; z < dropdownWatchedExpands.length; z++) {
        dropdownWatchedExpands[z].classList.remove("dropdown__show");
      }
    } else {
      // for dropdowns which are supposed to be independant
      return;
    }
  })
}

// form a list of class "dropdown__init"
let dropdownInits = document.querySelectorAll(".dropdown__init");
for (let dropdownInit of dropdownInits) {
  if (!dropdownInit.closest(".dropdown__watch")) {
    let dropdownParent = dropdownInit.parentElement;
    let dropdownExpanded = dropdownParent.querySelector(".dropdown__content");
    dropdownInit.addEventListener("click", () => {
      dropdownExpanded.classList.toggle("dropdown__show");
    });
  }
}