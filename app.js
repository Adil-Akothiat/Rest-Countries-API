const countriesDiv = document.querySelector('.countries');
const search = document.querySelector('input');
const filter = document.querySelector('select');
const myCountry = document.getElementsByClassName('country_content');
const singleCountry = document.querySelector('.country_');
const srch = document.querySelector('.srch');
const mode = document.querySelector('.mode');
const icon = mode.firstElementChild;
const textIcon = mode.lastElementChild;

if(window.localStorage.getItem('body')) {
    document.body.classList.add(window.localStorage.getItem('body'));
    icon.src = window.localStorage.getItem('src');
    icon.alt = window.localStorage.getItem('alt');
    textIcon.textContent = window.localStorage.getItem('mode');
}

async function extractData(api) {
    const response = await fetch(api);
    return await response.json();
}

addData();
function addData() {
    return extractData("https://restcountries.com/v2/all").then(countries=> {
        countries.forEach(country=> {
            const mainDiv = document.createElement('div');
            const infoDiv = document.createElement('div');
            const CountryFlag = document.createElement('img');
            const countryName = document.createElement('h2');
            const countryPopulation = document.createElement('h5');
            const countryRegion = document.createElement('h5');
            const countryCapital = document.createElement('h5');

            mainDiv.setAttribute('class',`country_content ${country.region}`);
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
            mainDiv.appendChild(CountryFlag);
            mainDiv.appendChild(infoDiv);
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
        })
    });
}

addSinglData();
function addSinglData() {
    extractData("https://restcountries.com/v2/all").then(countries=> {
        for(i=0;i<myCountry.length;i++) {
            myCountry[i].onclick = function() {
                let curr = this;
                this.classList.add('this');
                document.querySelectorAll('.country_content').forEach(e=> e.classList.add('remove'));
                srch.classList.add('rm_search');
                singleCountry.classList.remove('remove');

                countries.forEach(country=> {

                    
                    function checkData(prop, code) {
                        if(typeof country.currencies != 'undefined') {
                            return country[prop][0][code]
                        }
                    }

                    if(country.name ==  curr.children[1].children[0].textContent) {
                        document.title = country.name;
                        window.location = `http://127.0.0.1:5500/index.html#/${country.name}`;
                        // console.log(window.location.pathname)
                        // document.URL = '';
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
                                button.setAttribute('class','country_content');
                                button.textContent = b;
                                buttonDiv.appendChild(button);
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

                        mainDiv.appendChild(panel);
                        mainDiv.appendChild(infos);
                        mainDiv.appendChild(buttonDiv);

                        singleCountry.appendChild(back);
                        singleCountry.appendChild(mainDiv);

                        const backB = document.querySelector('.button_');
                        backB.onclick = function() {
                            document.title = 'REST COUNTRIES API';
                            window.location = 'http://127.0.0.1:5500/index.html'
                            singleCountry.removeChild(back);
                            singleCountry.removeChild(mainDiv);
                            document.querySelectorAll('.country_content').forEach(e=> e.classList.remove('remove'));
                            srch.classList.remove('rm_search');
                        }
                    }
                })
            }
        }
    })
}

mode.addEventListener('click', setMode);
function setMode() {
    const modeSeted = mode.children[0];
    if(modeSeted.alt == 'light') {
        document.body.classList.add('dark');
        modeSeted.alt = 'dark';
        modeSeted.src = './source/icons/dark_.png';
        modeSeted.nextElementSibling.textContent = 'light mode';
        //local storage
        window.localStorage.setItem('body','dark');
        window.localStorage.setItem('alt','dark');
        window.localStorage.setItem('src','./source/icons/dark_.png');
        window.localStorage.setItem('mode','light mode');
    }else {
        document.body.classList.remove('dark');
        modeSeted.alt= 'light';
        modeSeted.src = './source/icons/light_.png';
        modeSeted.nextElementSibling.textContent = 'dark mode';
        //local storage
        window.localStorage.clear();
    }
}