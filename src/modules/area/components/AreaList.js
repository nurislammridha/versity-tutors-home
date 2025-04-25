import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import Select from "react-select";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetAreaList, AreaDelete, AreaStatus } from "../_redux/AreaAction";
import { useHistory } from "react-router-dom";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import { DistrictByDivisionId } from "src/modules/district/_redux/DistrictAction";
import { SubDistrictByDistrictId } from "src/modules/subDistrict/_redux/SubDistrictAction";
import { GlobalOptions } from "src/services/GlobalFunction";
const AreaList = () => {
  const [updateId, setUpdateId] = useState("")
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const areaInfo = useSelector(
    (state) => state.areaInfo.areaList
  );
  const { result: areaArrList, totalPages } = areaInfo || { totalPages: 1 }

  const afterDeleted = useSelector(
    (state) => state.areaInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.areaInfo.isStatusUpdate
  );
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList?.result
  );
  const districtArrList = useSelector(
    (state) => state.districtInfo.districtList
  );
  const subDistrictArrList = useSelector(
    (state) => state.subDistrictInfo.subDistrictList
  );
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(AreaStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetAreaList(search, page, divisionId, districtId, subDistrictId, 20));
  }, [search, page, divisionId, districtId]);
  useEffect(() => {
    dispatch(GetDivisionList());
  }, []);
  useEffect(() => {
    divisionId.length > 0 && dispatch(DistrictByDivisionId(divisionId));
  }, [divisionId]);
  useEffect(() => {
    districtId.length > 0 && dispatch(SubDistrictByDistrictId(districtId));
  }, [districtId]);
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
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  return (
    <>
      <div className="row align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <div className="col-md-10 mb-2 mb-md-1">
          <h4 className="mb-0 fw-semibold text-primary">Area List</h4>
        </div>
        <div className="col-md-2 text-md-end mt-2 mb-md-1">
          <button
            className="btn btn-success w-100"
            onClick={() => history.push("/area-add")}
          >
            +Add
          </button>
        </div>
        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Division:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(divisionArrList, "divisionName", "_id")}
              value={{ label: division }}
              onChange={(e) => {
                setDivision(e.label);
                setDivisionId(e.value);
                setDistrict("");
                setDistrictId("");
                setSubDistrict("");
                setSubDistrictId("");
              }}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">District:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(districtArrList, "districtName", "_id")}
              value={{ label: district }}
              onChange={(e) => {
                setDistrict(e.label);
                setDistrictId(e.value);
                setSubDistrict("");
                setSubDistrictId("");
              }}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">SubDistrict:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(subDistrictArrList, "subDistrictName", "_id")}
              value={{ label: subDistrict }}
              onChange={(e) => {
                setSubDistrict(e.label);
                setSubDistrictId(e.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Search:</label>
          <input
            className="form-control"
            placeholder="Search by area"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>


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

export default AreaList;
