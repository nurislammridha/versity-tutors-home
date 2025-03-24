import * as Types from "./Types";

const initialState = {
  isLogin: false,
  loginSuccess: false,
  notificationList: null,
};
const AuthReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case Types.IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case Types.NOTIFICATION_LIST:
      return {
        ...state,
        notificationList: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default AuthReducer;
