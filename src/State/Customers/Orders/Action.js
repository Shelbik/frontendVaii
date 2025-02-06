import { api } from "../../../config/api";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";
import { GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionTypes";


export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const token = localStorage.getItem("jwt");
      
      console.log("Token being sent:", {
        stored: token,
        authorization: `Bearer ${token}`
      });

      const { data } = await api.post('/api/order', reqData.order, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Используем token из localStorage
        }
      });

      console.log("Response data:", data);

      if(data.payment_url){
        window.location.href=data.payment_url;
      }
      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.error("Create order error:", error.response?.data || error.message);
      dispatch(createOrderFailure(error.response?.data || error.message));
    }
  };
};

export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    try {
      const {data} = await api.get(`/api/order/user`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
          },
      });
      console.log("users order ",data)
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      console.log("error", error)
      dispatch(getUsersOrdersFailure(error));
    }
  };
};


export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.get('/api/notifications');
     
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
