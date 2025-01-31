import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, GetBrandInput, SubmitBrand, UploadBrandLogo } from "../_redux/BrandAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
const CreateBrand = () => {
  const brandInput = useSelector((state) => state.brandInfo.brandInput);
  const isBrand = useSelector((state) => state.brandInfo.isBrand);
  const isImageLoading = useSelector((state) => state.brandInfo.isImageLoading);
  const dispatch = useDispatch();
  const handleChange = (name, value) => {
    dispatch(GetBrandInput(name, value));
  };
  const handleSubmit = () => {
    dispatch(SubmitBrand(brandInput));
  };
  const handleChangeImg = (name, value) => {
    dispatch(UploadBrandLogo(name, value, brandInput));
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Brand Name</h6>
            <input
              className="form-control"
              value={brandInput.brandName}
              type="text"
              placeholder="enter brand name"
              onChange={(e) => handleChange("brandName", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Select brand image</h6>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="file-upload"
              onChange={(e) =>
                handleChangeImg("brandLogo", e.target.files[0])
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
              src={brandInput?.brandLogo?.publicId === null ? demoProduct : brandInput?.brandLogo?.url}
              alt="Product Icon"
              className="preview-img"
            />
          </div>

          {isBrand ? (
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

export default CreateBrand;
