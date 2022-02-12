import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import  { fetchCountries }  from './api/fetchCountries';
import countryCard from './templates/country-card.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList =  document.querySelector('.country-list');
const cardContainer =  document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));
let input = '';
 
function onTextInput(evt){
  evt.preventDefault();
  const input = evt.target.value.trim();
  console.log(input)   
  fetchCountries(input)
    .then((names) => {
      const numberOfCountries = names.length;
      if (numberOfCountries >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (numberOfCountries >= 2) {
        renderCountryList(names);
      }
      if(numberOfCountries===1) {
        renderCountryCard(names);
      }}
      
    )
    .catch(onFetchError);
    // .finally(() => inputEl.reset());
  
}

// Вариант для отрисовки списка стран

function renderCountryList(names) {
  const markup = names
    .map(({ name, flags }) => {
      return `<li>
          <p> ${flags.svg}</p>
          <p> ${name.official}</p>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
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
  const imgEl = document.querySelector('img');
  imgEl.style.marginTop = 'auto'; 
  imgEl.style.marginBottom = 'auto'; 
  const listLanguages = document.querySelector('.list-group');
  listLanguages.style.display = 'flex';
  const itemsLanguages = document.querySelectorAll('.list-group-item');
  const item = itemsLanguages
    .map((item) => item.style.listStyle = 'none');
  
  
  
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  // alert('Oops, there is no country with that name')
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

