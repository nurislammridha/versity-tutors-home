import { combineReducers } from "redux";
import AreaReducer from "src/modules/area/_redux/AreaReducer";
import AuthReducer from "src/modules/auth/_redux/AuthReducer";
import CategoryReducer from "src/modules/category/_redux/CategoryReducer";
import ConnectionPackageReducer from "src/modules/connectionPackage/_redux/ConnectionPackageReducer";
import DistrictReducer from "src/modules/district/_redux/DistrictReducer";
import DivisionReducer from "src/modules/division/_redux/DivisionReducer";
import InstituteTypeReducer from "src/modules/instituteType/_redux/InstituteTypeReducer";
import LanguageReducer from "src/modules/language/_redux/LanguageReducer";
import MonitoringReducer from "src/modules/Monitoring/_redux/MonitoringReducer";
import ProfileReducer from "src/modules/profiles/_redux/ProfileReducer";
import ReportConnectionReducer from "src/modules/reportConnection/_redux/ReportConnectionReducer";
import RoleReducer from "src/modules/role/_redux/RoleReducer";
import StudentManagementReducer from "src/modules/studentManagement/_redux/StudentManagementReducer";
import SubCategoryReducer from "src/modules/subCategory/_redux/SubCategoryReducer";
import SubDistrictReducer from "src/modules/subDistrict/_redux/SubDistrictReducer";
import TutorManagementReducer from "src/modules/tutorManagement/_redux/TutorManagementReducer";

// combine all of the reducers here
const rootReducer = combineReducers({
  authInfo: AuthReducer,
  categoryInfo: CategoryReducer,
  subCategoryInfo: SubCategoryReducer,
  divisionInfo: DivisionReducer,
  districtInfo: DistrictReducer,
  subDistrictInfo: SubDistrictReducer,
  areaInfo: AreaReducer,
  languageInfo: LanguageReducer,
  connectionPackageInfo: ConnectionPackageReducer,
  tutorManagementInfo: TutorManagementReducer,
  studentManagementInfo: StudentManagementReducer,
  profileInfo: ProfileReducer,
  reportConnectionInfo: ReportConnectionReducer,
  roleInfo: RoleReducer,
  monitoringInfo: MonitoringReducer,
  instituteTypeInfo: InstituteTypeReducer,
});

export default rootReducer;
