import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        const { currentWorkout } = this.props;
        const { flag, isCircuit, exerciseNum, totalExercises } = currentWorkout;

        if (!isCircuit && flag !== 'video') {
            return null;
        }

        let text = '';
        if (isCircuit) {
            text = `Exercise ${exerciseNum} of ${totalExercises}`;
        } else if (flag === 'video') {
            text = 'Exercise';
        }

        return (
            <View style={styles.news}>
                <Text style={styles.newsText}>
                    {text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    news: {
        backgroundColor: 'rgba(63, 67, 79, 0.4)',
        borderRadius: 4,
        position: 'absolute',
        top: 18,
        left: 17,
        paddingHorizontal: 8,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newsText: {
        color: '#ffffff'
    }
});
