import {
  ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  DELETE_PROFILE_FAILURE,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_REQUEST
} from "./ActionType";
import { useNavigate } from "react-router-dom";
import { API_URL, api } from "../../config/api";
import axios from "axios";

export const registerUser = (reqData) => async (dispatch) => {
  console.log("resgister request data ",reqData.userData)
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if(data.jwt) localStorage.setItem("jwt",data.jwt)
    if(data.role==="ROLE_RESTAURANT_OWNER"){
      reqData.navigate("/admin/restaurant")
    }
    else{
      reqData.navigate("/")
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("catch error ------ ",error)
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.data);
    if(data.jwt) localStorage.setItem("jwt",data.jwt)
    if(data.role==="ROLE_RESTAURANT_OWNER"){
      reqData.navigate("/admin/restaurant")
    }
    else{
      reqData.navigate("/")
    }
    
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const addToFavorites = ({restaurantId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITES_REQUEST });
    try {
      const { data } = await api.put(`api/restaurants/${restaurantId}/add-favorites`,{},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Add to favorites ",data)
      dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ",error)
      dispatch({
        type: ADD_TO_FAVORITES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const resetPasswordRequest = (email) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password-request?email=${email}`,{});
    
    console.log("reset password -: ", data);
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password`,reqData.data);
    
    console.log("reset password -: ", data);

    reqData.navigate("/password-change-success")
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};

export const deleteAccount = (navigate) => {
  return async (dispatch) => {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
          console.error("JWT token not found in localStorage");
          return dispatch({ type: DELETE_PROFILE_FAILURE, payload: "JWT not found" });
      }

      dispatch({ type: DELETE_PROFILE_REQUEST });

      try {
        console.log(jwt);
          const { data } = await api.delete(`/api/users/profile`, {
              headers: {
                  Authorization: `Bearer ${jwt}`,  
              },
          });

          dispatch({ type: DELETE_PROFILE_SUCCESS, payload: data });
          dispatch(logout());

         
          const navigate = useNavigate();
          navigate("/");

      } catch (error) {
          console.error("Error during profile deletion:", error);
          dispatch({ type: DELETE_PROFILE_FAILURE, payload: error.response?.data || error.message });
      }
  };
};

export const updateProfile = (updatedData) => {
  return async (dispatch) => {
      const jwt = localStorage.getItem("jwt"); // Получаем JWT из localStorage

      // Проверяем, есть ли JWT в localStorage
      if (!jwt) {
          console.error("JWT token not found in localStorage");
          return dispatch({ type: UPDATE_PROFILE_FAILURE, payload: "JWT not found" });
      }

      dispatch({ type: UPDATE_PROFILE_REQUEST });

      try {
          // Отправка PUT запроса для обновления данных пользователя
          const { data } = await api.put(`/api/users/profile`, updatedData, {
              headers: {
                  Authorization: `Bearer ${jwt}`,  // Токен авторизации
                  'Content-Type': 'application/json', // Убедитесь, что данные отправляются как JSON
              },
          });

          console.log("Profile update success", data);

          // Отправка action с обновленными данными
          dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
      } catch (error) {
          // Логируем ошибку и отправляем action с ошибкой
          console.error("Error during profile update:", error);
          dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.response?.data || error.message });
      }
  };
};