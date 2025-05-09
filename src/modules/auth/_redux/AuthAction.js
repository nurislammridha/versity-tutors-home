import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitLogin = (data) => (dispatch) => {
  if (data.email.length === 0) {
    showToast("error", "Email shouldn't be empty");
    return 0;
  } else if (data.password.length === 0) {
    showToast("error", "password should not be empty");
    return 0;
  } else if (data.password.length < 6) {
    showToast("error", "Password should be minimum six charecter!");
    return 0;
  }
  const dummyUser = {
    assignServices: {
      class: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb41c"
      },
      subject: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb41d"
      },
      division: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb41e"
      },
      district: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb41f"
      },
      subDistrict: {
        "View": false,
        "Create": false,
        "Edit": false,
        "Delete": false,
        "_id": "681e386fcdb7a427a81eb4dd"
      },
      area: {
        "View": false,
        "Create": false,
        "Edit": false,
        "Delete": false,
        "_id": "681e386fcdb7a427a81eb4de"
      },
      package: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb422"
      },
      tutorManagement: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb423"
      },
      studentManagement: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb424"
      },
      manualTutorRequest: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb425"
      },
      createRole: {
        "View": true,
        "Create": true,
        "Edit": true,
        "Delete": true,
        "_id": "681e3565cdb7a427a81eb425"
      }
    },
    isRegistered: true,
    isActive: true,
    _id: null,
    name: "Rakibul",
    email: "rakibul@gmail.com",
    phone: "01753109207",
    roleType: "Super Admin",
    createdAt: "2025-05-09T17:03:33.195Z",
    updatedAt: "2025-05-09T19:05:34.222Z",
    password: "123456"
  }
  const url = `${process.env.REACT_APP_API_URL}admin/login`;
  dispatch({ type: Types.IS_LOGIN, payload: true });
  try {
    Axios.post(url, data)
      .then((res) => {
        console.log(`res`, res);
        if (res.data.status) {
          if (res.data.isLogin) {
            showToast("success", res.data.message);
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(dummyUser));
            localStorage.setItem("isLogin", "true");
            dispatch({ type: Types.IS_LOGIN, payload: false });
            dispatch({ type: Types.LOGIN_SUCCESS, payload: true });
          } else {
            showToast("error", res.data.message);
            dispatch({ type: Types.IS_LOGIN, payload: false });
          }

        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOGIN, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const SetFalseLogin = () => (dispatch) => {
  dispatch({ type: Types.LOGIN_SUCCESS, payload: false });
};
export const NotificationByAdmin = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}notification/admin`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.NOTIFICATION_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SeenNotification = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}notification/${id}`;
  try {
    Axios.put(url).then((res) => {
      if (res.data.status) {
        dispatch(NotificationByAdmin())
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const NotificationAsClicked = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}notification/admin`;
  try {
    Axios.put(url).then((res) => {
      if (res.data.status) {
        dispatch(NotificationByAdmin())
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const CreateNotification = (data) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}notification`;
  try {
    Axios.post(url, data).then((res) => {
      if (res.data.status) {
        //
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SubmitRoleReg = (email, password, cPassword) => (dispatch) => {
  if (email.length === 0) {
    showToast("error", "Email shouldn't be empty");
    return 0;
  } else if (password.length === 0) {
    showToast("error", "password should not be empty");
    return 0;
  } else if (password.length < 6) {
    showToast("error", "Confirm Password should be minimum six charecter!");
    return 0;
  } else if (cPassword.length < 6) {
    showToast("error", "Confirm Password should be minimum six charecter!");
    return 0;
  } else if (password !== cPassword) {
    showToast("error", "Password and confirmed password mismatch");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}role/registration`;
  dispatch({ type: Types.IS_LOGIN, payload: true });
  try {
    Axios.post(url, { email, password })
      .then((res) => {
        console.log(`res`, res);
        if (res.data.status) {
          if (res.data.isLogin) {
            showToast("success", res.data.message);
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(res.data.result));
            localStorage.setItem("isLogin", "true");
            dispatch({ type: Types.IS_LOGIN, payload: false });
            dispatch({ type: Types.LOGIN_SUCCESS, payload: true });
          } else {
            showToast("error", res.data.message);
            dispatch({ type: Types.IS_LOGIN, payload: false });
          }

        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOGIN, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const SubmitRoleLogin = (email, password) => (dispatch) => {
  if (email.length === 0) {
    showToast("error", "Email shouldn't be empty");
    return 0;
  } else if (password.length === 0) {
    showToast("error", "password should not be empty");
    return 0;
  } else if (password.length < 6) {
    showToast("error", "Confirm Password should be minimum six charecter!");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}role/login`;
  dispatch({ type: Types.IS_LOGIN, payload: true });
  try {
    Axios.post(url, { email, password })
      .then((res) => {
        console.log(`res`, res);
        if (res.data.status) {
          if (res.data.isLogin) {
            showToast("success", res.data.message);
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(res.data.result));
            localStorage.setItem("isLogin", "true");
            dispatch({ type: Types.IS_LOGIN, payload: false });
            dispatch({ type: Types.LOGIN_SUCCESS, payload: true });
          } else {
            showToast("error", res.data.message);
            dispatch({ type: Types.IS_LOGIN, payload: false });
          }

        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOGIN, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const FalseSubmitRoleReg = () => (dispatch) => {
  dispatch({ type: Types.LOGIN_SUCCESS, payload: false });
};
export const GlobalUserData = (data) => (dispatch) => {
  dispatch({ type: Types.USER_DATA, payload: data });
};