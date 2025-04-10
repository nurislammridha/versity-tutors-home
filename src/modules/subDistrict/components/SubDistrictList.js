import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetSubDistrictList, SubDistrictDelete, SubDistrictStatus } from "../_redux/SubDistrictAction";
import { useHistory } from "react-router-dom";
const SubDistrictList = () => {
  const [updateId, setUpdateId] = useState("")
  const history = useHistory();
  const subDistrictArrList = useSelector(
    (state) => state.subDistrictInfo.subDistrictList
  );
  const afterDeleted = useSelector(
    (state) => state.subDistrictInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.subDistrictInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(SubDistrictStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetSubDistrictList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetSubDistrictList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this subdistrict?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(SubDistrictDelete(id)),
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
        <h4>SubDistrict List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/sub-district-add")}
        >
          Add Sub District
        </a>
      </div>
      <div className="mt-3">
        {subDistrictArrList != null && subDistrictArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Sub District Name</th>
                <th>Name Bangla</th>
                <th>District Name</th>
                <th>Division Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subDistrictArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.subDistrictName}</td>
                  <td>{item.subDistrictNameBn}</td>
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
                      onClick={() => history.push({ pathname: `/sub-district-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No sub district found</div>
        )}
      </div>
    </>
  );
};

export default SubDistrictList;
