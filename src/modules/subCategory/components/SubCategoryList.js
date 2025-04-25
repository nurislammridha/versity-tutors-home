import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, GetSubCategoryList, RemoveSubCatImg, SubCategoryDelete, SubCategoryStatus } from "../_redux/SubCategoryAction";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
const SubCategoryList = () => {
  const [updateId, setUpdateId] = useState("")
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const subCatInfo = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );
  const afterDeleted = useSelector(
    (state) => state.subCategoryInfo.afterDeleted
  );
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList?.result
  );
  const isStatusUpdate = useSelector(
    (state) => state.categoryInfo.isStatusUpdate
  );
  const { result: subCategoryArrList, totalPages } = subCatInfo || { totalPages: 1 }
  const dispatch = useDispatch();
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(SubCategoryStatus(id, status))
  }
  useEffect(() => {
    dispatch(GetSubCategoryList(search, page, categoryId, 20));
  }, [search, page, categoryId]);
  useEffect(() => {
    dispatch(GetCategoryList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetSubCategoryList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this subject?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(SubCategoryDelete(id)),
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
          <h4 className="mb-0 fw-semibold text-primary">Subject List</h4>
        </div>

        <div className="col-md-4 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Select Class:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(categoryArrList, "categoryName", "_id")}
              value={{ label: category }}
              onChange={(e) => {
                setCategory(e.label);
                setCategoryId(e.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Search:</label>
          <input
            className="form-control"
            placeholder="Search by subject"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-2 text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-success w-100"
            onClick={() => history.push("/sub-category-add")}
          >
            + Add Subject
          </button>
        </div>
      </div>

      <div className="mt-3">
        {subCategoryArrList != null && subCategoryArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Subject Name</th>
                <th>Subject Name Bangla</th>
                <th>Class Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategoryArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.subCategoryName}</td>
                  <td>{item.subCategoryNameBn}</td>
                  <td>{item?.categoryInfo?.categoryName}</td>
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
                      onClick={() => history.push({ pathname: `/sub-category-edit/${item._id}`, state: { data: item } })}
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
          <div className="alert alert-success mt-5 text-center">No subject found</div>
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

export default SubCategoryList;
