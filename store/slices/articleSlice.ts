import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ArticleState {
  selectedArticle: Article | null;
}

const initialState: ArticleState = {
  selectedArticle: null,
};

const articleSlice = createSlice({
  name: "Article",
  initialState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<Article>) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;
