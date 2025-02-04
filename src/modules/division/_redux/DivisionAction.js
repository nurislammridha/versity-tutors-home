import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitDivision = (division) => (dispatch) => {
  if (division.length === 0) {
    showToast("error", "Division shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}division`;
  dispatch({ type: Types.IS_CREATE_DIVISION, payload: true });
  const postData = {
    divisionName: division,
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_DIVISION, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_DIVISION, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_DIVISION, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_DIVISION, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const DivisionUpdate = (division, id) => (dispatch) => {
  if (division.length === 0) {
    showToast("error", "Division shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}division/${id}`;
  dispatch({ type: Types.IS_UPDATE_DIVISION, payload: true });
  const postData = {
    divisionName: division,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_DIVISION, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_DIVISION, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_DIVISION, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_DIVISION, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetDivisionList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}division`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.DIVISION_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const DivisionDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}division/${id}`;
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

export const DivisionStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}division/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetDivisionList())
        } else {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
    showToast("error", "Something went wrong");
  }
};