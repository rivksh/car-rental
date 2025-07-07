// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// //import { getPackages, buyPackage} from "../redux/packagesSlise"
// import { Card, CardContent, Button, Typography, Grid, CircularProgress } from "@mui/material";
// import { addPurchase } from "../redux/purchesSlice";
// import { getPackages } from "../redux/packagesSlice";
// import { Await } from "react-router-dom";

// const PackageList = () => {
//     const dispatch = useDispatch();
//    const {  loading, error, packages } = useSelector((state) => state.Package);
//    console.log(packages);
//   //  const packages= dispatch( getPackages())
//    console.log(packages);
   
//     useEffect(() => {
//         dispatch(getPackages());
//       }, [dispatch]);

//       const handleNewPurchase = (id) => {
//         dispatch(addPurchase(id));
//       };
//       if (loading) return<h1> <CircularProgress /></h1>;
//       if (error) return <p>error: {error}</p>;
    

//     return (
//         <div>
//            <div className="my-purchases">
//       <h1>רשימת חבילות</h1>
//       <ul className="purchase-list">
//         {packages&&packages.map((packag, index) => (
//           <li key={index} className="purchase-item">
//             <p className="purchase-date">
//                קוד חבילה:{packag.id}
//             </p>
//             <p className="purchase-description">
//               תיאור חבילה: {packag.description}
//             </p>
//             <p className="purchase-points">
//               כמות נקודות: {packag.Point}
//             </p>
//             <p className="purchase-Price">
//                מחיר החבילה: {packag.Price}
//             </p>
//             <button className="new-purchase-button" onClick={handleNewPurchase}>
//        לרכישה
//       </button>
//           </li>
//         ))}
//       </ul>
     
//     </div>
//         </div>
//     )
// }
// export default PackageList;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Button, Typography, Grid, CircularProgress } from "@mui/material";
import { addPurchase } from "../redux/purchesSlice";
import { getPackages, getPackagesById } from "../redux/packagesSlice";
import {  useNavigate } from "react-router-dom";
import Navbar from './navBar';

const PackageList = () => {
    const dispatch = useDispatch();
    const { loading, error, packages } = useSelector((state) => state.Package);
const navigate=useNavigate()
    useEffect(() => {
        dispatch(getPackages());
    }, [dispatch]);

    const handleNewPurchase = (id) => {
       dispatch(getPackagesById(id))
       navigate("/craditCard")
    };

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                רשימת חבילות
            </Typography>
            <Grid container spacing={3}>
                {packages && packages.map((packag) => (
                    <Grid item xs={12} sm={6} md={4} key={packag.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">קוד חבילה: {packag.id}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    תיאור חבילה: {packag.description}
                                </Typography>
                                <Typography variant="body1">
                                    כמות נקודות: {packag.point}
                                </Typography>
                                <Typography variant="body1" color="primary">
                                    מחיר החבילה: {packag.price}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleNewPurchase(packag.id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    לרכישה
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        <Navbar /> 

        </div>
    );
};

export default PackageList;
