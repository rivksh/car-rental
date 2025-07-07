import axios from "axios";

// ברירת מחדל 
axios.defaults.baseURL = 'https://localhost:7098/api';
export const fetchRenting=()=>{
  return   axios.get('/Renting/getAll')
}

// קבלת מוצר לפי id
export const fetchRentingById=(Id)=>{
  return  axios.get(`/Renting/getById/${Id}`)
}

export const fetchAddRenting=(renting)=>{    
   return axios.post(`/Renting/addRenting`,renting)
}
 
export const fetchDeleteRenting=(id)=>{  
  console.log("...............",id);
   return axios.delete(`/Renting/delete/${id}`)
}
export const fetchUpdateRenting=(id)=>{  
  console.log("...............",id);
   return axios.put(`/Renting/update/${id}`)
}

/**
 * ===== סיכום קובץ rentalService.js =====
 * 
 * מטרה: שירות API לניהול השכירויות (Rentals)
 * 
 * הגדרות:
 * - baseURL: https://localhost:7098/api
 * 
 * פונקציות API:
 * - fetchRenting: שליפת כל השכירויות מהשרת
 * - fetchRentingById: שליפת השכירות ספציפית לפי ID
 * - fetchAddRenting: הוספת השכירות חדשה
 * - fetchDeleteRenting: מחיקת השכירות לפי ID
 * - fetchUpdateRenting: עדכון השכירות לפי ID
 * 
 * אנדפוינטים:
 * - GET /Renting/getAll - קבלת כל השכירויות
 * - GET /Renting/getById/{id} - קבלת השכירות לפי ID
 * - POST /Renting/addRenting - הוספת השכירות חדשה
 * - DELETE /Renting/delete/{id} - מחיקת השכירות
 * - PUT /Renting/update/{id} - עדכון השכירות
 * 
 * הערות:
 * - כל הפונקציות מחזירות Promise של axios
 * - מכיל קונסול לוגים לצורכי דיבוג
 * - תוקן: שונה axios.update ל-axios.put
 * 
 * סטטוס: ✅ תקין - תוקן ללא שגיאות קומפילציה או ESLint
 */
