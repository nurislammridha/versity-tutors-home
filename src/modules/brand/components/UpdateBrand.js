import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, FalseUpdated, GetBrandInput, BrandUpdate, BrandUpdateInput, SetBrandInput, SubmitBrand, UpdateBrandLogo } from "../_redux/BrandAction";
import { useHistory, useLocation, useParams } from "react-router-dom";
import demoProduct from '../../../assets/images/demoProduct.jpg'

const UpdateBrand = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const brandInput = useSelector((state) => state.brandInfo.updateInput);
  const isUpdate = useSelector((state) => state.brandInfo.isUpdate);
  const isUpdated = useSelector((state) => state.brandInfo.isUpdated);
  const isImageLoading = useSelector((state) => state.brandInfo.isImageLoading);

  const dispatch = useDispatch();
  const handleChange = (name, value) => {
    dispatch(BrandUpdateInput(name, value));
  };
  const handleSubmit = () => {
    dispatch(BrandUpdate(brandInput, id));
  };
  const handleChangeImg = (name, value) => {
    dispatch(UpdateBrandLogo(name, value, brandInput));
  };
  useEffect(() => {
    if (isUpdated) {
      history.push('/brand')
      dispatch(FalseUpdated())
    }
  }, [isUpdated])
  useEffect(() => {
    dispatch(SetBrandInput(location?.state?.data))
  }, [id])

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

export default UpdateBrand;
