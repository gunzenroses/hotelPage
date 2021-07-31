class roomsMaker{
    constructor(data){
        this.data = data
        this.roomsContainer = document.querySelector(".search-room__result");
        this.paginationContainer = this.roomsContainer.parentElement.querySelector(".search-room__pagination")
        this.currentData = []
        this.init()
    }

    init(){
        //this.render()
        this.createChildren()
        this.enableHandlers()
        this.addEventListener()
        this.render(1)
        return this;
    }

    createChildren(){
        this.btns = this.paginationContainer.querySelector(".pagination__buttons");
        return this;
    }

    enableHandlers(){
        this.countCurrentNumHandler = this.countCurrentNum.bind(this);
        return this;
    }

    addEventListener(){
        this.btns.addEventListener("click", this.countCurrentNumHandler);
        return this;
    }

    countCurrentNum(){
        this.currentBtn = this.paginationContainer.querySelector(".pagination__button_current");
        this.currentNum = parseInt(this.currentBtn.innerText) - 1;
        this.render(this.currentNum);
        // найти чему равна текущая страница
        // найти this.currentData = ... this.data.split[]
        //инициировать рендеринг
        return this;
    }

    render(currentNum){
        this.roomsContainer.innerHTML = ""; 
        let startNum = parseInt(currentNum)*12;
        let endNum = parseInt(startNum) + 12;
        let renderedData = this.data.slice(startNum, endNum)
        
        renderedData.map(data => {
            return (
                this.roomsContainer.innerHTML += 
                `
                    <li class="card__room">
                        <article class="room-carousel">
                            <div class="room-carousel__radio">
                                <label class="room-carousel__element">
                                    <input class="room-carousel__radio_real" type="radio" checked="checked" name="room ${data.number}" value="picture_1"/>
                                    <div class="room-carousel__radio_fake"></div>
                                </label>
                                <label class="room-carousel__element">
                                    <input class="room-carousel__radio_real" type="radio" name="room ${data.number}" value="picture_2"/>
                                    <div class="room-carousel__radio_fake"></div>
                                </label>
                                <label class="room-carousel__element">
                                    <input class="room-carousel__radio_real" type="radio" name="room ${data.number}" value="picture_3"/>
                                    <div class="room-carousel__radio_fake"></div>
                                </label>
                                <label class="room-carousel__element">
                                    <input class="room-carousel__radio_real" type="radio" name="room ${data.number}" value="picture_4"/>
                                    <div class="room-carousel__radio_fake"></div>
                                </label>
                            </div>
                            <div class="room-carousel__pictures">
                                <div class="room-carousel__pic">
                                    <img src=${data.src[1]} alt="room pictures">
                                </div>
                                <div class="room-carousel__pic">
                                    <img src=${data.src[2]} alt="room pictures">
                                </div>
                                <div class="room-carousel__pic">
                                    <img src=${data.src[3]} alt="room pictures">
                                </div>
                                <div class="room-carousel__pic">
                                    <img src=${data.src[4]} alt="room pictures">
                                </div>
                            </div>
                            <div class="room-carousel__btn">
                                <div class="room-carousel__btn_prev"></div>
                                <div class="room-carousel__btn_next"></div>
                            </div>
                        </article>
                        <article class="room__info">
                            <section class="booking__row_small">
                                <div class="booking__text_left">
                                    <span class="booking__text_sign">№</span>
                                    <span class="booking__text_number">${data.number}</span>
                                    <span class="booking__text_type">${data.type}</span>
                                </div>
                                <div class="booking__text_right">
                                    <span class="booking__text_price">${data.price}</span>
                                    <span class="booking__text_period"> в сутки</span>
                                </div>
                            </section>
                            <span class="room__line"></span>
                            <section class="booking__row_small">
                                <div class="button-rate">
                                    <label class="input_label" for="star5-${data.number}"></label>
                                    <input class="input_rate" type="radio" id="star5-${data.number}" name="rating${data.number}" checked=${data.rating[0]} value="5">
                                    <label class="input_label" for="star4-${data.number}"></label>
                                    <input class="input_rate" type="radio" id="star4-${data.number}" name="rating${data.number}" checked=${data.rating[1]} value="4">
                                    <label class="input_label" for="star3-${data.number}"></label>
                                    <input class="input_rate" type="radio" id="star3-${data.number}" name="rating${data.number}" checked=${data.rating[2]} value="3">
                                    <label class="input_label" for="star2-${data.number}"></label>
                                    <input class="input_rate" type="radio" id="star2-${data.number}" name="rating${data.number}" checked=${data.rating[3]} value="2">
                                    <label class="input_label" for="star1-${data.number}"></label>
                                    <input class="input_rate" type="radio" id="star1-${data.number}" name="rating${data.number}" checked=${data.rating[4]} value="1">
                                </div>
                                <div class="booking__text_right">
                                    <span class="booking__text_price">${data.review}</span>
                                    <span>&nbsp;</span>
                                    <span class="booking__text_review">Отзывов</span>
                                </div>
                            </section>
                        </article>
                    </li>
                `
            )
        })


    }
}

export { roomsMaker }