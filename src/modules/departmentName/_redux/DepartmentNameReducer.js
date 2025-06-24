import * as Types from "./Types";

const initialState = {
  isDepartmentName: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  departmentNameList: null,
  isStatusUpdate: false
};
const DepartmentNameReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_DEPARTMENT_NAME:
      return {
        ...state,
        isDepartmentName: action.payload,
      };
    case Types.IS_UPDATE_DEPARTMENT_NAME:
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
    case Types.DEPARTMENT_NAME_LIST:
      return {
        ...state,
        departmentNameList: action.payload,
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
export default DepartmentNameReducer;
