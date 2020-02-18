import fetchCountries from './fetchCountries';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify';
import '../../node_modules/pnotify/dist/PnotifyBrightTheme.css';
import debounce from 'lodash.debounce';
import countryNameListTemplate from '../Templates/country-name-list.hbs';
import singleCountryTemplate from '../Templates/single-country.hbs';

const refs = {
  searchInput: document.querySelector('#search-input'),
  queryResult: document.querySelector('#query-result'),
};

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 1000));

function searchInputHandler(e) {
  const searchValue = e.target.value;
  clearCountriesList();
  fetchCountries(searchValue).then(data => {
    let markup = '';
    refs.queryResult.classList.remove('relative-width');
    console.log(data);

    if (data.length) {
      switch (true) {
        case data.length === 1:
          markup = buildSingleCountryTemplate(data[0]);
          break;
        case data.length > 1 && data.length < 11:
          markup = buildCountryNameListMarkup(data);
          refs.queryResult.classList.add('relative-width');
          break;
        default:
          PNotify.notice(
            'Too many matches found. Please enter more specific query',
          );
      }
    } else PNotify.alert('No matches found, please try again');

    insertCountriesList(markup);
  });
  // .catch(error => console.log(error));

  e.target.value = '';
}

function insertCountriesList(items) {
  refs.queryResult.insertAdjacentHTML('beforeend', items);
}

function buildSingleCountryTemplate(item) {
  return singleCountryTemplate(item);
}

function buildCountryNameListMarkup(items) {
  return countryNameListTemplate(items);
}

function clearCountriesList() {
  refs.queryResult.innerHTML = '';
}
