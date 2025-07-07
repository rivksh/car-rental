import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { 
    Container, 
    Paper, 
    TextField, 
    Button, 
    Typography, 
    Alert, 
    Box,
    Link,
    InputAdornment,
    IconButton,
    Fade,
    Grow
} from '@mui/material';
import { 
    AccountCircle, 
    Lock, 
    Visibility, 
    VisibilityOff,
    DirectionsCar 
} from '@mui/icons-material';
import { getUserById, getUserByIdAndPassword } from '../redux/UsersSlice';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, currentUser, error } = useSelector((state) => state.User);
    
    const [formData, setFormData] = useState({
        identityNumber: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showContent, setShowContent] = useState(false);

    React.useEffect(() => {
        setShowContent(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // נקה שגיאות כאשר המשתמש מתחיל להקליד
        if (errorMessage) setErrorMessage('');
    };

    const validateInputs = () => {
        const { identityNumber, password } = formData;
        
        if (!identityNumber.trim()) {
            setErrorMessage('מספר זהות לא יכול להיות ריק');
            return false;
        }
        if (!password.trim()) {
            setErrorMessage('סיסמה לא יכולה להיות ריקה');
            return false;
        }
        if (identityNumber.length !== 9) {
            setErrorMessage('מספר זהות חייב להיות באורך 9 ספרות');
            return false;
        }
        if (password.length < 8) {
            setErrorMessage('סיסמה חייבת להכיל לפחות 8 תווים');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateInputs()) return;

        try {
            const { identityNumber, password } = formData;
            
            // בדיקה אם המשתמש קיים
            const userRes = await dispatch(getUserById(identityNumber));
            
            if (userRes.meta.requestStatus === 'rejected') {
                setErrorMessage('המשתמש לא קיים במערכת, יש להירשם');
                return;
            }
            
            // בדיקת סיסמה
            const loginRes = await dispatch(getUserByIdAndPassword({
                IdentityNamber: identityNumber, 
                password
            }));
            
            if (loginRes.meta.requestStatus === 'rejected') {
                setErrorMessage('הסיסמה שגויה, אנא נסה שוב');
                return;
            }
            
            const loginData = loginRes.payload;
            
            // התחברות מוצלחת - בדוק אם יש חבילה פעילה
            if (loginData.purchasesList && loginData.purchasesList.length > 0) {
                // בדוק אם יש חבילה עם נקודות
                const hasActivePackage = loginData.purchasesList.some(
                    purchase => purchase.balance > 0
                );
                
                if (hasActivePackage) {
                    navigate('/activeRental');
                } else {
                    navigate('/packageList');
                }
            } else {
                navigate('/packageList');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('שגיאת שרת, אנא נסה שוב מאוחר יותר');
        }
    };

    const navigateToRegister = async () => {
        const { identityNumber, password } = formData;
        
        // אם אין מספר זהות, עבור להרשמה ישירות
        if (!identityNumber.trim()) {
            navigate('/register');
            return;
        }
        
        try {
            // בדוק אם המשתמש כבר קיים
            const userRes = await dispatch(getUserById(identityNumber));
            
            if (userRes.meta.requestStatus === 'fulfilled') {
                // המשתמש קיים - בדוק סיסמה אם הוזנה
                if (password.trim()) {
                    const loginRes = await dispatch(getUserByIdAndPassword({
                        IdentityNamber: identityNumber, 
                        password
                    }));
                    
                    if (loginRes.meta.requestStatus === 'fulfilled') {
                        setErrorMessage('המשתמש כבר קיים במערכת, אנא התחבר');
                        return;
                    } else {
                        setErrorMessage('המשתמש קיים אך הסיסמה שגויה');
                        return;
                    }
                } else {
                    setErrorMessage('המשתמש כבר קיים במערכת, אנא התחבר');
                    return;
                }
            }
            
            // המשתמש לא קיים - עבור להרשמה
            navigate('/register', { 
                state: { 
                    identityNumber, 
                    password 
                } 
            });
            
        } catch (error) {
            console.error('Navigation error:', error);
            setErrorMessage('שגיאת שרת, אנא נסה שוב');
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            py: 4
        }}>
            <Container component="main" maxWidth="sm">
                <Fade in={showContent} timeout={1000}>
                    <Paper 
                        elevation={24} 
                        sx={{ 
                            p: 6, 
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 4,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Gradient Border */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)'
                        }} />

                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Grow in={showContent} timeout={1200}>
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3,
                                    color: 'white'
                                }}>
                                    <DirectionsCar sx={{ fontSize: 40 }} />
                                </Box>
                            </Grow>

                            <Typography 
                                component="h1" 
                                variant="h3" 
                                sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1
                                }}
                            >
                                ברוכים הבאים! 👋
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                התחבר לחשבונך כדי להמשיך
                            </Typography>
                        </Box>
                        
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="identityNumber"
                                label="מספר זהות"
                                type="text"
                                value={formData.identityNumber}
                                onChange={handleChange}
                                inputProps={{ maxLength: 9 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle sx={{ color: '#667eea' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#667eea',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#667eea',
                                        },
                                    },
                                }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="סיסמה"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: '#667eea' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#667eea',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#667eea',
                                        },
                                    },
                                }}
                            />
                            
                            {(errorMessage || error) && (
                                <Fade in timeout={500}>
                                    <Alert 
                                        severity="error" 
                                        sx={{ 
                                            mt: 2,
                                            borderRadius: 2,
                                            background: 'rgba(244, 67, 54, 0.1)',
                                            border: '1px solid rgba(244, 67, 54, 0.2)'
                                        }}
                                    >
                                        {errorMessage || error}
                                    </Alert>
                                </Fade>
                            )}
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ 
                                    mt: 4, 
                                    mb: 3,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                        transform: 'none',
                                        boxShadow: 'none'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? 'מתחבר...' : 'התחבר למערכת 🚀'}
                            </Button>
                            
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body1" color="text.secondary">
                                    אין לך חשבון עדיין?
                                </Typography>
                                <Button
                                    onClick={navigateToRegister}
                                    sx={{ 
                                        mt: 1,
                                        color: '#667eea',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': {
                                            background: 'rgba(102, 126, 234, 0.1)'
                                        }
                                    }}
                                >
                                    הירשם כאן 📝
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default Signin;

/**
 * ===== סיכום קומפוננטה Signin.jsx =====
 * 
 * מטרה: דף התחברות למערכת השכרת הרכבים
 * 
 * פונקציונליות:
 * - התחברות עם מספר זהות וסיסמה
 * - בדיקת קיום משתמש במערכת
 * - וולידציה מקומית לטפסים
 * - הפניה אוטומטית לפי סטטוס המשתמש
 * - ניהול מעבר להרשמה עבור משתמשים חדשים
 * 
 * Flow Logic:
 * - בדיקת קיום משתמש לפני התחברות
 * - התחברות מוצלחת → בדיקת חבילות פעילות
 * - יש נקודות → דף השכרה פעילה
 * - אין נקודות → דף בחירת חבילות
 * - משתמש לא קיים → הפניה להרשמה
 * 
 * UI Features:
 * - עיצוב מודרני עם Gradient background
 * - אפקטי Fade/Grow animations
 * - Show/Hide password functionality
 * - Responsive design עם Material-UI
 * - הודעות שגיאה ברורות בעברית
 * - אמוג'י ואייקונים חדשניים
 * 
 * State Management:
 * - Redux: getUserById, getUserByIdAndPassword
 * - ניהול מצב טעינה ושגיאות
 * - State מקומי לטפסים
 * 
 * Validation:
 * - מספר זהות (9 ספרות)
 * - סיסמה (מינימום 8 תווים)
 * - בדיקת שדות ריקים
 * 
 * סטטוס: ✅ תקין - דף התחברות מתקדם ומלא
 */
