import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetAreaList, AreaDelete, AreaStatus } from "../_redux/AreaAction";
import { useHistory } from "react-router-dom";
const AreaList = () => {
  const [updateId, setUpdateId] = useState("")
  const history = useHistory();
  const areaArrList = useSelector(
    (state) => state.areaInfo.areaList
  );
  const afterDeleted = useSelector(
    (state) => state.areaInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.areaInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(AreaStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetAreaList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetAreaList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this area?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(AreaDelete(id)),
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
        <h4>Area List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/area-add")}
        >
          Add Area
        </a>
      </div>
      <div className="mt-3">
        {areaArrList != null && areaArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Area </th>
                <th>Area Bangla</th>
                <th>Sub District</th>
                <th>District</th>
                <th>Division</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {areaArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.areaName}</td>
                  <td>{item.areaNameBn}</td>
                  <td>{item?.subDistrictInfo?.subDistrictName}</td>
                  <td>{item?.districtInfo?.districtName}</td>
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
                      onClick={() => history.push({ pathname: `/area-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No area found</div>
        )}
      </div>
    </>
  );
};

export default AreaList;
