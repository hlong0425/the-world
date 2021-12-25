const cards = document.querySelector('.cards');
const formSearch = document.querySelector('form');
const formSearchInput = document.querySelector('.form-input');
import { getJSON, createMarkup } from "./helper.js";



let countriesData = [];
const RenderAllCountry = async function () {
    try {
        const countries = await getJSON('https://restcountries.com/v2/all');
        const markup = createMarkup(countries);
        cards.innerHTML = markup;
        countriesData = countries;
    }
    catch (err) {
        console.log(err);
    }
}



const renderSearchProcess = function () {
    formSearch.addEventListener('submit', async function (e) {
        e.preventDefault();
        const input = formSearchInput.value;
        if (!input) return;
        try {
            const countries = await getJSON(`https://restcountries.com/v2/name/${input}`);
            const markup = createMarkup(countries);
            cards.innerHTML = markup;

            // assign countries global scope; 
            countriesData = countries;

        }
        catch (err) {
            console.log(err);
        }
    })
}

const filterProcess = function () {
    //Add filter toggle
    const filterEl = document.querySelector('.filter-field');
    filterEl.addEventListener('click', function (e) {
        this.classList.toggle('filter-field--open');

        if (e.target.classList.contains('option')) {
            const region = e.target.dataset.region;
            const SortByRegion = countriesData.filter(country => country.region === region);
            const markup = createMarkup(SortByRegion);
            cards.innerHTML = markup;

        }
    })

}

const detailCountryProcess = function () {
    const cards = document.querySelector('.cards');

    cards.addEventListener('click', function (e) {
        const country = e.target.closest('.card');
        if (!country) return;

        const id = country.dataset.id;
        console.log(window.location.href = `detail/#${id}`);
    })
}







RenderAllCountry();
renderSearchProcess();
filterProcess();
detailCountryProcess();



export { countriesData }

