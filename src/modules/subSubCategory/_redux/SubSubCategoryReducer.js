import * as Types from "./Types";

const initialState = {
  isSubSubCategory: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  subSubCategoryList: null,
  subSubCatImg: null,
  isImageLoading: false,
};
const SubSubCategoryReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_SUBCATEGORY:
      return {
        ...state,
        isSubSubCategory: action.payload,
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
        subSubCategoryList: action.payload,
      };
    case Types.AFTER_DELETED:
      return {
        ...state,
        afterDeleted: action.payload,
      };
    case Types.CAT_IMG:
      return {
        ...state,
        subSubCatImg: action.payload,
      };
    case Types.IS_IMG_LOADING:
      return {
        ...state,
        isImageLoading: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default SubSubCategoryReducer;
