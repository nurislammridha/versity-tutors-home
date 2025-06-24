import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitStudyType } from "../_redux/StudyTypeAction";
const CreateStudyType = () => {
  const [studyType, setStudyType] = useState("");
  const [studyTypeBn, setStudyTypeBn] = useState("");
  const isStudyType = useSelector((state) => state.studyTypeInfo.isStudyType);
  const afterCreated = useSelector((state) => state.studyTypeInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitStudyType(studyType, studyTypeBn));
  };

  useEffect(() => {
    if (afterCreated) {
      setStudyType("")
      setStudyTypeBn("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Study type</h6>
            <input
              className="form-control"
              value={studyType}
              placeholder="enter study type"
              onChange={(e) => setStudyType(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Study type bangla</h6>
            <input
              className="form-control"
              value={studyTypeBn}
              placeholder="enter study type bangla"
              onChange={(e) => setStudyTypeBn(e.target.value)}
            />
          </div>

          {isStudyType ? (
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

export default CreateStudyType;
