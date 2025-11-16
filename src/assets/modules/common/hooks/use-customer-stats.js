import { useCallback, useReducer } from "react";

const STATE_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

const ACTION_TYPE = {
  PENDING: "PENDING",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
};

const initialState = {
  status: STATE_STATUS.IDLE,
  data: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.PENDING:
      return {
        ...state,
        ...initialState,
        status: STATE_STATUS.PENDING,
      };
    case ACTION_TYPE.SUCCESS:
      return {
        ...state,
        status: STATE_STATUS.SUCCESS,
        data: action.payload,
      };
    case ACTION_TYPE.FAILED:
      return {
        ...state,
        status: STATE_STATUS.FAILED,
        data: action.payload,
      };
    default:
      return state;
  }
}

const CUSTOMER_STATS_URL = `${import.meta.env.VITE_BACKEND_URL}/stats`;

export function useCustomerStats() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function allCustomerStats() {
    dispatch({ type: ACTION_TYPE.PENDING });

    try {
      const response = await fetch(CUSTOMER_STATS_URL);
      if (!response.ok) throw new Error(`Failed to fetch stats: ${response.status}`);

      const data = await response.json();
      const stats = Array.isArray(data.stats) ? data.stats : [];
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: stats });
      console.log("Fetched customer stats:", stats);
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.FAILED,
        payload: error?.message || "Failed to fetch customer stats",
      });
    }
  }

  return {
    allCustomerStats: useCallback(allCustomerStats, []),
    isPending: state.status === STATE_STATUS.PENDING,
    isSuccess: state.status === STATE_STATUS.SUCCESS,
    isFailed: state.status === STATE_STATUS.FAILED,
    ...state,
  };
}
