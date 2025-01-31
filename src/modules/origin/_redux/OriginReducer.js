import * as Types from "./Types";

const initialState = {
  originInput: {
    originName: "",
    originLogo: { publicId: null, url: "" },
  },
  updateInput: {
    originName: "",
    originLogo: { publicId: null, url: "" },
  },
  isOrigin: false,
  isUpdate: false,
  isUpdated: false,
  afterCreated: false,
  afterDeleted: false,
  originList: null,
  isImageLoading: false,
};
const OriginReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_ORIGIN_INPUT:
      const originInput = { ...state.originInput };
      originInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        originInput: originInput,
      };
    case Types.GET_UPDATE_INPUT:
      const updateInput2 = { ...state.updateInput };
      updateInput2[action.payload.name] = action.payload.value;
      return {
        ...state,
        updateInput: updateInput2,
      };
    case Types.SET_ORIGIN_INPUT:
      let updateInput = { ...state.updateInput };
      updateInput = action.payload;
      return {
        ...state,
        updateInput: updateInput,
      };
    case Types.AFTER_CREATE_ORIGIN:
      const originInputAfter = initialState.originInput;
      return {
        ...state,
        originInput: originInputAfter,
      };
    case Types.IS_CREATE_ORIGIN:
      return {
        ...state,
        isOrigin: action.payload,
      };
    case Types.IS_UPDATE_ORIGIN:
      return {
        ...state,
        isUpdate: action.payload,
      };
    case Types.IS_UPDATED_ORIGIN:
      return {
        ...state,
        isUpdated: action.payload,
      };

    case Types.ORIGIN_LIST:
      return {
        ...state,
        originList: action.payload,
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
export default OriginReducer;
