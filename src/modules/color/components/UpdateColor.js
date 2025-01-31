import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, ColorUpdate, SubmitColor } from "../_redux/ColorAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateColor = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [colorName, setColorName] = useState("");
  const [colorHexCode, setColorHexCode] = useState("");
  const isUpdate = useSelector((state) => state.colorInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.colorInfo.afterUpdated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(ColorUpdate(colorName, colorHexCode, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/color')
      dispatch(AfterUpdatedFalse())
    }
    setColorName(location?.state?.color)
  }, [afterUpdated, id])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Color</h3>
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

export default UpdateColor;
