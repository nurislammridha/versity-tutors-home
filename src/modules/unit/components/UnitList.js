import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, UnitDelete, GetUnitList } from "../_redux/UnitAction";
import { useHistory } from "react-router-dom";
const UnitList = () => {
  const history = useHistory();
  const unitArrList = useSelector(
    (state) => state.unitInfo.unitList
  );
  const afterDeleted = useSelector(
    (state) => state.unitInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUnitList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetUnitList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this unit?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(UnitDelete(id)),
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
        <h4>Unit List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/unit-add")}
        >
          Add Unit
        </a>
      </div>
      <div className="mt-3">
        {unitArrList != null && unitArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Unit Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unitArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.unitName}</td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/unit-edit/${item._id}`, state: { unit: item.unitName } })}
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
          <div className="alert alert-success mt-5 text-center">No unit found</div>
        )}
      </div>
    </>
  );
};

export default UnitList;
