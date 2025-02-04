import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, DivisionDelete, DivisionStatus, GetDivisionList } from "../_redux/DivisionAction";
import { useHistory } from "react-router-dom";
const DivisionList = () => {
  const history = useHistory();
  const [updateId, setUpdateId] = useState("")
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList
  );
  const afterDeleted = useSelector(
    (state) => state.divisionInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.divisionInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDivisionList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetDivisionList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(DivisionStatus(id, status))
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this division?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(DivisionDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  console.log('divisionArrList', divisionArrList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Division List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/division-add")}
        >
          Add Division
        </a>
      </div>
      <div className="mt-3">
        {divisionArrList != null && divisionArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Division Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {divisionArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.divisionName}</td>
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
                      onClick={() => history.push({ pathname: `/division-edit/${item._id}`, state: { division: item } })}
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
          <div className="alert alert-success mt-5 text-center">No division found</div>
        )}
      </div>
    </>
  );
};

export default DivisionList;
