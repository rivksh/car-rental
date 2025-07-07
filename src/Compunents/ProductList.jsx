
// import React, { useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
// import './ProductList.css'; // Import the CSS file

// const ProductList = () => {
//     // מצב לניהול לחיצות כפתור עבור כל הכרטיסים
//     const [purchased, setPurchased] = useState(Array(89).fill(false));

//     const handlePurchaseClick = (index) => {
//         const newPurchased = [...purchased];
//         newPurchased[index] = !newPurchased[index]; // החלף מצב רכישה עבור אינדקס ספציפי
//         setPurchased(newPurchased);
//     };

//     // יצירת מערך לרינדור קלפים
//     const gymCards = Array.from({ length:12 }, (_, index) => (
//         <Card key={index} className="car-card">
//             <CardMedia
//                // component="img"
//                // alt="car Image"
//                 className="car-card-image"
//                 //image="./" // החלף בכתובת האתר של תמונה שלך
//             />
//             <CardContent className='textCar'>
//                 <Typography gutterBottom variant="h5" component="div" align="center">
//                 Join us
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" align="center">
//                 Get a new and improved vehicle!
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                     <Button
//                         variant="outlined"
//                         onClick={() => handlePurchaseClick(index)}
//                         className={`purchase-button ${purchased[index] ? 'purchased' : ''}`}
//                     >
//                         Purchase
//                     </Button>
//                 </Box>
//             </CardContent>
//         </Card>
//     ));

//     return (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 5 }}>
//             {gymCards}
//         </Box>
//     );
// };

// export default ProductList;

//  import { getProduct } from "../redux/productSlice";


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts } from '../actions/productActions';
// import { Grid, Card, CardMedia, CardContent, Typography, Button, Container, Select, MenuItem } from '@mui/material';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

// export default function ProductList() {
//   const dispatch = useDispatch();
//   const products = useSelector(state => state.products);
//   const categories = useSelector(state => state.categories);
//   const [selectedCategory, setSelectedCategory] = React.useState('');
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     dispatch(getProduct());
//   }, [dispatch]);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const filteredProducts = selectedCategory
//     ? products.filter(product => product.category === selectedCategory)
//     : products;

//   const handleRent = (product) => {
//     navigate(`/new-rental/${product.id}`); // Use navigate to redirect
//   };

//   // Check if products and categories are available
//   if (!Array.isArray(products) || !Array.isArray(categories)) {
//     return <div>Loading...</div>; // Show loading or placeholder message
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         רשימת מוצרים
//       </Typography>
//       <Select
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//         fullWidth
//         variant="outlined"
//         margin="normal"
//       >
//         <MenuItem value="">כל הקטגוריות</MenuItem>
//         {categories.map(category => (
//           <MenuItem key={category.id} value={category.name}>
//             {category.name}
//           </MenuItem>
//         ))}
//       </Select>
//       <Grid container spacing={3}>
//         {filteredProducts.map(product => (
//           <Grid item xs={12} sm={6} md={4} key={product.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt={product.name}
//                 height="140"
//                 image={product.image || 'default-image-path.jpg'} // Handle missing image
//               />
//               <CardContent>
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {product.pointForHour} נקודות לשעה
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {product.pointForHalfDay} נקודות לחצי יום
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {product.pointForfDay} נקודות ליום
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {product.pointForWeek} נקודות לשבוע
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {product.pointForMounth} נקודות לחודש
//                 </Typography>
//                 <Button variant="contained" color="primary" onClick={() => handleRent(product)}>
//                   השכרה
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }




import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../redux/productSlice'; // Correctly import your action
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container, Select, MenuItem ,CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import '../style/ProductList.css'; // Import the CSS file
import Navbar from './navBar';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.Product.products); // Accessing the correct part of the state
  //const categories = useSelector(state => state.categories); // Ensure categories are fetched
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const handleRent = (product) => {
    // navigate(`/new-rental/${product.id}`);
     console.log("product.id:   "+product.id);

     navigate('/newRental', { state: { prdct: product } });
  };

  if (!Array.isArray(products) ) {
    // || !Array.isArray(categories)
    // return <div>Loading...</div>; // Handle loading state
    return <CircularProgress />
  }

  return (
    <Container >
      <Typography variant="h4" component="h1" gutterBottom>
        רשימת מוצרים
      </Typography>
      {/* <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <MenuItem value="">כל הקטגוריות</MenuItem>
        {categories.map(category => (
          <MenuItem key={category.id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select> */}
      <Grid container spacing={3} >
        {filteredProducts.map(product => (
          <Grid  item xs={12} sm={6} md={4} key={product.id} >
            <Card className="car-card">
              <CardMedia 
                component="img"
                // height="200"
                className="car-card-image"
                image={`/images/car${product.id}.jpg`} // תמונה שונה לכל כרטיס
                // alt={product.name}
                // sx={{ height: 180, objectFit: 'cover' }}
              />
              <CardContent className='textCar'>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.pointForHour} נקודות לשעה
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.pointForHalfDay} נקודות לחצי יום
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.pointForfDay} נקודות ליום
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.pointForWeek} נקודות לשבוע
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.pointForMounth} נקודות לחודש
                </Typography>
                <Button 
                        className="product-button"
                 variant="contained" color="primary" onClick={() => handleRent(product)}>
                  השכרה
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
        <Navbar /> 
    </Container>
  );
}
