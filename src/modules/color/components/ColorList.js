import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, ColorDelete, GetColorList } from "../_redux/ColorAction";
import { useHistory } from "react-router-dom";
const ColorList = () => {
  const history = useHistory();
  const colorArrList = useSelector(
    (state) => state.colorInfo.colorList
  );
  const afterDeleted = useSelector(
    (state) => state.colorInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetColorList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetColorList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this color?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(ColorDelete(id)),
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
        <h4>Color List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/color-add")}
        >
          Add Color
        </a>
      </div>
      <div className="mt-3">
        {colorArrList != null && colorArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Color Name</th>
                <th>Color Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {colorArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.colorName}</td>
                  <td>{item.colorHexCode}</td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/color-edit/${item._id}`, state: { color: item.colorName } })}
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
        ) : <div className="alert alert-success mt-5 text-center">No color found</div>}
      </div>
    </>
  );
};

export default ColorList;
