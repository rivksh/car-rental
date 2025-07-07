import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Chip,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { 
    AccountCircle, 
    Home, 
    History, 
    ShoppingCart, 
    LocalTaxi,
    DirectionsCar,
    Logout,
    Dashboard,
    TrendingUp
} from '@mui/icons-material';
import { logoutUser } from '../redux/UsersSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.User);
    const { purchases } = useSelector((state) => state.Purchase);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
        handleMenuClose();
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleMenuClose();
    };

    const getAvailablePoints = () => {
        if (!purchases || purchases.length === 0) return 0;
        return purchases.reduce((total, purchase) => total + (purchase.balance || 0), 0);
    };

    const menuItems = [
        { label: 'דף הבית', icon: <Home />, path: '/home' },
        { label: 'חבילות', icon: <ShoppingCart />, path: '/packageList' },
        { label: 'רכבים', icon: <DirectionsCar />, path: '/productList' },
        { label: 'השכרה פעילה', icon: <TrendingUp />, path: '/activeRental' },
        { label: 'היסטוריית השכרות', icon: <History />, path: '/rentalHistorys' }
    ];

    return (
        <AppBar 
            position="sticky" 
            elevation={4}
            sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <Toolbar sx={{ minHeight: 70 }}>
                {/* Logo/Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <DirectionsCar sx={{ fontSize: 32, mr: 2, color: 'white' }} />
                    <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                            fontWeight: 700,
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        🚗 מערכת השכרת רכבים
                    </Typography>
                </Box>

                {/* Points Display */}
                {currentUser && (
                    <Chip
                        icon={<TrendingUp />}
                        label={`${getAvailablePoints()} נקודות`}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            color: '#667eea',
                            fontWeight: 600,
                            mr: 2,
                            '& .MuiChip-icon': {
                                color: '#667eea'
                            }
                        }}
                    />
                )}

                {/* Desktop Navigation */}
                {!isMobile && currentUser && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.path}
                                color="inherit"
                                startIcon={item.icon}
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    color: 'white',
                                    fontWeight: 500,
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {/* User Menu */}
                {currentUser ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={handleMenuOpen}
                            sx={{ 
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            <Avatar sx={{ 
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                width: 40,
                                height: 40
                            }}>
                                {currentUser.name?.charAt(0) || <AccountCircle />}
                            </Avatar>
                        </IconButton>
                        
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: 2,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    minWidth: 200
                                }
                            }}
                        >
                            <MenuItem disabled sx={{ fontWeight: 600, color: '#667eea' }}>
                                שלום, {currentUser.name}
                            </MenuItem>
                            
                            {isMobile && menuItems.map((item) => (
                                <MenuItem 
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        py: 1.5,
                                        '&:hover': {
                                            background: 'rgba(102, 126, 234, 0.1)'
                                        }
                                    }}
                                >
                                    <Box sx={{ mr: 2, color: '#667eea' }}>
                                        {item.icon}
                                    </Box>
                                    {item.label}
                                </MenuItem>
                            ))}
                            
                            <MenuItem 
                                onClick={handleLogout}
                                sx={{
                                    color: '#f44336',
                                    fontWeight: 500,
                                    py: 1.5,
                                    '&:hover': {
                                        background: 'rgba(244, 67, 54, 0.1)'
                                    }
                                }}
                            >
                                <Logout sx={{ mr: 2 }} />
                                התנתק
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            color="inherit" 
                            onClick={() => navigate('/signin')}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 2,
                                fontWeight: 600,
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            התחבר
                        </Button>
                        <Button 
                            color="inherit" 
                            onClick={() => navigate('/register')}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                color: '#667eea',
                                borderRadius: 2,
                                fontWeight: 600,
                                '&:hover': {
                                    background: 'white',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            הרשם
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

/**
 * ===== סיכום קומפוננטה navBar.jsx =====
 * 
 * מטרה: שורת ניווט מתקדמת ורספונסיבית למערכת
 * 
 * פונקציונליות:
 * - ניווט מלא לכל דפי האפליקציה
 * - תצוגת נקודות זמינות למשתמש
 * - תפריט משתמש עם אפשרות התנתקות
 * - עיצוב רספונסיבי (desktop/mobile)
 * - תמיכה בעברית מלאה
 * 
 * Features:
 * - לוגו וכותרת מערכת עם אמוג'י רכב
 * - Gradient background מרהיב
 * - הצגת יתרת נקודות בזמן אמת
 * - תפריט נפתח במובייל
 * - אנימציות hover מתקדמות
 * - אווטר משתמש אישי
 * 
 * Navigation Items:
 * - דף הבית, חבילות, רכבים, השכרה פעילה, היסטוריה
 * 
 * State Management:
 * - מחובר ל-Redux: User (currentUser), Purchase (purchases)
 * - מחשב נקודות זמינות מסך הרכישות
 * - מנהל logout באמצעות dispatch
 * 
 * UI Framework: Material-UI עם עיצוב מותאם אישית
 * 
 * סטטוס: ✅ תקין - Navbar מתקדם ויפה עם פונקציונליות מלאה
 */
