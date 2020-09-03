import jwt_decode from 'jwt-decode';


async function requestAppleLogin() {
    try {
        //const { callbackButton } = this.props;
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [
                AppleAuthRequestScope.EMAIL,
                AppleAuthRequestScope.FULL_NAME,
            ],
        });
        console.log(appleAuthRequestResponse)

        //  this.createAccountApple(appleAuthRequestResponse);
        // if (callbackButton) {
        //   callbackButton();
        // }

        const data = appleAuthRequestResponse;

        // createAccountApple = async (data) => {
        // const { callbackButton } = this.props;
        const identityData = jwt_decode(data.identityToken);
        console.log('identity data', identityData);
        // TODO: once server endpoint is fixed, need to remove this

        const email = data.email || identityData.email;
        const username = data.fullName.givenName || '';

        const res = await userActions.loginAppleUser({
            id_token: data.identityToken,
            //username: data.fullName.givenName,
            username: username,
            //email: data.email,
            email: email,
            photo: '',
            kid: data.user,
        });

        if (!res.profileImage) {
            await userActions.editUserPicture(res, Image.resolveAssetSource(arrAvatar[Math.floor(Math.random() * arrAvatar.length)]))
        }

        return res;

        // if (callbackButton) {
        //   callbackButton({ userInfo: data });
        // }

        //  };



    } catch (e) {
        console.log('on apple auth', e);
        return e;
    }
}

export { requestAppleLogin } 
