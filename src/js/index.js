require("@babel/polyfill");
import Search  from "./model/search";
import { elements, renderLoader , clearLoader} from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";


/**
 * web app tuluv
 * -Hailtiin query, ud dun
 * -Tuhain uzuulj baigaa jor
 * -Like-lasan joruud
 * -Zahialj baigaa jornii ortsuud
 */

const state ={};
const controlSearch = async () => {
    //1. Web-s hailtiin tulhuur ugiig gargaj avna jishee n pizza
    const query= searchView.getInput();
    
    if(query){
        //2. Shineer hailtiin object uusgej ugnu
        state.search = new Search(query);
    //3. Hailt hiihed zroiulj Interface beldene (UI)
        searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDev);

    //4. Hailtiig guistetgene
    await state.search.doSearch();
    //5. Hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if(state.search.result=== undefined) alert("Hailtaar ilertsgui...");
    else
    searchView.renderRecipes(state.search.result);
    }
   
};

elements.searchForm.addEventListener("submit", e => {
    //default uil ajillagaag n hiihgui bolgoh
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
    //Closest function n ugugdsun element-tei hamgiin oir baigaa element-iig gargaj ugnu
 const btn = e.target.closest(".btn-inline");
 if(btn){
    const gotoPageNumber =  parseInt(btn.dataset.goto,10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result,gotoPageNumber);
 }
});


const r = new Recipe(47746);
r.getRecipe();