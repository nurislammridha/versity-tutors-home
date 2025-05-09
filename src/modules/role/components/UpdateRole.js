import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { GlobalOptions, roleTypeOption, servicesListArr } from "src/services/GlobalFunction";
import { AfterCreatedFalse, AfterUpdatedFalse, AllRolesByRoleType, RoleUpdate, SubmitRole } from "../_redux/RoleAction";
import { useHistory, useLocation, useParams } from "react-router-dom";
const permissions = ['View', 'Create', 'Edit', 'Delete'];

const UpdateRole = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [servicesList, setServicesList] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleType, setRoleType] = useState("");
  const [managerId, setManagerId] = useState(null);
  const [managerName, setManagerName] = useState("");
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState({});
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.roleInfo.isUpdate);
  const afterUpdated = useSelector((state) => state.roleInfo.afterUpdated);

  const roleListType = useSelector(
    (state) => state.roleInfo.roleListType
  );

  const handleSubmit = () => {
    const postData = {
      name, email, phone, roleType, assignServices: selectedServices
    }
    if (managerId) {
      postData.managerId = managerId;
      postData.managerInfo = managerId;
    }
    dispatch(RoleUpdate(postData, id))

  };

  const handleServiceMasterToggle = (serviceId) => {
    const allChecked = isServiceAllChecked(serviceId);
    const updatedPermissions = {};
    permissions.forEach((perm) => {
      updatedPermissions[perm] = !allChecked;
    });

    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: updatedPermissions,
    }));
  };

  const handleServiceToggle = (serviceId, permission) => {
    setSelectedServices((prev) => {
      const updated = { ...prev };

      const currentPermissions = updated[serviceId]
        ? { ...updated[serviceId] }
        : {};

      currentPermissions[permission] = !currentPermissions[permission];
      updated[serviceId] = currentPermissions;

      return updated;
    });
  };




  // Select all services and all permissions
  const handleSelectAllServices = () => {
    const allSelected = servicesList.every((service) =>
      permissions.every((perm) => selectedServices[service.id]?.[perm])
    );

    const updated = {};
    servicesList.forEach((service) => {
      updated[service.id] = {};
      permissions.forEach((perm) => {
        updated[service.id][perm] = !allSelected;
      });
    });
    setSelectedServices(updated);
  };
  const isServiceAllChecked = (serviceId) => {
    const perms = selectedServices[serviceId];
    return perms && permissions.every((perm) => perms[perm]);
  };

  useEffect(() => {
    if (afterUpdated) {
      setName("")
      setRoleType("")
      setManagerId(null)
      setManagerName("")
      setEmail("")
      setPhone("")
      setSelectedServices(servicesListArr())
      history.push('/role')
      dispatch(AfterUpdatedFalse())
    }
    setName(location?.state?.data?.name)
    setEmail(location?.state?.data?.email)
    setPhone(location?.state?.data?.phone)
    setRoleType(location?.state?.data?.roleType)
    setManagerId(location?.state?.data?.managerInfo?._id)
    setManagerName(location?.state?.data?.managerInfo?.name)
    setSelectedServices(location?.state?.data?.assignServices)
  }, [afterUpdated, id])
  useEffect(() => {
    roleType === "Moderator" && dispatch(AllRolesByRoleType("Manager"))
  }, [roleType])
  useEffect(() => {
    setServicesList(servicesListArr())
  }, [])
  console.log('location?.state?.data', location?.state?.data)
  console.log('selectedServices', selectedServices)
  return (
    <>
      <div className=" mt-0">
        <div className="card p-4 shadow-sm rounded-4">
          <h4 className="mb-4">Update New Role</h4>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              className="form-control"
              value={name}
              placeholder="Enter role name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role Type</label>
            <Select
              options={roleTypeOption()}
              value={roleType ? { label: roleType } : null}
              onChange={(e) => setRoleType(e.label)}
            />
          </div>
          {roleType === "Moderator" &&
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Manager</label>
              <Select
                options={GlobalOptions(roleListType, "name", "_id")}
                value={managerName ? { label: managerName } : null}
                onChange={(e) => {
                  setManagerName(e.label)
                  setManagerId(e.value)
                }}
              />
            </div>
          }


          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              className="form-control"
              value={email}
              placeholder="Enter person email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              className="form-control"
              value={phone}
              placeholder="Enter phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <h5>Assign Services & Permissions</h5>
            <div className="table-responsive">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="selectAllServices"
                  checked={
                    servicesList.every((service) => isServiceAllChecked(service.id))
                  }
                  onChange={() => handleSelectAllServices()}
                />
                <label className="form-check-label ms-2" htmlFor="selectAllServices">
                  Select All Services
                </label>
              </div>
              <table className="table table-bordered mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Service</th>
                    {permissions.map((perm) => (
                      <th key={perm} className="text-center">{perm}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {servicesList.map((service) => {
                    const allChecked = isServiceAllChecked(service.id);
                    return (
                      <tr key={service.id}>
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              id={`master-${service.id}`}
                              checked={allChecked}
                              onChange={() => handleServiceMasterToggle(service.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`master-${service.id}`}
                            >
                              {service.name}
                            </label>
                          </div>
                        </td>
                        {permissions.map((perm) => (
                          <td key={perm} className="text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={selectedServices[service.id]?.[perm] || false}
                              onChange={() => handleServiceToggle(service.id, perm)}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>

          <div className="mt-4 text-end">
            {isUpdate ? (
              <button className="btn btn-success btn-sm text-light" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Saving...
              </button>
            ) : (
              <button
                className="btn btn-success btn-sm text-light"
                onClick={() => !isUpdate && handleSubmit()}
              >
                UPDATE
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default UpdateRole;
