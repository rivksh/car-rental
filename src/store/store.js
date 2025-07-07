import { configureStore } from "@reduxjs/toolkit"
import UserReducer from "../redux/UsersSlice"
import PackageReducer from "../redux/packagesSlice"
import PurchaseReducer from '../redux/purchesSlice'
import ProductReducer from '../redux/productSlice'
import RentingReducer from '../redux/rentalSlice'

export const store = configureStore({
  reducer: {
    User: UserReducer,
    Package: PackageReducer,
    Purchase: PurchaseReducer,
    Product: ProductReducer,
    Renting: RentingReducer
  }
});

/* 
 * SUMMARY: store.js
 * תיאור: הגדרת Redux Store המרכזי לניהול מצב האפליקציה
 * מה הקובץ עושה:
 * - יוצר Redux store מרכזי עם configureStore של Redux Toolkit
 * - מחבר 5 reducers לניהול מצבים שונים:
 *   - User: ניהול משתמשים (התחברות, הרשמה)
 *   - Package: ניהול חבילות השכרה
 *   - Purchase: ניהול רכישות ותשלומים
 *   - Product: ניהול מוצרים/רכבים
 *   - Renting: ניהול השכרות פעילות
 * סטטוס: ✅ תקין - אין שגיאות
 */
