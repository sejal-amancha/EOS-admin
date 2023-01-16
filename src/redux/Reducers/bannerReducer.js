import * as types from '../ActionTypes/bannerActionTypes';

const initialState = {
    banners: [],
    singleBannerData: [],
}

const bannerReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_BANNERS_START:
        case types.GET_SINGLE_BANNER_START:
        case types.UPDATE_BANNER_START:
        case types.DELETE_BANNER_START:
        case types.ADD_NEW_BANNER_START:
            return {
                ...state,
            };
        case types.LOAD_BANNERS_SUCCESS:
            return {
                ...state,
                banners: action.payload,
            }
        
            case types.GET_SINGLE_BANNER_SUCCESS:
            return {
                ...state,
                singleBannerData: action.payload,
            }
            case types.ADD_NEW_BANNER_SUCCESS:
            case types.UPDATE_BANNER_SUCCESS:
            case types.DELETE_BANNER_SUCCESS:
                return {
                    ...state,
                }
            case types.LOAD_BANNERS_ERROR:
            case types.ADD_NEW_BANNER_ERROR:
            case types.GET_SINGLE_BANNER_ERROR:
            case types.UPDATE_BANNER_ERROR:
            case types.DELETE_BANNER_ERROR:
                return {
                    ...state,
                    error: action.payload,
                };
    
         default:
            return state;
    }
}

export default bannerReducer;