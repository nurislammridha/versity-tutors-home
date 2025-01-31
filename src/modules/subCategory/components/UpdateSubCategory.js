import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, SubCategoryUpdate, SubmitSubCategory, UploadSubCatImg } from "../_redux/SubCategoryAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import Select from "react-select";
import { getCategoryOption } from "src/modules/product/_redux/ProductAction";
import { useHistory, useLocation, useParams } from "react-router-dom";
import demoProduct from '../../../assets/images/demoProduct.jpg'
const UpdateSubCategory = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryImg, setSubCategoryImg] = useState({ url: "", publicId: null });
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const isUpdate = useSelector((state) => state.subCategoryInfo.isUpdate);
  const isImageLoading = useSelector((state) => state.subCategoryInfo.isImageLoading);
  const subCatImg = useSelector((state) => state.subCategoryInfo.subCatImg);
  const afterUpdated = useSelector((state) => state.categoryInfo.afterUpdated);
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubCategoryUpdate(subCategory, subCategoryImg, category, categoryId, id));
  };
  const handleChangeImg = (value) => {
    dispatch(UploadSubCatImg(value, subCategoryImg));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/sub-category')
      dispatch(AfterUpdatedFalse())
    }
    setSubCategory(location?.state?.data?.subCategoryName)
    setCategory(location?.state?.data?.categoryName)
    setCategoryId(location?.state?.data?.categoryId)
    setSubCategoryImg(location?.state?.data?.subCategoryImg)
  }, [afterUpdated, id])
  useEffect(() => {
    subCatImg !== null && setSubCategoryImg(subCatImg)

  }, [subCatImg])
  useEffect(() => {
    dispatch(GetCategoryList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h4 className="mb-3">Update Sub Category</h4>
          <div>
            <h6 >Select Category</h6>
            <Select
              options={getCategoryOption(categoryArrList)}
              value={{ label: category }}
              onChange={(e) => {
                setCategory(e.label);
                setCategoryId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Sub Category Name</h6>
            <input
              className="form-control"
              value={subCategory}
              placeholder="enter sub category name"
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </div>
          <div className="mt-3 row">
            <div className="col-sm-5">
              <h6 className="mt-3">Select a sub category Image</h6>
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
            </div>

            <div className="col-sm-7">
              <img
                src={subCategoryImg?.publicId === null ? demoProduct : subCategoryImg?.url}
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

export default UpdateSubCategory;
