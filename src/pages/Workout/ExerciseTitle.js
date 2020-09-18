import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Timer from './Timer';

export default class App extends React.Component {
    render() {
        const { currentWorkout, paused, onComplete, loading } = this.props;
        const { cardType, title, reps, repsCount } = currentWorkout;

        if (!reps && !repsCount) {
            return null;
        }

        const titleText = (cardType === 'exercise' && title) && title;

        // TODO: pull out into own function
        let repsText = (
            <Text style={styles.reps}>
                {repsCount} {reps}
            </Text>
        );

        if (reps === 'Seconds') {
            const { autoPlay } = currentWorkout;
            repsText = (
                <Timer
                    initialTime={repsCount}
                    paused={paused}
                    onComplete={onComplete}
                    autoPlay={autoPlay}
                    loading={loading}
                />
            );
        }

        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {titleText}
                </Text>
                {repsText}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        left: 16,
        right: 16,
        top: 60
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        color: '#FFFFFF',
        //text-shadow: 0px 4.50549px 20px rgba(63, 67, 79, 0.35),
        marginBottom: 8
    },
    reps: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        color: '#FFFFFF'
        //text-shadow: 0px 4.50549px 20px rgba(63, 67, 79, 0.35);
    },
});
