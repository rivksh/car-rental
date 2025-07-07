import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
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
    Grow,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import { 
    Person, 
    Email, 
    Phone, 
    Lock, 
    Visibility, 
    VisibilityOff,
    DirectionsCar,
    CreditCard
} from '@mui/icons-material';
import { addUser } from '../redux/UsersSlice';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, currentUser, error } = useSelector((state) => state.User);
    
    // קבלת הנתונים מהדף הקודם (אם קיימים)
    const { identityNumber = '', password = '' } = location.state || {};
    
    const [formData, setFormData] = useState({
        name: '',
        identityNumber: identityNumber,
        email: '',
        phone: '',
        password: password
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // נקה שגיאות כאשר המשתמש מתחיל להקליד
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateInputs = () => {
        const currentErrors = {};
        const { name, identityNumber, email, phone, password } = formData;
        
        if (!name.trim()) {
            currentErrors.name = 'שם לא יכול להיות ריק';
        }
        
        if (!identityNumber.trim()) {
            currentErrors.identityNumber = 'מספר זהות לא יכול להיות ריק';
        } else if (identityNumber.length !== 9) {
            currentErrors.identityNumber = 'מספר זהות חייב להיות באורך 9 ספרות';
        }
        
        if (!email.trim()) {
            currentErrors.email = 'אימייל לא יכול להיות ריק';
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                currentErrors.email = 'פורמט אימייל לא תקין';
            }
        }
        
        if (!phone.trim()) {
            currentErrors.phone = 'מספר טלפון לא יכול להיות ריק';
        } else {
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(phone)) {
                currentErrors.phone = 'מספר טלפון חייב להכיל 10 ספרות';
            }
        }
        
        if (!password.trim()) {
            currentErrors.password = 'סיסמה לא יכולה להיות ריקה';
        } else if (password.length < 8) {
            currentErrors.password = 'סיסמה חייבת להכיל לפחות 8 תווים';
        }

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateInputs()) return;

        try {
            const userData = {
                name: formData.name,
                identityNamber: formData.identityNumber, // שים לב לשם השדה כמו בשרת
                email: formData.email,
                phon: formData.phone, // שים לב לשם השדה כמו בשרת
                password: formData.password
            };

            const response = await dispatch(addUser(userData));
            
            if (response.meta.requestStatus === 'fulfilled') {
                setSuccessMessage('ההרשמה בוצעה בהצלחה! מעביר אותך לדף החבילות...');
                
                // חכה רגע ואז נווט לדף החבילות
                setTimeout(() => {
                    navigate('/packageList');
                }, 2000);
            } else {
                setErrors({ general: 'המשתמש כבר קיים במערכת או שגיאה בנתונים' });
            }
            
        } catch (error) {
            setErrors({ general: 'שגיאת שרת, אנא נסה שוב מאוחר יותר' });
        }
    };

    const navigateToLogin = () => {
        navigate('/');
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            py: 4
        }}>
            <Container component="main" maxWidth="md">
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
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3,
                                    color: 'white'
                                }}>
                                    <Person sx={{ fontSize: 40 }} />
                                </Box>
                            </Grow>

                            <Typography 
                                component="h1" 
                                variant="h3" 
                                sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1
                                }}
                            >
                                הצטרף אלינו! 🎉
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                צור חשבון חדש ותתחיל להשכיר רכבים היום
                            </Typography>
                        </Box>
                    
                        {successMessage && (
                            <Fade in timeout={500}>
                                <Alert 
                                    severity="success" 
                                    sx={{ 
                                        mb: 3,
                                        borderRadius: 2,
                                        background: 'rgba(76, 175, 80, 0.1)',
                                        border: '1px solid rgba(76, 175, 80, 0.2)'
                                    }}
                                >
                                    {successMessage}
                                </Alert>
                            </Fade>
                        )}
                        
                        {(errors.general || error) && (
                            <Fade in timeout={500}>
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        mb: 3,
                                        borderRadius: 2,
                                        background: 'rgba(244, 67, 54, 0.1)',
                                        border: '1px solid rgba(244, 67, 54, 0.2)'
                                    }}
                                >
                                    {errors.general || error}
                                </Alert>
                            </Fade>
                        )}
                        
                        <Box component="form" onSubmit={handleSubmit}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 2 }}>
                                <TextField
                                    required
                                    fullWidth
                                    name="name"
                                    label="שם מלא"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person sx={{ color: '#f093fb' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                        },
                                    }}
                                />
                                
                                <TextField
                                    required
                                    fullWidth
                                    name="identityNumber"
                                    label="מספר זהות"
                                    value={formData.identityNumber}
                                    onChange={handleChange}
                                    error={!!errors.identityNumber}
                                    helperText={errors.identityNumber}
                                    inputProps={{ maxLength: 9 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CreditCard sx={{ color: '#f093fb' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                        },
                                    }}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="כתובת אימייל"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: '#f093fb' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                        },
                                    }}
                                />
                                
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="מספר טלפון"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    inputProps={{ maxLength: 10 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone sx={{ color: '#f093fb' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#f093fb',
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="סיסמה (לפחות 8 תווים)"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                sx={{ 
                                    mb: 4,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#f093fb',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#f093fb',
                                        },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: '#f093fb' }} />
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
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ 
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(240, 147, 251, 0.6)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                        transform: 'none',
                                        boxShadow: 'none'
                                    },
                                    transition: 'all 0.3s ease',
                                    mb: 3
                                }}
                            >
                                {loading ? 'נרשם למערכת...' : 'הירשם עכשיו 🚀'}
                            </Button>
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body1" color="text.secondary">
                                    כבר יש לך חשבון?
                                </Typography>
                                <Button
                                    onClick={navigateToLogin}
                                    sx={{ 
                                        mt: 1,
                                        color: '#f093fb',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': {
                                            background: 'rgba(240, 147, 251, 0.1)'
                                        }
                                    }}
                                >
                                    התחבר כאן 🔑
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default Register;

/**
 * ===== סיכום קומפוננטה Register.jsx =====
 * 
 * מטרה: דף הרשמה למערכת השכרת הרכבים
 * 
 * פונקציונליות:
 * - הרשמת משתמש חדש למערכת
 * - קבלת נתונים מעמוד התחברות (אם העביר)
 * - וולידציה מקומית מלאה לכל השדות
 * - הודעות הצלחה ושגיאה ברורות
 * - הפניה אוטומטית לדף החבילות לאחר הרשמה
 * 
 * Form Fields:
 * - שם מלא
 * - מספר זהות (9 ספרות)
 * - אימייל (עם וולידצית פורמט)
 * - טלפון (10 ספרות)
 * - סיסמה (מינימום 8 תווים)
 * 
 * UI Features:
 * - עיצוב מודרני עם Gradient background ורוד-סגול
 * - אפקטי Fade/Grow animations
 * - Show/Hide password functionality
 * - Material-UI icons לכל שדה
 * - Responsive design
 * - הודעות שגיאה/הצלחה באמוג'י
 * 
 * Validation Rules:
 * - שם: לא ריק
 * - זהות: 9 ספרות בדיוק
 * - אימייל: פורמט תקין (@domain.com)
 * - טלפון: 10 ספרות בדיוק
 * - סיסמה: מינימום 8 תווים
 * 
 * State Management:
 * - Redux: addUser action
 * - ניהול state מקומי לטפסים ושגיאות
 * - קבלת נתונים מ-location.state
 * 
 * Data Mapping:
 * - identityNamber (שרת) ← identityNumber (פרונט)
 * - phon (שרת) ← phone (פרונט)
 * 
 * Flow:
 * הרשמה מוצלחת → הודעת הצלחה → המתנה 2 שניות → ניווט לחבילות
 * 
 * סטטוס: ✅ תקין - דף הרשמה מלא עם וולידציה מתקדמת
 */
