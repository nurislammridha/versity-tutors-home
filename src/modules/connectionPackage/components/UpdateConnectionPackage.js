import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, ConnectionPackageUpdate } from "../_redux/ConnectionPackageAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateConnectionPackage = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [name, setName] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [connections, setConnections] = useState(0);
  const [connectionsBn, setConnectionsBn] = useState("");
  const [price, setPrice] = useState(0);
  const [priceBn, setPriceBn] = useState("");
  const isUpdate = useSelector((state) => state.connectionPackageInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.connectionPackageInfo.afterUpdated);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(ConnectionPackageUpdate(name, nameBn, connections, connectionsBn, price, priceBn, id));
  };

  useEffect(() => {
    if (afterUpdated) {
      history.push('/connection-package')
      dispatch(AfterUpdatedFalse())
    }
    setName(location?.state?.connectionPackage?.name)
    setNameBn(location?.state?.connectionPackage?.nameBn)
    setConnections(location?.state?.connectionPackage?.connections)
    setConnectionsBn(location?.state?.connectionPackage?.connectionsBn)
    setPrice(location?.state?.connectionPackage?.price)
    setPriceBn(location?.state?.connectionPackage?.priceBn)
  }, [afterUpdated, id])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Connection Package</h3>
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
              placeholder="enter connections number"
              onChange={(e) => setPrice(e.target.value)}
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

export default UpdateConnectionPackage;
