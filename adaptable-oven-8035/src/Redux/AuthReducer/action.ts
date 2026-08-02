import { Dispatch } from "redux";
import { UserObject } from "../../constrain";
import {
  ADD_ITEM,
  AUTH_CHECKED,
  DELETE_ITEM,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
} from "./actionType";
import { api, getAccessToken, setAccessToken } from "../../api/axios";
import {
  attachOrderAddresses,
  enrichOrderProducts,
} from "../../api/orderHelpers";

const loadUserExtras = async () => {
  const [cartRes, addressRes, ordersRes] = await Promise.all([
    api.get(`/cart`).catch(() => ({ data: [] })),
    api.get(`/address`).catch(() => ({ data: [] })),
    api.get(`/orders/products`).catch(() => ({ data: [] })),
  ]);

  const enriched = await enrichOrderProducts(ordersRes.data || []);
  const orderPlaced = await attachOrderAddresses(enriched);

  return {
    addToCart: cartRes.data || [],
    address: addressRes.data || [],
    orderPlaced,
  };
};

export const getUsers = () => {
  return async (
    dispatch: Dispatch<{ type: string } | { type: string; payload: UserObject[] }>,
  ): Promise<void> => {
    dispatch({ type: USER_REQUEST });
    try {
      const response = await api.get(`/users`);
      dispatch({ type: USER_SUCCESS, payload: response.data });
    } catch {
      dispatch({ type: USER_FAILURE });
    }
  };
};

export const SignUp =
  (newUser: { name: string; email: string; password: string }) =>
  (dispatch: Dispatch<{ type: string } | { type: string; payload: any }>) => {
    dispatch({ type: LOGIN_REQUEST });
    return api
      .post(`/auth/register`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      })
      .then((response) => {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        return response.data;
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE });
        throw err;
      });
  };

export const Login =
  (credentials: { email: string; password: string }) =>
  async (dispatch: Dispatch<{ type: string } | { type: string; payload: any }>) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await api.post(`/auth/login`, credentials);
      setAccessToken(data.accessToken);

      const extras = await loadUserExtras();
      const activeUser = {
        ...data.user,
        ...extras,
      };

      dispatch({ type: LOGIN_SUCCESS, payload: activeUser });
      return activeUser;
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE });
      throw err;
    }
  };

/** Rehydrate auth from stored JWT after page refresh. */
export const restoreSession =
  () => async (dispatch: Dispatch<any>) => {
    const token = getAccessToken();
    if (!token) {
      dispatch({ type: AUTH_CHECKED });
      return;
    }

    try {
      const { data: user } = await api.get(`/auth/me`);
      const extras = await loadUserExtras();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          ...user,
          ...extras,
        },
      });
    } catch {
      setAccessToken(null);
      dispatch({ type: AUTH_CHECKED });
    }
  };

export const refreshUserData =
  () =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const current = getState().authReducer.ActiveUser;
    if (!current?.id) return;

    const extras = await loadUserExtras();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        ...current,
        ...extras,
      },
    });
  };

export const ActionToDelete = (payload: any) => {
  return { type: DELETE_ITEM, payload };
};

export const ActionToAddItem = (payload: any) => {
  return { type: ADD_ITEM, payload };
};

export {};
