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