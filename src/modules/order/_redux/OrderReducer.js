import * as Types from "./Types";

const initialState = {
  orderList: null,
  isOrderList: false,
  isUpdating: false,
  afterUpdateStatus: false,
  isOrderDetails: false,
  orderDetails: null,
};
const OrderReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };
    case Types.IS_ORDER_LIST:
      return {
        ...state,
        isOrderList: action.payload,
      };
    case Types.AFTER_UPDATE_STATUS:
      return {
        ...state,
        afterUpdateStatus: action.payload,
      };
    case Types.IS_UPDATING:
      return {
        ...state,
        isUpdating: action.payload,
      };
    case Types.IS_ORDER_DETAILS:
      return {
        ...state,
        isOrderDetails: action.payload,
      };
    case Types.ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };

    default:
      break;
  }
  return newState;
};
export default OrderReducer;
