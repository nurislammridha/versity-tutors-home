import * as Types from "./Types";

const initialState = {
  userList: null,
};
const UserReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };

    default:
      break;
  }
  return newState;
};
export default UserReducer;
