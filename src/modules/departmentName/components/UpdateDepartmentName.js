import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, DepartmentNameUpdate, SubmitDepartmentName, UploadSubCatImg } from "../_redux/DepartmentNameAction";

import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetStudyTypeList } from "src/modules/StudyType/_redux/StudyTypeAction";
const UpdateDepartmentName = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [departmentName, setDepartmentName] = useState("");
  const [departmentNameBn, setDepartmentNameBn] = useState("");
  const [studyType, setStudyType] = useState("");
  const [studyTypeId, setStudyTypeId] = useState("");
  const isUpdate = useSelector((state) => state.departmentNameInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.studyTypeInfo.afterUpdated);
  const studyTypeArrList = useSelector(
    (state) => state.studyTypeInfo.studyTypeList?.result
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(DepartmentNameUpdate(departmentName, departmentNameBn, studyType, studyTypeId, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/department-name')
      dispatch(AfterUpdatedFalse())
    }
    setDepartmentName(location?.state?.data?.departmentName)
    setDepartmentNameBn(location?.state?.data?.departmentNameBn)
    setStudyType(location?.state?.data?.studyTypeInfo?.studyType)
    setStudyTypeId(location?.state?.data?.studyTypeInfo?._id)
  }, [afterUpdated, id])

  useEffect(() => {
    dispatch(GetStudyTypeList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h4 className="mb-3">Update Department Name</h4>
          <div>
            <h6 >Select Department Type</h6>
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
              placeholder="enter department name bangla"
              onChange={(e) => setDepartmentNameBn(e.target.value)}
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

export default UpdateDepartmentName;
