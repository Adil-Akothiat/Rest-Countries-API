const myCountry = document.querySelector('.country_');
const countryParams= new URLSearchParams(window.location.search).get('name');

async function extractData(api) {
    const response = await fetch(api);
    return await response.json();
}
addData();
function  addData() {
    extractData('https://restcountries.com/v2/all').then(function(countries) {
        getCountry();
        
        function getCountry() { 
            let getCountry = [];
            countries.forEach(country=> {
                if(country.name == countryParams) {
                    getCountry.push(country);
                }
            })
            let country = getCountry[0];


            function checkData(prop, code) {
                if(typeof country.currencies != 'undefined') {
                    return country[prop][0][code]
                }
            }

            const back = document.createElement('div');
            const btn = document.createElement('button');
            const arrow = document.createElement('img');
            const backEle = document.createElement('span');
            const mainDiv = document.createElement('div');
            const panel = document.createElement('img');
            const info = document.createElement('div');
            const other = document.createElement('div');
            const borders = document.createElement('div');
            const infos = document.createElement('div');
            const buttonDiv = document.createElement('div');
            const backAnchor = document.createElement('a');

            backAnchor.setAttribute('href', `/index.html`)
            back.setAttribute('class','btn');
            btn.classList.add('button_');
            arrow.setAttribute('src','./source/icons/back_ar.svg');    
            mainDiv.setAttribute('class','countri');
            info.setAttribute('class','gen_info');
            other.setAttribute('class','other');
            borders.setAttribute('class','borders');
            panel.setAttribute('src',country.flags.svg);
            infos.setAttribute('class','information');
            buttonDiv.setAttribute('class','button_div');

            const Name = document.createElement('h2');
            const nativeName = document.createElement('h5');
            const population = document.createElement('h5');
            const region = document.createElement('h5');
            const subRegion = document.createElement('h5');
            const capital = document.createElement('h5');
            const topLevel = document.createElement('h5');
            const currency = document.createElement('h5');
            const language = document.createElement('h5');
            const h5button = document.createElement('h5');

            backEle.textContent = 'back';
            Name.textContent = country.name;
            nativeName.innerHTML = `native name: <span>${country.nativeName}</span>`;
            population.innerHTML = `population: <span>${country.population}</span>`;
            region.innerHTML = `region: <span>${country.region}</span>`;
            subRegion.innerHTML = `sub region: <span>${country.subregion}</span>`;
            capital.innerHTML = `capital: <span>${country.capital}</span>`;
            topLevel.innerHTML = `top level domain: <span>${country.topLevelDomain}</span>`;
            currency.innerHTML = `currencies: <span>${checkData('currencies','code')}</span>`;
            language.innerHTML = `languages: <span>${checkData('languages','name')}</span>`;
            h5button.textContent = 'borders: ';
                        
            info.appendChild(Name);
            info.appendChild(nativeName);
            info.appendChild(population);
            info.appendChild(region);
            info.appendChild(subRegion);
            info.appendChild(capital);

            buttonDiv.appendChild(h5button);
            if(typeof country.borders != 'undefined') {
                country.borders.forEach(b=> {
                    const button = document.createElement('button');
                    const anchorBtn = document.createElement('a');
                    countries.forEach(cntr=> {
                        if(b == cntr.alpha3Code) {
                            anchorBtn.setAttribute('href', `/country.html?name=${cntr.name}`);
                        }
                    })
                    anchorBtn.appendChild(button)
                    button.setAttribute('class','btn_back');
                    button.textContent = b;
                    buttonDiv.appendChild(anchorBtn);
                });
            }
            other.appendChild(topLevel);
            other.appendChild(currency);
            other.appendChild(language);
            infos.appendChild(info);
            infos.appendChild(other);
            btn.appendChild(arrow);
            btn.appendChild(backEle);
            back.appendChild(btn);
            backAnchor.appendChild(back);
            mainDiv.appendChild(panel);
            mainDiv.appendChild(infos);
            mainDiv.appendChild(buttonDiv);
            myCountry.appendChild(backAnchor);
            myCountry.appendChild(mainDiv);
        }
    })
}