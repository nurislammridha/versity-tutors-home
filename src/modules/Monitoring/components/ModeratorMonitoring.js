import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { GetModeratorMonitoringList } from "../_redux/MonitoringAction";
const ModeratorMonitoring = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const moderatorMonitorList = useSelector(
    (state) => state.monitoringInfo.moderatorMonitorList
  );

  const { result: moderatorMonitoringArrList, totalPages } = moderatorMonitorList || { totalPages: 1 }

  const dispatch = useDispatch();
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };
  useEffect(() => {
    userInfo !== null && dispatch(GetModeratorMonitoringList(userInfo?._id, search, page, 20));
  }, [userInfo, search, page]);
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userData")))
  }, [])
  // console.log('userInfo', userInfo)
  return (
    <>

      <div className="row align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <div className="col-md-6 mb-2 mb-md-0">
          <h4 className="mb-0 fw-semibold text-primary">Moderator Monitoring List</h4>
        </div>

        <div className="col-md-4 mb-2 mb-md-0">
          <input
            className="form-control"
            placeholder="Search by moderatormonitoring"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>


      </div>
      <div className="mt-3">
        {moderatorMonitoringArrList != null && moderatorMonitoringArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Last Status</th>
                <th>Checked</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {moderatorMonitoringArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.roleInfo?.firstName}</td>
                  <td>{moment(item.startingTime).format('DD-MM-YYYY')}</td>
                  <td>{item?.endingTine}</td>
                  <td>{item?.lastStatus}</td>
                  <td>{item?.isCheckedByManager}</td>
                  <td>{item?.isComplete}</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-success mt-5 text-center">No moderator monitoring found</div>
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

export default ModeratorMonitoring;
