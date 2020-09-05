import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class App extends React.Component {
    render() {
        const { currentWorkout } = this.props;

        // TODO: handle this better
        let title = '';
        if (currentWorkout.cardType === 'exercise' && currentWorkout.title) {
            title = currentWorkout.title;
        }

        let reps = '';
        if (currentWorkout.reps && currentWorkout.repsCount) {
            reps = `${currentWorkout.repsCount} ${currentWorkout.reps}`;
        }

        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.reps}>
                    {reps}
                </Text>
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
