import { getJSON, createDetailMarkup } from "./helper.js";

const detailBoxEl = document.querySelector('.detail-box');
const buttonBack = document.querySelector('.btn--back');
const id = window.location.hash.slice(1);

const RenderCountryDetail = async function () {
    const country = await getJSON(`https://restcountries.com/v2/alpha/${id}`);
    const markup = await createDetailMarkup(country);
    detailBoxEl.innerHTML = markup;
}

buttonBack.addEventListener('click', function () {
    window.history.back()
})
RenderCountryDetail();


