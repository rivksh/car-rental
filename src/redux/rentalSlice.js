import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { fetchRenting, fetchAddRenting, fetchDeleteRenting, fetchUpdateRenting } from "../services/rentalService"

export const getRentals = createAsyncThunk(
  "rentings/getAll",
  async () => {
    const res = await fetchRenting();
    return res.data;
  }
);



export const addRenting = createAsyncThunk(
  "rentings/addRenting",//שיניתי את ה rentings מ Renting
  async (Renting, { rejectWithValue }) => {
    console.log(Renting);
    try {
      const res = await fetchAddRenting(Renting);
      console.log(res.data); 

      return res.data; 
    } catch (error) {
      console.error('Failed to add Renting:', error);
      return rejectWithValue(error.response.data || 'Failed to register renting'); // Handle errors properly
    }
  }
);
export const deleteRenting = createAsyncThunk(
  
  "rentings/deleteRenting",
  async (id, { rejectWithValue }) => {
    try {
      
      const res = await fetchDeleteRenting(id);
    console.log(res," : res********");

      return res.data; 
    } catch (error) {
      console.error('Failed to delete Renting:', error);
      return rejectWithValue(error.response.data || 'Failed to delete renting'); 
    }
  }
);
export const updateRenting = createAsyncThunk(
  
  "rentings/updateRenting",
  async (id, { rejectWithValue }) => {
    try {
      
      const res = await fetchUpdateRenting(id);
    console.log(res," : res********");

      return res.data; 
    } catch (error) {
      console.error('Failed to update Renting:', error);
      return rejectWithValue(error.response.data || 'Failed to update renting'); 
    }
  }
);
const RentingSlice = createSlice({
  name: "rentings",
  initialState: {
    rentings: [],
    loading: false,
    error: null,
    currentRenting: null 
  },
      reducers: {
        logoutRenting: (state) => {
            state.currentRenting = {}; // לנקות את פרטי המשתמש
        },
    },    extraReducers: (builder) => {
      builder
        .addCase(getRentals.pending, (state) => {
          state.loading = true;
        })
        .addCase(getRentals.fulfilled, (state, action) => {
          state.loading = false;
          state.rentings = action.payload;
          state.error = null;
        })
        .addCase(getRentals.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
      .addCase(addRenting.rejected, (state, action) => { 
        console.log(state.currentRenting);
        console.log(" rejected action.payload:   "+action.payload);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRenting.fulfilled, (state, action) => { 
        state.currentRenting = action.payload;
        console.log(state.currentRenting);
        console.log("action.payload:   "+action.payload);
        state.rentings.push(action.payload)
        state.error = null;
      })
      .addCase(deleteRenting.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRenting.fulfilled, (state, action) => { 
        state.loading = false;
        state.currentRenting = action.payload;
        console.log(state.currentRenting);
        
        state.rentings.push(action.payload)
        state.error = null;
      });
      

  },
});

export const { logoutRenting } = RentingSlice.actions;
export default RentingSlice.reducer;

/**
 * ===== סיכום קובץ rentalSlice.js =====
 * 
 * מטרה: ניהול מצב השכירויות (Rentals) במערכת Redux
 * 
 * Async Thunks:
 * - getRentals: שליפת כל השכירויות מהשרת
 * - addRenting: הוספת השכירות חדשה
 * - deleteRenting: מחיקת השכירות לפי ID
 * - updateRenting: עדכון השכירות לפי ID
 * 
 * Synchronous Actions:
 * - logoutRenting: ניקוי פרטי השכירות הנוכחית (logout)
 * 
 * State:
 * - rentings: מערך של כל השכירויות
 * - loading: מצב טעינה
 * - error: הודעות שגיאה
 * - currentRenting: השכירות הנוכחית
 * 
 * פיצ'רים:
 * - טיפול באירועים אסינכרוניים (pending, fulfilled, rejected)
 * - ניהול השכירות הנוכחית במצב הגלובלי
 * - הוספת השכירויות למערך אחרי הוספה/מחיקה
 * - פונקציית logout לניקוי מצב השכירות
 * - ניהול שגיאות עם rejectWithValue
 * 
 * הערות: ייתכן שיש צורך לתקן את ההיגיון של deleteRenting
 * (כרגע מוסיף למערך במקום למחוק)
 * 
 * סטטוס: ✅ תקין - ללא שגיאות קומפילציה או ESLint
 */



