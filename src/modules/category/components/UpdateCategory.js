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
  const handleChangeLogo = (value) => {
    dispatch(UploadCatLogo(value, categoryLogo));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/category')
      dispatch(AfterUpdatedFalse())
    }
    setCategory(location?.state?.category?.categoryName)
    setCategoryImg(location?.state?.category?.categoryImg)
    setCategoryLogo(location?.state?.category?.categoryLogo)
  }, [afterUpdated, id])
  useEffect(() => {
    catImg !== null && setCategoryImg(catImg)
    catLogo !== null && setCategoryLogo(catLogo)

  }, [catImg, catLogo])
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
