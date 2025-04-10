import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetDistrictList, DistrictDelete, DistrictStatus } from "../_redux/DistrictAction";
import { useHistory } from "react-router-dom";
const DistrictList = () => {
  const [updateId, setUpdateId] = useState("")
  const history = useHistory();
  const districtArrList = useSelector(
    (state) => state.districtInfo.districtList
  );
  const afterDeleted = useSelector(
    (state) => state.districtInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.districtInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(DistrictStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetDistrictList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetDistrictList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this district?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(DistrictDelete(id)),
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
        <h4>District List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/district-add")}
        >
          Add District
        </a>
      </div>
      <div className="mt-3">
        {districtArrList != null && districtArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>District Name</th>
                <th>District Name Bangla</th>
                <th>Division Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {districtArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.districtName}</td>
                  <td>{item.districtNameBn}</td>
                  <td>{item?.divisionInfo?.divisionName}</td>
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
                      onClick={() => history.push({ pathname: `/district-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No district found</div>
        )}
      </div>
    </>
  );
};

export default DistrictList;
