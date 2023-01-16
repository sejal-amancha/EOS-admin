import { all } from 'redux-saga/effects';
import userSaga from './usersagas';
import categorySaga from './categorySagas';
import professionalSaga from './professionalSagas';
import servicesSaga from './serviceSagas';
import orderSaga from './orderSagas';
import bannerSaga from './bannerSagas';
import offerSaga from './offerSagas';
import estimationSaga from './estimationSagas';


export default function* rootSaga() {
   yield all([
    userSaga(),
    categorySaga(),
    professionalSaga(),
    servicesSaga(),
    orderSaga(),
    bannerSaga(),
    offerSaga(),
    estimationSaga(),
   ]);
}