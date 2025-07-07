
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; 
// import './SignUp.css';

// const Register = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { IdentityNamber } = location.state || { IdentityNamber: '' };
//     const [Name, setName] = useState('');
//     const [Email, setEmail] = useState('');
//     const [Phon, setPhon] = useState('');
//     const [Password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const [successMessage, setSuccessMessage] = useState(''); // State עבור הודעת הצלחה

//     const validateInputs = () => {
//         const currentErrors = {};
        
//         if (!Name) {
//             currentErrors.Name = 'Name cannot be empty';
//         }
//         if (!IdentityNamber) {
//             currentErrors.IdentityNamber = 'ID Number cannot be empty';
//         } else if (IdentityNamber.length !== 9) {
//             currentErrors.IdentityNamber = 'ID Number must be exactly 9 characters long';
//         }
//         if (!Email) {
//             currentErrors.Email = 'Email cannot be empty';
//         } else {
//             const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (!EmailPattern.test(Email)) {
//                 currentErrors.Email = 'Invalid Email format';
//             }
//         }
//         if (!Phon) {
//             currentErrors.Phon = 'Phon cannot be empty';
//         } else {
//             const PhonPattern = /^\d+$/; 
//             if (!PhonPattern.test(Phon)) {
//                 currentErrors.Phon = 'Phon must be a valid number';
//             }
//         }
//         if (!Password) {
//             currentErrors.Password = 'Password cannot be empty';
//         } else if (Password.length < 8) {
//             currentErrors.Password = 'Password must be at least 8 characters long';
//         }

//         setErrors(currentErrors);
//         return Object.keys(currentErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateInputs()) return; 

//         try {
//             const response = await fetch('/api/register', { 
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ Name, IdentityNamber, Email, Phon, Password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 if (response.status === 409) {
//                     throw new Error('User already exists');
//                 }
//                 throw new Error(data.message || 'Registration failed');
//             }

//             setSuccessMessage('הרישום הצליח!');  // הוספת הודעת הצלחה
//             navigate('/packageList', { state: { IdentityNamber, Password } });
//         } catch (error) {
//             setErrors({ ...errors, api: error.message });
//         }
//     };

//     return (
//         <div className="register-container">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor='IdentityNamber'>ID Number:</label>
//                     <input 
//                         id='IdentityNamber'
//                         type="text" 
//                         value={IdentityNamber} 
//                         readOnly 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="Name">Name:</label>
//                     <input 
//                         id='Name'
//                         type="text" 
//                         value={Name} 
//                         onChange={(e) => setName(e.target.value)} 
//                         required 
//                     />
//                     {errors.Name && <p className="error-message">{errors.Name}</p>}
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input 
//                         type="Email" 
//                         value={Email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         required 
//                     />
//                     {errors.Email && <p className="error-message">{errors.Email}</p>}
//                 </div>
//                 <div>
//                     <label>Phon:</label>
//                     <input 
//                         type="text" 
//                         value={Phon} 
//                         onChange={(e) => setPhon(e.target.value)} 
//                         required 
//                     />
//                     {errors.Phon && <p className="error-message">{errors.Phon}</p>}
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input 
//                         type="Password" 
//                         value={Password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 {errors.api && <p className="error-message">{errors.api}</p>}
//                 {successMessage && <p className="success-message">{successMessage}</p>} {/* הצגת הודעת הצלחה */}
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import '../style/SignUp.css';
import { addUser } from '../redux/UsersSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { IdentityNamber } = location.state || { IdentityNamber: 0 };
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phon, setPhon] = useState('');
    const [Password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
const dispatch=useDispatch()
    const validateInputs = () => {
        const currentErrors = {};
        
        if (!Name) {
            currentErrors.Name = 'Name cannot be empty';
        }
        if (!IdentityNamber) {
            currentErrors.IdentityNamber = 'ID Number cannot be empty';
        } else if (IdentityNamber.length !== 9) {
            currentErrors.IdentityNamber = 'ID Number must be exactly 9 characters long';
        }
        if (!Email) {
            currentErrors.Email = 'Email cannot be empty';
        } else {
            const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!EmailPattern.test(Email)) {
                currentErrors.Email = 'Invalid Email format';
            }
        }
        if (!Phon) {
            currentErrors.Phon = 'Phon cannot be empty';
        } else {
            const PhonPattern = /^\d+$/; 
            if (!PhonPattern.test(Phon)) {
                currentErrors.Phon = 'Phon must be a valid number';
            }
        }
        if (!Password) {
            currentErrors.Password = 'Password cannot be empty';
        } else if (Password.length < 8) {
            currentErrors.Password = 'Password must be at least 8 characters long';
        }

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validateInputs()) return; 

    //     try {
    //         // const response = await fetch('/api/User/addUsers', { 
    //         //     method: 'POST',
    //         //     headers: { 'Content-Type': 'application/json' },
    //         //     body: JSON.stringify({ Name, IdentityNamber, Email, Phon, Password }),
    //         // });
    //         const response =dispatch(addUser({IdentityNamber,Name, Email, Phon, Password}));
    //         console.log(response);
            
    //         if (!response.ok) {
    //             if (response.status === 409) {
    //                 throw new Error('User already exists');
    //             }
    //             // const errorMessage = await response.text(); // שורה זו נוספה
    //             // throw new Error(errorMessage || 'Registration failed'); // שורה זו שונתה
    //         }

    //         //const data = await response.json(); // שורה זו הוזזה למקום הנכון

    //         setSuccessMessage('הרישום הצליח!');
    //         navigate('/packageList', { state: { IdentityNamber, Password } });
    //     } catch (error) {
    //         setErrors({ ...errors, api: error.message });
    //     }
    // };
   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
    
        try {
            const action = await dispatch(addUser({ Name, IdentityNamber,Password, Email, Phon}));
            
            const result = action.payload; // הנח שהפעולה מחזירה את ה-payload
            
            if (action.type === 'users/addUser/rejected') {
                throw new Error(result.message || 'Registration failed');
            }
    
            setSuccessMessage('הרישום הצליח!');
            navigate('/packageList', { state: { IdentityNamber, Password } });
        } catch (error) {
            setErrors({ ...errors, api: error.message });
        }
    };
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='IdentityNamber'>ID Number:</label>
                    <input 
                        id='IdentityNamber'
                        type="text" 
                        value={IdentityNamber} 
                        readOnly 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="Name">Name:</label>
                    <input 
                        id='Name'
                        type="text" 
                        value={Name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    {errors.Name && <p className="error-message">{errors.Name}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="Email" 
                        value={Email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    {errors.Email && <p className="error-message">{errors.Email}</p>}
                </div>
                <div>
                    <label>Phone:</label>
                    <input 
                        type="text" 
                        value={Phon} 
                        onChange={(e) => setPhon(e.target.value)} 
                        required 
                    />
                    {errors.Phon && <p className="error-message">{errors.Phon}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="Password" 
                        value={Password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {errors.api && <p className="error-message">{errors.api}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit">Register</button>
                
            </form>
        </div>
    );
};

export default Register;

