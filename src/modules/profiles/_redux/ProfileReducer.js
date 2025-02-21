import * as Types from "./Types";

const initialState = {
  profileList: null,
  isUpdateLoading: false
};
const ProfileReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.PROFILE_LIST:
      return {
        ...state,
        profileList: action.payload,
      };
    case Types.IS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default ProfileReducer;
