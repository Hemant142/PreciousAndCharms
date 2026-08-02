import { api } from "../../api/axios";
import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  GET_USER_SUCCESS,
  SINGLE_USER_REQ,
  SINGLE_USER_SUCCESS,
  USER_REQ,
  DELETE_DATA_FAILURE,
  DELETE_DATA_SUCCESS,
  GET_TOTAL_PAGE,
  POST_PRODUCT_SUCCESS,
} from "./actionType";
import { Action, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
import {
  enrichOrderProducts,
  formatAddress,
} from "../../api/orderHelpers";

export const fetchPage: any = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.get(`/products`, {
        params: { limit: 1000 },
      });
      dispatch({
        type: GET_TOTAL_PAGE,
        payload: response.data?.data ?? response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE });
    }
  };
};

export const fetchData: any = (page: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.get(`/products`, {
        params: { _page: page, _limit: 20 },
      });
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: response.data?.data ?? response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE });
    }
  };
};

export const deleteData = (id: number | string): any => {
  return async (dispatch: Dispatch) => {
    try {
      await api.delete(`/products/${id}`);
      dispatch({
        type: DELETE_DATA_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({ type: DELETE_DATA_FAILURE });
    }
  };
};

interface productObj {
  name: string;
  price: string;
  about: string;
  category: string;
  brand: string;
  rating: string;
  avatar: string;
  info: string;
}

type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const postProduct: any =
  (newprod: productObj): AppThunk =>
  (dispatch: Dispatch) => {
    api
      .post(`/products`, newprod)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: POST_PRODUCT_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: FETCH_DATA_FAILURE });
      });
  };

export const fetchUserData: any = (dispatch: Dispatch) => {
  dispatch({ type: USER_REQ });
  api
    .get(`/users`)
    .then((res) => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: GET_USER_SUCCESS, payload: [] });
      dispatch({ type: FETCH_DATA_FAILURE });
    });
};

export const SingleUserFetch: any =
  (id: number | string) => async (dispatch: Dispatch) => {
    if (!id) return;
    dispatch({ type: SINGLE_USER_REQ });
    try {
      // IMPORTANT: pass userId so admin sees THAT user's data, not the logged-in admin's
      const [userRes, ordersRes, addressRes, cartRes, ordersFullRes] =
        await Promise.all([
          api.get(`/users/${id}`).catch(() => ({ data: null })),
          api
            .get(`/orders/products`, { params: { userId: id } })
            .catch(() => ({ data: [] })),
          api
            .get(`/address`, { params: { userId: id } })
            .catch(() => ({ data: [] })),
          api
            .get(`/cart`, { params: { userId: id } })
            .catch(() => ({ data: [] })),
          api
            .get(`/orders`, { params: { userId: id } })
            .catch(() => ({ data: [] })),
        ]);

      const addresses = addressRes.data || [];
      const ordersFull = ordersFullRes.data || [];
      const enriched = await enrichOrderProducts(ordersRes.data || []);

      const orderPlaced = enriched.map((item: any) => {
        const order = ordersFull.find((o: any) => o.id === item.orderId);
        const addr =
          addresses.find((a: any) => a.id === order?.addressId) ||
          addresses[addresses.length - 1];
        return {
          ...item,
          shippingAddress: formatAddress(addr),
          addressId: order?.addressId,
        };
      });

      dispatch({
        type: SINGLE_USER_SUCCESS,
        payload: {
          ...(userRes.data || {}),
          id: userRes.data?.id || id,
          orderPlaced,
          address: addresses,
          addToCart: cartRes.data || [],
        },
      });
    } catch {
      dispatch({
        type: SINGLE_USER_SUCCESS,
        payload: {
          orderPlaced: [],
          address: [],
          addToCart: [],
        },
      });
    }
  };
