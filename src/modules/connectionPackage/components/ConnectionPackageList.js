import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, ConnectionPackageDelete, ConnectionPackageStatus, GetConnectionPackageList } from "../_redux/ConnectionPackageAction";
import { useHistory } from "react-router-dom";
const ConnectionPackageList = () => {
  const history = useHistory();
  const [updateId, setUpdateId] = useState("")
  const connectionPackageArrList = useSelector(
    (state) => state.connectionPackageInfo.connectionPackageList
  );
  const afterDeleted = useSelector(
    (state) => state.connectionPackageInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.connectionPackageInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetConnectionPackageList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetConnectionPackageList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(ConnectionPackageStatus(id, status))
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this connection package?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(ConnectionPackageDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  // console.log('connectionackageArrList', connectionpackageArrList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Connection Package List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/connection-package-add")}
        >
          Add Connection Package
        </a>
      </div>
      <div className="mt-3">
        {connectionPackageArrList != null && connectionPackageArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th> Name</th>
                <th> Name Bangla</th>
                <th> Connections</th>
                <th> Con Ban</th>
                <th> Price</th>
                <th> P Bangla</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {connectionPackageArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.nameBn}</td>
                  <td>{item.connections}</td>
                  <td>{item.connectionsBn}</td>
                  <td>{item.price}</td>
                  <td>{item.priceBn}</td>
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
                      onClick={() => history.push({ pathname: `/connection-package-edit/${item._id}`, state: { connectionPackage: item } })}
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
          <div className="alert alert-success mt-5 text-center">No connection package found</div>
        )}
      </div>
    </>
  );
};

export default ConnectionPackageList;
