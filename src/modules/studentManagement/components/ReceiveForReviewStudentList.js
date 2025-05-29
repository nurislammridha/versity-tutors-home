import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import Select from "react-select";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GetProfileList, GetProfileListFilter, ProfileDelete, ProfileUpdate } from "../_redux/StudentManagementAction";
import { useHistory } from "react-router-dom";
import { filterByModerator, GlobalOptions } from "src/services/GlobalFunction";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import { DistrictByDivisionId } from "src/modules/district/_redux/DistrictAction";
import { SubDistrictByDistrictId } from "src/modules/subDistrict/_redux/SubDistrictAction";
import { AreaBySubDistirctId } from "src/modules/area/_redux/AreaAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import { SubCategoryByCategoryId } from "src/modules/subCategory/_redux/SubCategoryAction";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import TaskRejectionModal from "./TaskRejectionModal";
const ReceiveForReviewStudentList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filterObj, setFilterObj] = useState({});
  const [itemId, setItemId] = useState(null);
  const [taskItemId, setTaskItemId] = useState(null);
  const [taskItem, setTaskItem] = useState(null);
  const [item, setItem] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [rejectModalShow, setRejectModalShow] = useState(false);
  const [userInfo, setUserInfo] = useState(null)
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filter = { filters: { isTutorAccount: false } }
  const studentManagementInformation = useSelector(
    (state) => state.studentManagementInfo.profileList
  );
  const isUpdateLoading = useSelector(
    (state) => state.studentManagementInfo.isUpdateLoading
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
  const areArrList = useSelector(
    (state) => state.areaInfo.areaList
  );
  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList?.result
  );
  const subCategoryArrList = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );
  const { result: profileList, totalPages } = studentManagementInformation || { totalPages: 1 }

  const handleApprove = (id) => {

    dispatch(ProfileUpdate({ isApproved: true }, filter, id))
  }
  const submitUnderReview = (id) => {
    const obj = { search, page, limit: 20, filters: { reviewStatus: "requestInitiated", isTutorAccount: false, categoryId, subCategoryId, divisionId, districtId, subDistrictId, areaId } }
    let postData = { reviewStatus: "underReview", assignedModerator: userInfo?._id, }

    dispatch(ProfileUpdate(postData, id, userInfo, obj))
  }


  const handleUnderReview = (item) => {
    setModalShow(true)
    setItemId(item?._id)
    setItem(item)
  };
  const handleTaskRejection = (item) => {
    setRejectModalShow(true)
    setTaskItemId(item?._id)
    setTaskItem(item)
  };
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this language?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(ProfileDelete(filter, id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  useEffect(() => {
    const obj = { search, page, limit: 20, filters: { moderatorId: userInfo?._id, reviewStatus: "receiveForReview", isTutorAccount: false, categoryId, subCategoryId, divisionId, districtId, subDistrictId, areaId } }
    setFilterObj(obj)
    userInfo !== null && dispatch(GetProfileListFilter(obj))

  }, [userInfo, search, page, divisionId, districtId, subDistrictId, areaId, categoryId, subCategoryId]);
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userData")))
    dispatch(GetDivisionList());
    dispatch(GetCategoryList());
  }, []);
  useEffect(() => {
    divisionId.length > 0 && dispatch(DistrictByDivisionId(divisionId));
  }, [divisionId]);
  useEffect(() => {
    districtId.length > 0 && dispatch(SubDistrictByDistrictId(districtId));
  }, [districtId]);
  useEffect(() => {
    subDistrictId.length > 0 && dispatch(AreaBySubDistirctId(subDistrictId));
  }, [subDistrictId]);
  useEffect(() => {
    categoryId.length > 0 && dispatch(SubCategoryByCategoryId(categoryId));
  }, [categoryId]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  return (
    <>
      <div className="row align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <div className="col-md-4 mb-3 mb-md-3">
          <h4 className="mb-0 fw-semibold text-primary">Receive For Review Student</h4>
        </div>
        <div className="col-md-8 d-flex align-items-center gap-2 mb-3 mb-md-3">
          <label className="mb-0 fw-semibold">Search:</label>
          <input
            className="form-control"
            placeholder="Search by name, institute, location, class, subject, tagline, email, phone, whatsapp"
            type="text"
            value={search}
            onChange={handleSearch}
          />
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
                setArea("")
                setAreaId("")
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
                setArea("")
                setAreaId("")
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
                setArea("")
                setAreaId("")
              }}
            />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2">
          <label className="mb-0 fw-semibold">Area:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(areArrList, "areaName", "_id")}
              value={{ label: area }}
              onChange={(e) => {
                setArea(e.label);
                setAreaId(e.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center gap-2 mt-3">
          <label className="mb-0 fw-semibold">Class:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(categoryArrList, "categoryName", "_id")}
              value={{ label: category }}
              onChange={(e) => {
                setCategory(e.label);
                setCategoryId(e.value);
                setSubCategory("")
                setSubCategoryId("")
              }}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center gap-2 mt-3">
          <label className="mb-0 fw-semibold">Subject:</label>
          <div className="flex-grow-1">
            <Select
              options={GlobalOptions(subCategoryArrList, "subCategoryName", "_id")}
              value={{ label: subCategory }}
              onChange={(e) => {
                setSubCategory(e.label);
                setSubCategoryId(e.value);
              }}
            />
          </div>
        </div>


      </div>
      <div className="mt-3">
        {profileList != null && profileList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {filterByModerator(profileList, userInfo?._id).map((item, index) => ( */}
              {profileList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>{item.phone}</td>
                  <td>
                    <a
                      className="btn  btn-outline-danger btn-sm mr-2"
                      onClick={() => handleUnderReview(item)}
                    >
                      {isUpdateLoading && itemId === item._id ? "Reviewing.." : "Review Decision"}
                    </a>
                    <a
                      className="btn  btn-outline-danger btn-sm mr-2"
                      onClick={() => handleTaskRejection(item)}
                    >
                      {isUpdateLoading && taskItemId === item._id ? "Rejecting.." : "Task Rejection"}
                    </a>
                    <a
                      className="btn btn-success btn-sm mr-2"
                      onClick={() => history.push(`/profile/${item._id}`)}
                    >
                      <i className="fa fa-eye"></i>
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
          <div className="alert alert-success mt-5 text-center">No data found</div>
        )}
      </div>
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
      <TaskRejectionModal
        show={rejectModalShow}
        onHide={() => setRejectModalShow(false)}
        itemId={taskItemId}
        item={taskItem}
        filterObj={filterObj}
        userInfo={userInfo}
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        itemId={itemId}
        item={item}
        filterObj={filterObj}
        userInfo={userInfo}
      />
    </>
  );
};

export default ReceiveForReviewStudentList;
