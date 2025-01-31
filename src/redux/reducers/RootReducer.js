import { combineReducers } from "redux";
import AuthReducer from "src/modules/auth/_redux/AuthReducer";
import CategoryReducer from "src/modules/category/_redux/CategoryReducer";
import SubCategoryReducer from "src/modules/subCategory/_redux/SubCategoryReducer";

// combine all of the reducers here
const rootReducer = combineReducers({
  authInfo: AuthReducer,
  categoryInfo: CategoryReducer,
  subCategoryInfo: SubCategoryReducer,
});

export default rootReducer;
