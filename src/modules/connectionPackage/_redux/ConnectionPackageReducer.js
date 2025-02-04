import * as Types from "./Types";

const initialState = {
  isConnectionPackage: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  connectionPackageList: null,
  isStatusUpdate: false
};
const ConnectionPackageReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_CONNECTIONPACKAGE:
      return {
        ...state,
        isConnectionPackage: action.payload,
      };
    case Types.IS_UPDATE_CONNECTIONPACKAGE:
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
    case Types.CONNECTIONPACKAGE_LIST:
      return {
        ...state,
        connectionPackageList: action.payload,
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
export default ConnectionPackageReducer;
