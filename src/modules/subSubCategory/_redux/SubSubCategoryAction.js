import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const SubmitSubSubCategory = (subSubCategory, subCategoryId, categoryId, subSubCategoryImg) => (dispatch) => {
  if (subSubCategory.length === 0) {
    showToast("error", "Sub Sub category name shouldn't be empty");
    return 0;
  } else if (categoryId.length === 0) {
    showToast("error", "You Should Select Category Name");
    return 0;
  } else if (subCategoryId.length === 0) {
    showToast("error", "You Should Select Category Name");
    return 0;
  } else if (subSubCategoryImg.publicId === null) {
    showToast("error", "Select a category logo");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sub-sub-category`;
  dispatch({ type: Types.IS_CREATE_SUBCATEGORY, payload: true });
  const postData = {
    categoryId: categoryId,
    categoryInfo: categoryId,
    subCategoryId: subCategoryId,
    subCategoryInfo: subCategoryId,
    subSubCategoryName: subSubCategory,
    subSubCategoryImg: subSubCategoryImg,
  };
  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_SUBCATEGORY, payload: false });
          dispatch({ type: Types.AFTER_CREATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_SUBCATEGORY, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_SUBCATEGORY, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_SUBCATEGORY, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterCreatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATED, payload: false })
}
export const SubSubCategoryUpdate = (subSubCategory, subSubCategoryImg, categoryId, subCategoryId, id) => (dispatch) => {
  if (subSubCategory.length === 0) {
    showToast("error", "Sub Sub category name shouldn't be empty");
    return 0;
  } else if (categoryId.length === 0) {
    showToast("error", "You Should Select Category Name");
    return 0;
  } else if (subCategoryId.length === 0) {
    showToast("error", "You Should Select Category Name");
    return 0;
  } else if (subSubCategoryImg.publicId === null) {
    showToast("error", "Select a category logo");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}sub-sub-category/${id}`;
  dispatch({ type: Types.IS_UPDATE_SUBCATEGORY, payload: true });
  const postData = {
    categoryId: categoryId,
    categoryInfo: categoryId,
    subCategoryId: subCategoryId,
    subCategoryInfo: subCategoryId,
    subSubCategoryName: subSubCategory,
    subSubCategoryImg: subSubCategoryImg,
  };
  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_SUBCATEGORY, payload: false });
          dispatch({ type: Types.AFTER_UPDATED, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_SUBCATEGORY, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_SUBCATEGORY, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_SUBCATEGORY, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const AfterUpdatedFalse = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATED, payload: false })
}
export const GetSubSubCategoryList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-sub-category`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.SUBCATEGORY_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SubSubCategoryDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-sub-category/${id}`;
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
export const SubSubCategoryBySubCategoryId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}sub-sub-category/by-sub-category/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        // showToast("success", res.data.message);
        dispatch({ type: Types.SUBCATEGORY_LIST, payload: res.data.result });
      } else {
        showToast("error", "Something went wrong");
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
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
export const RemoveSubSubCatImg = (id, publicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId }).then((res) => {
    if (res) {
      dispatch(SubSubCategoryDelete(id))
    }
  })
}
export const UploadSubSubCatImg = (img, subSubCatImg) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = subSubCatImg.publicId
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