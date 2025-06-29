import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitRole = (data) => (dispatch) => {
  const { name, email, phone, roleType, assignServices, managerId } = data || {}
  if (name.length === 0) {
    showToast("error", "Name shouldn't be empty");
    return 0;
  } else if (email.length === 0) {
    showToast("error", "Email shouldn't be empty");
    return 0;
  } else if (phone.length === 0) {
    showToast("error", "Phone shouldn't be empty");
    return 0;
  } else if (roleType.length === 0) {
    showToast("error", "Select a role type");
    return 0;
  } else if (roleType === "Moderator" && managerId.length === 0) {
    showToast("error", "Select a manager");
    return 0;
  }
  //  else if (assignServices.length === 0) {
  //   showToast("error", "Assign at least one service");
  //   return 0;
  // }
  const url = `${process.env.REACT_APP_API_URL}role`;
  dispatch({ type: Types.IS_CREATE_ROLE, payload: true });

  try {
    Axios.post(url, data)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_ROLE, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_ROLE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_ROLE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_ROLE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const RoleUpdate = (data, id) => (dispatch) => {
  const { name, email, phone, roleType, assignServices, managerId } = data || {}
  if (name.length === 0) {
    showToast("error", "Name shouldn't be empty");
    return 0;
  } else if (email.length === 0) {
    showToast("error", "Email shouldn't be empty");
    return 0;
  } else if (phone.length === 0) {
    showToast("error", "Phone shouldn't be empty");
    return 0;
  } else if (roleType.length === 0) {
    showToast("error", "Select a role type");
    return 0;
  } else if (roleType === "Moderator" && managerId.length === 0) {
    showToast("error", "Select a manager");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}role/${id}`;
  dispatch({ type: Types.IS_UPDATE_ROLE, payload: true });

  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_ROLE, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_ROLE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_ROLE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_ROLE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetRoleList = (search = "", page = 1, managerId, limit = 10000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/filter`;
  try {
    Axios.get(url, { params: { search, filters: managerId, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ROLE_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetAllManager = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/role-type?roleType=Manager`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.MANAGER_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const AllRolesByRoleType = (roleType = "Manager") => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/role-type?roleType=${roleType}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ROLE_LIST_TYPE, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetRoleDetails = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/${id}`;
  dispatch({ type: Types.IS_ROLE_DETAILS, payload: true })
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ROLE_DETAILS, payload: res.data.result })
        dispatch({ type: Types.IS_ROLE_DETAILS, payload: false })
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_ROLE_DETAILS, payload: false })
    showToast("error", "Something went wrong");
  }
};
export const RoleDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/${id}`;
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

export const RoleStatus = (id, status, search, page, managerId, limit) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetRoleList(search, page, managerId, limit))
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