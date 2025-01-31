import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitUnit = (unit) => (dispatch) => {
  if (unit.length === 0) {
    showToast("error", "Unit shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}unit`;
  dispatch({ type: Types.IS_CREATE_UNIT, payload: true });
  const postData = {
    unitName: unit
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_UNIT, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_UNIT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_UNIT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_UNIT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
//Submit 
export const UnitUpdate = (unit, id) => (dispatch) => {
  if (unit.length === 0) {
    showToast("error", "Unit shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}unit/${id}`;
  dispatch({ type: Types.IS_UPDATE_UNIT, payload: true });
  const postData = {
    unitName: unit
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_UNIT, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_UNIT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_UNIT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_UNIT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetUnitList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}unit`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.UNIT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const UnitDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}unit/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch({ type: Types.AFTER_DELETED, payload: true })
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const AfterDeletedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_DELETED, payload: false })
}