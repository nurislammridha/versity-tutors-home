import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitConnectionPackage = (name, nameBn, connections, connectionsBn, price, priceBn) => (dispatch) => {
  if (name.length === 0) {
    showToast("error", "Name shouldn't be empty");
    return 0;
  } else if (nameBn.length === 0) {
    showToast("error", "Name bangla shouldn't be empty");
    return 0;
  } else if (connections <= 0) {
    showToast("error", "Connection number should be greater than zero");
    return 0;
  } else if (connectionsBn.length === 0) {
    showToast("error", "Connection number bangla should not empty");
    return 0;
  } else if (price <= 0) {
    showToast("error", "Price should be greater than zero");
    return 0;
  } else if (priceBn.length === 0) {
    showToast("error", "Connection price bangla should not empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}connection-package`;
  dispatch({ type: Types.IS_CREATE_CONNECTIONPACKAGE, payload: true });
  const postData = {
    name, nameBn, connections, connectionsBn, price, priceBn
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_CONNECTIONPACKAGE, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_CONNECTIONPACKAGE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_CONNECTIONPACKAGE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_CONNECTIONPACKAGE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const ConnectionPackageUpdate = (name, nameBn, connections, connectionsBn, price, priceBn, id) => (dispatch) => {
  if (name.length === 0) {
    showToast("error", "Name shouldn't be empty");
    return 0;
  } else if (nameBn.length === 0) {
    showToast("error", "Name bangla shouldn't be empty");
    return 0;
  } else if (connections <= 0) {
    showToast("error", "Connection number should be greater than zero");
    return 0;
  } else if (connectionsBn.length === 0) {
    showToast("error", "Connection number bangla should not empty");
    return 0;
  } else if (price <= 0) {
    showToast("error", "Price should be greater than zero");
    return 0;
  } else if (priceBn.length === 0) {
    showToast("error", "Connection price bangla should not empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}connection-package/${id}`;
  dispatch({ type: Types.IS_UPDATE_CONNECTIONPACKAGE, payload: true });
  const postData = {
    name, nameBn, connections, connectionsBn, price, priceBn
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_CONNECTIONPACKAGE, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_CONNECTIONPACKAGE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_CONNECTIONPACKAGE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_CONNECTIONPACKAGE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetConnectionPackageList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}connection-package`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.CONNECTIONPACKAGE_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const ConnectionPackageDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}connection-package/${id}`;
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

export const ConnectionPackageStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}connection-package/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetConnectionPackageList())
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