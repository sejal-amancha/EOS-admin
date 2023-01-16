import * as types from '../ActionTypes/serviceActionTypes';

const initialState = {
   serviceData: [],
   singleServiceData: [],
}

const serviceReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_SERVICES_START:
        case types.GET_SINGLE_SERVICE_START:
        case types.DELETE_SERVICE_START:
        case types.ADD_NEW_SERVICE_START:
        case types.UPDATE_SERVICE_START:
            return {
                ...state,
            };
        case types.LOAD_SERVICES_SUCCESS:
            return {
                ...state,
                serviceData: action.payload,
            };
        case types.GET_SINGLE_SERVICE_SUCCESS:
            return {
                ...state,
                singleServiceData: action.payload,
            }
        case types.ADD_NEW_SERVICE_SUCCESS:
        case types.UPDATE_SERVICE_SUCCESS:
        case types.DELETE_SERVICE_SUCCESS:
            return {
                ...state,
            }
        case types.LOAD_SERVICES_ERROR:
        case types.ADD_NEW_SERVICE_ERROR:
        case types.UPDATE_SERVICE_ERROR:
        case types.GET_SINGLE_SERVICE_ERROR:
        case types.DELETE_SERVICE_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default serviceReducer;