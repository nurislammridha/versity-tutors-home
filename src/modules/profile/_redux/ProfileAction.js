import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const GetProfileById = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}role/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        localStorage.setItem("userData", JSON.stringify(res.data.result))
        dispatch({ type: Types.IS_UPDATE_PROFILE, payload: false });
        dispatch({ type: Types.AFTER_UPDATED, payload: true });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SubmitUserUpdate = (data, password, cPassword, id) => (dispatch) => {
  const { name, gender, phone, whatsapp, address } = data
  if (name.length === 0) {
    showToast("error", "Name name shouldn't be empty");
    return 0;
  } else if (phone.length === 0) {
    showToast("error", "Phone shouldn't be empty");
    return 0;
  } else if (whatsapp.length === 0) {
    showToast("error", "Whatsapp shouldn't be empty");
    return 0;
  } else if (address.length === 0) {
    showToast("error", "Address shouldn't be empty");
    return 0;
  } else if (gender.length === 0) {
    showToast("error", "Select a gender");
    return 0;
  }
  if (password.length > 0) {
    if (password.length < 6) {
      showToast("error", "Password should at least six character");
      return 0;
    } else if (cPassword.length < 6) {
      showToast("error", "Confirmed Password should at least six character");
      return 0;
    } else if (password !== cPassword) {
      showToast("error", "Password Mismatch");
      return 0;
    }
  }
  if (password.length >= 6 && cPassword >= 6 && password === cPassword) {
    data.password = password
  }
  const url = `${process.env.REACT_APP_API_URL}role/${id}`;
  dispatch({ type: Types.IS_UPDATE_PROFILE, payload: true });

  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch(GetProfileById(id))
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_PROFILE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_PROFILE, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_PROFILE, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetProfileList = (search = "", page = 1, limit = 1000) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}profile/filter`;
  try {
    Axios.get(url, { params: { search, page, limit } }).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PROFILE_LIST, payload: res.data });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const ProfileDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}profile/${id}`;
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

const PostImg = (img) => (dispatch) => {
  // console.log('img', img)
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "nurislam");
  data.append("cloud_name ", "nurislammridha");
  const url = "https://api.cloudinary.com/v1_1/nurislammridha/image/upload"
  // console.log('name,url,data', name, url, data)
  dispatch({ type: Types.IS_IMG_LOADING, payload: true })
  Axios.post(url, data).then((res) => {
    // console.log('res.data', res.data)
    if (res.data) {
      let data = { publicId: res?.data?.public_id, url: res?.data?.url }
      dispatch({ type: Types.CAT_IMG, payload: data })
      dispatch({ type: Types.IS_IMG_LOADING, payload: false })
    }
  }
  )
}
const PostLogo = (img) => (dispatch) => {
  // console.log('img', img)
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "nurislam");
  data.append("cloud_name ", "nurislammridha");
  const url = "https://api.cloudinary.com/v1_1/nurislammridha/image/upload"
  // console.log('name,url,data', name, url, data)
  dispatch({ type: Types.IS_LOGO_LOADING, payload: true })
  Axios.post(url, data).then((res) => {
    // console.log('res.data', res.data)
    if (res.data) {
      let data = { publicId: res?.data?.public_id, url: res?.data?.url }
      dispatch({ type: Types.CAT_LOGO, payload: data })
      dispatch({ type: Types.IS_LOGO_LOADING, payload: false })
    }
  }
  )
}
export const RemoveCatImg = (id, publicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId }).then((res) => {
    if (res) {
      dispatch(ProfileDelete(id))
    }
  })
}
export const RemoveCatLogo = (id, publicId, logoPublicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId: logoPublicId }).then((res) => {
    if (res) {
      // dispatch(ProfileDelete(id))
      dispatch(RemoveCatImg(id, publicId))
    }
  })
}
export const UploadCatImg = (img, catImg) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = catImg.publicId
    if (publicId !== null) {
      Axios.post(urlRemove, { publicId }).then((res) => {
        if (res) {
          dispatch(PostImg(img))
        }
      })
    } else {
      dispatch(PostImg(img))
    }
  } else {
    showToast("error", "Image should be jpg/jpeg/png");
  }

};
export const UploadCatLogo = (img, catLogo) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = catLogo.publicId
    if (publicId !== null) {
      Axios.post(urlRemove, { publicId }).then((res) => {
        if (res) {
          dispatch(PostLogo(img))
        }
      })
    } else {
      dispatch(PostLogo(img))
    }
  } else {
    showToast("error", "Image should be jpg/jpeg/png");
  }

};
export const ProfileStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}profile/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetProfileList())
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