import React from "react";
import CIcon from "@coreui/icons-react";
import logo from '../assets/images/logo.png'
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

  {
    _tag: "CSidebarNavItem",
    name: "Class",
    to: "/category",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Subject",
    to: "/sub-category",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Division",
    to: "/division",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "District",
    to: "/district",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sub District",
    to: "/sub-district",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
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
  {
    _tag: "CSidebarNavItem",
    name: "Package",
    to: "/connection-package",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  {
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
        name: "Approve",
        to: "/approve-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Un Approve",
        to: "/un-approve-tutor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Featured",
        to: "/featured",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Un Featured",
        to: "/un-featured",
      },
    ]
  },
  {
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
        name: "Approve",
        to: "/approve-student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Un Approve",
        to: "/un-approve-student",
      },
    ]
  },
  {
    _tag: "CSidebarNavItem",
    name: "Report Connection",
    to: "/report-connection",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Role",
    to: "/role",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
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

];

export default _nav;
