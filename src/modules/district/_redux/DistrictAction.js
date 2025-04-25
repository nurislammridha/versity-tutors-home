import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitDistrict = (district, districtBn, division, divisionId,) => (dispatch) => {
  if (district.length === 0) {
    showToast("error", "District name shouldn't be empty");
    return 0;
  } if (districtBn.length === 0) {
    showToast("error", "District name bangla shouldn't be empty");
    return 0;
  } else if (division.length === 0) {
    showToast("error", "You Should Select Division");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}district`;
  dispatch({ type: Types.IS_CREATE_DISTRICT, payload: true });
  const postData = {
    districtName: district,
    districtNameBn: districtBn,
    divisionId: divisionId,
    divisionInfo: divisionId
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_DISTRICT, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_DISTRICT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_DISTRICT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_DISTRICT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const DistrictUpdate = (district, districtBn, division, divisionId, id) => (dispatch) => {
  if (district.length === 0) {
    showToast("error", "District name shouldn't be empty");
    return 0;
  } else if (districtBn.length === 0) {
    showToast("error", "District name bangla shouldn't be empty");
    return 0;
  } else if (division.length === 0) {
    showToast("error", "You Should Select a Division");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}district/${id}`;
  dispatch({ type: Types.IS_UPDATE_DISTRICT, payload: true });
  const postData = {
    districtName: district,
    districtNameBn: districtBn,
    divisionId: divisionId,
    divisionInfo: divisionId,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_DISTRICT, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_DISTRICT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_DISTRICT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_DISTRICT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetDistrictList = (search = "", page = 1, divisionId, limit = 10000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}district/filter`;
  try {
    Axios.get(url, { params: { search, filters: divisionId, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.DISTRICT_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const DistrictDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}district/${id}`;
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
export const DistrictByDivisionId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}district/by-division/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        // showToast("success", res.data.message);
        dispatch({ type: Types.DISTRICT_LIST, payload: res.data.result });
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const DistrictStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}district/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetDistrictList())
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