import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
//test//est//
export const GetSellerInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_SELLER_INPUT, payload: formData });
}
export const SellerUpdateInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_UPDATE_INPUT, payload: formData });
}
export const SetSellerInput = (data) => (dispatch) => {
  delete data._id
  dispatch({ type: Types.SET_SELLER_INPUT, payload: data });
}
export const SubmitSeller = (sellerInput) => (dispatch) => {
  const { sellerName, sellerAddress, shopName, deliveryPeriod, shopLogo, sellerPhone, sellerEmail } = sellerInput
  if (sellerName.length === 0) {
    showToast("error", "Seller Name shouldn't be empty");
    return 0;
  } else if (sellerAddress.length === 0) {
    showToast("error", "Seller Address shouldn't be empty");
    return 0;
  } else if (shopName.length === 0) {
    showToast("error", "Shop name shouldn't be empty");
    return 0;
  } else if (deliveryPeriod.length === 0) {
    showToast("error", "Delivery Period shouldn't be empty");
    return 0;
  } else if (shopLogo.url.length === 0) {
    showToast("error", "Logo Url shouldn't be empty");
    return 0;
  } else if (sellerPhone.length === 0) {
    showToast("error", "Seller Phone shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}seller`;
  dispatch({ type: Types.IS_CREATE_SELLER, payload: true });

  try {
    Axios.post(url, sellerInput)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_SELLER, payload: false });
          dispatch({ type: Types.AFTER_CREATE_SELLER, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_SELLER, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_SELLER, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_SELLER, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const SellerUpdate = (sellerInput, id) => (dispatch) => {
  const { sellerName, sellerAddress, shopName, deliveryPeriod, shopLogo, sellerPhone } = sellerInput
  if (sellerName.length === 0) {
    showToast("error", "Seller Name shouldn't be empty");
    return 0;
  } else if (sellerAddress.length === 0) {
    showToast("error", "Seller Address shouldn't be empty");
    return 0;
  } else if (shopName.length === 0) {
    showToast("error", "Shop name shouldn't be empty");
    return 0;
  } else if (deliveryPeriod.length === 0) {
    showToast("error", "Delivery Period shouldn't be empty");
    return 0;
  } else if (shopLogo.url.length === 0) {
    showToast("error", "Logo Url shouldn't be empty");
    return 0;
  } else if (sellerPhone.length === 0) {
    showToast("error", "Seller Phone shouldn't be empty");
    return 0;
  }
  const url = `${process.env.REACT_APP_API_URL}seller/${id}`;
  dispatch({ type: Types.IS_UPDATE_SELLER, payload: true });

  try {
    Axios.put(url, sellerInput)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_UPDATE_SELLER, payload: false });
          dispatch({ type: Types.IS_UPDATED_SELLER, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_UPDATE_SELLER, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_UPDATE_SELLER, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_UPDATE_SELLER, payload: false });
    showToast("error", "Something went wrong");
  }
};

export const FalseUpdated = () => (dispatch) => {
  dispatch({ type: Types.IS_UPDATED_SELLER, payload: false });
};
export const GetSellerList = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}seller`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.SELLER_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const SellerDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}seller/${id}`;
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
      dispatch({ type: Types.GET_SELLER_INPUT, payload: { name, value: { publicId: res?.data?.public_id, url: res?.data?.url } } })
    }
  }
  )
}
export const UploadShopLogo = (name, img, productInput) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = productInput.shopLogo.publicId
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
export const UpdateShopLogo = (name, img, productInput) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    let publicId = productInput.shopLogo.publicId
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
export const RemoveShopImg = (id, publicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId }).then((res) => {
    if (res) {
      dispatch(SellerDelete(id))
    }
  })
}