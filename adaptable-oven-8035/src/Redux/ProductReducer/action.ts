import { api } from "../../api/axios";
import {
  ADDRESS_FAILURE,
  ADDRESS_REQUEST,
  ADDRESS_SUCCESS,
  GET_PRODUCT_SUCCESS,
  PRODUCT_FAILURE,
  PRODUCT_REQUEST,
} from "./actionType";

export const requestAction = () => {
  return { type: PRODUCT_REQUEST };
};

export const getSuccessAction = (payload: any) => {
  return { type: GET_PRODUCT_SUCCESS, payload };
};

export const failureAction = () => {
  return { type: PRODUCT_FAILURE };
};

export const getProducts: any =
  (paramsObj: any) =>
  (dispatch: any): void => {
    dispatch(requestAction());
    const params = paramsObj?.params || {};

    api
      .get(`/products`, { params })
      .then((res) => {
        const data = res.data?.data ?? res.data;
        const totalPages =
          res.data?.totalPages ??
          Math.ceil((res.data?.total || data.length) / (params._limit || 12));
        dispatch(
          getSuccessAction({
            product: data,
            totalPages: totalPages || 1,
          }),
        );
      })
      .catch((err) => {
        dispatch(failureAction());
        console.log(err);
      });
  };

export const postProduct = () => (dispatch: any) => {
  dispatch({ type: ADDRESS_REQUEST });
  api
    .post("/products", {})
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ADDRESS_SUCCESS });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: ADDRESS_FAILURE, payload: err.message });
    });
};
