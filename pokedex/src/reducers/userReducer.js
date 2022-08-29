import {
  GET_USER_LIST_STARTED, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE
} from "../actions/actionTypes";

// define initial state of user
const initialState = {
  data: {},
  loading: false,
  error: null
}

// update store based on type and payload and return the state
export default function common(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST_STARTED:
      return {
        ...state,
        loading: true
      }
    case GET_USER_LIST_SUCCESS:
      const { data } = action.payload;
      console.log("action success", typeof (data))
      return {
        ...state,
        data: data,
        loading: false
      }
    case GET_USER_LIST_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error
      }
    default:
      return state
  }
}