import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default class App extends React.Component {
    render() {
        const { isPlaying, onComplete } = this.props;

        const restTime = this.props.restTime || 30;

        return (
            <View style={styles.rest}>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={restTime}
                    colors={'#fff'}
                    trailColor={'rgba(0, 0, 0, 0.1)'}
                    size={210}
                    strokeWidth={18}
                    onComplete={onComplete}
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
