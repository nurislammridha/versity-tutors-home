import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetSubCategoryList, RemoveSubCatImg } from "../_redux/SubCategoryAction";
import { useHistory } from "react-router-dom";
const SubCategoryList = () => {
  const history = useHistory();
  const subCategoryArrList = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );
  const afterDeleted = useSelector(
    (state) => state.subCategoryInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSubCategoryList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetSubCategoryList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id, publicId) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this sub category?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(RemoveSubCatImg(id, publicId)),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Sub Category List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/sub-category-add")}
        >
          Add Sub Category
        </a>
      </div>
      <div className="mt-3">
        {subCategoryArrList != null && subCategoryArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Sub Category Name</th>
                <th>Sub Category Photo</th>
                <th>Category Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategoryArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.subCategoryName}</td>
                  <td><img src={item?.subCategoryImg?.url} width={"50px"} /></td>
                  <td>{item?.categoryInfo?.categoryName}</td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/sub-category-edit/${item._id}`, state: { data: item } })}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id, item.subCategoryImg?.publicId)}
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

export default SubCategoryList;
