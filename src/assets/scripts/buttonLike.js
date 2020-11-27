let likeButtons = document.querySelectorAll('.buttonLike');

if (likeButtons){
    for (let likeButton of likeButtons){
        let number = likeButton.querySelector('.buttonLike__number');
        let heart = likeButton.querySelector('.buttonLike__heart');
        likeButton.addEventListener('click', ()=>{
            number.textContent = parseInt(number.textContent, 10) + 1;
            if (parseInt(number.textContent) > 9){
                likeButton.classList.add("buttonLike_popular");
                heart.classList.add("buttonLike__heart_popular");
            }
        })
    }
}