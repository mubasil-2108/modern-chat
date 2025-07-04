import firestore from '@react-native-firebase/firestore';
import { LayoutAnimation, Platform, UIManager } from "react-native";


export const handleAnimation = () => {
    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

export const validateEmail = email => {
    // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    return re.test(email);
}

export const checkExpiry = () => {
    let d1 = Date.parse("2012-11-01");
    let d2 = Date.parse("2012-11-04");
    let expiryDate = Date.parse("2020-12-18");
    let currentDate = Date.now()
    console.log(expiryDate > currentDate)
    if (expiryDate < currentDate) {
        return true
    } else {
        return false
    }
}

export const compareDate = () => {
    let date1 = new Date('December 25, 2017 01:30:00');
    let date2 = new Date('June 18, 2016 02:30:00');
    console.log(date1.getTime() > date2.getTime())
    //best to use .getTime() to compare dates
    //if (date1.getTime() === date2.getTime()) {
    //same date
    //}

    if (date1.getTime() > date2.getTime()) {
        return true
    } else {
        return false
    }
}

export const hasLowerCase = str => {
    return (/[a-z]/.test(str));
}
export const hasUpperCase = str => {
    return (/[A-Z]/.test(str));
}

export function cmToFeetAndInches(cm) {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return `${feet}' ${remainingInches}"`;
}

export function kgToPounds(kilograms) {
    const pounds = Math.floor(kilograms * 2.20462);
    return `${pounds}`;
}

// export function generateRandomUsers() {
//     const isDietitian = faker.datatype.boolean();
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     const image = faker.image.avatar();

//     if (isDietitian) {
//         const rating = faker.number.int({ min: 0, max: 5, precision: 0.1 });
//         const reviewsCount = faker.number.int({ min: 1, max: 100 });

//         return {
//             firstName,
//             lastName,
//             image,
//             isDietitian,
//             rating,
//             reviewsCount,
//         };
//     } else {
//         return {
//             firstName,
//             lastName,
//             image,
//             isDietitian,
//         };
//     }
// }

export const getFirestoreDate = () => {
    return new Date(firestore.Timestamp.now().seconds * 1000)
}