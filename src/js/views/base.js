//reusable code for the whole project
export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResList: document.querySelector(".results"),
    searchRes: document.querySelector(".results__list"),
    searchResPages: document.querySelector(".results__pages"),

}

export const elementStrings = {
    loader: 'loader',
};

// we pass the parent so we can attach this loader to the child element
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHMTL('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }

}