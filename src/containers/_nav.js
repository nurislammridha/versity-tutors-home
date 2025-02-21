import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  {
    _tag: "CSidebarNavItem",
    name: "Category",
    to: "/category",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sub Category",
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
  {
    _tag: "CSidebarNavItem",
    name: "Language",
    to: "/language",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Package",
    to: "/connection-package",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Tutor Profile",
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
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Student Profile",
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
