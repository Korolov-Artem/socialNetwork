import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
  ],
  profile: null,
  isFetching: false,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING,
  isFetching,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const getStatus = (userId) => (dispatch) => {
  if (!userId) userId = 28322;
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export const setUser = (userId) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    if (!userId) userId = 28322;
    profileAPI.setUser(userId).then((response) => {
      dispatch(setIsFetching(false));
      dispatch(setUserProfile(response.data));
    });
  };
};

export const updateUser = (userId, prevUserId) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    if (prevUserId !== userId) {
      let userId = 28322;
      profileAPI.setUser(userId).then((response) => {
        dispatch(setIsFetching(false));
        dispatch(setUserProfile(response.data));
      });
    }
  };
};

export default profileReducer;
