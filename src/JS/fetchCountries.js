
const generalUrl = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(query) {
  return fetch(generalUrl + query)
    .then(responce => responce.json());
    
}
