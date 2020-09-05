import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        const { currentWorkout } = this.props;

        console.log(currentWorkout);

        let text = currentWorkout.flag;
        if (currentWorkout.isCircuit) {
            text = `${text} Circuit ${currentWorkout.loopNum} of ${currentWorkout.loops}`;
        }

        return (
            <View style={styles.news}>
                <Text style={styles.newsText}>
                    {/* Exercise */}
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
        width: 69,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newsText: {
        color: '#ffffff'
    }
});
