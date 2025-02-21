import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GetProfileList, ProfileDelete, ProfileUpdate } from "../_redux/ProfileAction";
const UnApproveTutorList = () => {
  const dispatch = useDispatch();
  const [updateId, setUpdateId] = useState("")
  const filter = { filters: { isTutorAccount: true, isApproved: true } }
  const profileList = useSelector(
    (state) => state.profileInfo.profileList
  );
  const isUpdateLoading = useSelector(
    (state) => state.profileInfo.isUpdateLoading
  );
  const handleApprove = (id) => {
    setUpdateId(id)
    dispatch(ProfileUpdate({ isApproved: false }, filter, id))
  }


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
    dispatch(GetProfileList(filter));
  }, []);
  console.log('profileList', profileList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Approve Tutors</h4>

      </div>
      <div className="mt-3">
        {profileList != null && profileList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profileList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>
                    {item?._id === updateId && isUpdateLoading ?
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
                        onClick={() => !isUpdateLoading && handleApprove(item?._id)}
                      >
                        Un Approve
                      </a>
                    }

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
    </>
  );
};

export default UnApproveTutorList;
