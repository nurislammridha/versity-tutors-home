import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GetModerationTutorDetails } from '../_redux/MonitoringAction';
import { getTimeDifference } from 'src/services/GlobalFunction';
import moment from 'moment';
import { ModerationHistoryUpdate } from 'src/modules/tutorManagement/_redux/TutorManagementAction';
const ViewModeratorMonitoring = () => {
    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [taskRejectedNotes, setTaskRejectedNote] = useState("")
    const isModeratorTutorDetails = useSelector(
        (state) => state.monitoringInfo.isModeratorTutorDetails
    );
    const moderatorTutorDetails = useSelector(
        (state) => state.monitoringInfo.moderatorTutorDetails
    );

    const { clientInfo, roleInfo, comment, endingTime, isCheckedByManager, isTaskComplete, isTaskRejected, lastStatus, startingTime, statusHistory, taskRejectedBy, taskRejectedNote, } = moderatorTutorDetails || {}
    const { firstName, lastName, email, phone, _id: clientId } = clientInfo || {}
    const { name, gender, email: roleEmail, phone: rolePhone, roleType, address } = roleInfo || {}
    const handleReview = () => {
        let postData = { reviewStatus: lastStatus, comment: taskRejectedNotes, reviewByManager: true }
        dispatch(ModerationHistoryUpdate(postData, clientInfo, roleInfo))
    }
    const handleRejection = () => {
        let postData = { reviewStatus: "requestInitiated", assignedModerator: roleInfo?._id, comment, taskRejection: true, rejectionByManager: true }
        dispatch(ModerationHistoryUpdate(postData, clientInfo, roleInfo))
    }

    useEffect(() => {
        dispatch(GetModerationTutorDetails(id))
    }, [id])
    useEffect(() => {
        setTaskRejectedNote(taskRejectedNote)
    }, [taskRejectedNote])

    console.log('moderatorTutorDetails', moderatorTutorDetails)
    return (
        <>
            <div className="container py-1">

                <h2 className="mb-4">Moderation Task Overview</h2>
                <div className="section-card">
                    <h5>Client Information</h5>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <p><strong>Name:</strong> {firstName + " " + lastName}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Phone:</strong> {phone}</p>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary btn-sm-custom" onClick={() => history.push(`/profile/${clientId}`)}>View Full Details</button>
                        </div>
                    </div>
                </div>
                <div className="section-card">
                    <h5>Moderator (Role) Information</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Name:</strong>{name}</p>
                            <p><strong>Gender:</strong> {gender}</p>
                            <p><strong>Email:</strong> {roleEmail}</p>
                            <p><strong>Phone:</strong> {rolePhone}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Role Type:</strong> {roleType}</p>
                            {/* <p><strong>Manager ID:</strong> MNG123456</p> */}
                            <p><strong>Address:</strong> {address}</p>
                            <p><strong>Is Registered:</strong> Yes</p>
                        </div>
                    </div>
                </div>
                <div className="section-card">
                    <h5>Moderation Task Information</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Start Time:</strong> {moment(startingTime).format('DD MMMM YYYY')}</p>
                            <p><strong>End Time:</strong>{moment(endingTime).format('DD MMMM YYYY')}</p>
                            <p><strong>Time Duration?:</strong>{getTimeDifference(startingTime, endingTime)}</p>
                            <p><strong>Task Completed/Handover?:</strong> <span className="badge bg-danger">{isTaskComplete ? "YES" : "NO"}</span></p>
                            <p><strong>Rejected?:</strong> <span className="badge bg-success">{isTaskRejected ? "YES" : "NO"}</span></p>
                            <p><strong>Manager checked?:</strong> <span className="badge bg-success">{isCheckedByManager ? "YES" : "NO"}</span></p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Last Status:</strong> <span className="badge bg-warning text-dark">{lastStatus}</span></p>
                            <p><strong>Rejected By:</strong>{taskRejectedBy}</p>
                            <p><strong>Comment:</strong> {comment}</p>
                            <p><strong>Rejection Note:</strong>{taskRejectedNote}</p>
                        </div>
                    </div>
                </div>
                <div className="section-card">
                    <h5>Status History</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>Status</th>
                                    <th>Status Time</th>
                                    <th>Comment</th>

                                </tr>
                            </thead>
                            <tbody>
                                {statusHistory?.map((item, index) => (
                                    <tr key={index}>
                                        <td><span className="badge bg-warning text-dark badge-status">{item?.status}</span></td>
                                        <td>{moment(item?.statusTime).format('DD MMMM YYYY')}</td>
                                        <td>{item?.comment}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                {!(isCheckedByManager || isTaskRejected) &&
                    <div className="section-card">
                        <h5>Manager Moderation Action</h5>
                        <div className="form-check form-switch">
                        </div>
                        <div className="mb-3">
                            <label for="rejectionComment" className="form-label">Notes for review or rejection</label>
                            <textarea
                                className="form-control"
                                id="rejectionComment"
                                rows="2"
                                placeholder="Enter notes for review or rejection"
                                disabled={isTaskRejected && isCheckedByManager}
                                value={taskRejectedNotes}
                                onChange={(e) => setTaskRejectedNote(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="d-flex gap-2">
                            {!isCheckedByManager && <button className="btn btn-success" onClick={() => handleReview()}>Save Review</button>}
                            {!isTaskRejected && <button className="btn btn-danger" onClick={() => handleRejection()}>Reject Task</button>}
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default ViewModeratorMonitoring