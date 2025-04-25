import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, SubDistrictUpdate } from "../_redux/SubDistrictAction";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalOptions } from "src/services/GlobalFunction";
import { DistrictByDivisionId } from "src/modules/district/_redux/DistrictAction";
const UpdateSubDistrict = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [subDistrict, setSubDistrict] = useState("");
  const [subDistrictBn, setSubDistrictBn] = useState("");
  const [division, setDivision] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const isUpdate = useSelector((state) => state.subDistrictInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.subDistrictInfo.afterUpdated);
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList?.result
  );
  const districtArrList = useSelector(
    (state) => state.districtInfo.districtList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubDistrictUpdate(subDistrict, subDistrictBn, district, districtId, division, divisionId, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/sub-district')
      dispatch(AfterUpdatedFalse())
    }
    setSubDistrict(location?.state?.data?.subDistrictName)
    setSubDistrictBn(location?.state?.data?.subDistrictNameBn)
    setDistrict(location?.state?.data?.districtInfo?.districtName)
    setDistrictId(location?.state?.data?.districtInfo?._id)
    setDivision(location?.state?.data?.divisionInfo?.divisionName)
    setDivisionId(location?.state?.data?.divisionInfo?._id)
  }, [afterUpdated, id])

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
          <h4 className="mb-3">Update Sub District</h4>
          <div>
            <h6 >Select Division</h6>
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
            <h6 className="mb-3">SubDistrict Name</h6>
            <input
              className="form-control"
              value={subDistrict}
              placeholder="enter subdistrict name"
              onChange={(e) => setSubDistrict(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Sub District Name Bangla</h6>
            <input
              className="form-control"
              value={subDistrictBn}
              placeholder="enter subdistrict name bangla"
              onChange={(e) => setSubDistrictBn(e.target.value)}
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

export default UpdateSubDistrict;
