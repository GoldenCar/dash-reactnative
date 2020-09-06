import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        // TODO: add lottie file

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Circuit {'\n'} Completed!
                </Text>
                <View style={styles.graphic}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1AA0FF',
        flex: 1,
        paddingTop: 100
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 32
    },
    graphic: {
        height: 161,
        width: 161,
        borderWidth: 1,
        borderColor: '#ffffff',
        alignSelf: 'center'
    }
});
