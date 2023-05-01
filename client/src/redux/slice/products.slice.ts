import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ProductService } from "../../services";
import { formatErrorResponse } from "../../utils/formatErrorResponse";

export const getProductsAction = createAsyncThunk(
  "products/all",
  async (currentPage: number, thunkAPI) => {
    try {
      const data = await ProductService.getAllProducts(currentPage);
      return data.data;
    } catch (error: any) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleProductAction = createAsyncThunk(
  "product/single",
  async (id: string | undefined, thunkAPI) => {
    try {
      const response = await ProductService.getSingleProduct(id ?? "");
      return response.data;
    } catch (error: any) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: true,
  products: [],
};

const ProductSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // All product cases
    builder.addCase(getProductsAction.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(getProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsAction.rejected, (state) => {
      state.loading = false;
    });

    // Single product cases
    builder.addCase(singleProductAction.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(singleProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(singleProductAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

const { reducer } = ProductSlice;
export default reducer;
