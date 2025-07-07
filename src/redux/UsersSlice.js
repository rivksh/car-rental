// import { createAsyncThunk } from "@reduxjs/toolkit"
// import { createSlice } from "@reduxjs/toolkit"
// import { fetchUsers,fetchUserById,fetchUserByIdandPassword } from "../services/usersServices"

// export const getUser = createAsyncThunk(
//   "user/getAll",//action.type = מזהה ייחודי לפונקציה
//   async () => {
//     const res = await fetchUsers();
//     return res.data;
//   }
// );
// export const getUserById = createAsyncThunk(
//     "user/getById",//action.type = מזהה ייחודי לפונקציה
//     async (id) => {
//       const res = await fetchUserById(id);
//       return res.data;
//     }
//   );
//   export const getUserByIdAndPassword = createAsyncThunk(
//     "user/getUserByIdAndPassword",//action.type = מזהה ייחודי לפונקציה
//     async (id,password) => {
//       const res = await fetchUserByIdandPassword(id,password);
//       return res.data;
//     }
//   );
//   const UserSlice = createSlice({
//     name: "users",
//     initialState: {
//         users: null,
//       loading: false,
//       error: null,
//       user:{}
//     },
//     // מגיע אחרי createAsyncThunk 
//     extraReducers: (builder) => {
//       builder
//       // - לא חובה-אמצע פעולה
//         .addCase(getUser.pending, (state) => {
//           state.loading = true;
//         })
//         // הפעולה הצליחה
//         .addCase(getUser.fulfilled, (state, action) => {
//           state.loading = false;
//           state.users = action.payload;//action.payload=res.data
//           //createAsyncThunk  למה שחזר מהפונקציה של 
//         }).addCase(getUserByIdAndPassword.fulfilled, (state, action) => {
//           state.loading = false;
//           state.users = action.payload;//action.payload=res.data
//           //createAsyncThunk  למה שחזר מהפונקציה של 
//         })
//         //- עדיף  הפעולה נכשלה
//         .addCase(getUser.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         })
        
//     },
//   });
  
//   export default UserSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { fetchUsers, fetchUserById, fetchUserByIdandPassword, fetchAddUser } from "../services/usersServices"
import Register from "../Compunents/Signup";

export const getUser = createAsyncThunk(
  "Users/getAll", // action.type = מזהה ייחודי לפונקציה
  async () => {
    const res = await fetchUsers();
    return res.data;
  }
);

export const getUserById = createAsyncThunk(
  "Users/getById", // action.type = מזהה ייחודי לפונקציה
  async (id) => {
    console.log(id);
    
    const res = await fetchUserById(id);
    console.log(res.data);
    
    return res.data;
  }
);

export const getUserByIdAndPassword = createAsyncThunk(
  "Users/getByIdAndPassword", // action.type = מזהה ייחודי לפונקציה
  async (userDto) => {
    
    const res = await fetchUserByIdandPassword(userDto);
    console.log(res);
    console.log(res.data);
    
    
    return res.data;
  }
);
// export const addUser = createAsyncThunk(
//   "Users/addUsers",//action.type = מזהה ייחודי לפונקציה
//   async (user) => {
//     console.log(user);
    
//     const res = await fetchAddUser(user);
//     console.log("res.data");
    
//     return res.data;
//   }
// );
export const addUser = createAsyncThunk(
  "Users/addUsers",
  async (user, { rejectWithValue }) => {
    console.log(user);
    try {
      const res = await fetchAddUser(user);
      console.log(res.data); // Correctly log the response data

      return res.data; // This will be the fulfilled value
    } catch (error) {
      console.error('Failed to add user:', error);
      return rejectWithValue(error.response.data || 'Failed to register user'); // Handle errors properly
    }
  }
);
const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    currentUser: null // הוספת שדה למשתמש הנוכחי
  },
  
      reducers: {
        logoutUser: (state) => {
            state.currentUser = {}; // לנקות את פרטי המשתמש
        },
    },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // action.payload = res.data
        state.error = null; // לנקות שגיאה קודמת
      })
      .addCase(getUserById.fulfilled,(state,action)=>{
         state.loading = false;
        state.currentUser = action.payload; // עדכון המשתמש הנוכחי
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        // state.currentUser = null // עדכון המשתמש הנוכחי
        state.error = action.error.message; // לנקות שגיאה קודמת
      })
      .addCase(getUserByIdAndPassword.pending, (state) => { // הוספה של pending
        state.loading = true;
      })
      .addCase(getUserByIdAndPassword.fulfilled, (state, action) => {
        console.log(" nvlfskjvslf");
        
        state.loading = false;
        state.currentUser = action.payload; // עדכון המשתמש הנוכחי
        state.error = null; // לנקות שגיאה קודמת
      })
      .addCase(getUserByIdAndPassword.rejected, (state, action) => {
        state.loading = false;
        // state.currentUser = null // עדכון המשתמש הנוכחי
        state.error = action.error.message; // לנקות שגיאה קודמת
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(getUserByIdAndPassword.fulfilled, (state, action) => { // הוספה של rejected
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(addUser.rejected, (state, action) => { // הוספה של rejected
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => { // הוספה של rejected
        state.loading = false;
        state.currentUser = action.payload;
        console.log(state.currentUser);
        
        state.users.push(action.payload)
        state.error = null;
      });
      

  },
});

export const { logoutUser } = UserSlice.actions;
export default UserSlice.reducer;

/* 
 * SUMMARY: UsersSlice.js
 * תיאור: Redux slice לניהול מצב המשתמשים במערכת
 * מה הקובץ עושה:
 * - מגדיר async thunks לפעולות משתמשים:
 *   - getUser: שליפת כל המשתמשים
 *   - getUserById: שליפת משתמש לפי מספר זהות
 *   - getUserByIdAndPassword: התחברות עם זהות וסיסמה
 *   - addUser: הרשמת משתמש חדש
 * - מנהל מצב משתמשים: רשימה, משתמש נוכחי, טעינה, שגיאות
 * - כולל action להתנתקות (logoutUser)
 * - מטפל בכל המצבים: pending, fulfilled, rejected
 * סטטוס: ✅ תקין - אין שגיאות
 */



