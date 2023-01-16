import * as types from "../ActionTypes/professionalsActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    deleteProfessionalError,
    deleteProfessionalSuccess,
    getSingleProfessionalError,
    getSingleProfessionalSuccess,
    loadProfessionalsError, 
    loadProfessionalsSuccess 
} from "../Actions/professionlasActions";

import {
    deleteProfessionalApi,
    getSingleProfessionalApi,
    loadProfessionalsApi,
} from "../APIs/professionalApi";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });


export function* onLoadProfessionalsStartAsync() {
    try {
        const response = yield call(loadProfessionalsApi);
        if (response.data.status === 200) {
            yield put(loadProfessionalsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadProfessionalsError(error.response));
    }
}

export function* onGetSingleProfessionalStartAsync({ payload }) {
    try {
        const response = yield call(getSingleProfessionalApi, payload)
        if (response.data.status === 200) {
            yield put(getSingleProfessionalSuccess(response.data));
        }   
    } catch (error) {
        yield put(getSingleProfessionalError(error.response));
    }
}

export function* onDeleteProfessionalStartAsync({ payload }) {
    try {
        const response = yield call(deleteProfessionalApi, payload)
        if (response.data.message === 'Success') {
            yield put(deleteProfessionalSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: "Professional deleted Successfully!",
            });
        } else {
            Toast.fire({
                icon: "error",
                title: "NO data found",
            });
        }
    } catch (error) {
        yield put(deleteProfessionalError(error.response));
    }
}

export function* onLoadProfessionals() {
    yield takeLatest(types.LOAD_PROFESSIONALS_START, onLoadProfessionalsStartAsync);
}

export function* onSingleProfessional() {
    yield takeLatest(types.GET_SINGLE_PROFESSIONAL_START, onGetSingleProfessionalStartAsync);
}

export function* onDeleteProfessional() {
    yield takeLatest(types.DELETE_PROFESSIONAL_START, onDeleteProfessionalStartAsync);
}


const professionalSagas = [
    fork(onLoadProfessionals),
    fork(onSingleProfessional),
    fork(onDeleteProfessional),
];

export default function* professionalSaga() {
    yield all([...professionalSagas]);
}
