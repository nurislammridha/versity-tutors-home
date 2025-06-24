import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, InstituteTypeUpdate, SubmitInstituteType } from "../_redux/InstituteTypeAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateInstituteType = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [instituteType, setInstituteType] = useState("");
  const [instituteTypeBn, setInstituteTypeBn] = useState("");
  const isUpdate = useSelector((state) => state.instituteTypeInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.instituteTypeInfo.afterUpdated);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(InstituteTypeUpdate(instituteType, instituteTypeBn, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/institute-type')
      dispatch(AfterUpdatedFalse())
    }
    setInstituteType(location?.state?.instituteType?.instituteType)
    setInstituteTypeBn(location?.state?.instituteType?.instituteTypeBn)
  }, [afterUpdated, id])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Institute Type</h3>
          <div>
            <h6 className="mb-3">Institute Type</h6>
            <input
              className="form-control"
              value={instituteType}
              placeholder="enter institute type"
              onChange={(e) => setInstituteType(e.target.value)}
            />
          </div>
          <div>
            <h6 className="mb-3">Institute Type Bangla</h6>
            <input
              className="form-control"
              value={instituteTypeBn}
              placeholder="enter institute type bangla"
              onChange={(e) => setInstituteTypeBn(e.target.value)}
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

export default UpdateInstituteType;
