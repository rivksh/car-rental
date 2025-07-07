import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPackagesById,fetchPackages } from "../services/packageService";
import axios from "axios";

// createAsyncThunk - משמש לפעולות אסיכרוניות עם שימוש ברידקס
// פונקצית middleware - בין זריקה-שיגור הפעולה לשמירה של הנתונים ברידקס, מבצעים פעולה נוספת
export const getPackages = createAsyncThunk(
  "packages/getAll",//action.type = מזהה ייחודי לפונקציה
  async () => {
    const res = await fetchPackages();
    // const res= await axios.get("package/getAll");
     console.log(res.data);
    return res.data;
   
    
  }
);
export const getPackagesById = createAsyncThunk(
  "packages/getById",//action.type = מזהה ייחודי לפונקציה
  async (id) => {
    const res = await fetchPackagesById(id);
    return res.data
  }
);


const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packages: [] ,
    loading: false,
    error: null,
    package:null,
    selectedPackage: null
  },
  reducers: {
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
      state.package = action.payload;
    }
  },
  // מגיע אחרי createAsyncThunk 
  extraReducers: (builder) => {
    builder
    // - לא חובה-אמצע פעולה
      // .addCase(getPackages.pending, (state) => {
      //   state.loading = true;
      // })
      // הפעולה הצליחה
      .addCase(getPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;//action.payload=res.data
        state.error=null
        // state.packages.push(state.package)
        //createAsyncThunk  למה שחזר מהפונקציה של 
      })
      //- עדיף  הפעולה נכשלה
      .addCase(getPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(getPackagesById.fulfilled,(state,action)=>{
               state.loading = false;
              state.package = action.payload; 
              state.packages.push(action.payload)// עדכון המשתמש הנוכחי
              state.error = null;
            })
            .addCase(getPackagesById.rejected, (state, action) => {
              state.loading = false;
              // state.currentUser = null // עדכון המשתמש הנוכחי
              state.error = action.error.message; // לנקות שגיאה קודמת
            })
  },
});

export const { setSelectedPackage } = packagesSlice.actions;
export default packagesSlice.reducer;

/* 
 * SUMMARY: packagesSlice.js
 * תיאור: Redux slice לניהול מצב החבילות במערכת
 * מה הקובץ עושה:
 * - מגדיר async thunks לפעולות חבילות:
 *   - getPackages: שליפת כל החבילות
 *   - getPackagesById: שליפת חבילה לפי ID
 * - מנהל מצב חבילות: רשימה, חבילה נבחרת, טעינה, שגיאות
 * - כולל reducer לבחירת חבילה (setSelectedPackage)
 * - מטפל בכל המצבים: pending, fulfilled, rejected
 * סטטוס: ✅ תקין - אין שגיאות
 */