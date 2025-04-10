import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitArea = (area, areaBn, subDistrict, subDistrictId, district, districtId, division, divisionId) => (dispatch) => {
  if (division.length === 0) {
    showToast("error", "Select a division");
    return 0;
  } else if (district.length === 0) {
    showToast("error", "You Should Select district");
    return 0;
  } else if (subDistrict.length === 0) {
    showToast("error", "You Should Select sub district");
    return 0;
  } else if (area.length === 0) {
    showToast("error", "Area should not be empty");
    return 0;
  } else if (areaBn.length === 0) {
    showToast("error", "Area bangla should not be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}area`;
  dispatch({ type: Types.IS_CREATE_AREA, payload: true });
  const postData = {
    areaName: area,
    areaNameBn: areaBn,
    subDistrictId: subDistrictId,
    subDistrictInfo: subDistrictId,
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
          dispatch({ type: Types.IS_CREATE_AREA, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_AREA, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_AREA, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_AREA, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const AreaUpdate = (area, areaBn, subDistrict, subDistrictId, district, districtId, division, divisionId, id) => (dispatch) => {
  if (division.length === 0) {
    showToast("error", "Select a division");
    return 0;
  } else if (district.length === 0) {
    showToast("error", "You Should Select district");
    return 0;
  } else if (subDistrict.length === 0) {
    showToast("error", "You Should Select sub district");
    return 0;
  } else if (area.length === 0) {
    showToast("error", "Area should not be empty");
    return 0;
  } else if (areaBn.length === 0) {
    showToast("error", "Area bangla should not be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}area/${id}`;
  dispatch({ type: Types.IS_UPDATE_AREA, payload: true });
  const postData = {
    areaName: area,
    areaNameBn: areaBn,
    subDistrictId: subDistrictId,
    subDistrictInfo: subDistrictId,
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
          dispatch({ type: Types.IS_UPDATE_AREA, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_AREA, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_AREA, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_AREA, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetAreaList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}area`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.AREA_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const AreaDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}area/${id}`;
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
export const AreaByDivisionId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}area/by-division/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        // showToast("success", res.data.message);
        dispatch({ type: Types.AREA_LIST, payload: res.data.result });
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};

export const AreaStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}area/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetAreaList())
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