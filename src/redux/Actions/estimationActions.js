import * as types from '../ActionTypes/estimationActionTypes';

export const loadEstimationStart = () => ({
    type: types.LOAD_ESTIMATIONS_START,
});

export const loadEstimationSuccess = (estimation) => ({
    type: types.LOAD_ESTIMATIONS_SUCCESS,
    payload: estimation,
});
  
export const loadEstimationError = (error) => ({
    type: types.LOAD_ESTIMATIONS_ERROR,
    payload: error,
});

