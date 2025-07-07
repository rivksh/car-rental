import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Box,
    Alert,
    Chip,
    IconButton
} from '@mui/material';
import { 
    DirectionsCar, 
    Add, 
    Edit, 
    Delete, 
    CalendarToday,
    AccessTime 
} from '@mui/icons-material';
import { getRentals, deleteRenting, updateRenting } from '../redux/rentalSlice';
import { getPurchases } from '../redux/purchesSlice';

const ActiveRentalNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.User);
    const { rentings } = useSelector((state) => state.Renting);
    const { purchases } = useSelector((state) => state.Purchase);

    useEffect(() => {
        if (currentUser) {
            dispatch(getRentals());
            dispatch(getPurchases());
        }
    }, [dispatch, currentUser]);

    // בדיקת חבילה פעילה
    const hasActivePackage = () => {
        if (!purchases || purchases.length === 0) return false;
        return purchases.some(purchase => purchase.balance > 0);
    };

    // השכרות פעילות של המשתמש הנוכחי
    const activeRentals = rentings?.filter(rental => 
        rental.userId === currentUser?.id && 
        new Date(rental.endDate) >= new Date()
    ) || [];

    const handleNewRental = () => {
        if (!hasActivePackage()) {
            navigate('/packageList');
            return;
        }
        navigate('/productList');
    };

    const handleEditRental = (rental) => {
        // בדוק אם ההשכרה עדיין לא התחילה
        const startDate = new Date(rental.startDate);
        const now = new Date();
        
        if (startDate > now) {
            navigate('/newRental', { state: { editRental: rental } });
        } else {
            alert('לא ניתן לערוך השכרה שכבר התחילה');
        }
    };

    const handleDeleteRental = async (rentalId) => {
        if (window.confirm('האם אתה בטוח שברצונך לבטל את ההשכרה?')) {
            try {
                await dispatch(deleteRenting(rentalId));
                alert('ההשכרה בוטלה בהצלחה');
            } catch (error) {
                alert('שגיאה בביטול ההשכרה');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL');
    };

    const getRentalStatus = (rental) => {
        const now = new Date();
        const startDate = new Date(rental.startDate);
        const endDate = new Date(rental.endDate);
        
        if (now < startDate) return { text: 'ממתין', color: 'warning' };
        if (now >= startDate && now <= endDate) return { text: 'פעיל', color: 'success' };
        return { text: 'הסתיים', color: 'default' };
    };

    // אם אין חבילה פעילה
    if (!hasActivePackage()) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    אין לך חבילה פעילה. יש לרכוש חבילה כדי להתחיל להשכיר רכבים.
                </Alert>
                
                <Box sx={{ textAlign: 'center' }}>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => navigate('/packageList')}
                    >
                        לרכישת חבילה
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1">
                    השכרות פעילות
                </Typography>
                
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleNewRental}
                    size="large"
                >
                    השכרה חדשה
                </Button>
            </Box>

            {activeRentals.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        אין לך השכרות פעילות
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        התחל את ההשכרה הראשונה שלך עכשיו!
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<DirectionsCar />}
                        onClick={handleNewRental}
                        size="large"
                    >
                        השכר רכב עכשיו
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {activeRentals.map((rental) => {
                        const status = getRentalStatus(rental);
                        return (
                            <Grid item xs={12} md={6} key={rental.id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Typography variant="h6">
                                                {rental.productName || `רכב ${rental.productId}`}
                                            </Typography>
                                            <Chip 
                                                label={status.text} 
                                                color={status.color}
                                                size="small" 
                                            />
                                        </Box>
                                        
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
                                                <Typography variant="body2">
                                                    התחלה: {formatDate(rental.startDate)}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <AccessTime sx={{ mr: 1, fontSize: 16 }} />
                                                <Typography variant="body2">
                                                    סיום: {formatDate(rental.endDate)}
                                                </Typography>
                                            </Box>
                                            
                                            <Typography variant="body2" color="primary">
                                                עלות: {rental.totalPoints} נקודות
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    
                                    <CardActions>
                                        <IconButton 
                                            color="primary"
                                            onClick={() => handleEditRental(rental)}
                                            disabled={new Date(rental.startDate) <= new Date()}
                                        >
                                            <Edit />
                                        </IconButton>
                                        
                                        <IconButton 
                                            color="error"
                                            onClick={() => handleDeleteRental(rental.id)}
                                            disabled={new Date(rental.startDate) <= new Date()}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default ActiveRentalNew;
