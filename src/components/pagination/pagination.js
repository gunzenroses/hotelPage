import { paginationData1 } from 'Main/assets/scripts/MyData';

export default class ButtonPagination {
  constructor(id, data) {
    this.data = data || paginationData1;
    this.num = this.data.currentNum;
    this.createContainer(id);
    this.init();
  }

  createContainer(id) {
    this.paginationContainer = document.getElementById(id);
    this.pageButtons = document.createElement('div');
    this.pageButtons.classList.add('pagination__buttons');
    this.paginationContainer.prepend(this.pageButtons);

    this.paginationInfo = document.createElement('div');
    this.paginationInfo.classList.add('pagination__info');
    this.paginationContainer.append(this.paginationInfo);
  }

  init() {
    this.render();
    this.createChildren();
    this.setupHandlers();
    this.enable();
  }

  createChildren() {
    this.buttonItems = Array.from(this.pageButtons.querySelectorAll('.pagination__item'));
    this.buttonFirst = this.pageButtons.querySelector('.pagination__button_first');
    this.buttonLast = this.pageButtons.querySelector('.pagination__button_last');
    this.buttonNext = (this.num < this.data.totalNum)
      ? this.pageButtons.querySelector('.pagination__button_next')
      : null;
    this.buttonPrev = (this.num > 3)
      ? this.pageButtons.querySelector('.pagination__button_prev')
      : null;
  }

  setupHandlers() {
    this.onButtonClickHandler = this.onButtonClick.bind(this);
    this.onButtonNextHandler = this.onButtonNextClick.bind(this);
    this.onButtonPrevHandler = this.onButtonPrevClick.bind(this);
    this.onButtonFirstHandler = this.onButtonFirstClick.bind(this);
    this.onButtonLastHandler = this.onButtonLastClick.bind(this);
  }

  enable() {
    this.buttonItems.map((item) => item.addEventListener('click', this.onButtonClickHandler));
    if (this.buttonNext) this.buttonNext.addEventListener('click', this.onButtonNextHandler);
    if (this.buttonPrev) this.buttonPrev.addEventListener('click', this.onButtonPrevHandler);
    if (this.buttonFirst) this.buttonFirst.addEventListener('click', this.onButtonFirstHandler);
    if (this.buttonLast) this.buttonLast.addEventListener('click', this.onButtonLastHandler);
  }

  render() {
    this.pageButtons.innerHTML = '';
    this.countMinMax();
    this.makeNumberButtons();
    this.makeNavigationButtons();
    this.makeInfoLine();
  }

  countMinMax() {
    this.min = (parseInt(this.num, 10) - parseInt(Math.floor(this.data.visibleNum / 2), 10));
    this.leftDif = this.data.visibleNum - parseInt(Math.floor(this.data.visibleNum / 2), 10) - 1;
    this.max = (parseInt(this.num, 10) + this.leftDif);

    if (this.min < 1) {
      this.min = 1;
      this.max = this.data.visibleNum;
    }

    if (this.max > this.data.totalNum) {
      this.max = this.data.totalNum;
      this.min = this.max - (this.data.visibleNum - 1);
    }
  }

  makeNumberButtons() {
    const starting = (this.num === 1) ? 1 : this.min;
    const ending = (this.num === 1) ? 3 : this.max;

    for (let i = starting; i <= ending; i += 1) {
      this.pageButtons.appendChild(this.addButton(i));
    }
  }

  addButton(i) {
    const button = document.createElement('button');
    button.innerText = i;
    button.value = i;
    if (i === this.num) {
      button.classList.add('pagination__button_current');
    } else {
      button.classList.add('pagination__item');
    }
    return button;
  }

  makeNavigationButtons() {
    if (this.num === 1) this.addRestButton();
    if (this.num <= 3) this.addLastButton();
    if (this.num < this.max) {
      this.addNextButton();
    } else {
      this.addFirstButton();
    }
    if (this.num > 3) this.addPrevButton();
  }

  addRestButton() {
    this.pageButtons.innerHTML = `${this.pageButtons.innerHTML}<button value="4" class="pagination__item">...</button>`;
  }

  addLastButton() {
    this.pageButtons.innerHTML = `${this.pageButtons.innerHTML}<button class="pagination__button_last">15</button>`;
  }

  addPrevButton() {
    this.pageButtons.innerHTML = `<button class="pagination__button_prev"></button>${this.pageButtons.innerHTML}`;
  }

  addNextButton() {
    this.pageButtons.innerHTML = `${this.pageButtons.innerHTML}<button class="pagination__button_next"></button>`;
  }

  addFirstButton() {
    this.pageButtons.innerHTML = `<button class="pagination__button_first">1</button>${this.pageButtons.innerHTML}`;
  }

  makeInfoLine() {
    this.paginationInfo.innerHTML = '';
    const trimStart = (this.num - 1) * this.data.itemsPerPage + 1;
    const trimEnd = trimStart + this.data.itemsPerPage - 1;
    this.paginationInfo.innerText = `${trimStart} – ${trimEnd} из 100+ вариантов аренды`;
  }

  onButtonClick(e) {
    this.num = parseInt(e.target.value, 10);
    this.init();
  }

  onButtonNextClick() {
    this.num += 1;
    this.init();
  }

  onButtonPrevClick() {
    this.num -= 1;
    this.init();
  }

  onButtonFirstClick() {
    this.num = 1;
    this.init();
  }

  onButtonLastClick() {
    this.num = 15;
    this.init();
  }
}
