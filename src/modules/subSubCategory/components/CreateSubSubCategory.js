import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitSubSubCategory, UploadSubSubCatImg } from "../_redux/SubSubCategoryAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import Select from "react-select";
import { getCategoryOption, getSubCategoryOption } from "src/modules/product/_redux/ProductAction";
import demoProduct from '../../../assets/images/demoProduct.jpg'
import { SubCategoryByCategoryId } from "src/modules/subCategory/_redux/SubCategoryAction";
const CreateSubSubCategory = () => {
  const [subSubCategory, setSubSubCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const [subSubCategoryImg, setSubSubCategoryImg] = useState({ url: "", publicId: null });
  const [categoryId, setCategoryId] = useState("");
  const isSubSubCategory = useSelector((state) => state.subSubCategoryInfo.isSubSubCategory);
  const afterCreated = useSelector((state) => state.subSubCategoryInfo.afterCreated);
  const subSubCatImg = useSelector((state) => state.subSubCategoryInfo.subSubCatImg);
  const isImageLoading = useSelector((state) => state.subSubCategoryInfo.isImageLoading);
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const subCategoryArrList = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitSubSubCategory(subSubCategory, subCategoryId, categoryId, subSubCategoryImg));
  };
  const handleChangeImg = (value) => {
    dispatch(UploadSubSubCatImg(value, subSubCategoryImg));
  };
  useEffect(() => {
    if (afterCreated) {
      setSubSubCategory("")
      setSubCategory("")
      setCategory("")
      setCategoryId("")
      setSubCategoryId("")
      setSubSubCategoryImg({ url: "", publicId: null })
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  useEffect(() => {
    subSubCatImg !== null && setSubSubCategoryImg(subSubCatImg)

  }, [subSubCatImg])
  useEffect(() => {
    dispatch(GetCategoryList());
  }, []);
  useEffect(() => {
    if (category.length > 0) {
      dispatch(SubCategoryByCategoryId(categoryId));
    }

  }, [category]);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6>Select Category</h6>
            <Select
              options={getCategoryOption(categoryArrList)}
              value={{ label: category }}
              onChange={(e) => {
                setCategory(e.label);
                setCategoryId(e.value);
                setSubCategory("");
                setSubCategoryId("");
              }}
            />
          </div>
          <div className="mt-3">
            <h6>Select Sub Category</h6>
            <Select
              options={getSubCategoryOption(subCategoryArrList)}
              value={{ label: subCategory }}
              onChange={(e) => {
                setSubCategory(e.label);
                setSubCategoryId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Sub Sub Category Name</h6>
            <input
              className="form-control"
              value={subSubCategory}
              placeholder="enter sub sub category name"
              onChange={(e) => setSubSubCategory(e.target.value)}
            />
          </div>
          {/* //Image Upload */}
          <div className="mt-3 row">
            <div className="col-sm-5">
              <h6 className="mt-3">Select a sub sub category image</h6>
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

                src={subSubCategoryImg?.publicId === null ? demoProduct : subSubCategoryImg?.url}
                alt="Product Icon"
                className="preview-mul-img mt-3"
              />
            </div>
          </div>

          {isSubSubCategory ? (
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

export default CreateSubSubCategory;
