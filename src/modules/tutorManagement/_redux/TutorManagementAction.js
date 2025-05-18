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
export const GetProfileListFilter = (data) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client/filter`;
  // dispatch({ type: Types.IS_PROFILES_LOADING, payload: true })

  try {
    Axios.post(url, data).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PROFILE_LIST, payload: res.data });
        dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    // dispatch({ type: Types.IS_PROFILES_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const ProfileUpdate = (profileUpdateData, item, getProfileObj, historyData) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}client/${item}`;
  dispatch({ type: Types.IS_UPDATE_LOADING, payload: true });
  let postData = historyData === null ? profileUpdateData : { ...profileUpdateData, moderationHistory: historyData?._id }
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
          dispatch(GetProfileList(getProfileObj));
          showToast("success", res.data.message);
          // !isHistoryUpdate ? dispatch(ModerationHistoryCreate(id, userInfo, profileObj)) : dispatch(ModerationHistoryUpdate(postData, userInfo, profileObj, historyData))
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
export const ModerationHistoryCreate = (profileUpdateData, itemId, userInfo, getProfileObj) => (dispatch) => {

  const url = `${process.env.REACT_APP_API_URL}moderationHistory`;

  const { _id, managerInfo } = userInfo || {}
  const postData = {
    roleId: _id,
    roleInfo: _id,
    clientId: itemId,
    clientInfo: itemId,
    managerId: managerInfo?._id,
    managerInfo: managerInfo?._id,
    statusHistory: [{ status: "underReview" }]
  }
  dispatch({ type: Types.IS_UPDATE_LOADING, payload: true });
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          // dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
          showToast("success", res.data.message);
          const historyData = res.data.result
          dispatch(ProfileUpdate(profileUpdateData, itemId, getProfileObj, historyData));
          // localStorage.setItem("history", JSON.stringify(res.data.result))
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
export const ModerationHistoryUpdate = (postData, item, userInfo, getProfileObj) => (dispatch) => {
  let historyData = null
  const url = `${process.env.REACT_APP_API_URL}moderationHistory/${item?.moderationHistory?._id}`;
  const { reviewStatus, assignedModerator, comment } = postData || {}
  // const { _id, managerInfo } = userInfo || {}
  const d = new Date()
  const updateData = {
    endingTime: d,
    isTaskComplete: ['approved', 'rejected'].includes(reviewStatus) ? true : false,
    lastStatus: reviewStatus,
    comment,
    statusHistory: [{ status: reviewStatus }]
  }
  dispatch({ type: Types.IS_UPDATE_LOADING, payload: true });
  try {
    Axios.put(url, updateData)
      .then((res) => {
        if (res.data.status) {
          // dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
          showToast("success", res.data.message);
          dispatch(ProfileUpdate(postData, item?._id, getProfileObj, historyData));

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

export const GetDocumentByClientId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}document/client/${id}`;
  dispatch({ type: Types.IS_DOCUMENT_LOADING, payload: true })
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_DOCUMENT_LOADING, payload: false });
        dispatch({ type: Types.DOCUMENT_INFO, payload: res?.data?.result });
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_DOCUMENT_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};