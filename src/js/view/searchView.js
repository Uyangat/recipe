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
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    //undefined
    recipes.forEach (renderRecipe);
};
