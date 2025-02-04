import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitLanguage } from "../_redux/LanguageAction";
const CreateLanguage = () => {
  const [language, setLanguage] = useState("");
  const isLanguage = useSelector((state) => state.languageInfo.isLanguage);
  const afterCreated = useSelector((state) => state.languageInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitLanguage(language));
  };
  useEffect(() => {
    if (afterCreated) {
      setLanguage("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Language Name</h6>
            <input
              className="form-control"
              value={language}
              placeholder="enter language name"
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          {isLanguage ? (
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

export default CreateLanguage;
