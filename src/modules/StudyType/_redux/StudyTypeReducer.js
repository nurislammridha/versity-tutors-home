import * as Types from "./Types";

const initialState = {
  isStudyType: false,
  isUpdate: false,
  afterCreated: false,
  afterUpdated: false,
  afterDeleted: false,
  studyTypeList: null,
  isStatusUpdate: false
};
const StudyTypeReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_CREATE_STUDY_TYPE:
      return {
        ...state,
        isStudyType: action.payload,
      };
    case Types.IS_UPDATE_STUDY_TYPE:
      return {
        ...state,
        isUpdate: action.payload,
      };
    case Types.AFTER_CREATED:
      return {
        ...state,
        afterCreated: action.payload,
      };
    case Types.AFTER_UPDATED:
      return {
        ...state,
        afterUpdated: action.payload,
      };
    case Types.STUDY_TYPE_LIST:
      return {
        ...state,
        studyTypeList: action.payload,
      };
    case Types.AFTER_DELETED:
      return {
        ...state,
        afterDeleted: action.payload,
      };
    case Types.IS_STATUS_UPDATE:
      return {
        ...state,
        isStatusUpdate: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default StudyTypeReducer;
