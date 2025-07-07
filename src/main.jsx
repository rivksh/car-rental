import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* 
 * SUMMARY: main.jsx
 * תיאור: נקודת הכניסה הראשית לאפליקציית React
 * מה הקובץ עושה:
 * - יוצר את root element של React
 * - עוטף את האפליקציה ב-StrictMode לבדיקות נוספות
 * - מעלה את קומפוננטת App הראשית
 * - קובע את ה-DOM element שבו האפליקציה תעלה
 * סטטוס: ✅ תקין - אין שגיאות
 */
