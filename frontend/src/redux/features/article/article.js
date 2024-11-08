import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../axios/axios";

export const getArticles = createAsyncThunk(
    "articles/getArticles",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/article");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getArticle = createAsyncThunk(
    "articles/getArticle",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/article/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const createArticle = createAsyncThunk(
    "articles/createArticle",
    async (article, { rejectWithValue }) => {
        try {
            const response = await api.post("/article", article);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateArticle = createAsyncThunk(
    "articles/updateArticle",
    async (article, { rejectWithValue }) => {
        try {
            const response = await api.put(`/article/${article.id}`, article);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    "articles/deleteArticle",
    async (articleId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/article/${articleId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const articleSlice = createSlice({
    name: "article",
    initialState: {
        articles: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload;
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload;
            })
            .addCase(getArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.articles.push(action.payload);
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                const index = state.articles.findIndex((article) => article.id === action.payload.id);
                if (index !== -1) {
                    state.articles[index] = action.payload;
                }
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.articles = state.articles.filter((article) => article.id !== action.meta.arg);
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.error = action.payload;
            });

    },
});

export default articleSlice.reducer;
