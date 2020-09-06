import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default class App extends React.Component {
    render() {
        const { isPlaying } = this.props;

        return (
            <View style={styles.rest}>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={30}
                    colors={'gray'}
                    trailColor='#fff'
                    size={210}
                    strokeWidth={18}
                >
                    {({ remainingTime }) => (
                        <View>
                            <Text style={styles.timerText}>
                                {remainingTime}
                            </Text>
                            <Text style={styles.timerSubText}>
                                Rest
                    </Text>
                        </View>
                    )}
                </CountdownCircleTimer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rest: {
        flex: 1,
        backgroundColor: '#1AA0FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 56,
        color: '#ffffff'
    },
    timerSubText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        textAlign: 'center'
    }
});
