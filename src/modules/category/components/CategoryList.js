import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, CategoryDelete, GetCategoryList, RemoveCatLogo } from "../_redux/CategoryAction";
import { useHistory } from "react-router-dom";
const CategoryList = () => {
  const history = useHistory();
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const afterDeleted = useSelector(
    (state) => state.categoryInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategoryList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetCategoryList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id, publicId, logoPublicId) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this category?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(RemoveCatLogo(id, publicId, logoPublicId)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  console.log('categoryArrList', categoryArrList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Category List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/category-add")}
        >
          Add Category
        </a>
      </div>
      <div className="mt-3">
        {categoryArrList != null && categoryArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Category Name</th>
                <th>Photo</th>
                <th>Logo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.categoryName}</td>
                  <td><img src={item?.categoryImg?.url} width={"50px"} /></td>
                  <td><img src={item?.categoryLogo?.url} width={"50px"} /></td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/category-edit/${item._id}`, state: { category: item } })}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id, item.categoryImg?.publicId, item.categoryLogo?.publicId)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-success mt-5 text-center">No size found</div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
