import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

/* 
 * SUMMARY: vite.config.js
 * תיאור: קובץ תצורה של Vite לפרויקט React
 * מה הקובץ עושה:
 * - מגדיר תצורת Vite עבור פיתוח ובנייה
 * - כולל פלאגין React עבור תמיכה ב-JSX ו-Fast Refresh
 * - מאפשר פיתוח מהיר עם Hot Module Replacement (HMR)
 * סטטוס: ✅ תקין - אין שגיאות
 */