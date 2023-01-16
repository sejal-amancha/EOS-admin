import * as types from '../ActionTypes/offerActionTypes';

export const loadOffersStart = () => ({
    type: types.LOAD_OFFERS_START,
});

export const loadOffersSuccess = (offers) => ({
    type: types.LOAD_OFFERS_SUCCESS,
    payload: offers,
});
  
export const loadOffersError = (error) => ({
    type: types.LOAD_OFFERS_ERROR,
    payload: error,
});

export const addnewOfferStart = (newoffer) => ({
    type: types.ADD_NEW_OFFER_START,
    payload: newoffer,
});

export const addnewOfferSuccess = () => ({
    type: types.ADD_NEW_OFFER_SUCCESS,
});

export const addnewOfferError = (error) => ({
    type: types.ADD_NEW_OFFER_ERROR,
    payload: error,
})

export const updateOfferStart = (updateOffer) => ({
    type: types.UPDATE_OFFER_START,
    payload: updateOffer,
});

export const updateOfferSuccess = () => ({
    type: types.UPDATE_OFFER_SUCCESS,
});

export const updateOfferError = (error) => ({
    type: types.UPDATE_OFFER_ERROR,
    payload: error,
});

export const getSingleOfferStart = (singleOFFER) => ({
    type: types.GET_SINGLE_OFFER_START,
    payload: singleOFFER,
});

export const getSingleOfferSuccess = (singleOFFER) => ({
    type: types.GET_SINGLE_OFFER_SUCCESS,
    payload: singleOFFER,
});

export const getSingleOfferError = (error) => ({
    type: types.GET_SINGLE_OFFER_ERROR,
    payload: error,
});

export const deleteOfferStart = (deleteOffer) => ({
    type: types.DELETE_OFFER_START,
    payload: deleteOffer,
});

export const deleteOfferSuccess = (deleteOffer) => ({
    type: types.DELETE_OFFER_SUCCESS,
    payload: deleteOffer,
});

export const deleteOfferError = (error) => ({
    type: types.DELETE_OFFER_ERROR,
    payload: error,
});