export type CountryData = {
  name: string;
  population: number;
  region: string;
  flag: string;
  alpha3Code: string;
};

export type CountryDataDetails = CountryData & CountryDataSpecific;

type CountryDataSpecific = {
  currencies: Array<currencies>;
  languages: Array<languages>;
  topLevelDomain: Array<string>;
  subregion: string;
  demonym: string;
  nativeName: string;
  borders: Array<string>;
  capital: string;
};

type languages = {
  name: string;
};

type currencies = {
  symbol: string;
  name: string;
};
