import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitColor = (colorName, colorHexCode) => (dispatch) => {
  if (colorName.length === 0) {
    showToast("error", "Color shouldn't be empty");
    return 0;
  }
  // else if (colorHexCode.length === 0) {
  //   showToast("error", "Color Hexa Code shouldn't be empty");
  //   return 0;
  // }
  const url = `${process.env.REACT_APP_API_URL}color`;
  dispatch({ type: Types.IS_CREATE_COLOR, payload: true });
  const postData = {
    colorName, colorHexCode
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_COLOR, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_COLOR, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_COLOR, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_COLOR, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
//test//est//
export const ColorUpdate = (colorName, colorHexCode, id) => (dispatch) => {
  if (colorName.length === 0) {
    showToast("error", "Color shouldn't be empty");
    return 0;
  }
  // else if (colorHexCode.length === 0) {
  //   showToast("error", "Color Hexa Code shouldn't be empty");
  //   return 0;
  // }
  const url = `${process.env.REACT_APP_API_URL}color/${id}`;
  dispatch({ type: Types.IS_UPDATE_COLOR, payload: true });
  const postData = {
    colorName, colorHexCode
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_COLOR, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_COLOR, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_COLOR, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_COLOR, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetColorList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}color`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.COLOR_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const ColorDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}color/${id}`;
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