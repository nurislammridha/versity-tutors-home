import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, GetOriginInput, SubmitOrigin, UploadOriginLogo } from "../_redux/OriginAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
const CreateOrigin = () => {
  const originInput = useSelector((state) => state.originInfo.originInput);
  const isOrigin = useSelector((state) => state.originInfo.isOrigin);
  const isImageLoading = useSelector((state) => state.originInfo.isImageLoading);
  const dispatch = useDispatch();
  const handleChange = (name, value) => {
    dispatch(GetOriginInput(name, value));
  };
  const handleSubmit = () => {
    dispatch(SubmitOrigin(originInput));
  };
  const handleChangeImg = (name, value) => {
    dispatch(UploadOriginLogo(name, value, originInput));
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Origin Name</h6>
            <input
              className="form-control"
              value={originInput.originName}
              type="text"
              placeholder="enter origin name"
              onChange={(e) => handleChange("originName", e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Select origin image</h6>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="file-upload"
              onChange={(e) =>
                handleChangeImg("originLogo", e.target.files[0])
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
              src={originInput?.originLogo?.publicId === null ? demoProduct : originInput?.originLogo?.url}
              alt="Product Icon"
              className="preview-img"
            />
          </div>

          {isOrigin ? (
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

export default CreateOrigin;
