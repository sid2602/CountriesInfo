export const GET_ALL_COUNTRIES: string =
  "https://restcountries.eu/rest/v2/all?fields=name;population;region;flag;alpha3Code";

export const GET_SINGLE_COUNTRY = (alpha3Code: string) =>
  `https://restcountries.eu/rest/v2/alpha/${alpha3Code}?fields=name;region;subregion;capital;population;demonym;nativeName;flag;languages;currencies;topLevelDomain;borders`;

export const FILTER_BY_SEARCH = (search: string) =>
  `https://restcountries.eu/rest/v2/name/${search}?fields=name;population;region;flag;alpha3Code`;

export const FILTER_BY_CONTINENT = (continent: string) =>
  `https://restcountries.eu/rest/v2/region/${continent}?fields=name;population;region;flag;alpha3Code`;
