import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { 
    DirectionsCar, 
    History, 
    CalendarToday,
    ShoppingCart 
} from '@mui/icons-material';
import { getRentals } from '../redux/rentalSlice';

const RentalHistorysNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.User);
    const { rentings } = useSelector((state) => state.Renting);

    useEffect(() => {
        if (currentUser) {
            dispatch(getRentals());
        }
    }, [dispatch, currentUser]);

    // כל ההשכרות של המשתמש
    const userRentals = rentings?.filter(rental => 
        rental.userId === currentUser?.id
    ) || [];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL');
    };

    const getRentalStatus = (rental) => {
        const now = new Date();
        const startDate = new Date(rental.startDate);
        const endDate = new Date(rental.endDate);
        
        if (now < startDate) return { text: 'עתיד', color: 'info' };
        if (now >= startDate && now <= endDate) return { text: 'פעיל', color: 'success' };
        return { text: 'הסתיים', color: 'default' };
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1">
                    היסטוריית השכרות
                </Typography>
                
                <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => navigate('/packageList')}
                >
                    רכישת חבילה חדשה
                </Button>
            </Box>

            {userRentals.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <History sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        אין השכרות קודמות
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        התחל את ההשכרה הראשונה שלך עכשיו!
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<DirectionsCar />}
                        onClick={() => navigate('/productList')}
                        size="large"
                    >
                        השכר רכב עכשיו
                    </Button>
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                    מוצר
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                    תאריך התחלה
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                    תאריך סיום
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                    עלות נקודות
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                    סטטוס
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userRentals.map((rental) => {
                                const status = getRentalStatus(rental);
                                return (
                                    <TableRow 
                                        key={rental.id}
                                        sx={{ 
                                            '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                            '&:hover': { bgcolor: 'action.selected' }
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
                                                {rental.productName || `רכב ${rental.productId}`}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
                                                {formatDate(rental.startDate)}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
                                                {formatDate(rental.endDate)}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="primary" fontWeight="bold">
                                                {rental.totalPoints} נקודות
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={status.text} 
                                                color={status.color}
                                                size="small" 
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/packageList')}
                    sx={{ mr: 2 }}
                >
                    רכישת חבילה חדשה
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/productList')}
                >
                    השכרה חדשה
                </Button>
            </Box>
        </Container>
    );
};

export default RentalHistorysNew;
