const QUOTE_REQUESTED = "QUOTE_REQUESTED";
const QUOTE_RECEIVED = "QUOTE_RECEIVED";
const QUOTE_FAILED = "QUOTE_FAILED";
const initialDashorgState = { data: [], status: "" };
export default function orgdashboardReducer(state = initialDashorgState, action) {
  switch (action.type) {
    case QUOTE_REQUESTED:
      state = Object.assign({}, state, { status: "waiting" });
      break;
    case QUOTE_RECEIVED:
      state = Object.assign({}, state, {
        data: [...action.payload],
        status: "received",
      });
      break;
    case QUOTE_FAILED:
      state = Object.assign({}, state, {
        status: "failed",
        error: action.payload,
      });
      break;
  }

  return state;
}
