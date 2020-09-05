import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.news}>
                <Text style={styles.newsText}>
                    Exercise
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
