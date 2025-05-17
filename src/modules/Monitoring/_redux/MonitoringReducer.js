import * as Types from "./Types";

const initialState = {
  moderatorMonitorList: null,
};
const MonitoringReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.MODERATOR_MONITOR_LIST:
      return {
        ...state,
        moderatorMonitorList: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default MonitoringReducer;
