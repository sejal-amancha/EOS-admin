import * as types from '../ActionTypes/estimationActionTypes';

const initialState = {
    estimations: [],   
}

const estimationReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_ESTIMATIONS_START:
            return {
                ...state,
            };
        case types.LOAD_ESTIMATIONS_SUCCESS:
            return {
                ...state,
                estimations: action.payload,
            }
        case types.LOAD_ESTIMATIONS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default estimationReducer;