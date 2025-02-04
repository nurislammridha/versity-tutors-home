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
import SubDistrictListContainer from "./modules/subDistrict/views/SubDistrictListContainer";
import UpdateSubDistrictContainer from "./modules/subDistrict/views/UpdateSubDistrictContainer";
import CreateSubDistrictContainer from "./modules/subDistrict/views/CreateSubDistrictContainer";
import LanguageListContainer from "./modules/language/views/LanguageListContainer";
import UpdateLanguageContainer from "./modules/language/views/UpdateLanguageContainer";
import CreateLanguageContainer from "./modules/language/views/CreateLanguageContainer";

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
  //sub district
  { path: "/sub-district", name: "Sub District", component: SubDistrictListContainer },
  { path: "/sub-district-edit/:id", name: "Sub District", component: UpdateSubDistrictContainer },
  {
    path: "/sub-district-add",
    name: "Create Sub District",
    component: CreateSubDistrictContainer,
  },
  //language
  { path: "/language", name: "Language", component: LanguageListContainer },
  { path: "/language-edit/:id", name: "Language", component: UpdateLanguageContainer },
  {
    path: "/language-add",
    name: "Create Language",
    component: CreateLanguageContainer,
  },
];

export default routes;
