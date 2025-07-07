import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

// Import components
import Signin from './Signin';
import Register from './Register';
import PackageList from './PackageListNew';
import ProductList from './ProductListNew';
import NewRental from './NewRentalNew';
import ActiveRental from './ActiveRentalNew';
import RentalHistorys from './RentalHistorysNew';
import HomePage from './HomePageNew';
import CreditCardForm from './CreditCardForm';
import SuccessPage from './SuccessPage';
import SupportComponent from './help';
import ActivePurchases from './activePurches';
import Navbar from './navBar';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
    const { currentUser } = useSelector((state) => state.User);

    return (
        <Router>
            {/* הצג את ה-Navbar רק אם המשתמש מחובר */}
            {currentUser && <Navbar />}
            
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <Routes>
                    {/* דפים ציבוריים */}
                    <Route path="/" element={<Signin />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* דפים מוגנים */}
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/packageList" element={
                        <ProtectedRoute>
                            <PackageList />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/productList" element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/newRental" element={
                        <ProtectedRoute>
                            <NewRental />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/activeRental" element={
                        <ProtectedRoute>
                            <ActiveRental />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/rentalHistorys" element={
                        <ProtectedRoute>
                            <RentalHistorys />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/activePurchases" element={
                        <ProtectedRoute>
                            <ActivePurchases />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/creditCard" element={
                        <ProtectedRoute>
                            <CreditCardForm />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/success" element={
                        <ProtectedRoute>
                            <SuccessPage />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/help" element={
                        <ProtectedRoute>
                            <SupportComponent />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Box>
        </Router>
    );
};

export default AppRouter;

/**
 * ===== סיכום קומפוננטה AppRouter.jsx =====
 * 
 * מטרה: ניהול ניתוב (Routing) ראשי של האפליקציה
 * 
 * פונקציונליות:
 * - מגדיר את כל ה-routes של האפליקציה
 * - מחלק בין דפים ציבוריים (התחברות, הרשמה) לדפים מוגנים
 * - מציג Navbar רק למשתמשים מחוברים
 * - עוטף דפים מוגנים ב-ProtectedRoute
 * 
 * Routes:
 * - דפים ציבוריים: /, /register
 * - דפים מוגנים: /home, /packageList, /productList, /newRental, 
 *   /activeRental, /rentalHistorys, /activePurchases, /creditCard, 
 *   /success, /help
 * 
 * Components:
 * - משתמש בקומפוננטות החדשות (עם סיומת New)
 * - מיבא את כל הקומפוננטות הנדרשות
 * - משתמש ב-Material-UI Box לעיצוב
 * 
 * State Management:
 * - מחובר ל-Redux User slice
 * - בודק מצב משתמש מחובר להצגת Navbar
 * 
 * סטטוס: ✅ תקין - ניתוב מלא ומאורגן עם הגנה מתאימה
 */
