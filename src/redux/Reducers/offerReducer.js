import * as types from '../ActionTypes/offerActionTypes';

const initialState = {
    offers: [],
    singleOffer: [],
}

const offerReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_OFFERS_START:
        case types.ADD_NEW_OFFER_START:
        case types.UPDATE_OFFER_START:
        case types.GET_SINGLE_OFFER_START:
        case types.DELETE_OFFER_START:
            return {
                ...state,
            };
        case types.LOAD_OFFERS_SUCCESS:
            return {
                ...state,
                offers: action.payload,
            }
        case types.GET_SINGLE_OFFER_SUCCESS:
            return {
                ...state,
                singleOffer: action.payload,
            }
        case types.ADD_NEW_OFFER_SUCCESS:
        case types.UPDATE_OFFER_SUCCESS:
        case types.DELETE_OFFER_SUCCESS:
            return {
                ...state,
            }
        case types.LOAD_OFFERS_ERROR:
        case types.ADD_NEW_OFFER_ERROR:
        case types.UPDATE_OFFER_ERROR:
        case types.GET_SINGLE_OFFER_ERROR:
        case types.DELETE_OFFER_ERROR:
            return {
                ...state,
                error: action.payload,
            };
         default:
            return state;
    }
}

export default offerReducer;