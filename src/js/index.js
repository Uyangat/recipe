require("@babel/polyfill");
import Search  from "./model/search";

let search = new Search ("pasta");

// search JS dotorhi doSearch Async function- n promise butsaah tul terniig n barij avah
search.doSearch().then(r => console.log(r));
