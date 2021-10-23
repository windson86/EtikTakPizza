import { publicRequest, userRequest } from "../requestMetods";
import {
  getPizzasFailure,
  getPizzasStart,
  getPizzasSuccess,
} from "./pizzaRedux";

import {
  fetchPendingOrdersStart,
  fetchPendingOrdersSuccess,
  fetchPendingOrdersFailure,
} from "./ordersRedux";

export const getFavoritePizzas = async (dispatch) => {
  dispatch(getPizzasStart());
  try {
    const res = await publicRequest.get("/pizzas/all");

    dispatch(getPizzasSuccess(res.data));
  } catch (err) {
    dispatch(getPizzasFailure());
  }
};

export const getUserOrders = async (dispatch) => {
  dispatch(fetchPendingOrdersStart());
  try {
    const res = await userRequest.get("/orders/");
    //todo
    dispatch(fetchPendingOrdersSuccess(res.data));
  } catch (err) {
    dispatch(fetchPendingOrdersFailure());
  }
};
