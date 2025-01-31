import * as Types from "./Types";

const initialState = {
  sellerInput: {
    sellerName: "",
    sellerAddress: "",
    shopName: "",
    deliveryPeriod: "",
    sellerRatings: "",
    shopLogo: { publicId: null, url: "" },
    sellerPhone: "",
    sellerEmail: ""
  },
  updateInput: {
    sellerName: "",
    sellerAddress: "",
    shopName: "",
    deliveryPeriod: "",
    sellerRatings: "",
    shopLogo: { publicId: null, url: "" },
    sellerPhone: "",
    sellerEmail: ""
  },
  isSeller: false,
  isUpdate: false,
  isUpdated: false,
  afterCreated: false,
  afterDeleted: false,
  sellerList: null,
  isImageLoading: false,
};
const SellerReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_SELLER_INPUT:
      const sellerInput = { ...state.sellerInput };
      sellerInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        sellerInput: sellerInput,
      };
    case Types.GET_UPDATE_INPUT:
      const updateInput2 = { ...state.updateInput };
      updateInput2[action.payload.name] = action.payload.value;
      return {
        ...state,
        updateInput: updateInput2,
      };
    case Types.SET_SELLER_INPUT:
      let updateInput = { ...state.updateInput };
      updateInput = action.payload;
      return {
        ...state,
        updateInput: updateInput,
      };
    case Types.AFTER_CREATE_SELLER:
      const sellerInputAfter = initialState.sellerInput;
      return {
        ...state,
        sellerInput: sellerInputAfter,
      };
    case Types.IS_CREATE_SELLER:
      return {
        ...state,
        isSeller: action.payload,
      };
    case Types.IS_UPDATE_SELLER:
      return {
        ...state,
        isUpdate: action.payload,
      };
    case Types.IS_UPDATED_SELLER:
      return {
        ...state,
        isUpdated: action.payload,
      };

    case Types.SELLER_LIST:
      return {
        ...state,
        sellerList: action.payload,
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
export default SellerReducer;
