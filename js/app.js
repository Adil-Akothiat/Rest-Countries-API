const countriesDiv = document.querySelector('.countries');
const search = document.querySelector('input');
const filter = document.querySelector('select');
const myCountry = document.getElementsByClassName('country_content');
const srch = document.querySelector('.srch');
const mode = document.querySelector('.mode');
const icon = mode.firstElementChild;
const textIcon = mode.lastElementChild;
const loader = document.querySelector(".loader");

if(window.localStorage.getItem('body')) {
    document.body.classList.add(window.localStorage.getItem('body'));
    icon.src = window.localStorage.getItem('src');
    icon.alt = window.localStorage.getItem('alt');
    textIcon.textContent = window.localStorage.getItem('mode');
}

addData();
async function addData() {
    loader.style.display="block";
    return await extractData("https://restcountries.com/v2/all?fields=name,region,flags,population,capital,languages,nativeName").then(countries=> {
        countries.forEach((country)=> {
             if(country.name !=  'Israel') {
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
            mainDiv.onclick = ()=> {
                window.location.href = `${window.location.origin}/pages/country.html?name=${country.name}`;
            };

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
    }).finally(()=> {
        loader.style.display = "none";
    })
}

mode.addEventListener('click', setMode);
function setMode() {
    const modeSeted = mode.children[0];
    if(modeSeted.alt == 'light') {
        document.body.classList.add('dark');
        modeSeted.alt = 'dark';
        modeSeted.src = './assets/dark_.png';
        modeSeted.nextElementSibling.textContent = 'light mode';
        //local storage
        window.localStorage.setItem('body','dark');
        window.localStorage.setItem('alt','dark');
        window.localStorage.setItem('src','./assets/dark_.png');
        window.localStorage.setItem('mode','light mode');
    }else {
        document.body.classList.remove('dark');
        modeSeted.alt= 'light';
        modeSeted.src = './assets/light_.png';
        modeSeted.nextElementSibling.textContent = 'dark mode';
        //local storage
        window.localStorage.clear();
    }
}
