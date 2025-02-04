import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitDistrict, UploadSubCatImg } from "../_redux/DistrictAction";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
const CreateDistrict = () => {
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const isDistrict = useSelector((state) => state.districtInfo.isDistrict);
  const afterCreated = useSelector((state) => state.divisionInfo.afterCreated);
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitDistrict(district, division, divisionId));
  };

  useEffect(() => {
    if (afterCreated) {
      setDistrict("")
      setDivision("")
      setDivisionId("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  useEffect(() => {
    dispatch(GetDivisionList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6>Select Division</h6>
            <Select
              options={GlobalOptions(divisionArrList, "divisionName", "_id")}
              value={{ label: division }}
              onChange={(e) => {
                setDivision(e.label);
                setDivisionId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">District Name</h6>
            <input
              className="form-control"
              value={district}
              placeholder="enter district name"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          {isDistrict ? (
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

export default CreateDistrict;
