
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addRenting } from '../redux/rentalSlice';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPackages } from '../redux/packagesSlice';
import { deletePurchases, getPurches, updatebalance } from '../redux/purchesSlice';
import { store } from '../store/store';

const NewRental = () => {
    const location = useLocation();
    const selectedProduct = location.state ? location.state.prdct : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.User);

    // שליפת כל הרכישות של המשתמש הנוכחי מה-Redux
    const purchases = useSelector((state) =>
        state.Purchase.purchases.filter(p => String(p.userId) === String(currentUser?.id))
    );

    const [dateStart, setdateStart] = useState(null);
    const [dateEnd, setdateEnd] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [message, setMessage] = useState('');
    const [showHourglass, setShowHourglass] = useState(false);

    // טעינת חבילות ורכישות בטעינה ראשונית בלבד
    useEffect(() => {
        dispatch(getPackages());
        dispatch(getPurches());
    }, [dispatch]);

    // עדכון תצוגת השעון לפי ימים
    useEffect(() => {
        if (dateStart && dateEnd) {
            const days = (new Date(dateEnd) - new Date(dateStart)) / (1000 * 60 * 60 * 24);
            setShowHourglass(days === 0);
        }
    }, [dateStart, dateEnd]);

    // חישוב סכום הנקודות של המשתמש
    const sumBalance = () => purchases.reduce((total, purch) => total + purch.balance, 0);

    // חישוב נקודות להשכרה
    const calculateRentalPoints = () => {
        if (!selectedProduct || !dateStart || !dateEnd) return 0;
        const pointsPerDay = selectedProduct.pointForDay;
        const days = (new Date(dateEnd) - new Date(dateStart)) / (1000 * 60 * 60 * 24);

        // שבוע בדיוק
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        if ((new Date(dateEnd) - new Date(dateStart)) === oneWeekInMillis) {
            return selectedProduct.pointForWeek;
        }

        // חודש בדיוק
        const isExactlyOneMonthApart =
            (dateEnd.getFullYear() === dateStart.getFullYear() &&
                dateEnd.getMonth() === dateStart.getMonth() + 1) ||
            (dateEnd.getFullYear() === dateStart.getFullYear() + 1 &&
                dateStart.getMonth() === 11 && dateEnd.getMonth() === 0);

        if (isExactlyOneMonthApart) {
            return selectedProduct.pointForMounth;
        }

        return days * pointsPerDay;
    };

    // חישוב נקודות להשכרה לפי שעות (אם צריך)
    const calculateRentalPoints2 = () => {
        if (!selectedProduct || !startTime || !endTime) return 0;
        const pointsPerHour = selectedProduct.pointForHour;
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        if (hours === 6) {
            return selectedProduct.pointForHalfDay;
        }
        return hours * pointsPerHour;
    };

    // עדכון יתרה בפועל ומחיקת רכישות עם balance=0 (רק פעם אחת!)
    const updateBalance = async (rentalPoints) => {
        let pointsLeft = rentalPoints;
        const purchasesList = purchases.slice();

        for (let i = 0; i < purchasesList.length && pointsLeft > 0; i++) {
            const purchase = purchasesList[i];
            if (purchase.balance > 0) {
                if (purchase.balance >= pointsLeft) {
                    await dispatch(updatebalance({id:purchase.id, point:pointsLeft}));
                    pointsLeft = 0;
                } else {
                    await dispatch(updatebalance({id:purchase.id, point:purchase.balance}));
                    pointsLeft -= purchase.balance;
                }
            }
        }
        // רענון רכישות מהשרת
        await dispatch(getPurches());

        // מחק רכישות עם balance 0 (רק פעם אחת!)
        const state = store.getState();
        const zeroBalancePurchases = state.Purchase.purchases.filter(
            p => p.balance === 0 && String(p.userId) === String(currentUser?.id)
        );
        for (const purchase of zeroBalancePurchases) {
            await dispatch(deletePurchases({id:purchase.id}));
        }
        // רענון נוסף אם צריך
        await dispatch(getPurches());
    };

    // ביצוע השכרה
    const handleRental = async () => {
        if (!dateStart || !dateEnd) {
            setMessage('נא לבחור תאריכים להתחלה וסיום.');
            return;
        }

        if (new Date(dateStart) > new Date(dateEnd)) {
            setMessage('תאריך הסיום צריך להיות לאחר תאריך ההתחלה.');
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dateStart < today) {
            setMessage("תאריך ההתחלה לא יכול להיות קטן מהתאריך של היום.");
            return;
        }

        let rentalPoints = calculateRentalPoints();
        if (rentalPoints === 0 && showHourglass) {
            if (endTime <= startTime) {
                setMessage('שעת הסיום צריכה להיות לאחר שעת ההתחלה.');
                return;
            }
            rentalPoints = calculateRentalPoints2();
        }

        const userPoints = sumBalance();

        if (userPoints >= rentalPoints) {
            const result = await dispatch(addRenting({
                id: 0,
                dateStart: dateStart.toISOString(),
                dateEnd: dateEnd.toISOString(),
                point: rentalPoints,
                productId: selectedProduct.id,
                usersId: currentUser.id
            }));

            if (result.meta.requestStatus === 'fulfilled') {
                await updateBalance(rentalPoints);
                setMessage('הרכישה בוצעה בהצלחה!');
                setTimeout(() => {
                    navigate('/activeRental');
                }, 2000);
            }
        } else {
            setMessage('אין לך מספיק נקודות לביצוע ההשכרה.');
            setTimeout(() => {
                navigate('/packageList');
            }, 2000);
        }
    };

    // טיפול במצב בו הנתונים לא נטענו עדיין
    if (!selectedProduct || !currentUser) {
        return <div>טוען נתונים...</div>;
    }

    return (
        <Container maxWidth="sm" style={{ padding: '30px' }}>
            <Typography variant="h4" gutterBottom align="center">
                השכרה חדשה
            </Typography>
            <Typography variant="h6" gutterBottom>
                מוצר נבחר: {selectedProduct?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
                נקודות ליום: {selectedProduct?.pointForDay}
            </Typography>
            <Typography variant="h6" gutterBottom>
                הנקודות שלי: {sumBalance()}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="תאריך התחלה"
                            value={dateStart}
                            onChange={(newValue) => setdateStart(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="תאריך סיום"
                            value={dateEnd}
                            onChange={(newValue) => setdateEnd(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                {showHourglass && (
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="שעת התחלה"
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                )}
                {showHourglass && (
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="שעת סיום"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRental}
                    >
                        בצע השכרה
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={!!message}
                autoHideDuration={6000}
                onClose={() => setMessage('')}
                message={message}
            />
        </Container>
    );
};

export default NewRental;