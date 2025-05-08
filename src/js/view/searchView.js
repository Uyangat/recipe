import { elements } from "./base";

//Private Function
const renderRecipe = recipe => {
    
    const markUp = `
     <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.title}</p>
                        </div>
                    </a>
                </li>
    `;
    //UL -ruugee nemne
    elements.searchResultList.insertAdjacentHTML("beforeend", markUp);
};
//Hailtiin utgiig hooson bolgodog function
export const clearSearchQuery =() =>{
    elements.searchInput.value="";
};
//Hailtaar garch irsen list-iig hoosoloh function
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
    elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;


export const renderRecipes = (recipes, currentPage = 1, resPerPage =10) => {

    //Hailtiin ur dung huudaslaj uzuuleh
    // page = 2,  start = 10, end = 20
    const start = (currentPage -1) * resPerPage;
    const end = currentPage * resPerPage;
    
    recipes.slice(start, end).forEach (renderRecipe);

    //Huudaslaltiin tovchnuudiig gargaj ireh
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
};


// type ===> "prev" , "next"
const createButton = (page , type,direction) => `
                <button class="btn-inline results__btn--${type}" data-goto = ${page}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                    <span>Хуудас ${page}</span>
                </button>`;

const renderButtons =　(currentPage, totalPages) =>{
    let buttonHtml;
    if (currentPage === 1 && totalPages > 1 ){
        //1r huudas deer baina, 2r huudas gedeg tovchiig garga
        buttonHtml = createButton(2 , "next", "right");
    }else if(currentPage < totalPages){
        // Umnuh bolon daaraachiin huudas ruu shilji tovchiig garga
        buttonHtml = createButton(currentPage-1, "prev","left");
        buttonHtml += createButton(currentPage+1 , "next","right");
    }
    else if(currentPage===totalPages){
        //Hamgiin suulchiiin huudas deer baina. Umnuh-ruu shiljuuleh tovchiig garga
        buttonHtml = createButton(currentPage-1 , "prev","left");
    }

    elements.pageButtons.insertAdjacentHTML("afterbegin",buttonHtml);
}
