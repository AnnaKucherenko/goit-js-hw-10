import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import  { fetchCountries }  from './api/fetchCountries';
import countryCard from './templates/country-card.hbs';
import listOfRelevantCountries from './templates/contries-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList =  document.querySelector('.country-list');
const cardContainer = document.querySelector('.country-info');
const imgEl = document.querySelector('img');
inputEl.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));
let input = '';
 
function onTextInput(evt){
  evt.preventDefault();
  const input = evt.target.value.trim();
  if (input.length === 0) {
    clearCountryList();
    clearCountryInfo();
     Notiflix.Notify.failure('Oops, there is no country with that name');
  } else {
    fetchCountries(input)
    .then((names) => {
      const numberOfCountries = names.length;
      if (numberOfCountries >= 10) {
          clearCountryList();
          clearCountryInfo();
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
      if (numberOfCountries>= 2) {
          renderCountryList(names);
          clearCountryInfo();
      }
      if (numberOfCountries === 1) {
        clearCountryList();
        renderCountryCard(names);
      }}
    )
    .catch(onFetchError);
  }
  
}

const clearCountryList = () => {
  countryList.innerHTML = '';
}
const clearCountryInfo = () => {
  cardContainer.innerHTML = '';
}
// Вариант для отрисовки списка стран

function renderCountryList(name) {
  const markup = listOfRelevantCountries(name);
  countryList.innerHTML = markup;
  imgEl.classList.add(img - country);
}

// Вариант для отрисовки карточки одной страны
function renderCountryCard(name) {
  const markup = countryCard(name);
  cardContainer.innerHTML = markup;
  const containerCardImg = document.querySelector('.card-img-top');
  containerCardImg.style.display = 'flex';
  const cardTitle = document.querySelector('.card-title');
  cardTitle.style.margin = '0px';
  cardTitle.style.marginLeft = '20px';
  imgEl.classList.add(img - country);
  const listLanguages = document.querySelector('.list-group');
  listLanguages.style.display = 'flex';
  listLanguages.style.marginLeft = "10px"
  const languages = document.querySelector('.card-languages');
  languages.style.display = 'flex';
     
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

