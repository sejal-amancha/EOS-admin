import * as types from '../ActionTypes/bannerActionTypes';

export const loadBannersStart = () => ({
    type: types.LOAD_BANNERS_START,
});

export const loadBannersSuccess = (banner) => ({
    type: types.LOAD_BANNERS_SUCCESS,
    payload: banner,
});
  
export const loadBannersError = (error) => ({
    type: types.LOAD_BANNERS_ERROR,
    payload: error,
});

export const getSingleBannerStart = (singleBanner) => ({
    type: types.GET_SINGLE_BANNER_START,
    payload: singleBanner,
});

export const getSingleBannerSuccess = (singleBanner) => ({
    type: types.GET_SINGLE_BANNER_SUCCESS,
    payload: singleBanner,
});

export const getSingleBannerError = (error) => ({
    type: types.GET_SINGLE_BANNER_ERROR,
    payload: error,
});

export const addnewBannerStart = (newBanner) => ({
    type: types.ADD_NEW_BANNER_START,
    payload: newBanner,
});

export const addnewBannerSuccess = () => ({
    type: types.ADD_NEW_BANNER_SUCCESS,
});

export const addnewBannerError = (error) => ({
    type: types.ADD_NEW_BANNER_ERROR,
    payload: error,
});

export const updateBannerStart = (updateBanner) => ({
    type: types.UPDATE_BANNER_START,
    payload: updateBanner,
});

export const updateBannerSuccess = () => ({
    type: types.UPDATE_BANNER_SUCCESS,
});

export const updateBannerError = (error) => ({
    type: types.UPDATE_BANNER_ERROR,
    payload: error,
});

export const deleteBannersStart = (deleteBanner) => ({
    type: types.DELETE_BANNER_START,
    payload: deleteBanner,
});

export const deleteBannersSuccess = (deleteBanner) => ({
    type: types.DELETE_BANNER_SUCCESS,
    payload: deleteBanner,
});

export const deleteBannersError = (error) => ({
    type: types.DELETE_BANNER_ERROR,
    payload: error,
});