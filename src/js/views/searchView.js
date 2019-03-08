// export is like "public" method
// just internal function is simply like "private"
// import is like using another class public method.

import { elements } from './base';

export const cleanInput = () => {elements.searchInput.value = ""};
export const cleanResultsList = () => {
    elements.searchResList.innerHTML = ""; // cleaning the recipes 
    elements.searchResPages.innerHTML = ""; // cleaning buttons prev\next
}


export const getInput = () => elements.searchInput.value;

// for title to be limited to 17 chars and then '...'
const limitRecipeTitle = function(title, limit = 17) {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }

            return acc + cur.length;
        }, acc = 0);
    
        return `${newTitle.join(' ')} ...`; // join takes an array and makes a string with the argument between each two elements
    }

    return title;
} // private function limitRecipeTitle;

const renderRecipe = function (recipe) {
    const markUp = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;

        elements.searchResList.insertAdjacentHTML('beforeend', markUp);

}; // renderRecipe

const createButton = (page, type /*prev or next*/) => 
//using HTML 5 data attribues feature here! "data-goto"...
`
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`;

// the buttons to move pages of results
const renderButtons = (page, numOfResults, resPerPage) => {
    const pages = Math.ceil(numOfResults / resPerPage);
    let button; 
    if(page === 1 && pages > 1) {
        //we are on page 1 out of many others:
        button = createButton(page, 'next');
    } else if(page === pages) {
         // last page 
         button = createButton(page, 'prev');
    } else if(page === pages && page > 1) {
         // some middle page
         button = `${createButton(page, 'prev')}
                   ${createButton(page, 'next')}`;
    }

    elements.searchResPages.insertAdjacentElement('afterbegin', button);
} // function renderButtons

// renderResults would put "resPerPage" from the "recipes" on the "page"
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results (recipes) of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage; /*im saying: start + resPerPage; */

    recipes.slice(start, end).forEach(renderRecipe);

    // render paging buttons (next prev buttons)
    renderButtton(page, recipes.length, resPerPage);
};