import React, { useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";
import { cilBell } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUserData, NotificationAsClicked, NotificationByAdmin, SeenNotification } from "src/modules/auth/_redux/AuthAction";

const TheHeaderDropdown = () => {
  const [userInfo, setUserInfo] = useState(null)
  const history = useHistory();
  const dispatch = useDispatch()
  const notificationList = useSelector((state) => state.authInfo.notificationList);
  const { unreadCount, result: notifications } = notificationList || {}
  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("isLogin", "false");
    history.push("/login");
  };
  const handleSeen = (item) => {
    history.push(item.redirectUrl)
    userInfo !== null && dispatch(SeenNotification(item?._id, userInfo?._id))
  }
  const handleOpenNotification = () => {
    userInfo !== null && unreadCount > 0 && dispatch(NotificationAsClicked(userInfo?._id))
  }
  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem("userData"))
    userInfo !== null && dispatch(NotificationByAdmin(userInfo?._id))
    // dispatch(GlobalUserData(userData))
  }, [userInfo])
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userData")))
  }, [])

  return (
    <CDropdown inNav className="c-header-nav-items mx-2 d-flex align-items-center" direction="down">
      <CDropdown className="mr-3">
        <CDropdownToggle
          className="c-header-nav-link" caret={false}
          onClick={() => handleOpenNotification()}
        >
          <CIcon content={cilBell} size="lg" />
          {unreadCount > 0 && (
            <CBadge color="danger" shape="pill" className="ml-1">
              {unreadCount}
            </CBadge>
          )}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end" style={{ minWidth: "300px", height: "500px", overflowY: "auto" }}>
          {notifications?.length === 0 ? (
            <CDropdownItem>No notifications</CDropdownItem>
          ) : (
            notifications && notifications.map((item, index) => (
              <CDropdownItem
                className={`notification-item ${item?.seenIds.includes(userInfo?._id) ? "read" : "unread"}`} key={index}
                onClick={() => handleSeen(item)}
              >
                {item.title}
              </CDropdownItem>
            ))
          )}
        </CDropdownMenu>
      </CDropdown>




      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>Name: Anikh</CDropdownItem>
        <CDropdownItem>Email: Anikh</CDropdownItem> */}
        <CDropdownItem onClick={() => history.push("profile")}>
          <a className="ml-5">Profile</a>
        </CDropdownItem>
        <CDropdownItem onClick={() => handleLogout()}>
          <a className="ml-5">LOGOUT</a>
        </CDropdownItem>
      </CDropdownMenu>
      <style>
        {`
          .notification-item {
            padding: 10px;
            font-size: 14px;
            border-bottom: 1px solid #ddd;
          }
          .notification-item.unread {
            background-color: #f8d7da; /* Light red for unread */
            font-weight: bold;
          }
          .notification-item.read {
            background-color: #e2e3e5; /* Light gray for read */
          }
        `}
      </style>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
