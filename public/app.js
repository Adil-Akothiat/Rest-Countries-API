const countriesDiv = document.querySelector('.countries');
const search = document.querySelector('input');
const filter = document.querySelector('select');
const myCountry = document.getElementsByClassName('country_content');
const srch = document.querySelector('.srch');
async function extractData(api) {
    const response = await fetch(api);
    return await response.json();
}
addData();
function addData() {
    return extractData("https://restcountries.com/v2/all").then(countries=> {
        countries.forEach(country=> {
           if(country.name !=  'Israel') {
            const mainDiv = document.createElement('div');
            const infoDiv = document.createElement('div');
            const CountryFlag = document.createElement('img');
            const countryName = document.createElement('h2');
            const countryPopulation = document.createElement('h5');
            const countryRegion = document.createElement('h5');
            const countryCapital = document.createElement('h5');
            const anchor = document.createElement('a');
            const anchorImg = document.createElement('a')

            anchor.setAttribute('href', `/country.html?name=${country.name}`);
            anchorImg.setAttribute('href', `/country.html?name=${country.name}`);

            mainDiv.setAttribute('class',`country_content ${country.region} ${country.alpha3Code}`);
            infoDiv.setAttribute('class','info');
            CountryFlag.setAttribute('src', `${country.flags.svg}`);
            countryName.textContent = country.name;
            countryPopulation.innerHTML = `population: <span>${country.population}</span>`;
            countryRegion.innerHTML = `region: <span>${country.region}</span>`;
            countryCapital.innerHTML = `capital: <span>${country.capital}</span>`;

            infoDiv.appendChild(countryName);
            infoDiv.appendChild(countryPopulation);
            infoDiv.appendChild(countryRegion);
            infoDiv.appendChild(countryCapital);
            anchorImg.appendChild(CountryFlag);
            mainDiv.appendChild(anchorImg);
            anchor.appendChild(infoDiv);
            mainDiv.appendChild(anchor);
            countriesDiv.appendChild(mainDiv);


            searchData();
            function searchData() {
                search.onkeydown = ()=> {
                    let Data = search.value.toLocaleLowerCase();
                    for(i=0;i<myCountry.length;i++) {
                        myCountry[i].classList.add('remove');
                        let myCnt = myCountry[i].lastElementChild.firstElementChild.textContent.toLocaleLowerCase();
                        if(myCnt.includes(Data)) {
                            myCountry[i].classList.remove('remove');
                        }
                    }
                }
            };
            filterData();
            function filterData() {
                filter.onchange = function() {
                    const region = filter.options[filter.selectedIndex].value;
                    for(i=0;i<myCountry.length;i++){
                        myCountry[i].classList.add('remove');
                        if(myCountry[i].classList[1].toLocaleLowerCase() === region) {
                            myCountry[i].classList.remove('remove');
                        }
                        if(region === 'default') {
                            myCountry[i].classList.remove('remove');
                        }
                    }
                }
            }
           }
        })
    });
}
