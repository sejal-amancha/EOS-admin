import * as types from "../ActionTypes/estimationActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";


import { 
    loadEstimationError, 
    loadEstimationSuccess 
} from '../Actions/estimationActions';

import { loadEstimationApi } from '../APIs/estimationApi';


export function* onLoadEstimationStartAsync() {
    try {
         const response = yield call(loadEstimationApi)
         if (response.data.status === 200) {
             yield put(loadEstimationSuccess(response.data));
         } 
    } catch (error) {
         yield put(loadEstimationError(error.response));
    }
}

export function* onLoadEstimation() {
    yield takeLatest(types.LOAD_ESTIMATIONS_START, onLoadEstimationStartAsync);
}

const estimationSagas = [
    fork(onLoadEstimation),
];

export default function* estimationSaga() {
    yield all([...estimationSagas]);
}