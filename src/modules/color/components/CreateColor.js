import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitColor } from "../_redux/ColorAction";

const CreateColor = () => {
  const [colorName, setColorName] = useState("");
  const [colorHexCode, setColorHexCode] = useState("");
  const isColor = useSelector((state) => state.colorInfo.isColor);
  const afterCreated = useSelector((state) => state.colorInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitColor(colorName, colorHexCode));
  };
  useEffect(() => {
    if (afterCreated) {
      setColorName("")
      setColorHexCode("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Color Name</h6>
            <input
              className="form-control"
              value={colorName}
              placeholder="enter color name"
              onChange={(e) => setColorName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Color Hexa Code</h6>
            <input
              className="form-control"
              value={colorHexCode}
              placeholder="enter color hex code"
              onChange={(e) => setColorHexCode(e.target.value)}
            />
          </div>

          {isColor ? (
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

export default CreateColor;
