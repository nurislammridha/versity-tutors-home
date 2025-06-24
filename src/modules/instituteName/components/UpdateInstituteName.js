import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, InstituteNameUpdate, SubmitInstituteName, UploadSubCatImg } from "../_redux/InstituteNameAction";

import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetInstituteTypeList } from "src/modules/instituteType/_redux/InstituteTypeAction";
const UpdateInstituteName = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [instituteName, setInstituteName] = useState("");
  const [instituteNameBn, setInstituteNameBn] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [instituteTypeId, setInstituteTypeId] = useState("");
  const isUpdate = useSelector((state) => state.instituteNameInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.instituteTypeInfo.afterUpdated);
  const instituteTypeArrList = useSelector(
    (state) => state.instituteTypeInfo.instituteTypeList?.result
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(InstituteNameUpdate(instituteName, instituteNameBn, instituteType, instituteTypeId, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/institute-name')
      dispatch(AfterUpdatedFalse())
    }
    setInstituteName(location?.state?.data?.instituteName)
    setInstituteNameBn(location?.state?.data?.instituteNameBn)
    setInstituteType(location?.state?.data?.instituteTypeInfo?.instituteType)
    setInstituteTypeId(location?.state?.data?.instituteTypeInfo?._id)
  }, [afterUpdated, id])

  useEffect(() => {
    dispatch(GetInstituteTypeList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h4 className="mb-3">Update Institute Name</h4>
          <div>
            <h6 >Select Institute Type</h6>
            <Select
              options={GlobalOptions(instituteTypeArrList, "instituteType", "_id")}
              value={{ label: instituteType }}
              onChange={(e) => {
                setInstituteType(e.label);
                setInstituteTypeId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Institute name</h6>
            <input
              className="form-control"
              value={instituteName}
              placeholder="enter institute name"
              onChange={(e) => setInstituteName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Institute name bangla</h6>
            <input
              className="form-control"
              value={instituteNameBn}
              placeholder="enter institute name bangla"
              onChange={(e) => setInstituteNameBn(e.target.value)}
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

export default UpdateInstituteName;
