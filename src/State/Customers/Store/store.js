import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../../Authentication/Reducer";
import restaurantReducer from "../Restaurant/Reducer";
import menuItemReducer from "../Menu/Reducer";
import cartReducer from "../Cart/Reducer";
import { orderReducer } from "../Orders/order.reducer";
import restaurantsOrderReducer from "../../Admin/Order/restaurants.order.reducer";
import superAdminReducer from "../../SuperAdmin/superAdmin.reducer";
import { ingredientReducer } from "../../Admin/Ingredients/Reducer";




const rootReducer=combineReducers({

    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,

    // admin
    restaurantsOrder:restaurantsOrderReducer,
    ingredients:ingredientReducer,

    // super admin
    superAdmin:superAdminReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))