require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highLightSelectedRecipe
} from "./view/recipeView";

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */

const state = {};
//Like -g haah


/**
 * Хайлтын контроллер = Model ==> Controller <== View
 */
const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = searchView.getInput();

  if (query) {
    // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
    state.search = new Search(query);

    // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/**
 * Жорын контролллер
 */
const controlRecipe = async () => {
  // 1) URL-аас ID-ийг салгаж
  const id = window.location.hash.replace("#", "");
   

  //URL deer ID baigaa eshiig shalgana
  if(id){
    // 2) Жорын моделийг үүсгэж өгнө.
  state.recipe = new Recipe(id);

  // 3) UI дэлгэцийг бэлтгэнэ.
  clearRecipe();
  renderLoader(elements.recipeDiv);
  highLightSelectedRecipe(id);

  // 4) Жороо татаж авчирна.
  await state.recipe.getRecipe();

  // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
  clearLoader();
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();

  // 6) Жороо дэлгэцэнд гаргана
  renderRecipe(state.recipe,state.likes.isLiked(id));
  }
};
["hashchange","load"].forEach(e =>window.addEventListener(e, controlRecipe));
//SHineer Like modek-iig app achaallah uyed uusgene
window.addEventListener("load", e => {
  if (!state.likes) state.likes= new Like();

  //Like tsesiig gargah esehiig shiideh
   likesView.togglelikeMenu(state.likes.getNumberOfLikes());

   //Like-uud baiva tedgeeriig nemej haruulna
   state.likes.likes.forEach(like => likesView.renderLike(like));
});

/*
Nairlaganii Controller
 */
const controlList =()=>{
    //Nairlagnii model-iig uusgene
  state.list = new List();

  // Umnu haragdaj baisan nairlaguudiig delgetsees alga bolgono
  listView.clearItems();

    //Ug model-ruu odoo haragdaj baigaa jornii buh nairlagiig avch hiine
state.recipe.ingredients.forEach(n => {
  //Tuhain nairlagiig model-ruu hiine
  const item = state.list.addItem(n);

  //Tuhain nairlagiig delgetsend gargana
  listView.renderItem(item);
});
}
/*
Like Controller
 */
 const controlLike = () =>{
  //1 Like-iin model-iig uusgene
  if (!state.likes) state.likes= new Like();

  //2 Odoo haragdaj baigaa Jor-iin ID-g olj avna
  const currentRecipeId = state.recipe.id;

  //3 Ene joriig like-lsan esehiig shalgah
  if(state.likes.isLiked(currentRecipeId)){
      //4 Like-lsan bol Like-iig n boiulna
      state.likes.deleteLike(currentRecipeId);
      //Like-iin tsesnees ustgana
      likesView.deleteLike(currentRecipeId);

      //Like tovchnii Like-lsan baidliig boliulah
       likesView.toggleLikeBtn(false);
   
  }else {
   //5  Like hiigdeegui bol Like bolgono
    const newLike = state.likes.addLike(
      currentRecipeId,
       state.recipe.title,
      state.recipe.publisher,
    state.recipe.image_url
  );
  //Like tsesend ene Like-iig oruulah
  likesView.renderLike(newLike);
  likesView.toggleLikeBtn(true);
 
  }
  likesView.togglelikeMenu(state.likes.getNumberOfLikes());
 }

elements.recipeDiv.addEventListener("click", e => {
  if(e.target.matches(".recipe__btn, .recipe__btn *")){
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")){
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", e => {
  //Click hiisen LI-iin data-itemid-ig n shuuj gargaj avah
  const id = e.target .closest(".shopping__item").dataset.itemid;

  // Oldson ID-tei ortsiig model-oos ustgana
  state.list.deleteItem(id);

  //Delgetsees deehi ID-tai ortsiig olj ustgana
    listView.deleteItem(id);
});