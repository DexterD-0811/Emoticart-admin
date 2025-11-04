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

const CATEGORY_URL = `${import.meta.env.VITE_BACKEND_URL}/category`;
console.log("CATEGORY_URL:", CATEGORY_URL);

export function useCategory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function addCategory(categoryData) {
    dispatch({ type: ACTION_TYPE.PENDING});
    
    try {
      const response = await fetch(CATEGORY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error(`Failed to request: ${response.status}`);
      }

      const json = await response.json();

      dispatch({ type: ACTION_TYPE.SUCCESS, payload: json});
      return json;
    } catch (error) {
      console.log('Failed Adding Category Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function allCategories() {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(CATEGORY_URL);

      if (!response.ok) {
        throw new Error(`Failed to request: ${response.status}`);
      }

      const json = await response.json();

      dispatch({ type: ACTION_TYPE.SUCCESS, payload: json.categories });
      console.log("Fetched categories:", json.categories);

    } catch (error) {
      console.log('Failed Adding Category Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function getCategoryById(id) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch (`${CATEGORY_URL}/${id}`);

      if(!response.ok) {
        throw new Error(`Failed to request: ${response.status}`);
      }
      
      const json = await response.json();
      const categoryData = json.category;

    dispatch({ type: ACTION_TYPE.SUCCESS, payload: categoryData });
    return categoryData;
    } catch (error) {
      console.log('Failed Adding Category Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
      return null
    }
  }

  async function updateCategory(id, updateData) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(`${CATEGORY_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.category });
      return data.category;
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FAILED, payload: error.message });
      throw error;
    }
  }

  async function searchCategory(query) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(`${CATEGORY_URL}/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.categories });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FAILED, payload: error.message });
    }
  }

  async function deleteCategory(id) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      const response = await fetch(`${CATEGORY_URL}/${id}`, { method: "DELETE" });
      const data = await response.json();
      await allCategories();
      return data.category;
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FAILED, payload: error.message });
      throw error;
    }
  }


return {
  addCategory: useCallback(addCategory, []),
  allCategories: useCallback(allCategories, []),
  getCategoryById: useCallback(getCategoryById, []),
  updateCategory: useCallback(updateCategory, []),
  searchCategory: useCallback(searchCategory, []),
  deleteCategory: useCallback(deleteCategory, []),
  isPending: state.status === STATE_STATUS.PENDING,
    isSuccess: state.status === STATE_STATUS.SUCCESS,
    isFailed: state.status === STATE_STATUS.FAILED,
    ...state,
  };
}