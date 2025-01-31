import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
//test//est//

export const GetProductInput = (name, value) => (dispatch) => {
  // console.log('name,value', name, value)
  const formData = {
    name: name,
    value: value,
  };

  dispatch({ type: Types.GET_PRODUCT_INPUT, payload: formData });
};
const PostImg = (name, img) => (dispatch) => {
  console.log('img', img)
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "nurislam");
  data.append("cloud_name ", "nurislammridha");
  const url = "https://api.cloudinary.com/v1_1/nurislammridha/image/upload"
  console.log('name,url,data', name, url, data)
  if (name === 'productIcon') {
    dispatch({ type: Types.ICON_LOADING, payload: true })
  } else if (name === 'productImg') {
    dispatch({ type: Types.IMG_LOADING, payload: true })
  } else if (name === 'variantImg') {
    dispatch({ type: Types.VARIANT_IMG_LOADING, payload: true })
  }
  // const myInterceptor = Axios.interceptors.request.use(function () {/*...*/ });
  // Axios.interceptors.request.eject(myInterceptor);
  // console.log('hello', "hello")
  // Axios.interceptors.request.use(
  //   (config) => {
  //     config.headers["Authorization"] = "hjhjgj"
  //     config.headers["Accept"] = "application/json";
  //     return config;
  //   },
  //   (error) => {
  //     Promise.reject(error);
  //   }
  // );
  Axios.post(url, data).then((res) => {
    console.log('res.data', res.data)
    if (res.data) {
      dispatch({ type: Types.GET_PRODUCT_INPUT, payload: { name, value: { publicId: res?.data?.public_id, url: res?.data?.url } } })
      if (name === 'productIcon') {
        dispatch({ type: Types.ICON_LOADING, payload: false })
      } else if (name === "productImg") {
        dispatch({ type: Types.IMG_LOADING, payload: false })
      } else if (name === "variantImg") {
        dispatch({ type: Types.VARIANT_IMG_LOADING, payload: false })
      }
    }
  }
  )
}
export const removeImg = (name, value, publicId) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId }).then((res) => {
    if (res) {
      dispatch(GetProductInput(name, value))
    }
  })
}
export const UploadCloudinary = (name, img, productInput) => (dispatch) => {
  if (img.type === "image/jpeg" || img.type === "image/png") {

    const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
    if (name === "productIcon") {
      let publicId = productInput.productIcon.publicId
      if (publicId !== null) {
        Axios.post(urlRemove, { publicId }).then((res) => {
          if (res) {
            dispatch(PostImg(name, img))
          }
        })
      } else {
        dispatch(PostImg(name, img))
      }
    } else if (name === "productImg") {
      let publicId = productInput.productImg.publicId
      if (publicId !== null) {
        Axios.post(urlRemove, { publicId }).then((res) => {
          if (res) {
            dispatch(PostImg(name, img))
          }
        })
      } else {
        dispatch(PostImg(name, img))
      }
    } else if (name === "variantImg") {
      let publicId = productInput.variantImg.publicId
      if (publicId !== null) {
        Axios.post(urlRemove, { publicId }).then((res) => {
          if (res) {
            dispatch(PostImg(name, img))
          }
        })
      } else {
        dispatch(PostImg(name, img))
      }
    }
  } else {
    showToast("error", "Image should be jpg/jpeg/png");
  }

};
export const SubmitProduct = (data) => (dispatch) => {
  const {
    productName, productNameBangla, productIcon, productImg, productImages,
    categoryName, categoryId, subCategoryName, subCategoryId, subSubCategoryName,
    subSubCategoryId, brandName, brandId, relatedProducts, isAvailableCashOnDelivery,
    isTrending, isFlashSell, isTodayDeal, isActive, variantImg, stock, minStock,
    variantName, variantId, unitName, unitId, colorName, colorId, colorHexCode,
    originName, originId, originLogo, note, minQuantity, maxQuantity, price, discountPrice,
    startDate, endDate, multipleProducts, variantProducts, length, width, height, weight,
    shortDescriptions, shortDescriptionsBangla, longDescriptions, longDescriptionsBangla,
    videoUrl, seoTag, warrantyPolicy, warrantyStartDate, warrantyEndDate, commonPrice, commonDiscountPrice, model
  } = data
  if (productName.length === 0) {
    showToast("error", "Product name shouldn't be empty");
    return 0;
  } else if (productNameBangla.length === 0) {
    showToast("error", "Product bangla name shouldn't be empty");
    return 0;
  } else if (commonPrice === 0) {
    showToast("error", "Product Price should be greater than zero");
    return 0;
  } else if (commonDiscountPrice === 0) {
    showToast("error", "Product Discount Price should be greater than zero");
    return 0;
  } else if (productIcon.publicId === null) {
    showToast("error", "Upload Product thumb");
    return 0;
  } else if (productImages.length === 0) {
    showToast("error", "Upload Multiple Products photo");
    return 0;
  } else if (categoryName.length === 0) {
    showToast("error", "Select a category");
    return 0;
  } else if (subCategoryName.length === 0) {
    showToast("error", "Select sub category");
    return 0;
  } else if (subSubCategoryName.length === 0) {
    showToast("error", "Select sub sub category");
    return 0;
  }
  else if (variantProducts.length === 0) {
    showToast("error", "Add variant products");
    return 0;
  } else if (shortDescriptions.length === 0) {
    showToast("error", "Short description should not be empty");
    return 0;
  } else if (longDescriptions.length === 0) {
    showToast("error", "Long description should not be empty");
    return 0;
  }
  const postData = {
    productName, productNameBangla, productIcon, productImages,
    categoryId, categoryInfo: categoryId, subCategoryId, subCategoryInfo: subCategoryId,
    subSubCategoryId, subSubCategoryInfo: subSubCategoryId, brandId, brandInfo: brandId,
    relatedProducts, isActive, isAvailableCashOnDelivery, isTrending, isFlashSell, isTodayDeal,
    variantProducts, length, width, height, weight, shortDescriptions, shortDescriptionsBangla, longDescriptions,
    longDescriptionsBangla, seoTag, warrantyPolicy, warrantyStartDate, warrantyEndDate, videoUrl: videoUrl.split(','),
    price: commonPrice, discountPrice: commonDiscountPrice, model
  }

  const url = `${process.env.REACT_APP_API_URL}product`;
  dispatch({ type: Types.IS_CREATE_PRODUCT, payload: true });

  try {
    Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
          dispatch({ type: Types.AFTER_CREATE_PRODUCT, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const EmptyHistory = () => (dispatch) => {
  dispatch({ type: Types.AFTER_CREATE_PRODUCT, payload: true });
}
export const ProductUpdate = (data, id) => (dispatch) => {
  const {
    productName, productNameBangla, productIcon, productImg, productImages,
    categoryName, categoryId, subCategoryName, subCategoryId, subSubCategoryName,
    subSubCategoryId, brandName, brandId, relatedProducts, isAvailableCashOnDelivery,
    isTrending, isFlashSell, isTodayDeal, isActive, variantImg, stock, minStock,
    variantName, variantId, unitName, unitId, colorName, colorId, colorHexCode,
    originName, originId, originLogo, note, minQuantity, maxQuantity, price, discountPrice,
    startDate, endDate, multipleProducts, variantProducts, length, width, height, weight,
    shortDescriptions, shortDescriptionsBangla, longDescriptions, longDescriptionsBangla,
    videoUrl, seoTag, warrantyPolicy, warrantyStartDate, warrantyEndDate, commonPrice, commonDiscountPrice, model
  } = data
  if (productName.length === 0) {
    showToast("error", "Product name shouldn't be empty");
    return 0;
  } else if (productNameBangla.length === 0) {
    showToast("error", "Product bangla name shouldn't be empty");
    return 0;
  } else if (commonPrice === 0) {
    showToast("error", "Product Price should be greater than zero");
    return 0;
  } else if (commonDiscountPrice === 0) {
    showToast("error", "Product Discount Price should be greater than zero");
    return 0;
  } else if (productIcon.publicId === null) {
    showToast("error", "Upload Product thumb");
    return 0;
  } else if (productImages.length === 0) {
    showToast("error", "Upload Multiple Products photo");
    return 0;
  } else if (categoryName.length === 0) {
    showToast("error", "Select a category");
    return 0;
  } else if (subCategoryName.length === 0) {
    showToast("error", "Select sub category");
    return 0;
  } else if (subSubCategoryName.length === 0) {
    showToast("error", "Select sub sub category");
    return 0;
  }
  else if (variantProducts.length === 0) {
    showToast("error", "Add variant products");
    return 0;
  } else if (shortDescriptions.length === 0) {
    showToast("error", "Short description should not be empty");
    return 0;
  } else if (longDescriptions.length === 0) {
    showToast("error", "Long description should not be empty");
    return 0;
  }
  const postData = {
    productName, productNameBangla, productIcon, productImages,
    categoryId, categoryInfo: categoryId, subCategoryId, subCategoryInfo: subCategoryId,
    subSubCategoryId, subSubCategoryInfo: subSubCategoryId, brandId, brandInfo: brandId,
    relatedProducts, isActive, isAvailableCashOnDelivery, isTrending, isFlashSell, isTodayDeal,
    variantProducts, length, width, height, weight, shortDescriptions, shortDescriptionsBangla, longDescriptions,
    longDescriptionsBangla, seoTag, warrantyPolicy, warrantyStartDate, warrantyEndDate, videoUrl: videoUrl.split(','),
    price: commonPrice, discountPrice: commonDiscountPrice, model
  }
  const url = `${process.env.REACT_APP_API_URL}product/${id}`;
  dispatch({ type: Types.IS_CREATE_PRODUCT, payload: true });

  try {
    Axios.put(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
          dispatch({ type: Types.AFTER_CREATE_PRODUCT, payload: true });
          dispatch({ type: Types.AFTER_UPDATE_PRODUCT, payload: true });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    dispatch({ type: Types.IS_CREATE_PRODUCT, payload: false });
    showToast("error", "Something went wrong");
  }
};

export const FalseUpdate = () => (dispatch) => {
  dispatch({ type: Types.AFTER_UPDATE_PRODUCT, payload: false });
};
export const GetProductList = (search = "", page = 1, limit = 20) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product?search=${search}&page=${page}&limit=${limit}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetProductBySubCategoryId = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/sub-category-id/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetProductByCategory = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/dashboard/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const PreUpdateProduct = (data) => (dispatch) => {
  dispatch({ type: Types.PRE_UPDATE_PRODUCT, payload: data });
};
export const ProductDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/${id}`;
  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", res.data.message);
        dispatch(GetProductList())
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};



export const getCategoryOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.categoryName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};

export const getSubCategoryOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.subCategoryName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getSubSubCategoryOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.subSubCategoryName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getSellerOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.sellerName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getBrandOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.brandName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getSizeOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.sizeName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getColorOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.colorName,
        value: item._id,
        colorHexCode: item.colorHexCode
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getOriginOption = (data) => {
  // console.log('data', data)
  const arr = [];
  if (data && data?.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item?.originName,
        value: item?._id,
        originLogo: item?.originLogo
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getUnitOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.unitName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getProductOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.productName,
        value: item._id
      };
      arr.push(obj);
    });
  }
  return arr;
};
const RemoveVariantImg = (arr, item, urlRemove) => (dispatch) => {
  // console.log('123', 123)
  if (arr.length > 0) {
    arr.forEach((item22, index) => {
      Axios.post(urlRemove, { publicId: item22.variantImg.publicId }).then((res) => {
        // console.log('333', 333)
        if (res && arr.length === index + 1) {
          dispatch(ProductDelete(item._id))
        }
      })
    });
  } else {
    dispatch(ProductDelete(item._id))
  }

}
export const RemoveArImg = (item) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  let arr = item.productImages
  let variants = item?.variantProducts
  if (arr.length > 0) {
    arr.forEach((item22, index) => {
      Axios.post(urlRemove, { publicId: item22?.publicId }).then((res) => {
        // console.log('222', 222)
        if (res && arr.length === index + 1) {
          // console.log('666', 666)
          dispatch(RemoveVariantImg(variants, item, urlRemove))
        }
      })
    });
  } else {
    dispatch(RemoveVariantImg(variants, item, urlRemove))
  }

}
export const RemoveProImg = (item) => (dispatch) => {
  const urlRemove = `${process.env.REACT_APP_API_URL}helper/delete-cloudinary`;
  Axios.post(urlRemove, { publicId: item.productIcon.publicId }).then((res) => {
    if (res) {
      // console.log('111', 111)
      dispatch(RemoveArImg(item))
    }
  }).catch((err) => {
    console.log('err', err)
  })
}
export const GetProductById = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_DETAILS, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
}