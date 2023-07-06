import { Alert } from "react-native";
import { server } from "../store";
import axios from "axios";

export const login = (email, phoneNumber) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/login`,
      {
        email,
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const getMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const { data } = await axios.post(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const register =
  (name, email, phoneNumber, gender, dateOfBirth) => async (dispatch) => {
    try {
      dispatch({ type: "registerRequest" });

      const { data } = await axios.post(
        `${server}/register`,
        { name, email, phoneNumber, gender, dateOfBirth },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "registerSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "registerFail", payload: error.response.data.message });
    }
  };

export const updateUserWallet = (userId, amount) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserWalletRequest" });

    const { data } = await axios.put(
      `${server}/user/wallet`,
      { userId, amount },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "updateUserWalletSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateUserWalletFail",
      payload: error.response.data.message,
    });
  }
};

export const addRazorPayFundId =
  (userId, contactId, api) => async (dispatch) => {
    try {
      dispatch({ type: "addUserFundIdRequest" });

      const { data } = await axios.post(
        `${server}/user/addFundId`,
        { userId, contactId, api },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "addUserFundIdSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "addUserFundIdFail",
        payload: error.response.data.message,
      });
    }
  };

export const addRazorPayPayoutId =
  (userId, fundId, amount) => async (dispatch) => {
    try {
      dispatch({ type: "addUserPayoutIdRequest" });

      const { data } = await axios.post(
        `${server}/user/payout`,
        { userId, fundId, amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "addUserPayoutIdSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "addUserPayoutIdFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateRazorPayPayoutStatus =
  (userId, payoutId) => async (dispatch) => {
    try {
      dispatch({ type: "updateUserPayoutStatusRequest" });

      const { data } = await axios.put(
        `${server}/user/payout`,
        { userId, payoutId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateUserPayoutStatusSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateUserPayoutStatusFail",
        payload: error.response.data.message,
      });
    }
  };

export const getUserReport = (offer, aff_sub2) => async (dispatch) => {
  try {
    dispatch({ type: "loadUserReportRequest" });

    const { data } = await axios.post(
      `${server}/pushBackReport`,
      { offer, aff_sub2 },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "loadUserReportSuccess", payload: data.reports });
  } catch (error) {
    dispatch({
      type: "loadUserReportFail",
      payload: error.response.data.message,
    });
  }
};
