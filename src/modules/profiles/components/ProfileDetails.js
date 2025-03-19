import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProfileDetails } from '../_redux/ProfileAction';
import Documents from './Documents';
const ProfileDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const isProfileDetailsLoading = useSelector((state) => state.profileInfo.isProfileDetailsLoading);
    const profileDetails = useSelector((state) => state.profileInfo.profileDetails);
    const {
        avatar,
        firstName,
        lastName,
        tagline,
        email,
        phone,
        skype,
        whatsapp,
        website,
        tutorBriefIntroduction,
        education,
        subject,
        address,
        areaInfo,
        subDistrictInfo,
        districtInfo,
        divisionInfo,
        zipCode,
        gender,
        hourlyFee,
        isTeachingLocationOnline,
        isTeachingLocationOffline,
        isTeachingLocationTutorHome,
        isTeachingLocationStudentHome,
        isApproved,
        isFeatured,
        isBooked,
        isTutorAccount
    } = profileDetails || {};

    const fullName = `${firstName} ${lastName}`;
    useEffect(() => {
        dispatch(GetProfileDetails(id))
    }, [id])
    // console.log('profileDetails', profileDetails)
    return (
        <>
            <div className="container my-4">
                <div className="card shadow-lg p-4">
                    {/* Profile Header */}
                    <div className="d-flex align-items-center mb-4">
                        <img src={avatar?.url} alt="Avatar" className="rounded-circle me-4 profile-img" />
                        <div>
                            <h3>{fullName}({isTutorAccount ? "Tutor" : "Student"})</h3>
                            <p className="text-muted">{tagline}</p>
                            <p>Email: {email}</p>
                            <p>Phone: {phone}</p>
                            <p>Skype: {skype} | WhatsApp: {whatsapp}</p>
                            <p>Website: <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a></p>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="mb-4">
                        <h5>Introduction</h5>
                        <p>{tutorBriefIntroduction}</p>
                    </div>

                    {/* Teaching Locations */}
                    <div className="mb-4">
                        <h5>Teaching Locations</h5>
                        {isTeachingLocationOnline && <span className="badge bg-primary me-2">Online</span>}
                        {isTeachingLocationOffline && <span className="badge bg-secondary me-2">Offline</span>}
                        {isTeachingLocationTutorHome && <span className="badge bg-success me-2">Tutor's Home</span>}
                        {isTeachingLocationStudentHome && <span className="badge bg-warning text-dark me-2">Student's Home</span>}
                    </div>

                    {/* Subjects */}
                    <div className="mb-4">
                        <h5>Subjects</h5>
                        {subject && subject.map((subj) => (
                            <div key={subj._id}>
                                <strong>{subj.categoryInfo.categoryName}</strong>
                                <div>
                                    {subj?.subCategories?.map((sub) => (
                                        <span key={sub._id} className="badge bg-info text-dark me-2 mt-1">
                                            {sub.subCategoryInfo.subCategoryName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                        <h5>Education</h5>
                        {education && education.map((edu) => (
                            <div key={edu._id} className="mb-2">
                                <strong>{edu.degree}</strong> - {edu.institute} ({edu.startDate} to {edu.endDate})
                                <p>{edu.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <h5>Address</h5>
                        <p>
                            {address}, {areaInfo?.areaName}, {subDistrictInfo?.subDistrictName}, {districtInfo?.districtName}, {divisionInfo?.divisionName}, Zip: {zipCode}
                        </p>
                    </div>

                    {/* Fee and Gender */}
                    <div className="mb-4">
                        <h5>Hourly Fee & Gender</h5>
                        <p>Fee: <strong>{hourlyFee} BDT</strong></p>
                        <p>Gender: {gender}</p>
                    </div>

                    {/* Status Badges */}
                    <div>
                        {isApproved && <span className="badge bg-success me-2">Approved</span>}
                        {isFeatured && <span className="badge bg-warning text-dark me-2">Featured</span>}
                        {isBooked && <span className="badge bg-danger me-2">Booked</span>}
                    </div>
                    <Documents clientId={id} />
                </div>

            </div>
        </>
    )
}

export default ProfileDetails