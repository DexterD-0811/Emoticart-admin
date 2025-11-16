import { useCallback, useReducer } from "react";

const STATE_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const ACTION_TYPE = {
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
};

const initialState = {
  status: STATE_STATUS.IDLE,
  data: [],
}

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

const ORDER_URL = `${import.meta.env.VITE_BACKEND_URL}/order`;
console.log("ORDER_URL:", ORDER_URL);

export function useOrder() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function allOrders() {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(ORDER_URL);

      if (!response.ok) {
        throw new Error(`Failed to request: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched orders data:", data.orders);

      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.orders });
      console.log("Fetched orders:", data.orders);
  
    } catch (error) {
      console.log('Failed fetching Order Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function getOrder(orderId) {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(`${ORDER_URL}/${orderId}`);

      if (!response.ok) {
        throw new Error(`Failed to request: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched order data:", data.order);

      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.order });
      console.log("Fetched order:", data.order);
  
    } catch (error) {
      console.log('Failed fetching Order Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  return {
    allOrders: useCallback(allOrders, []),
    getOrder: useCallback(getOrder, []),
    isPending: state.status === STATE_STATUS.PENDING,
    isFailed: state.status === STATE_STATUS.FAILED,
    isSuccess: state.status === STATE_STATUS.SUCCESS,
    ...state,
  };
}