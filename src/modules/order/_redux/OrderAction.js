import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
import moment from "moment";
//test//est//

export const GetOrderById = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}order/order-details/${id}`;
  dispatch({ type: Types.IS_ORDER_DETAILS, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ORDER_DETAILS, payload: res.data.result });
        dispatch({ type: Types.IS_ORDER_DETAILS, payload: false });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const GetOrderList = (status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}order/order-status?orderStatus=${status}`;
  dispatch({ type: Types.IS_ORDER_LIST, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ORDER_LIST, payload: res.data.result });
        dispatch({ type: Types.IS_ORDER_LIST, payload: false });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const statusUpdate = (data, id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}order/${id}`;
  dispatch({ type: Types.IS_UPDATING, payload: true });
  try {
    Axios.put(url, data).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch({ type: Types.IS_UPDATING, payload: false });
        dispatch(GetOrderList(status));
        // dispatch({ type: Types.AFTER_UPDATE_STATUS, payload: true });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const falseStatusUpdate = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATE_STATUS, payload: false });
};
export const UserDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}user/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("error", res.data.message);
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
