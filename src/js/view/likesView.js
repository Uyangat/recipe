import { elements } from "./base";

export const toggleLikeBtn = isLiked =>
{
    const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
    document.querySelector(".recipe__love use").setAttribute("href" ,`img/icons.svg#${iconString}`)
};

export const togglelikeMenu = numLikes =>{
    elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

//like hiigdsen menu-g Like-iin doorhi L deer haruulah
export const renderLike = newLike => {
    const html =`<li>
                    <a class="likes__link" href="#${newLike.id}">
                        <figure class="likes__fig">
                            <img src="${newLike.img}" alt="Test">
                        </figure>
                        <div class="likes__data">
                            <h4 class="likes__name">${newLike.title}</h4>
                            <p class="likes__author">${newLike.publisher}</p>
                        </div>
                    </a>
                </li>`;
                elements.likesList.insertAdjacentHTML("beforeend", html);
};

// Like -lasan list-ees like-aa bolih uyed delete hiih
export const deleteLike = id =>{
    const li = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (li)li.parentElement.removeChild(li);
}
