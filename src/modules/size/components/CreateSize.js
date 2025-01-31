import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitSize } from "../_redux/SizeAction";

const CreateSize = () => {
  const [size, setSize] = useState("");
  const isSize = useSelector((state) => state.sizeInfo.isSize);
  const afterCreated = useSelector((state) => state.sizeInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitSize(size));
  };
  useEffect(() => {
    if (afterCreated) {
      setSize("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Size Name</h6>
            <input
              className="form-control"
              value={size}
              placeholder="enter size name"
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          {isSize ? (
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

export default CreateSize;
