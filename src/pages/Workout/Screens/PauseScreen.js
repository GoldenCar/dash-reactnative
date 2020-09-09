import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { mediaHost } from 'dash/src/config';

export default class App extends React.Component {
    render() {
        const { currentDay, day, plan } = this.props;
        const imageURL = { uri: `${mediaHost}${plan.planImage}` };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Day {currentDay}</Text>
                <Text style={styles.subtitle}>{day.taskTitle}</Text>

                <Image source={imageURL} style={styles.image} />

                <View style={styles.button}>
                    <Text style={styles.buttonText}>End Todays Task</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        paddingTop: 57
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        color: '#3F434F',
        marginBottom: 8
    },
    subtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        lineHeight: 28,
        color: '#3F434F'
    },
    image: {
        height: 240,
        width: 240,
        marginBottom: 32
    },
    button: {
        width: 213,
        height: 64,
        backgroundColor: '#FFFFFF',
        //box-shadow: 0px 20px 52px rgba(0, 0, 0, 0.03);
        borderRadius: 32,
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        color: '#3F434F'
    }
});
