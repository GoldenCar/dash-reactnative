import { Animated, Easing } from 'react-native';

// TODO: test this
export const showPopup = (value) => {
    Animated.timing(value, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
    }).start();
}

export const hidePopup = (value, callback) => {
    Animated.timing(value, {
        toValue: 1,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
    }).start(({ finished }) => {
        if (finished) {
            callback();
            //  this.setState({ visible: false });

            // if (callback) {
            //     callback(user);
            // }

        }
    });
}
