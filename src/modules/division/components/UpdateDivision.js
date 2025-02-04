import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, DivisionUpdate } from "../_redux/DivisionAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateDivision = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [division, setDivision] = useState("");
  const isUpdate = useSelector((state) => state.divisionInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.divisionInfo.afterUpdated);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(DivisionUpdate(division, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/division')
      dispatch(AfterUpdatedFalse())
    }
    setDivision(location?.state?.division?.divisionName)
  }, [afterUpdated, id])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Division</h3>
          <div>
            <h6 className="mb-3">Division Name</h6>
            <input
              className="form-control"
              value={division}
              placeholder="enter division name"
              onChange={(e) => setDivision(e.target.value)}
            />
          </div>

          {isUpdate ? (
            <a className="btn btn-success btn-sm mt-3 text-light">
              {" "}
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </a>
          ) : (
            <a
              className="btn btn-success btn-sm mt-3 text-light"
              onClick={() => handleSubmit()}
            >
              UPDATE
            </a>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default UpdateDivision;
