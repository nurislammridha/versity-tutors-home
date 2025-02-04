import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, LanguageDelete, LanguageStatus, GetLanguageList } from "../_redux/LanguageAction";
import { useHistory } from "react-router-dom";
const LanguageList = () => {
  const history = useHistory();
  const [updateId, setUpdateId] = useState("")
  const languageArrList = useSelector(
    (state) => state.languageInfo.languageList
  );
  const afterDeleted = useSelector(
    (state) => state.languageInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.languageInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetLanguageList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetLanguageList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(LanguageStatus(id, status))
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this language?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(LanguageDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  console.log('languageArrList', languageArrList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Language List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/language-add")}
        >
          Add Language
        </a>
      </div>
      <div className="mt-3">
        {languageArrList != null && languageArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Language Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {languageArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.languageName}</td>
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
                      onClick={() => history.push({ pathname: `/language-edit/${item._id}`, state: { language: item } })}
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
          <div className="alert alert-success mt-5 text-center">No language found</div>
        )}
      </div>
    </>
  );
};

export default LanguageList;
