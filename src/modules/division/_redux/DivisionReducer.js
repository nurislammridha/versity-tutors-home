import * as Types from "./Types";

const initialState = {
  isDivision: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  divisionList: null,
  isStatusUpdate: false
};
const DivisionReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_DIVISION:
      return {
        ...state,
        isDivision: action.payload,
      };
    case Types.IS_UPDATE_DIVISION:
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
    case Types.DIVISION_LIST:
      return {
        ...state,
        divisionList: action.payload,
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
export default DivisionReducer;
