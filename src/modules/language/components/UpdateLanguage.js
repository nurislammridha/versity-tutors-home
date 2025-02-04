import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, LanguageUpdate } from "../_redux/LanguageAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateLanguage = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [language, setLanguage] = useState("");
  const isUpdate = useSelector((state) => state.languageInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.languageInfo.afterUpdated);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(LanguageUpdate(language, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/language')
      dispatch(AfterUpdatedFalse())
    }
    setLanguage(location?.state?.language?.languageName)
  }, [afterUpdated, id])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Language</h3>
          <div>
            <h6 className="mb-3">Language Name</h6>
            <input
              className="form-control"
              value={language}
              placeholder="enter language name"
              onChange={(e) => setLanguage(e.target.value)}
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

export default UpdateLanguage;
