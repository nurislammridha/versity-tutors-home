import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetDepartmentNameList, DepartmentNameDelete, DepartmentNameStatus } from "../_redux/DepartmentNameAction";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetStudyTypeList } from "src/modules/StudyType/_redux/StudyTypeAction";
const DepartmentNameList = () => {
  const [updateId, setUpdateId] = useState("")
  const [studyType, setStudyType] = useState("");
  const [studyTypeId, setStudyTypeId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const subCatInfo = useSelector(
    (state) => state.departmentNameInfo.departmentNameList
  );
  const afterDeleted = useSelector(
    (state) => state.departmentNameInfo.afterDeleted
  );
  const categoryArrList = useSelector(
    (state) => state.studyTypeInfo.studyTypeList?.result
  );
  const isStatusUpdate = useSelector(
    (state) => state.departmentNameInfo.isStatusUpdate
  );
  const { result: departmentNameArrList, totalPages } = subCatInfo || { totalPages: 1 }
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(DepartmentNameStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetDepartmentNameList(search, page, studyTypeId, 20));
  }, [search, page, studyTypeId]);
  useEffect(() => {
    dispatch(GetStudyTypeList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetDepartmentNameList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this department name?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(DepartmentNameDelete(id)),
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
          <h4 className="mb-0 fw-semibold text-primary">Department List</h4>
        </div>

        <div className="col-md-4 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Study type:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(categoryArrList, "studyType", "_id")}
              value={{ label: studyType }}
              onChange={(e) => {
                setStudyType(e.label);
                setStudyTypeId(e.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Search:</label>
          <input
            className="form-control"
            placeholder="enter department"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-2 text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-success w-100"
            onClick={() => history.push("/department-name-add")}
          >
            + Add
          </button>
        </div>
      </div>

      <div className="mt-3">
        {departmentNameArrList != null && departmentNameArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Department</th>
                <th>Department Bangla</th>
                <th>Department Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departmentNameArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.departmentName}</td>
                  <td>{item.departmentNameBn}</td>
                  <td>{item?.studyTypeInfo?.studyType}</td>
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
                      onClick={() => history.push({ pathname: `/department-name-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No department found</div>
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

export default DepartmentNameList;
