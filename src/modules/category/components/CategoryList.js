import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, CategoryDelete, CategoryStatus, GetCategoryList, RemoveCatLogo } from "../_redux/CategoryAction";
import { useHistory } from "react-router-dom";
const CategoryList = () => {
  const history = useHistory();
  const [updateId, setUpdateId] = useState("")
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const afterDeleted = useSelector(
    (state) => state.categoryInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.categoryInfo.isStatusUpdate
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
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(CategoryStatus(id, status))
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this category?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(CategoryDelete(id)),
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
        <h4>Class List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/category-add")}
        >
          Add Class
        </a>
      </div>
      <div className="mt-3">
        {categoryArrList != null && categoryArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Class Name</th>
                <th>Class Name Bangla</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.categoryNameBn}</td>
                  <td><img src={item?.img?.url} width={"50px"} /></td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    {item?._id === updateId && isStatusUpdate ?
                      <a className="btn btn-success btn-sm mt-3 text-light">
                        {" "}
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </a> :
                      <a
                        className="btn btn-outline-success btn-sm mr-2"
                        onClick={() => !isStatusUpdate && handleStatus(item?._id, item?.isActive)}
                      >
                        {item.isActive ? "Deactivate" : "Activate"}
                      </a>
                    }
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/category-edit/${item._id}`, state: { category: item } })}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-success mt-5 text-center">No category found</div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
