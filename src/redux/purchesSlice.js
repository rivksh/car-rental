import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { fetchPurchases,fetchPurchaseById, fetchAddPurchase, fetchDeletePurchases, fetchUpdateBalancePurchases } from "../services/purchaseService"
import axios from "axios"

export const getPurches = createAsyncThunk(
  "purchases/getAll",//action.type = מזהה ייחודי לפונקציה
  async () => {
    const res = await fetchPurchases();
    return res.data;
  }
);

export const updatebalance = createAsyncThunk(
  "purchases/updateBalance",//action.type = מזהה ייחודי לפונקציה
  async (balance) => {
    const res = await fetchUpdateBalancePurchases(balance);
    return res.data;
  }
);
export const deletePurchases = createAsyncThunk(
  
  "purchases/deletePurchases",
  async (id, { rejectWithValue }) => {
    try {
      
      const res = await fetchDeletePurchases(id);
    console.log(res," : res********");

      return res.data; 
    } catch (error) {
      console.error('Failed to delete Purchases:', error);
      return rejectWithValue(error.response.data || 'Failed to delete Purchases'); 
    }
  }
);


export const getPurchesById = createAsyncThunk(
    "purchases/getById",//action.type = מזהה ייחודי לפונקציה
    async (id) => {
      const res = await fetchPurchaseById(id);
      return res.data;
    }
  );
  export const addPurchase = createAsyncThunk(
    "purchases/addPurchase",//action.type = מזהה ייחודי לפונקציה
    async (purchase, { rejectWithValue }) => {
      console.log(purchase);
      try {
      const res = await fetchAddPurchase(purchase);
      console.log(res.data);
      
      return res.data;

      }catch (error) {
      console.error('Failed to add purchase:', error);
      return rejectWithValue(error.response.data || 'Failed to register purchase'); 
    }
    }
  );


  const purchaseSlice = createSlice({
    name: "purchases",
    initialState: {
        purchases: [],
      loading: false,
      error: null,
      purchase:null
    },
    // מגיע אחרי createAsyncThunk 
    extraReducers: (builder) => {
      builder
      // - לא חובה-אמצע פעולה
        .addCase(getPurches.pending, (state) => {
          state.loading = true;
        })
        // הפעולה הצליחה
        .addCase(getPurches.fulfilled, (state, action) => {
          state.loading = false;
          state.purchases = action.payload;//action.payload=res.data
          //createAsyncThunk  למה שחזר מהפונקציה של 
        })
        //- עדיף  הפעולה נכשלה
        .addCase(getPurches.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(addPurchase.fulfilled,(state, action) => {
            state.loading = false;
          state.purchase = action.payload;
           state.purchases.push(action.payload)
           state.error = null;
        })
        .addCase(deletePurchases.rejected, (state, action) => { 
                console.log("action.error.message:   "+action.error.message);
                state.loading = false;
                state.error = action.error.message;
              })
             .addCase(deletePurchases.fulfilled, (state, action) => { 
    state.loading = false;
    state.purchase = action.payload;
    state.error = null;
   console.log("action.meta.arg:   "+action.meta.arg);
    state.purchases = state.purchases.filter(p => p.id !== action.meta.arg);

              }).addCase(updatebalance.rejected, (state, action) => {
              state.loading = false;    
              state.error = action.error.message;
             }
               ).addCase(updatebalance.fulfilled, (state, action) => {     
                state.loading = false;
                state.purchase = action.payload;
                state.error = null;
              
                // עדכון ה-balance במערך purchases
                const updated = action.payload;
                const idx = state.purchases.findIndex(p => p.id === updated.id);
                if (idx !== -1) {
                  state.purchases[idx] = { ...state.purchases[idx], ...updated };
  }
})
              ;
    },
  });
  
  // Export with alternative names for compatibility
  export { getPurches as getPurchases };
  export { updatebalance as updatePurchase };
  
  export default purchaseSlice.reducer;
  
/**
 * ===== סיכום קובץ purchesSlice.js =====
 * 
 * מטרה: ניהול מצב הרכישות (Purchases) במערכת Redux
 * 
 * Async Thunks:
 * - getPurches: שליפת כל הרכישות מהשרת
 * - updatebalance: עדכון יתרה של רכישה
 * - deletePurchases: מחיקת רכישה לפי ID
 * - getPurchesById: שליפת רכישה ספציפית לפי ID
 * - addPurchase: הוספת רכישה חדשה
 * 
 * State:
 * - purchases: מערך של כל הרכישות
 * - loading: מצב טעינה
 * - error: הודעות שגיאה
 * - purchase: רכישה נוכחית שנוספה/עודכנה
 * 
 * פיצ'רים:
 * - טיפול באירועים אסינכרוניים (pending, fulfilled, rejected)
 * - עדכון מקומי של מצב הרכישות אחרי כל פעולה
 * - ניהול שגיאות עם rejectWithValue
 * - פילטור רכישות שנמחקו מהמערך
 * - עדכון יתרה בצורה immutable
 * 
 * סטטוס: ✅ תקין - ללא שגיאות קומפילציה או ESLint
 */
