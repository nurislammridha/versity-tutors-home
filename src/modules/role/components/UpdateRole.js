import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AfterUpdatedFalse, RoleUpdate } from "../_redux/RoleAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UpdateRole = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [role, setRole] = useState("");
  const [roleBn, setRoleBn] = useState("");
  const isUpdate = useSelector((state) => state.roleInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.roleInfo.afterUpdated);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(RoleUpdate(role, roleBn, id));
  };
  useEffect(() => {
    if (afterUpdated) {
      history.push('/role')
      dispatch(AfterUpdatedFalse())
    }
    setRole(location?.state?.role?.roleName)
    setRoleBn(location?.state?.role?.roleNameBn)
  }, [afterUpdated, id])
  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="mb-3">Update Role</h3>
          <div>
            <h6 className="mb-3">Role name</h6>
            <input
              className="form-control"
              value={role}
              placeholder="enter role name"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Role name bangla</h6>
            <input
              className="form-control"
              value={roleBn}
              placeholder="enter role name bangla"
              onChange={(e) => setRoleBn(e.target.value)}
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

export default UpdateRole;
