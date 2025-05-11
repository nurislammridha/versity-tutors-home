import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { GetRoleDetails } from '../_redux/RoleAction';
import moment from 'moment';
const RoleDetails = () => {
    const d = new Date()
    const { id } = useParams()
    const dispatch = useDispatch()
    const isRoleDetails = useSelector(
        (state) => state.roleInfo.isRoleDetails
    );
    const roleDetails = useSelector(
        (state) => state.roleInfo.roleDetails
    );
    const { assignServices, createdAt, email, isActive, managerInfo, whatsapp, name, gender, address, phone, roleType, updatedAt, avatar } = roleDetails || {}
    const { area, class: cl, district, division, manualTutorRequest, package: pk, studentManagement, subDistrict, subject, tutorManagement } = assignServices || {}
    useEffect(() => {
        dispatch(GetRoleDetails(id))
    }, [id])
    console.log('roleDetails', roleDetails)
    return (
        <>
            <div className="container profile-card bg-light p-4">
                <div className="text-center">
                    <img src={avatar ? avatar?.url : "https://picsum.photos/seed/picsum/200/300"} alt="Avatar" className="profile-avatar" id="avatarImage" />
                    <h3 id="name">{name}</h3>
                    <p className="text-muted" id="roleType">Role: {roleType}</p>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <p><span className="info-label">Email:</span> <span id="email">{email}</span></p>
                        <p><span className="info-label">Phone:</span> <span id="phone">{phone}</span></p>
                        <p><span className="info-label">WhatsApp:</span> <span id="whatsapp">{whatsapp}</span></p>
                        <p><span className="info-label">Gender:</span> <span id="gender">{gender}</span></p>
                    </div>
                    <div className="col-md-6">
                        <p><span className="info-label">Address:</span> <span id="address">{address}</span></p>
                        <p><span className="info-label">Account Active:</span> <span id="isActive">{isActive ? "Yes" : "No"}</span></p>
                        <p><span className="info-label">Created At:</span> <span id="createdAt">{moment(createdAt).format('DD-MM-YYYY')}</span></p>
                        <p><span className="info-label">Updated At:</span> <span id="updatedAt">{moment(updatedAt).format('DD-MM-YYYY')}</span></p>
                    </div>
                </div>

                {/* <!-- Show Manager Info if roleType is Moderator --> */}
                {roleType === "Moderator" &&
                    <div className="manager-section mt-5" id="managerInfoSection">
                        <div className="section-header">Manager Info</div>
                        <div className="row">
                            <div className="col-md-6">
                                <p><span className="info-label">Name:</span> <span id="managerName">{managerInfo?.name}</span></p>
                                <p><span className="info-label">Email:</span> <span id="managerEmail">{managerInfo?.email}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="info-label">Phone:</span> <span id="managerPhone">{managerInfo?.phone}</span></p>
                            </div>
                        </div>
                    </div>
                }


                {/* <!-- Permissions --> */}
                <div className="permission-section mt-5">
                    <div className="section-header">Assigned Services & Permissions</div>
                    <div className="table-responsive">
                        <table className="table table-bordered permission-table">
                            <thead className="table-light">
                                <tr>
                                    <th>Service</th>
                                    <th>View</th>
                                    <th>Create</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody id="permissionsTable">
                                {/* <!-- Rows will be populated dynamically in React --> */}
                                <tr>
                                    <td>Class</td>
                                    <td>{cl?.Create ? "✔️" : "❌"}</td>
                                    <td>{cl?.View ? "✔️" : "❌"}</td>
                                    <td>{cl?.Edit ? "✔️" : "❌"}</td>
                                    <td>{cl?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Subject</td>
                                    <td>{subject?.Create ? "✔️" : "❌"}</td>
                                    <td>{subject?.View ? "✔️" : "❌"}</td>
                                    <td>{subject?.Edit ? "✔️" : "❌"}</td>
                                    <td>{subject?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Division</td>
                                    <td>{division?.Create ? "✔️" : "❌"}</td>
                                    <td>{division?.View ? "✔️" : "❌"}</td>
                                    <td>{division?.Edit ? "✔️" : "❌"}</td>
                                    <td>{division?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>District</td>
                                    <td>{district?.Create ? "✔️" : "❌"}</td>
                                    <td>{district?.View ? "✔️" : "❌"}</td>
                                    <td>{district?.Edit ? "✔️" : "❌"}</td>
                                    <td>{district?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Sub District</td>
                                    <td>{subDistrict?.Create ? "✔️" : "❌"}</td>
                                    <td>{subDistrict?.View ? "✔️" : "❌"}</td>
                                    <td>{subDistrict?.Edit ? "✔️" : "❌"}</td>
                                    <td>{subDistrict?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Area</td>
                                    <td>{area?.Create ? "✔️" : "❌"}</td>
                                    <td>{area?.View ? "✔️" : "❌"}</td>
                                    <td>{area?.Edit ? "✔️" : "❌"}</td>
                                    <td>{area?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Manual Tutor Request</td>
                                    <td>{manualTutorRequest?.Create ? "✔️" : "❌"}</td>
                                    <td>{manualTutorRequest?.View ? "✔️" : "❌"}</td>
                                    <td>{manualTutorRequest?.Edit ? "✔️" : "❌"}</td>
                                    <td>{manualTutorRequest?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Package</td>
                                    <td>{pk?.Create ? "✔️" : "❌"}</td>
                                    <td>{pk?.View ? "✔️" : "❌"}</td>
                                    <td>{pk?.Edit ? "✔️" : "❌"}</td>
                                    <td>{pk?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Student Management</td>
                                    <td>{studentManagement?.Create ? "✔️" : "❌"}</td>
                                    <td>{studentManagement?.View ? "✔️" : "❌"}</td>
                                    <td>{studentManagement?.Edit ? "✔️" : "❌"}</td>
                                    <td>{studentManagement?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                <tr>
                                    <td>Tutor Management</td>
                                    <td>{tutorManagement?.Create ? "✔️" : "❌"}</td>
                                    <td>{tutorManagement?.View ? "✔️" : "❌"}</td>
                                    <td>{tutorManagement?.Edit ? "✔️" : "❌"}</td>
                                    <td>{tutorManagement?.Delete ? "✔️" : "❌"}</td>
                                </tr>
                                {/* <!-- Add more rows dynamically --> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleDetails


