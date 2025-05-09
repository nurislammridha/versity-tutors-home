import * as Types from "./Types";

const initialState = {
  isRole: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  roleList: null,
  roleListType: null,
  managerList: null,
  roleDetails: null,
  isRoleDetails: false,
  isStatusUpdate: false
};
const RoleReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_ROLE:
      return {
        ...state,
        isRole: action.payload,
      };
    case Types.IS_UPDATE_ROLE:
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
    case Types.ROLE_LIST:
      return {
        ...state,
        roleList: action.payload,
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
    case Types.ROLE_LIST_TYPE:
      return {
        ...state,
        roleListType: action.payload,
      };
    case Types.MANAGER_LIST:
      return {
        ...state,
        managerList: action.payload,
      };
    case Types.ROLE_DETAILS:
      return {
        ...state,
        roleDetails: action.payload,
      };
    case Types.IS_ROLE_DETAILS:
      return {
        ...state,
        isRoleDetails: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default RoleReducer;
