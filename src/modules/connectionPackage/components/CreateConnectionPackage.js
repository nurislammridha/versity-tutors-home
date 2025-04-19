import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterCreatedFalse, SubmitConnectionPackage, UploadCatImg, UploadCatLogo } from "../_redux/ConnectionPackageAction";
const CreateConnectionPackage = () => {
  const [name, setName] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [connections, setConnections] = useState(0);
  const [connectionsBn, setConnectionsBn] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceBn, setPriceBn] = useState(0);
  const isConnectionPackage = useSelector((state) => state.connectionPackageInfo.isConnectionPackage);
  const afterCreated = useSelector((state) => state.connectionPackageInfo.afterCreated);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitConnectionPackage(name, nameBn, connections, connectionsBn, price, priceBn));
  };
  useEffect(() => {
    if (afterCreated) {
      setName("")
      setNameBn("")
      setConnections(0)
      setConnectionsBn("")
      setPrice(0)
      setPriceBn("")
      dispatch(AfterCreatedFalse())
    }
  }, [afterCreated])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Package Name</h6>
            <input
              className="form-control"
              value={name}
              placeholder="enter package name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Package Name Bangla</h6>
            <input
              className="form-control"
              value={nameBn}
              placeholder="enter package name bangla"
              onChange={(e) => setNameBn(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Connections Number</h6>
            <input
              className="form-control"
              type="number"
              value={connections}
              placeholder="enter connections number"
              onChange={(e) => setConnections(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <h6 className="mb-3">Connections Price</h6>
            <input
              className="form-control"
              type="number"
              value={price}
              placeholder="enter connections price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>


          {isConnectionPackage ? (
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

export default CreateConnectionPackage;
