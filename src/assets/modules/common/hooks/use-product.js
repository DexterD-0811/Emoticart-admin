import { useCallback, useReducer } from 'react';

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

const PRODUCT_URL = `${import.meta.env.VITE_BACKEND_URL}/product`;
console.log("PRODUCT_URL:", PRODUCT_URL);

export function useProduct() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function addProduct(productData) {
    dispatch({ type: ACTION_TYPE.PENDING});
    
    try {
      const response = await fetch(PRODUCT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.status}`);
      }

      const json = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: json });
      return json;
    } catch (error) {
      console.log('Failed Adding Product Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function allProducts() {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(PRODUCT_URL);

      if(!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const json = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: json.products });
      console.log("Fetched Products:", json.products);

    } catch (error) {
      console.log('Failed Fetching Products Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function getProductById(productId) {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(`${PRODUCT_URL}/${productId}`);

      if(!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const json = await response.json();
      const productData = json.product;
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: productData });
      return productData;
    } catch (error) {
      console.log('Failed Fetching Product Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
      return null;
    }
  }

  async function updateProduct(productId, updatedData) {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(`${PRODUCT_URL}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data= await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.product });
      return data.product;
    } catch (error) {
      console.log('Failed Updating Product Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function searchProduct(query) {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(`${PRODUCT_URL}/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: data.products });
      return data.products;
    } catch (error) {
      console.log('Failed Searching Product Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  async function deleteProduct(productId) {
    dispatch({ type: ACTION_TYPE.PENDING});
    try {
      const response = await fetch(`${PRODUCT_URL}/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      await allProducts();
      return data.product;
    } catch (error) {
      console.log('Failed Deleting Product Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong'});
    }
  }

  return {
    addProduct: useCallback(addProduct, []),
    allProducts: useCallback(allProducts, []),
    getProductById: useCallback(getProductById, []),
    updateProduct: useCallback(updateProduct, []),
    searchProduct: useCallback(searchProduct, []),
    deleteProduct: useCallback(deleteProduct, []),
    isPending: state.status === STATE_STATUS.PENDING,
      isSuccess: state.status === STATE_STATUS.SUCCESS,
      isFailed: state.status === STATE_STATUS.FAILED,
      ...state,
  };
}