import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitInstituteName, UploadSubCatImg } from "../_redux/InstituteNameAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
import { GetInstituteTypeList } from "src/modules/instituteType/_redux/InstituteTypeAction";
const CreateInstituteName = () => {
  const [instituteName, setInstituteName] = useState("");
  const [instituteNameBn, setInstituteNameBn] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [instituteTypeId, setInstituteTypeId] = useState("");
  const isInstituteName = useSelector((state) => state.instituteNameInfo.isInstituteName);
  const afterCreated = useSelector((state) => state.instituteNameInfo.afterCreated);
  const instituteTypeArrList = useSelector(
    (state) => state.instituteTypeInfo.instituteTypeList?.result
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitInstituteName(instituteName, instituteNameBn, instituteType, instituteTypeId));
  };

  useEffect(() => {
    if (afterCreated) {
      setInstituteName("")
      setInstituteNameBn("")
      setInstituteType("")
      setInstituteTypeId("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])

  useEffect(() => {
    dispatch(GetInstituteTypeList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6>Select Institute Type</h6>
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
              placeholder="ente institute name bangla"
              onChange={(e) => setInstituteNameBn(e.target.value)}
            />
          </div>
          {/* //Image Upload */}


          {isInstituteName ? (
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

export default CreateInstituteName;
