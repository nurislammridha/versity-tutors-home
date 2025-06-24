import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitInstituteName = (instituteName, instituteNameBn, instituteType, instituteTypeId) => (dispatch) => {
  if (instituteName.length === 0) {
    showToast("error", "Institute name shouldn't be empty");
    return 0;
  } else if (instituteNameBn.length === 0) {
    showToast("error", "Institute name bangla shouldn't be empty");
    return 0;
  } else if (instituteType.length === 0) {
    showToast("error", "You Should Select Institute Type");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}institute-name`;
  dispatch({ type: Types.IS_CREATE_INSTITUTE_NAME, payload: true });
  const postData = {
    instituteName,
    instituteNameBn,
    instituteTypeId,
    instituteTypeInfo: instituteTypeId
  };

  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_INSTITUTE_NAME, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_INSTITUTE_NAME, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_INSTITUTE_NAME, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_INSTITUTE_NAME, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const InstituteNameUpdate = (instituteName, instituteNameBn, instituteType, instituteTypeId, id) => (dispatch) => {
  if (instituteName.length === 0) {
    showToast("error", "Institute name shouldn't be empty");
    return 0;
  } if (instituteNameBn.length === 0) {
    showToast("error", "Institute name bangla shouldn't be empty");
    return 0;
  } else if (instituteType.length === 0) {
    showToast("error", "You Should Select Institute type");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}institute-name/${id}`;
  dispatch({ type: Types.IS_UPDATE_INSTITUTE_NAME, payload: true });
  const postData = {
    instituteName,
    instituteNameBn,
    instituteTypeId,
    instituteTypeInfo: instituteTypeId,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_INSTITUTE_NAME, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_INSTITUTE_NAME, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_INSTITUTE_NAME, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_INSTITUTE_NAME, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetInstituteNameList = (search, page, instituteTypeId, limit = 1000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-name/filter`;
  try {
    Axios.get(url, { params: { search, filters: instituteTypeId, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.INSTITUTE_NAME_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const InstituteNameDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-name/${id}`;
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
export const InstituteNameByInstituteTypeId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-name/by-institute-type/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        // showToast("success", res.data.message);
        dispatch({ type: Types.INSTITUTE_NAME_LIST, payload: res.data.result });
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};


export const InstituteNameStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}institute-name/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetInstituteNameList())
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