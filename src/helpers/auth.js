import { Image, Platform } from 'react-native';
import jwt_decode from 'jwt-decode';
import appleAuth, { AppleAuthRequestOperation, AppleAuthRequestScope } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Actions } from 'react-native-router-flux';

import * as userActions from '../actions/user';

if (Platform.OS === 'android') {
    GoogleSignin.configure({
        webClientId:
            //'942215840003-l4kldjpp92k91f1q07srekvunfpff3qt.apps.googleusercontent.com', // Debug
            '799774940481-vfnnqtmfelum6v08o96r6vdm719qf906.apps.googleusercontent.com', // Live 
        offlineAccess: false,
    });
}

const arrAvatar = [
    require('../res/Face/Face-1.png'),
    require('../res/Face/Face-2.png'),
    require('../res/Face/Face-3.png'),
    require('../res/Face/Face-4.png'),
    require('../res/Face/Face-5.png'),
];

async function requestAppleLogin() {
    try {
        const response = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [
                AppleAuthRequestScope.EMAIL,
                AppleAuthRequestScope.FULL_NAME
            ]
        });

        const { identityToken, email, fullName, user } = response;

        // TODO: once server endpoint is fixed, need to remove this
        const identityData = jwt_decode(identityToken);

        const userEmail = email || identityData.email;
        const username = fullName.givenName || '';

        const res = await userActions.loginAppleUser({
            id_token: identityToken,
            username: username,
            email: userEmail,
            photo: '',
            kid: user,
        });

        if (!res.profileImage) {
            await userActions.editUserPicture(res, Image.resolveAssetSource(arrAvatar[Math.floor(Math.random() * arrAvatar.length)]))
        }

        return res;
    } catch (e) {
        console.log('on apple auth', e);
        return e;
    }
}

async function requestGoogleLogin() {
    try {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        //console.log({ userInfo })
        //this.createAccount({ userInfo });

        const res = await userActions.loginGoogleUser({
            id_token: userInfo.idToken,
            username: ''
        });

        if (!res.profileImage || res.profileImage && res.profileImage.slice(0, 5) === 'https') {
            const randomNumber = Math.floor(Math.random() * arrAvatar.length);
            const image = Image.resolveAssetSource(arrAvatar[randomNumber]);
            await userActions.editUserPicture(res, image);
        }

        if (res.username === '') {
            Actions.PickAUsername({
                userInfo,
                callback: () => {
                    Actions.pop();
                },
            });
        }

    } catch (e) {
        console.log(e.message);
        return e;
    }
}

export { requestAppleLogin, requestGoogleLogin } 
