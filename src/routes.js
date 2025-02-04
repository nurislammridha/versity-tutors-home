import React from "react";
import CreateCategoryContainer from "./modules/category/views/CreateCategoryContainer";
import CreateSubCategoryContainer from "./modules/subCategory/views/CreateSubCategoryContainer";
import SubCategoryListContainer from "./modules/subCategory/views/SubCategoryListContainer";
import CategoryListContainer from "./modules/category/views/CategoryListContainer";
import UpdateCategoryContainer from "./modules/category/views/UpdateCategoryContainer";
import UpdateSubCategoryContainer from "./modules/subCategory/views/UpdateSubCategoryContainer";
import DivisionListContainer from "./modules/division/views/DivisionListContainer";
import UpdateDivisionContainer from "./modules/division/views/UpdateDivisionContainer";
import CreateDivisionContainer from "./modules/division/views/CreateDivisionContainer";
import DistrictListContainer from "./modules/district/views/DistrictListContainer";
import UpdateDistrictContainer from "./modules/district/views/UpdateDistrictContainer";
import CreateDistrictContainer from "./modules/district/views/CreateDistrictContainer";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  //category
  { path: "/category", name: "Category", component: CategoryListContainer },
  { path: "/category-edit/:id", name: "Category", component: UpdateCategoryContainer },
  {
    path: "/category-add",
    name: "Create Category",
    component: CreateCategoryContainer,
  },
  //sub category
  { path: "/sub-category", name: "Sub Category", component: SubCategoryListContainer },
  { path: "/sub-category-edit/:id", name: "Sub Category", component: UpdateSubCategoryContainer },
  {
    path: "/sub-category-add",
    name: "Create Sub Category",
    component: CreateSubCategoryContainer,
  },
  //division
  { path: "/division", name: "Division", component: DivisionListContainer },
  { path: "/division-edit/:id", name: "Division", component: UpdateDivisionContainer },
  {
    path: "/division-add",
    name: "Create Division",
    component: CreateDivisionContainer,
  },
  //district
  { path: "/district", name: "District", component: DistrictListContainer },
  { path: "/district-edit/:id", name: "District", component: UpdateDistrictContainer },
  {
    path: "/district-add",
    name: "Create District",
    component: CreateDistrictContainer,
  },
];

export default routes;
