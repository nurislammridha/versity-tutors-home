import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitStudyType = (studyType, studyTypeBn) => (dispatch) => {
  if (studyType.length === 0) {
    showToast("error", "Study type shouldn't be empty");
    return 0;
  } else if (studyTypeBn.length === 0) {
    showToast("error", "Study type bangla shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}study-type`;
  dispatch({ type: Types.IS_CREATE_STUDY_TYPE, payload: true });
  const postData = {
    studyType,
    studyTypeBn
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_STUDY_TYPE, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_STUDY_TYPE, payload: false });
        }
      })
      .catch((err) => {
        console.log('err', err)
        dispatch({ type: Types.IS_CREATE_STUDY_TYPE, payload: false });
        // const message = JSON.parse(err?.request?.response)?.message;
        // showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_STUDY_TYPE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const StudyTypeUpdate = (studyType, studyTypeBn, id) => (dispatch) => {
  if (studyType.length === 0) {
    showToast("error", "Study type shouldn't be empty");
    return 0;
  } else if (studyTypeBn.length === 0) {
    showToast("error", "Study type bangla shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}study-type/${id}`;
  dispatch({ type: Types.IS_UPDATE_STUDY_TYPE, payload: true });
  const postData = {
    studyType,
    studyTypeBn
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_STUDY_TYPE, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_STUDY_TYPE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_STUDY_TYPE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_STUDY_TYPE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetStudyTypeList = (search = "", page = 1, limit = 1000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}study-type/filter`;
  try {
    Axios.get(url, { params: { search, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.STUDY_TYPE_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const StudyTypeDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}study-type/${id}`;
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
export const StudyTypeStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}study-type/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetStudyTypeList())
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