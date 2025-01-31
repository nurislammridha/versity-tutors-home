import * as Types from "./Types";

const initialState = {
  brandInput: {
    brandName: "",
    brandLogo: { publicId: null, url: "" },
  },
  updateInput: {
    brandName: "",
    brandLogo: { publicId: null, url: "" },
  },
  isBrand: false,
  isUpdate: false,
  isUpdated: false,
  afterCreated: false,
  afterDeleted: false,
  brandList: null,
  isImageLoading: false,
};
const BrandReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_BRAND_INPUT:
      const brandInput = { ...state.brandInput };
      brandInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        brandInput: brandInput,
      };
    case Types.GET_UPDATE_INPUT:
      const updateInput2 = { ...state.updateInput };
      updateInput2[action.payload.name] = action.payload.value;
      return {
        ...state,
        updateInput: updateInput2,
      };
    case Types.SET_BRAND_INPUT:
      let updateInput = { ...state.updateInput };
      updateInput = action.payload;
      return {
        ...state,
        updateInput: updateInput,
      };
    case Types.AFTER_CREATE_BRAND:
      const brandInputAfter = initialState.brandInput;
      return {
        ...state,
        brandInput: brandInputAfter,
      };
    case Types.IS_CREATE_BRAND:
      return {
        ...state,
        isBrand: action.payload,
      };
    case Types.IS_UPDATE_BRAND:
      return {
        ...state,
        isUpdate: action.payload,
      };
    case Types.IS_UPDATED_BRAND:
      return {
        ...state,
        isUpdated: action.payload,
      };

    case Types.BRAND_LIST:
      return {
        ...state,
        brandList: action.payload,
      };
    case Types.AFTER_DELETED:
      return {
        ...state,
        afterDeleted: action.payload,
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
export default BrandReducer;
