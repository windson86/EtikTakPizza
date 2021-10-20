import { publicRequest } from "../requestMetods";
import {
  getPizzasFailure,
  getPizzasStart,
  getPizzasSuccess,
} from "./pizzaRedux";

export const getFavoritePizzas = async (dispatch) => {
  dispatch(getPizzasStart());
  try {
    const res = await publicRequest.get("/pizzas/all");

    dispatch(getPizzasSuccess(res.data));
  } catch (err) {
    dispatch(getPizzasFailure());
  }
};
