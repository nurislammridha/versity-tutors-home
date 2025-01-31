import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitUnit } from "../_redux/UnitAction";

const CreateUnit = () => {
  const [unit, setUnit] = useState("");
  const isUnit = useSelector((state) => state.unitInfo.isUnit);
  const afterCreated = useSelector((state) => state.unitInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitUnit(unit));
  };
  useEffect(() => {
    if (afterCreated) {
      setUnit("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Unit Name</h6>
            <input
              className="form-control"
              value={unit}
              placeholder="enter unit name"
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          {isUnit ? (
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

export default CreateUnit;
