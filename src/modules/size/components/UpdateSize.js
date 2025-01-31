import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, SizeUpdate, SubmitSize } from "../_redux/SizeAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateSize = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [size, setSize] = useState("");
  const isUpdate = useSelector((state) => state.sizeInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.sizeInfo.afterUpdated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SizeUpdate(size, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/size')
      dispatch(AfterUpdatedFalse())
    }
    setSize(location?.state?.size)
  }, [afterUpdated, id])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="pb-3">Update Size</h3>
          <div>
            <h6 className="mb-3">Size Name</h6>
            <input
              className="form-control"
              value={size}
              placeholder="enter size name"
              onChange={(e) => setSize(e.target.value)}
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

export default UpdateSize;
