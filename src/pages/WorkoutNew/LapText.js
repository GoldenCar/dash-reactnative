import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        const { currentWorkout } = this.props;
        let { isCircuit, totalLoops, loopNum } = currentWorkout

        let text = '';
        if (isCircuit) {
            totalLoops = totalLoops || 0;
            loopNum = loopNum || 0;
            text = `Circuit • Lap ${loopNum} of ${totalLoops}`;
        }

        return (
            <View style={styles.lap}>
                <Text style={styles.lapText}>
                    {text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lap: {
        height: 16,
        bottom: 16,
        alignSelf: 'center',
        position: 'absolute'
    },
    lapText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#FFFFFF'
    }
});
