require("@babel/polyfill");
import Search  from "./model/search";
import { elements, renderLoader , clearLoader} from "./view/base";
import * as searchView from "./view/searchView";


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
    if(state.search.result=== undefined) alert("Hailt ilertsgui...")
    searchView.renderRecipes(state.search.result);
    }
   
};

elements.searchForm.addEventListener("submit", e => {
    //default uil ajillagaag n hiihgui bolgoh
    e.preventDefault();
    controlSearch();
})
