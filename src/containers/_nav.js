import React from "react";
import CIcon from "@coreui/icons-react";
import logo from '../assets/images/logo.png'
import { useSelector } from "react-redux";
import { getUserPermissions } from "src/services/GlobalFunction";
const permissions = getUserPermissions();
console.log('permissions', permissions)
const canView = (key) => permissions[key]?.View === true;
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // icon: <img src={logo} width={30} />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  canView("class") && {
    _tag: "CSidebarNavItem",
    name: "Class",
    to: "/category",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  canView("subject") && {
    _tag: "CSidebarNavItem",
    name: "Subject",
    to: "/sub-category",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  //  canView("class") && 
  {
    _tag: "CSidebarNavItem",
    name: "Institute Type",
    to: "/institute-type",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  //  canView("class") && 
  {
    _tag: "CSidebarNavItem",
    name: "Institute Name",
    to: "/institute-name",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  //  canView("class") && 
  {
    _tag: "CSidebarNavItem",
    name: "Study Type",
    to: "/study-type",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  //  canView("class") && 
  {
    _tag: "CSidebarNavItem",
    name: "Department",
    to: "/department-name",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  canView("division") && {
    _tag: "CSidebarNavItem",
    name: "Division",
    to: "/division",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  canView("district") && {
    _tag: "CSidebarNavItem",
    name: "District",
    to: "/district",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  canView("subDistrict") && {
    _tag: "CSidebarNavItem",
    name: "Sub District",
    to: "/sub-district",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  canView("area") && {
    _tag: "CSidebarNavItem",
    name: "Area",
    to: "/area",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Language",
  //   to: "/language",
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  // },
  canView("package") && {
    _tag: "CSidebarNavItem",
    name: "Package",
    to: "/connection-package",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  canView("tutorManagement") && {
    _tag: "CSidebarNavDropdown",
    name: "Tutor Management",
    route: "",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Tutor",
        to: "/all-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Request Initiated",
        to: "/request-initiated-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Request For Update",
        to: "/request-update-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Under Review",
        to: "/under-review-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Approved",
        to: "/approved-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejected",
        to: "/rejected-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Send For Review",
        to: "/send-for-review",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Receive For Review",
        to: "/receive-for-review",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Un Approve",
      //   to: "/un-approve-tutor",
      // },

    ]
  },
  canView("studentManagement") && {
    _tag: "CSidebarNavDropdown",
    name: "Student Management",
    route: "",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Student",
        to: "/all-student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Request Initiated",
        to: "/request-initiated-student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Under Review",
        to: "/under-review-student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Approved",
        to: "/approved-student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejected",
        to: "/rejected-student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Send For Review",
        to: "/student-send-for-review",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Receive For Review",
        to: "/student-receive-for-review",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Un Approve",
      //   to: "/un-approve-tutor",
      // },

    ]
  },
  // canView("studentManagement") && {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Student Management",
  //   route: "",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "All Student",
  //       to: "/all-student",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Approve",
  //       to: "/approve-student",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Un Approve",
  //       to: "/un-approve-student",
  //     },
  //   ]
  // },
  canView("featuredManagement") && {
    _tag: "CSidebarNavDropdown",
    name: "Featured Management",
    route: "",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Featured",
        to: "/featured",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Un Featured",
        to: "/un-featured",
      }
    ]
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Report Connection",
  //   to: "/report-connection",
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  // },
  canView("createRole") && {
    _tag: "CSidebarNavItem",
    name: "Role",
    to: "/role",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  // canView("moderatorMonitoring") &&
  {
    _tag: "CSidebarNavDropdown",
    name: "Moderator Monitoring",
    route: "",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Tutor Profile",
        to: "/tutor-monitoring",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Student Profile",
        to: "/student-monitoring",
      }
    ]
  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Order Management",
  //   route: "",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Order Confirm",
  //       to: "/order-confirm",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Order Processing",
  //       to: "/order-processing",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Order Picked",
  //       to: "/order-picked",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Order Shipped",
  //       to: "/order-shipped",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Order Delivered",
  //       to: "/order-delivered",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Delivered List",
  //       to: "/delivered-list",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Cancel List",
  //       to: "/cancelled-list",
  //     },
  //   ]
  // },

].filter(Boolean);;

export default _nav;
