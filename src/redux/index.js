import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  stories: [],
  trendingStories: [],
  userStories: [],
  pStories: [],
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
    },
    setTrendingStories: (state, action) => {
      state.trendingStories = action.payload.trendingStories;
    },
    setUserStories: (state, action) => {
      state.userStories = action.payload.userStories;
    },
    setNewTrendingStory: (state, action) => {
      const updatedStories = state.trendingStories.map((story) => {
        if (story._id === action.payload.story._id) return action.payload.story;
        return story;
      });
      state.trendingStories = updatedStories;
    },
    setNewUserStory: (state, action) => {
      const updatedStories = state.userStories.map((story) => {
        if (story._id === action.payload.story._id) return action.payload.story;
        return story;
      });
      state.userStories = updatedStories;
    },
    setPStories: (state, action) => {
      state.pStories = action.payload.pStories
    },
    setNewPStory: (state, action) => {
      const updatedStories = state.pStories.map((story) => {
        if (story._id === action.payload.story._id) return action.payload.story;
        return story;
      });
      state.pStories = updatedStories;
    },
  },
});

export const {
  setMode,
  setStories,
  setLogin,
  setLogout,
  setStory,
  setTrendingStories,
  setUserStories,
  setNewTrendingStory,
  setNewUserStory,
  setPStories,
  setNewPStory
} = authSlice.actions;
export default authSlice.reducer;
