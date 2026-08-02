import {
  ADMIN_SUCCESS,
  AUTH_CHECKED,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS,
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
} from "./actionType";
import { UserObject } from "../../constrain";
import { getAccessToken, setAccessToken } from "../../api/axios";

const initialState: {
  isAdminAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  isAuth: boolean;
  authChecked: boolean;
  Users: UserObject[];
  ActiveUser: UserObject;
} = {
  isAdminAuth: false,
  isLoading: false,
  isError: false,
  isAuth: false,
  authChecked: !getAccessToken(),
  Users: [],
  ActiveUser: {
    name: "",
    email: "",
    password: "",
    addToCart: [],
    orderPlaced: [],
    address: [],
  },
};

export function authReducer(
  state = initialState,
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        authChecked: true,
        ActiveUser: payload,
        isAdminAuth: payload?.role === "admin" || state.isAdminAuth,
      };
    }
    case AUTH_CHECKED: {
      return { ...state, authChecked: true };
    }
    case ADMIN_SUCCESS: {
      return { ...state, isAdminAuth: true, isAuth: true, authChecked: true };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case LOGIN_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    case USER_REQUEST: {
      return { ...state, isLoading: true };
    }
    case USER_SUCCESS: {
      return { ...state, isLoading: false, Users: payload };
    }
    case USER_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    case LOGOUT: {
      setAccessToken(null);
      return { ...initialState, authChecked: true };
    }
    default:
      return state;
  }
}
