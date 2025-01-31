import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, FalseUpdated, GetSellerInput, SellerUpdate, SellerUpdateInput, SetSellerInput, SubmitSeller, UpdateShopLogo } from "../_redux/SellerAction";
import { useHistory, useLocation, useParams } from "react-router-dom";
import demoProduct from '../../../assets/images/demoProduct.jpg'

const UpdateSeller = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const sellerInput = useSelector((state) => state.sellerInfo.updateInput);
  const isUpdate = useSelector((state) => state.sellerInfo.isUpdate);
  const isUpdated = useSelector((state) => state.sellerInfo.isUpdated);
  const isImageLoading = useSelector((state) => state.sellerInfo.isImageLoading);

  const dispatch = useDispatch();
  const handleChange = (name, value) => {
    dispatch(SellerUpdateInput(name, value));
  };
  const handleSubmit = () => {
    dispatch(SellerUpdate(sellerInput, id));
  };
  const handleChangeImg = (name, value) => {
    dispatch(UpdateShopLogo(name, value, sellerInput));
  };
  useEffect(() => {
    if (isUpdated) {
      history.push('/seller')
      dispatch(FalseUpdated())
    }
  }, [isUpdated])
  useEffect(() => {
    dispatch(SetSellerInput(location?.state?.data))
  }, [id])

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
            <h6 className="mb-3">Seller Address</h6>
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
              placeholder="Ex: 1 to 5 days"
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
          {isUpdate ? (
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
              UPDATE
            </a>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default UpdateSeller;
