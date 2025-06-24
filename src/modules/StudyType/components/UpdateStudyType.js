import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, StudyTypeUpdate, SubmitStudyType } from "../_redux/StudyTypeAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateStudyType = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [studyType, setStudyType] = useState("");
  const [studyTypeBn, setStudyTypeBn] = useState("");
  const isUpdate = useSelector((state) => state.studyTypeInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.studyTypeInfo.afterUpdated);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(StudyTypeUpdate(studyType, studyTypeBn, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/study-type')
      dispatch(AfterUpdatedFalse())
    }
    setStudyType(location?.state?.studyType?.studyType)
    setStudyTypeBn(location?.state?.studyType?.studyTypeBn)
  }, [afterUpdated, id])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Study Type</h3>
          <div>
            <h6 className="mb-3">Study Type</h6>
            <input
              className="form-control"
              value={studyType}
              placeholder="enter study type"
              onChange={(e) => setStudyType(e.target.value)}
            />
          </div>
          <div>
            <h6 className="mb-3">Study Type Bangla</h6>
            <input
              className="form-control"
              value={studyTypeBn}
              placeholder="enter study type bangla"
              onChange={(e) => setStudyTypeBn(e.target.value)}
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

export default UpdateStudyType;
