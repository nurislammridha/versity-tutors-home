import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitCategory = (category, categoryBn, categoryImg) => (dispatch) => {
  if (category.length === 0) {
    showToast("error", "Class nme shouldn't be empty");
    return 0;
  } else if (categoryBn.length === 0) {
    showToast("error", "Class name bangla shouldn't be empty");
    return 0;
  } else if (categoryImg.publicId === null) {
    showToast("error", "Select a category Image");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}category`;
  dispatch({ type: Types.IS_CREATE_CATEGORY, payload: true });
  const postData = {
    categoryName: category,
    categoryNameBn: categoryBn,
    img: categoryImg
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_CATEGORY, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_CATEGORY, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_CATEGORY, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_CATEGORY, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const CategoryUpdate = (category, categoryBn, categoryImg, categoryLogo, id) => (dispatch) => {
  if (category.length === 0) {
    showToast("error", "Class name shouldn't be empty");
    return 0;
  } else if (categoryBn.length === 0) {
    showToast("error", "Class name bangla shouldn't be empty");
    return 0;
  } else if (categoryImg.publicId === null) {
    showToast("error", "Select a category Image");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}category/${id}`;
  dispatch({ type: Types.IS_UPDATE_CATEGORY, payload: true });
  const postData = {
    categoryName: category,
    categoryNameBn: categoryBn,
    img: categoryImg
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_CATEGORY, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_CATEGORY, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_CATEGORY, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_CATEGORY, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetCategoryList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}category`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.CATEGORY_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const CategoryDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}category/${id}`;
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
      dispatch(CategoryDelete(id))
    }
  })
}
export const RemoveCatLogo = (id, publicId, logoPublicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId: logoPublicId }).then((res) => {
    if (res) {
      // dispatch(CategoryDelete(id))
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
export const CategoryStatus = (id, status) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}category/${id}`;
  dispatch({ type: Types.IS_STATUS_UPDATE, payload: true });
  const postData = {
    isActive: !status,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_STATUS_UPDATE, payload: false });
          dispatch(GetCategoryList())
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