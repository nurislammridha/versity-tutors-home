import * as Types from "./Types";

const initialState = {
  isSubDistrict: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  subDistrictList: null,
  isStatusUpdate: false
};
const SubDistrictReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_SUBDISTRICT:
      return {
        ...state,
        isSubDistrict: action.payload,
      };
    case Types.IS_UPDATE_SUBDISTRICT:
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
    case Types.SUBDISTRICT_LIST:
      return {
        ...state,
        subDistrictList: action.payload,
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
export default SubDistrictReducer;
