import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        const { currentWorkout } = this.props;


        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        flex: 1
    }
});
