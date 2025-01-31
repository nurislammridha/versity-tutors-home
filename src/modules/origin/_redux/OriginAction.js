import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const GetOriginInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_ORIGIN_INPUT, payload: formData });
}
export const OriginUpdateInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_UPDATE_INPUT, payload: formData });
}
export const SetOriginInput = (data) => (dispatch) => {
  delete data._id
  dispatch({ type: Types.SET_ORIGIN_INPUT, payload: data });
}
export const SubmitOrigin = (originInput) => (dispatch) => {
  const { originName, originLogo } = originInput
  if (originName.length === 0) {
    showToast("error", "Origin Name shouldn't be empty");
    return 0;
  } else if (originLogo.url.length === 0) {
    showToast("error", "Origin Logo Url shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}origin`;
  dispatch({ type: Types.IS_CREATE_ORIGIN, payload: true });

  try {
    Axios.post(url, originInput)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_ORIGIN, payload: false });
          dispatch({ type: Types.AFTER_CREATE_ORIGIN, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_ORIGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_ORIGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_ORIGIN, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const OriginUpdate = (originInput, id) => (dispatch) => {
  const { originName, originLogo } = originInput
  if (originName.length === 0) {
    showToast("error", "Origin Name shouldn't be empty");
    return 0;
  } else if (originLogo.url.length === 0) {
    showToast("error", "Logo Url shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}origin/${id}`;
  dispatch({ type: Types.IS_UPDATE_ORIGIN, payload: true });

  try {
    Axios.put(url, originInput)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_ORIGIN, payload: false });
          dispatch({ type: Types.IS_UPDATED_ORIGIN, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_ORIGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_ORIGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_ORIGIN, payload: false });
    showToast("error", "Something went wrong");
  }
};

export const FalseUpdated = () => (dispatch) => {
  dispatch({ type: Types.IS_UPDATED_ORIGIN, payload: false });
};
export const GetOriginList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}origin`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ORIGIN_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const OriginDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}origin/${id}`;
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

const PostImg = (name, img) => (dispatch) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "nurislam");
  data.append("cloud_name ", "nurislammridha");
  const url = "https://api.cloudinary.com/v1_1/nurislammridha/image/upload"
  console.log('name,url,data', name, url, data)
  dispatch({ type: Types.IS_IMG_LOADING, payload: true })
  Axios.post(url, data).then((res) => {
    console.log('res.data', res.data)
    if (res.data) {
      dispatch({ type: Types.IS_IMG_LOADING, payload: false })
      dispatch({ type: Types.GET_ORIGIN_INPUT, payload: { name, value: { publicId: res?.data?.public_id, url: res?.data?.url } } })
    }
  }
  )
}
export const UploadOriginLogo = (name, img, productInput) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = productInput.originLogo.publicId
    if (publicId !== null) {
      Axios.post(urlRemove, { publicId }).then((res) => {
        if (res) {
          dispatch(PostImg(name, img))
        }
      })
    } else {
      dispatch(PostImg(name, img))
    }
  } else {
    showToast("error", "Image should be jpg/jpeg/png");
  }

};
const UpdatePostImg = (name, img) => (dispatch) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "nurislam");
  data.append("cloud_name ", "nurislammridha");
  const url = "https://api.cloudinary.com/v1_1/nurislammridha/image/upload"
  console.log('name,url,data', name, url, data)
  dispatch({ type: Types.IS_IMG_LOADING, payload: true })
  Axios.post(url, data).then((res) => {
    console.log('res.data', res.data)
    if (res.data) {
      dispatch({ type: Types.IS_IMG_LOADING, payload: false })
      dispatch({ type: Types.GET_UPDATE_INPUT, payload: { name, value: { publicId: res?.data?.public_id, url: res?.data?.url } } })
    }
  }
  )
}
export const UpdateOriginLogo = (name, img, productInput) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = productInput.originLogo.publicId
    if (publicId !== null) {
      Axios.post(urlRemove, { publicId }).then((res) => {
        if (res) {
          dispatch(UpdatePostImg(name, img))
        }
      })
    } else {
      dispatch(UpdatePostImg(name, img))
    }
  } else {
    showToast("error", "Image should be jpg/jpeg/png");
  }

};
export const RemoveOriginImg = (id, publicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId }).then((res) => {
    if (res) {
      dispatch(OriginDelete(id))
    }
  })
}