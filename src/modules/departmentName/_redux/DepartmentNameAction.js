import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitDepartmentName = (departmentName, departmentNameBn, studyType, studyTypeId) => (dispatch) => {
  if (departmentName.length === 0) {
    showToast("error", "Department name shouldn't be empty");
    return 0;
  } else if (departmentNameBn.length === 0) {
    showToast("error", "Department name bangla shouldn't be empty");
    return 0;
  } else if (studyType.length === 0) {
    showToast("error", "You Should Select Department Type");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}department-name`;
  dispatch({ type: Types.IS_CREATE_DEPARTMENT_NAME, payload: true });
  const postData = {
    departmentName,
    departmentNameBn,
    studyTypeId,
    studyTypeInfo: studyTypeId
  };

  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_DEPARTMENT_NAME, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_DEPARTMENT_NAME, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_DEPARTMENT_NAME, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_DEPARTMENT_NAME, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const DepartmentNameUpdate = (departmentName, departmentNameBn, studyType, studyTypeId, id) => (dispatch) => {
  if (departmentName.length === 0) {
    showToast("error", "Department name shouldn't be empty");
    return 0;
  } if (departmentNameBn.length === 0) {
    showToast("error", "Department name bangla shouldn't be empty");
    return 0;
  } else if (studyType.length === 0) {
    showToast("error", "You Should Select Department type");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}department-name/${id}`;
  dispatch({ type: Types.IS_UPDATE_DEPARTMENT_NAME, payload: true });
  const postData = {
    departmentName,
    departmentNameBn,
    studyTypeId,
    studyTypeInfo: studyTypeId,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_DEPARTMENT_NAME, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_DEPARTMENT_NAME, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_DEPARTMENT_NAME, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_DEPARTMENT_NAME, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetDepartmentNameList = (search, page, studyTypeId, limit = 1000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}department-name/filter`;
  try {
    Axios.get(url, { params: { search, filters: studyTypeId, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.DEPARTMENT_NAME_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const DepartmentNameDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}department-name/${id}`;
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
export const DepartmentNameByStudyTypeId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}department-name/by-department-type/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        // showToast("success", res.data.message);
        dispatch({ type: Types.DEPARTMENT_NAME_LIST, payload: res.data.result });
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};


export const DepartmentNameStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}department-name/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetDepartmentNameList())
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