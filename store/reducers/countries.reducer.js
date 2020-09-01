import * as types from '../types'

const initialState = {
    loading: false,
    allCountries: [],
    limitedCountries: [],

}

export const countriesReducer = (state=initialState,action) => {
    switch(action.type){
        case types.GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                loading: false,
                limitedCountries: action.payload.slice(0,types.GET_LIMIT_COUNTRIES)

            }
        case types.GET_MORE_COUNTRIES:
            return{
                ...state,
                loading: false,
                limitedCountries: state.limitedCountries.concat(state.allCountries.slice(action.payload,action.payload+20))
            }

        case types.LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}
