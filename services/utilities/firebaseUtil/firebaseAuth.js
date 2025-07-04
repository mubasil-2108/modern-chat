// import auth from '@react-native-firebase/auth'
// // import Toast from 'react-native-simple-toast'
// // import { routes } from '../../constants';
// import { navigate, goBack } from "../../../navigation/rootNavigation"
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useState } from 'react';

// export const Signup = async (email, password, setEmail, setPassword, confirmPassword, setConfirmPassword, phoneNumber, isChecked, navigation) => {
//     const isEmailValid = (email) => {
//         const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return emailPattern.test(email);
//     };
//     const isPasswordValid = (password) => {
//         return password.length >= 8;
//     };

//     if (!isEmailValid(email)) {
//         if (email.trim() === '') {
//             Toast.show('Enter email first', Toast.SHORT, Toast.TOP);
//         } else {
//             Toast.show('Enter valid email', Toast.SHORT, Toast.TOP);
//             return;
//         }
//     } else if (!isPasswordValid(password)) {
//         if (password.trim() === '') {
//             Toast.show('Enter password first', Toast.SHORT, Toast.TOP);
//         } else {
//             Toast.show('Password length less than 6', Toast.SHORT, Toast.TOP);
//             return;
//         }
//     } else if (password !== confirmPassword) {
//         Toast.show('Password does not match', Toast.SHORT, Toast.TOP);
//         setConfirmPassword('');
//         setPassword('');
//         return;
//     } else {
//         try {
//             if (isChecked) {
//                 // setLoading(true);
//                 console.log("PHONE::: ", phoneNumber)
//                 try {
//                     await AsyncStorage.setItem('@phoneNumber', phoneNumber);
//                     // setPhoneNumber(number);
//                 } catch (error) {
//                     console.error('Error saving phone number:', error);
//                 }

//                 const userCredential = await auth().createUserWithEmailAndPassword(email, password)
//                 console.log('User added');
//                 const user = userCredential.user;
//                 if (user) {
//                     const uid = user.uid; // User ID
//                     console.log(uid);
//                     // setLoading(false);
//                     navigate(navigation, { phone: phoneNumber });
//                 } else {
//                     console.error('User object is undefined');
//                 }
//             } else {
//                 Toast.show('Please check the circle', Toast.SHORT, Toast.TOP);
//             }
//         } catch (error) {
//             // setLoading(false);
//             if (error.code === 'auth/email-already-in-use') {
//                 Toast.show('Email already exists', Toast.SHORT, Toast.TOP);
//                 console.log('Email already exists');
//                 setPassword('');
//                 setEmail('');
//                 setConfirmPassword('');
//             } else {
//                 console.error('Registration error:', error);
//             }
//         }
//     }
// };

// export const ResetPassword = async (email, setEmail) => {
//     // const [currentEmail, setCurrentEmail] = useState('')
//     const user = auth().currentUser;

//     const isEmailValid = (email) => {
//         const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return emailPattern.test(email);
//     };

//     if (!isEmailValid(email)) {
//         if (email.trim() === '') {
//             Toast.show('Enter email first', Toast.SHORT, Toast.TOP);
//         } else if (email === user.email) {

//             Toast.show('Enter valid email', Toast.SHORT, Toast.TOP);
//         } else {
//             Toast.show('Enter valid email', Toast.SHORT, Toast.TOP);

//         }
//         return;
//     }

//     try {
//         await auth().sendPasswordResetEmail(email);
//         Toast.show('Password reset email sent', Toast.SHORT, Toast.TOP);
//         setEmail('');
//     } catch (error) {
//         if (error.code === 'auth/user-not-found') {
//             Toast.show('User not found', Toast.SHORT, Toast.TOP);
//         } else {
//             console.error('Password reset error:', error);
//             Toast.show('Error sending reset email', Toast.SHORT, Toast.TOP);
//         }
//     }
// };
// export const Signin = async (email, password) => {
//     const isEmailValid = (email) => {
//         const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return emailPattern.test(email);
//     };
//     const isPasswordValid = (password) => {
//         return password.length >= 8;
//     };

//     if (!isEmailValid(email)) {
//         if (email.trim() === '') {
//             Toast.show('Enter email first', Toast.SHORT, Toast.TOP);
//         } else {
//             Toast.show('Enter valid email', Toast.SHORT, Toast.TOP);
//             return;
//         }
//     } else if (!isPasswordValid(password)) {
//         if (password.trim() === '') {
//             Toast.show('Enter password first', Toast.SHORT, Toast.TOP);
//         } else {
//             Toast.show('Password length less than 6', Toast.SHORT, Toast.TOP);
//             return;
//         }
//     } else {

//         try {
//             // setLoading(true);
//             await auth().signInWithEmailAndPassword(email, password);
//             console.log('User signed in');
//             navigate(routes.app);
//         } catch (error) {
//             if (error.code === 'auth/user-not-found') {
//                 Toast.show('User not found', Toast.SHORT, Toast.TOP);
//                 console.log('User not found');
//             } else if (error.code === 'auth/wrong-password') {
//                 Toast.show('Incorrect password', Toast.SHORT, Toast.TOP);
//                 console.log('Incorrect password');
//             } else {
//                 console.error('Sign-in error:', error);
//                 Toast.show('Sign-in error', Toast.SHORT, Toast.TOP);
//             }
//         }
//     }

// };

