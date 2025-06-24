import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitInstituteType = (instituteType, instituteTypeBn) => (dispatch) => {
  if (instituteType.length === 0) {
    showToast("error", "Institute type shouldn't be empty");
    return 0;
  } else if (instituteTypeBn.length === 0) {
    showToast("error", "Institute type bangla shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}institute-type`;
  dispatch({ type: Types.IS_CREATE_INSTITUTE_TYPE, payload: true });
  const postData = {
    instituteType,
    instituteTypeBn
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_INSTITUTE_TYPE, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_INSTITUTE_TYPE, payload: false });
        }
      })
      .catch((err) => {
        console.log('err', err)
        dispatch({ type: Types.IS_CREATE_INSTITUTE_TYPE, payload: false });
        // const message = JSON.parse(err?.request?.response)?.message;
        // showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_INSTITUTE_TYPE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const InstituteTypeUpdate = (instituteType, instituteTypeBn, id) => (dispatch) => {
  if (instituteType.length === 0) {
    showToast("error", "Institute type shouldn't be empty");
    return 0;
  } else if (instituteTypeBn.length === 0) {
    showToast("error", "Institute type bangla shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}institute-type/${id}`;
  dispatch({ type: Types.IS_UPDATE_INSTITUTE_TYPE, payload: true });
  const postData = {
    instituteType,
    instituteTypeBn
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_INSTITUTE_TYPE, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_INSTITUTE_TYPE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_INSTITUTE_TYPE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_INSTITUTE_TYPE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetInstituteTypeList = (search = "", page = 1, limit = 1000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-type/filter`;
  try {
    Axios.get(url, { params: { search, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.INSTITUTE_TYPE_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const InstituteTypeDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-type/${id}`;
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
export const InstituteTypeStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-type/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetInstituteTypeList())
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