import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, CategoryDelete, CategoryStatus, GetCategoryList, RemoveCatLogo } from "../_redux/CategoryAction";
import { useHistory } from "react-router-dom";
const CategoryList = () => {
  const history = useHistory();
  const [updateId, setUpdateId] = useState("")
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const catInfo = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const { result: categoryArrList, totalPages } = catInfo || { totalPages: 1 }
  const afterDeleted = useSelector(
    (state) => state.categoryInfo.afterDeleted
  );
  const isStatusUpdate = useSelector(
    (state) => state.categoryInfo.isStatusUpdate
  );
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  useEffect(() => {
    dispatch(GetCategoryList(search, page, 20));
  }, [search, page]);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetCategoryList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleStatus = (id, status) => {
    setUpdateId(id)
    dispatch(CategoryStatus(id, status))
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this category?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(CategoryDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  console.log('categoryArrList', categoryArrList)
  return (
    <>
      <div className="row align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <div className="col-md-6 mb-2 mb-md-0">
          <h4 className="mb-0 fw-semibold text-primary">Class List</h4>
        </div>

        <div className="col-md-4 mb-2 mb-md-0">
          <input
            className="form-control"
            placeholder="Search by class name"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-2 text-md-end">
          <button
            className="btn btn-success w-100"
            onClick={() => history.push("/category-add")}
          >
            + Add Class
          </button>
        </div>
      </div>

      <div className="mt-3">
        {categoryArrList != null && categoryArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Class Name</th>
                <th>Class Name Bangla</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.categoryNameBn}</td>
                  <td><img src={item?.img?.url} width={"50px"} /></td>
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
                      onClick={() => history.push({ pathname: `/category-edit/${item._id}`, state: { category: item } })}
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
          <div className="alert alert-success mt-5 text-center">No category found</div>
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

export default CategoryList;
