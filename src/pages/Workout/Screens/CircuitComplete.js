import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import Checkmark from '../Lottie/checkmark.json';
import Confetti from '../Lottie/confetti.json';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Circuit {'\n'} Completed!
                </Text>
                <LottieView
                    source={Checkmark}
                    autoPlay
                    loop={false}
                    style={styles.check}
                />
                <LottieView
                    source={Confetti}
                    autoPlay
                    loop={false}
                    style={styles.confetti}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1AA0FF',
        flex: 1,
        paddingTop: 100
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 32
    },
    check: {
        height: 161,
        width: 161,
        alignSelf: 'center'
    },
    confetti: {
        height: 300,
        alignSelf: 'center'
    }
});
