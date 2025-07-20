import axios from "axios";

axios.defaults.baseURL = "https://localhost:7098/api";//לשנות בהתאם

export const fetchPackages = () => axios.get("/Package/getAll")
export const fetchPackagesById=(packageId)=>{
 return   axios.get(`Package/getById/${packageId}`)
}
// export const fetchAddPackage=()=>{axios.post("addPackage")} 

/**
 * ===== סיכום קובץ packageService.js =====
 * 
 * מטרה: שירות API לניהול חבילות (Packages)
 * 
 * הגדרות:
 * - baseURL: https://localhost:7098/api
 * 
 * פונקציות API:
 * - fetchPackages: שליפת כל החבילות מהשרת
 * - fetchPackagesById: שליפת חבילה ספציפית לפי ID
 * - fetchAddPackage: (מוערת) הוספת חבילה חדשה
 * 
 * אנדפוינטים:
 * - GET /Package/getAll - קבלת כל החבילות
 * - GET /Package/getById/{id} - קבלת חבילה לפי ID
 * 
 * הערות:
 * - קובץ קצר ופשוט
 * - פונקציית הוספה מוערת וממתינה לפיתוח
 * - כל הפונקציות מחזירות Promise של axios
 * 
 * סטטוס: ✅ תקין - שירות בסיסי לחבילות
 */
