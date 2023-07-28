import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_IS_FETCHING = "SET_IS_FETCHING";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};

export const setUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth },
});

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING,
  isFetching,
});

export const LogedIn = () => (dispatch) => {
    dispatch(setIsFetching(true));
    return authAPI.getAuth().then((data) => {
      dispatch(setIsFetching(false));
      let { id, email, login } = data.data;
      if (data.resultCode === 0) {
        dispatch(setUserData(id, email, login, true ));
      }
    });
  };


export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    dispatch(setIsFetching(false));
    if (response.data.resultCode === 0) {
     dispatch(LogedIn()) 
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
      let action = stopSubmit('login', {_error: message})
      dispatch(action)
    }
  });
};

export const logout = (dispatch) => {
  authAPI.logout().then((response) => {
    dispatch(setIsFetching(false));
    if (response.data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false ));
    }
  });
};

export default authReducer;
