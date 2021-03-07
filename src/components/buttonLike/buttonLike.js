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

export { likeButtons }