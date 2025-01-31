import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Form, FormControl } from "react-bootstrap";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import {
  EmptyHistory,
  FalseUpdate,
  getBrandOption,
  getCategoryOption,
  getColorOption,
  getOriginOption,
  GetProductById,
  GetProductBySubCategoryId,
  GetProductInput,
  getProductOption,
  getSellerOption,
  getSizeOption,
  getSubCategoryOption,
  getSubSubCategoryOption,
  getUnitOption,
  PreUpdateProduct,
  ProductUpdate,
  removeImg,
  SubmitProduct,
  UploadCloudinary,
} from "../_redux/ProductAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
import { GetSubCategoryList, SubCategoryByCategoryId } from "src/modules/subCategory/_redux/SubCategoryAction";
import { GetSellerList } from "src/modules/seller/_redux/SellerAction";
import { GetSizeList } from "src/modules/size/_redux/SizeAction";
import { GetColorList } from "src/modules/color/_redux/ColorAction";
import { showToast } from "src/utils/ToastHelper";
import { GetUnitList } from "src/modules/unit/_redux/UnitAction";
import { GetBrandList } from "src/modules/brand/_redux/BrandAction";
import { SubSubCategoryBySubCategoryId } from "src/modules/subSubCategory/_redux/SubSubCategoryAction";
import { GetOriginList } from "src/modules/origin/_redux/OriginAction";
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
  const originArrList = useSelector(
    (state) => state.originInfo.originList
  );
  const unitArrList = useSelector(
    (state) => state.unitInfo.unitList
  );
  const productArrList = useSelector(
    (state) => state.productInfo.productList
  );
  const productDetails = useSelector(
    (state) => state.productInfo.productDetails
  );
  const afterUpdate = useSelector((state) => state.productInfo.afterUpdate);
  const productInput = useSelector((state) => state.productInfo.productInput);
  const { minQuantity, maxQuantity, price, discountPrice, startDate, endDate, variantName, variantId, unitName, unitId, colorName, colorId, colorHexCode, originName, originId, originLogo, stock, minStock, note, multipleProducts, variantProducts, variantImg } = productInput || {}
  const isImgLoading = useSelector((state) => state.productInfo.isImgLoading);
  const isIconLoading = useSelector((state) => state.productInfo.isIconLoading);
  const isVariantImgLoading = useSelector((state) => state.productInfo.isVariantImgLoading);
  const isCreateProduct = useSelector(
    (state) => state.productInfo.isCreateProduct
  );

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
    const oldArr = productInput.productImages
    if (action === "add") {
      if (productInput.productImg.publicId === null) {
        showToast("error", "select img")
        return 0
      }
      const obj = {
        url: productInput.productImg.url,
        publicId: productInput.productImg.publicId,
      }
      oldArr.push(obj)
      handleChangeInput("productImages", oldArr)
      handleChangeInput("productImg", { url: "", publicId: null })
    } else if (action === "remove") {
      const newArr = oldArr.filter((val) => val.publicId !== data.publicId)
      dispatch(removeImg("productImages", newArr, data.publicId));
      // dispatch(GetProductInput("productImgColor", newArr));
    }
  };
  const variantAdd = (action, data = {}) => {
    const oldArr = variantProducts
    if (action === "add") {
      if (variantImg.publicId === null) {
        showToast("error", "Select variant img")
        return 0
      } else if (variantName.length === 0) {
        showToast("error", "Select a variant")
        return 0
      } else if (unitName.length === 0 && colorName.length === 0 && originName.length === 0) {
        showToast("error", "Select a variant")
        return 0
      } else if (stock <= 0) {
        showToast("error", "Stock should be greater than 0")
        return 0
      } else if (minStock <= 0) {
        showToast("error", "Min stock should be greater than 0")
        return 0
      } else if (multipleProducts.length === 0) {
        showToast("error", "Add multiple products")
        return 0
      }
      const obj = { variantImg, variantName, variantId, unitName, unitId, colorName, colorId, colorHexCode, originName, originId, originLogo, stock, minStock, note, multipleProducts }
      oldArr.push(obj)
      handleChangeInput("variantProducts", oldArr)
      handleChangeInput("variantImg", { url: "", publicId: null });
      handleChangeInput("stock", 0);
      handleChangeInput("minStock", 0);
      handleChangeInput("variantName", "");
      handleChangeInput("variantId", 0);
      handleChangeInput("unitName", "");
      handleChangeInput("unitId", "");
      handleChangeInput("colorName", "");
      handleChangeInput("colorId", "");
      handleChangeInput("colorHexCode", "");
      handleChangeInput("originName", "");
      handleChangeInput("originId", "");
      handleChangeInput("note", "");
      handleChangeInput("originLogo", { url: "", publicId: null });
      handleChangeInput("multipleProducts", []);
    } else if (action === "remove") {
      const newArr = oldArr.filter((val) => val.variantImg.publicId !== data.variantImg.publicId)
      dispatch(removeImg("variantProducts", newArr, data.variantImg.publicId));
      // dispatch(GetProductInput("productImgColor", newArr));
    }
  };
  const multipleProductsAdd = (action, data = {}) => {
    const oldArr = productInput.multipleProducts
    if (action === "add") {
      if (productInput.minQuantity <= 0) {
        showToast("error", "Min quantity should be greater than 0")
        return 0
      } else if (productInput.maxQuantity <= 0) {
        showToast("error", "Max quantity should be greater than 0")
        return 0
      } else if (productInput.price <= 0) {
        showToast("error", "Price should be greater than 0")
        return 0
      } else if (productInput.discountPrice <= 0) {
        showToast("error", "Discount Price should be greater than 0")
        return 0
      } else if (productInput.startDate.length <= 0) {
        showToast("error", "Select Start date")
        return 0
      } else if (productInput.endDate.length <= 0) {
        showToast("error", "Select End date")
        return 0
      }
      const obj = {
        minQuantity, maxQuantity, price, discountPrice, startDate, endDate
      }
      oldArr.push(obj)
      handleChangeInput("multipleProducts", oldArr)
      handleChangeInput("minQuantity", 0)
      handleChangeInput("maxQuantity", 0)
      handleChangeInput("price", 0)
      handleChangeInput("discountPrice", 0)
      handleChangeInput("startDate", "")
      handleChangeInput("endDate", "")
    } else if (action === "remove") {
      const newArr = oldArr.filter((val) => val.minQuantity !== data.minQuantity)
      handleChangeInput("multipleProducts", newArr)
    }
  };

  useEffect(() => {

    dispatch(GetProductById(id));
    dispatch(GetCategoryList());
    dispatch(GetSellerList());
    dispatch(GetBrandList());
    // dispatch(GetSizeList());
    dispatch(GetColorList());
    dispatch(GetUnitList());
    dispatch(GetOriginList());

    dispatch(EmptyHistory());
  }, []);
  useEffect(() => {
    if (productInput.categoryName.length > 0) {
      dispatch(SubCategoryByCategoryId(productInput.categoryId));
    }
    if (productInput.subCategoryId.length > 0) {
      dispatch(SubSubCategoryBySubCategoryId(productInput.subCategoryId));
    }
    if (productInput.subCategoryId.length > 0) {
      dispatch(GetProductBySubCategoryId(productInput.subCategoryId));
    }

  }, [productInput]);
  useEffect(() => {
    if (productDetails !== null) {
      dispatch(PreUpdateProduct(productDetails));
    }
  }, [productDetails])
  useEffect(() => {
    if (afterUpdate) {
      history.push('/product')
      dispatch(FalseUpdate())
    }
  }, [afterUpdate])
  // console.log('productDetails', productDetails)
  console.log("productInput", productInput);
  return (
    <>
      <h6 className="alert alert-secondary text-center">CREATE PRODUCT</h6>
      <div className="row alert alert-primary">
        <div className="col-sm-6">
          <div>
            <h6>Product Name<label className="text-danger">*</label></h6>
            <input
              className="form-control"
              type="text"
              placeholder="enter product name"
              value={productInput.productName}
              onChange={(e) => handleChangeInput("productName", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6>Product Name Bangla<label className="text-danger">*</label></h6>
            <input
              className="form-control"
              type="text"
              placeholder="enter product name bangla"
              value={productInput.productNameBangla}
              onChange={(e) => handleChangeInput("productNameBangla", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6>Product Price<label className="text-danger">*</label></h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter product price"
              value={productInput.commonPrice}
              onChange={(e) => handleChangeInput("commonPrice", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6>Product Discount Price<label className="text-danger">*</label></h6>
            <input
              className="form-control"
              type="number"
              placeholder="enter product discount price"
              value={productInput.commonDiscountPrice}
              onChange={(e) => handleChangeInput("commonDiscountPrice", e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h6>Upload Product Thumb<label className="text-danger">*</label></h6>
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
            <h6 className="mb-3">Select Multiple Product Photos</h6>
            <div className="row">
              <div className="col-sm-4">
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

              </div>
              <div className="col-sm-4">
                <img
                  src={productInput?.productImg?.publicId === null ? demoProduct : productInput?.productImg?.url}
                  alt="Product Icon"
                  className="preview-mul-img"
                />
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
              {productInput.productImages.length > 0 && (
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInput.productImages.map((item, index) => (
                      <tr>
                        <td>
                          <img
                            src={item.url}
                            alt="Products"
                            className="tbl-img"
                          />
                        </td>
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
            <h6>Select Category<label className="text-danger">*</label></h6>
            <Select
              options={getCategoryOption(categoryArrList)}
              value={{ label: productInput.categoryName }}
              onChange={(e) => {
                handleChangeInput("categoryName", e.label);
                handleChangeInput("categoryId", e.value);
                handleChangeInput("subCategoryName", "");
                handleChangeInput("subCategoryId", "");
                handleChangeInput("subSubCategoryName", "");
                handleChangeInput("subSubCategoryId", "");
                handleChangeInput("relatedProducts", []);
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Sub Category<label className="text-danger">*</label></h6>
            <Select
              options={getSubCategoryOption(subCategoryArrList)}
              value={{ label: productInput.subCategoryName }}
              onChange={(e) => {
                handleChangeInput("subCategoryName", e.label);
                handleChangeInput("subCategoryId", e.value);
                handleChangeInput("subSubCategoryName", "");
                handleChangeInput("subSubCategoryId", "");
              }}
            />
          </div>
          <div className="mt-2">
            <h6>Select Sub Sub Category<label className="text-danger">*</label></h6>
            <Select
              options={getSubSubCategoryOption(subCategoryArrList)}
              value={{ label: productInput.subSubCategoryName }}
              onChange={(e) => {
                handleChangeInput("subSubCategoryName", e.label);
                handleChangeInput("subSubCategoryId", e.value);
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
            <div class="form-group">
              <label htmlFor="discount" className="mr-5">Is Flash Sell</label>
              <Form.Check
                inline
                label="Yes"
                name="isFlashSell"
                type="radio"
                checked={productInput.isFlashSell === true}
                onChange={(e) => handleChangeInput("isFlashSell", true)}
              />
              <Form.Check
                inline
                label="No"
                name="isFlashSell"
                type="radio"
                checked={productInput.isFlashSell === false}
                onChange={(e) => handleChangeInput("isFlashSell", false)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div class="form-group">
              <label htmlFor="discount" className="mr-5">Is Today Deal</label>
              <Form.Check
                inline
                label="Yes"
                name="isTodayDeal"
                type="radio"
                checked={productInput.isTodayDeal === true}
                onChange={(e) => handleChangeInput("isTodayDeal", true)}
              />
              <Form.Check
                inline
                label="No"
                name="isTodayDeal"
                type="radio"
                checked={productInput.isTodayDeal === false}
                onChange={(e) => handleChangeInput("isTodayDeal", false)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div class="form-group">
              <label htmlFor="discount" className="mr-5">Is Active</label>
              <Form.Check
                inline
                label="Yes"
                name="isActive"
                type="radio"
                checked={productInput.isActive === true}
                onChange={(e) => handleChangeInput("isActive", true)}
              />
              <Form.Check
                inline
                label="No"
                name="isActive"
                type="radio"
                checked={productInput.isActive === false}
                onChange={(e) => handleChangeInput("isActive", false)}
              />
            </div>
          </div>


        </div>
      </div>

      <div className="mt-2 alert alert-secondary pb-5">
        <h6 className="mb-3">Price Stock & Variant</h6>
        <div className="row">
          <div className="col-sm-2">
            <h6>Select variant image<label className="text-danger">*</label></h6>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="file-upload3"
              onChange={(e) =>
                handleChangeImg("variantImg", e.target.files[0])
              }
            />
            {isVariantImgLoading ? <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span> :
              <label
                for="file-upload3"
                className="btn btn-outline-warning ml-3 mr-3"
                style={{ fontSize: "15px" }}
              >
                <i class="fa fa-upload"></i>
              </label>}
            <div>
              <img
                src={productInput?.variantImg?.publicId === null ? demoProduct : productInput?.variantImg?.url}
                alt="Product Icon"
                className="preview-mul-img"
              />
            </div>
            <h6 className="mt-3">Note</h6>
            <input
              className="form-control"
              type="text"
              placeholder="enter note"
              value={productInput.note}
              onChange={(e) => handleChangeInput("note", e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <h6>Variant Type<label className="text-danger">*</label></h6>
            <Select
              options={[{ label: "Unit", value: 0 }, { label: "Color", value: 1 }, { label: "Origin", value: 2 }]}
              value={{ label: productInput.variantName }}
              onChange={(e) => {
                handleChangeInput("variantName", e.label);
                handleChangeInput("variantId", e.value);
                handleChangeInput("unitName", "");
                handleChangeInput("unitId", "");
                handleChangeInput("colorName", "");
                handleChangeInput("colorId", "");
                handleChangeInput("colorHexCode", "");
                handleChangeInput("originName", "");
                handleChangeInput("originId", "");
                handleChangeInput("originLogo", { url: "", publicId: null });
              }}
            />
            <h6 className="mt-3">Select Variant<label className="text-danger">*</label></h6>
            {productInput.variantId === 0 ?
              <Select
                options={getUnitOption(unitArrList)}
                value={{ label: productInput.unitName }}
                onChange={(e) => {
                  handleChangeInput("unitName", e.label);
                  handleChangeInput("unitId", e.value);
                }}
              /> :
              productInput.variantId === 1 ?
                <Select
                  options={getColorOption(colorArrList)}
                  value={{ label: productInput.colorName }}
                  onChange={(e) => {
                    handleChangeInput("colorName", e.label);
                    handleChangeInput("colorId", e.value);
                    handleChangeInput("colorHexCode", e.colorHexCode);
                  }}
                /> :
                <Select
                  options={getOriginOption(originArrList)}
                  value={{ label: productInput.originName }}
                  onChange={(e) => {
                    handleChangeInput("originName", e.label);
                    handleChangeInput("originId", e.value);
                    handleChangeInput("originLogo", e.originLogo);
                  }}
                />
            }

            {productInput.colorHexCode.length > 0 && <div className="color-show mt-2" style={{ backgroundColor: productInput.colorHexCode }}></div>}
            {productInput.originLogo.publicId !== null && <div className="color-show mt-2" style={{ backgroundColor: productInput.colorHexCode }}>
              <img src={productInput.originLogo.url || demoProduct} className="preview-mul-img" />
            </div>}
            <div>
              <h6 className="mt-3">Stock<label className="text-danger">*</label></h6>
              <input
                className="form-control"
                type="number"
                placeholder="stock"
                value={productInput.stock}
                onChange={(e) => handleChangeInput("stock", e.target.value)}
              />
              <h6 className="mt-3">Min Stock<label className="text-danger">*</label></h6>
              <input
                className="form-control"
                type="text"
                placeholder="min stock"
                value={productInput.minStock}
                onChange={(e) => handleChangeInput("minStock", e.target.value)}
              />
            </div>

          </div>
          <div className="col-sm-8 bg-info">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="">Min Qnty<label className="text-danger">*</label></h6>
                <input
                  className="form-control"
                  type="number"
                  placeholder="min quantity"
                  value={productInput.minQuantity}
                  onChange={(e) => handleChangeInput("minQuantity", e.target.value)}
                />
              </div>
              <div className="col-sm-3">
                <h6 className="">Max Qnty<label className="text-danger">*</label></h6>
                <input
                  className="form-control"
                  type="text"
                  placeholder="max quantity"
                  value={productInput.maxQuantity}
                  onChange={(e) => handleChangeInput("maxQuantity", e.target.value)}
                />
              </div>
              <div className="col-sm-3">
                <h6 className="">Price<label className="text-danger">*</label></h6>
                <input
                  className="form-control"
                  type="number"
                  placeholder="enter price"
                  value={productInput.price}
                  onChange={(e) => handleChangeInput("price", e.target.value)}
                />
              </div>
              <div className="col-sm-3">
                <h6 className="">Discount Price<label className="text-danger">*</label></h6>
                <input
                  className="form-control"
                  type="number"
                  placeholder="enter discount price"
                  value={productInput.discountPrice}
                  onChange={(e) => handleChangeInput("discountPrice", e.target.value)}
                />
              </div>
              <div className="col-sm-4 mt-3">
                <h6 className="">Start Date<label className="text-danger">*</label></h6>
                <input
                  className="form-control"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  value={productInput.startDate}
                  onChange={(e) => handleChangeInput("startDate", e.target.value)}
                />
              </div>
              <div className="col-sm-4 mt-3">
                <h6 className="">End Date<label className="text-danger">*</label></h6>
                <input
                  className="form-control"
                  type="date"
                  placeholder="enter end date"
                  value={productInput.endDate}
                  onChange={(e) => handleChangeInput("endDate", e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <a
                  className="btn btn-outline-success mt-5 float-right"
                  onClick={() => multipleProductsAdd("add")}
                >
                  Multiple Products Add
                </a>
              </div>
            </div>
            <div className="mt-4">
              {productInput.multipleProducts.length > 0 &&
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Q range</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInput.multipleProducts.map((item, index) => (
                      <tr key={index}>
                        <td>{item.minQuantity}-{item.maxQuantity}</td>
                        <td>{item.price}</td>
                        <td>{item.discountPrice}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td onClick={() => multipleProductsAdd("remove", item)}> <i className="fa fa-trash"></i></td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              }

            </div>
          </div>

        </div>
        <div >
          <a
            className="btn btn-outline-success mt-3 float-right"
            onClick={() => variantAdd("add")}
          >
            Add Variant
          </a>
        </div>
        <div className="mt-2">
          {productInput.variantProducts.length > 0 && (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Variant</th>
                  <th>Variant Name</th>
                  <th>Stk</th>
                  <th>Min stk</th>
                  <th>Note</th>
                  <th>

                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productInput.variantProducts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.variantImg.url}
                        alt="Products"
                        className="tbl-img"
                      />
                    </td>
                    <td>{item.variantName}</td>
                    <td>{item.colorName}{item.originName}{item.unitName}</td>
                    <td>{item.stock}</td>
                    <td>{item.minStock}</td>
                    <td>{item.note}</td>
                    <td>
                      <table>
                        <thead>
                          <th>Range</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Date</th>
                        </thead>
                        <tbody>
                          {item?.multipleProducts?.map(({ minQuantity, maxQuantity, price, discountPrice, startDate, endDate }, index) =>
                            <tr key={index}>
                              <td>{minQuantity}-{maxQuantity}</td>
                              <td>{price}</td>
                              <td>{discountPrice}</td>
                              <td>{startDate}-{endDate}</td>
                            </tr>
                          )}

                        </tbody>
                      </table>
                    </td>
                    {/* <td> */}
                    {/* <div className="tbl-color" style={{ backgroundColor: item.colorHexCode }}></div> */}
                    {/* </td> */}
                    <td> <a
                      className="btn btn-danger btn-sm"
                      onClick={() => variantAdd("remove", item)}
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
      <div className="alert alert-primary mt-5">
        <div className="row">
          <div className="col-sm-3"><h6>Product Dimension: mm</h6></div>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="number"
              placeholder="length"
              value={productInput.length}
              onChange={(e) => handleChangeInput("length", e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="number"
              placeholder="width"
              value={productInput.width}
              onChange={(e) => handleChangeInput("width", e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="number"
              placeholder="height"
              value={productInput.height}
              onChange={(e) => handleChangeInput("height", e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-3"><h6>Product Weight:gm</h6></div>
          <div className="col-sm-2">
            <input
              className="form-control"
              type="number"
              placeholder="weight"
              value={productInput.weight}
              onChange={(e) => handleChangeInput("weight", e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <h6>Short Descriptions<label className="text-danger">*</label></h6>
            <textarea
              className="form-control"
              id="sdes"
              rows="10"
              name="shortDescriptions"
              value={productInput.shortDescriptions}
              onChange={(e) =>
                handleChangeInput("shortDescriptions", e.target.value)
              }
            ></textarea>
          </div>
          <div className="col-sm-6">
            <h6>Short Descriptions(Bangla)</h6>
            <textarea
              className="form-control"
              id="sdes"
              rows="10"
              name="shortDescriptionsBangla"
              value={productInput.shortDescriptionsBangla}
              onChange={(e) =>
                handleChangeInput("shortDescriptionsBangla", e.target.value)
              }
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mt-3 row alert-alert-secondary">
        <div className="col-sm-6">
          <h6>Long Descriptions<label className="text-danger">*</label></h6>
          <textarea
            className="form-control"
            id="sdesBan"
            rows="17"
            name="longDescriptions"
            value={productInput.longDescriptions}
            onChange={(e) =>
              handleChangeInput("longDescriptions", e.target.value)
            }
          ></textarea>
        </div>
        <div className="col-sm-6">
          <h6>Long Descriptions(Bangla)</h6>
          <textarea
            className="form-control"
            id="sdes"
            rows="17"
            name="longDescriptionsBangla"
            value={productInput.longDescriptionsBangla}
            onChange={(e) =>
              handleChangeInput("longDescriptionsBangla", e.target.value)
            }
          ></textarea>
        </div>

      </div>
      <div className="mt-3">
        <h6>Product Model</h6>
        <input
          className="form-control"
          type="text"
          placeholder="enter product model"
          value={productInput.model}
          onChange={(e) => handleChangeInput("model", e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h6>Video Url</h6>
        <input
          className="form-control"
          type="text"
          placeholder="ex: url,url,url.."
          value={productInput.videoUrl}
          onChange={(e) => handleChangeInput("videoUrl", e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h6>Tag for seo</h6>
        <input
          className="form-control"
          type="text"
          placeholder="seo tag"
          value={productInput.seoTag}
          onChange={(e) => handleChangeInput("seoTag", e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h6>Warranty Policy</h6>
        <input
          className="form-control"
          type="text"
          placeholder="warranty policy"
          value={productInput.warrantyPolicy}
          onChange={(e) => handleChangeInput("warrantyPolicy", e.target.value)}
        />
      </div>
      <div className="row mt-3">
        <div className="col-sm-2"><h6>Warranty Duration</h6></div>
        <div className="col-sm-2"><h6>Start Date</h6></div>
        <div className="col-sm-3">
          <input
            className="form-control"
            type="date"
            placeholder="dd/mm/yyyy"
            value={productInput.warrantyStartDate}
            onChange={(e) => handleChangeInput("warrantyStartDate", e.target.value)}
          />
        </div>
        <div className="col-sm-2"><h6>End Date</h6></div>
        <div className="col-sm-3">

          <input
            className="form-control"
            type="date"
            placeholder="dd/mm/yyyy"
            value={productInput.warrantyEndDate}
            onChange={(e) => handleChangeInput("warrantyEndDate", e.target.value)}
          />
        </div>
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
