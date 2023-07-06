import axios from "axios";
import { server } from "../store";

export const createUserPayout =
  (userId, amount, description) => async (dispatch) => {
    try {
      dispatch({ type: "createPayoutRequest" });

      const { data } = await axios.post(
        `${server}/user-payout`,
        {
          userId,
          amount,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "createPayoutSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createPayoutFail",
        payload: error.response.data.message,
      });
    }
  };

export const getUserPayouts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "payoutRequest" });

    const { data } = await axios.post(
      `${server}/single-user-payouts`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "payoutSuccess", payload: data.payouts });
  } catch (error) {
    dispatch({ type: "payoutFail", payload: error.response.data.message });
  }
};

export const createUserEarnings =
  (userId, amount, currency, description) => async (dispatch) => {
    try {
      dispatch({ type: "createEarningRequest" });

      const { data } = await axios.post(
        `${server}/user-transaction`,
        {
          userId,
          amount,
          currency,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "createEarningSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createEarningFail",
        payload: error.response.data.message,
      });
    }
  };

export const getUserEarnings = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "earningRequest" });

    const { data } = await axios.post(
      `${server}/single-user-transaction`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "earningSuccess", payload: data.earnings });
  } catch (error) {
    dispatch({ type: "earningFail", payload: error.response.data.message });
  }
};
