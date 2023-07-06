import axios from "axios";
import { server } from "../store";

export const getAllOffers = () => async (dispatch) => {
  try {
    dispatch({ type: "offerRequest" });

    const { data } = await axios.get(`${server}/admin/offers`, {
      withCredentials: true,
    });
    dispatch({ type: "offerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "offerFail", payload: error.response.data.message });
  }
};

export const getSingleOffer = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOfferRequest" });

    const { data } = await axios.get(`${server}/admin/offer/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: "getOfferSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getOfferFail",
      payload: error.response.data.message,
    });
  }
};
