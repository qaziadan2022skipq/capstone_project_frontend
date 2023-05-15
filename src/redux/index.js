import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  stories: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setStories: (state, action) => {
      state.stories = action.payload.stories;
    },
    setStory: (state, action) => {
      const updatedStories = state.stories.map((story) => {
        if (story._id === action.payload.story._id) return action.payload.story;
        return story;
      });
      state.stories = updatedStories;
    }
  },
});

export const { setMode, setStories, setLogin, setLogout, setStory } = authSlice.actions;
export default authSlice.reducer;
