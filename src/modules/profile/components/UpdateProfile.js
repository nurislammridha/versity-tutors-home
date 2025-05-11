import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { SubmitUserUpdate } from '../_redux/ProfileAction';
const UpdateProfile = () => {
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch()
  const isUpdate = useSelector(
    (state) => state.roleInfo.isUpdate
  );
  const handleSubmit = () => {
    const data = { name, gender, phone, whatsapp, address }
    dispatch(SubmitUserUpdate(data, password, cPassword, userInfo?._id))
  }
  useEffect(() => {
    setName(userInfo?.name)
    setGender(userInfo?.gender || "")
    setPhone(userInfo?.phone || "")
    setWhatsapp(userInfo?.whatsapp || "")
    setAddress(userInfo?.address || "")
  }, [userInfo])

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userData")))
  }, [])
  console.log('userInfo', userInfo)
  return (
    <>
      <div class="container profile-container">
        <h3 class="text-center mb-4">My Profile</h3>

        <div>
          {/* <!-- Avatar Preview & Upload --> */}
          {/* <div class="text-center mb-4">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="Avatar" class="avatar-preview" id="avatarPreview" />
            <div class="mt-2">
              <input type="file" name="avatar" class="form-control form-control-sm w-auto d-inline" accept="image/*" />
            </div>
          </div> */}

          {/* <!-- Basic Info --> */}
          <div class="section-title">Basic Information</div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder='enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Gender</label>
              <Select
                options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]}
                value={gender ? { label: gender } : null}
                onChange={(e) => {
                  setGender(e.value)
                }}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder='enter email'
                value={userInfo?.email}
                disabled
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Phone</label>
              <input
                type="text"
                class="form-control"
                name="phone"
                placeholder='enter phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">WhatsApp</label>
              <input
                type="text"
                class="form-control"
                name="whatsapp"
                placeholder='enter whatsapp'
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                name="address"
                placeholder='enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Role Type</label>
              <input type="text" class="form-control" name="roleType" value={userInfo?.roleType} disabled />
            </div>
          </div>

          {/* <!-- Manager Info (Only if roleType === 'Moderator') --> */}
          {userInfo?.managerInfo &&
            <>
              <div class="section-title">Manager Info</div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Manager Name</label>
                  <input type="text" class="form-control" value={userInfo?.managerInfo?.name} disabled />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Manager Email</label>
                  <input type="email" class="form-control" value={userInfo?.managerInfo?.email} disabled />
                </div>
              </div>
            </>
          }


          {/* <!-- Change Password --> */}
          <div class="section-title">Change Password</div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">New Password</label>
              <input
                type="password"
                class="form-control"
                name="newPassword"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                name="confirmPassword"
                placeholder="Confirm password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
          </div>

          {/* <!-- Save Button --> */}
          <div class="text-end mt-4">
            <button
              class="btn btn-primary px-4"
              onClick={() => !isUpdate && handleSubmit()}
            >
              {isUpdate ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile