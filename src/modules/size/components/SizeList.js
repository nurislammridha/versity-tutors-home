import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, SizeDelete, GetSizeList } from "../_redux/SizeAction";
import { useHistory } from "react-router-dom";
const SizeList = () => {
  const history = useHistory();
  const sizeArrList = useSelector(
    (state) => state.sizeInfo.sizeList
  );
  const afterDeleted = useSelector(
    (state) => state.sizeInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSizeList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetSizeList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this size?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(SizeDelete(id)),
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
        <h4>Size List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/size-add")}
        >
          Add Size
        </a>
      </div>
      <div className="mt-3">
        {sizeArrList != null && sizeArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Size Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sizeArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.sizeName}</td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/size-edit/${item._id}`, state: { size: item.sizeName } })}
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
          <div className="alert alert-success mt-5 text-center">No size found</div>
        )}
      </div>
    </>
  );
};

export default SizeList;
