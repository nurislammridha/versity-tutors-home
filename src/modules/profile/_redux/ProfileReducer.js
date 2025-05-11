import * as Types from "./Types";

const initialState = {
  isProfile: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  profileList: null,
  catImg: null,
  catLogo: null,
  isImageLoading: false,
  isLogoLoading: false,
  isStatusUpdate: false
};
const ProfileReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_PROFILE:
      return {
        ...state,
        isProfile: action.payload,
      };
    case Types.IS_UPDATE_PROFILE:
      return {
        ...state,
        isUpdate: action.payload,
      };
    case Types.AFTER_CREATED:
      return {
        ...state,
        afterCreated: action.payload,
      };
    case Types.AFTER_UPDATED:
      return {
        ...state,
        afterUpdated: action.payload,
      };
    case Types.PROFILE_LIST:
      return {
        ...state,
        profileList: action.payload,
      };
    case Types.AFTER_DELETED:
      return {
        ...state,
        afterDeleted: action.payload,
      };
    case Types.CAT_IMG:
      return {
        ...state,
        catImg: action.payload,
      };
    case Types.IS_IMG_LOADING:
      return {
        ...state,
        isImageLoading: action.payload,
      };
    case Types.CAT_LOGO:
      return {
        ...state,
        catLogo: action.payload,
      };
    case Types.IS_LOGO_LOADING:
      return {
        ...state,
        isLogoLoading: action.payload,
      };
    case Types.IS_STATUS_UPDATE:
      return {
        ...state,
        isStatusUpdate: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default ProfileReducer;
