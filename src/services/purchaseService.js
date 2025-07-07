import axios from "axios";

// ברירת מחדל 
axios.defaults.baseURL = 'https://localhost:7098/api';
// export const fetchPurchases=()=>{
//     axios.get("/getAll")
// }

// קבלת מוצר לפי id
export const fetchPurchaseById=(PurchaseId)=>{
  return  axios.get(`/Purchases/getById/${PurchaseId}`)
}
export const fetchAddPurchase=(purchase)=>{
  return  axios.post('/Purchases/addPurchases',purchase)
}

export const fetchPurchases = () => axios.get("/Purchases/getAll")

  export const fetchDeletePurchases=(id)=>{  
  console.log("...............",id);
   return axios.delete(`/Purchases/delete/${id}`)
}
export const fetchUpdateBalancePurchases=(balance)=>{
  return axios.put(`/Purchases/updateBalance`,{ purchaseId: balance.id, points: balance.point })
}

/**
 * ===== סיכום קובץ purchaseService.js =====
 * 
 * מטרה: שירות API לניהול רכישות (Purchases)
 * 
 * הגדרות:
 * - baseURL: https://localhost:7098/api
 * 
 * פונקציות API:
 * - fetchPurchases: שליפת כל הרכישות מהשרת
 * - fetchPurchaseById: שליפת רכישה ספציפית לפי ID
 * - fetchAddPurchase: הוספת רכישה חדשה
 * - fetchDeletePurchases: מחיקת רכישה לפי ID
 * - fetchUpdateBalancePurchases: עדכון יתרת נקודות של רכישה
 * 
 * אנדפוינטים:
 * - GET /Purchases/getAll - קבלת כל הרכישות
 * - GET /Purchases/getById/{id} - קבלת רכישה לפי ID
 * - POST /Purchases/addPurchases - הוספת רכישה חדשה
 * - DELETE /Purchases/delete/{id} - מחיקת רכישה
 * - PUT /Purchases/updateBalance - עדכון יתרת נקודות
 * 
 * הערות:
 * - כל הפונקציות מחזירות Promise של axios
 * - מכיל קונסול לוגים לצורכי דיבוג
 * - עדכון יתרה שולח purchaseId ו-points
 * 
 * סטטוס: ✅ תקין - ללא שגיאות קומפילציה או ESLint
 */