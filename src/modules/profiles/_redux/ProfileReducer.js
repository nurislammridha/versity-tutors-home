import * as Types from "./Types";

const initialState = {
  profileList: null,
  isUpdateLoading: false,
  isProfileDetailsLoading: false,
  profileDetails: null,
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
    case Types.IS_PROFILE_DETAILS_LOADING:
      return {
        ...state,
        isProfileDetailsLoading: action.payload,
      };
    case Types.PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default ProfileReducer;
