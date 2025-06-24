import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user", //name of the slice
  initialState,
  //upon actions, the state will be updated
  //reducers are functions that take the current state and an action, and return a new state
  reducers: {
    //actions are functions that will be dispatched to update the state
    //signInStart, signInSuccess, signInFailure are actions that will be dispatched
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
