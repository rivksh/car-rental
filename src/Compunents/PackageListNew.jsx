import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    Container,
    Card, 
    CardContent, 
    Button, 
    Typography, 
    Grid, 
    CircularProgress,
    Box,
    Chip
} from "@mui/material";
import { ShoppingCart, Star } from "@mui/icons-material";
import { getPackages, getPackagesById } from "../redux/packagesSlice";

const PackageList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, packages } = useSelector((state) => state.Package);

    useEffect(() => {
        dispatch(getPackages());
    }, [dispatch]);

    const handleNewPurchase = (id) => {
        dispatch(getPackagesById(id));
        navigate("/creditCard");
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error" variant="h6">
                    שגיאה: {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                רשימת חבילות להשכרה
            </Typography>
            
            <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 4 }}>
                בחר את החבילה המתאימה לך והתחל להשכיר רכבים
            </Typography>

            <Grid container spacing={3}>
                {packages && packages.map((packag) => (
                    <Grid item xs={12} sm={6} md={4} key={packag.id}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 3
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Star sx={{ color: 'gold', mr: 1 }} />
                                    <Typography variant="h5" component="h2">
                                        חבילה #{packag.id}
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    {packag.description || 'תיאור חבילה'}
                                </Typography>
                                
                                <Box sx={{ mb: 2 }}>
                                    <Chip 
                                        label={`${packag.point} נקודות`}
                                        color="primary"
                                        variant="outlined"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                </Box>
                                
                                <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                                    ₪{packag.price}
                                </Typography>
                                
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    startIcon={<ShoppingCart />}
                                    onClick={() => handleNewPurchase(packag.id)}
                                    sx={{ mt: 'auto' }}
                                >
                                    רכוש עכשיו
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {(!packages || packages.length === 0) && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                        אין חבילות זמינות כרגע
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default PackageList;

/**
 * ===== סיכום קומפוננטה PackageListNew.jsx =====
 * 
 * מטרה: תצוגת רשימת חבילות נקודות זמינות לרכישה
 * 
 * פונקציונליות:
 * - שליפה וטעינת חבילות מהשרת
 * - הצגת חבילות בפורמט כרטיסים
 * - מעבר לתשלום עבור חבילה נבחרת
 * - טיפול במצבי טעינה ושגיאות
 * 
 * UI Components:
 * - Grid layout עם כרטיסי חבילות
 * - כל כרטיס מציג: שם חבילה, תיאור, מחיר, נקודות
 * - כפתור רכישה לכל חבילה
 * - CircularProgress בזמן טעינה
 * - הודעות שגיאה ומצב ריק
 * 
 * Flow:
 * טעינת דף → שליפת חבילות → הצגה → בחירת חבילה → מעבר לתשלום
 * 
 * State Management:
 * - Redux: getPackages (טעינת חבילות), getPackagesById (בחירת חבילה)
 * - מחובר ל-Package slice
 * - ניהול מצבי loading, error, packages
 * 
 * Navigation:
 * בחירת חבילה → /creditCard עם חבילה נבחרת ב-Redux
 * 
 * Error Handling:
 * - מצב טעינה עם ספינר
 * - הצגת שגיאות בעברית
 * - טיפול במצב ללא חבילות
 * 
 * Dependencies: Material-UI, Redux, React Router
 * 
 * סטטוס: ✅ תקין - רכיב חבילות פונקציונלי ומעוצב
 */
