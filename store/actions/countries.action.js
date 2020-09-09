import * as types from '../types'

export const getCountries = () => async dispatch => {

    dispatch({type: types.LOADING})

    const resp = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;subregion;flag;population;currencies;borders;languages;alpha3Code');
    const countries = await resp.json();

    dispatch({
        type: types.GET_ALL_COUNTRIES,
        payload: countries
    })
}

export const getMoreCountries = (start) => async dispatch => {
    console.log("SOMETHING")
    dispatch({
        type: types.GET_MORE_COUNTRIES,
        payload: start
    })
}