import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='white' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
