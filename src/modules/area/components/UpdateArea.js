import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, AreaUpdate } from "../_redux/AreaAction";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalOptions } from "src/services/GlobalFunction";
import { DistrictByDivisionId } from "src/modules/district/_redux/DistrictAction";
import { SubDistrictByDistrictId } from "src/modules/subDistrict/_redux/SubDistrictAction";
const UpdateArea = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [area, setArea] = useState("");
  const [areaBn, setAreaBn] = useState("");
  const [division, setDivision] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const isUpdate = useSelector((state) => state.areaInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.areaInfo.afterUpdated);
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList
  );
  const districtArrList = useSelector(
    (state) => state.districtInfo.districtList
  );
  const subDistrictArrList = useSelector(
    (state) => state.subDistrictInfo.subDistrictList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(AreaUpdate(area, areaBn, subDistrict, subDistrictId, district, districtId, division, divisionId, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/area')
      dispatch(AfterUpdatedFalse())
    }
    setArea(location?.state?.data?.areaName)
    setAreaBn(location?.state?.data?.areaNameBn)
    setSubDistrict(location?.state?.data?.subDistrictInfo?.subDistrictName)
    setSubDistrictId(location?.state?.data?.subDistrictInfo?._id)
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
  useEffect(() => {
    districtId.length > 0 && dispatch(SubDistrictByDistrictId(districtId));
  }, [districtId]);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h4 className="mb-3">Update Area</h4>
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
                setSubDistrict("");
                setSubDistrictId("");
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
                setSubDistrict("");
                setSubDistrictId("");
              }}
            />
          </div>
          <div className="mt-3">
            <h6>Select Sub District</h6>
            <Select
              options={GlobalOptions(subDistrictArrList, "subDistrictName", "_id")}
              value={{ label: subDistrict }}
              onChange={(e) => {
                setSubDistrict(e.label);
                setSubDistrictId(e.value);
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Area Name</h6>
            <input
              className="form-control"
              value={area}
              placeholder="enter area name"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Area Name Bangla</h6>
            <input
              className="form-control"
              value={areaBn}
              placeholder="enter area name bangla"
              onChange={(e) => setAreaBn(e.target.value)}
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

export default UpdateArea;
