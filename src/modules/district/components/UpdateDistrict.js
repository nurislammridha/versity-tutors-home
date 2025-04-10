import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, DistrictUpdate } from "../_redux/DistrictAction";
import { GetDivisionList } from "src/modules/division/_redux/DivisionAction";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalOptions } from "src/services/GlobalFunction";
const UpdateDistrict = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [district, setDistrict] = useState("");
  const [districtBn, setDistrictBn] = useState("");
  const [division, setDivision] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const isUpdate = useSelector((state) => state.districtInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.divisionInfo.afterUpdated);
  const divisionArrList = useSelector(
    (state) => state.divisionInfo.divisionList
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(DistrictUpdate(district, districtBn, division, divisionId, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/district')
      dispatch(AfterUpdatedFalse())
    }
    setDistrict(location?.state?.data?.districtName)
    setDistrictBn(location?.state?.data?.districtNameBn)
    setDivision(location?.state?.data?.divisionInfo?.divisionName)
    setDivisionId(location?.state?.data?.divisionInfo?._id)
  }, [afterUpdated, id])

  useEffect(() => {
    dispatch(GetDivisionList());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h4 className="mb-3">Update District</h4>
          <div>
            <h6 >Select Division</h6>
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
          <div className="mt-3">
            <h6 className="mb-3">District Name Bangla</h6>
            <input
              className="form-control"
              value={districtBn}
              placeholder="enter district name"
              onChange={(e) => setDistrictBn(e.target.value)}
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

export default UpdateDistrict;
