import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitCampaign } from "../_redux/CampaignAction";
import { Form, FormControl } from "react-bootstrap";
const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignStartTime, setCampaignStartTime] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [campaignEndTime, setCampaignEndTime] = useState("");
  const [campaignEndDate, setCampaignEndDate] = useState("");
  const [isShowHomePage, setShowHomePage] = useState(false);
  const isBrand = useSelector((state) => state.brandInfo.isBrand);
  const afterCreated = useSelector((state) => state.brandInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitCampaign({ campaignName, campaignStartTime, campaignStartDate, campaignEndTime, campaignEndDate, campaignProducts: [], soldProducts: [], isShowHomePage }));
  };
  useEffect(() => {
    if (afterCreated) {
      setCampaignName("")
      setCampaignStartTime("")
      setCampaignStartDate("")
      setCampaignEndTime("")
      setCampaignEndDate("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Campaign Name</h6>
            <input
              className="form-control"
              value={campaignName}
              type='text'
              placeholder="enter campaign name"
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Start Time (24 hours format)</h6>
            <input
              className="form-control"
              value={campaignStartTime}
              type='text'
              placeholder="Ex: 20:10"
              onChange={(e) => setCampaignStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Start Date (Date/Month/Year)</h6>
            <input
              className="form-control"
              value={campaignStartDate}
              type='text'
              placeholder="Ex: 23/02/2024"
              onChange={(e) => setCampaignStartDate(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">End Time (24 hours format)</h6>
            <input
              className="form-control"
              value={campaignEndTime}
              type='text'
              placeholder="Ex: 20:10"
              onChange={(e) => setCampaignEndTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">End Date (Date/Month/Year)</h6>
            <input
              className="form-control"
              value={campaignEndDate}
              type='text'
              placeholder="Ex: 23/02/2024"
              onChange={(e) => setCampaignEndDate(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <div class="form-group">
              <label htmlFor="discount" className="mr-2">Show Home In Page</label>
              <Form.Check
                inline
                label="Yes"
                name="isShowHomePage"
                type="radio"
                checked={isShowHomePage === true}
                onChange={(e) => setShowHomePage(true)}
              />
              <Form.Check
                inline
                label="No"
                name="isShowHomePage"
                type="radio"
                checked={isShowHomePage === false}
                onChange={(e) => setShowHomePage(false)}
              />
            </div>
          </div>
          {isBrand ? (
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

export default CreateCampaign;
