export default class ButtonPagination {
  constructor(data, containerId) {
    this.data = data
    this.paginationContainer = document.getElementById(containerId)
    this.pageButtons = document.createElement("div")
    this.pageButtons.classList.add("pagination__buttons")
    this.paginationContainer.prepend(this.pageButtons)

    this.paginationInfo = document.createElement("div")
    this.paginationInfo.classList.add("pagination__info")
    this.paginationContainer.append(this.paginationInfo)
    this.makePageButtons(this.data)
  }

  makePageButtons(state) {
    this.pageButtons.innerHTML = "";
    let maxLeft = (parseInt(state.currentNum) - parseInt(Math.floor(state.visibleNum / 2)));
    let leftDif = state.visibleNum - parseInt(Math.floor(state.visibleNum / 2)) - 1;
    let maxRight = (parseInt(state.currentNum) + leftDif);
    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = state.visibleNum;
    }
    if (maxRight > state.totalNum) {
      maxRight = state.totalNum;
      maxLeft = maxRight - (state.visibleNum - 1);
    }

    for (let i = maxLeft; i <= maxRight; i++) {
      this.pageButtons.appendChild(this.createPaginationButton(i));
    }

    if (state.currentNum == 1) {
      this.pageButtons.innerHTML = "";
      for (let j = 1; j <= 3; j++) {
        this.pageButtons.appendChild(this.createPaginationButton(j));
      }
      this.pageButtons.innerHTML = this.pageButtons.innerHTML + `<button value="4" class="pagination__item">...</button>`
    }

    if (state.currentNum <= 3) {
      this.pageButtons.innerHTML = this.pageButtons.innerHTML + `<button class="pagination__button_last">15</button>`
    }

    if (state.currentNum < maxRight) {
      this.pageButtons.innerHTML = this.pageButtons.innerHTML + `<button class="pagination__button_next"></button>`
    } else {
      this.pageButtons.innerHTML = `<button class="pagination__button_first">1</button>` + this.pageButtons.innerHTML;
    }

    if (state.currentNum > 3) {
      this.pageButtons.innerHTML =
        `<button class="pagination__button_prev"></button>` + this.pageButtons.innerHTML;
    }

    this.onButtonClick();
    this.onNavigationClick();
    this.addInfoLine();
  }


  //2. создать видимые кнопки по заданному алгоритму
  createPaginationButton(i) {
    let button = document.createElement("button");
    button.innerText = i;
    button.value = i;
    if (i == this.data.currentNum) {
      button.classList.add("pagination__button_current")
    } else {
      button.classList.add("pagination__item")
    }
    return button;
  }

  addInfoLine() {
    this.paginationInfo.innerHTML = "";
    let trimStart = (this.data.currentNum - 1) * this.data.itemsPerPage + 1;
    let trimEnd = trimStart + this.data.itemsPerPage - 1;
    this.paginationInfo.innerText = `${trimStart} – ${trimEnd} из 100+ вариантов аренды`;
    return this;
  }

  onButtonClick() {
    let buttonItems = this.pageButtons.getElementsByClassName("pagination__item");
    for (let z = 0; z < buttonItems.length; z++) {
      buttonItems[z].addEventListener("click", () => {
        this.data.currentNum = parseInt(event.target.value);
        this.makePageButtons(this.data);
      });
    }
    return this;
  }

  onNavigationClick() {
    if (this.data.currentNum < this.data.totalNum) {
      let buttonNext = this.pageButtons.querySelector(".pagination__button_next");
      buttonNext.addEventListener("click", () => {
        this.data.currentNum++;
        this.makePageButtons(this.data);
      })
    }
    if (this.data.currentNum > 3) {
      let buttonPrev = this.pageButtons.querySelector(".pagination__button_prev");
      buttonPrev.addEventListener("click", () => {
        this.data.currentNum--;
        this.makePageButtons(this.data);
      })
    }

    let buttonFirst = this.pageButtons.querySelector(".pagination__button_first");
    if (buttonFirst) {
      buttonFirst.addEventListener("click", () => {
        this.data.currentNum = 1;
        this.makePageButtons(this.data);
      })
    }

    let buttonLast = this.pageButtons.querySelector(".pagination__button_last");
    if (buttonLast) {
      buttonLast.addEventListener("click", () => {
        this.data.currentNum = 15;
        this.makePageButtons(this.data);
      })
    }

    return this;
  }
}