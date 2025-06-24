import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitInstituteType } from "../_redux/InstituteTypeAction";
const CreateInstituteType = () => {
  const [instituteType, setInstituteType] = useState("");
  const [instituteTypeBn, setInstituteTypeBn] = useState("");
  const isInstituteType = useSelector((state) => state.instituteTypeInfo.isInstituteType);
  const afterCreated = useSelector((state) => state.instituteTypeInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitInstituteType(instituteType, instituteTypeBn));
  };

  useEffect(() => {
    if (afterCreated) {
      setInstituteType("")
      setInstituteTypeBn("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Institute type</h6>
            <input
              className="form-control"
              value={instituteType}
              placeholder="enter institute type"
              onChange={(e) => setInstituteType(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Institute type bangla</h6>
            <input
              className="form-control"
              value={instituteTypeBn}
              placeholder="enter institute type bangla"
              onChange={(e) => setInstituteTypeBn(e.target.value)}
            />
          </div>

          {isInstituteType ? (
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

export default CreateInstituteType;
