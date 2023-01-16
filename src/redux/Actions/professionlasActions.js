import * as types from '../ActionTypes/professionalsActionTypes';

export const loadProfessionalsStart = () => ({
    type: types.LOAD_PROFESSIONALS_START,
});

export const loadProfessionalsSuccess = (professionals) => ({
    type: types.LOAD_PROFESSIONALS_SUCCESS,
    payload: professionals,
});
  
export const loadProfessionalsError = (error) => ({
    type: types.LOAD_PROFESSIONALS_ERROR,
    payload: error,
});

export const getSingleProfessionalStart = (singleProfessional) => ({
    type: types.GET_SINGLE_PROFESSIONAL_START,
    payload: singleProfessional,
});

export const getSingleProfessionalSuccess = (singleProfessional) => ({
    type: types.GET_SINGLE_PROFESSIONAL_SUCCESS,
    payload: singleProfessional,
});

export const getSingleProfessionalError = (error) => ({
    type: types.GET_SINGLE_PROFESSIONAL_ERROR,
    payload: error,
})

export const deleteProfessionalStart = (deleteProfessional) => ({
    type: types.DELETE_PROFESSIONAL_START,
    payload: deleteProfessional,
});

export const deleteProfessionalSuccess = (deleteProfessional) => ({
    type: types.DELETE_PROFESSIONAL_SUCCESS,
    payload: deleteProfessional,
});

export const deleteProfessionalError = (error) => ({
    type: types.DELETE_PROFESSIONAL_ERROR,
    payload: error,
});