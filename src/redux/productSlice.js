import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { fetchProducts,fetchProductsById } from "../services/productService"
import axios from "axios"

// שינוי שם הפונקציה
export const getProducts = createAsyncThunk(
  "product/getAll",//action.type = מזהה ייחודי לפונקציה
  async () => {
    const res = await fetchProducts();
    return res.data;
  }
);
export const getProductById = createAsyncThunk(
    "product/getById",//action.type = מזהה ייחודי לפונקציה
    async (id) => {
      const res = await fetchProductsById(id);
      return res.data;
    }
  );
  const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
      loading: false,
      error: null,
      product:{},
      selectedProduct: null
    },
    reducers: {
      setSelectedProduct: (state, action) => {
        state.selectedProduct = action.payload;
        state.product = action.payload;
      }
    },
    // מגיע אחרי createAsyncThunk 
    extraReducers: (builder) => {
      builder
      // - לא חובה-אמצע פעולה
        .addCase(getProducts.pending, (state) => {
          state.loading = true;
        })
        // הפעולה הצליחה
        .addCase(getProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;//action.payload=res.data
          //createAsyncThunk  למה שחזר מהפונקציה של 
        })
        //- עדיף  הפעולה נכשלה
        .addCase(getProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
          state.loading = false;
          state.product = action.payload;
          state.error = null;
        })
        .addCase(getProductById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
        
    },
  });
  
  
  export const { setSelectedProduct } = productSlice.actions;
  
  // Export with alternative names for compatibility
  export { getProducts as getProduct };
  
  export default productSlice.reducer;

/* 
 * SUMMARY: productSlice.js
 * תיאור: Redux slice לניהול מצב המוצרים/רכבים במערכת
 * מה הקובץ עושה:
 * - מגדיר async thunks לפעולות מוצרים:
 *   - getProducts: שליפת כל המוצרים
 *   - getProductById: שליפת מוצר לפי ID
 * - מנהל מצב מוצרים: רשימה, מוצר נבחר, טעינה, שגיאות
 * - כולל reducer לבחירת מוצר (setSelectedProduct)
 * - מייצא alias getProduct עבור תאימות לאחור
 * - מטפל בכל המצבים: pending, fulfilled, rejected
 * סטטוס: ✅ תקין - אין שגיאות
 */