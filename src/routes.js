import React from "react";
import CreateCategoryContainer from "./modules/category/views/CreateCategoryContainer";
import CreateSubCategoryContainer from "./modules/subCategory/views/CreateSubCategoryContainer";
import SubCategoryListContainer from "./modules/subCategory/views/SubCategoryListContainer";
import CategoryListContainer from "./modules/category/views/CategoryListContainer";
import UpdateCategoryContainer from "./modules/category/views/UpdateCategoryContainer";
import UpdateSubCategoryContainer from "./modules/subCategory/views/UpdateSubCategoryContainer";

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
];

export default routes;
