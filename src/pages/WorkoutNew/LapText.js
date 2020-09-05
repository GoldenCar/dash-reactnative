import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.lap}>
                <Text style={styles.lapText}>
                    Lap 1 of 3
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lap: {
        height: 16,
        bottom: 16,
        alignSelf: 'center'
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
