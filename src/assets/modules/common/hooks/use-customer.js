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

const USER_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;
console.log("USER_URL:", USER_URL);

export function useCustomer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function addUser(userData) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to add user");

      const data = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.error("Failed to add user:", error);
      dispatch({
        type: ACTION_TYPE.FAILED,
        payload: error?.message || "Failed to add user",
      });
    }
  }

  async function allCustomers() {
    dispatch({ type: ACTION_TYPE.PENDING });

    try {
      const response = await fetch(`${USER_URL}/customers`);
      if (!response.ok) throw new Error(`Failed to fetch customers: ${response.status}`);

      const data = await response.json();
      console.log("Raw API response:", data);

      // Correct key here
      const customers = Array.isArray(data.customers) ? data.customers : [];
      console.log("Fetched customers array:", customers);

      dispatch({ type: ACTION_TYPE.SUCCESS, payload: customers });
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      dispatch({
        type: ACTION_TYPE.FAILED,
        payload: error?.message || "Failed to fetch customers",
      });
    }
  }



  async function getUser(userId) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(`${USER_URL}/${userId}`);
      if (!response.ok)
        throw new Error(`Failed to fetch request: ${response.status}`);

      const data = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.user });
      return data.user;
    } catch (error) {
      console.log("Failed to fetch user:", error);
      dispatch({
        type: ACTION_TYPE.FAILED,
        payload: error?.message || "Failed to fetch user",
      });
    }
  }

  async function updateUser(userId, updateData) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(`${USER_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.user });
      return data.user;
    } catch (error) {
      console.log("Failed to update user:", error);
      dispatch({
        type: ACTION_TYPE.FAILED,
        payload: error?.message || "Failed to update user",
      });
    }
  }

  async function deleteUser(userId) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(`${USER_URL}/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Failed to delete user: ${response.status}`);

      const data = await response.json();
      await allCustomers();
      return data.user;
    } catch (error) {
      console.log("Failed to delete user:", error);
      dispatch({
        type: ACTION_TYPE.FAILED,
        payload: error?.message || "Failed to delete user",
      });
    }
  }

  return {
    addUser: useCallback(addUser, []),
    allCustomers: useCallback(allCustomers, []),
    getUser: useCallback(getUser, []),
    updateUser: useCallback(updateUser, []),
    deleteUser: useCallback(deleteUser, []),
    isPending: state.status === STATE_STATUS.PENDING,
    isSuccess: state.status === STATE_STATUS.SUCCESS,
    isFailed: state.status === STATE_STATUS.FAILED,
    ...state,
  };
}
