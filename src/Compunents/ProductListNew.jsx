import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
    Chip
} from '@mui/material';
import { DirectionsCar, Speed, Schedule } from '@mui/icons-material';
import { getProducts, setSelectedProduct } from '../redux/productSlice';

const ProductListNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector((state) => state.Product);
    const { currentUser } = useSelector((state) => state.User);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleRental = (product) => {
        if (!currentUser) {
            navigate('/');
            return;
        }
        
        dispatch(setSelectedProduct(product));
        navigate('/newRental');
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress size={60} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">שגיאה בטעינת המוצרים: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                רשימת רכבים להשכרה
            </Typography>
            
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                בחר את הרכב המושלם עבורך
            </Typography>

            <Grid container spacing={3}>
                {products && products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card 
                            elevation={3}
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image || '/images/car1.jpg'}
                                alt={product.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    {product.popular && (
                                        <Chip 
                                            label="פופולרי" 
                                            color="primary" 
                                            size="small"
                                        />
                                    )}
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {product.description || "רכב מעולה להשכרה"}
                                </Typography>
                                
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Speed sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="body2">
                                            {product.pointsPerHour || product.PointsPerHour} נקודות לשעה
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Schedule sx={{ mr: 1, color: 'success.main' }} />
                                        <Typography variant="body2">
                                            {product.pointsPerDay || product.PointsPerDay} נקודות ליום
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary">
                                    קטגוריה: {product.category || "רכב"}
                                </Typography>
                            </CardContent>
                            
                            <CardActions sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    startIcon={<DirectionsCar />}
                                    onClick={() => handleRental(product)}
                                    sx={{ 
                                        bgcolor: 'success.main',
                                        '&:hover': {
                                            bgcolor: 'success.dark'
                                        }
                                    }}
                                >
                                    השכר עכשיו
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {(!products || products.length === 0) && !loading && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        אין רכבים זמינים כרגע
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ProductListNew;

/**
 * ===== סיכום קומפוננטה ProductListNew.jsx =====
 * 
 * מטרה: תצוגת רשימת רכבים זמינים להשכרה
 * 
 * פונקציונליות:
 * - שליפה וטעינת רכבים מהשרת
 * - הצגת רכבים בפורמט כרטיסי גלריה
 * - מעבר להשכרה עבור רכב נבחר
 * - בדיקת אימות משתמש לפני השכרה
 * - טיפול במצבי טעינה ושגיאות
 * 
 * UI Components:
 * - Grid layout רספונסיבי (xs=12, sm=6, md=4)
 * - כרטיסי רכב עם תמונה, פרטים וכפתור השכרה
 * - כל כרטיס מציג: תמונה, שם, תיאור, נקודות ליום, קטגוריה
 * - אפקט hover מרחף לכרטיסים
 * - Chip "פופולרי" לרכבים מיוחדים
 * - CircularProgress בזמן טעינה
 * 
 * Data Display:
 * - תמונת רכב (fallback: /images/car1.jpg)
 * - שם רכב וקטגוריה
 * - נקודות ליום (תומך בשני שמות שדה)
 * - תיאור הרכב
 * - סטטוס "פופולרי" אם קיים
 * 
 * Flow:
 * טעינת דף → שליפת רכבים → הצגה → בחירת רכב → בדיקת אימות → מעבר להשכרה
 * 
 * State Management:
 * - Redux: getProducts (טעינת רכבים), setSelectedProduct (רכב נבחר)
 * - מחובר ל-Product slice ו-User slice
 * - ניהול מצבי loading, error, products
 * 
 * Navigation:
 * - בחירת רכב → /newRental עם רכב נבחר ב-Redux
 * - משתמש לא מחובר → / (התחברות)
 * 
 * Error Handling:
 * - Alert component לשגיאות
 * - טיפול במצב ללא רכבים
 * - בדיקת אימות לפני פעולות
 * 
 * סטטוס: ✅ תקין - גלריית רכבים מעוצבת ופונקציונלית
 */
