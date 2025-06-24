import * as Types from "./Types";

const initialState = {
  isInstituteType: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  instituteTypeList: null,
  isStatusUpdate: false
};
const InstituteTypeReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_INSTITUTE_TYPE:
      return {
        ...state,
        isInstituteType: action.payload,
      };
    case Types.IS_UPDATE_INSTITUTE_TYPE:
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
    case Types.INSTITUTE_TYPE_LIST:
      return {
        ...state,
        instituteTypeList: action.payload,
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
export default InstituteTypeReducer;
