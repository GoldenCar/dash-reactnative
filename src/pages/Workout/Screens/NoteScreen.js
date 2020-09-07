import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    render() {
        const { currentWorkout } = this.props;
        console.log('NOTE SCREEN', currentWorkout);

        // TODO: what property is text

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {/* Great job on that last exercise, now lets step it up more for the following exercises. */}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#859AB6',
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: '#FFFFFF',
        //text-shadow: 0px 4.50549px 20px rgba(63, 67, 79, 0.1);
    }
});
