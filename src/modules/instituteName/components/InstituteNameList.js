import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetInstituteNameList, InstituteNameDelete, InstituteNameStatus } from "../_redux/InstituteNameAction";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetInstituteTypeList } from "src/modules/instituteType/_redux/InstituteTypeAction";
const InstituteNameList = () => {
  const [updateId, setUpdateId] = useState("")
  const [instituteType, setInstituteType] = useState("");
  const [instituteTypeId, setInstituteTypeId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const subCatInfo = useSelector(
    (state) => state.instituteNameInfo.instituteNameList
  );
  const afterDeleted = useSelector(
    (state) => state.instituteNameInfo.afterDeleted
  );
  const categoryArrList = useSelector(
    (state) => state.instituteTypeInfo.instituteTypeList?.result
  );
  const isStatusUpdate = useSelector(
    (state) => state.instituteNameInfo.isStatusUpdate
  );
  const { result: instituteNameArrList, totalPages } = subCatInfo || { totalPages: 1 }
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(InstituteNameStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetInstituteNameList(search, page, instituteTypeId, 20));
  }, [search, page, instituteTypeId]);
  useEffect(() => {
    dispatch(GetInstituteTypeList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetInstituteNameList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this institute name?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(InstituteNameDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  return (
    <>

      <div className="row align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <div className="col-md-3 mb-2 mb-md-0">
          <h4 className="mb-0 fw-semibold text-primary">Institute Name List</h4>
        </div>

        <div className="col-md-4 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Select Institute type:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(categoryArrList, "instituteType", "_id")}
              value={{ label: instituteType }}
              onChange={(e) => {
                setInstituteType(e.label);
                setInstituteTypeId(e.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Search:</label>
          <input
            className="form-control"
            placeholder="institute name"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-2 text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-success w-100"
            onClick={() => history.push("/institute-name-add")}
          >
            + Add
          </button>
        </div>
      </div>

      <div className="mt-3">
        {instituteNameArrList != null && instituteNameArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Institute Name</th>
                <th>Institute Name Bangla</th>
                <th>Institute Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {instituteNameArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.instituteName}</td>
                  <td>{item.instituteNameBn}</td>
                  <td>{item?.instituteTypeInfo?.instituteType}</td>
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
                      onClick={() => history.push({ pathname: `/institute-name-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No institute name found</div>
        )}
      </div>
      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${page === 1 && "disabled"}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, idx) => (
            <li key={idx} className={`page-item ${page === idx + 1 && "active"}`}>
              <button className="page-link" onClick={() => setPage(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages && "disabled"}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default InstituteNameList;
