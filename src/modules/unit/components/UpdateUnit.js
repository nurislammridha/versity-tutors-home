import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, AfterUpdatedFalse, SubmitUnit, UnitUpdate } from "../_redux/UnitAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateUnit = () => {
  const history = useHistory()
  const location = useLocation()
  const [unit, setUnit] = useState("");
  const isUpdate = useSelector((state) => state.unitInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.unitInfo.afterUpdated);
  const { id } = useParams()
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(UnitUpdate(unit, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push("/unit")
      dispatch(AfterUpdatedFalse())
    }
    setUnit(location?.state?.unit)
  }, [afterUpdated, id])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="pb-3">Update Unit</h3>
          <div>
            <h6 className="mb-3">Unit Name</h6>
            <input
              className="form-control"
              value={unit}
              placeholder="enter unit name"
              onChange={(e) => setUnit(e.target.value)}
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

export default UpdateUnit;
