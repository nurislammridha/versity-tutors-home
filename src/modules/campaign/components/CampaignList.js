import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, CampaignDelete, GetCampaignList } from "../_redux/CampaignAction";
import { useHistory } from "react-router-dom";
const CampaignList = () => {
  const history = useHistory();
  const campaignArrList = useSelector(
    (state) => state.campaignInfo.campaignList
  );
  const afterDeleted = useSelector(
    (state) => state.campaignInfo.afterDeleted
  );
  const dispatch = useDispatch();
  const handleEdit = (data) => {
    history.push({ pathname: `/campaign-edit`, state: { data } })
  }
  useEffect(() => {
    dispatch(GetCampaignList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetCampaignList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this campaign?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(CampaignDelete(id)),
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
        <h4>Campaign List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/campaign-add")}
        >
          Add Campaign
        </a>
      </div>
      <div className="mt-3">
        {campaignArrList != null && campaignArrList.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Campaign Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Show Home</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {campaignArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.campaignName}</td>
                  <td>{item.campaignStartTime + " " + item.campaignStartDate}</td>
                  <td>{item.campaignEndTime + " " + item.campaignEndDate}</td>
                  <td>{item.isShowHomePage ? "SHOW" : "HIDE"}</td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-primary btn-sm mr-1"
                      onClick={() => history.push(`/campaign-product/${item._id}`)}
                    >
                      <i className="fa fa-eye"></i>
                    </a>
                    <a
                      className="btn btn-success btn-sm mr-1"
                      onClick={() => handleEdit(item)}
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
        )}
      </div>
    </>
  );
};

export default CampaignList;
