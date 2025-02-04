import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitDivision } from "../_redux/DivisionAction";
const CreateDivision = () => {
  const [division, setDivision] = useState("");
  const isDivision = useSelector((state) => state.divisionInfo.isDivision);
  const afterCreated = useSelector((state) => state.divisionInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitDivision(division));
  };
  useEffect(() => {
    if (afterCreated) {
      setDivision("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Division Name</h6>
            <input
              className="form-control"
              value={division}
              placeholder="enter division name"
              onChange={(e) => setDivision(e.target.value)}
            />
          </div>

          {isDivision ? (
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
              SUBMIT
            </a>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default CreateDivision;
