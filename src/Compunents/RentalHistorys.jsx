
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../style/rentalHistorys.css'; // ודא שהקובץ הזה קיים
import { useDispatch } from 'react-redux';
import Navbar from './navBar';

const RentalHistorys = () => {
  const navigate = useNavigate();
 const purchases = useSelector((state) => state.Purchases);

  const handleNewPurchase = () => {
    navigate('/packageList');
  };
const dispatch=useDispatch()
  return (
    <div className="my-purchases">
      <h1>היסטוריית רכישות</h1>
      <ul className="purchase-list">
        {purchases?.map((purchase, index) => (
          <li key={index} className="purchase-item">
            <p className="purchase-date">
              תאריך רכישה: {new Date(purchase.date).toLocaleDateString()}
            </p>
            <p className="purchase-description">
              תיאור חבילה: {purchase.description}
            </p>
            <p className="purchase-points">
              יתרת נקודות: {purchase.pointsBalance}
            </p>
          </li>
        ))}
      </ul>
      <button className="new-purchase-button" onClick={handleNewPurchase}>
        רכישת חבילה חדשה
      </button>
      <div className='navbar'><Navbar /> </div>
           
    </div>
  );
};

export default RentalHistorys;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import './MyPurchases.css'; // ודא שהקובץ הזה קיים
// import { fetchUserPurchases } from '../redux/purchasesSlice'; // להוסיף את הפונקציה המתאימה

// const MyPurchases = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const purchases = useSelector((state) => state.purchases);

//   useEffect(() => {
//     // הנחה שיש לך פונקציה במשיכת רכישות
//     dispatch(fetchUserPurchases()); 
//   }, [dispatch]);

//   const handleNewPurchase = () => {
//     navigate('/packageList');
//   };

//   return (
//     <div className="my-purchases">
//       <h1>היסטוריית רכישות</h1>
//       {purchases.length > 0 ? (
//         <ul className="purchase-list">
//           {purchases.map((purchase, index) => (
//             <li key={index} className="purchase-item">
//               <p className="purchase-date">
//                 תאריך רכישה: {new Date(purchase.date).toLocaleDateString()}
//               </p>
//               <p className="purchase-description">
//                 תיאור חבילה: {purchase.description}
//               </p>
//               <p className="purchase-points">
//                 יתרת נקודות: {purchase.pointsBalance}
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>אין רכישות קודמות.</p>
//       )}
//       <button className="new-purchase-button" onClick={handleNewPurchase}>
//         רכישת חבילה חדשה
//       </button>
//     </div>
//   );
// };

// export default MyPurchases;
