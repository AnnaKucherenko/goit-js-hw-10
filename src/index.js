import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import './css/styles.css';
import  { fetchCountries }  from './api/fetchCountries';
import countryCard from './tamplates/country-card.hbs';



const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const cardContainer =  document.querySelector('.country-info');
inputEl.addEventListener('input', throttle (onTextInput, DEBOUNCE_DELAY));

function onTextInput(evt){
    evt.preventDefault();
  const input = evt.currentTarget.value;
  console.log(input);
    const trimmedString=input.trim();
    
    console.log(trimmedString);
    
  fetchCountries(trimmedString)
    // .then(renderCountryList)
    .then(renderCountryCard)
    .catch(onFetchError);
    // .finally(() => input.reset());
}

// function renderCountryList(name) {
  
// }

function renderCountryCard(name) {
  const markup = countryCard(name);
  cardContainer.innerHTML = markup;
}

function onFetchError() {
  // Notiflix.Notify.failure('Oops, there is no country with that name');
  alert('Oops, there is no country with that name')
}