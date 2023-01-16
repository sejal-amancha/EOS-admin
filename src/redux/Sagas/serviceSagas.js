import * as types from "../ActionTypes/serviceActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    loadServicesSuccess,
    loadServicesError,
    getSingleServiceSuccess,
    getSingleServiceError,
    deleteServicesSuccess,
    deleteServicesError,
    addnewServiceSuccess,
    addnewServiceError,
    updateServiceSuccess,
    updateServiceError,
} from "../Actions/serviceActions";

import {
    addNewServiceApi,
    deleteServiceApi,
    getSingleServiceApi,
    loadServiceApi,
    updateServiceApi,
} from "../APIs/serviceApi";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

export function* onLoadServicesStartAsync() {
    try {
        const response = yield call(loadServiceApi);
        if (response.data) {
            yield put(loadServicesSuccess(response.data));
        }
    } catch (error) {
        yield put(loadServicesError(error.response));
    }
}

export function* onGetSingleServiceStartAsync({ payload }) {
    try {
        const response = yield call(getSingleServiceApi, payload)
        if (response.data.status === 200) {
            yield put(getSingleServiceSuccess(response.data));
        }   
    } catch (error) {
        yield put(getSingleServiceError(error.response));
    }
}

export function* onAddNewServiceStartAsync({ payload }) {
    try {
        const response = yield call(addNewServiceApi, payload)
        if (response.data.status === 200) {
            yield put(addnewServiceSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(addnewServiceError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.image,
        });
    }
}

function* onUpdateServiceStartAsync({ payload }) {
    try {
        const response = yield call(updateServiceApi, payload) 
           if (response.data.status === 200) {
            yield put(updateServiceSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
            yield put(updateServiceError(error.response));
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            });
    }
}

export function* onDeleteServiceStartAsync({ payload }) {
    try {
        const response = yield call(deleteServiceApi, payload)
        if (response.data.status === 200) {
            yield put(deleteServicesSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: "Service deleted Successfully!",
            });
        } 
    } catch (error) {
        yield put(deleteServicesError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}


export function* onLoadServices() {
    yield takeLatest(types.LOAD_SERVICES_START, onLoadServicesStartAsync);
}

export function* onSingleService() {
    yield takeLatest(types.GET_SINGLE_SERVICE_START, onGetSingleServiceStartAsync);
}

export function* onAddNewService() {
    yield takeLatest(types.ADD_NEW_SERVICE_START, onAddNewServiceStartAsync);
}

export function* onUpdateService() {
    yield takeLatest(types.UPDATE_SERVICE_START, onUpdateServiceStartAsync);
}

export function* onDeleteService() {
    yield takeLatest(types.DELETE_SERVICE_START, onDeleteServiceStartAsync);
}

const serviceSagas = [
    fork(onLoadServices), 
    fork(onSingleService),
    fork(onAddNewService),
    fork(onUpdateService),
    fork(onDeleteService),
];

export default function* servicesSaga() {
    yield all([...serviceSagas]);
}