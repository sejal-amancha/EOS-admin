import * as types from "../ActionTypes/offerActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    loadOffersSuccess,
    loadOffersError,
    addnewOfferSuccess,
    addnewOfferError,
    updateOfferSuccess,
    updateOfferError,
    getSingleOfferSuccess,
    getSingleOfferError,
    deleteOfferSuccess,
    deleteOfferError,
} from '../Actions/offerActions';

import {
   loadOffersApi,
   addNewOfferApi,
   updateOfferApi,
   getSingleOfferApi,
   deleteOfferApi,
} from '../APIs/offerApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

function* onLoadOffersStartAsync() {
    try {
        const response = yield call(loadOffersApi);
        if (response.data.status === 200) {
            yield put(loadOffersSuccess(response.data));
        }
    } catch (error) {
        yield put(loadOffersError(error.response));
    }
}

function* onAddNewOfferStartAsync({ payload }) {
    try {
        const response = yield call(addNewOfferApi, payload)
        if (response.data.status === 200) {
            yield put(addnewOfferSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(addnewOfferError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

function* onUpdateOfferStartAsync({ payload }) {
    try {
        const response = yield call(updateOfferApi, payload)
        if (response.data.status === 200) {
            yield put(updateOfferSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
            yield put(updateOfferError(error.response));
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            });
    }
}

function* onGetSingleOfferStartAsync({ payload }) {
    try {
        const response = yield call(getSingleOfferApi, payload)
        if (response.data.status === 200) {
            yield put(getSingleOfferSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleOfferError(error.response));
    }
}

function* onDeleteOfferStartAsync({ payload }) {
    try {
        const response = yield call(deleteOfferApi, payload)
        if (response.data.status === 200) {
            yield put(deleteOfferSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(deleteOfferError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onLoadOffers() {
    yield takeLatest(types.LOAD_OFFERS_START, onLoadOffersStartAsync);
}

export function* onAddnewOffer () {
    yield takeLatest(types.ADD_NEW_OFFER_START, onAddNewOfferStartAsync);
}

export function* onUpdateOffer() {
    yield takeLatest(types.UPDATE_OFFER_START, onUpdateOfferStartAsync);
}

export function* onDeleteOffer() {
    yield takeLatest(types.DELETE_OFFER_START, onDeleteOfferStartAsync);
}

export function* onSingleOffer() {
    yield takeLatest(types.GET_SINGLE_OFFER_START, onGetSingleOfferStartAsync);
}

const offerSagas = [
    fork(onLoadOffers), 
    fork(onAddnewOffer),
    fork(onUpdateOffer),
    fork(onDeleteOffer),
    fork(onSingleOffer),
];

export default function* offerSaga() {
yield all([...offerSagas]);
}





