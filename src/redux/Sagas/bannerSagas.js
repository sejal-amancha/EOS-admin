import * as types from "../ActionTypes/bannerActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    addnewBannerError, 
    addnewBannerSuccess, 
    deleteBannersError,
    deleteBannersSuccess, 
    getSingleBannerError, 
    getSingleBannerSuccess, 
    loadBannersError, 
    loadBannersSuccess, 
    updateBannerError, 
    updateBannerSuccess
} from '../Actions/bannerActions';

import { 
    addNewBannerApi, 
    deleteBannerApi, 
    getSingleBannerApi, 
    loadBannerApi, 
    updateBannerApi
} from '../APIs/bannerApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
});

export function* onLoadBaneerStartAsync() {
    try {
         const response = yield call(loadBannerApi)
         if (response.data.status === 200) {
             yield put(loadBannersSuccess(response.data));
         } 
    } catch (error) {
         yield put(loadBannersError(error.response));
    }
 }

 export function* onGetSingleBannerStartAsync({ payload }) {
    try {
        const response = yield call(getSingleBannerApi, payload)
        if (response.data.status === 200) {
            yield put(getSingleBannerSuccess(response.data));
        }   
    } catch (error) {
        yield put(getSingleBannerError(error.response));
    }
}

export function* onAddNewBannerStartAsync({ payload }) {
    try {
        const response = yield call(addNewBannerApi, payload)
        if (response.data.status === 200) {
            yield put(addnewBannerSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(addnewBannerError(error.response));
        if (error.response.data.errors.image) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.image,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.imageName,
            });
        }
    }
}

export function* onUpdateBannerStartAsync({ payload }) {
        try {
        const response = yield call(updateBannerApi, payload)
            if (response.data.status === 200) {
            yield put(updateBannerSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(updateBannerError(error.response));
        if (error.response.data.errors.imageName) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.imageName,
            });
       } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.image,
            });
       }
    }
}

export function* onDeleteBannerStartAsync({ payload }) {
    try {
        const response = yield call(deleteBannerApi, payload)
        if (response.data.status === 200) {
            yield put(deleteBannersSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: "Banner deleted Successfully!",
            });
        }
    } catch (error) {
        yield put(deleteBannersError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onLoadBaneer() {
    yield takeLatest(types.LOAD_BANNERS_START, onLoadBaneerStartAsync);
}

export function* onSingleBanner() {
    yield takeLatest(types.GET_SINGLE_BANNER_START, onGetSingleBannerStartAsync);
}

export function* onAddNewBanner() {
    yield takeLatest(types.ADD_NEW_BANNER_START, onAddNewBannerStartAsync);
}

export function* onUpdateBanner() {
    yield takeLatest(types.UPDATE_BANNER_START, onUpdateBannerStartAsync);
} 

export function* onDeleteBanner() {
    yield takeLatest(types.DELETE_BANNER_START, onDeleteBannerStartAsync);
}

const bannerSagas = [
    fork(onLoadBaneer),
    fork(onAddNewBanner),
    fork(onUpdateBanner),
    fork(onDeleteBanner),
    fork(onSingleBanner),
];

export default function* bannerSaga() {
    yield all([...bannerSagas]);
}