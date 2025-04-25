import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import Select from "react-select";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetSubDistrictList, SubDistrictDelete, SubDistrictStatus } from "../_redux/SubDistrictAction";
import { useHistory } from "react-router-dom";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import { DistrictByDivisionId } from "src/modules/district/_redux/DistrictAction";
import { GlobalOptions } from "src/services/GlobalFunction";
const SubDistrictList = () => {
  const [updateId, setUpdateId] = useState("")
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const subDistrictInfo = useSelector(
    (state) => state.subDistrictInfo.subDistrictList
  );
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList?.result
  );
  const districtArrList = useSelector(
    (state) => state.districtInfo.districtList
  );
  const afterDeleted = useSelector(
    (state) => state.subDistrictInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.subDistrictInfo.isStatusUpdate
  );
  const { result: subDistrictArrList, totalPages } = subDistrictInfo || { totalPages: 1 }

  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(SubDistrictStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetSubDistrictList(search, page, divisionId, districtId, 20));
  }, [search, page, divisionId, districtId]);
  useEffect(() => {
    dispatch(GetDivisionList());
  }, []);
  useEffect(() => {
    divisionId.length > 0 && dispatch(DistrictByDivisionId(divisionId));
  }, [divisionId]);
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
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  return (
    <>


      <div className="row align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <div className="col-md-12 mb-2 mb-md-1">
          <h4 className="mb-0 fw-semibold text-primary">Sub District List</h4>
        </div>

        <div className="col-md-4 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Select Division:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(divisionArrList, "divisionName", "_id")}
              value={{ label: division }}
              onChange={(e) => {
                setDivision(e.label);
                setDivisionId(e.value);
                setDistrict("");
                setDistrictId("");
              }}
            />
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Select District:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(districtArrList, "districtName", "_id")}
              value={{ label: district }}
              onChange={(e) => {
                setDistrict(e.label);
                setDistrictId(e.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Search:</label>
          <input
            className="form-control"
            placeholder="Search by sub district"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-1 text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-success w-100"
            onClick={() => history.push("/sub-district-add")}
          >
            Add
          </button>
        </div>
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

export default SubDistrictList;
