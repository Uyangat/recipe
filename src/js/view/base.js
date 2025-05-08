
// // yurunhii class-uudiig hadgalna
export const elements = {
    searchForm :document.querySelector(".search"),
    searchInput : document.querySelector(".search__field"),
    searchResultList : document.querySelector(".results__list"),
    searchResultDev : document.querySelector(".results")
};


export const elementStrings = {
    loader : "loader"
};

// unshiij duussan sum-iig arilgah
export const clearLoader =() =>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
        if(loader) loader.parentElement.removeChild(loader);
    
};

//ergeldej baigaa sum
export const renderLoader = parent =>{
    const loader = `
    <div class="${elementStrings.loader}">
    <svg>
    <use href = "img/icons.svg#icon-cw"</use>
    </svg>
    </div> 
    `;
parent.insertAdjacentHTML("afterbegin", loader);
}