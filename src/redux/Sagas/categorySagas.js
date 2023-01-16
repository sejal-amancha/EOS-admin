import * as types from "../ActionTypes/categoryActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadCategoriesSuccess,
    loadCategoriesError,
    addnewCategorySuccess,
    addnewCategoryError,
    updateCategorySuccess,
    updateCategoryError,
    deleteCategorySuccess,
    deleteCategoryError,
    // categoryStatusChangeSuccess,
    // categoryStatusChangeError,
    getSingleCategorySuccess,
    getSingleCategoryError,
} from '../Actions/categoryActions';

import {
    loadCategoryApi,
    addNewCategoryApi,
    updateCategoryApi,
    deleteCategoryApi,
    // changeStatusApi,
    getSingleCategoryApi,
} from '../APIs/categoryApi';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });

export function* onLoadCategoryStartAsync({  payload }) {
   try {
        const response = yield call(loadCategoryApi, payload)
        if (response.data.status === 200) {
            yield put(loadCategoriesSuccess(response.data));
        } 
   } catch (error) {
        yield put(loadCategoriesError(error.response));
   }
}

export function* onAddNewCategoryStartAsync({ payload }) {
    try {
        const response = yield call(addNewCategoryApi, payload)
        if (response.data.status === 200) {  
            yield put(addnewCategorySuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(addnewCategoryError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onUpdateCategoryStartAsync({ payload }) {
    try {
        const response = yield call(updateCategoryApi, payload)
            if (response.data.status === 200) {
            yield put(updateCategorySuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(updateCategoryError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onDeleteCategoryStartAsync({ payload }) {
    try {
        const response = yield call(deleteCategoryApi, payload)
        if (response.data.status === 200) {
            yield put(deleteCategorySuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(deleteCategoryError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onGetSingleCategoryStartAsync({ payload }) {
    try {
        const response = yield call(getSingleCategoryApi, payload)
        if (response.data.status === 200) {
            yield put(getSingleCategorySuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleCategoryError(error.response));
    }
}

export function* onLoadCategory() {
    yield takeLatest(types.LOAD_CATEGORIES_START, onLoadCategoryStartAsync);
}

export function* onAddNewCategory() {
    yield takeLatest(types.ADD_NEW_CATEGORY_START, onAddNewCategoryStartAsync);
}

export function* onUpdateCategory() {
    yield takeLatest(types.UPDATE_CATEGORY_START, onUpdateCategoryStartAsync);
}

export function* onDeleteCategory() {
    yield takeLatest(types.DELETE_CATEGORY_START, onDeleteCategoryStartAsync);
}

export function* onSingleCategory() {
    yield takeLatest(types.GET_SINGLE_CATEGORY_START, onGetSingleCategoryStartAsync);
}

const categorySagas = [
    fork(onLoadCategory),
    fork(onAddNewCategory),
    fork(onUpdateCategory),
    fork(onDeleteCategory),
    fork(onSingleCategory),
];

export default function* categorySaga() {
    yield all([...categorySagas]);
}