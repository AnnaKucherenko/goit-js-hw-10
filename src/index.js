import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import  { fetchCountries }  from './api/fetchCountries';
import countryCard from './tamplates/country-card.hbs';


const DEBOUNCE_DELAY = 300;


const inputEl = document.querySelector('#search-box');
const countryList =  document.querySelector('.country-list');
const cardContainer =  document.querySelector('.country-info');
inputEl.addEventListener('input', onTextInput);

function onTextInput(evt){
  evt.preventDefault();
  const input = evt.currentTarget.value;
  console.log(input);
  
  if (input.length === 1) {
     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  const trimmedString=input.trim();
   
  fetchCountries(trimmedString)
    .then(renderCountryCard)
    .catch(onFetchError);
    // .finally(() => input.reset());
}

// способ как выбрать отрисовку списка или карты 
// в зависимости от количества вернувшихся стран еще не придумал,
// поэтому подставляю в зен либо  renderCountryList либо renderCountryCard

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
function renderCountryCard({name,capital,population,flags,languages}) {
  const markup = countryCard({name,capital,population,flags,languages});
  cardContainer.innerHTML = markup;
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

