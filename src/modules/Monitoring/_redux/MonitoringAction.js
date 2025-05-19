import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//


export const GetModeratorMonitoringList = (managerId, search = "", page = 1, limit = 10000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}moderationHistory/filter`;
  console.log('managerId', managerId)
  try {
    Axios.get(url, { params: { search, page, limit, managerId } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.MODERATOR_MONITOR_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const GetModerationTutorDetails = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}moderationHistory/${id}`;
  dispatch({ type: Types.IS_MODERATOR_TUTOR_DETAILS, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.MODERATOR_TUTOR_DETAILS, payload: res.data.result });
        dispatch({ type: Types.IS_MODERATOR_TUTOR_DETAILS, payload: false });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};