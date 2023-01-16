import * as types from "../ActionTypes/orderActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { 
    deleteOrderError,
    deleteOrderSuccess,
    loadOrdersError, 
    loadOrdersSuccess 
} from '../Actions/orderActions';

import { 
    deleteOrderApi,
    loadOrdersApi 
} from '../APIs/orderApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });

function* onLoadOrdersStartAsync() {
    try {
        const response = yield call(loadOrdersApi);
        if (response.data.status === 200) {
            yield put(loadOrdersSuccess(response.data));
        }
    } catch (error) {
        yield put(loadOrdersError(error.response));
    }
}

export function* onDeleteOrderStartAsync({ payload }) {
    try {
        const response = yield call(deleteOrderApi, payload)
        if (response.data.status === 200) {
            yield put(deleteOrderSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(deleteOrderError(error.response));
    }
}


export function* onLoadOrders() {
    yield takeLatest(types.LOAD_ORDERS_START, onLoadOrdersStartAsync);
}

export function* onDeleteCategory() {
    yield takeLatest(types.DELETE_ORDER_START, onDeleteOrderStartAsync);
}

const orderSagas = [
    fork(onLoadOrders), 
    fork(onDeleteCategory),
   
];

export default function* orderSaga() {
yield all([...orderSagas]);
}