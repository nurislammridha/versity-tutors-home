import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitDepartmentName, UploadSubCatImg } from "../_redux/DepartmentNameAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetStudyTypeList } from "src/modules/StudyType/_redux/StudyTypeAction";
const CreateDepartmentName = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentNameBn, setDepartmentNameBn] = useState("");
  const [studyType, setStudyType] = useState("");
  const [studyTypeId, setStudyTypeId] = useState("");
  const isDepartmentName = useSelector((state) => state.departmentNameInfo.isDepartmentName);
  const afterCreated = useSelector((state) => state.departmentNameInfo.afterCreated);
  const studyTypeArrList = useSelector(
    (state) => state.studyTypeInfo.studyTypeList?.result
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitDepartmentName(departmentName, departmentNameBn, studyType, studyTypeId));
  };

  useEffect(() => {
    if (afterCreated) {
      setDepartmentName("")
      setDepartmentNameBn("")
      setStudyType("")
      setStudyTypeId("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])

  useEffect(() => {
    dispatch(GetStudyTypeList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6>Select Department Type</h6>
            <Select
              options={GlobalOptions(studyTypeArrList, "studyType", "_id")}
              value={{ label: studyType }}
              onChange={(e) => {
                setStudyType(e.label);
                setStudyTypeId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Department name</h6>
            <input
              className="form-control"
              value={departmentName}
              placeholder="enter department name"
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Department name bangla</h6>
            <input
              className="form-control"
              value={departmentNameBn}
              placeholder="ente department name bangla"
              onChange={(e) => setDepartmentNameBn(e.target.value)}
            />
          </div>
          {/* //Image Upload */}


          {isDepartmentName ? (
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

export default CreateDepartmentName;
