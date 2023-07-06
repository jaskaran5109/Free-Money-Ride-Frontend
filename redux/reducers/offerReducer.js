import { createReducer } from "@reduxjs/toolkit";

export const offerReducer = createReducer(
  {},
  {
    offerRequest: (state) => {
      state.loading = true;
    },
    offerSuccess: (state, action) => {
      state.loading = false;
      state.offers = action.payload.Offers;
    },
    offerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    getOfferRequest: (state) => {
      state.loading = true;
    },
    getOfferSuccess: (state, action) => {
      state.loading = false;
      state.offer = action.payload.Offer;
    },
    getOfferFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
