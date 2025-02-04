import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitSubDistrict } from "../_redux/SubDistrictAction";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import Select from "react-select";
import { GlobalOptions } from "src/services/GlobalFunction";
import { DistrictByDivisionId } from "src/modules/district/_redux/DistrictAction";
const CreateSubDistrict = () => {
  const [subDistrict, setSubDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const isSubDistrict = useSelector((state) => state.subDistrictInfo.isSubDistrict);
  const afterCreated = useSelector((state) => state.subDistrictInfo.afterCreated);
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList
  );
  const districtArrList = useSelector(
    (state) => state.districtInfo.districtList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitSubDistrict(subDistrict, district, districtId, division, divisionId));
  };

  useEffect(() => {
    if (afterCreated) {
      setSubDistrict("")
      setDistrict("")
      setDistrictId("")
      setDivision("")
      setDivisionId("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  useEffect(() => {
    dispatch(GetDivisionList());
  }, []);
  useEffect(() => {
    divisionId.length > 0 && dispatch(DistrictByDivisionId(divisionId));
  }, [divisionId]);
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
                setDistrict("");
                setDistrictId("");
              }}
            />
          </div>
          <div className="mt-3">
            <h6>Select District</h6>
            <Select
              options={GlobalOptions(districtArrList, "districtName", "_id")}
              value={{ label: district }}
              onChange={(e) => {
                setDistrict(e.label);
                setDistrictId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Sub District Name</h6>
            <input
              className="form-control"
              value={subDistrict}
              placeholder="enter sub district name"
              onChange={(e) => setSubDistrict(e.target.value)}
            />
          </div>
          {isSubDistrict ? (
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

export default CreateSubDistrict;
