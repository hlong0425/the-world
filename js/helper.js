const getJSON = function (url) {
    try {
        return fetch(url)
            .then(respone => {
                if (!respone.ok) {
                    throw new Error(`${respone.status} ${respone.statusText}`);
                }
                return respone.json()

            })
    }
    catch (err) {
        throw new Error(err);
    }
}

const createMarkup = function (countries) {
    return countries.map(country => {
        return `
        <div class="card" data-id= ${country.alpha3Code || country.alpha2Code}>
            <div class="card__img">
                <img src="${country.flags.png}" alt="">
            </div>
            <div class="card__info">
                <h3 class="heading-tertiary">
                    <span class="country--name">
                        ${country.name}
                    </span>
                </h3>
                <p class="card__detail">Population: <span
                        class="country__data country__data--population">${country.population}</span></p>
                <p class="card__detail">Region: <span class="country__data country__data--region">${country.region}</span>
                </p>
                <p class="card__detail">Capital: <span
                        class="country__data country__data--capital">${country.capital}</span></p>
            </div>
        </div>`
    }).join("");
}


const createBorderMarkup = async function (borders) {
    if (!borders) return 'not updated yet';
    let html = "";
    for (let i = 0; i < borders.length; i++) {
        const country = await getJSON(`https://restcountries.com/v2/alpha/${borders[i]}`);
        html += `<div class="tag">${country.name}</div>`;
    }

    return html;

}

const createDetailMarkup = async function (country) {
    console.log(country);
    return `
    <div class="flag">
        <img src="${country.flag}" alt="${country.name} flag">
    </div>

    <div class="infomation">
        <h3 class="infomation-name">${country.name}</h3>
        <div class="infomation-detail">
            <div>
                <div class="infomaton__detail__title">Native Name: <span class="country__data">${country.nativeName}</span>
                </div>
                <div class="infomaton__detail__title">Population: <span class="country__data">${country.population}</span>
                </div>

                <div class="infomaton__detail__title">Region: <span>${country.region}</span></div>
                <div class="infomaton__detail__title">Sub Region: <span class="country__data">${country.subregion}</span></div>

                <div class="infomaton__detail__title">Capital: <span class="${country.capital}">Brussels</span></div>

            </div>

            <div>
                <div class="infomaton__detail__title">
                Top Level Domain <span class="country__data">${country.topLevelDomain.join(',')}</span>
                </div>

                <div class="infomaton__detail__title">Currencies: <span class="country__data">${country.currencies[0].name}</span>
                </div>

                <div class="infomaton__detail__title">Languages: <span class="country__data">${country.languages.map(lang => lang.name).join(",")}</span>
                </div>
            </div>
        </div>

        <div class="borders">
            <div class="infomaton__detail__title">
                <div class="infomaton__detail__title">Boder Countries:</div>
                <div class="tags">
                    ${await createBorderMarkup(country.borders)}
                </div>
            </div>
        </div>

    </div>`
}

export { getJSON, createMarkup, createDetailMarkup }; 
