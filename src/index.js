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
 
function onTextInput(){
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
        if (numberOfCountries >= 2 && numberOfCountries <= 10) {
          clearCountryInfo();
          renderCountryList(names);
           
        } else
          if (numberOfCountries === 1) {
            clearCountryList();
            renderCountryCard(names);
            
          }
    })
    .catch(error => {
      onFetchError(error),
      console.log(error)
    });
  
  
  // refs.cardTitle.style.margin = '0px';
  // refs.cardTitle.style.marginLeft = '20px';
  
  

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
}

// Вариант для отрисовки карточки одной страны
function renderCountryCard(name) {
  const markup = countryCard(name);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

// refs.imgEl.style.marginTop = 'auto';
// refs.imgEl.style.marginLeft = 'auto';
// refs.containerCardImg.style.display = 'flex';
// refs.cardTitle.style.margin = '0px';
// refs.cardTitle.style.marginLeft = '20px';
// refs.listLanguages.style.display = 'flex';
// refs.listLanguages.style.marginLeft = "10px"
// refs.languages.style.display = 'flex';













