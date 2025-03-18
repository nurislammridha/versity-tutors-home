import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import demoProduct from '../../../assets/images/demoProduct.jpg'
import { AfterUpdatedFalse, CategoryUpdate, SubmitCategory, UploadCatImg, UploadCatLogo } from "../_redux/CategoryAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [category, setCategory] = useState("");
  const [categoryImg, setCategoryImg] = useState({ url: "", publicId: null });
  const [categoryLogo, setCategoryLogo] = useState({ url: "", publicId: null });
  const isUpdate = useSelector((state) => state.categoryInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.categoryInfo.afterUpdated);
  const isImageLoading = useSelector((state) => state.categoryInfo.isImageLoading);
  const isLogoLoading = useSelector((state) => state.categoryInfo.isLogoLoading);
  const catImg = useSelector((state) => state.categoryInfo.catImg);
  const catLogo = useSelector((state) => state.categoryInfo.catLogo);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(CategoryUpdate(category, categoryImg, categoryLogo, id));
  };
  const handleChangeImg = (value) => {
    dispatch(UploadCatImg(value, categoryImg));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/category')
      dispatch(AfterUpdatedFalse())
    }
    setCategory(location?.state?.category?.categoryName)
    setCategoryImg(location?.state?.category?.img)
  }, [afterUpdated, id])
  useEffect(() => {
    catImg !== null && setCategoryImg(catImg)

  }, [catImg])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Category</h3>
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

export default UpdateCategory;
