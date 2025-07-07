import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    CardActions,
    Button, 
    Box,
    Paper,
    Avatar,
    Chip,
    Fade,
    Grow
} from '@mui/material';
import { 
    DirectionsCar, 
    ShoppingCart, 
    History,
    AccountCircle,
    TrendingUp,
    Star,
    LocalOffer,
    Speed
} from '@mui/icons-material';

const HomePageNew = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.User);
    const { purchases } = useSelector((state) => state.Purchase);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    const getAvailablePoints = () => {
        if (!purchases || purchases.length === 0) return 0;
        return purchases.reduce((total, purchase) => total + (purchase.balance || 0), 0);
    };

    const quickActions = [
        {
            title: 'השכרת רכב',
            description: 'מצא את הרכב המושלם עבורך',
            icon: <DirectionsCar sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            action: () => navigate('/productList')
        },
        {
            title: 'רכישת חבילה',
            description: 'רכוש חבילת נקודות חדשה',
            icon: <ShoppingCart sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            action: () => navigate('/packageList')
        },
        {
            title: 'השכרות פעילות',
            description: 'צפה בההשכרות הנוכחיות שלך',
            icon: <Speed sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            action: () => navigate('/activeRental')
        },
        {
            title: 'היסטוריה',
            description: 'צפה בכל ההשכרות הקודמות',
            icon: <History sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            action: () => navigate('/rentalHistorys')
        }
    ];

    const features = [
        {
            icon: <Star sx={{ fontSize: 32, color: '#FFD700' }} />,
            title: 'איכות מעולה',
            description: 'רכבים מתוחזקים ומעודכנים'
        },
        {
            icon: <LocalOffer sx={{ fontSize: 32, color: '#FF6B6B' }} />,
            title: 'מחירים הוגנים',
            description: 'מערכת נקודות חסכונית'
        },
        {
            icon: <Speed sx={{ fontSize: 32, color: '#4ECDC4' }} />,
            title: 'שירות מהיר',
            description: 'השכרה מהירה ופשוטה'
        }
    ];

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 4
        }}>
            <Container maxWidth="lg">
                <Fade in={showContent} timeout={1000}>
                    <Box>
                        {/* Hero Section */}
                        <Paper 
                            elevation={24}
                            sx={{ 
                                p: 6, 
                                mb: 6, 
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: 4,
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)'
                            }} />
                            
                            <Avatar 
                                sx={{ 
                                    width: 120, 
                                    height: 120, 
                                    bgcolor: 'primary.main',
                                    fontSize: 48,
                                    mx: 'auto',
                                    mb: 3,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                            >
                                <AccountCircle sx={{ fontSize: 60 }} />
                            </Avatar>

                            <Typography variant="h2" component="h1" gutterBottom sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}>
                                🚗 ברוכים הבאים למערכת השכרת הרכבים
                            </Typography>

                            <Typography variant="h4" sx={{ 
                                color: 'text.secondary',
                                fontWeight: 300,
                                mb: 3
                            }}>
                                שלום {currentUser?.name || 'משתמש יקר'}, מוכנים לנסיעה הבאה?
                            </Typography>

                            <Chip 
                                icon={<TrendingUp />}
                                label={`יתרת נקודות: ${getAvailablePoints()} נקודות`}
                                size="large"
                                sx={{ 
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    color: 'white',
                                    py: 3,
                                    px: 2
                                }}
                            />
                        </Paper>

                        {/* Quick Actions Grid */}
                        <Typography variant="h4" sx={{ 
                            color: 'white',
                            fontWeight: 600,
                            textAlign: 'center',
                            mb: 4
                        }}>
                            🎯 פעולות מהירות
                        </Typography>
                        
                        <Grid container spacing={4} sx={{ mb: 6 }}>
                            {quickActions.map((action, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Grow in={showContent} timeout={1000 + index * 200}>
                                        <Card 
                                            elevation={20}
                                            sx={{ 
                                                height: '100%',
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                backdropFilter: 'blur(20px)',
                                                borderRadius: 3,
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'translateY(-8px) scale(1.02)',
                                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                                }
                                            }}
                                            onClick={action.action}
                                        >
                                            <CardContent sx={{ 
                                                textAlign: 'center',
                                                p: 4,
                                                pb: 2
                                            }}>
                                                <Box sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: '50%',
                                                    background: action.gradient,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mx: 'auto',
                                                    mb: 3,
                                                    color: 'white'
                                                }}>
                                                    {action.icon}
                                                </Box>
                                                
                                                <Typography variant="h6" component="h3" gutterBottom sx={{
                                                    fontWeight: 600,
                                                    color: 'text.primary'
                                                }}>
                                                    {action.title}
                                                </Typography>
                                                
                                                <Typography variant="body2" color="text.secondary">
                                                    {action.description}
                                                </Typography>
                                            </CardContent>
                                            
                                            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                                <Button 
                                                    variant="contained" 
                                                    sx={{ 
                                                        background: action.gradient,
                                                        borderRadius: 25,
                                                        px: 3,
                                                        py: 1,
                                                        fontWeight: 600,
                                                        '&:hover': {
                                                            transform: 'scale(1.05)'
                                                        }
                                                    }}
                                                >
                                                    לחץ כאן
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grow>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Features Section */}
                        <Paper 
                            elevation={20}
                            sx={{ 
                                p: 5,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: 4
                            }}
                        >
                            <Typography variant="h4" sx={{ 
                                textAlign: 'center',
                                fontWeight: 600,
                                mb: 4,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                🌟 למה לבחור בנו?
                            </Typography>
                            
                            <Grid container spacing={4}>
                                {features.map((feature, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Grow in={showContent} timeout={1500 + index * 300}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Box sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: '50%',
                                                    background: 'rgba(102, 126, 234, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mx: 'auto',
                                                    mb: 2
                                                }}>
                                                    {feature.icon}
                                                </Box>
                                                
                                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                                    {feature.title}
                                                </Typography>
                                                
                                                <Typography variant="body1" color="text.secondary">
                                                    {feature.description}
                                                </Typography>
                                            </Box>
                                        </Grow>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default HomePageNew;

/**
 * ===== סיכום קומפוננטה HomePageNew.jsx =====
 * 
 * מטרה: דף הבית הראשי של מערכת השכרת הרכבים
 * 
 * פונקציונליות:
 * - קבלת פנים למשתמש מחובר
 * - הצגת יתרת נקודות זמינות
 * - פעולות מהירות (Quick Actions)
 * - תצוגת יתרונות המערכת
 * - ניווט נוח לכל חלקי האפליקציה
 * 
 * Quick Actions:
 * - השכרת רכב → /productList
 * - רכישת חבילה → /packageList  
 * - השכרות פעילות → /activeRental
 * - היסטוריה → /rentalHistorys
 * 
 * UI Features:
 * - עיצוב מודרני עם Gradient background
 * - כרטיסי פעולה אינטראקטיביים עם צבעי gradients שונים
 * - אפקטי Fade/Grow animations
 * - תצוגת יתרת נקודות מעודכנת
 * - אווטר משתמש אישי
 * - Responsive design
 * - אמוג'י ואייקונים צבעוניים
 * 
 * Features Display:
 * - איכות מעולה (כוכב זהב)
 * - מחירים הוגנים (אופר אדום)
 * - שירות מהיר (מד מהירות כחול)
 * 
 * State Management:
 * - Redux: currentUser, purchases
 * - חישוב נקודות זמינות מסך הרכישות
 * - ניהול state מקומי לאנימציות
 * 
 * Points Calculation:
 * - סיכום כל הנקודות הזמינות מכל הרכישות
 * - תצוגה בזמן אמת של היתרה
 * 
 * Navigation Flow:
 * דף הבית → בחירת פעולה מהירה → מעבר לעמוד רלוונטי
 * 
 * סטטוס: ✅ תקין - דף בית מרשים ופונקציונלי
 */
