// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import Navbar from './navBar';

// const Home = () => {

//     return (
//         <div>
//            <p>🏠</p>
//            <Navbar /> 

//         </div>
//     )
// }
// export default Home;

import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { LocalCarWash, AssignmentTurnedIn, Payment, Support } from '@mui/icons-material';
import ProductList from './ProductList';
import PackageList from './PackageList';
import SupportComponent from './help'; // הוספת רכיב התמיכה
import { useNavigate } from 'react-router-dom'; // הוספת useNavigate
//import Navbar from './navBar'; // הוספת רכיב הניווט


const HomePage = () => {
    const navigate = useNavigate(); // יצירת ניווט

    const navigateToProductList = () => {
        navigate('/productList'); // ניווט לדף ProductList
    };
    const navigateToHelp = () => {
        navigate('/help'); // ניווט לדף ProductList
    };
    const navigateToNewRental = () => {
        navigate('/newRental'); // ניווט לדף ProductList
    };
    return (
        <Container maxWidth="lg" style={{ padding: '50px' }}>
            <Typography variant="h2" align="center" gutterBottom>
                ברוכים הבאים לשירות השכרת רכבים
            </Typography>
            <Typography variant="h6" align="center" paragraph>
                השכרת רכבים בקלות ובנוחות. בחר את הרכב שלך והתחל את ההרפתקה היום!
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <LocalCarWash fontSize="large" color="primary" />
                            <Typography variant="h5" component="div">
                                רכבים זמינים
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                מגוון רחב של רכבים לרשותך להשכרה בכל זמן.
                            </Typography>

                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}
                             onClick={navigateToProductList} // הוספת פונקציית ניווט

                             >
                                product List
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <AssignmentTurnedIn fontSize="large" color="primary" />
                            <Typography variant="h5" component="div">
                                השכרת רכבים קלה
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                תהליך השכרת רכבים מהיר וקל.
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} 
                            onClick={navigateToNewRental} >
                                new Rental
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Payment fontSize="large" color="primary" />
                            <Typography variant="h5" component="div">
                                תשלומים מאובטחים
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                תשלומים מאובטחים ומוגנים באמצעות טכנולוגיות מתקדמות.
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} >
                                For payment
                            </Button>
                        </CardContent>
                    </Card>
                </Grid> */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Support fontSize="large" color="primary" />
                            <Typography variant="h5" component="div">
                                תמיכה 24/6
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                צוות תמיכה זמין עבורך בכל עת.
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}
                            onClick={navigateToHelp}>
                               To Support
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;