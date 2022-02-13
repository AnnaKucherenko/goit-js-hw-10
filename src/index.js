import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import  { fetchCountries }  from './api/fetchCountries';
import countryCard from './templates/country-card.hbs';
import listOfRelevantCountries from './templates/contries-list.hbs';
import getRefs from './get-refs';

const refs = getRefs();

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));
// let input = '';
 
function onTextInput(evt){
  evt.preventDefault();
  const input = evt.target.value.trim();
  if (refs.inputEl.value.trim() === '') {
    clearCountryList();
    clearCountryInfo();
    return
  } 
  fetchCountries(refs.inputEl.value.trim())
    .then(names => {
      const numberOfCountries = names.length;
      if (numberOfCountries >= 10) {
          clearCountryList();
          clearCountryInfo();
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else 
      if (numberOfCountries>= 2) {
          renderCountryList(names);
          clearCountryInfo();
      } else
      if (numberOfCountries === 1) {
        clearCountryList();
        renderCountryCard(names);
      }
      
    })
    .catch(onFetchError);
  }
  
const clearCountryList = () => {
  refs.countryList.innerHTML = '';
}
const clearCountryInfo = () => {
  refs.cardContainer.innerHTML = '';
}
// Вариант для отрисовки списка стран

function renderCountryList(name) {
  const markup = listOfRelevantCountries(name);
  refs.countryList.innerHTML = markup;
  imgEl.classList.add(img - country);
}

// Вариант для отрисовки карточки одной страны
function renderCountryCard(name) {
  const markup = countryCard(name);
  refs.cardContainer.innerHTML = markup;
  refs.containerCardImg.style.display = 'flex';
  refs.cardTitle.style.margin = '0px';
  refs.cardTitle.style.marginLeft = '20px';
  refs.imgEl.classList.add(img - country);
  refs.listLanguages.style.display = 'flex';
  refs.listLanguages.style.marginLeft = "10px"
  refs.languages.style.display = 'flex';
     
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
















// function renderCountryCard(names) {
//   const markup = names.map(({name,capital,population,flags,languages}) => {
//     return `<div class="card">
//   <div class="card-img-top">
//     <img src="${flags.svg}" alt="flag">
//     <h2 class="card-title">${name.official}</h2>
//   </div>
//   <div class="card-body">
//     <p class="card-text">Capital: ${capital}</p>
//     <p class="card-text">Population: ${population}</p>

//     <p class="card-text"><b>languages:</b>
//     <ul class="list-group">
      
//       <li class="list-group-item">${languages}</li>
    
//     </ul > 
//     </p >
    
//   </div>
// </div>`
//   }

//   )
// }

