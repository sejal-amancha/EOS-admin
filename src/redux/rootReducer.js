import { combineReducers } from "redux";

import usersReducer from "./Reducers/reducer";
import categoryReducer from "./Reducers/categoryReducer";
import professionalReducer from "./Reducers/professionalReducer";
import serviceReducer from "./Reducers/serviceReducer";
import orderReducer from "./Reducers/orderReducer";
import bannerReducer from "./Reducers/bannerReducer";
import offerReducer from "./Reducers/offerReducer";
import estimationReducer from "./Reducers/estimationReducer";

const rootReducer = combineReducers({
    loginData: usersReducer,
    users: usersReducer,
    singleUser : usersReducer,
    forgotPass : usersReducer,
    professional : professionalReducer,
    singleProfessional: professionalReducer,
    serviceData : serviceReducer,
    singleServiceData: serviceReducer,
    orders: orderReducer,
    categories: categoryReducer,
    categoryDetails: categoryReducer,
    banners : bannerReducer,
    singleBannerData: bannerReducer,
    offers : offerReducer,
    singleOffer : offerReducer,
    estimations : estimationReducer,
})

export default rootReducer;