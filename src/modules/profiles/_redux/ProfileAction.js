import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const GetProfileList = (data) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client/filter`;
  try {
    Axios.post(url, data).then((res) => {
      if (res.data.status) {
        // console.log('res.data.result', res.data.result)
        dispatch({ type: Types.PROFILE_LIST, payload: res.data.result });
        dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const ProfileUpdate = (data, listData, id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client/${id}`;
  dispatch({ type: Types.IS_UPDATE_LOADING, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch(GetProfileList(listData));
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};

export const ProfileDelete = (listData, id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}language/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch(GetProfileList(listData));
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetProfileDetails = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client/${id}`;
  dispatch({ type: Types.IS_PROFILE_DETAILS_LOADING, payload: true })

  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_PROFILE_DETAILS_LOADING, payload: false });
        dispatch({ type: Types.PROFILE_DETAILS, payload: res.data.result });

      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_PROFILE_DETAILS_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};