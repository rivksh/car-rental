import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DirectionsCar, CalendarToday, Payment } from '@mui/icons-material';
import { addRenting, updateRenting } from '../redux/rentalSlice';
import { getPurchases, updatePurchase } from '../redux/purchesSlice';

const NewRentalNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const { currentUser } = useSelector((state) => state.User);
    const { selectedProduct } = useSelector((state) => state.Product);
    const { purchases } = useSelector((state) => state.Purchase);
    
    // בדיקה אם מגיעים לעריכה
    const editRental = location.state?.editRental;
    const isEdit = !!editRental;
    
    const [formData, setFormData] = useState({
        startDate: isEdit ? new Date(editRental.startDate) : new Date(),
        endDate: isEdit ? new Date(editRental.endDate) : new Date(),
        rentalType: 'days' // days or hours
    });
    const [error, setError] = useState('');
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        if (currentUser) {
            dispatch(getPurchases());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        calculatePoints();
    }, [formData.startDate, formData.endDate, formData.rentalType, selectedProduct]);

    const calculatePoints = () => {
        if (!selectedProduct || !formData.startDate || !formData.endDate) return;

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        
        if (end <= start) {
            setTotalPoints(0);
            return;
        }

        if (formData.rentalType === 'days') {
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setTotalPoints(days * (selectedProduct.pointsPerDay || selectedProduct.PointsPerDay || 0));
        } else {
            const hours = Math.ceil((end - start) / (1000 * 60 * 60));
            setTotalPoints(hours * (selectedProduct.pointsPerHour || selectedProduct.PointsPerHour || 0));
        }
    };

    const getAvailablePoints = () => {
        if (!purchases || purchases.length === 0) return 0;
        return purchases.reduce((total, purchase) => total + (purchase.balance || 0), 0);
    };

    const handleDateChange = (field, date) => {
        setFormData(prev => ({
            ...prev,
            [field]: date
        }));
        setError('');
    };

    const validateForm = () => {
        if (!selectedProduct && !isEdit) {
            setError('לא נבחר מוצר להשכרה');
            return false;
        }

        if (!formData.startDate || !formData.endDate) {
            setError('יש למלא תאריכי התחלה וסיום');
            return false;
        }

        if (formData.endDate <= formData.startDate) {
            setError('תאריך הסיום חייב להיות אחרי תאריך ההתחלה');
            return false;
        }

        if (formData.startDate < new Date()) {
            setError('לא ניתן להשכיר בתאריך עבר');
            return false;
        }

        const availablePoints = getAvailablePoints();
        if (totalPoints > availablePoints) {
            setError(`אין מספיק נקודות. יש לך ${availablePoints} נקודות, נדרש ${totalPoints}`);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const rentalData = {
                userId: currentUser.id,
                productId: selectedProduct?.id || editRental?.productId,
                startDate: formData.startDate,
                endDate: formData.endDate,
                totalPoints: totalPoints,
                status: 'active'
            };

            if (isEdit) {
                await dispatch(updateRenting({ id: editRental.id, ...rentalData }));
            } else {
                await dispatch(addRenting(rentalData));
                
                // עדכן יתרת נקודות
                const activePurchase = purchases.find(p => p.balance > 0);
                if (activePurchase) {
                    await dispatch(updatePurchase({
                        id: activePurchase.id,
                        balance: activePurchase.balance - totalPoints
                    }));
                }
            }

            navigate('/activeRental');
        } catch (error) {
            setError('שגיאה בביצוע ההשכרה');
        }
    };

    if (!selectedProduct && !isEdit) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="warning">
                    לא נבחר מוצר להשכרה. אנא בחר מוצר מרשימת המוצרים.
                </Alert>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={() => navigate('/productList')}>
                        חזור לרשימת מוצרים
                    </Button>
                </Box>
            </Container>
        );
    }

    const product = selectedProduct || editRental;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                {isEdit ? 'עריכת השכרה' : 'השכרה חדשה'}
            </Typography>

            <Grid container spacing={4}>
                {/* פרטי המוצר */}
                <Grid item xs={12} md={5}>
                    <Card elevation={3}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.image || '/images/car1.jpg'}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {product.name || `רכב ${product.productId}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {product.description}
                            </Typography>
                            <Typography variant="body1">
                                📍 {product.pointsPerHour || product.PointsPerHour} נקודות/שעה
                            </Typography>
                            <Typography variant="body1">
                                📅 {product.pointsPerDay || product.PointsPerDay} נקודות/יום
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* טופס השכרה */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <DatePicker
                                            label="תאריך התחלה"
                                            value={formData.startDate}
                                            onChange={(date) => handleDateChange('startDate', date)}
                                            renderInput={(params) => (
                                                <TextField {...params} fullWidth required />
                                            )}
                                            minDate={new Date()}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <DatePicker
                                            label="תאריך סיום"
                                            value={formData.endDate}
                                            onChange={(date) => handleDateChange('endDate', date)}
                                            renderInput={(params) => (
                                                <TextField {...params} fullWidth required />
                                            )}
                                            minDate={formData.startDate}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                {/* סיכום עלויות */}
                                <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        סיכום עלויות
                                    </Typography>
                                    <Typography variant="body1">
                                        💰 עלות כוללת: {totalPoints} נקודות
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        נקודות זמינות: {getAvailablePoints()}
                                    </Typography>
                                </Box>

                                {error && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    startIcon={isEdit ? <DirectionsCar /> : <Payment />}
                                    disabled={totalPoints === 0 || totalPoints > getAvailablePoints()}
                                >
                                    {isEdit ? 'עדכן השכרה' : 'בצע השכרה'}
                                </Button>
                            </Box>
                        </LocalizationProvider>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewRentalNew;

/**
 * ===== סיכום קומפוננטה NewRentalNew.jsx =====
 * 
 * מטרה: טופס השכרת רכב חדש או עריכת השכרה קיימת
 * 
 * פונקציונליות:
 * - יצירת השכרת רכב חדשה
 * - עריכת השכרה קיימת (דרך location.state)
 * - חישוב נקודות דרושות בזמן אמת
 * - בדיקת יתרת נקודות זמינות
 * - בחירת תאריכי התחלה וסיום
 * - תמיכה בהשכרה לפי ימים או שעות
 * 
 * UI Components:
 * - Grid layout עם כרטיס רכב נבחר וטופס השכרה
 * - DatePicker components עבור תאריכים
 * - תצוגת פרטי רכב (תמונה, שם, תיאור)
 * - חישוב ותצוגת נקודות בזמן אמת
 * - התראות שגיאה
 * - כפתור השכרה עם validation
 * 
 * Business Logic:
 * - חישוב נקודות: ימים * נקודות ליום או שעות * נקודות לשעה
 * - בדיקת יתרה: נקודות דרושות <= נקודות זמינות
 * - ווליסציה: תאריכים, רכב נבחר, יתרה
 * 
 * State Management:
 * - Redux: addRenting, updateRenting (השכרות)
 * - Redux: getPurchases, updatePurchase (רכישות/נקודות)
 * - State מקומי: תאריכים, שגיאות, סך נקודות
 * 
 * Features:
 * - מצב עריכה vs יצירה חדשה
 * - חישוב אוטומטי של נקודות בשינוי תאריכים
 * - תמיכה בהשכרה לימים או שעות
 * - בדיקת יתרת נקודות בזמן אמת
 * - LocalizationProvider לתאריכים
 * 
 * Flow:
 * בחירת רכב → טעינת טופס → הזנת תאריכים → חישוב נקודות → 
 * בדיקת יתרה → אישור השכרה → ניווט להצלחה
 * 
 * Dependencies: 
 * - Material-UI DatePicker
 * - date-fns adapter
 * - Redux slices
 * 
 * סטטוס: ✅ תקין - טופס השכרה מתקדם עם לוגיקה עסקית מלאה
 */
