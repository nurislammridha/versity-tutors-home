import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitLanguage = (language) => (dispatch) => {
  if (language.length === 0) {
    showToast("error", "Language shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}language`;
  dispatch({ type: Types.IS_CREATE_LANGUAGE, payload: true });
  const postData = {
    languageName: language,
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_LANGUAGE, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_LANGUAGE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_LANGUAGE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_LANGUAGE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const LanguageUpdate = (language, id) => (dispatch) => {
  if (language.length === 0) {
    showToast("error", "Language shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}language/${id}`;
  dispatch({ type: Types.IS_UPDATE_LANGUAGE, payload: true });
  const postData = {
    languageName: language,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_LANGUAGE, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_LANGUAGE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_LANGUAGE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_LANGUAGE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetLanguageList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}language`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.LANGUAGE_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const LanguageDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}language/${id}`;
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

export const LanguageStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}language/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetLanguageList())
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