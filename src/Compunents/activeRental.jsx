import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Alert,Snackbar } from '@mui/material';
import { List, Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchActiveRentals, fetchPurchases } from './actions'; // בהנחה שפעולות אלו מוגדרות בקובץ הפעולות של Redux 
import Navbar from './navBar';
import { useNavigate } from 'react-router-dom';
import {deleteRenting} from  '../redux/rentalSlice'

const ActiveRental = () => {
    const dispatch = useDispatch();
    const [activeRentals, setActiveRentals] = useState([]);
    //const { purchases } = useSelector((state) => state.Purchase);
    const { currentUser } = useSelector((state) => state.User);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const myRentings = currentUser?.rentingList;
    
    const userId = currentUser.id ;
    // useEffect(() => {
    //     dispatch(fetchPurchases());
    // }, [dispatch]);
console.log(myRentings,"  : myRentings");
console.log(currentUser);

        useEffect(() => {  
        if (!myRentings || myRentings.length==0 ) {
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
            // dispatch(fetchActiveRentals(userId)).then(rentals => {
            //     setActiveRentals(rentals);
            //});
        }
     }, [myRentings, dispatch, userId]);

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

    const handleDeleteRental = (rentalId,dateStart) => {
        console.log(rentalId," : rentalId");
      if(new Date(dateStart)>new Date())  
        dispatch(deleteRenting(rentalId))
    else{
         setMessage('אין אפשרות למחוק השכרה פעילה');
           setTimeout(() => {2000}); 
    }
    };

    return (
        <div>

                <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                השכרות פעילות
            </Typography>
            {/* {activeRentals.length === 0 ? (
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
                    {myRentings.map(rental => (
                        <Grid item xs={12} sm={6} md={4} key={rental.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    {/* <Typography variant="h6" gutterBottom>
                                        {rental.productName}
                                    </Typography> */}
                                    <Typography variant="body2">
                                        תאריך תחילת השכרה: {new Date(rental.dateStart).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        תאריך סיום השכרה: {new Date(rental.dateEnd).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        מספר השכרה: {rental.id}
                                    </Typography>
                                    <Typography variant="body2">
                                        ייתרת נקודות: {rental.point}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<Edit />}
                                            onClick={() => handleUpdateRental(rental.id)}
                                        >
                                            עדכון
                                        </Button>
                                        {console.log(rental.id)}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<Delete />}
                                            
                                            
                                            onClick={() => handleDeleteRental(rental.id,rental.dateStart)}
                                        >
                                            ביטול
                                        </Button>
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
            <Navbar/>
        </div>
           
    )
}
export default ActiveRental;
