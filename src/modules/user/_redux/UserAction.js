import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//

export const GetUserList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}buyer/all-buyers`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.USER_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const UserDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}buyer/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("error", res.data.message);
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
