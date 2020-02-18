import fetchCountries from './fetchCountries';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify'; 
// node_modules/pnotify/dist/es/PNotify.js
import debounce from 'lodash.debounce';
import countryNameListTemplate from '../Templates/country-name-list.hbs';
import singleCountryTemplate from '../Templates/single-country.hbs';

const refs = {
  searchInput: document.querySelector('#search-input'),
  countriesList: document.querySelector('#countries-list'),
};

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 1000));

function searchInputHandler(e) {
  const searchValue = e.target.value;
  clearCountriesList();
  fetchCountries(searchValue)
    .then(data => {
      let markup = '';
          console.log(data);
      if (data.length === 1) {
        // console.dir(data[0]);
        markup = buildSingleCountryTemplate(data[0]);
      } else markup = buildCountryNameListMarkup(data);

      insertCountriesList(markup);
    })
    .catch(error => console.log('not good'));

  e.target.value = '';
}

function insertCountriesList(items) {
  refs.countriesList.insertAdjacentHTML('beforeend', items);
}

function buildSingleCountryTemplate(item) {
  return singleCountryTemplate(item);
}

function buildCountryNameListMarkup(items) {
  return countryNameListTemplate(items);
}

function clearCountriesList() {
  refs.countriesList.innerHTML = '';
}

console.log(PNotify.alert('Notice me, senpai!'));
