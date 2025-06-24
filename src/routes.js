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
import ConnectionPackageListContainer from "./modules/connectionPackage/views/ConnectionPackageListContainer";
import UpdateConnectionPackageContainer from "./modules/connectionPackage/views/UpdateConnectionPackageContainer";
import CreateConnectionPackageContainer from "./modules/connectionPackage/views/CreateConnectionPackageContainer";
import AreaListContainer from "./modules/area/views/AreaContainer";
import UpdateAreaContainer from "./modules/area/views/UpdateAreaContainer";
import CreateAreaContainer from "./modules/area/views/CreateAreaContainer";
// import ApproveTutorListContainer from "./modules/profiles/views/ApproveTutorListContainer";
// import UnApproveTutorListContainer from "./modules/profiles/views/UnApproveTutorListContainer";
import AllTutorListContainer from "./modules/tutorManagement/views/AllTutorListContainer";
// import AllStudentListContainer from "./modules/profiles/views/AllStudentListContainer";
// import ApproveStudentListContainer from "./modules/profiles/views/ApproveStudentListContainer";
// import UnApproveStudentListContainer from "./modules/profiles/views/UnApproveStudentListContainer";
import ReportConnectionListContainer from "./modules/reportConnection/views/ReportConnectionListContainer";
// import FeaturedList from "./modules/profiles/components/FeaturedList";
// import UnFeaturedList from "./modules/profiles/components/UnFeaturedList";
// import ProfileDetailsContainer from "./modules/profiles/views/ProfileDetailsContainer";
import RoleListContainer from "./modules/role/views/RoleListContainer";
import UpdateRoleContainer from "./modules/role/views/UpdateRoleContainer";
import CreateRoleContainer from "./modules/role/views/CreateRoleContainer";
import RoleDetailsContainer from "./modules/role/views/RoleDetailsContainer";
import UpdateProfileContainer from "./modules/profile/views/UpdateProfielContainer";
import InitiatedTutorContainer from "./modules/tutorManagement/views/InitiatedTutorContainer";
import UnderReviewTutorContainer from "./modules/tutorManagement/views/UnderReviewTutorContainer";
import ApprovedTutorContainer from "./modules/tutorManagement/views/ApprovedTutorContainer";
import RejectedTutorContainer from "./modules/tutorManagement/views/RejectedTutorContainer";
import TutorMonitoringContainer from "./modules/Monitoring/views/TutorMonitoringContainer";
import StudentMonitoringContainer from "./modules/Monitoring/views/StudentMonitoringContainer";
import SendForReviewTutorContainer from "./modules/tutorManagement/views/SendForReviewTutorContainer";
import ReceiveForReviewTutorContainer from "./modules/tutorManagement/views/ReceiveForReviewTutorContainer";
import ViewModeratorMonitoringContainer from "./modules/Monitoring/views/ViewModeratorMonitoringContainer";
import AllStudentListContainer from "./modules/studentManagement/views/AllStudentListContainer";
import InitiatedStudentContainer from "./modules/studentManagement/views/InitiatedStudentContainer";
import UnderReviewStudentContainer from "./modules/studentManagement/views/UnderReviewStudentContainer";
import ApprovedStudentContainer from "./modules/studentManagement/views/ApprovedStudentContainer";
import RejectedStudentContainer from "./modules/studentManagement/views/RejectedStudentContainer";
import SendForReviewStudentContainer from "./modules/studentManagement/views/SendForReviewStudentContainer";
import ReceiveForReviewStudentContainer from "./modules/studentManagement/views/ReceiveForReviewStudentContainer";
import InstituteTypeListContainer from "./modules/instituteType/views/InstituteTypeListContainer";
import UpdateInstituteTypeContainer from "./modules/instituteType/views/UpdateInstituteTypeContainer";
import CreateInstituteTypeContainer from "./modules/instituteType/views/CreateInstituteTypeContainer";
import InstituteNameListContainer from "./modules/instituteName/views/InstituteNameListContainer";
import UpdateInstituteNameContainer from "./modules/instituteName/views/UpdateInstituteNameContainer";
import CreateInstituteNameContainer from "./modules/instituteName/views/CreateInstituteNameContainer";
import CreateStudyTypeContainer from "./modules/StudyType/views/CreateStudyTypeContainer";
import UpdateStudyTypeContainer from "./modules/StudyType/views/UpdateStudyTypeContainer";
import StudyTypeListContainer from "./modules/StudyType/views/StudyTypeListContainer";

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
  //sub district
  { path: "/area", name: "Area", component: AreaListContainer },
  { path: "/area-edit/:id", name: "Area", component: UpdateAreaContainer },
  {
    path: "/area-add",
    name: "Create Area",
    component: CreateAreaContainer,
  },
  //language
  { path: "/language", name: "Language", component: LanguageListContainer },
  { path: "/language-edit/:id", name: "Language", component: UpdateLanguageContainer },
  {
    path: "/language-add",
    name: "Create Language",
    component: CreateLanguageContainer,
  },
  //connections
  { path: "/connection-package", name: "Connection Package", component: ConnectionPackageListContainer },
  { path: "/connection-package-edit/:id", name: "Connection Package", component: UpdateConnectionPackageContainer },
  {
    path: "/connection-package-add",
    name: "Create Connection Package",
    component: CreateConnectionPackageContainer,
  },
  //Tutor Management
  { path: "/all-tutor", name: "All tutor", component: AllTutorListContainer },
  { path: "/request-initiated-tutor", name: "request Initiated Tutor", component: InitiatedTutorContainer },
  { path: "/under-review-tutor", name: "under review tutor", component: UnderReviewTutorContainer },
  { path: "/approved-tutor", name: "approved tutor", component: ApprovedTutorContainer },
  { path: "/rejected-tutor", name: "rejected tutor", component: RejectedTutorContainer },
  { path: "/send-for-review", name: "send user to review", component: SendForReviewTutorContainer },
  { path: "/receive-for-review", name: "send user to review", component: ReceiveForReviewTutorContainer },
  //Student Management
  { path: "/all-student", name: "All Student", component: AllStudentListContainer },
  { path: "/request-initiated-student", name: "request Initiated Student", component: InitiatedStudentContainer },
  { path: "/under-review-student", name: "under review student", component: UnderReviewStudentContainer },
  { path: "/approved-student", name: "approved student", component: ApprovedStudentContainer },
  { path: "/rejected-student", name: "rejected student", component: RejectedStudentContainer },
  { path: "/student-send-for-review", name: "student send user to review", component: SendForReviewStudentContainer },
  { path: "/student-receive-for-review", name: "student send user to review", component: ReceiveForReviewStudentContainer },
  //Profile

  // { path: "/approve-tutor", name: "Approve tutor", component: ApproveTutorListContainer },
  // { path: "/un-approve-tutor", name: "Approve tutor", component: UnApproveTutorListContainer },
  // { path: "/all-student", name: "All student", component: AllStudentListContainer },
  // { path: "/approve-student", name: "Approve student", component: ApproveStudentListContainer },
  // { path: "/un-approve-student", name: "Approve student", component: UnApproveStudentListContainer },
  // { path: "/featured", name: "Featured", component: FeaturedList },
  // { path: "/un-featured", name: "Un Featured", component: UnFeaturedList },
  // { path: "/profile/:id", name: "Profile Details", component: ProfileDetailsContainer },
  //report connection
  { path: "/report-connection", name: "Report Connection", component: ReportConnectionListContainer },
  //role
  { path: "/role", name: "Role", component: RoleListContainer },
  { path: "/role-details/:id", name: "Role", component: RoleDetailsContainer },
  { path: "/role-edit/:id", name: "Role", component: UpdateRoleContainer },
  {
    path: "/role-add",
    name: "Create Role",
    component: CreateRoleContainer,
  },
  //role
  { path: "/profile", name: "Role", component: UpdateProfileContainer },
  //role
  { path: "/tutor-monitoring", name: "Tutor Monitoring", component: TutorMonitoringContainer },
  { path: "/student-monitoring", name: "Student Monitoring", component: StudentMonitoringContainer },
  { path: "/moderator-monitoring-details/:id", name: "Moderator Monitoring", component: ViewModeratorMonitoringContainer },
  //institute type
  { path: "/institute-type", name: "Institute Type", component: InstituteTypeListContainer },
  { path: "/institute-type-edit/:id", name: "Institute Type", component: UpdateInstituteTypeContainer },
  {
    path: "/institute-type-add",
    name: "Create Institute Type",
    component: CreateInstituteTypeContainer,
  },

  //institute name
  { path: "/institute-name", name: "Institute name", component: InstituteNameListContainer },
  { path: "/institute-name-edit/:id", name: "Institute name", component: UpdateInstituteNameContainer },
  {
    path: "/institute-name-add",
    name: "Create Institute Name",
    component: CreateInstituteNameContainer,
  },
  //Study type
  { path: "/study-type", name: "Study Type", component: StudyTypeListContainer },
  { path: "/study-type-edit/:id", name: "Study Type", component: UpdateStudyTypeContainer },
  {
    path: "/study-type-add",
    name: "Create Study Type",
    component: CreateStudyTypeContainer,
  },
];

export default routes;
