import { createReducer } from "@reduxjs/toolkit";

export const payoutReducer = createReducer(
  {},
  {
    createPayoutRequest: (state) => {
      state.loading = true;
    },
    createPayoutSuccess: (state, action) => {
      state.loading = false;
      state.payout = action.payload.payout;
    },
    createPayoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    payoutRequest: (state) => {
      state.loading = true;
    },
    payoutSuccess: (state, action) => {
      state.loading = false;
      state.payouts = action.payload;
    },
    payoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    createEarningRequest: (state) => {
      state.loading = true;
    },
    createEarningSuccess: (state, action) => {
      state.loading = false;
      state.earning = action.payload.earning;
    },
    createEarningFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    earningRequest: (state) => {
      state.loading = true;
    },
    earningSuccess: (state, action) => {
      state.loading = false;
      state.earnings = action.payload;
    },
    earningFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
