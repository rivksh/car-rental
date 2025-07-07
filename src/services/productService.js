// // קריאות שרת 
// import axios from "axios";

// // ברירת מחדל 
// axios.defaults.baseURL = 'https://localhost:7098/api';

// // קבלת מוצרים
// export const fetchProducts=()=>{
//     axios.get("/Product/getAll")
// }

// // קבלת מוצר לפי id
// export const fetchProductById=(productId)=>{
//     axios.get(`/Product/getById/${productId}`)
// }
// import axios from "axios";

// axios.defaults.baseURL = "https://localhost:7098/api";//לשנות בהתאם

// export const fetchProducts = () => axios.get("/Product/getAll")
// export const fetchProductsById=(productsId)=>{
//     axios.get(`Products/getById/${productsId}`)
// }
import axios from "axios";

axios.defaults.baseURL = "https://localhost:7098/api";//לשנות בהתאם

export const fetchProducts = () => axios.get("/Product/getAll")
export const fetchProductsById=(ProductId)=>{
    return axios.get(`Product/getById/${ProductId}`)
}
// export const fetchAddProduct=()=>{axios.post("addProduct")} 

/**
 * ===== סיכום קובץ productService.js =====
 * 
 * מטרה: שירות API לניהול מוצרים (Products)
 * 
 * הגדרות:
 * - baseURL: https://localhost:7098/api
 * 
 * פונקציות API:
 * - fetchProducts: שליפת כל המוצרים מהשרת
 * - fetchProductsById: שליפת מוצר ספציפי לפי ID (לא מחזירה return!)
 * - fetchAddProduct: (מוערת) הוספת מוצר חדש
 * 
 * אנדפוינטים:
 * - GET /Product/getAll - קבלת כל המוצרים
 * - GET /Product/getById/{id} - קבלת מוצר לפי ID
 * 
 * הערות:
 * - קוד מכיל הרבה הערות מגרסאות קודמות
 * - פונקציית הוספה מוערת וממתינה לפיתוח
 * - תוקן: נוסף return ל-fetchProductsById
 * 
 * סטטוס: ✅ תקין - תוקן ללא שגיאות קומפילציה או ESLint
 */

