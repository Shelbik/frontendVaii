import { api } from "../../config/api";
import { GET_CUSTOMERS_FAILURE, GET_CUSTOMERS_REQUEST, GET_CUSTOMERS_SUCCESS, GET_PENDING_CUSTOMERS_FAILURE, GET_PENDING_CUSTOMERS_REQUEST, GET_PENDING_CUSTOMERS_SUCCESS,GET_RESTAURANT_SUCCESS,GET_RESTAURANT_REQUEST,GET_RESTAURANT_FAILURE } from "./superAdmin.actionType";

export const getCustomers = () => {
    return async (dispatch) => {
      dispatch({type:GET_CUSTOMERS_REQUEST});
      try {
        const { data } = await api.get("/super-admin/customers");
        dispatch({type:GET_CUSTOMERS_SUCCESS,payload:data});
        console.log("created restaurant ", data);
      } catch (error) {
        dispatch({type:GET_CUSTOMERS_FAILURE,error:error.message});
      }
    };
};

export const getRestaurants = () => {
  return async (dispatch) => {
    dispatch({type:GET_RESTAURANT_REQUEST});
    try {
      const { data } = await api.get("/super-admin/restaurants");
      dispatch({type:GET_RESTAURANT_SUCCESS,payload:data});
      console.log("created restaurant ", data);
    } catch (error) {
      dispatch({type:GET_RESTAURANT_FAILURE,error:error.message});
    }
  };
};

export const deleteCustomer = (id) => {
  return async (dispatch) => {
    try {
      await api.delete(`/super-admin/customers/${id}`);
      console.log(`Deleted user with id: ${id}`);
      dispatch(getCustomers());
    } catch (error) {
      console.error(`Error deleting user with id ${id}: `, error.message);
    }
  };
};

