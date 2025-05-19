import * as Types from "./Types";

const initialState = {
  moderatorMonitorList: null,
  isModeratorTutorDetails: false,
  moderatorTutorDetails: null,
};
const MonitoringReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.MODERATOR_MONITOR_LIST:
      return {
        ...state,
        moderatorMonitorList: action.payload,
      };
    case Types.IS_MODERATOR_TUTOR_DETAILS:
      return {
        ...state,
        isModeratorTutorDetails: action.payload,
      };
    case Types.MODERATOR_TUTOR_DETAILS:
      return {
        ...state,
        moderatorTutorDetails: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default MonitoringReducer;
