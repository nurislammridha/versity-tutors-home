import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitSubCategory, UploadSubCatImg } from "../_redux/SubCategoryAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import Select from "react-select";
import demoProduct from '../../../assets/images/demoProduct.jpg'
const CreateSubCategory = () => {
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [subCategoryImg, setSubCategoryImg] = useState({ url: "", publicId: null });
  const [categoryId, setCategoryId] = useState("");
  const isSubCategory = useSelector((state) => state.subCategoryInfo.isSubCategory);
  const afterCreated = useSelector((state) => state.categoryInfo.afterCreated);
  const subCatImg = useSelector((state) => state.subCategoryInfo.subCatImg);
  const isImageLoading = useSelector((state) => state.subCategoryInfo.isImageLoading);
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitSubCategory(subCategory, category, categoryId, subCategoryImg));
  };
  const handleChangeImg = (value) => {
    dispatch(UploadSubCatImg(value, subCategoryImg));
  };
  useEffect(() => {
    if (afterCreated) {
      setSubCategory("")
      setCategory("")
      setCategoryId("")
      setSubCategoryImg({ url: "", publicId: null })
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
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
          <div>
            <h6>Select Category</h6>
            {/* <Select
              options={getCategoryOption(categoryArrList)}
              value={{ label: category }}
              onChange={(e) => {
                setCategory(e.label);
                setCategoryId(e.value);
              }}
            /> */}
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
          {/* //Image Upload */}
          <div className="mt-3 row">
            <div className="col-sm-5">
              <h6 className="mt-3">Select a sub category image</h6>
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
                className="preview-mul-img mt-3"
              />
            </div>
          </div>

          {isSubCategory ? (
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

export default CreateSubCategory;
