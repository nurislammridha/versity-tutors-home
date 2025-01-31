import React from "react";
import CreateCategoryContainer from "./modules/category/views/CreateCategoryContainer";
import OrderDeliveredContainer from "./modules/order/views/OrderDeliveredContainer";
import OrderProcessingContainer from "./modules/order/views/OrderProcessingContainer";
import CreateProductContainer from "./modules/product/views/CreateProductContainer";
import ProductListContainer from "./modules/product/views/ProductListContainer";
import UserListContainer from "./modules/user/views/UserListContainer";
import CreateUnitContainer from "./modules/unit/views/CreateUnitContainer";
import CreateSizeContainer from "./modules/size/views/CreateSizeContainer";
import CreateColorContainer from "./modules/color/views/CreateColorContainer";
import CreateSubCategoryContainer from "./modules/subCategory/views/CreateSubCategoryContainer";
import CreateSellerContainer from "./modules/seller/views/CreateSellerContainer";
import SellerListContainer from "./modules/seller/views/SellerListContainer";
import SubCategoryListContainer from "./modules/subCategory/views/SubCategoryListContainer";
import CategoryListContainer from "./modules/category/views/CategoryListContainer";
import ColorListContainer from "./modules/color/views/ColorListContainer";
import SizeListContainer from "./modules/size/views/SizeListContainer";
import UnitListContainer from "./modules/unit/views/UnitListContainer";
import BrandListContainer from "./modules/brand/views/BrandListContainer";
import OrderConfirmContainer from "./modules/order/views/OrderConfirmContainer";
import OrderCancelledContainer from "./modules/order/views/OrderCancelledContainer";
import OrderPickedContainer from "./modules/order/views/OrderPickedContainer";
import OrderShippedContainer from "./modules/order/views/OrderShippedContainer";
import OrderDetailsContainer from "./modules/order/views/OrderDetailsContainer";
import DeliveredOrderContainer from "./modules/order/views/DeliveredOrderContainer";
import UpdateUnitContainer from "./modules/unit/views/UpdateUnitContainer";
import UpdateSizeContainer from "./modules/size/views/UpdateSizeContainer";
import UpdateColorContainer from "./modules/color/views/UpdateColorContainer";
import UpdateCategoryContainer from "./modules/category/views/UpdateCategoryContainer";
import UpdateSubCategoryContainer from "./modules/subCategory/views/UpdateSubCategoryContainer";
import UpdateSellerContainer from "./modules/seller/views/UpdateSellerContainer";
import UpdateProductContainer from "./modules/product/views/UpdateProductContainer";
import CampaignListContainer from "./modules/campaign/views/CampaignListContainer";
import CreateCampaignContainer from "./modules/campaign/views/CreateCampaignContainer";
import EditCampaignContainer from "./modules/campaign/views/EditCampaignContainer";
import CampaignProductListContainer from "./modules/campaign/views/CampaignProductListContainer";
import CreateCampaignProductContainer from "./modules/campaign/views/CreateCampaignProductContainer";
import CreateBrandContainer from "./modules/brand/views/CreateBrandContainer";
import UpdateBrandContainer from "./modules/brand/views/UpdateBrandContainer";
import OriginListContainer from "./modules/origin/views/OriginListContainer";
import CreateOriginContainer from "./modules/origin/views/CreateOriginContainer";
import UpdateOriginContainer from "./modules/origin/views/UpdateOriginContainer";
import SubSubCategoryListContainer from "./modules/subSubCategory/views/SubSubCategoryListContainer";
import UpdateSubSubCategoryContainer from "./modules/subSubCategory/views/UpdateSubSubCategoryContainer";
import CreateSubSubCategoryContainer from "./modules/subSubCategory/views/CreateSubSubCategoryContainer";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  //brnad
  { path: "/brand", name: "Brand", component: BrandListContainer },
  {
    path: "/brand-add",
    name: "Create Brand",
    component: CreateBrandContainer,
  },
  {
    path: "/brand-edit/:id",
    name: "Update Brand",
    component: UpdateBrandContainer,
  },
  //origin
  { path: "/origin", name: "Origin", component: OriginListContainer },
  {
    path: "/origin-add",
    name: "Create Origin",
    component: CreateOriginContainer,
  },
  {
    path: "/origin-edit/:id",
    name: "Update Origin",
    component: UpdateOriginContainer,
  },
  //unit
  { path: "/unit", name: "Unit", component: UnitListContainer },
  { path: "/unit-edit/:id", name: "Unit", component: UpdateUnitContainer },
  {
    path: "/unit-add",
    name: "Create Unit",
    component: CreateUnitContainer,
  },
  //size
  { path: "/size", name: "Size", component: SizeListContainer },
  { path: "/size-edit/:id", name: "Size", component: UpdateSizeContainer },
  {
    path: "/size-add",
    name: "Create Size",
    component: CreateSizeContainer,
  },
  //color
  { path: "/color", name: "Color", component: ColorListContainer },
  { path: "/color-edit/:id", name: "Color", component: UpdateColorContainer },
  {
    path: "/color-add",
    name: "Create Color",
    component: CreateColorContainer,
  },
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
  //sub sub category
  { path: "/sub-sub-category", name: "Sub Sub Category", component: SubSubCategoryListContainer },
  { path: "/sub-sub-category-edit/:id", name: "Sub Sub Category", component: UpdateSubSubCategoryContainer },
  {
    path: "/sub-sub-category-add",
    name: "Create Sub Sub Category",
    component: CreateSubSubCategoryContainer,
  },
  //seller
  { path: "/seller", name: "Seller", component: SellerListContainer },
  { path: "/seller-edit/:id", name: "Seller Edit", component: UpdateSellerContainer },
  {
    path: "/seller-add",
    name: "Create Seller",
    component: CreateSellerContainer,
  },
  //products
  {
    path: "/product",
    name: "Product List",
    component: ProductListContainer,
  },
  {
    path: "/product-add",
    name: "Create Product",
    component: CreateProductContainer,
  },
  {
    path: "/product-edit/:id",
    name: "Create Product",
    component: UpdateProductContainer,
  },
  {
    path: "/user",
    name: "User",
    component: UserListContainer,
  },
  {
    path: "/order-confirm",
    name: "Order Confirm",
    component: OrderConfirmContainer,
  },
  {
    path: "/order-details/:id",
    name: "Order Details",
    component: OrderDetailsContainer,
  },
  {
    path: "/cancelled-list",
    name: "Order Cancel",
    component: OrderCancelledContainer,
  },
  {
    path: "/order-processing",
    name: "Order Processing",
    component: OrderProcessingContainer,
  },
  {
    path: "/order-picked",
    name: "Order Picked",
    component: OrderPickedContainer,
  },
  {
    path: "/order-shipped",
    name: "Order Shipped",
    component: OrderShippedContainer,
  },
  {
    path: "/order-picked",
    name: "Order Picked",
    component: OrderPickedContainer,
  },
  {
    path: "/order-delivered",
    name: "Order Delivered",
    component: OrderDeliveredContainer,
  },
  {
    path: "/delivered-list",
    name: "Delivered order List",
    component: DeliveredOrderContainer,
  },
  {
    path: "/campaign",
    name: "Campaign List",
    component: CampaignListContainer,
  },
  {
    path: "/campaign-add",
    name: "Campaign Create",
    component: CreateCampaignContainer,
  },
  {
    path: "/campaign-edit",
    name: "Campaign Edit",
    component: EditCampaignContainer,
  },
  {
    path: "/campaign-product/:id",
    name: "Campaign Product",
    component: CampaignProductListContainer,
  },
  {
    path: "/campaign-product-add/:id",
    name: "Campaign Product Add",
    component: CreateCampaignProductContainer,
  },
];

export default routes;
