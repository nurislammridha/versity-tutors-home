import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetSubCategoryList, RemoveSubCatImg, SubCategoryDelete, SubCategoryStatus } from "../_redux/SubCategoryAction";
import { useHistory } from "react-router-dom";
const SubCategoryList = () => {
  const [updateId, setUpdateId] = useState("")
  const history = useHistory();
  const subCategoryArrList = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );
  const afterDeleted = useSelector(
    (state) => state.subCategoryInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.categoryInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(SubCategoryStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetSubCategoryList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetSubCategoryList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this subject?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(SubCategoryDelete(id)),
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
        <h4>Subject List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/sub-category-add")}
        >
          Add Subject
        </a>
      </div>
      <div className="mt-3">
        {subCategoryArrList != null && subCategoryArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Subject Name</th>
                <th>Subject Name Bangla</th>
                <th>Class Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategoryArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.subCategoryName}</td>
                  <td>{item.subCategoryNameBn}</td>
                  <td>{item?.categoryInfo?.categoryName}</td>
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
                      onClick={() => history.push({ pathname: `/sub-category-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No subject found</div>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
