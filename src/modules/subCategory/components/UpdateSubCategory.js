import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, SubCategoryUpdate, SubmitSubCategory, UploadSubCatImg } from "../_redux/SubCategoryAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import Select from "react-select";
// import { getCategoryOption } from "src/modules/product/_redux/ProductAction";
import { useHistory, useLocation, useParams } from "react-router-dom";
import demoProduct from '../../../assets/images/demoProduct.jpg'
import { GlobalOptions } from "src/services/GlobalFunction";
const UpdateSubCategory = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryBn, setSubCategoryBn] = useState("");
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
    dispatch(SubCategoryUpdate(subCategory, subCategoryBn, category, categoryId, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/sub-category')
      dispatch(AfterUpdatedFalse())
    }
    setSubCategory(location?.state?.data?.subCategoryName)
    setSubCategoryBn(location?.state?.data?.subCategoryNameBn)
    setCategory(location?.state?.data?.categoryInfo?.categoryName)
    setCategoryId(location?.state?.data?.categoryInfo?._id)
  }, [afterUpdated, id])

  useEffect(() => {
    dispatch(GetCategoryList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h4 className="mb-3">Update Subject</h4>
          <div>
            <h6 >Select Class</h6>
            <Select
              options={GlobalOptions(categoryArrList, "categoryName", "_id")}
              value={{ label: category }}
              onChange={(e) => {
                setCategory(e.label);
                setCategoryId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Subject name</h6>
            <input
              className="form-control"
              value={subCategory}
              placeholder="enter subject name"
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Subject name bangla</h6>
            <input
              className="form-control"
              value={subCategoryBn}
              placeholder="enter subject name bangla"
              onChange={(e) => setSubCategoryBn(e.target.value)}
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

export default UpdateSubCategory;
