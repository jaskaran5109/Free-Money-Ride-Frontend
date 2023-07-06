import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { offerReducer } from "./reducers/offerReducer";
import { payoutReducer } from "./reducers/payoutReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    offer: offerReducer,
    payout: payoutReducer,
  },
});

export default store;

export const server = "https://free-money-ride.onrender.com/api";
