import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitSubDistrict = (subDistrict, district, districtId, division, divisionId) => (dispatch) => {
  if (division.length === 0) {
    showToast("error", "Select a division");
    return 0;
  } else if (district.length === 0) {
    showToast("error", "You Should Select district");
    return 0;
  } else if (subDistrict.length === 0) {
    showToast("error", "Sub District should not be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sub-district`;
  dispatch({ type: Types.IS_CREATE_SUBDISTRICT, payload: true });
  const postData = {
    subDistrictName: subDistrict,
    districtId: districtId,
    districtInfo: districtId,
    divisionId: divisionId,
    divisionInfo: divisionId
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_SUBDISTRICT, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_SUBDISTRICT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_SUBDISTRICT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_SUBDISTRICT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const SubDistrictUpdate = (subDistrict, district, districtId, division, divisionId, id) => (dispatch) => {
  if (division.length === 0) {
    showToast("error", "Select a division");
    return 0;
  } else if (district.length === 0) {
    showToast("error", "You Should Select district");
    return 0;
  } else if (subDistrict.length === 0) {
    showToast("error", "Sub District should not be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sub-district/${id}`;
  dispatch({ type: Types.IS_UPDATE_SUBDISTRICT, payload: true });
  const postData = {
    subDistrictName: subDistrict,
    districtId: districtId,
    districtInfo: districtId,
    divisionId: divisionId,
    divisionInfo: divisionId
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_SUBDISTRICT, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_SUBDISTRICT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_SUBDISTRICT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_SUBDISTRICT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetSubDistrictList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-district`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.SUBDISTRICT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SubDistrictDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-district/${id}`;
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
export const SubDistrictByDivisionId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-district/by-division/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        // showToast("success", res.data.message);
        dispatch({ type: Types.SUBDISTRICT_LIST, payload: res.data.result });
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const SubDistrictStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-district/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetSubDistrictList())
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