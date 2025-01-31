import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Form, FormControl } from "react-bootstrap";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import {
  FalseUpdate,
  getBrandOption,
  getCategoryOption,
  getColorOption,
  GetProductBySubCategoryId,
  GetProductInput,
  getProductOption,
  getSellerOption,
  getSizeOption,
  getSubCategoryOption,
  getUnitOption,
  ProductUpdate,
  removeImg,
  SubmitProduct,
  UploadCloudinary,
} from "../_redux/ProductAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
import { Editor } from "react-draft-wysiwyg";
import { GetSubCategoryList, SubCategoryByCategoryId } from "src/modules/subCategory/_redux/SubCategoryAction";
import { GetSellerList } from "src/modules/seller/_redux/SellerAction";
import { GetBrandList } from "src/modules/brand/_redux/BrandAction";
import { GetSizeList } from "src/modules/size/_redux/SizeAction";
import { GetColorList } from "src/modules/color/_redux/ColorAction";
import { showToast } from "src/utils/ToastHelper";
import { GetUnitList } from "src/modules/unit/_redux/UnitAction";
import { useHistory, useParams } from "react-router-dom";
const UpdateProduct = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch();
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const subCategoryArrList = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );
  const sellerArrList = useSelector(
    (state) => state.sellerInfo.sellerList
  );
  const brandArrList = useSelector(
    (state) => state.brandInfo.brandList
  );
  const sizeArrList = useSelector(
    (state) => state.sizeInfo.sizeList
  );
  const colorArrList = useSelector(
    (state) => state.colorInfo.colorList
  );
  const unitArrList = useSelector(
    (state) => state.unitInfo.unitList
  );
  const productArrList = useSelector(
    (state) => state.productInfo.productList
  );
  const productInput = useSelector((state) => state.productInfo.productInput);
  const isImgLoading = useSelector((state) => state.productInfo.isImgLoading);
  const isIconLoading = useSelector((state) => state.productInfo.isIconLoading);
  const afterUpdate = useSelector((state) => state.productInfo.afterUpdate);
  const isCreateProduct = useSelector(
    (state) => state.productInfo.isCreateProduct
  );
  const [isShow, setShow] = useState(true)
  const handleSubmit = () => {
    dispatch(ProductUpdate(productInput, id));
  };

  const handleChangeInput = (name, value, e, preview) => {
    dispatch(GetProductInput(name, value, e, preview));
  };
  const handleChangeImg = (name, value) => {
    dispatch(UploadCloudinary(name, value, productInput));
  };
  const handleAdd = (action, data = {}) => {
    const oldArr = productInput.productImgColor
    if (action === "add") {
      if (productInput.productImg.publicId === null) {
        showToast("error", "select img")
        return 0
      }
      // else if (productInput.colorName.length === 0) {
      //   showToast("error", "select color name")
      //   return 0
      // }
      const obj = {
        url: productInput.productImg.url,
        publicId: productInput.productImg.publicId,
        colorName: productInput.colorName,
        colorId: productInput.colorId,
        colorHexCode: productInput.colorHexCode
      }
      oldArr.push(obj)
      handleChangeInput("productImgColor", oldArr)
      // handleChangeInput("productImg", "")
      handleChangeInput("productImg", { url: "", publicId: null })
      handleChangeInput("colorId", "")
      handleChangeInput("colorName", "")
      handleChangeInput("colorHexCode", "")
    } else if (action === "remove") {
      const newArr = oldArr.filter((val) => val.colorId !== data.colorId)
      dispatch(removeImg("productImgColor", newArr, data.publicId));
      // dispatch(GetProductInput("productImgColor", newArr));
    }
  };
  useEffect(() => {
    dispatch(GetCategoryList());
    dispatch(GetSellerList());
    dispatch(GetBrandList());
    dispatch(GetSizeList());
    dispatch(GetColorList());
    dispatch(GetUnitList());

    // dispatch(GetProductList());
  }, []);
  useEffect(() => {
    if (productInput.categoryName.length > 0) {
      dispatch(SubCategoryByCategoryId(productInput.categoryId));
    }
    if (productInput.subCategoryId.length > 0) {
      dispatch(GetProductBySubCategoryId(productInput.subCategoryId));
    }

  }, [productInput]);

  useEffect(() => {
    if (afterUpdate) {
      history.push('/product')
      dispatch(FalseUpdate())
    }
  }, [afterUpdate])
  // useEffect(() => {
  //   const timer = setTimeout(() => setShow(true), 3000);
  //   return () => clearTimeout(timer);
  // }, []);
  console.log("productInput", productInput);
  return (
    <>
      <h6 className="alert alert-secondary text-center">CREATE PRODUCT</h6>
      <div className="row">
        <div className="col-sm-6">
          <div>
            <h6>Product Name</h6>
            <input
              className="form-control"
              type="text"
              placeholder="enter product name"
              value={productInput.productName}
              onChange={(e) => handleChangeInput("productName", e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h6>Product RP</h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter rp"
              value={productInput.rp}
              onChange={(e) => handleChangeInput("rp", e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h6>Product MRP</h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter mrp"
              value={productInput.mrp}
              onChange={(e) => handleChangeInput("mrp", e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h6>Regular Price</h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter regular price"
              value={productInput.regularDiscount}
              onChange={(e) =>
                handleChangeInput("regularDiscount", e.target.value)
              }
            />
          </div>
          {/* <div className="mt-2">
            <h6>Campaign Discount in %</h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter campaign discount"
              value={productInput.campaignDiscount}
              onChange={(e) =>
                handleChangeInput("campaignDiscount", e.target.value)
              }
            />
          </div> */}
          <div className="mt-2">
            <h6>Available Quantity</h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter available quantity"
              value={productInput.availableQuantity}
              onChange={(e) =>
                handleChangeInput("availableQuantity", e.target.value)
              }
            />
          </div>

          <div className="mt-2">
            <h6>Product Icon</h6>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="file-upload"
              onChange={(e) =>
                handleChangeImg("productIcon", e.target.files[0])
              }
            />
            {isIconLoading ? <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span> :
              <label
                for="file-upload"
                className="btn btn-outline-warning ml-3 mr-3"
                style={{ fontSize: "15px" }}
              >
                <i class="fa fa-upload"></i>
              </label>}
            <img
              src={productInput?.productIcon?.publicId === null ? demoProduct : productInput?.productIcon?.url}
              alt="Product Icon"
              className="preview-img"
            />
          </div>
          <div className="mt-2">
            <h6 className="mb-3">Select Products with related colors</h6>
            <div className="row">
              <div className="col-sm-6">
                <input
                  type="file"
                  className="d-none"
                  accept="image/*"
                  id="file-upload2"
                  onChange={(e) =>
                    handleChangeImg("productImg", e.target.files[0])
                  }
                />
                {isImgLoading ? <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span> :
                  <label
                    for="file-upload2"
                    className="btn btn-outline-warning ml-3 mr-3"
                    style={{ fontSize: "15px" }}
                  >
                    <i class="fa fa-upload"></i>
                  </label>}
                <div>
                  <img
                    src={productInput?.productImg?.publicId === null ? demoProduct : productInput?.productImg?.url}
                    alt="Product Icon"
                    className="preview-mul-img"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <Select
                  options={getColorOption(colorArrList)}
                  value={{ label: productInput.colorName }}
                  onChange={(e) => {
                    handleChangeInput("colorName", e.label);
                    handleChangeInput("colorId", e.value);
                    handleChangeInput("colorHexCode", e.colorHexCode);
                  }}
                />
                {/* <div className="color-show mt-2" style={{ backgroundColor: productInput.colorHexCode }}></div> */}
              </div>
            </div>
            <div>
              <a
                className="btn btn-outline-success mt-3"
                onClick={() => handleAdd("add")}
              >
                Add
              </a>
            </div>
            <div className="mt-2">
              {productInput.productImgColor.length > 0 && (
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Color</th>
                      {/* <th>View</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInput.productImgColor.map((item, index) => (
                      <tr>
                        <td>
                          <img
                            src={item.url}
                            alt="Products"
                            className="tbl-img"
                          />
                        </td>
                        <td>{item.colorName}</td>
                        {/* <td> */}
                        {/* <div className="tbl-color" style={{ backgroundColor: item.colorHexCode }}></div> */}
                        {/* </td> */}
                        <td> <a
                          className="btn btn-danger btn-sm"
                          onClick={() => handleAdd("remove", item)}
                        >
                          <i className="fa fa-trash"></i>
                        </a></td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              )}

            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div>
            <h6>Select Category</h6>
            <Select
              options={getCategoryOption(categoryArrList)}
              value={{ label: productInput.categoryName }}
              onChange={(e) => {
                handleChangeInput("categoryName", e.label);
                handleChangeInput("categoryId", e.value);
                handleChangeInput("subCategoryName", "");
                handleChangeInput("subCategoryId", "");
                handleChangeInput("relatedProducts", []);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Sub Category</h6>
            <Select
              options={getSubCategoryOption(subCategoryArrList)}
              value={{ label: productInput.subCategoryName }}
              onChange={(e) => {
                handleChangeInput("subCategoryName", e.label);
                handleChangeInput("subCategoryId", e.value);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Seller</h6>
            <Select
              options={getSellerOption(sellerArrList)}
              value={{ label: productInput.sellerName }}
              onChange={(e) => {
                handleChangeInput("sellerName", e.label);
                handleChangeInput("sellerId", e.value);
                handleChangeInput("sellerInfo", e.value);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Unit</h6>
            <Select
              options={getUnitOption(unitArrList)}
              value={{ label: productInput.unitName }}
              onChange={(e) => {
                handleChangeInput("unitName", e.label);
                handleChangeInput("unitId", e.value);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Brand</h6>
            <Select
              options={getBrandOption(brandArrList)}
              value={{ label: productInput.brandName }}
              onChange={(e) => {
                handleChangeInput("brandName", e.label);
                handleChangeInput("brandId", e.value);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Available Size</h6>
            <Select
              options={getSizeOption(sizeArrList)}
              value={productInput.size}
              isMulti
              onChange={(e) => {
                handleChangeInput("size", e);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Related Products</h6>
            <Select
              options={getProductOption(productArrList)}
              value={productInput.relatedProducts}
              isMulti
              onChange={(e) => {
                handleChangeInput("relatedProducts", e);
              }}
            />
          </div>
          <div className="mt-4">

            <div class="form-group">
              <label htmlFor="discount" className="mr-2">Cash on delivery</label>
              <Form.Check
                inline
                label="Yes"
                name="isAvailableCashOnDelivery"
                type="radio"
                checked={productInput.isAvailableCashOnDelivery === true}
                onChange={(e) => handleChangeInput("isAvailableCashOnDelivery", true)}
              />
              <Form.Check
                inline
                label="No"
                name="isAvailableCashOnDelivery"
                type="radio"
                checked={productInput.isAvailableCashOnDelivery === false}
                onChange={(e) => handleChangeInput("isAvailableCashOnDelivery", false)}
              />
            </div>
          </div>
          {/* <div className="mt-2">
            <div class="form-group">
              <label htmlFor="discount" className="mr-4">Is Campaign &nbsp;&nbsp;</label>
              <Form.Check
                inline
                label="Yes"
                name="isCampaign"
                type="radio"
                checked={productInput.isCampaign === true}
                onChange={(e) => handleChangeInput("isCampaign", true)}
              />
              <Form.Check
                inline
                label="No"
                name="isCampaign"
                type="radio"
                checked={productInput.isCampaign === false}
                onChange={(e) => handleChangeInput("isCampaign", false)}
              />
            </div>
          </div> */}
          <div className="mt-2">
            <div class="form-group">
              <label htmlFor="discount" className="mr-5">Is Trending</label>
              <Form.Check
                inline
                label="Yes"
                name="isTrendings"
                type="radio"
                checked={productInput.isTrending === true}
                onChange={(e) => handleChangeInput("isTrending", true)}
              />
              <Form.Check
                inline
                label="No"
                name="isTrendings"
                type="radio"
                checked={productInput.isTrending === false}
                onChange={(e) => handleChangeInput("isTrending", false)}
              />
            </div>
          </div>
          <div className="mt-2">
            <h6>Short Descriptions</h6>
            <textarea
              className="form-control"
              id="sdes"
              rows="17"
              name="shortDescriptions"
              value={productInput.shortDescriptions}
              onChange={(e) =>
                handleChangeInput("shortDescriptions", e.target.value)
              }
            ></textarea>
          </div>

        </div>
      </div>
      <div className="mt-5">
        <h4 className="text-center">Full Description</h4>
        <div className="mt-4">
          {isShow && (<Editor
            wrapperClassName="wrapper"
            editorClassName="editor"
            toolbarClassName="toolbar"
            name="longDescriptionView"
            editorState={productInput.longDescriptionView}
            onEditorStateChange={(e) =>
              handleChangeInput("longDescriptionView", e)
            }
          />)}
        </div>
      </div>
      <div className="mt-5">
        <h6>Video Url</h6>
        <input
          className="form-control"
          type="text"
          placeholder="ex: url,url,url.."
          value={productInput.videoUrl}
          onChange={(e) => handleChangeInput("videoUrl", e.target.value)}
        />
      </div>
      <div className="mt-2 d-flex justify-content-end">
        {isCreateProduct ? (
          <a className="btn btn-outline-success mt-3">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </a>
        ) : (
          <a
            className="btn btn-outline-success mt-3"
            onClick={() => handleSubmit()}
          >
            UPDATE
          </a>
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
