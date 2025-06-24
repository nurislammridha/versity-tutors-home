import * as Types from "./Types";

const initialState = {
  isInstituteName: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  instituteNameList: null,
  isStatusUpdate: false
};
const InstituteNameReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_INSTITUTE_NAME:
      return {
        ...state,
        isInstituteName: action.payload,
      };
    case Types.IS_UPDATE_INSTITUTE_NAME:
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
    case Types.INSTITUTE_NAME_LIST:
      return {
        ...state,
        instituteNameList: action.payload,
      };
    case Types.AFTER_DELETED:
      return {
        ...state,
        afterDeleted: action.payload,
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
export default InstituteNameReducer;
