import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Phone, Email, AccessTime } from '@mui/icons-material';

const SupportComponent = () => {
    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                תמיכה טכנית
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                אנו זמינים בשבילך בכל שעה
            </Typography>
            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Phone style={{ fontSize: 40 }} />
                            <Typography variant="h5" gutterBottom>
                                תמיכה טלפונית
                            </Typography>
                            <Typography variant="body2">
                                צור קשר עם צוות התמיכה שלנו בטלפון: 1-800-123-4567
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Email style={{ fontSize: 40 }} />
                            <Typography variant="h5" gutterBottom>
                                תמיכה בדוא"ל
                            </Typography>
                            <Typography variant="body2">
                                שלח לנו מייל לכתובת: support@example.com
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <AccessAlarm style={{ fontSize: 40 }} />
                            <Typography variant="h5" gutterBottom>
                                זמין 24/6
                            </Typography>
                            <Typography variant="body2">
                                צוות התמיכה שלנו זמין בכל שעות היממה.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                צור קשר עכשיו
            </Button> */}
        </Container>
    );
};

export default SupportComponent;

/**
 * ===== סיכום קומפוננטה help.jsx =====
 * 
 * מטרה: דף תמיכה טכנית ויצירת קשר
 * 
 * פונקציונליות:
 * - הצגת פרטי יצירת קשר עם התמיכה
 * - כרטיסי תמיכה שונים (טלפון, אימייל, שעות פעילות)
 * - מידע על זמינות השירות
 * 
 * UI Components:
 * - Grid layout עם כרטיסי תמיכה
 * - אייקונים מתאימים לכל סוג תמיכה
 * - עיצוב נקי עם Material-UI
 * - כותרות ברורות בעברית
 * 
 * Support Channels:
 * - תמיכה טלפונית: 1-800-123-4567
 * - תמיכה באימייל
 * - שעות פעילות: 24/7
 * 
 * Features:
 * - רספונסיבי (xs=12, sm=6, md=4)
 * - כפתור יצירת קשר (מוער)
 * - פרטי יצירת קשר ברורים
 * 
 * תיקונים שבוצעו:
 * - הוסר import ו-render של Navbar (מיותר - Navbar מוצג ב-AppRouter)
 * 
 * Dependencies: Material-UI
 * 
 * Use Cases:
 * - משתמש זקוק לעזרה
 * - בעיות טכניות
 * - שאלות כלליות
 * - תמיכה בהשכרות
 * 
 * סטטוס: ✅ תקין - דף תמיכה פשוט ושימושי (תוקן)
 */
