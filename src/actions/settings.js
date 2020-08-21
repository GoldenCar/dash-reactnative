import AsyncStorage from '@react-native-community/async-storage';

import {api} from '../config';

import {setUser} from './user';

export const getStorage = async () => {
  try {
    // let user = {
    //   "friendsIds": [
    //     []
    //   ],
    //   "requestedUsers": [],
    //   "receivedUsers": [],
    //   "challengesIds": [
    //     []
    //   ],
    //   "_id": "5f363f7ff1a13b555fee2c9b",
    //   "displayname": "Solutions",
    //   "username": "Alex",
    //   "email": "pizone2019@gmail.com",
    //   "phoneNumber": "115462367254713807007",
    //   "flag": "googleUser",
    //   "status": "Active",
    //   "Role": "member",
    //   "Membership": "plus",
    //   "Subscription": "free",
    //   "Device": "android",
    //   "PaymentMethod": "google",
    //   "RenewDate": null,
    //   "DataRegistered": "2020-8-14",
    //   "profileImage": "https://lh6.googleusercontent.com/-AXX-yuOhhSk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnPgea0zi-i6iBYH-fBBKougxNF5A/s96-c/photo.jpg",
    //   "kid": "6bc63e9f18d561b34f5668f88ae27d48876d8073",
    //   "__v": 1,
    //   "AdsStatus": false,
    //   "gender": null
    // };
    // let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI1ZjM2M2Y3ZmYxYTEzYjU1NWZlZTJjOWIiLCJpYXQiOjE1OTc5NTEzNzgsImV4cCI6MTYwMDAyNDk3OH0.8QrbWF-p7CWXgbb2q0Kp1fzZ26-AQ6YsUl_fM0PNkvI'
    let user = null
    let token = null
    let values = await AsyncStorage.multiGet(['@user', '@token']);
    values.forEach((val) => {
      switch (val[0]) {
        case '@user':
          if (val[1]) {
            user = JSON.parse(val[1]);
          }
          break;
        case '@token':
          if (val[1]) {
            token = val[1];
          }
          break;
        default:
          break;
      }
    });
    if (token) {
      console.log("TOKEN_USER", token)
      api.defaults.headers.common.Authorization = token;
    }
    if (user) {
      setUser(user);
    }
    return {user, token};
  } catch (e) {
    console.log({e});
  }
};
