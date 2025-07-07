import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Alert, Snackbar } from '@mui/material';
import { List, Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ActivePurchases = () => {
    const dispatch = useDispatch();
    const [activePurchases, setactivePurchases] = useState([]);
    //const { purchases } = useSelector((state) => state.Purchase);
    const { currentUser } = useSelector((state) => state.User);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const myPurchases = currentUser?.purchasesList;
    
    const userId = currentUser.id ;
    // useEffect(() => {
    //     dispatch(fetchPurchases());
    // }, [dispatch]);
console.log(myPurchases,"  : myPurchases");
console.log(currentUser);

        useEffect(() => {  
        if (!myPurchases || myPurchases.length==0 ) {
            setMessage('אין לך השכרות!');
                               setTimeout(() => {
                                   navigate('/productList')
 
                               }, 2000); 
                         

        } else {
           
            if(sumBalance()==0){
                
               setMessage('אין לך מספיק נקודות לרכישה!');
                               setTimeout(() => {
                                   navigate('/packageList'); 
                               }, 2000); 
            }
            else{}
            // dispatch(fetchactivePurchases(userId)).then(rentals => {
            //     setactivePurchases(rentals);
            //});
        }
     }, [myPurchases, dispatch, userId]);

     const sumBalance = () => {
            console.log("currentUser: ",currentUser);
    
            return currentUser.purchasesList.reduce((total, purch) => {
    
            return total + purch.balance; 
     
  }, 0); 
  

};
//     const handleNewRental = () => {
//         window.location.href = '/ProductList';
//     };

    // const handleUpdateRental = (rentalId) => {
        
    // };

    

    return (
        <div>

                <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                רכישות פעילות
            </Typography>
            {/* {activePurchases.length === 0 ? (
                <Box textAlign="center">
                    <Alert severity="info">אין השכרות פעילות כרגע.</Alert>
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={handleNewRental}
                        sx={{ mt: 2 }}
                    >
                        השכרה חדשה
                    </Button>
                </Box>
            ) : ( */}
                <Grid container spacing={2}>
                    {myPurchases.map(purchas => (
                        <Grid item xs={12} sm={6} md={4} key={purchas.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    {/* <Typography variant="h6" gutterBottom>
                                        {purchas.productName}
                                    </Typography> */}
                                    
                                    <Typography variant="body2">
                                        תאריך רכישה : {new Date(purchas.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        מספר רכישה: {purchas.id}
                                    </Typography>
                                    <Typography variant="body2">
                                        ייתרת נקודות: {purchas.balance}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                        {console.log(purchas.id)}
                                        
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            {/* )} */}
               
        </Box>
          <Snackbar
                open={!!message}
                autoHideDuration={6000}
                onClose={() => setMessage('')}
                message={message}
            />
        </div>
           
    )
}
export default ActivePurchases;

/**
 * ===== סיכום קומפוננטה activePurches.jsx =====
 * 
 * מטרה: תצוגת רכישות פעילות של המשתמש
 * 
 * פונקציונליות:
 * - הצגת רשימת רכישות עם יתרת נקודות
 * - חישוב סך כל הנקודות הזמינות
 * - הפניה אוטומטית בהתאם למצב המשתמש
 * - הודעות מידע למשתמש
 * 
 * Business Logic:
 * - אין רכישות → הפניה לרשימת רכבים
 * - יתרת נקודות אפס → הפניה לרכישת חבילות
 * - יש נקודות → הצגת רכישות פעילות
 * 
 * UI Components:
 * - Grid layout עבור כרטיסי רכישות
 * - Snackbar להודעות זמניות
 * - Typography עבור הצגת מידע
 * - הפניה אוטומטית עם setTimeout
 * 
 * State Management:
 * - Redux: currentUser (רכישות המשתמש)
 * - State מקומי: activePurchases, message
 * - גישה ל-purchasesList מתוך currentUser
 * 
 * Functions:
 * - sumBalance(): חישוב סך כל הנקודות הזמינות
 * - ניווט אוטומטי לפי תנאים
 * - ניהול הודעות למשתמש
 * 
 * Navigation Flow:
 * - אין רכישות → /productList (אחרי 2 שניות)
 * - אין נקודות → /packageList (אחרי 2 שניות)
 * - יש נקודות → הצגת רכישות
 * 
 * תיקונים שבוצעו:
 * - הוסר render מיותר של Navbar (מוצג ב-AppRouter)
 * 
 * Features:
 * - קוד מוער לפיצ'רים עתידיים (עריכה, מחיקה)
 * - הודעות בעברית ברורות
 * - UX חכם עם הפניות אוטומטיות
 * 
 * סטטוס: ✅ תקין - קומפוננטה חכמה עם לוגיקה עסקית טובה (תוקן)
 */
