import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/home');
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%', textAlign: 'center' }}>
                    <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                    <Typography component="h1" variant="h4" gutterBottom>
                        הרכישה הצליחה!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        תודה על הרכישה. פרטי הרכישה נשלחו אליך באימייל.
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={handleBackToHome}
                        sx={{ mt: 2 }}
                    >
                        חזור לדף הבית
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default SuccessPage;

/**
 * ===== סיכום קומפוננטה SuccessPage.jsx =====
 * 
 * מטרה: דף הצלחה לאחר ביצוע רכישה/פעולה מוצלחת
 * 
 * פונקציונליות:
 * - הצגת הודעת הצלחה למשתמש
 * - אישור ביצוע הרכישה
 * - ניווט חזרה לדף הבית
 * 
 * UI Features:
 * - עיצוב נקי ומינימליסטי
 * - אייקון CheckCircle ירוק בולט
 * - הודעת הצלחה ברורה בעברית
 * - כפתור ניווט לדף הבית
 * - Container ו-Paper מעוצבים
 * 
 * User Experience:
 * - מסר חיובי ומעודד
 * - מידע על שליחת אימייל
 * - ניווט פשוט וברור
 * - עיצוב מרכוז
 * 
 * Flow:
 * רכישה/פעולה מוצלחת → מעבר לדף הצלחה → הצגת אישור → 
 * אפשרות חזרה לדף הבית
 * 
 * Navigation:
 * - כפתור "חזור לדף הבית" → /home
 * 
 * Dependencies: Material-UI, React Router
 * 
 * Use Cases:
 * - לאחר רכישת חבילה
 * - לאחר ביצוע השכרה
 * - לאחר עדכון פרופיל
 * - כל פעולה מוצלחת במערכת
 * 
 * סטטוס: ✅ תקין - דף הצלחה פשוט ויעיל
 */