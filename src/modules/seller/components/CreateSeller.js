import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, GetSellerInput, SubmitSeller, UploadShopLogo } from "../_redux/SellerAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
const CreateSeller = () => {
  const sellerInput = useSelector((state) => state.sellerInfo.sellerInput);
  const isSeller = useSelector((state) => state.sellerInfo.isSeller);
  const isImageLoading = useSelector((state) => state.sellerInfo.isImageLoading);
  const dispatch = useDispatch();
  const handleChange = (name, value) => {
    dispatch(GetSellerInput(name, value));
  };
  const handleSubmit = () => {
    dispatch(SubmitSeller(sellerInput));
  };
  const handleChangeImg = (name, value) => {
    dispatch(UploadShopLogo(name, value, sellerInput));
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Seller Name</h6>
            <input
              className="form-control"
              value={sellerInput.sellerName}
              type="text"
              placeholder="enter seller name"
              onChange={(e) => handleChange("sellerName", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Shop Address</h6>
            <input
              className="form-control"
              value={sellerInput.sellerAddress}
              type="text"
              placeholder="enter seller address"
              onChange={(e) => handleChange("sellerAddress", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Shop Name</h6>
            <input
              className="form-control"
              value={sellerInput.shopName}
              type="text"
              placeholder="enter shop name"
              onChange={(e) => handleChange("shopName", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Delivery Period (DAYS)</h6>
            <input
              className="form-control"
              value={sellerInput.deliveryPeriod}
              type="text"
              placeholder="ex: 1 to 5 days"
              onChange={(e) => handleChange("deliveryPeriod", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Seller Phone</h6>
            <input
              className="form-control"
              value={sellerInput.sellerPhone}
              type="text"
              placeholder="01XXXXXXXXX"
              onChange={(e) => handleChange("sellerPhone", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Seller Email</h6>
            <input
              className="form-control"
              value={sellerInput.sellerEmail}
              type="text"
              placeholder="example@gmail.com"
              onChange={(e) => handleChange("sellerEmail", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Select shop image</h6>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="file-upload"
              onChange={(e) =>
                handleChangeImg("shopLogo", e.target.files[0])
              }
            />
            {isImageLoading ? <span
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
              </label>
            }
            <img
              src={sellerInput?.shopLogo?.publicId === null ? demoProduct : sellerInput?.shopLogo?.url}
              alt="Product Icon"
              className="preview-img"
            />
          </div>

          {isSeller ? (
            <a className="btn btn-success btn-sm mt-3 text-light">
              {" "}
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </a>
          ) : (
            <a
              className="btn btn-success btn-sm mt-3 text-light"
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </a>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default CreateSeller;
