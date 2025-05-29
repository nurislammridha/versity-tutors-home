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
  if (profileUpdateData?.reviewStatus === "approved") {
    postData.isApproved = true
  }
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
          !profileUpdateData?.rejectionByManager && dispatch(GetProfileList(getProfileObj));
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
    statusHistory: [{ status: "underReview", comment: "I'm taking the task" }]
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
  console.log('item', item)
  const { reviewStatus, assignedModerator, comment, taskRejection, reviewByManager, rejectionByManager } = postData || {}
  const url = `${process.env.REACT_APP_API_URL}moderationHistory/${item?.moderationHistory?._id}`;
  // console.log('first', reviewByManager, url)
  // return 0
  // const { _id, managerInfo } = userInfo || {}
  // console.log('comment', comment)
  // console.log('url', url)
  // return 0
  const d = new Date()
  const updateData = {
    endingTime: d,
    isTaskComplete: ['approved', 'rejected'].includes(reviewStatus) ? true : false,
    lastStatus: reviewStatus,
    comment,
    statusHistory: [{ status: reviewStatus, comment }]
  }
  if (taskRejection) {
    updateData.isTaskComplete = true
    updateData.isTaskRejected = true
    updateData.taskRejectedBy = "moderator"
    updateData.assignedModerator = null
    updateData.lastStatus = "underReview"
    updateData.statusHistory = [{ status: "taskRejected", comment }]
    updateData.taskRejectedNote = comment
  }
  if (rejectionByManager) {
    updateData.isTaskComplete = true
    updateData.isTaskRejected = true
    updateData.isCheckedByManager = true
    updateData.taskRejectedBy = "manager"
    updateData.assignedModerator = null
    updateData.statusHistory = [{ status: "taskRejected", comment }]
    updateData.taskRejectedNote = comment
    delete updateData.comment
    delete updateData.endingTime
    delete updateData.lastStatus
  }
  if (reviewByManager) {
    updateData.isTaskComplete = true
    updateData.isTaskRejected = false
    updateData.isCheckedByManager = true
    updateData.statusHistory = [{ status: "managerChecked", comment }]
    updateData.managerCheckingComment = comment
    delete updateData.comment
    delete updateData.endingTime
    delete updateData.lastStatus
  }
  // console.log('updateData', updateData)
  // return 0
  dispatch({ type: Types.IS_UPDATE_LOADING, payload: true });
  try {
    Axios.put(url, updateData)
      .then((res) => {
        if (res.data.status) {
          // dispatch({ type: Types.IS_UPDATE_LOADING, payload: false });
          showToast("success", res.data.message);
          !reviewByManager && dispatch(ProfileUpdate(postData, item?._id, getProfileObj, historyData));

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