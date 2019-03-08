import Search from './models/Search';
import * as searchView from './views/searchView'; // searchView will hold all of the methods and properties of the searchView.js obviously
import { elements, renderLoader, clearLoader } from './views/base';

// Global state of the app
const state = {
   //search: null, // the search object, holds the query and the search result from the server

};

const controlSearch = async function(e) {
    e.preventDefault(); // to prevent the whole page to reload onclick
    // 1. get query from the view
    const query = searchView.getInput(); 

    if(query) {
         // 2. request the server with this query (creating a new search instance that encapsulate the request and stores it in this.result)
         state.search = new Search(query);
         //why not here immediately start fetching data from server? (await state.searh.getResults)?
         
         // 3. clean the input field
         searchView.cleanInput();

         // 3.1. clean the result list from optinoal previous results
         searchView.cleanResultsList();

         // 3.1.1 display the loader spining
         renderLoader(elements.searchRes);
        
         await state.search.getResults();

         clearLoader();
         // 4. display the response result in the view along the page
         searchView.renderResults(state.search.result);
    }  else {

    } // else
}; // controlSearch async function

// eventListeners repository:
elements.searchForm.addEventListener('submit', controlSearch);


// using Event Deligation. the prev/next button of the paging yet ***doesn't exist***, so their first existing parent (result__pages) will catch the event: 
// using the "closest" method. no matter where inside the button I will click (the text, the symbol, background) => it'll work.
// e.target.closest('.btn-inline') returns the closest ancestor of the current element which matches the selectors given in parameter ('.btn-inline').
elements.searchResPages.addEventListener('click', e => {
    // e.target is the element who trigerred the event. we only added it to 'searchResPages' cause the event was delegated to him,
    // cause the button was not created by the time we wanted to add the event to i.
    const button = e.target.closest('.btn-inline'); // closest lets you get reference to the element 
    if(button) {
        const goToPage = parseInt(button.dataset.goto, base = 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
});
