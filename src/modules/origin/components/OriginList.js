import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, OriginDelete, GetOriginList, RemoveOriginImg } from "../_redux/OriginAction";
import { useHistory } from "react-router-dom";
const OriginList = () => {
  const history = useHistory();
  const originArrList = useSelector(
    (state) => state.originInfo.originList
  );
  const afterDeleted = useSelector(
    (state) => state.originInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetOriginList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetOriginList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id, publicId) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this origin?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(RemoveOriginImg(id, publicId)),
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
        <h4>Origin List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/origin-add")}
        >
          Add Origin
        </a>
      </div>
      <div className="mt-3">
        {originArrList != null && originArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {originArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.originName}</td>
                  <td><img src={item?.originLogo?.url} width={30} /></td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/origin-edit/${item._id}`, state: { data: item } })}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    {item._id !== "6602d7dfdf403e1264fffccc" && <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id, item?.originLogo?.publicId)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (<div className="text-center alert alert-success mt-5">No Origin Found</div>)}
      </div>
    </>
  );
};

export default OriginList;
