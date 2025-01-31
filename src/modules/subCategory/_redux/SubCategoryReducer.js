import * as Types from "./Types";

const initialState = {
  isSubCategory: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  subCategoryList: null,
  subCatImg: null,
  isImageLoading: false,
  isStatusUpdate: false
};
const SubCategoryReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_SUBCATEGORY:
      return {
        ...state,
        isSubCategory: action.payload,
      };
    case Types.IS_UPDATE_SUBCATEGORY:
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
    case Types.SUBCATEGORY_LIST:
      return {
        ...state,
        subCategoryList: action.payload,
      };
    case Types.AFTER_DELETED:
      return {
        ...state,
        afterDeleted: action.payload,
      };
    case Types.CAT_IMG:
      return {
        ...state,
        subCatImg: action.payload,
      };
    case Types.IS_IMG_LOADING:
      return {
        ...state,
        isImageLoading: action.payload,
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
export default SubCategoryReducer;
