import axios from "axios";

// ברירת מחדל 
axios.defaults.baseURL = 'https://localhost:7098/api';
export const fetchUsers=()=>{
  return   axios.get('/Users/getAll')
}

// קבלת מוצר לפי id
export const fetchUserById=(UserId)=>{
  return  axios.get(`/Users/getById/${UserId}`)
}

// export const fetchUserByIdandPassword=(id,password)=>{
//     axios.get(`/Users/getByIdAndPassword`,{id,password})
// }
export const fetchUserByIdandPassword = (userDto) => {
    return axios.post(`/Users/getByIdAndPassword`,userDto);
}

export const fetchAddUser=(user)=>{    
   return axios.post(`/Users/addUsers`,user)
}

/**
 * ===== סיכום קובץ usersServices.js =====
 * 
 * מטרה: שירות API לניהול משתמשים (Users)
 * 
 * הגדרות:
 * - baseURL: https://localhost:7098/api
 * 
 * פונקציות API:
 * - fetchUsers: שליפת כל המשתמשים מהשרת
 * - fetchUserById: שליפת משתמש ספציפי לפי ID
 * - fetchUserByIdandPassword: התחברות משתמש עם ID וסיסמה
 * - fetchAddUser: הוספת משתמש חדש
 * 
 * אנדפוינטים:
 * - GET /Users/getAll - קבלת כל המשתמשים
 * - GET /Users/getById/{id} - קבלת משתמש לפי ID
 * - POST /Users/getByIdAndPassword - בדיקת התחברות
 * - POST /Users/addUsers - הוספת משתמש חדש
 * 
 * הערות:
 * - כל הפונקציות מחזירות Promise של axios
 * - מכיל קוד מוער של גרסה ישנה של התחברות
 * - התחברות דרך POST במקום GET (אבטחה טובה יותר)
 * - שולח userDto להתחברות
 * 
 * סטטוס: ✅ תקין - ללא שגיאות קומפילציה או ESLint
 */
