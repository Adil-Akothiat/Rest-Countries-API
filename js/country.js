const singleCountry = document.querySelector(".country_");
const myCountry = document.getElementsByClassName("country_content");
const loader = document.querySelector(".loader");

const urlObj = new URL(window.location.href);
const getNativeName = (country)=> {
    if(country?.name?.nativeName) {
        const name = Object.values(country?.name?.nativeName)[0]?.common;
        return name;
    }
    return "__";
}
const getCurrency = (country)=> {
    if(country?.currencies) {
        const currency = Object.values(country?.currencies)[0]?.name;
        return currency;
    }
    return "__"
}
const getLanguage = (country)=> {
    if(country?.languages) {
        const language = Object.values(country?.languages)[0];
        return language;
    }
    return "__";
}

getCountry();
function getCountry() {
  const name = urlObj.searchParams.get("name");
  loader.style.display="block";
  extractData(`https://restcountries.com/v3.1/name/${name}`).then(
    (countries) => {
      const country = countries[0];
        if(country?.name?.common?.toLowerCase() == "israel") {
            throw new Error("Country not found!");
        }
      document.title = country.name.common;
      const back = document.createElement("div");
      const btn = document.createElement("button");
      const arrow = document.createElement("img");
      const backEle = document.createElement("span");
      const mainDiv = document.createElement("div");
      const panel = document.createElement("img");
      const info = document.createElement("div");
      const other = document.createElement("div");
      const borders = document.createElement("div");
      const infos = document.createElement("div");
      const buttonDiv = document.createElement("div");

      back.setAttribute("class", "btn");
      btn.classList.add("button_");
      arrow.setAttribute("src", "../assets/back_ar.svg");
      mainDiv.setAttribute("class", "countri");
      info.setAttribute("class", "gen_info");
      other.setAttribute("class", "other");
      borders.setAttribute("class", "borders");
      panel.setAttribute("src", country.flags.svg);
      infos.setAttribute("class", "information");
      buttonDiv.setAttribute("class", "button_div");

      const Name = document.createElement("h2");
      const nativeName = document.createElement("h5");
      const population = document.createElement("h5");
      const region = document.createElement("h5");
      const subRegion = document.createElement("h5");
      const capital = document.createElement("h5");
      const topLevel = document.createElement("h5");
      const currency = document.createElement("h5");
      const language = document.createElement("h5");
      const h5button = document.createElement("h5");

      backEle.textContent = "back";
      Name.textContent = country.name.common;
      nativeName.innerHTML = `native name: <span>${getNativeName(country)}</span>`;
      population.innerHTML = `population: <span>${country.population}</span>`;
      region.innerHTML = `region: <span>${country.region}</span>`;
      subRegion.innerHTML = `sub region: <span>${country.subregion}</span>`;
      capital.innerHTML = `capital: <span>${country.capital}</span>`;
      currency.innerHTML = `currencies: <span>${getCurrency(country)}</span>`;
      language.innerHTML = `languages: <span>${getLanguage(country)}</span>`;
      h5button.textContent = "borders: ";

      info.appendChild(Name);
      info.appendChild(nativeName);
      info.appendChild(population);
      info.appendChild(region);
      info.appendChild(subRegion);
      info.appendChild(capital);

      buttonDiv.appendChild(h5button);
      if (typeof country.borders != "undefined") {
        country.borders
          .filter((b) => b.toLowerCase() != "isr")
          .forEach((b) => {
            const button = document.createElement("button");
            button.setAttribute("class", "country_content");
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

      const backB = document.querySelector(".button_");
      backB.onclick = ()=> window.history.back();
    }
  ).catch(()=> {
    window.location.href=window.location.origin+"/pages/notFound.html";
  }).finally(()=> {
    loader.style.display="none";
  })
}