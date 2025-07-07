import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.User);
    
    // אם אין משתמש מחובר, הפנה אותו לדף ההתחברות
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }
    
    // אם יש משתמש מחובר, הצג את הקומפוננטה המבוקשת
    return children;
};

export default ProtectedRoute;

/**
 * ===== סיכום קומפוננטה ProtectedRoute.jsx =====
 * 
 * מטרה: הגנה על routes שדורשים משתמש מחובר
 * 
 * פונקציונליות:
 * - בודק אם יש משתמש מחובר במצב הגלובלי (Redux)
 * - אם אין משתמש מחובר - מפנה לדף ההתחברות (/)
 * - אם יש משתמש מחובר - מציג את הקומפוננטה המבוקשת
 * 
 * Dependencies:
 * - React Router (Navigate)
 * - Redux (useSelector)
 * - מקבל children כ-props
 * 
 * State Management:
 * - צורך באובייקט currentUser מה-Redux state
 * - מחובר ל-User slice
 * 
 * שימוש: עוטף קומפוננטות שדורשות אימות
 * 
 * סטטוס: ✅ תקין - הגנה בסיסית ויעילה על routes
 */
