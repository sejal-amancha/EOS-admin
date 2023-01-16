import * as types from '../ActionTypes/professionalsActionTypes';

const initialState = {
    professional: [],
    singleProfessional: [],
}

const professionalReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_PROFESSIONALS_START:
        case types.GET_SINGLE_PROFESSIONAL_START:
        case types.DELETE_PROFESSIONAL_START:
            return {
                ...state,
            };
        case types.LOAD_PROFESSIONALS_SUCCESS:
            return {
                ...state,
                professional: action.payload,
           };
        case types.GET_SINGLE_PROFESSIONAL_SUCCESS:
            return {
                ...state,
                singleProfessional: action.payload,
            }
        case types.DELETE_PROFESSIONAL_SUCCESS:
            return {
                ...state,
            }
        case types.LOAD_PROFESSIONALS_ERROR:
        case types.GET_SINGLE_PROFESSIONAL_ERROR:
        case types.DELETE_PROFESSIONAL_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default professionalReducer;