import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitCategory, UploadCatImg, UploadCatLogo } from "../_redux/CategoryAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [categoryImg, setCategoryImg] = useState({ url: "", publicId: null });
  const [categoryLogo, setCategoryLogo] = useState({ url: "", publicId: null });
  const isCategory = useSelector((state) => state.categoryInfo.isCategory);
  const afterCreated = useSelector((state) => state.categoryInfo.afterCreated);
  const catImg = useSelector((state) => state.categoryInfo.catImg);
  const catLogo = useSelector((state) => state.categoryInfo.catLogo);
  const isImageLoading = useSelector((state) => state.categoryInfo.isImageLoading);
  const isLogoLoading = useSelector((state) => state.categoryInfo.isLogoLoading);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitCategory(category, categoryImg));
  };
  const handleChangeImg = (value) => {
    dispatch(UploadCatImg(value, categoryImg));
  };

  useEffect(() => {
    if (afterCreated) {
      setCategory("")
      setCategoryImg({ url: "", publicId: null })
      setCategoryLogo({ url: "", publicId: null })
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  useEffect(() => {
    catImg !== null && setCategoryImg(catImg)
  }, [catImg])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Category Name</h6>
            <input
              className="form-control"
              value={category}
              placeholder="enter category name"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mt-3">Select a category Image</h6>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              id="file-upload2"
              onChange={(e) =>
                handleChangeImg(e.target.files[0])
              }
            />
            {isImageLoading ? <span
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
              </label>
            }

            <div>
              <img
                src={categoryImg?.publicId === null ? demoProduct : categoryImg?.url}
                alt="Product Icon"
                className="preview-mul-img"
              />
            </div>
          </div>
          {isCategory ? (
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

export default CreateCategory;
