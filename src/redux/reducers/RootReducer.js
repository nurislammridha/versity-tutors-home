import { combineReducers } from "redux";
import AreaReducer from "src/modules/area/_redux/AreaReducer";
import AuthReducer from "src/modules/auth/_redux/AuthReducer";
import CategoryReducer from "src/modules/category/_redux/CategoryReducer";
import ConnectionPackageReducer from "src/modules/connectionPackage/_redux/ConnectionPackageReducer";
import DistrictReducer from "src/modules/district/_redux/DistrictReducer";
import DivisionReducer from "src/modules/division/_redux/DivisionReducer";
import LanguageReducer from "src/modules/language/_redux/LanguageReducer";
import SubCategoryReducer from "src/modules/subCategory/_redux/SubCategoryReducer";
import SubDistrictReducer from "src/modules/subDistrict/_redux/SubDistrictReducer";

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
});

export default rootReducer;
