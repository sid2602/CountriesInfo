import { CountryData } from "../types";
import { FILTER_BY_SEARCH, FILTER_BY_CONTINENT } from "../api/paths";
const searchCountry = async (search: string, continent: string) => {
  let resp: Response | undefined,
    json: Array<CountryData> = [];

  if (search !== "" && continent !== "all") {
    resp = await fetch(FILTER_BY_SEARCH(search));
    const arr: Array<CountryData> = await resp.json();

    arr.map((country) => country?.region === continent && json.push(country));
  } else {
    if (search !== "" && continent === "all")
      resp = await fetch(FILTER_BY_SEARCH(search));
    else if (search === "" && continent !== "all")
      resp = await fetch(FILTER_BY_CONTINENT(continent));

    json = await resp?.json();
  }

  return json;
};

export default searchCountry;
